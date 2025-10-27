import { useMemo } from "react"
import { useParams, Link } from "react-router-dom"
import data from "../data/projects.json"
import type { Project } from "../types/project";

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = useMemo(() => (data as Project[]).find(p => p.slug === slug), [slug])

  if (!project) {
    return (
      <div>
        <p className="text-gray-600">Project not found.</p>
        <Link to="/projects" className="text-gray-700 hover:underline">← Back to projects</Link>
      </div>
    )
  }

  return (
    <article className="space-y-6">
      <Link to="/projects" className="text-gray-600 hover:underline">← Back</Link>
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">{project.title}</h1>
        <p className="text-gray-700">{project.summary}</p>
        <div className="text-sm text-gray-500">{project.year} · {project.type}</div>
      </header>

      {project.image && (
        <div className="rounded-2xl overflow-hidden border">
          <img src={project.image} alt={project.title} className="w-full object-cover" />
        </div>
      )}

      <section className="prose max-w-none">
        <h2>Problem</h2>
        <p>Briefly describe the user/business problem this project solves.</p>
        <h2>Approach</h2>
        <p>Outline architecture, stack, and any interesting trade-offs.</p>
        <h2>Impact</h2>
        <ul>
          <li>Metric or outcome #1</li>
          <li>Metric or outcome #2</li>
        </ul>
      </section>

      <footer className="flex gap-4 text-sm">
        {project.links?.demo && <a href={project.links.demo} target="_blank" className="hover:underline text-gray-700">Live Demo</a>}
        {project.links?.github && <a href={project.links.github} target="_blank" className="hover:underline text-gray-700">GitHub</a>}
      </footer>
    </article>
  )
}
