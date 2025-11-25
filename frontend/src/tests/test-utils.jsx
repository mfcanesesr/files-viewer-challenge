import React from "react";
import { ThemeProvider } from "styled-components";
import { render } from "@testing-library/react";

const theme = {
  radius: {
    pill: "50px",
  },
  colors: {
    text: "#ffffff",
    textMain: "#ffffff",
    textMuted: "rgba(255,255,255,0.6)",
    primary: "#4f46e5",
    toolBox: "#ef3245",
    toolBox2: "#3b82f6",
    border: "rgba(255,255,255,0.12)"
  }
};

const AllTheProviders = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const customRender = (ui, options) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
