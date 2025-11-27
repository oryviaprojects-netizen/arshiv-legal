"use client";

import { useState, useEffect, useRef } from "react";
import Button from "./Button";

export default function SearchBar({ onSearch, endpoint = "blog" }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const timeoutRef = useRef(null);
  const cacheRef = useRef({});

  /* -----------------------------
     CLICK OUTSIDE CLOSE DROPDOWN
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
     FETCH SUGGESTIONS (OPTIMIZED)
  ------------------------------ */
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (abortRef.current) abortRef.current.abort();

    const query = searchTerm.trim().toLowerCase();

    // Show suggestions from 1 character
    if (query.length < 1) {
      setSuggestions([]);
      setIsOpen(false);
      setSelectedIndex(-1);
      return;
    }

    // Check cache first for instant results
    if (cacheRef.current[query]) {
      setSuggestions(cacheRef.current[query]);
      setIsOpen(cacheRef.current[query].length > 0);
      setSelectedIndex(-1);
      return;
    }

    // Debounce to 100ms for faster response
    timeoutRef.current = setTimeout(async () => {
      abortRef.current = new AbortController();

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/${endpoint}?query=${encodeURIComponent(
            searchTerm
          )}&limit=6`,
          { signal: abortRef.current.signal }
        );

        if (!res.ok) throw new Error('Search failed');

        const json = await res.json();

        let items =
          endpoint === "blog"
            ? json.data?.blogs || []
            : json.data?.videos || [];

        // Sort by relevance
        items = items.sort((a, b) => {
          const aTitle = a.title.toLowerCase();
          const bTitle = b.title.toLowerCase();

          if (aTitle === query) return -1;
          if (bTitle === query) return 1;

          const aStarts = aTitle.startsWith(query);
          const bStarts = bTitle.startsWith(query);
          if (aStarts && !bStarts) return -1;
          if (!aStarts && bStarts) return 1;

          const aIndex = aTitle.indexOf(query);
          const bIndex = bTitle.indexOf(query);
          if (aIndex !== bIndex) return aIndex - bIndex;

          return aTitle.length - bTitle.length;
        });

        // Cache the results
        cacheRef.current[query] = items;

        setSuggestions(items);
        setIsOpen(items.length > 0);
        setSelectedIndex(-1);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setSuggestions([]);
          setIsOpen(false);
        }
      }
    }, 100);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (abortRef.current) abortRef.current.abort();
    };
  }, [searchTerm, endpoint]);

  /* -----------------------------
     SEARCH BUTTON OR ENTER
  ------------------------------ */
  const handleSearch = () => {
    setIsOpen(false);
    setSelectedIndex(-1);
    onSearch?.(searchTerm.trim());
  };

  /* -----------------------------
     SELECT A SUGGESTION
  ------------------------------ */
  const selectSuggestion = (item) => {
    setSearchTerm(item.title);
    setIsOpen(false);
    setSelectedIndex(-1);
    onSearch?.(item.title);
  };

  /* -----------------------------
     KEYBOARD NAVIGATION
  ------------------------------ */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        selectSuggestion(suggestions[selectedIndex]);
      } else {
        handleSearch();
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!isOpen && suggestions.length > 0) {
        setIsOpen(true);
      }
      setSelectedIndex((prev) => {
        const next = prev + 1;
        return next < suggestions.length ? next : prev;
      });
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      setSelectedIndex(-1);
      inputRef.current?.blur();
      return;
    }
  };

  /* -----------------------------
     TEXT HIGHLIGHTING
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

        {/* INPUT BAR */}
        <div className="flex items-center gap-s16 border-2 border-accent-main rounded-r16 px-s16 py-s8">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search blogs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
          />

          <Button onClick={handleSearch}>Search</Button>
        </div>

        {/* DROPDOWN */}
        {isOpen && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-2 bg-background border border-accent-main rounded-r16 shadow-xl max-h-96 overflow-y-auto">
            {suggestions.map((item, index) => (
              <div
                key={item._id}
                onClick={() => selectSuggestion(item)}
                onMouseEnter={() => setSelectedIndex(index)}
                className={`p-s12 cursor-pointer border-b-2 border-accent-main transition-colors ${index === selectedIndex ? "bg-blue-100 border-l-4 border-l-blue-500" : "hover:bg-gray-100"
                  }`}
              >
                <div className="flex gap-s16 p-2">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-s64 h-s64 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{highlight(item.title, searchTerm)}</p>
                    <p className="text-sm text-gray-500">
                      {highlight(item.description, searchTerm)}
                    </p>
                    {item.category && (
                      <p className="text-xs font-semibold text-accent-main mt-1">
                        {highlight(item.category, searchTerm)}
                      </p>
                    )}
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