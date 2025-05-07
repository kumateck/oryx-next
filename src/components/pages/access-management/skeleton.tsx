import { Skeleton } from "@/components/ui";
import StepWrapper from "@/shared/wrapper";

const LoadingSkeleton = () => {
  return (
    <StepWrapper>
      <div className="flex flex-col space-y-3">
        <ul className="grid w-full grid-cols-7 gap-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <li key={index}>
              <Skeleton className="h-4 w-full rounded-xl" />{" "}
            </li>
          ))}
        </ul>

        <div className="space-y-8">
          <Skeleton className="h-8 w-[100px] rounded-2xl" />
        </div>
        <div className="grid grid-cols-6 rounded-xl border">
          <div className="col-span-1 border-r p-5">
            <ul className="flex flex-col space-y-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <li key={index}>
                  <Skeleton className="h-4 w-full rounded-xl" />{" "}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 border-r">
            <ul className="flex flex-col">
              {Array.from({ length: 4 }).map((_, index) => (
                <li
                  key={index}
                  className="flex flex-col space-y-2 border-b p-5"
                >
                  <Skeleton className="h-2 w-1/2 rounded-xl" />{" "}
                  <Skeleton className="h-4 w-full rounded-xl" />{" "}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-3">
            <ul className="flex flex-col">
              {Array.from({ length: 4 }).map((_, index) => (
                <li
                  key={index}
                  className="flex flex-col space-y-2 border-b p-5"
                >
                  <ul className="grid grid-cols-4 gap-2">
                    {Array.from({ length: 4 }).map((_, idx) => (
                      <li key={idx}>
                        <Skeleton className="h-8 w-12 rounded-full" />{" "}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          {/* <div className="col-span-3">
            <ul className="flex flex-wrap justify-between">
              {Array.from({ length: 4 }).map((_, index) => (
                <li
                  key={index}
                  className="flex flex-col space-y-2 border-b p-5"
                >
                  <Skeleton className="h-4 w-full rounded-xl" />
                </li>
              ))}
            </ul>
          </div> */}
        </div>
      </div>
    </StepWrapper>
  );
};

export default LoadingSkeleton;
