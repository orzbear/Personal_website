import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function SiteLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-ink">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
