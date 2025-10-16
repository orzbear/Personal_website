import { NavLink } from "react-router-dom"
const link = "px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="text-lg font-semibold">Cho-Han Hsiung</NavLink>
        <div className="flex gap-1">
          <NavLink to="/about" className={link}>About</NavLink>
          <NavLink to="/projects" className={link}>Projects</NavLink>
          <NavLink to="/ai-data" className={link}>AI & Data</NavLink>
          <NavLink to="/political-research" className={link}>Political Research</NavLink>
          <NavLink to="/cv" className={link}>CV</NavLink>
          <NavLink to="/contact" className={link}>Contact</NavLink>
        </div>
      </nav>
    </header>
  )
}
