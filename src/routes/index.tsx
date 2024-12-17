import { createBrowserRouter, RouteObject } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Login from "../pages/Authentication/Login";
import Posts from "../pages/Posts";
import Home from "../pages/Home";
import Post from "../pages/Post";
import Admin from "../pages/Admin";
import CreatePost from "../pages/Admin/CreatePost";
import EditPost from "../pages/Admin/EditPost";
import PageNotFound from "../pages/PageNotFound";
import NotAuthorized from "../pages/NotAuthorized";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        index: true,
        element: <Posts />,
      },
      {
        path: "/posts",
        element: <Posts />,
      },
      {
        path: "/posts/:id",
        element: <Post />,
      },
      {
        path: "/admin",
        element: (
          <PrivateRoute role={1}>
            <Admin />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/create-post",
        element: (
          <PrivateRoute role={1}>
            <CreatePost />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/edit-post/:id",
        element: (
          <PrivateRoute role={1}>
            <EditPost />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/not-authorized",
    element: <NotAuthorized />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];

export const router = createBrowserRouter(routes);
