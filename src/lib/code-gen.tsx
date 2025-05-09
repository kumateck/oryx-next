// import { useEffect, useState } from "react";
// import {
//   NamingType,
//   useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
// } from "./redux/api/openapi.generated";
// import { GenerateCodeOptions, generateCode } from "./utils";
// export const useCodeGen = (
//   modelType: string,
//   fetchCountQuery?: () => Promise<{ totalRecordCount?: number }>,
//   setCodeToInput?: (code: string) => void, // Function to set value in form
// ) => {
//   const [generatedCode, setGeneratedCode] = useState<string | null>(null);
//   // Fetch configuration for the model type
//   const { data: codeConfig } =
//     useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
//       modelType,
//     });
//   const generate = async () => {
//     if (!codeConfig) return;
//     let seriesCounter = 1;
//     if (modelType && fetchCountQuery) {
//       try {
//         const countResponse = await fetchCountQuery();
//         seriesCounter = (countResponse?.totalRecordCount ?? 0) + 1;
//       } catch (error) {
//         console.error("Error fetching total record count:", error);
//       }
//     }
//     //   else if (totalRecordCount !== undefined) {
//     //     seriesCounter = totalRecordCount + 1;
//     //   }
//     const generatePayload: GenerateCodeOptions = {
//       maxlength: Number(codeConfig?.maximumNameLength),
//       minlength: Number(codeConfig?.minimumNameLength),
//       prefix: codeConfig?.prefix as string,
//       type: codeConfig?.namingType as NamingType,
//       seriesCounter,
//     };
//     const code = generateCode(generatePayload);
//     if (setCodeToInput) {
//       setCodeToInput(code);
//     }
//     setGeneratedCode(code);
//   };
//   useEffect(() => {
//     generate();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [codeConfig, modelType]);
//   return generatedCode;
// };
// import { useEffect, useRef, useState } from "react";
// import {
//   NamingType,
//   useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
// } from "./redux/api/openapi.generated";
// import { GenerateCodeOptions, generateCode } from "./utils";
// export const useCodeGen = (
//   modelType: string,
//   fetchCountQuery?: () => Promise<{ totalRecordCount?: number }>,
//   setCodeToInput?: (code: string) => void, // Function to set value in form
// ) => {
//   const [generatedCode, setGeneratedCode] = useState<string | null>(null);
//   const generateRef = useRef<() => Promise<string | null>>(async () => {
//     return null;
//   }); // Ref to store the generate function
//   // Fetch configuration for the model type
//   const { data: codeConfig } =
//     useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
//       modelType,
//     });
//   const generate = async () => {
//     if (!codeConfig) return null;
//     let seriesCounter = 1;
//     if (modelType && fetchCountQuery) {
//       try {
//         const countResponse = await fetchCountQuery();
//         seriesCounter = (countResponse?.totalRecordCount ?? 0) + 1;
//       } catch (error) {
//         console.error("Error fetching total record count:", error);
//       }
//     }
//     const generatePayload: GenerateCodeOptions = {
//       maxlength: Number(codeConfig?.maximumNameLength),
//       minlength: Number(codeConfig?.minimumNameLength),
//       prefix: codeConfig?.prefix as string,
//       type: codeConfig?.namingType as NamingType,
//       seriesCounter,
//     };
//     const code = generateCode(generatePayload);
//     if (setCodeToInput) {
//       setCodeToInput(code);
//     }
//     setGeneratedCode(code);
//     return code; // Return the generated code
//   };
//   // Update the ref with the latest generate function
//   useEffect(() => {
//     generateRef.current = generate;
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [generate]);
//   // Automatically generate when the component mounts or when modelType or codeConfig changes
//   useEffect(() => {
//     generateRef.current(); // Calling the function from the ref
//   }, [codeConfig, modelType]);
//   return { generatedCode, regenerateCode: generateRef.current }; // Return the regenerate function
// };
import { useEffect, useRef, useState } from "react";

import {
  NamingType,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery,
} from "./redux/api/openapi.generated";
import { GenerateCodeOptions, generateCode } from "./utils";

export const useCodeGen = (
  modelType: string,
  fetchCountQuery?: () => Promise<{ totalRecordCount?: number }>,
  setCodeToInput?: (code: string) => void, // Function to set value in form
) => {
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateRef = useRef<() => Promise<string | null>>(async () => {
    return null;
  }); // Ref to store the generate function

  // Fetch configuration for the model type
  const { data: codeConfig } =
    useGetApiV1ConfigurationByModelTypeByModelTypeQuery({
      modelType,
    });

  const [loadCountConfig] =
    useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery();
  const generate = async () => {
    if (!codeConfig) return null;

    setLoading(true);
    let seriesCounter = 1;

    if (modelType && fetchCountQuery) {
      try {
        const countResponse = await fetchCountQuery();
        const countConfigResponse = await loadCountConfig({
          modelType,
          prefix: codeConfig?.prefix as string,
        }).unwrap();
        seriesCounter =
          (countConfigResponse ?? countResponse?.totalRecordCount ?? 0) + 1;
      } catch (error) {
        console.error("Error fetching total record count:", error);
      }
    }

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
    setLoading(false);
    return code; // Return the generated code
  };

  // Update the ref with the latest generate function when dependencies change
  useEffect(() => {
    generateRef.current = generate;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeConfig, modelType, fetchCountQuery, setCodeToInput]);

  // Automatically generate when the component mounts or when modelType or codeConfig changes
  useEffect(() => {
    generateRef.current(); // Calling the function from the ref
  }, [codeConfig, modelType]);

  return { generatedCode, regenerateCode: generateRef.current, loading };
};
