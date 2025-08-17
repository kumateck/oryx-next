import { FormType } from "@/lib/redux/api/openapi.generated";
import TemplateCards from "./lists";

interface Props {
  type?: FormType;
}
const TemplatesPage = ({ type }: Props) => {
  return <TemplateCards type={type} />;
};

export default TemplatesPage;
