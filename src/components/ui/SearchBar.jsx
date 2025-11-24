"use client";

import { useState, useEffect, useRef } from "react";
import Button from "./Button";

export default function SearchBar({ onSearch, endpoint = "blog" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);

  /* -----------------------------
     Click outside closes dropdown
  ------------------------------ */
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* -----------------------------
     Fetch suggestions
  ------------------------------ */
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length < 2) {
        setSuggestions([]);
        setIsOpen(false);
        setSelectedIndex(-1);
        return;
      }

      setIsLoading(true);
      try {
        const res = await fetch(
          `http://localhost:3000/api/${endpoint}?query=${encodeURIComponent(searchTerm)}&limit=6`
        );
        const json = await res.json();

        const items =
          endpoint === "blog"
            ? json.data?.blogs || []
            : json.data?.videos || [];

        setSuggestions(items);
        setIsOpen(items.length > 0);
      } catch (err) {
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    const delay = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(delay);
  }, [searchTerm]);

  /* -----------------------------
     Search click or Enter key
  ------------------------------ */
  const handleSearch = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
    onSearch?.(searchTerm.trim());
  };

  /* -----------------------------
     Select a suggestion
  ------------------------------ */
  const selectSuggestion = (item) => {
    setSearchTerm(item.title);
    setIsOpen(false);
    onSearch?.(item.title);
  };

  /* -----------------------------
     KEYBOARD NAVIGATION
  ------------------------------ */
  const handleKeyDown = (e) => {
    if (!isOpen || suggestions.length === 0) {
      if (e.key === "Enter") handleSearch();
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev + 1 < suggestions.length ? prev + 1 : prev
        );
        break;

      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          selectSuggestion(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;

      case "Escape":
        setIsOpen(false);
        setSelectedIndex(-1);
        break;
    }

    setTimeout(() => inputRef.current?.focus(), 0);
  };

  /* -----------------------------
     Highlight matched text
  ------------------------------ */
  const highlight = (text, q) => {
    if (!q.trim() || !text) return text;
    const regex = new RegExp(`(${q})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="w-full flex items-center justify-center mt-s64" ref={wrapperRef}>
      <div className="w-full max-w-4xl relative">

        {/* Input Bar */}
        <div className="flex items-center gap-s16 border-2 border-accent-main rounded-r16 px-s16 py-s8">
          {/* SEARCH INPUT */}
          <input
            ref={inputRef}
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
          />

          <Button
            onClick={handleSearch}
          >
            Search
          </Button>
        </div>

        {/* Suggestions Dropdown */}
        {isOpen && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-background border border-accent-main rounded-r16 shadow-xl max-h-96 overflow-y-auto">
            {suggestions.map((item, index) => (
              <div
                key={item._id}
                onClick={() => selectSuggestion(item)}
                className={`p-s12 cursor-pointer border-b-2 border-accent-main ${
                  index === selectedIndex ? "bg-accent-light" : "hover:bg-gray-100"
                }`}
              >
                <div className="flex gap-s16 p-2 ">
                  <img
                    src={item.thumbnail}
                    className="w-s64 h-s64 object-cover rounded-md"
                  />
                  <div>
                    <p className="font-semibold">
                      {highlight(item.title, searchTerm)}
                    </p>
                    <p className="text-sm text-gray-500">
                      {highlight(item.description, searchTerm)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}