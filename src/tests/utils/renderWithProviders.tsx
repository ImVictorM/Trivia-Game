import { RenderOptions, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "@/redux/store";
import { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "@/styles/theme";
import userEvent from "@testing-library/user-event";

type ExtendendRenderOptions = Omit<RenderOptions, "queries"> & {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  route?: string;
};

export default function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    route,
    ...renderOptions
  }: ExtendendRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </Provider>
      </BrowserRouter>
    );
  }

  if (route) {
    window.history.pushState({}, "Test page", route);
  }

  return {
    user: userEvent.setup(),
    store,
    ...render(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  };
}
