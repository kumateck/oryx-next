import * as XLSX from "xlsx";

function isExcelFile(file: File, allowedMimeTypes: string[]): boolean {
  const mimeOk = allowedMimeTypes.includes(file.type);
  const extOk = file.name.endsWith(".xls") || file.name.endsWith(".xlsx");
  return mimeOk || extOk;
}

export async function parseExcelFile(
  file: File,
  allowedMimeTypes: string[],
): Promise<{ data: Record<string, any>[] | null; error?: string }> {
  if (!isExcelFile(file, allowedMimeTypes)) {
    return {
      data: null,
      error: "Invalid file type. Please upload an Excel file (.xls or .xlsx).",
    };
  }

  try {
    const data = await new Promise<ArrayBuffer>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as ArrayBuffer);
        } else {
          reject(new Error("Failed to read file data."));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file data."));
      reader.readAsArrayBuffer(file);
    });

    const workbook = XLSX.read(data, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = XLSX.utils.sheet_to_json(sheet);
    console.log(jsonData, "data from excel");
    return {
      data: jsonData as unknown as Record<string, any>[],
      error: undefined,
    };
  } catch (err) {
    console.error("Error parsing Excel file:", err);
    return { data: null, error: "Failed to parse Excel file." };
  }
}
