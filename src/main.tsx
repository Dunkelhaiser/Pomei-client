import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { VisitedProvider } from "./context/VisitedContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <VisitedProvider>
            <App />
        </VisitedProvider>
    </React.StrictMode>
);
