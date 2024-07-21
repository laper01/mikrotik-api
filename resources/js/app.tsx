import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import Main from "./Main";
import "./bootstrap";
import "../css/app.css";
import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const storeAuth = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
});

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <AuthProvider store={storeAuth}>
                    <QueryClientProvider client={queryClient}>
                        <Router>
                            <Main />
                        </Router>
                        </QueryClientProvider>
                    </AuthProvider>
                </PersistGate>
            </Provider>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}
