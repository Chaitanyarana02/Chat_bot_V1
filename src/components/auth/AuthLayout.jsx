import { Outlet } from "react-router-dom";
import HeaderCommon from "./pages/HeaderCommon";

const AuthLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderCommon />

      <div className="flex flex-1 justify-center items-center px-4 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
