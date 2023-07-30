import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";
import { atom, useAtom } from "jotai";
import { useMemo } from "react";
import { SortDown } from "react-flaticons";

const pageSizes = [10, 20, 50, 100, 200];
export const pageSizeAtom = atom<number>(pageSizes[0]);

export default function SelectPageSize() {
  const [selectedSize, setSelectedSize] = useAtom(pageSizeAtom);
  const selectedKeys = useMemo(() => {
    return new Set([selectedSize.toString()]);
  }, [selectedSize]);

  const handleSelectionChange = (keys: Selection) => {
    const selectedValue = Array.from(keys).join(", ");
    setSelectedSize(parseInt(selectedValue));
  };

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button size="sm" variant="flat" color="primary">
          {selectedSize}
          <SortDown color="#0070F0" size={14} />
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="page sizes"
        variant="flat"
        color="primary"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
      >
        {pageSizes.map((pageSize) => (
          <DropdownItem key={pageSize}>{pageSize}</DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
