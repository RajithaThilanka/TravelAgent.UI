import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);

const AppRoutes = () => {
  return router;
};

export default AppRoutes;
