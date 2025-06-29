import { QuestionType } from "@/lib";
import React from "react";

const FormResponseSwitch = () => {
  return <div>{ResponseSwitch(QuestionType.ShortAnswer)}</div>;
};

export default FormResponseSwitch;

const ResponseSwitch = (type: QuestionType): React.ReactNode => {
  switch (type) {
    case QuestionType.ShortAnswer:
      return <input type="text" placeholder="Short Answer" />;

    case QuestionType.LongAnswer:
      return <textarea placeholder="Long Answer"></textarea>;
    default:
      return <div>Unsupported question type</div>;
  }
};
