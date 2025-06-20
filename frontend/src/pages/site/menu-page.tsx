import MenuHeader from "@/components/site/site-menu/menu-header";
import MenuList from "@/components/site/site-menu/menu-list";
import Head from "@/lib/seo/head";

export default function MenuPage() {
  return (
    <>
      <Head title="Menu page" description={"menu page select food from different category."} />
      <MenuHeader />
      <MenuList />
    </>
  );
}
