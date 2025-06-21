import { type ColumnDef } from "@tanstack/react-table";

export type ProductColumnType = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  vegetarian?: string;
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
  },
  {
    accessorKey: "available",
    header: "Available",
  },
];
