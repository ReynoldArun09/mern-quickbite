import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "../ui/badge";
import ProductDropDownMenu from "./product-dropdown";

export type ProductColumnType = {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category: string;
  vegetarian?: boolean;
  available: boolean;
};

export const productColumns: ColumnDef<ProductColumnType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div className="text-primary font-bold">$ {row.getValue("price")}</div>,
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageurl = row.getValue("image");
      return (
        <div className="text-right font-medium">
          <img src={imageurl as string} className="h-12 w-16" alt={"product-img"} />
        </div>
      );
    },
  },
  {
    accessorKey: "vegetarian",
    header: "Vegetarian",
    cell: ({ row }) => {
      const status = row.getValue("vegetarian");
      const variant = status ? "secondary" : "outline";
      return (
        <Badge variant={variant} className="w-18">
          {status ? "Veg" : "Non-Veg"}
        </Badge>
      );
    },
  },
  {
    accessorKey: "available",
    header: "Available",
    cell: ({ row }) => {
      const status = row.getValue("available");
      const variant = status ? "default" : "destructive";
      return <Badge variant={variant}>{status ? "Available" : "Not Available"}</Badge>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      return <ProductDropDownMenu productId={row.original._id} />;
    },
  },
];
