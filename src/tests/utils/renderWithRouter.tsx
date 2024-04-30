import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import renderWithProviders from "./renderWithProviders";
import { routes } from "@/router";

export default function renderWithRouter(
  ui: React.ReactElement
): ReturnType<typeof renderWithProviders>;

export default function renderWithRouter(
  initialRoutes: string[],
  initialRouteIndex?: number
): ReturnType<typeof renderWithProviders>;

export default function renderWithRouter(
  routes: RouteObject[],
  initialRoutes: string[],
  initialRouteIndex?: number
): ReturnType<typeof renderWithProviders>;

export default function renderWithRouter(
  arg1: React.ReactElement | string[] | RouteObject[],
  arg2?: number | string[],
  arg3?: number
) {
  let routerRoutes: RouteObject[];
  let initialRoutes: string[];
  let initialRouteIndex: number;

  if (Array.isArray(arg1)) {
    if (Array.isArray(arg2)) {
      routerRoutes = arg1 as RouteObject[];
      initialRoutes = arg2 as string[];
      initialRouteIndex = arg3 || 0;
    } else {
      routerRoutes = routes;
      initialRoutes = arg1 as string[];
      initialRouteIndex = arg2 || 0;
    }
  } else {
    routerRoutes = [
      {
        path: "/",
        element: arg1,
      },
    ];
    initialRoutes = ["/"];
    initialRouteIndex = 0;
  }

  const testRouter = createMemoryRouter(routerRoutes, {
    initialEntries: initialRoutes,
    initialIndex: initialRouteIndex,
  });

  return { ...renderWithProviders(<RouterProvider router={testRouter} />) };
}
