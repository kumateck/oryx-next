import React from "react";

import { Card, CardContent } from "@/components/ui";

const TestTimeline = () => {
  return (
    <div className="h-full w-full bg-primary-inverted p-5">
      {/* <ol className="flex flex-col gap-2">
        <li className="relative">
          <div className="relative border-l border-l-black p-5">
            <div className="absolute rounded-full border border-black bg-primary-default"></div>
            <span>test</span>
          </div>
        </li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
        <li>test</li>
      </ol> */}

      {/* <ol className="relative border-s border-gray-200 dark:border-gray-700">
        <li className="mb-10 ms-6">
          <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
            <svg
              className="h-2.5 w-2.5 text-blue-800 dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </span>
          <h3 className="mb-1 flex items-center text-lg font-semibold text-gray-900 dark:text-white">
            Flowbite Application UI v2.0.0{" "}
            <span className="me-2 ms-3 rounded-sm bg-blue-100 px-2.5 py-0.5 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
              Latest
            </span>
          </h3>
          <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Released on January 13th, 2022
          </time>
          <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
            Get access to over 20+ pages including a dashboard layout, charts,
            kanban board, calendar, and pre-order E-commerce & Marketing pages.
          </p>
          <a
            href="#"
            className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700"
          >
            <svg
              className="me-2.5 h-3.5 w-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
            </svg>{" "}
            Download ZIP
          </a>
        </li>
        <li className="mb-10 ms-6">
          <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
            <svg
              className="h-2.5 w-2.5 text-blue-800 dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Flowbite Figma v1.3.0
          </h3>
          <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Released on December 7th, 2021
          </time>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            All of the pages and components are first designed in Figma and we
            keep a parity between the two versions even as we update the
            project.
          </p>
        </li>
        <li className="ms-6">
          <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
            <svg
              className="h-2.5 w-2.5 text-blue-800 dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </span>
          <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">
            Flowbite Library v1.2.2
          </h3>
          <time className="mb-2 block text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            Released on December 2nd, 2021
          </time>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">
            Get started with dozens of web components and interactive elements
            built on top of Tailwind CSS.
          </p>
        </li>
      </ol> */}
      {/* <div className="border-4 border-black p-5">
        <ol className="relative h-full w-0.5 border border-solid border-gray-600">
          <li className="">
            <div>
              <div className="absolute start-1 flex h-6 w-6 items-center justify-center rounded-full bg-primary-default"></div>
            </div>
          </li>
          <li>des</li>
          <li>des</li>
          <li>des</li>
          <li>des</li>
        </ol>
      </div> */}
      <div className="w-full">
        {/* <ol>
          <li>
            <div className="flex w-full items-start gap-2">
              <div className="h-full w-5 border border-neutral-dark"></div>
              <div className="flex-grow">
                <span>Timeline one</span>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Odio euismod lacinia at quis risus sed vulputate odio ut. Quam
                  viverra orci sagittis eu volutpat odio facilisis mauris.
                </p>
              </div>
            </div>
          </li>
        </ol> */}
        <ul>
          <li>
            <Card className="relative">
              <div className="absolute left-0 top-0 flex h-7 w-7 rounded-full border border-black bg-primary-default" />
              <CardContent className="relative">
                <div className="h-5 w-5 !border-4 border-indigo-600"></div>
                <span>Timeline one</span>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Odio euismod lacinia at quis risus sed vulputate odio ut. Quam
                  viverra orci sagittis eu volutpat odio facilisis mauris.
                </p>
              </CardContent>
            </Card>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TestTimeline;
