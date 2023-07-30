import PaginationEntity from "@/entities/PaginationEntity";
import SearchBar from "./SearchBar";
import { Button, Link } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import SelectPageSize from "./SelectPageSize";

interface TopContentProps {
  text: string;
  pagination?: PaginationEntity<any>;
}

export default function TopContent({ text, pagination }: TopContentProps) {
  const pathName = usePathname();

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <div className="text-xl font-bold text-gray-800">{text}</div>
          Showing {pagination?.numberOfElements || 0}/
          {pagination?.totalElements || 0}
        </div>
        <div className="w-1/2">
          <SearchBar />
        </div>
      </div>
      <div className="flex justify-between items-center">
        <Button
          href={`${pathName}/create`}
          as={Link}
          color="primary"
          showAnchorIcon
          variant="solid"
        >
          Create
        </Button>
        <SelectPageSize />
      </div>
    </div>
  );
}
