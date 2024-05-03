import "@testing-library/jest-dom/vitest";

vi.mock("react-i18next");

vi.mock("axios");

vi.mock("@/services/googleTranslateApi");

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
