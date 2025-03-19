import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Home from "../Home/Home";
import RegisterFilm from "../Forms/FilmEntry";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import PublicRoute from "../PublicRoute/PublicRoute";
import { useAuthStore } from "../../utils/auth/auth";
import Layout from "../Layout";
import RentMovies from "../RentMovies/page";
import ActorsForms from "../Forms/Actors";
import AddressForms from "../Forms/Address";
import CategoriesForms from "../Forms/Categories";
import CitiesForms from "../Forms/Cities";
import CountriesForms from "../Forms/Countries";
import CustomersForms from "../Forms/Customers";
import FilmActorsForms from "../Forms/FilmActor";
import FilmCategoryForms from "../Forms/FilmCategory";
import FilmTextForms from "../Forms/FilmText";
import InventoryForms from "../Forms/Inventory";
import LanguageForms from "../Forms/Language";
import PaymentForms from "../Forms/Payment";
import RentalForms from "../Forms/Rental";
import StaffForms from "../Forms/Staff";
import StoreForms from "../Forms/Store";

const publicRoutes = [
  { path: "/Login", element: <Login /> },
  { path: "/Register", element: <Register /> },
];

const privateRoutes = [
  { path: "/Home", element: <Home /> },
  { path: "/Renta", element: <RentMovies /> },
  { path: "/Films", element: <RegisterFilm /> },
  { path: "/Actors", element: <ActorsForms /> },
  { path: "/Address", element: <AddressForms /> },
  { path: "/Categories", element: <CategoriesForms /> },
  { path: "/Cities", element: <CitiesForms /> },
  { path: "/Countries", element: <CountriesForms /> },
  { path: "/Customers", element: <CustomersForms /> },
  // { path: "/FilmActors", element: <FilmActorsForms /> },
  // { path: "/FilmCategories", element: <FilmCategoryForms /> },
  // { path: "/FilmTexts", element: <FilmTextForms /> },
  { path: "/Inventory", element: <InventoryForms /> },  
  { path: "/Languages", element: <LanguageForms /> },
  { path: "/Payments", element: <PaymentForms /> },
  { path: "/Rentals", element: <RentalForms /> },
  { path: "/Staff", element: <StaffForms /> },
  { path: "/Stores", element: <StoreForms /> },
];

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
