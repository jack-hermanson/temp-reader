import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { StoreProvider } from "easy-peasy";
import { store } from "./store";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider store={store}>
            <App />
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

serviceWorker.register();
