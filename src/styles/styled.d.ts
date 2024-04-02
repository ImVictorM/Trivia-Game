import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      white: "#FFFFFF";
      red: "#EA5D5D";
      cyan: "#00D5E2";
      darkerGreen: "#35906F";
      green: "#2FC18C";
      yellow: "#F9BA18";
      grey: "#6B7588";
      lightGrey: "#DDDDDD";
      black: "#222222";
    };
    fonts: {
      epilogue: "Epilogue";
      verdana: "Verdana";
    };
    bp: {
      mobileS: `(min-width: 330px)`;
      mobileM: `(min-width: 400px)`;
      mobileL: `(min-width: 480px)`;
      tabletS: `(min-width: 600px)`;
      tabletL: `(min-width: 768px)`;
      desktopXS: `(min-width: 900px)`;
      desktopS: `(min-width: 1080px)`;
      desktopM: `(min-width: 1200px)`;
      desktopL: `(min-width: 1400px)`;
    };
  }
}
