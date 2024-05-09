import { useRoutes } from "react-router-dom";

// ROUTES
import { publicRoutes } from "./AppRoutes";

const Router = () => {
  let routes = publicRoutes;
  const routing = useRoutes(routes);

  return routing;
};

export default Router;
