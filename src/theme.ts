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
      50: "#f7f9fb", // Soft Cloud
      100: "#e3e8ef", // Light Mist
      200: "#c9d2dd", // Silver Blue
      300: "#a3b1c4", // Soft Slate
      400: "#7f94af", // Gray Blue
      500: "#5e7898", // Base Gray Blue
      600: "#495d7a", // Steely Blue
      700: "#36465d", // Charcoal Blue
      800: "#252f3f", // Deep Slate
      900: "#13181f", // Midnight Gray
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
