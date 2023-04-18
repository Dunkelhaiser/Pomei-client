import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Wrapper from "./pages/Wrapper/Wrapper";
import "./scss/styles.scss";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<Wrapper />}>
            {/* <Route index element={<Index />} /> */}
        </Route>
    )
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
