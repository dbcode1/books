import React from "react";
import ReactDOM from "react-dom/client";
import { ContextProvider } from "./Context";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Error from "./components/Error/Error";
import Preview from "./components/pages/Preview/Preview"
import Best from "./components/pages/Best/Best";
import Library from "./components/pages/Library/Library";
import { BestByDate } from "./components/pages/BestByDate/BestByDate";
import App from "./App";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    
    children: [
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
  {
    path: "preview",
    element: <Preview />,
  }
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);
