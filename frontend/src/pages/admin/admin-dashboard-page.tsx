import StatsCard from "@/components/admin/stats-card";
import ToggleTabs from "@/components/admin/tabs-container";
import SiteLogo from "@/components/common/site-logo";
import Head from "@/lib/seo/head";
import { useGetAllCustomerQuery, useGetAllProductsForAdminQuery } from "@/services/admin/admin-query";
import { Package, Users } from "lucide-react";
import UserProfile from "../../components/site/site-header/user-profile";

export default function AdminDashboardPage() {
  const { data: products } = useGetAllProductsForAdminQuery();
  const { data: customers } = useGetAllCustomerQuery();
  const totalProducts = products?.length;
  const availableProducts = products?.filter((product) => product.available).length || 0;
  const totalCustomers = customers?.length;
  const availableCustomers = customers?.filter((customer) => !customer.blocked).length || 0;

  return (
    <>
      <Head title={"Dashboard"} description={"dashboard page to manage customer and products"} />
      <section className="container mx-auto pt-2.5">
        <div>
          <SiteLogo />
          <div className="flex items-center justify-between py-1">
            <h1 className="font-bold text-xl tracking-widest py-2.5">Admin Dashboard</h1>
            <UserProfile />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <StatsCard
            title="Total Customers"
            value={totalCustomers || 0}
            icon={Users}
            description={`${availableCustomers} active customers`}
          />
          <StatsCard
            title="Total Products"
            value={totalProducts || 0}
            icon={Package}
            description={`${availableProducts} available products`}
          />
        </div>
        <ToggleTabs />
      </section>
    </>
  );
}
