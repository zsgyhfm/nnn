import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./store/";
import theme from "./theme";
import { ThemeProvider } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter basename="/wap">
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </ThemeProvider>,
    document.getElementById("root")
);

// module.hot && module.hot.accept();
