import { Route, Routes } from "react-router-dom";
import AuthLayout from "../components/auth/AuthLayout";
import { Login } from "../components/auth/pages";
import DashboardLayout from "../components/DashBoard/DashboardLayout";
import { Home } from "../components/DashBoard/pages";

const Router = () => {
  return (
    <>
      <Routes>
        {/* private routes */}
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Login />} />
        </Route>

        {/* public routes */}

        <Route path="/home" element={<DashboardLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
};

export default Router;
