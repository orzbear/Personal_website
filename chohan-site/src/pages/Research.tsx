"use client";
import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import writingsRaw from "@/data/writings.json";
import type { Writing, WritingCategory } from "@/types/writing";
import { Link } from "react-router-dom";

type TabKey = "ai" | "political" | "policy";

const TABS: Array<{ key: TabKey; label: string; cat: WritingCategory }> = [
  { key: "ai",        label: "Data Science & AI",  cat: "ai-data" },
  { key: "political", label: "Political Science",  cat: "political-science" },
  { key: "policy",    label: "Policy Writing",     cat: "policy-writing" }
];

export default function Research() {
  const [tab, setTab] = useState<TabKey>("ai");

  const writings = useMemo(() => writingsRaw as Writing[], []);
  const byCat = useMemo(() => {
    const map: Record<WritingCategory, Writing[]> = {
      "ai-data": [],
      "political-science": [],
      "policy-writing": []
    };
    writings
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .forEach(w => map[w.category].push(w));
    return map;
  }, [writings]);

  const active = byCat[TABS.find(t => t.key === tab)!.cat];

  return (
    <div className="space-y-8 py-7">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold py-15">Research & Writing</h1>
        <p className="text-gray-700">Short essays, notes, and publications across three tracks.</p>
      </header>

      {/* Tabs */}
      <div role="tablist" aria-label="Writing categories" className="flex w-full justify-center">
        <div className="inline-flex items-center gap-1 rounded-full border bg-white/70 backdrop-blur px-1 py-1">
          {TABS.map(t => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              aria-controls={`panel-${t.key}`}
              onClick={() => setTab(t.key)}
              className={cn(
                "px-4 py-2 text-sm rounded-full transition",
                tab === t.key ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Panel */}
      <div className="min-h-[60vh]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="tabpanel"
            id={`panel-${tab}`}
            aria-labelledby={tab}
          >
            <ArticleList items={active} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- Components ---------- */

function ArticleList({ items }: { items: Writing[] }) {
  if (!items?.length) {
    return <p className="text-gray-500">No posts yet in this category.</p>;
  }

  return (
    <ul className="max-w-3xl mx-auto divide-y divide-gray-200">
      {items.map((w) => (
        <li key={w.id} className="py-6">
          <article className="space-y-3">
            <h3 className="text-xl font-semibold">
              {w.link ? (
                <a href={w.link} className="hover:underline" target="_blank" rel="noreferrer">
                  {w.title}
                </a>
              ) : (
                <span>{w.title}</span>
              )}
            </h3>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-500">
              <time dateTime={w.date}>{formatDate(w.date)}</time>
              {w.readTime && <span>• {w.readTime}</span>}
              {!!w.tags?.length && (
                <span className="flex flex-wrap gap-1">
                  {w.tags.map(t => (
                    <span
                      key={t}
                      className="inline-block rounded-full border px-2 py-0.5 text-xs bg-gray-50 text-gray-700"
                    >
                      {t}
                    </span>
                  ))}
                </span>
              )}
            </div>

            {/* Summary */}
            <p className="text-gray-700 leading-relaxed">{w.summary}</p>

            {/* Actions */}
            <div className="pt-1">
              {w.link ? (
                <a href={w.link} className="text-sm text-slate-700 hover:underline" target="_blank" rel="noreferrer">
                  Read →
                </a>
              ) : (
                <Link to={`/writings/${w.id}`} className="text-sm text-slate-700 hover:underline">
                  Read →
                </Link>
              )}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

function formatDate(iso: string) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}
