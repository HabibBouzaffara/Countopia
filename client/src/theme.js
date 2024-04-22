import { BorderColor } from "@mui/icons-material";

// color design tokens export
export const tokensDark = {
  grey: {
    0: "#EEF2F6", // manually adjusted
    10: "#EEF2F6", // manually adjusted
    50: "#EEF2F6", // manually adjusted
    100: "#EEF2F6",
    200: "#EEF2F6",
    300: "#EEF2F6",
    400: "#EEF2F6",
    500: "#EEF2F6",
    600: "#EEF2F6",
    700: "#EEF2F6",
    800: "#EEF2F6",
    900: "#EEF2F6",
    1000: "#EEF2F6", // manually adjusted
  },
  primary: {
    // blue
    100: "#d3d4de",
    200: "#a6a9be",
    300: "#7a7f9d",
    400: "#4d547d",
    500: "#21295c",
    600: "#191F45", // manually adjusted
    700: "#141937",
    800: "#0d1025",
    900: "#070812",
  },
  secondary: {
    // yellow
    50: "#3F4BC9", // manually adjusted
    100: "#3F4BC9",
    200: "#3F4BC9",
    300: "#3F4BC9",
    400: "#3F4BC9",
    500: "#3F4BC9",
    600: "#3F4BC9",
    700: "#3F4BC9",
    800: "#3F4BC9",
    900: "#3F4BC9",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // Palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
            text: {
              primary: "#000000", // Set text color to black in dark mode
              secondary: "#000000", // Set secondary text color to white in dark mode
            },
          }
        : {
            // Palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50],
            },
            text: {
              primary: "#000000", // Set text color to black in light mode if needed
              secondary: "#000000", // Set secondary text color to black in light mode if needed
            },
          }),
    },
    typography: {
      fontFamily: ["poppins", "poppins"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["poppins", "poppins"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["poppins", "poppins"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["poppins", "poppins"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["poppins", "poppins"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["poppins", "poppins"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["poppins", "poppins"].join(","),
        fontSize: 14,
      },
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            backgroundColor: "#ffffff",
            borderRadius: 25,
            border:mode === "dark" ? "1px solid #d3d4de" : undefined,
            color: "#000000",
          },
        },
      },
    },
  };
};