import { ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { ErrorProps, FormError } from ".";

interface Props {
  label: string;
  required?: boolean;
  errors?: ErrorProps;
  onChange: (image: File) => void;
  defaultValue?: string;
}
export default function FormFileInput({
  label,
  required,
  errors,
  defaultValue,
  onChange,
}: Props) {
  const [imagePath, setImagePath] = useState<string | undefined>(defaultValue);

  return (
    <div>
      <label className="space-y-1 capitalize">
        <div
          className={cn("text-base font-medium", {
            "text-danger-500": errors?.error,
          })}
        >
          {label} {required && <span className="text-danger-400">*</span>}
        </div>
        <div className="flex flex-col gap-4">
          {imagePath ? (
            <div className="flex w-full">
              <Image
                alt="passport-sized photograph preview"
                src={imagePath}
                className="h-52"
                onLoad={() => {
                  imagePath && URL.revokeObjectURL(imagePath);
                }}
              />
            </div>
          ) : (
            <ImageIcon
              className="text-muted-foreground h-40 w-40 p-2"
              strokeWidth={0.5}
            />
          )}
          <input
            type="file"
            accept="image/jpeg, image/png, image/jpg"
            onChange={(event) => {
              const { files } = event.target;
              const image = files?.[0];
              if (image) {
                const imageUrl = URL.createObjectURL(image);
                setImagePath(imageUrl);
                onChange(image);
              }
            }}
          />
        </div>
        <FormError error={errors?.error} message={errors?.message} />
      </label>
    </div>
  );
}
