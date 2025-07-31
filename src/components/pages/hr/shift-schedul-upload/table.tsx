import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui";

export function ExcelPreviewTable({ data }: { data: Record<string, any>[] }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-muted-foreground text-center w-full mt-20">
        No data to display
        <br />
        <span className=" text-sm">File might be empty or in wrong format</span>
      </p>
    );
  }

  const headers = Object.keys(data[0]).filter((key) => key !== "__rowNum__");

  return (
    <Table>
      <TableHeader>
        <TableRow className="text-white">
          {headers.map((key) => (
            <TableHead key={key}>{key}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={index}>
            {headers.map((key) => (
              <TableCell key={key}>{row[key]}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
