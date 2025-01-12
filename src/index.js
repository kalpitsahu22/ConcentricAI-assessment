import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { store } from "./reducers";
import "./style.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const router = createBrowserRouter([{ path: "/", element: <App /> }]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
