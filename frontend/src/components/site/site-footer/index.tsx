import SiteBottomFooter from "./site-bottom-footer";
import SiteTopFooter from "./site-top-footer";

export default function SiteFooter() {
  return (
    <footer className="mx-4 container sm:mx-auto border-t mt-10">
      <SiteTopFooter />
      <SiteBottomFooter />
    </footer>
  );
}
