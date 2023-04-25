import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserContextProvider from "./context/UserContext";
import VisitedProvider from "./context/VisitedContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <UserContextProvider>
            <VisitedProvider>
                <App />
            </VisitedProvider>
        </UserContextProvider>
    </React.StrictMode>
);
