import { BrowserRouter, Route, Routes } from "react-router-dom";
import SiteLayout from "../layout/site-layout";
import { baseRoutePaths } from "./common/routePaths";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          {baseRoutePaths.map((route) => (
            <Route key={route.path} element={route.element} path={route.path} />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
