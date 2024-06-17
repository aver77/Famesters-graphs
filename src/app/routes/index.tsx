import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GraphPage from "pages/graphPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <GraphPage />
    }
]);

const Routes = () => {
    return <RouterProvider router={router} />;
};

export default Routes;
