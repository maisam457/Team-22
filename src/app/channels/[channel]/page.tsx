"use client";

import { notFound } from "next/navigation";
import { getTagsByType, getTagById } from "@/data/mockTags";
import { mockPosts } from "@/data/mockPosts";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function ChannelPage({ params }: { params: { channel: string } }) {
  const { channel } = require('react').use(params);
  const tag = getTagById(channel);
  if (!tag) return notFound();

  // Filter posts by diagnosis tag
  const [posts, setPosts] = useState(
    mockPosts.filter(post => post.tags.some(t => t.id === tag.id))
  );
  const [input, setInput] = useState("");

  const handlePost = () => {
    if (!input.trim()) return;
    setPosts([
      {
        id: `post_${Date.now()}`,
        authorId: "You",
        createdAt: new Date().toISOString(),
        content: input,
        tags: [tag],
        reactions: { like: 0, support: 0, celebrate: 0 },
        commentCount: 0,
      },
      ...posts,
    ]);
    setInput("");
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <header className="mb-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-lg font-semibold">#{tag.label.charAt(0).toUpperCase()}</div>
          <div className="flex-1">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">{tag.label}</h1>
            <p className="text-sm text-slate-500 mt-1">A place to share experiences, ask questions, and connect with others who share this interest.</p>
          </div>
          <div>
            <Badge variant="secondary" className="ml-2">Connect by Channel</Badge>
          </div>
        </div>
      </header>

      {/* Post input box */}
      <div className="mb-8 bg-white rounded-lg shadow p-4 border border-slate-100">
        <textarea
          className="w-full border border-slate-200 rounded-lg p-3 text-gray-800 text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
          rows={3}
          placeholder={`Share something in #${tag.label}...`}
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition float-right"
          onClick={handlePost}
        >
          Post
        </button>
        <div className="clear-both" />
      </div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-gray-400 text-center py-12">No posts yet. Start the conversation!</div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow p-6 border border-slate-100">
              <div className="font-semibold text-blue-700 mb-2">{post.authorId}</div>
              <div className="text-gray-800 mb-2">{post.content}</div>
              <div className="flex gap-2 flex-wrap">
                {post.tags.map(tag => (
                  <Badge key={tag.id} variant="secondary" className="text-xs bg-blue-100 text-blue-800 border-blue-200">
                    {tag.label}
                  </Badge>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
