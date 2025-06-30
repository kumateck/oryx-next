import {
  Button,
  Icon,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";

interface Props {
  page: number;
  pageSize: number;
  setPage: (value: number) => void;
  setPageSize: (value: number) => void;
  pageIndex: number;
  pageCount: number;
  totalRecordCount: number;
  numberOfPagesToShow: number;
  startPageIndex: number;
  stopPageIndex: number;
}
export const AlertPagination = ({
  pageIndex,
  startPageIndex,
  stopPageIndex,
  setPage,
  setPageSize,
  pageSize,
}: Props) => {
  const fetchNextPage = () => {
    const page = (pageIndex as number) + 1;
    setPage(page);
  };
  const fetchPreviousPage = () => {
    const page = (pageIndex as number) - 1;
    setPage(page);
  };
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex justify-start w-fit items-center gap-2">
        <Button
          disabled={pageIndex === startPageIndex}
          variant="ghost"
          onClick={fetchPreviousPage}
        >
          <Icon name="ArrowLeft" className="size-4" />
          Previous
        </Button>
        <span className="size-7 rounded-md flex items-center justify-center bg-primary-default text-white">
          {pageIndex}
        </span>
        <Button
          variant="ghost"
          disabled={pageIndex === stopPageIndex}
          onClick={fetchNextPage}
        >
          Next
          <Icon name="ArrowRight" className="size-4" />
        </Button>
      </div>
      <div>
        <Select
          onValueChange={(value) => {
            setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 30, 40, 50, 100, 150].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
