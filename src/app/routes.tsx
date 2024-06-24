import { createBrowserRouter } from 'react-router-dom';

import { HomePage } from '../pages/home';
import { Profile } from '../pages/profile';
import { SignInPage } from '../pages/signIn';
import { SignUpPage } from '../pages/signUp';
import { ErrorPage } from '../pages/error';
import { Header } from '../shared/ui/Header';
import { Article } from '../pages/article';
import { ArticleEdit } from '../pages/articleEdit';
import { Settings } from '../pages/settings';

import { ProtectedRoute } from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Header />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/signUp',
        element: <SignUpPage />,
      },
      {
        path: '/signIn',
        element: <SignInPage />,
      },
      {
        path: '/articles/:slug',
        element: <Article />,
      },
      {
        path: '/profiles/:username',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: '/editor/:slug?',
        element: (
          <ProtectedRoute>
            <ArticleEdit />
          </ProtectedRoute>
        ),
      },
      {
        path: '/settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;

// import { createBrowserRouter } from "react-router-dom";

// import { HomePage } from "../pages/Home";
// import { Profile } from "../pages/Profile";
// import { SignInPage } from "../pages/SignIn";
// import { SignUpPage } from "../pages/SignUp";
// import { ErrorPage } from "../pages/Error";
// import { Header } from "../shared/ui/Header";
// import { Article } from "../pages/Article";
// import { ArticleEdit } from "../pages/ArticleEdit";
// import { Settings } from "../pages/Settings";

// import {ProtectedRoute} from "./protectedRoute";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Header />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         path: "/",
//         element: <HomePage />,
//       },
//       {
//         path: "/signUp",
//         element: <SignUpPage />,
//       },
//       {
//         path: "/signIn",
//         element: <SignInPage />,
//       },
//       {
//         path: "/articles/:slug",
//         element: <Article />,
//       },
//       {
//         path: "/profiles/:username",
//         element: <Profile />,
//       },
//       {
//         path: "/editor/:slug?",
//         element: <ArticleEdit />,
//       },
//       {
//         path: "/settings",
//         element: <Settings />,
//       },
//       {
//         path: "/profile",
//         element: <Profile />,
//       },
//     ],
//   },
// ]);
// export default router;
