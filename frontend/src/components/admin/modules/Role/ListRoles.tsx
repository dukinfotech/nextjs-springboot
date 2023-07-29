"use client";

import useMoment from "@/hooks/useMoment";
import Table, { TableColumn } from "../../Table/Table";
import EditButton from "../../Table/EditButton";
import DeleteButton from "../../Table/DeleteButton";

export default function ListRoles() {
  const { timestamp } = useMoment();

  const text = "List Roles";
  const endpoint = "/api/roles";
  const searchFields = ["Name", "Text"];
  const columns: Array<TableColumn> = [
    {
      uid: "id",
      name: "ID",
      sorting: false,
      render(value) {
        return <div>{value}</div>;
      },
    },
    {
      uid: "name",
      name: "NAME",
      sorting: true,
      render(value) {
        return <div>{value}</div>;
      },
    },
    {
      uid: "text",
      name: "TEXT",
      sorting: true,
      render(value) {
        return <div>{value}</div>;
      },
    },
    {
      uid: "createdAt",
      name: "CREATED AT",
      sorting: true,
      render(value) {
        return <div>{timestamp(value)}</div>;
      },
    },
    {
      uid: "updatedAt",
      name: "LAST UPDATED AT",
      sorting: true,
      render(value) {
        return <div>{timestamp(value)}</div>;
      },
    },
    {
      uid: "actions",
      name: "ACTIONS",
      sorting: false,
      render() {
        return (
          <div className="relative flex items-center gap-2">
            <EditButton text="Edit role" />
            <DeleteButton text="Delete role" />
          </div>
        );
      },
    },
  ];

  return (
    <Table
      text={text}
      endpoint={endpoint}
      searchFields={searchFields}
      columns={columns}
    />
  );
}
