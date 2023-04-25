import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import ProtectedRoutes from "./context/ProtectedRoutes";
import Archive from "./pages/Archive/Archive";
import Bin from "./pages/Bin/Bin";
import Folders from "./pages/Folders/Folders";
import Home from "./pages/Home/Home";
import Notes from "./pages/Notes/Notes";
import NotFound from "./pages/NotFound/NotFound";
import Welcome from "./pages/Welcome/Welcome";
import Wrapper from "./pages/Wrapper/Wrapper";
import "./scss/styles.scss";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Wrapper />}>
            <Route index element={<Home />} />
            <Route path="notes" element={<Notes />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="folders">
                    <Route index element={<Folders />} />
                    <Route path=":folderId" element={<Notes />} />
                </Route>
                <Route path="archive" element={<Archive />} />
                <Route path="bin" element={<Bin />} />
            </Route>
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="index" element={<Navigate to="/" />} />
            <Route path="welcome" element={<Welcome />} />

            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
