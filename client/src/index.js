import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.js";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#2D3142",
      white: "#FBFEF9",
    },
    primary: {
      main: "#007EA7",
    },
    secondary: {
      main: "#F49E4C",
    },
    text: {
      primary: "#191923",
      secondary: "#394056",
      white: "#FBFEF9",
    },
    black: {
      main: "#08090C",
    },
  },
});

theme.typography.h1 = {
  fontSize: "4rem",
  [theme.breakpoints.up("sm")]: {
    fontSize: "5rem",
    [theme.breakpoints.up("md")]: {
      fontSize: "6rem",
    },
  },
};

ReactDOM.render(
  //<React.StrictMode>
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <CssBaseline />
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  //</React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
