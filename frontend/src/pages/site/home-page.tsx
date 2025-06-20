import SiteHero from "@/components/site/site-hero";
import SiteRecentlyAdded from "@/components/site/site-recently-added";
import SiteTopNonVeg from "@/components/site/site-top-non-veg";
import SiteTopVeg from "@/components/site/site-top-veg";
import Head from "@/lib/seo/head";

export default function HomePage() {
  return (
    <>
      <Head title="Home Page" description={"Home page for quickbite food delivery application"} />
      <SiteHero />
      <SiteRecentlyAdded />
      <SiteTopVeg />
      <SiteTopNonVeg />
    </>
  );
}
