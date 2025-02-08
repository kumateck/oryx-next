import React from "react";

import { TabProps } from ".";
import Page from "./component";

interface Props {
  tab: TabProps;
}
const FormView = ({ tab }: Props) => {
  return (
    <div className="space-y-5">
      {tab?.views?.map((view, index) => <Page key={index} view={view} />)}
    </div>
  );
};

export default FormView;
