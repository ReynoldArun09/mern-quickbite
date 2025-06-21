import { useGetAllCustomerQuery, useGetAllProductsForAdminQuery } from "../../services/admin/admin-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CustomerColumns } from "./customer-column";
import { DataTable } from "./data-table";

import { productColumns } from "./product-column";

export default function ToggleTabs() {
  const { data: customers, isLoading: customerLoading } = useGetAllCustomerQuery();
  const { data: products, isLoading: productsLoading } = useGetAllProductsForAdminQuery();

  return (
    <Tabs defaultValue="customers" className="space-y-4 mt-5">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="customers">Customers</TabsTrigger>
        <TabsTrigger value="products">Products</TabsTrigger>
      </TabsList>

      <TabsContent value="customers" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Customer Management</CardTitle>
            <CardDescription>View and manage your customer base</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={CustomerColumns} data={customers ?? []} searchPlaceholder="search customers..." />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="products" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Product Management</CardTitle>
            <CardDescription>View and manage your product inventory</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable columns={productColumns} data={products ?? []} searchPlaceholder="search products..." />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
