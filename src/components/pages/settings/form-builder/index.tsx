import Link from "next/link";
import { useState } from "react";

import {
  Button,
  Icon,
  LucideIconProps,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import { FORM_BUILDER_CONFIG } from "@/lib";

import QuestionCards from "./questions";
import CreateQuestionTypes from "./questions/question-types";
import TemplateCards from "./templates";

const FormBuilder = () => {
  const tabLists = [
    {
      name: FORM_BUILDER_CONFIG.QUESTIONS,
      icon: "CircleHelp",
    },
    {
      name: FORM_BUILDER_CONFIG.TEMPLATES,
      icon: "Monitor",
    },
  ].filter((tab) => !!tab) as { name: string; icon: LucideIconProps }[];
  const [activeTab, setActiveTab] = useState<string>(tabLists[0]?.name);
  const [isOpenQuestion, setIsOpenQuestion] = useState<boolean>(false);
  // const [childOneFunction, setChildOneFunction] = useState(null);
  // const [triggerReload, setTriggerReload] = useState(false);
  return (
    <div className="w-full space-y-6">
      <div className="flex w-full items-center justify-between">
        <span className="font-Medium text-2xl capitalize">
          Form Builder Configuration
        </span>
      </div>
      <Tabs defaultValue={activeTab}>
        <div className="flex items-center justify-between pr-4">
          <TabsList className="mb-4 gap-6 rounded-none border-b border-b-neutral-300 bg-transparent p-0 py-0">
            {tabLists?.map((tab, idx) => (
              <TabsTrigger
                key={idx}
                value={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className="data-[state=active]:border-b-primary-500 data-[state=active]:font-Bold data-[state=active]:text-primary-500 flex h-10 items-center gap-2 px-0 pl-0 capitalize data-[state=active]:rounded-none data-[state=active]:border-b data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Icon name={tab.icon} className="h-5 w-5" />
                <span className="font-Bold text-sm">{tab.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <div>
            {activeTab === FORM_BUILDER_CONFIG.TEMPLATES ? (
              <Link
                href={"create-template"}
                className="bg-primary-500 rounded-2xl text-white"
              >
                <Button
                  type="button"
                  variant="default"
                  size="default"
                  className="flex h-9 items-center gap-2"
                >
                  <Icon name="Plus" className="text-secondary-500 h-4 w-4" />
                  <span>Create Template </span>
                </Button>
              </Link>
            ) : (
              <Button
                type="button"
                onClick={() => setIsOpenQuestion(true)}
                variant="default"
                size="default"
                className="flex h-9 items-center gap-2"
              >
                <Icon name="Plus" className="text-secondary-500 h-4 w-4" />
                <span>Create Question</span>
              </Button>
            )}
          </div>
        </div>
        <TabsContent value={FORM_BUILDER_CONFIG.QUESTIONS}>
          <QuestionCards
          // triggerReload={triggerReload}
          // setTriggerReload={setTriggerReload}
          // setFunction={(func) => setChildOneFunction(() => func)}
          />
        </TabsContent>
        <TabsContent value={FORM_BUILDER_CONFIG.TEMPLATES}>
          <TemplateCards />
        </TabsContent>
      </Tabs>
      <CreateQuestionTypes
        isOpen={isOpenQuestion}
        onClose={() => setIsOpenQuestion(false)}
        setTriggerReload={() => console.log("setTriggerReload")}
      />
    </div>
  );
};

export default FormBuilder;
