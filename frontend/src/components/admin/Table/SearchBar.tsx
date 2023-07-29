import { Input } from "@nextui-org/react";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { KeyboardEvent } from "react";

export const searchAtom = atom<string>("");
export const searchFieldsAtom = atom<Array<string>>([]);
export default function SearchBar() {
  const setSearch = useSetAtom(searchAtom);
  const searchFields = useAtomValue(searchFieldsAtom);
  const placeholder = "Search fields: " + searchFields.join(", ");

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value;
      setSearch(value);
    }
  };

  return (
    <Input
      isClearable
      variant="flat"
      color="primary"
      type="text"
      label="Search"
      placeholder={placeholder}
      labelPlacement="outside"
      onKeyUp={handleEnter}
    />
  );
}
