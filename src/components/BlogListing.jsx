"use client";

import { useEffect, useState } from "react";
import CardVariant from "@/components/ui/CardVariant";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";

export default function BlogVideoListingPage({ searchQuery = "", onClearSearch }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const router = useRouter();
  const limit = 5;

  const fetchData = async (pageNum = 1, append = false, query = "") => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const queryParam = query ? `&query=${encodeURIComponent(query)}` : "";
      const res = await fetch(`http://localhost:3000/api/blog?page=${pageNum}&limit=${limit}${queryParam}`);
      const json = await res.json();

      const blogs = json?.data?.blogs || [];
      const totalBlogs = json?.data?.total || 0;
      const totalPages = json?.data?.totalPages || 1;

      if (append) {
        setItems((prev) => [...prev, ...blogs]);
      } else {
        setItems(blogs);
      }

      setTotal(totalBlogs);
      setHasMore(pageNum < totalPages);
    } catch (err) {
      console.error("Error fetching:", err);
      if (!append) setItems([]);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, true, searchQuery);
  };

  const handleExploreMore = () => {
    setPage(1);
    fetchData(1, false, "");
    if (onClearSearch) {
      onClearSearch();
    }
  };

  const handleBack = () => {
    setHasSearched(false);
    setPage(1);
    fetchData(1, false, "");
    if (onClearSearch) {
      onClearSearch();
    }
  };

  // ✅ Fetch data when searchQuery changes from parent
  useEffect(() => {
    setPage(1);
    if (searchQuery.trim()) {
      setHasSearched(true);
    }
    fetchData(1, false, searchQuery);
  }, [searchQuery]);



  return (
    <div className="w-full">
      {/* SEARCH RESULTS INFO - Only show when searching AND have results */}
      {hasSearched && searchQuery && items.length > 0 && (
        <div className="mb-s16">
            <span 
              onClick={handleBack}
              className="text-accent-main cursor-pointer hover:underline mr-2"
            >
              ← Back
            </span>
         
        </div>
      )}

      {/* NO RESULTS - Only show when searching with no results */}
      {searchQuery && items.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center my-s48 text-center">
          <svg 
            className="w-24 h-24 text-gray-300 mb-4"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
          <h3 className="text-xl font-semibold text-gray-700 mb-s8">
            No results found for "{searchQuery}"
          </h3>
          <p className="text-text-secondary mb-6">
            Try different keywords or explore all blogs
          </p>
          <Button
            onClick={handleExploreMore}
            variant="ctaAccent"
          >
            Explore More 
          </Button>
        </div>
      )}

      {/* GRID - Only show when we have items */}
      {items.length > 0 && (
        <div className="">
          <div
            className="
              w-full
              grid
              gap-x-s64
              gap-y-s64
              grid-cols-1
              sm:grid-cols-2
              md:grid-cols-3
              xl:grid-cols-4
              justify-items-center
            "
          >
            {items.map((item) => (
              <div key={item._id} onClick={() => router.push(`/blog/${item._id}`)}>
          <CardVariant
  image={item.thumbnail}
  title={item.title}
  description={item.description}
  duration={item.duration}
  variant={item.type}
  id={item._id}  // ✅ Add this
/>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* LOAD MORE BUTTON */}
      {hasMore && items.length > 0 && (
        <div className="flex justify-center mt-12">
          <Button
            onClick={handleLoadMore}
            disabled={loadingMore}
            variant="ctaAccent"
          >
            {loadingMore ? "Loading..." : `Load More (${items.length} of ${total})`}
          </Button>
        </div>
      )}

      {/* ALL LOADED MESSAGE */}
      {!hasMore && items.length > 0 && (
        <div className="text-center mt-12 text-disabled">
          All items loaded ({items.length} of {total})
        </div>
      )}

      {/* EMPTY STATE - Only when no search and no items */}
      {!loading && items.length === 0 && !searchQuery && (
        <div className="text-center mt-12 text-disabled">
          No blogs found.
        </div>
      )}
    </div>
  );
}