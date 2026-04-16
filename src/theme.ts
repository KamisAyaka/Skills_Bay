import { Theme } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material" {
  interface DefaultTheme extends Theme {}
}

// Block Valley brand theme
let theme = createTheme({
  palette: {
    primary: {
      main: "#3C84F6", // Tech bright blue
      light: "#74A5FF", // Light gray-blue
      dark: "#6999E9", // Medium brand blue
      contrastText: "#fff",
    },

    secondary: {
      main: "#39C46C", // Bright green (logo accent)
      light: "#A1DEFE", // Sky blue glow
      dark: "#4F62FF", // Deep blue (logo accent)
    },

    text: {
      primary: "#303030", // Body text dark gray
      secondary: "#5C5265", // Brand name deep gray
    },

    error: {
      main: "#FC27A1", // Magenta/pink (logo accent)
    },

    warning: {
      main: "#FC27A1",
    },

    background: {
      default: "#FFFFFF", // Pure white
      paper: "#FFFFFF",
    },

    action: {
      active: "#3C84F6",
      hover: "#6999E9",
      disabledBackground: "#E8E8E8",
      disabled: "#B2B2B2",
    },

    divider: "#E8E8E8",
  },

  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica Neue", "Arial", sans-serif',
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
    h1: {
      fontWeight: 700,
      color: "#303030",
    },
    h2: {
      fontWeight: 700,
      color: "#303030",
    },
    h3: {
      fontWeight: 700,
      color: "#303030",
    },
    h4: {
      fontWeight: 600,
      color: "#303030",
    },
    h5: {
      fontWeight: 600,
      color: "#303030",
    },
    h6: {
      fontWeight: 600,
      color: "#303030",
    },
    body1: {
      color: "#303030",
      lineHeight: 1.6,
    },
    body2: {
      color: "#5C5265",
      lineHeight: 1.6,
    },
  },

  shape: {
    borderRadius: 12, // Rounded corners for cards
  },

  shadows: [
    "none",
    "0px 2px 8px rgba(60, 132, 246, 0.05)",
    "0px 4px 12px rgba(60, 132, 246, 0.08)",
    "0px 6px 16px rgba(60, 132, 246, 0.1)",
    "0px 8px 20px rgba(60, 132, 246, 0.12)",
    "0px 10px 24px rgba(60, 132, 246, 0.14)",
    "0px 12px 28px rgba(60, 132, 246, 0.16)",
    "0px 14px 32px rgba(60, 132, 246, 0.18)",
    "0px 16px 36px rgba(60, 132, 246, 0.2)",
    "0px 18px 40px rgba(60, 132, 246, 0.22)",
    "0px 20px 44px rgba(60, 132, 246, 0.24)",
    "0px 22px 48px rgba(60, 132, 246, 0.26)",
    "0px 24px 52px rgba(60, 132, 246, 0.28)",
    "0px 26px 56px rgba(60, 132, 246, 0.3)",
    "0px 28px 60px rgba(60, 132, 246, 0.32)",
    "0px 30px 64px rgba(60, 132, 246, 0.34)",
    "0px 32px 68px rgba(60, 132, 246, 0.36)",
    "0px 34px 72px rgba(60, 132, 246, 0.38)",
    "0px 36px 76px rgba(60, 132, 246, 0.4)",
    "0px 38px 80px rgba(60, 132, 246, 0.42)",
    "0px 40px 84px rgba(60, 132, 246, 0.44)",
    "0px 42px 88px rgba(60, 132, 246, 0.46)",
    "0px 44px 92px rgba(60, 132, 246, 0.48)",
    "0px 46px 96px rgba(60, 132, 246, 0.5)",
    "0px 48px 100px rgba(60, 132, 246, 0.52)",
  ],
});

export default theme;
