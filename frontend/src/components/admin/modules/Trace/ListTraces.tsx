"use client";

import useMoment from "@/hooks/useMoment";
import Table, { TableColumn } from "../../Table/Table";
import EditButton from "../../Table/EditButton";
import DeleteButton from "../../Table/DeleteButton";
import UserEntity from "@/entities/UserEntity";

export default function ListTraces() {
  const { timestamp } = useMoment();

  const text = "List Traces";
  const endpoint = "/api/traces";
  const searchFields = ["Table", "Operation"];
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
      uid: "tableName",
      name: "TABLE NAME",
      sorting: true,
      render(value) {
        return <div>{value}</div>;
      },
    },
    {
      uid: "primaryKey",
      name: "PRIMARY KEY",
      sorting: true,
      render(value) {
        return <div>{value}</div>;
      },
    },
    {
      uid: "operation",
      name: "OPERATION",
      sorting: true,
      render(value) {
        return <div>{value}</div>;
      },
    },
    {
      uid: "operator",
      name: "OPERATOR ID",
      sorting: false,
      render(operator: UserEntity) {
        return <div>{`${operator.firstName} ${operator.lastName}`}</div>;
      },
    },
    {
      uid: "jsonData",
      name: "JSON DATA",
      sorting: false,
      render(jsonData: Object) {
        return <div>{JSON.stringify(jsonData).replaceAll("\\", "")}</div>;
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
      uid: "actions",
      name: "ACTIONS",
      sorting: false,
      render(id: number) {
        return (
          <div className="relative flex items-center gap-2">
            <EditButton text="Edit role" id={id} />
            <DeleteButton text="Delete role" id={id} />
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
