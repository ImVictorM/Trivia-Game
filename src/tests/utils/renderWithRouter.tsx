import { RouterProvider, createMemoryRouter } from "react-router-dom";
import renderWithProviders from "./renderWithProviders";
import { routes } from "@/router";

export default function renderWithRouter(
  initialRoutes: string[],
  initialRouteIndex = 0
) {
  const testRouter = createMemoryRouter(routes, {
    initialEntries: initialRoutes,
    initialIndex: initialRouteIndex,
  });

  return { ...renderWithProviders(<RouterProvider router={testRouter} />) };
}
