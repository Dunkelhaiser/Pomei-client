import { lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import ProtectedRoutes from "./context/ProtectedRoutes";
import Home from "./pages/Home/Home";
import Wrapper from "./pages/Wrapper/Wrapper";
import "./scss/styles.scss";

const Archive = lazy(() => import("./pages/Archive/Archive"));
const Bin = lazy(() => import("./pages/Bin/Bin"));
const CreateNote = lazy(() => import("./pages/CreateNote/CreateNote"));
const Folders = lazy(() => import("./pages/Folders/Folders"));
const Folder = lazy(() => import("./pages/Folder/Folder"));
const Note = lazy(() => import("./pages/Note/Note"));
const Notes = lazy(() => import("./pages/Notes/Notes"));
const NotFound = lazy(() => import("./pages/NotFound/NotFound"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const SignIn = lazy(() => import("./pages/SignIn/SignIn"));
const Welcome = lazy(() => import("./pages/Welcome/Welcome"));
const Verification = lazy(() => import("./pages/Verification/Verification"));
const PasswordReset = lazy(() => import("./pages/PasswordReset/PasswordReset"));
const NewPassword = lazy(() => import("./pages/NewPassword/NewPassword"));

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Wrapper />}>
            <Route index element={<Home />} />
            <Route path="notes" element={<Notes />} />
            <Route path="note/:id" element={<Note />} errorElement={<NotFound />} />
            <Route path="create_note" element={<CreateNote />} />
            <Route element={<ProtectedRoutes />}>
                <Route path="folders" element={<Folders />} />
                <Route path="folder/:id" element={<Folder />} />
                <Route path="archive" element={<Archive />} />
                <Route path="bin" element={<Bin />} />
                <Route path="settings" element={<Home />} />
            </Route>
            <Route path="home" element={<Navigate to="/" />} />
            <Route path="index" element={<Navigate to="/" />} />
            <Route element={<ProtectedRoutes reverse />}>
                <Route path="sign_in" element={<SignIn />} />
                <Route path="sign_up" element={<SignUp />} />
                <Route path="reset_password" element={<PasswordReset />} />
                <Route path="reset_password/:token" element={<NewPassword />} />
                <Route path="verify/:token" element={<Verification />} />
            </Route>
            <Route path="welcome" element={<Welcome />} />

            <Route path="*" element={<NotFound />} />
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
