import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ContextProvider } from "./Context";
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Error from "./components/Error/Error";
import Preview from "./components/pages/Preview/Preview";
import Best from "./components/pages/Best/Best";
import Library from "./components/pages/Library/Library";
import { BestByDate } from "./components/pages/BestByDate/BestByDate";
import Root from "./components//Root/Root";
import App from "./App";
import Home from "./components/pages/Home/Home";

// const App = () => {
//   return (
//     <>
//     <Routes >
//       <Route path="/" element="<Root/>">
//         <Route path='/home' element={<Home />} />
//         <Route path="/best" element={<Best />} />
//         <Route path="/best-by-date" element={<BestByDate />} />
//         <Route path="/library" element={<Library />} />
//         <Route path="/preview" element={<Preview />} />
//       </Route>

//     </Routes>

//     </>
//     )
//   }

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
  {
    path: "/preview",
    element: <Preview />,
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
);

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//      <ContextProvider>

//     <RouterProvider router={router} />
//     </ContextProvider>
//   </React.StrictMode>
// );

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>
// );
