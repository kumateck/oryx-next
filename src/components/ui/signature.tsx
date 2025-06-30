import { cn } from "@/lib";
import { ReactMinimalSignature } from "react-minimal-signature";
import "react-minimal-signature/rmc.css";

interface Props {
  className?: string;
  onChange: (option: string | undefined) => void;
}
export const ReactSignature = ({ className, onChange }: Props) => {
  return (
    <div className="relative">
      <ReactMinimalSignature
        withGuide={false}
        onDrawEnd={(details) => {
          details.getDataUrl("image/png").then((url) => {
            onChange(url);
          });
        }}
        classNames={{
          control: cn(
            "!bg-white h-48 !rounded-2xl !border !border-neutral-input !border-solid ",
            className,
          ),
        }}
      />
    </div>
  );
};
