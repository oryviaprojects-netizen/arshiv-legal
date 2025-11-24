"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";

export default function BlogContentPage({ params }) {
  const { id } = use(params);
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`http://localhost:3000/api/blog/${id}`);
        const result = await res.json();
        setBlog(result?.data || null);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchBlog();
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
        if (err.name !== 'AbortError') {
          copyToClipboard(shareUrl);
        }
      }
    } else {
      copyToClipboard(shareUrl);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Link copied to clipboard!');
    });
  };

 

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="title-h1 text-red-main mb-4">Blog not found</h1>
          <Link href="/blog" className="text-accent-main hover:underline body-default">
            ← Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="w-full bg-background min-h-screen">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-accent-light to-background border-b-2 border-accent-main/20">
        <div className="max-w-4xl mx-auto px-s64 py-s32">
          {/* Back Button */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-accent-main hover:text-accent-dark body-default mb-s24 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blogs
          </Link>

          {/* Category Badge */}
          {blog.category && (
            <div className="mb-s16">
              <span className="inline-block px-s16 py-s8 bg-accent-main text-white rounded-full body-small font-semibold">
                {blog.category}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="hero-h1 text-primary-main mb-s24 leading-tight">
            {blog.title}
          </h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-s24 body-default text-text-secondary mb-s16">
            <div className="flex items-center gap-s8">
              <Calendar className="w-4 h-4" />
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </div>
            
            {blog.duration && (
              <div className="flex items-center gap-s8">
                <Clock className="w-4 h-4" />
                <span>{blog.duration}</span>
              </div>
            )}

            <button
              onClick={handleShare}
              className="flex items-center gap-s8 text-accent-main hover:text-accent-dark transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="flex flex-wrap gap-s8">
              {blog.tags.map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-s12 py-s4 bg-secondary-main text-primary-main rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-4xl mx-auto px-s64 py-s48">
        {/* Thumbnail */}
        {blog.thumbnail && (
          <div className="mb-s48 rounded-r24 overflow-hidden shadow-2xl border-2 border-accent-main/30">
            <img 
              src={blog.thumbnail} 
              alt={blog.title} 
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Description */}
        {blog.description && (
          <div className="mb-s48 p-s24 bg-accent-light/30 border-l-4 border-accent-main rounded-r8">
            <p className="body-large text-text-secondary leading-relaxed italic">
              {blog.description}
            </p>
          </div>
        )}

        {/* Blog Content */}
        <article
          className="blog-content prose prose-lg max-w-none
            prose-headings:text-primary-main prose-headings:font-bold
            prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl
            prose-p:text-text-secondary prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-accent-main prose-a:no-underline hover:prose-a:underline
            prose-strong:text-primary-main prose-strong:font-semibold
            prose-ul:list-disc prose-ul:ml-6 prose-ul:text-text-secondary
            prose-ol:list-decimal prose-ol:ml-6 prose-ol:text-text-secondary
            prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-accent-main 
            prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-text-secondary
            prose-code:bg-accent-light prose-code:px-2 prose-code:py-1 prose-code:rounded
            prose-pre:bg-primary-main prose-pre:text-background prose-pre:p-4 prose-pre:rounded-r8
            prose-img:rounded-r8 prose-img:shadow-lg prose-img:my-8
          "
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>

      {/* Footer CTA */}
      <div className="max-w-4xl mx-auto px-s64 py-s48 border-t-2 border-accent-main/20">
        <div className="text-center">
          <h3 className="title-h3 text-primary-main mb-s16">
            Enjoyed this article?
          </h3>
          <p className="body-default text-text-secondary mb-s24">
            Explore more insightful content on our blog
          </p>
          <Link 
            href="/blog"
            className="inline-block px-s32 py-s16 bg-accent-main text-white rounded-r8 hover:bg-accent-dark transition-colors font-semibold"
          >
            View All Blogs
          </Link>
        </div>
      </div>
    </main>
  );
}