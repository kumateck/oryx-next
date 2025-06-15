import { Icon } from "@/components/ui";
import { toast } from "sonner";

type Attachment = {
  fileName: string;
  url: string;
};

type Props = {
  attachments: Attachment[];
};

export const DownloadAttachmentButton = ({ attachments }: Props) => {
  const handleDownload = () => {
    const firstAttachment = attachments?.[0];

    if (!firstAttachment) {
      toast.error("No attachment found");
      return;
    }

    fetch(firstAttachment.url)
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = firstAttachment.fileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast.success("File downloaded successfully");
      })
      .catch(() => {
        toast.error("Failed to download file");
      });
  };

  return (
    <button onClick={handleDownload} className="cursor-pointer">
      <Icon name="Download" />
    </button>
  );
};
