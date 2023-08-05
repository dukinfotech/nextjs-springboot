"use client";

import useMoment from "@/hooks/useMoment";
import Table, { TableColumn } from "../../Table/Table";
import EditButton from "../../Table/EditButton";
import DeleteButton from "../../Table/DeleteButton";
import UserEntity from "@/entities/UserEntity";

export default function ListPermissions() {
  const { timestamp } = useMoment();

  const text = "List Permissions";
  const endpoint = "/api/permissions";
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
      uid: "lastUpdatedBy",
      name: "LAST UPDATED BY",
      sorting: false,
      render(user?: UserEntity) {
        if (user) {
          return <div>{`${user.firstName} ${user.lastName}`}</div>;
        } else {
          return null;
        }
      },
    },
    {
      uid: "actions",
      name: "ACTIONS",
      sorting: false,
      render(id: number) {
        return (
          <div className="relative flex items-center gap-2">
            <EditButton text="Edit permission" id={id} />
            <DeleteButton text="Delete permission" id={id} />
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
