import PaginationEntity from "@/entities/PaginationEntity";
import useQueryString from "@/hooks/useQueryString";
import { Pagination } from "@nextui-org/react";

interface BottomContentProps {
  pagination?: PaginationEntity<any>;
}

export default function BottomContent({ pagination }: BottomContentProps) {
  const { setQueryString } = useQueryString();

  const handleChange = (page: number) => {
    setQueryString([
      {
        key: "page",
        value: page,
      },
    ]);
  };

  return (
    <>
      {pagination ? (
        <div className="flex w-full justify-center">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={pagination.number + 1}
            total={pagination.totalPages}
            onChange={handleChange}
          />
        </div>
      ) : null}
    </>
  );
}
