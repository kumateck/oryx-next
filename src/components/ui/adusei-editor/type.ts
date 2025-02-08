// import { ModelType } from "@/lib/constants";
import { SuggestionItem, SuggestionProps } from "./suggestion";

export interface CollectionLinkItem {
  id: string;
  title: string;
  // modelType: ModelType;
  reference: string;
  number: string | null;
  avatar: string | null;
}

export const restructureArrayToSuggestionProps = (
  array: Array<CollectionLinkItem>,
): SuggestionProps[] => {
  const grouped: { user: SuggestionItem[]; item: SuggestionItem[] } = {
    user: [],
    item: [],
  };

  array.forEach((element) => {
    const suggestionItem: SuggestionItem = {
      label: element.title,
      // email: element.modelType === "User" ? element.reference : undefined,
      reference: element.reference,
      image: element.avatar || undefined,
      id: element.id,
      // modelType: element.modelType as SuggestionItem["modelType"],
      // type: element.modelType === "User" ? "user" : "item",
    };
    grouped.item.push(suggestionItem);

    // if (element.modelType === "User") {
    //   grouped.user.push(suggestionItem);
    // } else {
    // }
  });

  // Construct SuggestionProps array
  const suggestionProps: SuggestionProps[] = [];

  if (grouped.user.length > 0) {
    suggestionProps.push({
      type: "user",
      heading: "Employees",
      children: grouped.user,
    });
  }

  if (grouped.item.length > 0) {
    suggestionProps.push({
      type: "item",
      heading: "Items",
      children: grouped.item,
    });
  }

  return suggestionProps;
};
