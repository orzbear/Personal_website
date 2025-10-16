import type { RouteObject } from "react-router-dom"
import SiteLayout from "./layouts/SiteLayout"
import Home from "./pages/Home"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <SiteLayout />,
    children: [{ index: true, element: <Home /> }]
  }
]
