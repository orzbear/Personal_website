"use client";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useState } from "react";

// Vite will include everything under /content/writings at build time
const modules = import.meta.glob("/content/writings/*.md", { as: "raw" });

export default function WritingDetail() {
  const { id } = useParams(); // matches the md filename (without .md)
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const key = `/content/writings/${id}.md`;
    const loader = modules[key];
    if (!loader) {
      setError("This article was not found.");
      return;
    }
    (async () => {
      try {
        const raw = await loader();
        setContent(raw);
      } catch {
        setError("Failed to load this article.");
      }
    })();
  }, [id]);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!content) return <p className="text-gray-500">Loading…</p>;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link to="/research" className="text-sm text-slate-700 hover:underline">← Back to Research</Link>
      </div>
      <article className="prose prose-slate max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </article>
    </div>
  );
}
