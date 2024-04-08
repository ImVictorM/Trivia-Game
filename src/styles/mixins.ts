import { css } from "styled-components";
import { theme } from "./theme";

function getColorYIQ(colorHex: string): number {
  // https://gomakethings.com/dynamically-changing-the-text-color-based-on-background-color-contrast-with-vanilla-js/
  let hexWithoutSharp = colorHex[0] === "#" ? colorHex.slice(1) : colorHex;

  if (hexWithoutSharp.length === 3) {
    hexWithoutSharp = hexWithoutSharp
      .split("")
      .map((hex) => hex + hex)
      .join("");
  }

  const r = parseInt(hexWithoutSharp.substring(0, 2), 16);
  const g = parseInt(hexWithoutSharp.substring(2, 4), 16);
  const b = parseInt(hexWithoutSharp.substring(4, 6), 16);

  return (r * 299 + g * 587 + b * 114) / 1000;
}

export const mixins = {
  getContrastColor: (bgColorHex: string): string => {
    const yiq = getColorYIQ(bgColorHex);
    return yiq > 128 ? theme.colors.black : theme.colors.white;
  },
  adjustColorBrightness: (bgColorHex: string) => {
    const yiq = getColorYIQ(bgColorHex);
    return css`
      filter: brightness(${yiq > 128 ? 0.85 : 1.15});
    `;
  },
};
