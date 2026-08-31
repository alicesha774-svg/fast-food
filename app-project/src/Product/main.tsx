import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../App.tsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

const NotFound = () => <div>404 - Not Found</div>;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

createRoot(document.getElementById('root')!).render(
    <RouterProvider router={router} />
)
