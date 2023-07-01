import React from "react";
import ReactDOM from "react-dom/client";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import NotesContextProvider from "./context/NotesContext";
import UserContextProvider from "./context/UserContext";
import VisitedProvider from "./context/VisitedContext";

if (`${import.meta.env.VITE_NODE_ENV}` === "production") {
    disableReactDevTools();
}

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <NotesContextProvider>
                    <VisitedProvider>
                        <App />
                    </VisitedProvider>
                </NotesContextProvider>
            </UserContextProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
