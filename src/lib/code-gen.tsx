import { useEffect, useState } from "react";

import {
  NamingType,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
} from "./redux/api/openapi.generated";
import { GenerateCodeOptions, generateCode } from "./utils";

export const useCodeGen = (
  modelType: string,
  fetchCountQuery?: () => Promise<{ totalRecordCount?: number }>,
  setCodeToInput?: (code: string) => void, // Function to set value in form
) => {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);

  // Fetch configuration for the model type
  const { data: codeConfig } =
    useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
      modelType,
    });

  const generate = async () => {
    if (!codeConfig) return;

    let seriesCounter = 1;

    if (modelType && fetchCountQuery) {
      try {
        const countResponse = await fetchCountQuery();
        seriesCounter = (countResponse?.totalRecordCount ?? 0) + 1;
      } catch (error) {
        console.error("Error fetching total record count:", error);
      }
    }
    //   else if (totalRecordCount !== undefined) {
    //     seriesCounter = totalRecordCount + 1;
    //   }

    const generatePayload: GenerateCodeOptions = {
      maxlength: Number(codeConfig?.maximumNameLength),
      minlength: Number(codeConfig?.minimumNameLength),
      prefix: codeConfig?.prefix as string,
      type: codeConfig?.namingType as NamingType,
      seriesCounter,
    };

    const code = generateCode(generatePayload);
    if (setCodeToInput) {
      setCodeToInput(code);
    }
    setGeneratedCode(code);
  };
  useEffect(() => {
    generate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeConfig, modelType]);

  return generatedCode;
};
