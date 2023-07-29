import PaginationEntity from "@/entities/PaginationEntity";
import SearchBar from "./SearchBar";

interface TopContentProps {
  text: string;
  pagination?: PaginationEntity<any>;
}

export default function TopContent({ text, pagination }: TopContentProps) {
  return (
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
  );
}
