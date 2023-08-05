"use client";

import useMoment from "@/hooks/useMoment";
import Table, { TableColumn } from "../../Table/Table";
import UserEntity from "@/entities/UserEntity";
import JsonViewer from "../../Table/JsonViewer";

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
      uid: "jsonData",
      name: "ACTIONS",
      sorting: false,
      render(jsonData: Object) {
        return (
          <div className="relative flex items-center gap-2">
            <JsonViewer text="View data" json={jsonData} />
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
