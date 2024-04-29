import { RenderOptions, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppStore, RootState, setupStore } from "@/redux/store";
import { PropsWithChildren } from "react";

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
    ...renderOptions
  }: ExtendendRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren): JSX.Element {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
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
