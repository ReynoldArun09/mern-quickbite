import { type ColumnDef } from "@tanstack/react-table";

export type CustomerColumnType = {
  firstname: string;
  email: string;
  mobile: string;
  blocked: boolean;
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
  },
];
