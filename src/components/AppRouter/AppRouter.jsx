import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from "../Home/Home";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PublicRoute from "../PublicRoute/PublicRoute";
import { useAuthStore } from "../../utils/auth/auth";
import Layout from "../Layout";

const publicRoutes = [
  { path: "/Login", element: <Login /> },
  { path: "/Register", element: <Register /> },
];

const privateRoutes = [{ path: "/Home", element: <Home /> }];

const AppRouter = () => {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    console.log("Session", user);
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Home" />} />
      {publicRoutes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={<PublicRoute>{element}</PublicRoute>}
        />
      ))}
      <Route
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      >
        {privateRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
};

export default AppRouter;
