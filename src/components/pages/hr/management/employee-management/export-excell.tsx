import { Button } from "@/components/ui";
import { EmployeeDto } from "@/lib/redux/api/openapi.generated";
import { toast } from "sonner";
import * as XLSX from "xlsx";

interface Props {
  employeeData: EmployeeDto[];
}

export default function ExportToExcel({ employeeData }: Props) {
  const handleExport = () => {
    if (!employeeData || employeeData.length === 0) {
      toast.warning("No employee data to export");
      return;
    }

    const headers = ["Emp ID", "Name", "Time", "Work State"];
    const data = employeeData.flatMap((emp) => [
      {
        "Emp ID": emp.staffNumber,
        Name: `${emp.firstName} ${emp.lastName}`,
        Time: "",
        "Work State": "",
      },
      {
        "Emp ID": emp.staffNumber,
        Name: `${emp.firstName} ${emp.lastName}`,
        Time: "",
        "Work State": "",
      },
    ]);

    const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Employees");

    XLSX.writeFile(workbook, "Employee_Report.xlsx");
  };

  return (
    <Button onClick={handleExport} variant="outline">
      Export
    </Button>
  );
}
