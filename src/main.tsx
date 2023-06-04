import React from "react";
import ReactDOM from "react-dom/client";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import App from "./App";
import NotesContextProvider from "./context/NotesContext";
import UserContextProvider from "./context/UserContext";
import VisitedProvider from "./context/VisitedContext";

if (import.meta.env.NODE_ENV === "production") {
    disableReactDevTools();
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <UserContextProvider>
            <NotesContextProvider>
                <VisitedProvider>
                    <App />
                </VisitedProvider>
            </NotesContextProvider>
        </UserContextProvider>
    </React.StrictMode>
);
