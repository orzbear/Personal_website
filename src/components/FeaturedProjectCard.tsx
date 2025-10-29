import { Link } from "react-router-dom"
import ProjectBadge from "./ProjectBadge"
import type { ProjectItem } from "./ProjectCard"
import { WobbleCard } from "@/components/ui/wobble-card" // ← use your wobble card

export default function FeaturedProjectCard({ p }: { p: ProjectItem & { metrics?: string[] } }) {
  const img = p.image || ""
  return (
    <WobbleCard
      containerClassName="
        bg-white rounded-3xl border overflow-hidden
        hover:shadow-2xl transition-transform duration-200
        w-full lg:max-w-none
        mx-auto
        scale-[1.02] hover:scale-[1.04]
      "
      className="p-6"
    >
      <div className="aspect-[16/9] bg-gray-50 overflow-hidden">
        {img ? (
          <img
            src={img}
            alt={p.title}
            loading="lazy"
            className="w-full h-full object-cover rounded-t-3xl shadow-md"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🚀</div>
        )}
      </div>

      <div className="px-0 py-2 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{p.title}</h3>
          <span className="text-xs text-gray-500">{p.year}</span>
        </div>

        <p className="text-gray-700">{p.summary}</p>

        {p.metrics?.length ? (
          <div className="flex flex-wrap gap-2">
            {p.metrics.map(m => (
              <span className="inline-block text-sm px-3 py-1 rounded-full
               bg-emerald-50 text-emerald-700 border border-emerald-100">
                {m}
              </span>
            ))}
          </div>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {p.stack?.map(s => <ProjectBadge key={s}>{s}</ProjectBadge>)}
        </div>

        <div className="flex items-center gap-3 text-sm">
          {p.links?.demo && <a className="hover:underline text-gray-700" href={p.links.demo} target="_blank" rel="noreferrer">Demo</a>}
          {p.links?.github && <a className="hover:underline text-gray-700" href={p.links.github} target="_blank" rel="noreferrer">GitHub</a>}
          <Link className="hover:underline text-gray-700" to={`/projects/${p.slug}`}>Case Study</Link>
        </div>
      </div>
    </WobbleCard>
  )
}
