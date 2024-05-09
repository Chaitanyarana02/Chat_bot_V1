import { Navigate } from "react-router-dom";

// public
import Login from "../pages/Login/Login";
import HomePage from "../pages/Home/HomePage";
import HomePageAns from "../pages/Home/HomePageAns";

// private

export const publicRoutes = [
  { path: "/", element: <Login /> },
  { path: "/home", element: <HomePage /> },
  { path: "/home-ans", element: <HomePageAns /> },
];

export const privateRoutes = [{}];
