import React from "react";
import { FaRegCircleDot } from "react-icons/fa6";

import { Icon } from "@/components/ui";

const TimeLineIcon = () => {
  return (
    <div>
      <div className="flex h-screen items-center justify-center bg-white px-6 md:px-60">
        <div className="space-y-6 border-l-2 border-dashed">
          <div className="relative w-full">
            <div className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full">
              <div className="h-9 w-9 rounded-full bg-primary-default p-1.5">
                <Icon name="Check" />
              </div>
            </div>
            <div className="ml-6">
              <h4 className="font-bold text-blue-500">Frontend Development.</h4>
              <p className="mt-2 max-w-screen-sm text-sm text-gray-500">
                Maecenas finibus nec sem ut imperdiet. Ut tincidunt est ac dolor
                aliquam sodales. Phasellus sed mauris hendrerit, laoreet sem in,
                lobortis ante.
              </p>
              <span className="mt-1 block text-sm font-semibold text-blue-500">
                2007
              </span>
            </div>
          </div>
          <div className="relative w-full">
            <div className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full">
              <div className="flex h-9 w-9 items-center justify-center rounded-full p-1.5">
                <FaRegCircleDot className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-neutral-default" />
              </div>
            </div>
            <div className="ml-6">
              <h4 className="font-bold text-blue-500">Graphic Design.</h4>
              <p className="mt-2 max-w-screen-sm text-sm text-gray-500">
                Aliquam tincidunt malesuada tortor vitae iaculis. In eu turpis
                iaculis, feugiat risus quis, aliquet urna. Quisque fringilla
                mollis risus, eu pulvinar dolor.
              </p>
              <span className="mt-1 block text-sm font-semibold text-blue-500">
                2007
              </span>
            </div>
          </div>
          <div className="relative w-full">
            <div className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-neutral-200 bg-white p-2 text-white">
                NA
              </div>
            </div>
            <div className="ml-6">
              <h4 className="font-bold text-blue-500">Lead Ui/Ux Designer.</h4>
              <p className="mt-2 max-w-screen-sm text-sm text-gray-500">
                Aliquam tincidunt malesuada tortor vitae iaculis. In eu turpis
                iaculis, feugiat risus quis, aliquet urna. Quisque fringilla
                mollis risus, eu pulvinar dolor
              </p>
              <span className="mt-1 block text-sm font-semibold text-blue-500">
                2007
              </span>
            </div>
          </div>
          <div className="relative w-full">
            <div className="absolute -top-0.5 z-10 -ml-3.5 h-7 w-7 rounded-full">
              <div className="h-7 w-7 rounded-full bg-green-500 p-1.5">
                <Icon
                  name="Check"
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-white"
                />
              </div>
            </div>

            <div className="ml-6">
              <h4 className="font-bold text-blue-500">Lead Ui/Ux Designer.</h4>
              <p className="mt-2 max-w-screen-sm text-sm text-gray-500">
                Aliquam tincidunt malesuada tortor vitae iaculis. In eu turpis
                iaculis, feugiat risus quis, aliquet urna. Quisque fringilla
                mollis risus, eu pulvinar dolor
              </p>
              <span className="mt-1 block text-sm font-semibold text-blue-500">
                2007
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLineIcon;
