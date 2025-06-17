import AuthLayout from "@/layout/auth-layout";
import SiteLayout from "@/layout/site-layout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthRoute from "./auth-route";
import { authenticationRoutePaths, baseRoutePaths, protectedRoutesPaths } from "./common/routePaths";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          {baseRoutePaths.map((route) => (
            <Route key={route.path} element={route.element} path={route.path} />
          ))}
        </Route>

        <Route element={<AuthRoute />}>
          <Route element={<AuthLayout />}>
            {authenticationRoutePaths.map((route) => (
              <Route key={route.path} path={route.path} element={route.element} />
            ))}
          </Route>
        </Route>

        <Route>
          {protectedRoutesPaths.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
