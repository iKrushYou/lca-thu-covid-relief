import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import ThemeProvider from "@material-ui/styles/ThemeProvider";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
