"use client";

import SearchBar from '@/components/ui/SearchBar';
import VideoListingPage from '@/components/VideoListing';
import { useState } from 'react';

function Page() {
  const [searchQuery, setSearchQuery] = useState("");
console.log("hiiii");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <main className="w-full bg-background  py-s64 px-s32">
      {/* SEARCH BAR */}
      <div className="my-s16">
        <SearchBar endpoint="video" onSearch={handleSearch} />
      </div>

      {/* VIDEO LISTING */}
      <VideoListingPage searchQuery={searchQuery} />
    </main>
  );
}

export default Page;