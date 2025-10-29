import { useMemo, useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import FeaturedProjectCard from "@/components/FeaturedProjectCard";
import ProjectCard from "@/components/ProjectCard";
import { SkeletonGradient, SkeletonLines } from "@/components/ProjectSkeletons";
import raw from "@/data/projects.json";
import type { Project } from "@/types/project";

type SortKey = "new" | "old" | "az";

export default function Projects() {
  const [type, setType] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("new");
  const [all, setAll] = useState<Project[]>([]);

  useEffect(() => {
    setAll(raw as Project[]);
  }, []);

  const featured = useMemo(
    () =>
      all
        .filter((p) => p.featured)
        .sort(
          (a, b) => (a.featuredRank ?? 99) - (b.featuredRank ?? 99)
        ),
    [all]
  );

  const others = useMemo(() => {
    let items = all.filter((p) => !p.featured);
    if (type !== "All") items = items.filter((p) => p.type === type);
    if (sort === "new") items = items.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
    if (sort === "old") items = items.sort((a, b) => a.year - b.year || a.title.localeCompare(b.title));
    if (sort === "az")  items = items.sort((a, b) => a.title.localeCompare(b.title));
    return items;
  }, [all, type, sort]);

  const types = useMemo(() => ["All", ...Array.from(new Set(all.map(p => p.type)))], [all]);

  // Build a bento sequence:
  // F0 (span2), O0 (span1), F1 (span2), O1 (span1), then rest O2.. etc.
  const sequence = useMemo(() => {
    const seq: Array<{ kind: "featured" | "other"; proj: Project; span: 1 | 2; bg: "grad" | "lines" | null }> = [];
    if (featured[0]) seq.push({ kind: "featured", proj: featured[0], span: 2, bg: "grad" });
    if (others[0])   seq.push({ kind: "other",    proj: others[0],   span: 1, bg: null });
    if (featured[1]) seq.push({ kind: "featured", proj: featured[1], span: 2, bg: "lines" });
    if (others[1])   seq.push({ kind: "other",    proj: others[1],   span: 1, bg: null });
    // append remaining others
    for (let i = 2; i < Math.min(others.length, 8); i++) {
      seq.push({ kind: "other", proj: others[i], span: 1, bg: null });
    }
    // optionally include a 3rd featured as span-1 to balance
    if (featured[2]) seq.push({ kind: "featured", proj: featured[2], span: 1, bg: "lines" });
    return seq;
  }, [featured, others]);

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="text-gray-700">
          A focused gallery of featured work and select builds.
        </p>
      </header>

      {/* Optional controls — remove if you want minimal page */}
      <section className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex gap-3">
          <select value={type} onChange={e => setType(e.target.value)} className="px-3 py-2 rounded-lg border">
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="px-3 py-2 rounded-lg border"
          >
            <option value="new">Newest ↓</option>
            <option value="old">Oldest ↑</option>
            <option value="az">A–Z</option>
          </select>
        </div>
      </section>

      {/* Bento grid drives the whole page now */}
      <section>
        <BentoGrid className="max-w-6xl mx-auto md:auto-rows-[22rem] gap-6">
          {sequence.map(({ kind, proj, span, bg }, idx) => (
        <BentoGridItem
          key={`${kind}-${proj.slug}-${idx}`}
          className={`relative ${span === 2 ? "md:col-span-2" : "md:col-span-1"}`}
          header={
            <>
              {bg === "grad" && <SkeletonGradient />}
              {bg === "lines" && <SkeletonLines />}
              <div className="relative z-10 h-full">
                {kind === "featured" ? (
                  <FeaturedProjectCard p={proj} />
                ) : (
                  <ProjectCard p={proj} />
                )}
              </div>
            </>
          }
        />
          ))}
        </BentoGrid>
      </section>
    </div>
  );
}
