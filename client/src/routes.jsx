import React, { lazy } from "react";
import { useRoutes } from "@pankod/refine-react-router-v6";
import NavOnly from "./layouts/NavOnly";
import NavFoot from "./layouts/NavFoot";
import {
  Home,
  Discover,
  Hackathons,
  Blogs,
  Profile,
  Hero,
  JobPage,
  Auth,
  DataCollection,
} from "./pages";
import SpecificPost from "./pages/SpecificPost";
export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <NavFoot />,
      children: [{ path: "", element: <Hero /> }],
    },
    {
      path: "/join",
      element: <Auth />,
    },
    {
      path: "/complete/:id",
      element: <DataCollection />,
    },
    {
      path: "/",
      element: <NavOnly />,
      children: [
        { path: "app", element: <Home /> },
        { path: "discover", element: <Discover /> },
        { path: "hackathons", element: <Hackathons /> },
        { path: "blogs", element: <Blogs /> },
        { path: "profile", element: <Profile /> },
        { path: "jobs", element: <JobPage /> },
        { path: "devit/:id", element: <SpecificPost /> },
      ],
    },
    {
      path: "/join",
      element: <Auth />,
    },
  ]);
}
