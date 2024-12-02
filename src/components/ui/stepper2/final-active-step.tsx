interface Props {
  title: string;
  onClick?: () => void;
}
const FinalActiveStep = ({ title, onClick }: Props) => {
  return (
    <li className="w-full hover:cursor-pointer" onClick={onClick}>
      <div className="pb-2">
        <span className="text-base font-medium">{title}</span>
      </div>
      <div className="flex w-full items-center after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-success-500 after:content-['']" />
    </li>
  );
};

export default FinalActiveStep;
