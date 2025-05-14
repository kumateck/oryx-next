"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Button,
  Icon,
  LucideIconProps,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui";
import {
  findRecordWithAccess,
  FORM_BUILDER_CONFIG,
  PermissionKeys,
  Section,
} from "@/lib";

import QuestionCards from "./questions";
import CreateQuestionTypes from "./questions/question-types";
import TemplateCards from "./templates";
import { useSelector } from "@/lib/redux/store";
import NoAccess from "@/shared/no-access";

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

  //Check Permision
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  // check permissions here
  const permissions = useSelector(
    (state) => state.persistedReducer?.auth?.permissions,
  ) as Section[];
  // check permissions access
  const hasAccessToWorkFlowFormQuestions = findRecordWithAccess(
    permissions,
    PermissionKeys.workflowForms.questions.view,
  );
  const hasAccessToWorkFlowFormTemplate = findRecordWithAccess(
    permissions,
    PermissionKeys.workflowForms.templates.view,
  );
  if (
    isClient &&
    !hasAccessToWorkFlowFormQuestions &&
    activeTab === FORM_BUILDER_CONFIG.QUESTIONS
  ) {
    //redirect to no access
    return <NoAccess />;
  }
  if (
    isClient &&
    !hasAccessToWorkFlowFormTemplate &&
    activeTab === FORM_BUILDER_CONFIG.TEMPLATES
  ) {
    //redirect to no access
    return <NoAccess />;
  }

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
                className="flex h-9 items-center gap-2 px-0 pl-0 capitalize data-[state=active]:rounded-none data-[state=active]:border-b-2 data-[state=active]:border-b-primary-default data-[state=active]:bg-transparent data-[state=active]:font-bold data-[state=active]:text-primary-default data-[state=active]:shadow-none"
              >
                <Icon name={tab.icon} className="h-5 w-5" />
                <span className="font-Bold text-sm">{tab.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          <div>
            {activeTab === FORM_BUILDER_CONFIG.TEMPLATES
              ? findRecordWithAccess(
                  permissions,
                  PermissionKeys.workflowForms.templates.createNew,
                ) && (
                  <Link href={"template/create"}>
                    <Button
                      type="button"
                      variant="default"
                      size="default"
                      className="flex h-9 items-center gap-2"
                    >
                      <Icon name="Plus" className="h-4 w-4" />
                      <span>Create Template </span>
                    </Button>
                  </Link>
                )
              : findRecordWithAccess(
                  permissions,
                  PermissionKeys.workflowForms.questions.createNew,
                ) && (
                  <Button
                    type="button"
                    onClick={() => setIsOpenQuestion(true)}
                    variant="default"
                    size="default"
                    className="flex h-9 items-center gap-2"
                  >
                    <Icon name="Plus" className="h-4 w-4" />
                    <span>Create Question</span>
                  </Button>
                )}
          </div>
        </div>
        <TabsContent value={FORM_BUILDER_CONFIG.QUESTIONS}>
          <QuestionCards />
        </TabsContent>
        <TabsContent value={FORM_BUILDER_CONFIG.TEMPLATES}>
          <TemplateCards />
        </TabsContent>
      </Tabs>
      {isOpenQuestion && (
        <CreateQuestionTypes
          isOpen={isOpenQuestion}
          onClose={() => setIsOpenQuestion(false)}
        />
      )}
    </div>
  );
};

export default FormBuilder;
