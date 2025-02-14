"use client";

import React from "react";
import { FaCodeMerge } from "react-icons/fa6";

// import {
//   VerticalTimeline,
//   VerticalTimelineElement,
// } from "react-vertical-timeline-component";
// import "react-vertical-timeline-component/style.min.css";
// import { Icon } from "@/components/ui";
// import { Timeline } from "@/components/ui/timeline";
// import TimeLineIcon from "./cs";
import { TimelineLayout } from "./layout";
import { TimelineElement } from "./types";

const ProductionTimeLine = () => {
  // const [currentStep, setCurrentStep] = useState(0);
  // const steps = [
  //   {
  //     title: "Step 1",
  //     description: "Description for Step 1",
  //   },
  //   {
  //     title: "Step 2",
  //     description: "Description for Step 2",
  //   },
  //   {
  //     title: "Step 3",
  //     description: "Description for Step 3",
  //   },
  // ];
  return (
    <div className="container relative mx-auto max-w-4xl">
      {/* <Timeline
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        steps={steps}
      /> */}
      {/* <TimeLineIcon /> */}

      <TimelineLayout items={timelineData} size="md" animate={true} />
    </div>
  );
};

const timelineData: TimelineElement[] = [
  {
    id: 1,
    title: "First event",
    date: "2022-01-01",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio euismod lacinia at quis risus sed vulputate odio ut. Quam viverra orci sagittis eu volutpat odio facilisis mauris.",
    status: "completed",
    icon: <FaCodeMerge />,
  },
  {
    id: 2,
    title: "Second event",
    date: "2022-02-01",
    description:
      "Aut eius excepturi ex recusandae eius est minima molestiae. Nam dolores iusto ad fugit reprehenderit hic dolorem quisquam et quia omnis non suscipit nihil sit.",
    status: "in-progress",
  },
  {
    id: 3,
    title: "Third event",
    date: "2022-03-01",
    description:
      "Sit culpa quas ex nulla animi qui deleniti minus rem placeat mollitia. Et enim doloremque et quia sequi ea dolores voluptatem ea rerum vitae.",
    status: "pending",
  },
];

export default ProductionTimeLine;
