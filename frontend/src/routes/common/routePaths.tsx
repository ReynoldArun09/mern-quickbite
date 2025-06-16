import { lazy } from "react";
import { BASE_ROUTE } from "./routes";

const HomePage = lazy(() => import("@/pages/site/home-page"));

export const baseRoutePaths = [{ path: BASE_ROUTE.HOME, element: <HomePage /> }];
