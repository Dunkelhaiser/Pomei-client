import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NotesContextProvider from "./context/NotesContext";
import UserContextProvider from "./context/UserContext";
import VisitedProvider from "./context/VisitedContext";

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
