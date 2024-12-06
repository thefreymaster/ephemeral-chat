import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme.ts";
import { Router } from "./router/index.tsx";
import { GlobalProvider } from "./providers/GlobalProvider.tsx";

const [html] = document.getElementsByTagName("html");

html.style.backgroundColor = "#000";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <GlobalProvider>
        <Router />
      </GlobalProvider>
    </ChakraProvider>{" "}
  </StrictMode>
);
