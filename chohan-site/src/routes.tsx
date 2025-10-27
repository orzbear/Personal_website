import type { RouteObject } from "react-router-dom"
import SiteLayout from "./layouts/SiteLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import Projects from "./pages/Projects"
import ProjectDetail from "./pages/ProjectDetail"
  
export const routes: RouteObject[] = [
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/:slug", element: <ProjectDetail /> }
    ]
  }
]
