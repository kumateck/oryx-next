import { toast } from "sonner";
import { ErrorResponse, isErrorResponse } from "./utils";

const ThrowErrorMessage = (error: unknown) =>
  toast.error(isErrorResponse(error as ErrorResponse)?.description);

export default ThrowErrorMessage;
