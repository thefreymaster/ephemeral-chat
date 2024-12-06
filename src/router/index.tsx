import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import App from "../App.tsx";

function Layout() {
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/:sessionId",
        element: <App />,
      },
    ],
  },
]);

export const Router = () => <RouterProvider router={router} />;
