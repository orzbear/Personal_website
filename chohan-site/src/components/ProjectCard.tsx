import { Link } from "react-router-dom"
import ProjectBadge from "./ProjectBadge"

type Links = { demo?: string; github?: string; case?: string }
export type ProjectItem = {
  slug: string
  title: string
  summary: string
  stack: string[]
  year: number
  type: string
  image?: string
  links?: Links
}

export default function ProjectCard({ p }: { p: ProjectItem }) {
  const img = p.image || ""
  return (
    <div className="rounded-2xl border overflow-hidden hover:shadow-md transition bg-white">
      <div className="aspect-video bg-gray-50 overflow-hidden">
        {img ? (
          <img src={img} alt={p.title} loading="lazy" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">🧩</div>
        )}
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <span className="text-xs text-gray-500">{p.year}</span>
        </div>
        <p className="text-sm text-gray-700">{p.summary}</p>
        <div className="flex flex-wrap gap-2">
          {p.stack?.map(s => <ProjectBadge key={s}>{s}</ProjectBadge>)}
        </div>
        <div className="flex items-center gap-3 text-sm">
          {p.links?.demo && <a className="hover:underline text-gray-700" href={p.links.demo} target="_blank">Demo</a>}
          {p.links?.github && <a className="hover:underline text-gray-700" href={p.links.github} target="_blank">GitHub</a>}
          <Link className="hover:underline text-gray-700" to={`/projects/${p.slug}`}>Details</Link>
        </div>
      </div>
    </div>
  )
}
