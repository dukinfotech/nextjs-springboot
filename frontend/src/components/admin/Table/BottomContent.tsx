import PaginationEntity from "@/entities/PaginationEntity";
import { Pagination } from "@nextui-org/react";

interface BottomContentProps {
  pagination?: PaginationEntity<any>;
  onChange: (page: number) => void;
}

export default function BottomContent({
  pagination,
  onChange,
}: BottomContentProps) {
  return (
    <>
      {pagination && pagination.totalPages > 0 ? (
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={pagination.number + 1}
            total={pagination.totalPages}
            onChange={onChange}
          />
        </div>
      ) : null}
    </>
  );
}
