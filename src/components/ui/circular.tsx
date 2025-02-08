import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface Props {
  value: number;
  max: number;
}

export const CircularProgress = ({ value, max }: Props) => {
  return (
    <div className="h-8 w-8">
      <CircularProgressbar
        value={value === 0 && max === 0 ? 1 : value}
        maxValue={max > 0 ? max : 1}
        text={`${value}/${max}`}
        circleRatio={0.75} /* Make the circle only 0.75 of the full diameter */
        styles={{
          text: {
            fill: "#04202F",
            fontSize: "2rem",
            dominantBaseline: "central",
          },
          trail: {
            strokeLinecap: "butt",
            transform: "rotate(-135deg)",
            transformOrigin: "center center",
          },

          path: {
            stroke: "#22C55E",
            strokeLinecap: "butt",
            transform: "rotate(-135deg)",
            transformOrigin: "center center",
          },
        }}
      />
    </div>
  );
};
