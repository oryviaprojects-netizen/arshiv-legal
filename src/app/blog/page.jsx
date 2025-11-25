"use client";

import BlogVideoListingPage from '@/components/BlogListing';
import SearchBar from '@/components/ui/SearchBar';
import { useState } from 'react';

function Page() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="w-full bg-background py-s64 px-s32">
      {/* ✅ SearchBar with endpoint="blog" (default) */}
      <div className="my-s16">
        <SearchBar onSearch={handleSearch} endpoint="blog" />
      </div>

      {/* ✅ BlogVideoListingPage receives searchQuery and doesn't render its own SearchBar */}
      <BlogVideoListingPage searchQuery={searchQuery} />
    </div>
  );
}

export default Page;