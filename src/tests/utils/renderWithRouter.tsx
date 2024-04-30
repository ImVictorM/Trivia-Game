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
  arg1: React.ReactElement | string[],
  arg2: number = 0
) {
  let routerRoutes: RouteObject[];
  let initialRoutes: string[];

  if (Array.isArray(arg1)) {
    routerRoutes = routes;
    initialRoutes = arg1;
  } else {
    routerRoutes = [
      {
        path: "/",
        element: arg1,
      },
    ];
    initialRoutes = ["/"];
  }

  const testRouter = createMemoryRouter(routerRoutes, {
    initialEntries: initialRoutes,
    initialIndex: arg2,
  });

  return { ...renderWithProviders(<RouterProvider router={testRouter} />) };
}
