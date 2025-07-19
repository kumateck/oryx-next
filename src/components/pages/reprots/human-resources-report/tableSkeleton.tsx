import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import ScrollablePageWrapper from "@/shared/page-wrapper";
import PageTitle from "@/shared/title";

const LoadingTable = ({ pagetitle }: { pagetitle: string }) => {
  const skeletonRows = Array.from({ length: 10 });

  return (
    <ScrollablePageWrapper className="space-y-6">
      <PageTitle title={pagetitle} />

      <Table>
        <TableHeader className="bg-primary-default">
          <TableRow className="text-white text-center">
            <TableHead
              rowSpan={2}
              className="border px-4 font-medium text-lg text-left"
            >
              <Skeleton className="h-5 w-1/2 rounded-full" />
            </TableHead>
            <TableHead className="p-2 border text-center" colSpan={2}>
              <Skeleton className="h-5 w-1/2 rounded-full" />
            </TableHead>
            <TableHead className="p-2 border text-center" colSpan={2}>
              <Skeleton className="h-5 w-1/2 rounded-full" />
            </TableHead>
            <TableHead className="p-2 border text-center" colSpan={2}>
              <Skeleton className="h-5 w-1/2 rounded-full" />
            </TableHead>
          </TableRow>
          <TableRow className="text-white text-center">
            <TableHead className="p-2 border">
              <Skeleton className="h-5 w-1/2 rounded-full" />
            </TableHead>
            <TableHead className="p-2 border">
              <Skeleton className="h-5 w-1/2 rounded-full" />
            </TableHead>
            <TableHead className="p-2 border">
              <Skeleton className="h-5 w-1/2 rounded-full" />
            </TableHead>
            <TableHead className="p-2 border">
              <Skeleton className="h-5 w-1/2 rounded-full" />
            </TableHead>
            <TableHead className="p-2 border">
              <Skeleton className="h-5 w-1/2 rounded-full" />
            </TableHead>
            <TableHead className="p-2 border">
              <Skeleton className="h-5 w-1/2 rounded-full" />
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {skeletonRows.map((_, i) => (
            <TableRow key={i} className="text-center">
              <TableCell className="text-left p-2">
                <Skeleton className="h-5 w-full rounded-full" />
              </TableCell>
              <TableCell className="p-2">
                <Skeleton className="h-5 w-full rounded-full" />
              </TableCell>
              <TableCell className="p-2">
                <Skeleton className="h-5 w-full rounded-full" />
              </TableCell>
              <TableCell className="p-2">
                <Skeleton className="h-5 w-full rounded-full" />
              </TableCell>
              <TableCell className="p-2">
                <Skeleton className="h-5 w-full rounded-full" />
              </TableCell>
              <TableCell className="p-2">
                <Skeleton className="h-5 w-full rounded-full" />
              </TableCell>
              <TableCell className="p-2">
                <Skeleton className="h-5 w-full rounded-full" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollablePageWrapper>
  );
};

export default LoadingTable;
