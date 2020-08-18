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
      default: "#B0E6E8",
    },
    primary: {
      main: "#DF2201",
    },
    secondary: {
      main: "#C9ADA1",
    },
    change: {
      main: "#d32f2f",
    },
    text: {
      primary: "#463F3A",
      secondary: "#6F645D",
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
