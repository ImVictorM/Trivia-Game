import {
  RouteObject,
  RouterProvider,
  createMemoryRouter,
} from "react-router-dom";
import renderWithProviders, {
  ExtendedRenderOptions,
} from "./renderWithProviders";
import { routes } from "@/router";

export default function renderWithRouter(
  ui: React.ReactElement,
  options?: ExtendedRenderOptions
): ReturnType<typeof renderWithProviders>;

export default function renderWithRouter(
  initialRoutes: string[],
  initialRouteIndex?: number,
  options?: ExtendedRenderOptions
): ReturnType<typeof renderWithProviders>;

export default function renderWithRouter(
  routes: RouteObject[],
  initialRoutes: string[],
  initialRouteIndex?: number,
  options?: ExtendedRenderOptions
): ReturnType<typeof renderWithProviders>;

export default function renderWithRouter(
  arg1: React.ReactElement | string[] | RouteObject[],
  arg2?: number | string[] | ExtendedRenderOptions,
  arg3?: number | ExtendedRenderOptions,
  arg4?: ExtendedRenderOptions
) {
  let routerRoutes: RouteObject[];
  let initialRoutes: string[];
  let initialRouteIndex: number;
  let options: ExtendedRenderOptions | undefined;

  if (Array.isArray(arg1)) {
    if (Array.isArray(arg2)) {
      routerRoutes = arg1 as RouteObject[];
      initialRoutes = arg2 as string[];
      initialRouteIndex = Number(arg3) || 0;
      options = arg4;
    } else {
      routerRoutes = routes;
      initialRoutes = arg1 as string[];
      initialRouteIndex = Number(arg2) || 0;
      options = arg3 as ExtendedRenderOptions | undefined;
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
    options = arg2 as ExtendedRenderOptions | undefined;
  }

  const testRouter = createMemoryRouter(routerRoutes, {
    initialEntries: initialRoutes,
    initialIndex: initialRouteIndex,
  });

  return {
    ...renderWithProviders(<RouterProvider router={testRouter} />, options),
  };
}
