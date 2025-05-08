import Image from "next/image";

interface Props {
  title?: string;
  description?: string;
}
const EmptyState = ({ title, description }: Props) => {
  return (
    <div className="py-20 w-full border-2">
      <div className="flex h-full w-full flex-col items-center justify-center p-8 text-center ">
        <div className="mb-6 text-neutral-400">
          <Image
            width={150}
            height={150}
            src={"/icons/empty-icon.svg"}
            alt="empty-icon"
          />
        </div>
        <h3 className="mb-2 text-lg font-bold text-neutral-800">OOOPS!</h3>
        <p className="font-semibold text-neutral-800">
          {title || "You currently have no items or actions to view."}
        </p>
        <p className="text-neutral-500">
          {description || "Please enter Foreign Sales Quotation Responses"}
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
