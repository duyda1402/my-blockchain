import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/layout/RootLayout";
import HomePage from "./pages/home";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
]);
