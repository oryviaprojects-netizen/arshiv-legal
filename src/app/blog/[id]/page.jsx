"use client";
import React from "react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2, Check } from "lucide-react";

export default function BlogContentPage({ params }) {
  const { id } = React.use(params);


  const [blog, setBlog] = useState(null);
  const [showCopied, setShowCopied] = useState(false);

  const cacheRef = useRef({});
  const abortRef = useRef(null);

  useEffect(() => {
    async function fetchBlog() {
      if (!id) return;

      // 🔥 Instant cache hit
      if (cacheRef.current[id]) {
        setBlog(cacheRef.current[id]);
        return;
      }

      // Cancel old request
      if (abortRef.current) abortRef.current.abort();
      abortRef.current = new AbortController();

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/${id}`,
          {
            signal: abortRef.current.signal,
            cache: "no-cache" // more reliable for SSR
          }
        );

        console.log("API response:", res);

        if (!res.ok) throw new Error("Failed to fetch blog");

        const result = await res.json();
        console.log("Parsed blog:", result);

        const blogData = result?.data;

        if (!blogData) throw new Error("Missing blog data");

        cacheRef.current[id] = blogData;
        setBlog(blogData);

      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch error:", err);
        }
      }
    }

    fetchBlog();

    return () => {
      if (abortRef.current) abortRef.current.abort();
    };
  }, [id]);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/blog/${id}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: blog.title,
          text: blog.description || blog.title,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") copyToClipboard(shareUrl);
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
  };

  // ⏳ Skeleton Loader
  if (!blog) {
    return (
      <main className="w-full min-h-screen bg-background">
        <div className="bg-gradient-to-b from-accent-light to-background border-b-2 border-accent-main/20">
          <div className="max-w-4xl mx-auto px-s64 py-s32">
            <div className="h-6 w-32 bg-accent-main/20 rounded animate-pulse mb-s24"></div>
            <div className="h-8 w-24 bg-accent-main/30 rounded-full mb-s16 animate-pulse"></div>
            <div className="h-12 w-3/4 bg-primary-main/20 rounded mb-s24 animate-pulse"></div>
            <div className="flex gap-s24 mb-s16">
              <div className="h-6 w-32 bg-text-secondary/20 rounded animate-pulse"></div>
              <div className="h-6 w-24 bg-text-secondary/20 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="w-full min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-b from-accent-light to-background border-b-2 border-accent-main/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-s64 py-s32">

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-accent-main hover:text-accent-dark body-default mb-s24 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blogs
          </Link>

          {blog.category && (
            <div className="mb-s16 animate-fadeIn">
              <span className="inline-block px-s16 py-s8 bg-accent-main text-white rounded-full body-small font-semibold shadow-md">
                {blog.category}
              </span>
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-main mb-s24 leading-tight animate-fadeIn">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-s24 text-text-secondary mb-s16">
            <div className="flex items-center gap-s8">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {blog.duration && (
              <div className="flex items-center gap-s8">
                <Clock className="w-4 h-4" />
                <span>{blog.duration}</span>
              </div>
            )}

            <button
              onClick={handleShare}
              className="flex items-center gap-s8 text-accent-main hover:text-accent-dark transition-all hover:scale-105 active:scale-95"
            >
              {showCopied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Share</span>
                </>
              )}
            </button>
          </div>

          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-s8">
              {blog.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-s12 py-s4 bg-secondary-main text-primary-main rounded-full text-xs sm:text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 md:px-s64 py-s48">
        {blog.thumbnail && (
          <img
            src={blog.thumbnail}
            className="w-full rounded-r24 shadow-xl border-2 border-accent-main/30"
            loading="eager"
            alt={blog.title}
          />
        )}

        {blog.description && (
          <div className="my-s48 p-s24 bg-accent-light/20 border-l-4 border-accent-main rounded-r8">
            <p className="italic">{blog.description}</p>
          </div>
        )}

        <article
          className="blog-content prose prose-lg max-w-none animate-fadeIn"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </main>
  );
}
