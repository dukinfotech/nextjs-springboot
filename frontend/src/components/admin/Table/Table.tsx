"use client";

import React, {
  Key,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Table as TableUI,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Spinner,
  SortDescriptor,
} from "@nextui-org/react";
import { api } from "@/utils/api";
import PaginationEntity from "@/entities/PaginationEntity";
import TopContent from "../Table/TopContent";
import BottomContent from "../Table/BottomContent";
import useQueryString from "@/hooks/useQueryString";
import { useAtomValue } from "jotai";
import { searchAtom, searchFieldsAtom } from "../Table/SearchBar";
import { useHydrateAtoms } from "jotai/utils";

interface TableProps {
  text: string;
  endpoint: string;
  searchFields: Array<string>;
  columns: Array<TableColumn>;
}

export type TableColumn = {
  uid: string;
  name: string;
  sorting: boolean;
  render: (value: any) => ReactNode;
};

export default function Table({
  text,
  endpoint,
  searchFields,
  columns,
}: TableProps) {
  const search = useAtomValue(searchAtom);
  useHydrateAtoms([[searchFieldsAtom, searchFields]]);

  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState<PaginationEntity<unknown>>();
  const { getQueryString, setQueryString } = useQueryString();
  const queryString = getQueryString();
  setQueryString([{ key: "search", value: search }]);

  const descriptor: SortDescriptor = useMemo(() => {
    const urlSearchParams = new URLSearchParams(queryString);
    return {
      column: urlSearchParams.get("sort") as Key,
      direction:
        urlSearchParams.get("isAsc") === "true" ? "ascending" : "descending",
    };
  }, [queryString]);

  const fetchData = async () => {
    const res = await api.get(`${endpoint}?${queryString}`);
    if (res.ok) {
      const _pagination = (await res.json()) as PaginationEntity<unknown>;
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

  const handlePaginationChange = (page: number) => {
    setQueryString([{ key: "page", value: page }]);
  };

  return (
    <TableUI
      topContent={<TopContent text={text} pagination={pagination} />}
      aria-label={text}
      sortDescriptor={descriptor}
      onSortChange={handleSort}
      bottomContent={
        <BottomContent
          pagination={pagination}
          onChange={handlePaginationChange}
        />
      }
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
        {(item: any) => (
          <TableRow key={item.id}>
            {columns.map((column) => (
              <TableCell>{column.render(item[column.uid])}</TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </TableUI>
  );
}
