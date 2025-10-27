import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import SplitText from "../components/SplitText"


type Project = { title: string; slug: string; summary?: string; date?: string }
type Writing = { title: string; slug: string; date?: string }

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([])
  const [writings, setWritings] = useState<Writing[]>([])

  useEffect(() => {
    // Mock data for now; we’ll swap writings to Notion later
    import("../data/projects.json").then(m => {
      const items = (m.default as Project[]).sort((a,b) => (b.date||"").localeCompare(a.date||"")).slice(0,3)
      setProjects(items)
    })
    fetch("/mock/policy.json")
      .then(r => r.json())
      .then((items: Writing[]) => {
        const top = items.sort((a,b) => (b.date||"").localeCompare(a.date||"")).slice(0,3)
        setWritings(top)
      })
      .catch(() => setWritings([]))
  }, [])

  return (
    <div className="space-y-12 py-20">
    {/* --- Intro section --- */}
    <section className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
      {/* Left: Image */}
      <div className="flex-shrink-0 w-full lg:w-1/2 flex justify-center">
        <img
          src="/images/bear-logo.png"
          alt="Welcome bear illustration"
          className="rounded-2xl w-[300px] object-contain"
        />
      </div>

      {/* Right: Intro */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 space-y-4 text-center lg:text-left">
        <SplitText
          text="Welcome"
          className="text-4xl font-bold"
          delay={80}
          duration={0.6}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          threshold={0.1}
          rootMargin="-100px"
          textAlign="left"
        />

        <p className="text-gray-700 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
          I’m Cho-Han — a software engineer with a deep interest in data science,
          AI, and political research. This website brings together my full-stack
          engineering projects, applied AI experiments, and policy writings. It’s a
          place where technology and public policy thinking meet — and where I share
          ongoing work, reflections, and ideas that bridge these worlds.
        </p>
      </div>
    </section>


      {/* 3) Recent updates */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold">Recent Updates</h2>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* a) Recent Projects */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold">Recent Projects</h3>
              <Link to="/projects" className="text-sm text-gray-600 hover:text-gray-800 hover:underline">View all →</Link>
            </div>
            <ul className="space-y-4">
              {projects.length === 0 && <li className="text-gray-500">No recent projects yet.</li>}
              {projects.map(p => (
                <li key={p.slug} className="border rounded-xl p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{p.title}</h4>
                    {p.date && <span className="text-xs text-gray-500">{p.date}</span>}
                  </div>
                  {p.summary && <p className="text-sm text-gray-600 mt-1">{p.summary}</p>}
                  <div className="mt-2">
                    <Link to={`/projects`} className="text-sm text-accent hover:underline">Details</Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* b) Recent Writings */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xl font-semibold">Recent Writings</h3>
              <Link to="/political-research/policy-writings" className="text-sm text-gray-600 hover:text-gray-800 hover:underline">View all →</Link>
            </div>
            <ul className="space-y-4">
              {writings.length === 0 && <li className="text-gray-500">No recent writings yet.</li>}
              {writings.map(w => (
                <li key={w.slug} className="border rounded-xl p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">
                      <Link to={`/political-research/policy-writings/${w.slug}`} className="hover:underline">
                        {w.title}
                      </Link>
                    </h4>
                    {w.date && <span className="text-xs text-gray-500">{w.date}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

