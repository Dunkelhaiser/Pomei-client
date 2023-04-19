import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import Home from "./pages/Home/Home";
import Notes from "./pages/Notes/Notes";
import NotFound from "./pages/NotFound/NotFound";
import Wrapper from "./pages/Wrapper/Wrapper";
import "./scss/styles.scss";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Wrapper />}>
            <Route index element={<Home />} />
            <Route path="notes" element={<Notes />} />
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="index" element={<Navigate to="/" />} />
            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
