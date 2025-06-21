import { Package, Users } from "lucide-react";
import StatsCard from "../../components/admin/stats-card";
import ToggleTabs from "../../components/admin/tabs-container";
import SiteLogo from "../../components/common/site-logo";
import Head from "../../lib/seo/head";

export default function AdminDashboardPage() {
  return (
    <>
      <Head title={"Dashboard"} description={"dashboard page to manage customer and products"} />
      <section className="container mx-auto pt-2.5">
        <div>
          <SiteLogo />
          <h1 className="font-bold text-xl tracking-widest py-2.5">Admin Dashboard</h1>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <StatsCard title="Total Customers" value={10} icon={Users} description={`5 active customers`} />
          <StatsCard title="Total Products" value={20} icon={Package} description={`3 available products`} />
        </div>
        <ToggleTabs />
      </section>
    </>
  );
}
