import { Outlet } from "react-router-dom";
import SiteFooter from "../components/site/site-footer";
import SiteHeader from "../components/site/site-header";

export default function SiteLayout() {
  return (
    <>
      <SiteHeader />
      <main className="container mx-auto h-screen">
        <Outlet />
      </main>
      <SiteFooter />
    </>
  );
}
