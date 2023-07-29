"use client";

import React, { Key, useCallback, useEffect, useMemo, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Spinner,
  SortDescriptor,
} from "@nextui-org/react";
import RoleEntity from "@/entities/RoleEntity";
import { Pencil, Trash } from "react-flaticons";
import { api } from "@/utils/api";
import useMoment from "@/hooks/useMoment";
import PaginationEntity from "@/entities/PaginationEntity";
import TopContent from "../Table/TopContent";
import BottomContent from "../Table/BottomContent";
import useQueryString from "@/hooks/useQueryString";
import { useSearchParams } from "next/navigation";

export default function ListRoles() {
  const columns = [
    { name: "ID", uid: "id", sorting: false },
    { name: "NAME", uid: "name", sorting: true },
    { name: "TEXT", uid: "text", sorting: true },
    { name: "CREATED AT", uid: "createdAt", sorting: true },
    { name: "LAST UPDATED AT", uid: "updatedAt", sorting: true },
    { name: "ACTIONS", uid: "actions", sorting: false },
  ];

  const [isLoading, setIsLoading] = useState(false);
  const { timestamp } = useMoment();
  const [pagination, setPagination] = useState<PaginationEntity<RoleEntity>>();
  const { getQueryString, setQueryString } = useQueryString();
  const queryString = getQueryString();

  const descriptor: SortDescriptor = useMemo(() => {
    const urlSearchParams = new URLSearchParams(queryString);
    return {
      column: urlSearchParams.get("sort") as Key,
      direction:
        urlSearchParams.get("isAsc") === "true" ? "ascending" : "descending",
    };
  }, [queryString]);

  const fetchData = async () => {
    const res = await api.get(`/api/roles?${queryString}`);
    if (res.ok) {
      const _pagination = (await res.json()) as PaginationEntity<RoleEntity>;
      setPagination(_pagination);
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await fetchData();
      setIsLoading(false);
    })();
  }, [queryString]);

  const handleSort = (descriptor: SortDescriptor) => {
    setQueryString([
      { key: "sort", value: descriptor.column },
      { key: "isAsc", value: descriptor.direction === "ascending" },
    ]);
  };

  const renderCell = useCallback((role: RoleEntity, columnKey: Key) => {
    switch (columnKey) {
      case "id":
        return <div>{role.id}</div>;
      case "name":
        return <div>{role.name}</div>;
      case "text":
        return <div>{role.text}</div>;
      case "createdAt":
        return <div>{timestamp(role.createdAt)}</div>;
      case "updatedAt":
        return <div>{timestamp(role.updatedAt)}</div>;
      case "actions":
        return (
          <div className="relative flex items-center gap-2">
            <Tooltip color="primary" content="Edit role">
              <Button
                isIconOnly
                size="sm"
                color="primary"
                aria-label="Edit role"
                className="p-2"
              >
                <Pencil />
              </Button>
            </Tooltip>
            <Tooltip color="danger" content="Delete role">
              <Button
                isIconOnly
                size="sm"
                color="danger"
                aria-label="Delete role"
                className="p-2"
              >
                <Trash />
              </Button>
            </Tooltip>
          </div>
        );
      default:
        return null;
    }
  }, []);

  return (
    <Table
      topContent={<TopContent text="List Roles" pagination={pagination} />}
      aria-label="List Roles"
      sortDescriptor={descriptor}
      onSortChange={handleSort}
      bottomContent={<BottomContent pagination={pagination} />}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            allowsSorting={column.sorting}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody
        emptyContent={"No data to display."}
        items={pagination?.content || []}
        isLoading={isLoading}
        loadingContent={<Spinner />}
      >
        {(role) => (
          <TableRow key={role.id}>
            {(columnKey) => (
              <TableCell>{renderCell(role, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
