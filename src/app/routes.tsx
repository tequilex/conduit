import { createBrowserRouter } from "react-router-dom";

import { HomePage } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { SignInPage } from "../pages/SignIn";
import { SignUpPage } from "../pages/SignUp";
import { ErrorPage } from "../pages/Error";
import { Header } from "../shared/ui/Header";
import { ArticleRead } from "../pages/ArticleRead";
import { ArticleEdit } from "../pages/ArticleEdit";
import { Settings } from "../pages/Settings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/signUp",
        element: <SignUpPage />,
      },
      {
        path: "/signIn",
        element: <SignInPage />,
      },
      {
        path: "/articles/:slug",
        element: <ArticleRead />,
      },
      {
        path: "/profiles/:username",
        element: <Profile />,
      },
      {
        path: "/editor/:slug?",
        element: <ArticleEdit />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);
export default router;
