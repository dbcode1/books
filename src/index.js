import React from "react";
import ReactDOM from "react-dom/client";
import { ContextProvider } from "./Context";
import { Show } from "./ModalContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Error from "./components/Error/Error";
import Best from "./components/pages/Best/Best";
import Library from "./components/pages/Library/Library";
import { BestByDate } from "./components/pages/BestByDate/BestByDate";
import Root from "./components//Root/Root";
import Home from "./components/pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/best",
        element: <Best />,
      },
      {
        path: "/best-by-date",
        element: <BestByDate />,
      },
      {
        path: "/library",
        element: <Library />,
      },
    ],
  },

]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <Show>
      <RouterProvider router={router} />
    </Show>
  </ContextProvider>
);
