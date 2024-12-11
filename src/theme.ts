import { extendTheme } from "@chakra-ui/react";

const config = () => {
  return {
    initialColorMode: "dark",
    useSystemColorMode: false,
    styles: {
      global: {
        // styles for the `body`
        html: {
          backgroundColor: "brand.50",
        },
      },
    },
  };
};

const theme = extendTheme({
  config: config(),
  colors: {
    brand: {
      50: "#e9ebed", // Dim Cloud
      100: "#c4c9d0", // Faded Mist
      200: "#9ca3b0", // Deep Silver Blue
      300: "#6e798c", // Dark Slate
      400: "#49506a", // Muted Gray Blue
      500: "#313b4f", // Dark Base Gray Blue
      600: "#232a3a", // Shadowy Blue
      700: "#181f2a", // Charcoal
      800: "#0e121a", // Deep Charcoal
      900: "#05080c", // Near Black
    },
    accent: {
      50: "#fef7f0", // Whisper Peach
      100: "#fde7d9", // Soft Sand
      200: "#fbc8a6", // Subtle Glow
      300: "#f79d68", // Vibrant Peach
      400: "#f17c3d", // Polished Copper
      500: "#d9641e", // Sleek Amber
      600: "#aa4f17", // Burnt Copper
      700: "#7c3b10", // Rich Rust
      800: "#4e2409", // Deep Ember
      900: "#2a1304", // Charcoal Rust
    },
  },
});

export default theme;
