import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App";

// створюємо тему
const theme = createTheme({
  palette: {
    mode: "light", // або "dark"
    primary: { main: "#673ab7" },   // фіолетовий
    secondary: { main: "#00bcd4" }, // бірюзовий
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />   {/* базові стилі для всього сайту */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
