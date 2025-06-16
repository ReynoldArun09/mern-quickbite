import SiteHero from "@/components/site/site-hero";
import SiteRecentlyAdded from "@/components/site/site-recently-added";
import SiteTopNonVeg from "@/components/site/site-top-non-veg";
import SiteTopVeg from "@/components/site/site-top-veg";

export default function HomePage() {
  return (
    <>
      <SiteHero />
      <SiteRecentlyAdded />
      <SiteTopVeg />
      <SiteTopNonVeg />
    </>
  );
}
