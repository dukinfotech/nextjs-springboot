import PaginationEntity from "@/entities/PaginationEntity";

interface TopContentProps {
  text: string;
  pagination?: PaginationEntity<any>;
}

export default function TopContent({ text, pagination }: TopContentProps) {
  return (
    <>
      <div className="text-xl font-bold text-gray-800">{text}</div>
      <div>
        Showing {pagination?.numberOfElements || 0}/
        {pagination?.totalElements || 0}
      </div>
    </>
  );
}
