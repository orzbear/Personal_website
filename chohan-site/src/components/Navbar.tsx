import { useLocation, useNavigate } from "react-router-dom"
import PillNav from "./PillNav" // adjust path if needed

export default function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()

  const onClickCapture: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target as HTMLElement
    const a = target.closest("a") as HTMLAnchorElement | null
    if (!a) return
    const href = a.getAttribute("href")
    if (!href) return
    if (href.startsWith("/")) {
      e.preventDefault()
      navigate(href)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50
                     bg-white/70 dark:bg-slate-900/60
                     backdrop-blur-md backdrop-saturate-150">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div onClickCapture={onClickCapture}>
          <div className="flex justify-center items-center w-full">
          <PillNav
            logo="/images/bear-logo.png"
            logoAlt="Bear Logo"

            items={[
              { label: "Home", href: "/" },
              { label: "About", href: "/About" },
              { label: "Projects", href: "/projects" },
              // { label: "AI & Data", href: "/ai-data" },
              { label: "Research & Writing", href: "/research" },
              // { label: "Recipes", href: "/Recipes" }
            ]}

            activeHref={location.pathname}
            className="w-full"
            ease="power2.out"
            baseColor="#FFFFFF"
            pillColor="#0F172A"
            hoveredPillTextColor="#000000"
            pillTextColor="#FFFFFF"
          />
        </div>
      </div>
      </div>
    </header>
  )
}
