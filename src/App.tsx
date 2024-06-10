import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { FeedPage } from "./pages/feed";
import { RegisterPage, SignInPage } from "./pages/sign-in";
import { ErrorPage } from "./pages/error";
import { Header } from "./shared/ui";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Header />, 
      errorElement: <ErrorPage />,
      children: [
        {
        path: "/",
        element: <FeedPage />
        },
        {
          path: "/signUp",
          element: <RegisterPage />
        },
        {
          path: "/signIn",
          element: <SignInPage />
        }
      ]
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
