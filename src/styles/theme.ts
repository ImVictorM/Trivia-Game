import { mixins } from "./mixins";
import { mediaBreakPoints } from "./breakpoints";
import { animations } from "./animation";

export const theme = {
  colors: {
    white: "#FFFFFF",
    red: "#EA5D5D",
    cyan: "#00D5E2",
    green: "#2FC18C",
    darkerGreen: "#35906F",
    yellow: "#F9BA18",
    grey: "#6B7588",
    lightGrey: "#DDDDDD",
    lighterGrey: "#EEEEEE",
    black: "#222222",
    purple: "#3C1B7A",
  },
  fonts: {
    epilogue: "Epilogue" /* CDN font from google fonts */,
    verdana: "Verdana" /* Downloaded font */,
  },
  bp: mediaBreakPoints,
  mixins,
  animations,
};

export type Theme = typeof theme;
