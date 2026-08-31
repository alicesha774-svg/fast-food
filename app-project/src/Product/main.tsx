import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "../App";
import NotFoundPage from "./notfound";
import "../index.css";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/menu", element: <App /> },
  { path: "/about", element: <App /> },
  { path: "/foods", element: <App /> },
  { path: "/foods/:id", element: <App /> },
  { path: "*", element: <NotFoundPage /> },
]);

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element was not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
