import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "../../ui/badge";
import CustomerDropDownMenu from "./customer-dropdown";

export type CustomerColumnType = {
  firstname: string;
  email: string;
  mobile: string;
  blocked?: boolean;
  _id: string;
};

export const CustomerColumns: ColumnDef<CustomerColumnType>[] = [
  {
    accessorKey: "firstname",
    header: "Firstname",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "mobile",
    header: "Mobile",
  },
  {
    accessorKey: "blocked",
    header: "Blocked",
    cell: ({ row }) => {
      const status = row.getValue("blocked");
      const variant = status ? "default" : "destructive";
      return (
        <Badge variant={variant} className="w-18">
          {status ? "Blocked" : "Active"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    header: "Actions",
    cell: ({ row }) => {
      return <CustomerDropDownMenu userId={row.original._id} />;
    },
  },
];
