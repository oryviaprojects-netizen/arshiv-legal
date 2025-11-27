"use client";

import { useEffect, useState, useRef } from "react";
import CardVariant from "@/components/ui/CardVariant";
import { useRouter } from "next/navigation";
import Button from "./ui/Button";

export default function VideoListingPage({ searchQuery = "", onClearSearch }) {
  const [items, setItems] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [total, setTotal] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  const router = useRouter();
  const abortRef = useRef(null);
  const cacheRef = useRef({});
  const limit = 5;

  const fetchData = async (pageNum = 1, append = false, query = "") => {
    // Cache key for this specific query
    const cacheKey = `${query}_${pageNum}`;

    // Return cached data instantly if available
    if (cacheRef.current[cacheKey] && !append) {
      const cached = cacheRef.current[cacheKey];
      setItems(cached.items);
      setTotal(cached.total);
      setHasMore(cached.hasMore);
      return;
    }

    // Cancel previous request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    if (append) setLoadingMore(true);

    try {
      const queryParam = query ? `&query=${encodeURIComponent(query)}` : "";
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/video?page=${pageNum}&limit=${limit}${queryParam}`,
        {
          signal: abortRef.current.signal,
          cache: 'force-cache'
        }
      );

      if (!res.ok) throw new Error('Failed to fetch');

      const json = await res.json();

      const videos = json?.data?.videos || [];
      const totalVideos = json?.data?.total || 0;
      const totalPages = json?.data?.totalPages || 1;

      if (append) {
        setItems((prev) => [...prev, ...videos]);
      } else {
        setItems(videos);
      }

      setTotal(totalVideos);
      setHasMore(pageNum < totalPages);

      // Cache the result (don't cache appended results)
      if (!append) {
        cacheRef.current[cacheKey] = {
          items: videos,
          total: totalVideos,
          hasMore: pageNum < totalPages
        };
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        console.error("Error fetching:", err);
        if (!append) setItems([]);
      }
    } finally {
      setLoadingMore(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage, true, searchQuery);
  };

  const handleExploreMore = () => {
    setHasSearched(false);
    setPage(1);
    fetchData(1, false, "");
    onClearSearch?.();
  };

  const handleBack = () => {
    setHasSearched(false);
    setPage(1);
    fetchData(1, false, "");
    onClearSearch?.();
  };

  // Fetch data when searchQuery changes
  useEffect(() => {
    setPage(1);
    setHasSearched(!!searchQuery.trim());
    fetchData(1, false, searchQuery);

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [searchQuery]);

  return (
    <main className="w-full bg-background px-s64 py-s32">
      {/* SEARCH RESULTS INFO */}
      {hasSearched && searchQuery && items.length > 0 && (
        <div className="mb-s16">
          <span
            onClick={handleBack}
            className="text-accent-main cursor-pointer hover:underline"
          >
            ← Back
          </span>
        </div>
      )}

      {/* NO RESULTS */}
      {searchQuery && items.length === 0 && (
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
            Try different keywords or explore all videos
          </p>
          <Button onClick={handleExploreMore} variant="ctaAccent">
            Explore All Videos
          </Button>
        </div>
      )}

      {/* GRID */}
      {items.length > 0 && (
        <div className="w-full grid gap-x-s64 gap-y-s64 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {items.map((item) => (
            <div
              key={item._id}
              onClick={() => {
                if (item.redirectUrl) {
                  window.location.href = item.redirectUrl;
                }
              }}
            >
              <CardVariant
                image={item.thumbnail}
                title={item.title}
                description={item.description}
                duration={item.duration}
                variant={item.platform}
                redirectUrl={item.redirectUrl}
                id={item._id}
              />
            </div>
          ))}
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
            {loadingMore ? "Loading..." : `Load More`}
          </Button>
        </div>
      )}

      {/* ALL LOADED MESSAGE */}
      {!hasMore && items.length > 0 && (
        <div className="text-center mt-12 text-disabled">
          All items loaded ({items.length} of {total})
        </div>
      )}
    </main>
  );
}