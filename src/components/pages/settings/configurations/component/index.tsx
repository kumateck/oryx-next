import { icons } from "lucide-react";
import { useCallback, useEffect } from "react";

import {
  GetApiV1CollectionByItemTypeApiArg,
  useLazyGetApiV1CollectionByItemTypeQuery,
} from "@/lib/redux/api/openapi.generated";
import { FormOption, splitWords } from "@/lib/utils";

import { FormOptionContainer } from "./container";

export interface ViewProps {
  modelType: string;
  title: string;
  icon: keyof typeof icons;
}
interface Props {
  view: ViewProps;
}

const Page = ({ view }: Props) => {
  const [collectionsQuery, { isLoading, data: formOptionsResponse }] =
    useLazyGetApiV1CollectionByItemTypeQuery();

  const refetchFormOptions = useCallback(async () => {
    await collectionsQuery({
      itemType: view.modelType,
    } satisfies GetApiV1CollectionByItemTypeApiArg).unwrap();
  }, [collectionsQuery, view]);

  useEffect(() => {
    refetchFormOptions();
  }, [collectionsQuery, refetchFormOptions, view]);

  const formOptionResults = formOptionsResponse as FormOption[];

  return (
    <div className="w-full space-y-9 pr-32">
      <FormOptionContainer
        key={view.modelType}
        modelType={view.modelType}
        dropDownType={view.modelType}
        isLoading={isLoading}
        title={splitWords(view.title)}
        icon={view.icon}
        refetchFormOptions={refetchFormOptions}
        formOptions={formOptionResults ?? []}
      />
    </div>
  );
};

export default Page;
