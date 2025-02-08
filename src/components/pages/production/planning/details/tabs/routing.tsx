import { Separator } from "@/components/ui";
import { Option } from "@/lib";
import { RouteDtoRead } from "@/lib/redux/api/openapi.generated";
import MultiSelectListViewer from "@/shared/multi-select-lists";
import StepWrapper from "@/shared/wrapper";

interface IProps {
  data: RouteDtoRead[];
}

// operation?: CollectionItemDto;
// workCenter?: CollectionItemDto;
// estimatedTime?: string | null;
// resources?: CollectionItemDto[] | null;
// order?: number;
export const Routing = ({ data }: IProps) => {
  if (!data) {
    return <div>No Data</div>;
  }
  return (
    <StepWrapper className="w-full space-y-6">
      <span className="font-Medium block text-xl">Procedure</span>
      <ul className="space-y-2">
        <li className="text-secondary-500 flex justify-between gap-2 font-black">
          <span className="flex-1">Operation</span>
          <span className="flex-1">Work Center</span>
          <span className="flex-1">Estimated Time</span>
          <span className="flex-1">Resources</span>
        </li>
        {data?.map((item, idx) => (
          <li
            key={idx}
            className="flex items-center justify-between gap-2 rounded-xl border px-4 py-3"
          >
            <div className="flex w-full items-center gap-2">
              <span className="text-neutral-300">{item.order}</span>
              <div className="flex-1">
                <span className="text-primary-500">
                  {item?.operation?.name}
                </span>
              </div>
              <Separator orientation="vertical" className="mx-3 h-5" />
              <div className="flex-1">
                {/* <span className="text-black">{item?.workCenter?.name}</span> */}
                <MultiSelectListViewer
                  lists={
                    item?.workCenters?.map((item) => ({
                      label: item?.workCenter?.name as string,
                      value: item?.workCenter?.id as string,
                    })) as Option[]
                  }
                />
              </div>
              <Separator orientation="vertical" className="mx-3 h-5" />
              <div className="flex-1">
                <span className="text-neutral-500">{item?.estimatedTime}</span>
              </div>
              <Separator orientation="vertical" className="mx-3 h-5" />
              <div className="">
                <MultiSelectListViewer
                  lists={
                    item?.resources?.map((item) => ({
                      label: item?.resource?.name as string,
                      value: item?.resource?.id as string,
                    })) as Option[]
                  }
                />
                {/* <ul className="flex flex-wrap gap-2">
                  {item?.resources?.map((res, index) => (
                    <li key={index}>
                      <div className="whitespace-nowrap rounded-3xl border border-neutral-300 px-2 text-sm text-neutral-700">
                        {res?.name}
                      </div>
                    </li>
                  ))}
                </ul> */}
              </div>

              {/* <div className="flex flex-1 gap-2">
                <div className="font-Medium flex h-6 w-6 items-center justify-center rounded-full bg-neutral-100 text-xs text-primary-500">
                  {getInitials(item?.responsiblePerson?.name)}
                </div>
                <span className="text-sm text-neutral-500">
                  {item?.responsiblePerson?.name}
                </span>
                <Separator orientation="vertical" className="mx-3 h-5" />
                <span className="text-sm text-neutral-500">
                  {format(item?.dueDate, "MMMM dd, yyyy")}
                </span>
              </div> */}
            </div>
          </li>
        ))}
      </ul>
    </StepWrapper>
  );
};
