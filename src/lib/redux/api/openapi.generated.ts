import { api } from "./index";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiV1ActivityLog: build.query<
      GetApiV1ActivityLogApiResponse,
      GetApiV1ActivityLogApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/activity-log`,
        params: {
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
          pageSize: queryArg.pageSize,
          page: queryArg.page,
          sortLabel: queryArg.sortLabel,
          sortDirection: queryArg.sortDirection,
        },
      }),
    }),
    postApiV1Approval: build.mutation<
      PostApiV1ApprovalApiResponse,
      PostApiV1ApprovalApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/approval`,
        method: "POST",
        body: queryArg.createApprovalRequest,
      }),
    }),
    getApiV1Approval: build.query<
      GetApiV1ApprovalApiResponse,
      GetApiV1ApprovalApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/approval`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ApprovalByApprovalId: build.query<
      GetApiV1ApprovalByApprovalIdApiResponse,
      GetApiV1ApprovalByApprovalIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/approval/${queryArg.approvalId}` }),
    }),
    putApiV1ApprovalByApprovalId: build.mutation<
      PutApiV1ApprovalByApprovalIdApiResponse,
      PutApiV1ApprovalByApprovalIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/approval/${queryArg.approvalId}`,
        method: "PUT",
        body: queryArg.createApprovalRequest,
      }),
    }),
    deleteApiV1ApprovalByApprovalId: build.mutation<
      DeleteApiV1ApprovalByApprovalIdApiResponse,
      DeleteApiV1ApprovalByApprovalIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/approval/${queryArg.approvalId}`,
        method: "DELETE",
      }),
    }),
    getApiV1ApprovalByModelTypeAndModelId: build.query<
      GetApiV1ApprovalByModelTypeAndModelIdApiResponse,
      GetApiV1ApprovalByModelTypeAndModelIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/approval/${queryArg.modelType}/${queryArg.modelId}`,
      }),
    }),
    postApiV1ApprovalApproveByModelTypeAndModelId: build.mutation<
      PostApiV1ApprovalApproveByModelTypeAndModelIdApiResponse,
      PostApiV1ApprovalApproveByModelTypeAndModelIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/approval/approve/${queryArg.modelType}/${queryArg.modelId}`,
        method: "POST",
        body: queryArg.approvalRequestBody,
      }),
    }),
    postApiV1ApprovalRejectByModelTypeAndModelId: build.mutation<
      PostApiV1ApprovalRejectByModelTypeAndModelIdApiResponse,
      PostApiV1ApprovalRejectByModelTypeAndModelIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/approval/reject/${queryArg.modelType}/${queryArg.modelId}`,
        method: "POST",
        body: queryArg.approvalRequestBody,
      }),
    }),
    getApiV1ApprovalMyPending: build.query<
      GetApiV1ApprovalMyPendingApiResponse,
      GetApiV1ApprovalMyPendingApiArg
    >({
      query: () => ({ url: `/api/v1/approval/my-pending` }),
    }),
    postApiV1AuthLogin: build.mutation<
      PostApiV1AuthLoginApiResponse,
      PostApiV1AuthLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/login`,
        method: "POST",
        body: queryArg.loginRequest,
      }),
    }),
    postApiV1AuthLoginWithRefreshToken: build.mutation<
      PostApiV1AuthLoginWithRefreshTokenApiResponse,
      PostApiV1AuthLoginWithRefreshTokenApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/login-with-refresh-token`,
        method: "POST",
        body: queryArg.loginWithRefreshToken,
      }),
    }),
    postApiV1AuthSetPassword: build.mutation<
      PostApiV1AuthSetPasswordApiResponse,
      PostApiV1AuthSetPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/set-password`,
        method: "POST",
        body: queryArg.setPasswordRequest,
      }),
    }),
    postApiV1AuthChangePassword: build.mutation<
      PostApiV1AuthChangePasswordApiResponse,
      PostApiV1AuthChangePasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/change-password`,
        method: "POST",
        body: queryArg.changePasswordRequest,
      }),
    }),
    postApiV1AuthForgotPassword: build.mutation<
      PostApiV1AuthForgotPasswordApiResponse,
      PostApiV1AuthForgotPasswordApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/forgot-password`,
        method: "POST",
        body: queryArg.forgotPasswordRequest,
      }),
    }),
    postApiV1Bom: build.mutation<PostApiV1BomApiResponse, PostApiV1BomApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/bom`,
        method: "POST",
        body: queryArg.createBillOfMaterialRequest,
      }),
    }),
    getApiV1Bom: build.query<GetApiV1BomApiResponse, GetApiV1BomApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/bom`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1BomByBillOfMaterialId: build.query<
      GetApiV1BomByBillOfMaterialIdApiResponse,
      GetApiV1BomByBillOfMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/bom/${queryArg.billOfMaterialId}`,
      }),
    }),
    putApiV1BomByBillOfMaterialId: build.mutation<
      PutApiV1BomByBillOfMaterialIdApiResponse,
      PutApiV1BomByBillOfMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/bom/${queryArg.billOfMaterialId}`,
        method: "PUT",
        body: queryArg.createProductBillOfMaterialRequest,
      }),
    }),
    deleteApiV1BomByBillOfMaterialId: build.mutation<
      DeleteApiV1BomByBillOfMaterialIdApiResponse,
      DeleteApiV1BomByBillOfMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/bom/${queryArg.billOfMaterialId}`,
        method: "DELETE",
      }),
    }),
    postApiV1Collection: build.mutation<
      PostApiV1CollectionApiResponse,
      PostApiV1CollectionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/collection`,
        method: "POST",
        body: queryArg.body,
        params: {
          materialKind: queryArg.materialKind,
        },
      }),
    }),
    getApiV1CollectionByItemType: build.query<
      GetApiV1CollectionByItemTypeApiResponse,
      GetApiV1CollectionByItemTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/collection/${queryArg.itemType}`,
        params: {
          materialKind: queryArg.materialKind,
        },
      }),
    }),
    postApiV1CollectionByItemType: build.mutation<
      PostApiV1CollectionByItemTypeApiResponse,
      PostApiV1CollectionByItemTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/collection/${queryArg.itemType}`,
        method: "POST",
        body: queryArg.createItemRequest,
      }),
    }),
    getApiV1CollectionItemTypes: build.query<
      GetApiV1CollectionItemTypesApiResponse,
      GetApiV1CollectionItemTypesApiArg
    >({
      query: () => ({ url: `/api/v1/collection/item-types` }),
    }),
    putApiV1CollectionByItemTypeAndItemId: build.mutation<
      PutApiV1CollectionByItemTypeAndItemIdApiResponse,
      PutApiV1CollectionByItemTypeAndItemIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/collection/${queryArg.itemType}/${queryArg.itemId}`,
        method: "PUT",
        body: queryArg.createItemRequest,
      }),
    }),
    deleteApiV1CollectionByItemTypeAndItemId: build.mutation<
      DeleteApiV1CollectionByItemTypeAndItemIdApiResponse,
      DeleteApiV1CollectionByItemTypeAndItemIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/collection/${queryArg.itemType}/${queryArg.itemId}`,
        method: "DELETE",
      }),
    }),
    getApiV1CollectionUom: build.query<
      GetApiV1CollectionUomApiResponse,
      GetApiV1CollectionUomApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/collection/uom`,
        params: {
          isRawMaterial: queryArg.isRawMaterial,
        },
      }),
    }),
    getApiV1CollectionPackageStyles: build.query<
      GetApiV1CollectionPackageStylesApiResponse,
      GetApiV1CollectionPackageStylesApiArg
    >({
      query: () => ({ url: `/api/v1/collection/package-styles` }),
    }),
    postApiV1WorkingDays: build.mutation<
      PostApiV1WorkingDaysApiResponse,
      PostApiV1WorkingDaysApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/working-days`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiV1WorkingDays: build.query<
      GetApiV1WorkingDaysApiResponse,
      GetApiV1WorkingDaysApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/working-days`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1WorkingDaysById: build.query<
      GetApiV1WorkingDaysByIdApiResponse,
      GetApiV1WorkingDaysByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/working-days/${queryArg.id}` }),
    }),
    putApiV1WorkingDaysById: build.mutation<
      PutApiV1WorkingDaysByIdApiResponse,
      PutApiV1WorkingDaysByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/working-days/${queryArg.id}`,
        method: "PUT",
        body: queryArg.companyWorkingDaysRequest,
      }),
    }),
    postApiV1Configuration: build.mutation<
      PostApiV1ConfigurationApiResponse,
      PostApiV1ConfigurationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/configuration`,
        method: "POST",
        body: queryArg.createConfigurationRequest,
      }),
    }),
    getApiV1Configuration: build.query<
      GetApiV1ConfigurationApiResponse,
      GetApiV1ConfigurationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/configuration`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ConfigurationByConfigurationId: build.query<
      GetApiV1ConfigurationByConfigurationIdApiResponse,
      GetApiV1ConfigurationByConfigurationIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/configuration/${queryArg.configurationId}`,
      }),
    }),
    putApiV1ConfigurationByConfigurationId: build.mutation<
      PutApiV1ConfigurationByConfigurationIdApiResponse,
      PutApiV1ConfigurationByConfigurationIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/configuration/${queryArg.configurationId}`,
        method: "PUT",
        body: queryArg.createConfigurationRequest,
      }),
    }),
    deleteApiV1ConfigurationByConfigurationId: build.mutation<
      DeleteApiV1ConfigurationByConfigurationIdApiResponse,
      DeleteApiV1ConfigurationByConfigurationIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/configuration/${queryArg.configurationId}`,
        method: "DELETE",
      }),
    }),
    getApiV1ConfigurationByModelTypeByModelType: build.query<
      GetApiV1ConfigurationByModelTypeByModelTypeApiResponse,
      GetApiV1ConfigurationByModelTypeByModelTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/configuration/by-model-type/${queryArg.modelType}`,
      }),
    }),
    getApiV1ConfigurationNamingTypes: build.query<
      GetApiV1ConfigurationNamingTypesApiResponse,
      GetApiV1ConfigurationNamingTypesApiArg
    >({
      query: () => ({ url: `/api/v1/configuration/naming-types` }),
    }),
    getApiV1ConfigurationByModelTypeAndPrefix: build.query<
      GetApiV1ConfigurationByModelTypeAndPrefixApiResponse,
      GetApiV1ConfigurationByModelTypeAndPrefixApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/configuration/${queryArg.modelType}/${queryArg.prefix}`,
      }),
    }),
    postApiV1Department: build.mutation<
      PostApiV1DepartmentApiResponse,
      PostApiV1DepartmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/department`,
        method: "POST",
        body: queryArg.createDepartmentRequest,
      }),
    }),
    getApiV1Department: build.query<
      GetApiV1DepartmentApiResponse,
      GetApiV1DepartmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/department`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          type: queryArg["type"],
        },
      }),
    }),
    getApiV1DepartmentByDepartmentId: build.query<
      GetApiV1DepartmentByDepartmentIdApiResponse,
      GetApiV1DepartmentByDepartmentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/department/${queryArg.departmentId}`,
      }),
    }),
    putApiV1DepartmentByDepartmentId: build.mutation<
      PutApiV1DepartmentByDepartmentIdApiResponse,
      PutApiV1DepartmentByDepartmentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/department/${queryArg.departmentId}`,
        method: "PUT",
        body: queryArg.createDepartmentRequest,
      }),
    }),
    deleteApiV1DepartmentByDepartmentId: build.mutation<
      DeleteApiV1DepartmentByDepartmentIdApiResponse,
      DeleteApiV1DepartmentByDepartmentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/department/${queryArg.departmentId}`,
        method: "DELETE",
      }),
    }),
    postApiV1Designation: build.mutation<
      PostApiV1DesignationApiResponse,
      PostApiV1DesignationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/designation`,
        method: "POST",
        body: queryArg.createDesignationRequest,
      }),
    }),
    getApiV1Designation: build.query<
      GetApiV1DesignationApiResponse,
      GetApiV1DesignationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/designation`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1DesignationById: build.query<
      GetApiV1DesignationByIdApiResponse,
      GetApiV1DesignationByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/designation/${queryArg.id}` }),
    }),
    putApiV1DesignationById: build.mutation<
      PutApiV1DesignationByIdApiResponse,
      PutApiV1DesignationByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/designation/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createDesignationRequest,
      }),
    }),
    deleteApiV1DesignationById: build.mutation<
      DeleteApiV1DesignationByIdApiResponse,
      DeleteApiV1DesignationByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/designation/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiV1DesignationDepartmentById: build.query<
      GetApiV1DesignationDepartmentByIdApiResponse,
      GetApiV1DesignationDepartmentByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/designation/department/${queryArg.id}`,
      }),
    }),
    postApiV1EmployeeRegister: build.mutation<
      PostApiV1EmployeeRegisterApiResponse,
      PostApiV1EmployeeRegisterApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employee/register`,
        method: "POST",
        body: queryArg.onboardEmployeeDto,
      }),
    }),
    postApiV1Employee: build.mutation<
      PostApiV1EmployeeApiResponse,
      PostApiV1EmployeeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employee`,
        method: "POST",
        body: queryArg.createEmployeeRequest,
      }),
    }),
    getApiV1Employee: build.query<
      GetApiV1EmployeeApiResponse,
      GetApiV1EmployeeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employee`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          designation: queryArg.designation,
          department: queryArg.department,
        },
      }),
    }),
    postApiV1EmployeeUser: build.mutation<
      PostApiV1EmployeeUserApiResponse,
      PostApiV1EmployeeUserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employee/user`,
        method: "POST",
        body: queryArg.employeeUserDto,
      }),
    }),
    getApiV1EmployeeById: build.query<
      GetApiV1EmployeeByIdApiResponse,
      GetApiV1EmployeeByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/employee/${queryArg.id}` }),
    }),
    putApiV1EmployeeById: build.mutation<
      PutApiV1EmployeeByIdApiResponse,
      PutApiV1EmployeeByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employee/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createEmployeeRequest,
      }),
    }),
    deleteApiV1EmployeeById: build.mutation<
      DeleteApiV1EmployeeByIdApiResponse,
      DeleteApiV1EmployeeByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employee/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putApiV1EmployeeByIdAssign: build.mutation<
      PutApiV1EmployeeByIdAssignApiResponse,
      PutApiV1EmployeeByIdAssignApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employee/${queryArg.id}/assign`,
        method: "PUT",
        body: queryArg.assignEmployeeDto,
      }),
    }),
    postApiV1FileByModelTypeAndModelIdReference: build.mutation<
      PostApiV1FileByModelTypeAndModelIdReferenceApiResponse,
      PostApiV1FileByModelTypeAndModelIdReferenceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/file/${queryArg.modelType}/${queryArg.modelId}/${queryArg.reference}`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiV1FileByModelTypeAndModelIdReference: build.query<
      GetApiV1FileByModelTypeAndModelIdReferenceApiResponse,
      GetApiV1FileByModelTypeAndModelIdReferenceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/file/${queryArg.modelType}/${queryArg.modelId}/${queryArg.reference}`,
      }),
    }),
    postApiV1FileByModelTypeAndModelId: build.mutation<
      PostApiV1FileByModelTypeAndModelIdApiResponse,
      PostApiV1FileByModelTypeAndModelIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/file/${queryArg.modelType}/${queryArg.modelId}`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    deleteApiV1FileByModelId: build.mutation<
      DeleteApiV1FileByModelIdApiResponse,
      DeleteApiV1FileByModelIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/file/${queryArg.modelId}`,
        method: "DELETE",
      }),
    }),
    deleteApiV1FileByModelIdAndReference: build.mutation<
      DeleteApiV1FileByModelIdAndReferenceApiResponse,
      DeleteApiV1FileByModelIdAndReferenceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/file/${queryArg.modelId}/${queryArg.reference}`,
        method: "DELETE",
      }),
    }),
    getApiV1FileByModelTypeAndReference: build.query<
      GetApiV1FileByModelTypeAndReferenceApiResponse,
      GetApiV1FileByModelTypeAndReferenceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/file/${queryArg.modelType}/${queryArg.reference}`,
      }),
    }),
    postApiV1Form: build.mutation<
      PostApiV1FormApiResponse,
      PostApiV1FormApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form`,
        method: "POST",
        body: queryArg.createFormRequest,
      }),
    }),
    getApiV1Form: build.query<GetApiV1FormApiResponse, GetApiV1FormApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/form`,
        params: {
          searchQuery: queryArg.searchQuery,
          pageSize: queryArg.pageSize,
          page: queryArg.page,
          sortLabel: queryArg.sortLabel,
          sortDirection: queryArg.sortDirection,
        },
      }),
    }),
    getApiV1FormByFormId: build.query<
      GetApiV1FormByFormIdApiResponse,
      GetApiV1FormByFormIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/form/${queryArg.formId}` }),
    }),
    putApiV1FormByFormId: build.mutation<
      PutApiV1FormByFormIdApiResponse,
      PutApiV1FormByFormIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form/${queryArg.formId}`,
        method: "PUT",
        body: queryArg.createFormRequest,
      }),
    }),
    deleteApiV1FormByFormId: build.mutation<
      DeleteApiV1FormByFormIdApiResponse,
      DeleteApiV1FormByFormIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form/${queryArg.formId}`,
        method: "DELETE",
      }),
    }),
    postApiV1FormResponses: build.mutation<
      PostApiV1FormResponsesApiResponse,
      PostApiV1FormResponsesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form/responses`,
        method: "POST",
        body: queryArg.createResponseRequest,
      }),
    }),
    getApiV1FormResponsesByFormResponseId: build.query<
      GetApiV1FormResponsesByFormResponseIdApiResponse,
      GetApiV1FormResponsesByFormResponseIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form/responses/${queryArg.formResponseId}`,
      }),
    }),
    postApiV1FormQuestion: build.mutation<
      PostApiV1FormQuestionApiResponse,
      PostApiV1FormQuestionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form/question`,
        method: "POST",
        body: queryArg.createQuestionRequest,
      }),
    }),
    getApiV1FormQuestion: build.query<
      GetApiV1FormQuestionApiResponse,
      GetApiV1FormQuestionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form/question`,
        params: {
          searchQuery: queryArg.searchQuery,
          pageSize: queryArg.pageSize,
          page: queryArg.page,
          sortLabel: queryArg.sortLabel,
          sortDirection: queryArg.sortDirection,
        },
      }),
    }),
    getApiV1FormQuestionByQuestionId: build.query<
      GetApiV1FormQuestionByQuestionIdApiResponse,
      GetApiV1FormQuestionByQuestionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form/question/${queryArg.questionId}`,
      }),
    }),
    putApiV1FormQuestionByQuestionId: build.mutation<
      PutApiV1FormQuestionByQuestionIdApiResponse,
      PutApiV1FormQuestionByQuestionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form/question/${queryArg.questionId}`,
        method: "PUT",
        body: queryArg.createQuestionRequest,
      }),
    }),
    deleteApiV1FormQuestionByQuestionId: build.mutation<
      DeleteApiV1FormQuestionByQuestionIdApiResponse,
      DeleteApiV1FormQuestionByQuestionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form/question/${queryArg.questionId}`,
        method: "DELETE",
      }),
    }),
    postApiV1LeaveEntitlement: build.mutation<
      PostApiV1LeaveEntitlementApiResponse,
      PostApiV1LeaveEntitlementApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-entitlement`,
        method: "POST",
        body: queryArg.leaveEntitlementDto,
      }),
    }),
    getApiV1LeaveEntitlement: build.query<
      GetApiV1LeaveEntitlementApiResponse,
      GetApiV1LeaveEntitlementApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-entitlement`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1LeaveEntitlementById: build.query<
      GetApiV1LeaveEntitlementByIdApiResponse,
      GetApiV1LeaveEntitlementByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-entitlement/${queryArg.id}`,
      }),
    }),
    putApiV1LeaveEntitlementById: build.mutation<
      PutApiV1LeaveEntitlementByIdApiResponse,
      PutApiV1LeaveEntitlementByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-entitlement/${queryArg.id}`,
        method: "PUT",
        body: queryArg.leaveEntitlementDto,
      }),
    }),
    deleteApiV1LeaveEntitlementById: build.mutation<
      DeleteApiV1LeaveEntitlementByIdApiResponse,
      DeleteApiV1LeaveEntitlementByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-entitlement/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiV1LeaveRequest: build.mutation<
      PostApiV1LeaveRequestApiResponse,
      PostApiV1LeaveRequestApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-request`,
        method: "POST",
        body: queryArg.createLeaveRequest,
      }),
    }),
    getApiV1LeaveRequest: build.query<
      GetApiV1LeaveRequestApiResponse,
      GetApiV1LeaveRequestApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-request`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1LeaveRequestById: build.query<
      GetApiV1LeaveRequestByIdApiResponse,
      GetApiV1LeaveRequestByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/leave-request/${queryArg.id}` }),
    }),
    putApiV1LeaveRequestById: build.mutation<
      PutApiV1LeaveRequestByIdApiResponse,
      PutApiV1LeaveRequestByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-request/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createLeaveRequest,
      }),
    }),
    deleteApiV1LeaveRequestById: build.mutation<
      DeleteApiV1LeaveRequestByIdApiResponse,
      DeleteApiV1LeaveRequestByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-request/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiV1LeaveType: build.mutation<
      PostApiV1LeaveTypeApiResponse,
      PostApiV1LeaveTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-type`,
        method: "POST",
        body: queryArg.createLeaveTypeRequest,
      }),
    }),
    getApiV1LeaveType: build.query<
      GetApiV1LeaveTypeApiResponse,
      GetApiV1LeaveTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-type`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1LeaveTypeById: build.query<
      GetApiV1LeaveTypeByIdApiResponse,
      GetApiV1LeaveTypeByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/leave-type/${queryArg.id}` }),
    }),
    putApiV1LeaveTypeById: build.mutation<
      PutApiV1LeaveTypeByIdApiResponse,
      PutApiV1LeaveTypeByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-type/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createLeaveTypeRequest,
      }),
    }),
    deleteApiV1LeaveTypeById: build.mutation<
      DeleteApiV1LeaveTypeByIdApiResponse,
      DeleteApiV1LeaveTypeByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-type/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiV1Material: build.mutation<
      PostApiV1MaterialApiResponse,
      PostApiV1MaterialApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material`,
        method: "POST",
        body: queryArg.createMaterialRequest,
      }),
    }),
    getApiV1Material: build.query<
      GetApiV1MaterialApiResponse,
      GetApiV1MaterialApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material`,
        params: {
          kind: queryArg.kind,
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1MaterialByMaterialId: build.query<
      GetApiV1MaterialByMaterialIdApiResponse,
      GetApiV1MaterialByMaterialIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/material/${queryArg.materialId}` }),
    }),
    putApiV1MaterialByMaterialId: build.mutation<
      PutApiV1MaterialByMaterialIdApiResponse,
      PutApiV1MaterialByMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}`,
        method: "PUT",
        body: queryArg.createMaterialRequest,
      }),
    }),
    deleteApiV1MaterialByMaterialId: build.mutation<
      DeleteApiV1MaterialByMaterialIdApiResponse,
      DeleteApiV1MaterialByMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}`,
        method: "DELETE",
      }),
    }),
    getApiV1MaterialCategory: build.query<
      GetApiV1MaterialCategoryApiResponse,
      GetApiV1MaterialCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/category`,
        params: {
          materialKind: queryArg.materialKind,
        },
      }),
    }),
    getApiV1MaterialAll: build.query<
      GetApiV1MaterialAllApiResponse,
      GetApiV1MaterialAllApiArg
    >({
      query: () => ({ url: `/api/v1/material/all` }),
    }),
    putApiV1MaterialByMaterialIdReorderLevel: build.mutation<
      PutApiV1MaterialByMaterialIdReorderLevelApiResponse,
      PutApiV1MaterialByMaterialIdReorderLevelApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/reorder-level`,
        method: "PUT",
        body: queryArg.updateReOrderLevelRequest,
      }),
    }),
    getApiV1MaterialByMaterialIdStockLevel: build.query<
      GetApiV1MaterialByMaterialIdStockLevelApiResponse,
      GetApiV1MaterialByMaterialIdStockLevelApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/stock-level`,
      }),
    }),
    getApiV1MaterialByMaterialIdBatches: build.query<
      GetApiV1MaterialByMaterialIdBatchesApiResponse,
      GetApiV1MaterialByMaterialIdBatchesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/batches`,
      }),
    }),
    getApiV1MaterialByMaterialIdInTransit: build.query<
      GetApiV1MaterialByMaterialIdInTransitApiResponse,
      GetApiV1MaterialByMaterialIdInTransitApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/in-transit`,
      }),
    }),
    postApiV1MaterialBatch: build.mutation<
      PostApiV1MaterialBatchApiResponse,
      PostApiV1MaterialBatchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/batch`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiV1MaterialBatch: build.query<
      GetApiV1MaterialBatchApiResponse,
      GetApiV1MaterialBatchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/batch`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1MaterialBatchByBatchId: build.query<
      GetApiV1MaterialBatchByBatchIdApiResponse,
      GetApiV1MaterialBatchByBatchIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/batch/${queryArg.batchId}`,
      }),
    }),
    postApiV1MaterialBatchMove: build.mutation<
      PostApiV1MaterialBatchMoveApiResponse,
      PostApiV1MaterialBatchMoveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/batch/move`,
        method: "POST",
        body: queryArg.moveMaterialBatchRequest,
      }),
    }),
    putApiV1MaterialBatchByBatchIdApprove: build.mutation<
      PutApiV1MaterialBatchByBatchIdApproveApiResponse,
      PutApiV1MaterialBatchByBatchIdApproveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/batch/${queryArg.batchId}/approve`,
        method: "PUT",
      }),
    }),
    getApiV1MaterialByMaterialIdStockAndWarehouseId: build.query<
      GetApiV1MaterialByMaterialIdStockAndWarehouseIdApiResponse,
      GetApiV1MaterialByMaterialIdStockAndWarehouseIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/stock/${queryArg.warehouseId}`,
      }),
    }),
    postApiV1MaterialBatchConsume: build.mutation<
      PostApiV1MaterialBatchConsumeApiResponse,
      PostApiV1MaterialBatchConsumeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/batch/consume`,
        method: "POST",
        params: {
          batchId: queryArg.batchId,
          locationId: queryArg.locationId,
          quantity: queryArg.quantity,
        },
      }),
    }),
    getApiV1MaterialByMaterialIdStockAcrossWarehouses: build.query<
      GetApiV1MaterialByMaterialIdStockAcrossWarehousesApiResponse,
      GetApiV1MaterialByMaterialIdStockAcrossWarehousesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/stock/across-warehouses`,
      }),
    }),
    getApiV1MaterialByMaterialIdDepartmentStockAndQuantity: build.query<
      GetApiV1MaterialByMaterialIdDepartmentStockAndQuantityApiResponse,
      GetApiV1MaterialByMaterialIdDepartmentStockAndQuantityApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/department-stock/${queryArg.quantity}`,
      }),
    }),
    postApiV1MaterialUpload: build.mutation<
      PostApiV1MaterialUploadApiResponse,
      PostApiV1MaterialUploadApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/upload`,
        method: "POST",
        body: queryArg.body,
        params: {
          kind: queryArg.kind,
        },
      }),
    }),
    putApiV1MaterialBatchStatus: build.mutation<
      PutApiV1MaterialBatchStatusApiResponse,
      PutApiV1MaterialBatchStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/batch/status`,
        method: "PUT",
        body: queryArg.updateBatchStatusRequest,
      }),
    }),
    postApiV1MaterialBatchSupply: build.mutation<
      PostApiV1MaterialBatchSupplyApiResponse,
      PostApiV1MaterialBatchSupplyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/batch/supply`,
        method: "POST",
        body: queryArg.supplyMaterialBatchRequest,
      }),
    }),
    postApiV1MaterialBatchMoveV2: build.mutation<
      PostApiV1MaterialBatchMoveV2ApiResponse,
      PostApiV1MaterialBatchMoveV2ApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/batch/move/v2`,
        method: "POST",
        body: queryArg.moveShelfMaterialBatchRequest,
      }),
    }),
    getApiV1MaterialApprovedMaterials: build.query<
      GetApiV1MaterialApprovedMaterialsApiResponse,
      GetApiV1MaterialApprovedMaterialsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/approved-materials`,
        params: {
          kind: queryArg.kind,
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1MaterialByMaterialIdBatchesV2: build.query<
      GetApiV1MaterialByMaterialIdBatchesV2ApiResponse,
      GetApiV1MaterialByMaterialIdBatchesV2ApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/batches/v2`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1MaterialByMaterialIdStockWarehouses: build.query<
      GetApiV1MaterialByMaterialIdStockWarehousesApiResponse,
      GetApiV1MaterialByMaterialIdStockWarehousesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/stock/warehouses`,
      }),
    }),
    getApiV1MaterialByMaterialIdStockDepartments: build.query<
      GetApiV1MaterialByMaterialIdStockDepartmentsApiResponse,
      GetApiV1MaterialByMaterialIdStockDepartmentsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/stock/departments`,
      }),
    }),
    postApiV1MaterialDepartment: build.mutation<
      PostApiV1MaterialDepartmentApiResponse,
      PostApiV1MaterialDepartmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/department`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiV1MaterialDepartment: build.query<
      GetApiV1MaterialDepartmentApiResponse,
      GetApiV1MaterialDepartmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/department`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          kind: queryArg.kind,
          departmentId: queryArg.departmentId,
        },
      }),
    }),
    getApiV1MaterialDepartmentNotLinked: build.query<
      GetApiV1MaterialDepartmentNotLinkedApiResponse,
      GetApiV1MaterialDepartmentNotLinkedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/department/not-linked`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          kind: queryArg.kind,
        },
      }),
    }),
    getApiV1MaterialByMaterialIdUom: build.query<
      GetApiV1MaterialByMaterialIdUomApiResponse,
      GetApiV1MaterialByMaterialIdUomApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/uom`,
      }),
    }),
    getApiV1PermissionModules: build.query<
      GetApiV1PermissionModulesApiResponse,
      GetApiV1PermissionModulesApiArg
    >({
      query: () => ({ url: `/api/v1/permission/modules` }),
    }),
    getApiV1Permission: build.query<
      GetApiV1PermissionApiResponse,
      GetApiV1PermissionApiArg
    >({
      query: () => ({ url: `/api/v1/permission` }),
    }),
    getApiV1PermissionUserByUserId: build.query<
      GetApiV1PermissionUserByUserIdApiResponse,
      GetApiV1PermissionUserByUserIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/permission/user/${queryArg.userId}`,
      }),
    }),
    getApiV1PermissionRoleByRoleId: build.query<
      GetApiV1PermissionRoleByRoleIdApiResponse,
      GetApiV1PermissionRoleByRoleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/permission/role/${queryArg.roleId}`,
      }),
    }),
    putApiV1PermissionRoleByRoleId: build.mutation<
      PutApiV1PermissionRoleByRoleIdApiResponse,
      PutApiV1PermissionRoleByRoleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/permission/role/${queryArg.roleId}`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    getApiV1PermissionMenu: build.query<
      GetApiV1PermissionMenuApiResponse,
      GetApiV1PermissionMenuApiArg
    >({
      query: () => ({ url: `/api/v1/permission/menu` }),
    }),
    postApiV1ProcurementManufacturer: build.mutation<
      PostApiV1ProcurementManufacturerApiResponse,
      PostApiV1ProcurementManufacturerApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/manufacturer`,
        method: "POST",
        body: queryArg.createManufacturerRequest,
      }),
    }),
    getApiV1ProcurementManufacturer: build.query<
      GetApiV1ProcurementManufacturerApiResponse,
      GetApiV1ProcurementManufacturerApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/manufacturer`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProcurementManufacturerByManufacturerId: build.query<
      GetApiV1ProcurementManufacturerByManufacturerIdApiResponse,
      GetApiV1ProcurementManufacturerByManufacturerIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/manufacturer/${queryArg.manufacturerId}`,
      }),
    }),
    putApiV1ProcurementManufacturerByManufacturerId: build.mutation<
      PutApiV1ProcurementManufacturerByManufacturerIdApiResponse,
      PutApiV1ProcurementManufacturerByManufacturerIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/manufacturer/${queryArg.manufacturerId}`,
        method: "PUT",
        body: queryArg.createManufacturerRequest,
      }),
    }),
    deleteApiV1ProcurementManufacturerByManufacturerId: build.mutation<
      DeleteApiV1ProcurementManufacturerByManufacturerIdApiResponse,
      DeleteApiV1ProcurementManufacturerByManufacturerIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/manufacturer/${queryArg.manufacturerId}`,
        method: "DELETE",
      }),
    }),
    getApiV1ProcurementManufacturerMaterialByMaterialId: build.query<
      GetApiV1ProcurementManufacturerMaterialByMaterialIdApiResponse,
      GetApiV1ProcurementManufacturerMaterialByMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/manufacturer/material/${queryArg.materialId}`,
      }),
    }),
    postApiV1ProcurementSupplier: build.mutation<
      PostApiV1ProcurementSupplierApiResponse,
      PostApiV1ProcurementSupplierApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/supplier`,
        method: "POST",
        body: queryArg.createSupplierRequest,
      }),
    }),
    getApiV1ProcurementSupplier: build.query<
      GetApiV1ProcurementSupplierApiResponse,
      GetApiV1ProcurementSupplierApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/supplier`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProcurementSupplierBySupplierId: build.query<
      GetApiV1ProcurementSupplierBySupplierIdApiResponse,
      GetApiV1ProcurementSupplierBySupplierIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/supplier/${queryArg.supplierId}`,
      }),
    }),
    putApiV1ProcurementSupplierBySupplierId: build.mutation<
      PutApiV1ProcurementSupplierBySupplierIdApiResponse,
      PutApiV1ProcurementSupplierBySupplierIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/supplier/${queryArg.supplierId}`,
        method: "PUT",
        body: queryArg.createSupplierRequest,
      }),
    }),
    deleteApiV1ProcurementSupplierBySupplierId: build.mutation<
      DeleteApiV1ProcurementSupplierBySupplierIdApiResponse,
      DeleteApiV1ProcurementSupplierBySupplierIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/supplier/${queryArg.supplierId}`,
        method: "DELETE",
      }),
    }),
    putApiV1ProcurementSupplierBySupplierIdStatus: build.mutation<
      PutApiV1ProcurementSupplierBySupplierIdStatusApiResponse,
      PutApiV1ProcurementSupplierBySupplierIdStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/supplier/${queryArg.supplierId}/status`,
        method: "PUT",
        body: queryArg.updateSupplierStatusRequest,
      }),
    }),
    getApiV1ProcurementSupplierMaterialByMaterialId: build.query<
      GetApiV1ProcurementSupplierMaterialByMaterialIdApiResponse,
      GetApiV1ProcurementSupplierMaterialByMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/supplier/material/${queryArg.materialId}`,
      }),
    }),
    getApiV1ProcurementSupplierByMaterialIdAndType: build.query<
      GetApiV1ProcurementSupplierByMaterialIdAndTypeApiResponse,
      GetApiV1ProcurementSupplierByMaterialIdAndTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/supplier/${queryArg.materialId}/${queryArg["type"]}`,
      }),
    }),
    postApiV1ProcurementPurchaseOrder: build.mutation<
      PostApiV1ProcurementPurchaseOrderApiResponse,
      PostApiV1ProcurementPurchaseOrderApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order`,
        method: "POST",
        body: queryArg.createPurchaseOrderRequest,
      }),
    }),
    getApiV1ProcurementPurchaseOrder: build.query<
      GetApiV1ProcurementPurchaseOrderApiResponse,
      GetApiV1ProcurementPurchaseOrderApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          status: queryArg.status,
          type: queryArg["type"],
        },
      }),
    }),
    getApiV1ProcurementPurchaseOrderByPurchaseOrderId: build.query<
      GetApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiResponse,
      GetApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order/${queryArg.purchaseOrderId}`,
      }),
    }),
    postApiV1ProcurementPurchaseOrderByPurchaseOrderId: build.mutation<
      PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiResponse,
      PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order/${queryArg.purchaseOrderId}`,
        method: "POST",
        body: queryArg.sendPurchaseOrderRequest,
      }),
    }),
    putApiV1ProcurementPurchaseOrderByPurchaseOrderId: build.mutation<
      PutApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiResponse,
      PutApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order/${queryArg.purchaseOrderId}`,
        method: "PUT",
        body: queryArg.updatePurchaseOrderRequest,
      }),
    }),
    deleteApiV1ProcurementPurchaseOrderByPurchaseOrderId: build.mutation<
      DeleteApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiResponse,
      DeleteApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order/${queryArg.purchaseOrderId}`,
        method: "DELETE",
      }),
    }),
    getApiV1ProcurementPurchaseOrderRequisitionByPurchaseOrderIdAndMaterialId:
      build.query<
        GetApiV1ProcurementPurchaseOrderRequisitionByPurchaseOrderIdAndMaterialIdApiResponse,
        GetApiV1ProcurementPurchaseOrderRequisitionByPurchaseOrderIdAndMaterialIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/procurement/purchase-order/requisition/${queryArg.purchaseOrderId}/${queryArg.materialId}`,
        }),
      }),
    postApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderId:
      build.mutation<
        PostApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderIdApiResponse,
        PostApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/procurement/purchase-order/proforma-invoice/${queryArg.purchaseOrderId}`,
          method: "POST",
        }),
      }),
    putApiV1ProcurementPurchaseOrderByPurchaseOrderIdRevise: build.mutation<
      PutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseApiResponse,
      PutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order/${queryArg.purchaseOrderId}/revise`,
        method: "PUT",
        body: queryArg.body,
      }),
    }),
    postApiV1ProcurementPurchaseOrderInvoice: build.mutation<
      PostApiV1ProcurementPurchaseOrderInvoiceApiResponse,
      PostApiV1ProcurementPurchaseOrderInvoiceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order-invoice`,
        method: "POST",
        body: queryArg.createPurchaseOrderInvoiceRequest,
      }),
    }),
    getApiV1ProcurementPurchaseOrderInvoice: build.query<
      GetApiV1ProcurementPurchaseOrderInvoiceApiResponse,
      GetApiV1ProcurementPurchaseOrderInvoiceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order-invoice`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          type: queryArg["type"],
        },
      }),
    }),
    getApiV1ProcurementPurchaseOrderInvoiceByInvoiceId: build.query<
      GetApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiResponse,
      GetApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order-invoice/${queryArg.invoiceId}`,
      }),
    }),
    putApiV1ProcurementPurchaseOrderInvoiceByInvoiceId: build.mutation<
      PutApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiResponse,
      PutApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order-invoice/${queryArg.invoiceId}`,
        method: "PUT",
        body: queryArg.createPurchaseOrderInvoiceRequest,
      }),
    }),
    deleteApiV1ProcurementPurchaseOrderInvoiceByInvoiceId: build.mutation<
      DeleteApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiResponse,
      DeleteApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order-invoice/${queryArg.invoiceId}`,
        method: "DELETE",
      }),
    }),
    postApiV1ProcurementBillingSheet: build.mutation<
      PostApiV1ProcurementBillingSheetApiResponse,
      PostApiV1ProcurementBillingSheetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/billing-sheet`,
        method: "POST",
        body: queryArg.createBillingSheetRequest,
      }),
    }),
    getApiV1ProcurementBillingSheet: build.query<
      GetApiV1ProcurementBillingSheetApiResponse,
      GetApiV1ProcurementBillingSheetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/billing-sheet`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          status: queryArg.status,
        },
      }),
    }),
    getApiV1ProcurementBillingSheetByBillingSheetId: build.query<
      GetApiV1ProcurementBillingSheetByBillingSheetIdApiResponse,
      GetApiV1ProcurementBillingSheetByBillingSheetIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/billing-sheet/${queryArg.billingSheetId}`,
      }),
    }),
    putApiV1ProcurementBillingSheetByBillingSheetId: build.mutation<
      PutApiV1ProcurementBillingSheetByBillingSheetIdApiResponse,
      PutApiV1ProcurementBillingSheetByBillingSheetIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/billing-sheet/${queryArg.billingSheetId}`,
        method: "PUT",
        body: queryArg.createBillingSheetRequest,
      }),
    }),
    deleteApiV1ProcurementBillingSheetByBillingSheetId: build.mutation<
      DeleteApiV1ProcurementBillingSheetByBillingSheetIdApiResponse,
      DeleteApiV1ProcurementBillingSheetByBillingSheetIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/billing-sheet/${queryArg.billingSheetId}`,
        method: "DELETE",
      }),
    }),
    postApiV1ProcurementShipmentDocument: build.mutation<
      PostApiV1ProcurementShipmentDocumentApiResponse,
      PostApiV1ProcurementShipmentDocumentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-document`,
        method: "POST",
        body: queryArg.createShipmentDocumentRequest,
      }),
    }),
    getApiV1ProcurementShipmentDocument: build.query<
      GetApiV1ProcurementShipmentDocumentApiResponse,
      GetApiV1ProcurementShipmentDocumentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-document`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProcurementShipmentDocumentByShipmentDocumentId: build.query<
      GetApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiResponse,
      GetApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-document/${queryArg.shipmentDocumentId}`,
      }),
    }),
    putApiV1ProcurementShipmentDocumentByShipmentDocumentId: build.mutation<
      PutApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiResponse,
      PutApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-document/${queryArg.shipmentDocumentId}`,
        method: "PUT",
        body: queryArg.createShipmentDocumentRequest,
      }),
    }),
    deleteApiV1ProcurementShipmentDocumentByShipmentDocumentId: build.mutation<
      DeleteApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiResponse,
      DeleteApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-document/${queryArg.shipmentDocumentId}`,
        method: "DELETE",
      }),
    }),
    postApiV1ProcurementWaybill: build.mutation<
      PostApiV1ProcurementWaybillApiResponse,
      PostApiV1ProcurementWaybillApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/waybill`,
        method: "POST",
        body: queryArg.createShipmentDocumentRequest,
      }),
    }),
    getApiV1ProcurementWaybill: build.query<
      GetApiV1ProcurementWaybillApiResponse,
      GetApiV1ProcurementWaybillApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/waybill`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          status: queryArg.status,
        },
      }),
    }),
    getApiV1ProcurementWaybillByWaybillId: build.query<
      GetApiV1ProcurementWaybillByWaybillIdApiResponse,
      GetApiV1ProcurementWaybillByWaybillIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/waybill/${queryArg.waybillId}`,
      }),
    }),
    putApiV1ProcurementWaybillByWaybillId: build.mutation<
      PutApiV1ProcurementWaybillByWaybillIdApiResponse,
      PutApiV1ProcurementWaybillByWaybillIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/waybill/${queryArg.waybillId}`,
        method: "PUT",
        body: queryArg.createShipmentDocumentRequest,
      }),
    }),
    deleteApiV1ProcurementWaybillByWaybillId: build.mutation<
      DeleteApiV1ProcurementWaybillByWaybillIdApiResponse,
      DeleteApiV1ProcurementWaybillByWaybillIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/waybill/${queryArg.waybillId}`,
        method: "DELETE",
      }),
    }),
    putApiV1ProcurementShipmentDocumentByShipmentDocumentIdArrived:
      build.mutation<
        PutApiV1ProcurementShipmentDocumentByShipmentDocumentIdArrivedApiResponse,
        PutApiV1ProcurementShipmentDocumentByShipmentDocumentIdArrivedApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/procurement/shipment-document/${queryArg.shipmentDocumentId}/arrived`,
          method: "PUT",
        }),
      }),
    putApiV1ProcurementShipmentsByShipmentIdStatus: build.mutation<
      PutApiV1ProcurementShipmentsByShipmentIdStatusApiResponse,
      PutApiV1ProcurementShipmentsByShipmentIdStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipments/${queryArg.shipmentId}/status`,
        method: "PUT",
        body: queryArg.updateShipmentStatusRequest,
      }),
    }),
    getApiV1ProcurementShipmentDocumentArrived: build.query<
      GetApiV1ProcurementShipmentDocumentArrivedApiResponse,
      GetApiV1ProcurementShipmentDocumentArrivedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-document/arrived`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    postApiV1ProcurementShipmentInvoice: build.mutation<
      PostApiV1ProcurementShipmentInvoiceApiResponse,
      PostApiV1ProcurementShipmentInvoiceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-invoice`,
        method: "POST",
        body: queryArg.createShipmentInvoice,
      }),
    }),
    getApiV1ProcurementShipmentInvoice: build.query<
      GetApiV1ProcurementShipmentInvoiceApiResponse,
      GetApiV1ProcurementShipmentInvoiceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-invoice`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProcurementShipmentInvoiceById: build.query<
      GetApiV1ProcurementShipmentInvoiceByIdApiResponse,
      GetApiV1ProcurementShipmentInvoiceByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-invoice/${queryArg.id}`,
      }),
    }),
    getApiV1ProcurementShipmentInvoiceUnattached: build.query<
      GetApiV1ProcurementShipmentInvoiceUnattachedApiResponse,
      GetApiV1ProcurementShipmentInvoiceUnattachedApiArg
    >({
      query: () => ({ url: `/api/v1/procurement/shipment-invoice/unattached` }),
    }),
    getApiV1ProcurementShipmentInvoiceShipmentDocumentByShipmentDocumentId:
      build.query<
        GetApiV1ProcurementShipmentInvoiceShipmentDocumentByShipmentDocumentIdApiResponse,
        GetApiV1ProcurementShipmentInvoiceShipmentDocumentByShipmentDocumentIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/procurement/shipment-invoice/shipment-document/${queryArg.shipmentDocumentId}`,
        }),
      }),
    putApiV1ProcurementShipmentInvoiceByShipmentInvoiceId: build.mutation<
      PutApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdApiResponse,
      PutApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-invoice/${queryArg.shipmentInvoiceId}`,
        method: "PUT",
        body: queryArg.createShipmentInvoice,
      }),
    }),
    deleteApiV1ProcurementShipmentInvoiceByShipmentInvoiceId: build.mutation<
      DeleteApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdApiResponse,
      DeleteApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-invoice/${queryArg.shipmentInvoiceId}`,
        method: "DELETE",
      }),
    }),
    postApiV1ProcurementShipmentDiscrepancy: build.mutation<
      PostApiV1ProcurementShipmentDiscrepancyApiResponse,
      PostApiV1ProcurementShipmentDiscrepancyApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-discrepancy`,
        method: "POST",
        body: queryArg.createShipmentDiscrepancy,
      }),
    }),
    getApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyId: build.query<
      GetApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiResponse,
      GetApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-discrepancy/${queryArg.shipmentDiscrepancyId}`,
      }),
    }),
    putApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyId:
      build.mutation<
        PutApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiResponse,
        PutApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/procurement/shipment-discrepancy/${queryArg.shipmentDiscrepancyId}`,
          method: "PUT",
          body: queryArg.createShipmentDiscrepancy,
        }),
      }),
    deleteApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyId:
      build.mutation<
        DeleteApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiResponse,
        DeleteApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/procurement/shipment-discrepancy/${queryArg.shipmentDiscrepancyId}`,
          method: "DELETE",
        }),
      }),
    getApiV1ProcurementPurchaseOrderNotLinked: build.query<
      GetApiV1ProcurementPurchaseOrderNotLinkedApiResponse,
      GetApiV1ProcurementPurchaseOrderNotLinkedApiArg
    >({
      query: () => ({ url: `/api/v1/procurement/purchase-order/not-linked` }),
    }),
    getApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinked: build.query<
      GetApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinkedApiResponse,
      GetApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinkedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order/supplier/${queryArg.supplierId}/not-linked`,
      }),
    }),
    postApiV1ProcurementMaterialsByPurchaseOrders: build.mutation<
      PostApiV1ProcurementMaterialsByPurchaseOrdersApiResponse,
      PostApiV1ProcurementMaterialsByPurchaseOrdersApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/materials/by-purchase-orders`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistribution:
      build.query<
        GetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionApiResponse,
        GetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/procurement/shipment-document/${queryArg.shipmentDocumentId}/material-distribution`,
        }),
      }),
    postApiV1ProcurementByShipmentDocumentIdConfirmDistributionAndMaterialId:
      build.mutation<
        PostApiV1ProcurementByShipmentDocumentIdConfirmDistributionAndMaterialIdApiResponse,
        PostApiV1ProcurementByShipmentDocumentIdConfirmDistributionAndMaterialIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/procurement/${queryArg.shipmentDocumentId}/confirm-distribution/${queryArg.materialId}`,
          method: "POST",
        }),
      }),
    postApiV1ProcurementByShipmentDocumentIdConfirmDistribution: build.mutation<
      PostApiV1ProcurementByShipmentDocumentIdConfirmDistributionApiResponse,
      PostApiV1ProcurementByShipmentDocumentIdConfirmDistributionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/${queryArg.shipmentDocumentId}/confirm-distribution`,
        method: "POST",
      }),
    }),
    postApiV1Product: build.mutation<
      PostApiV1ProductApiResponse,
      PostApiV1ProductApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product`,
        method: "POST",
        body: queryArg.createProductRequest,
      }),
    }),
    getApiV1Product: build.query<
      GetApiV1ProductApiResponse,
      GetApiV1ProductApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProductByProductId: build.query<
      GetApiV1ProductByProductIdApiResponse,
      GetApiV1ProductByProductIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/product/${queryArg.productId}` }),
    }),
    putApiV1ProductByProductId: build.mutation<
      PutApiV1ProductByProductIdApiResponse,
      PutApiV1ProductByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}`,
        method: "PUT",
        body: queryArg.updateProductRequest,
      }),
    }),
    deleteApiV1ProductByProductId: build.mutation<
      DeleteApiV1ProductByProductIdApiResponse,
      DeleteApiV1ProductByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}`,
        method: "DELETE",
      }),
    }),
    putApiV1ProductPackageDescriptionByProductId: build.mutation<
      PutApiV1ProductPackageDescriptionByProductIdApiResponse,
      PutApiV1ProductPackageDescriptionByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/package-description/${queryArg.productId}`,
        method: "PUT",
        body: queryArg.updateProductPackageDescriptionRequest,
      }),
    }),
    getApiV1ProductByProductIdBom: build.query<
      GetApiV1ProductByProductIdBomApiResponse,
      GetApiV1ProductByProductIdBomApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}/bom`,
      }),
    }),
    postApiV1ProductByProductIdRoutes: build.mutation<
      PostApiV1ProductByProductIdRoutesApiResponse,
      PostApiV1ProductByProductIdRoutesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}/routes`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiV1ProductByProductIdRoutes: build.query<
      GetApiV1ProductByProductIdRoutesApiResponse,
      GetApiV1ProductByProductIdRoutesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}/routes`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProductRoutesByRouteId: build.query<
      GetApiV1ProductRoutesByRouteIdApiResponse,
      GetApiV1ProductRoutesByRouteIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/routes/${queryArg.routeId}`,
      }),
    }),
    deleteApiV1ProductRoutesByRouteId: build.mutation<
      DeleteApiV1ProductRoutesByRouteIdApiResponse,
      DeleteApiV1ProductRoutesByRouteIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/routes/${queryArg.routeId}`,
        method: "DELETE",
      }),
    }),
    postApiV1ProductByProductIdPackages: build.mutation<
      PostApiV1ProductByProductIdPackagesApiResponse,
      PostApiV1ProductByProductIdPackagesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}/packages`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiV1ProductByProductIdPackages: build.query<
      GetApiV1ProductByProductIdPackagesApiResponse,
      GetApiV1ProductByProductIdPackagesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}/packages`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProductPackagesByProductPackageId: build.query<
      GetApiV1ProductPackagesByProductPackageIdApiResponse,
      GetApiV1ProductPackagesByProductPackageIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/packages/${queryArg.productPackageId}`,
      }),
    }),
    putApiV1ProductPackagesByProductPackageId: build.mutation<
      PutApiV1ProductPackagesByProductPackageIdApiResponse,
      PutApiV1ProductPackagesByProductPackageIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/packages/${queryArg.productPackageId}`,
        method: "PUT",
        body: queryArg.createProductPackageRequest,
      }),
    }),
    deleteApiV1ProductPackagesByProductPackageId: build.mutation<
      DeleteApiV1ProductPackagesByProductPackageIdApiResponse,
      DeleteApiV1ProductPackagesByProductPackageIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/packages/${queryArg.productPackageId}`,
        method: "DELETE",
      }),
    }),
    postApiV1ProductByProductIdFinished: build.mutation<
      PostApiV1ProductByProductIdFinishedApiResponse,
      PostApiV1ProductByProductIdFinishedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}/finished`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    putApiV1ProductByProductIdBomArchive: build.mutation<
      PutApiV1ProductByProductIdBomArchiveApiResponse,
      PutApiV1ProductByProductIdBomArchiveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}/bom/archive`,
        method: "PUT",
      }),
    }),
    postApiV1ProductEquipment: build.mutation<
      PostApiV1ProductEquipmentApiResponse,
      PostApiV1ProductEquipmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/equipment`,
        method: "POST",
        body: queryArg.createEquipmentRequest,
      }),
    }),
    getApiV1ProductEquipment: build.query<
      GetApiV1ProductEquipmentApiResponse,
      GetApiV1ProductEquipmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/equipment`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProductEquipmentByEquipmentId: build.query<
      GetApiV1ProductEquipmentByEquipmentIdApiResponse,
      GetApiV1ProductEquipmentByEquipmentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/equipment/${queryArg.equipmentId}`,
      }),
    }),
    putApiV1ProductEquipmentByEquipmentId: build.mutation<
      PutApiV1ProductEquipmentByEquipmentIdApiResponse,
      PutApiV1ProductEquipmentByEquipmentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/equipment/${queryArg.equipmentId}`,
        method: "PUT",
        body: queryArg.createEquipmentRequest,
      }),
    }),
    deleteApiV1ProductEquipmentByEquipmentId: build.mutation<
      DeleteApiV1ProductEquipmentByEquipmentIdApiResponse,
      DeleteApiV1ProductEquipmentByEquipmentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/equipment/${queryArg.equipmentId}`,
        method: "DELETE",
      }),
    }),
    getApiV1ProductEquipmentAll: build.query<
      GetApiV1ProductEquipmentAllApiResponse,
      GetApiV1ProductEquipmentAllApiArg
    >({
      query: () => ({ url: `/api/v1/product/equipment/all` }),
    }),
    postApiV1ProductionSchedule: build.mutation<
      PostApiV1ProductionScheduleApiResponse,
      PostApiV1ProductionScheduleApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule`,
        method: "POST",
        body: queryArg.createProductionScheduleRequest,
      }),
    }),
    getApiV1ProductionSchedule: build.query<
      GetApiV1ProductionScheduleApiResponse,
      GetApiV1ProductionScheduleApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProductionScheduleByScheduleId: build.query<
      GetApiV1ProductionScheduleByScheduleIdApiResponse,
      GetApiV1ProductionScheduleByScheduleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/${queryArg.scheduleId}`,
      }),
    }),
    putApiV1ProductionScheduleByScheduleId: build.mutation<
      PutApiV1ProductionScheduleByScheduleIdApiResponse,
      PutApiV1ProductionScheduleByScheduleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/${queryArg.scheduleId}`,
        method: "PUT",
        body: queryArg.updateProductionScheduleRequest,
      }),
    }),
    deleteApiV1ProductionScheduleByScheduleId: build.mutation<
      DeleteApiV1ProductionScheduleByScheduleIdApiResponse,
      DeleteApiV1ProductionScheduleByScheduleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/${queryArg.scheduleId}`,
        method: "DELETE",
      }),
    }),
    getApiV1ProductionScheduleByProductionScheduleIdProductAndProductId:
      build.query<
        GetApiV1ProductionScheduleByProductionScheduleIdProductAndProductIdApiResponse,
        GetApiV1ProductionScheduleByProductionScheduleIdProductAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/${queryArg.productionScheduleId}/product/${queryArg.productId}`,
        }),
      }),
    getApiV1ProductionScheduleProductionStatus: build.query<
      GetApiV1ProductionScheduleProductionStatusApiResponse,
      GetApiV1ProductionScheduleProductionStatusApiArg
    >({
      query: () => ({ url: `/api/v1/production-schedule/production-status` }),
    }),
    getApiV1ProductionScheduleByScheduleIdDetails: build.query<
      GetApiV1ProductionScheduleByScheduleIdDetailsApiResponse,
      GetApiV1ProductionScheduleByScheduleIdDetailsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/${queryArg.scheduleId}/details`,
      }),
    }),
    getApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductId:
      build.query<
        GetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdApiResponse,
        GetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/material-stock/${queryArg.productionScheduleId}/${queryArg.productId}`,
          params: {
            status: queryArg.status,
          },
        }),
      }),
    getApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductId:
      build.query<
        GetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdApiResponse,
        GetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/package-material-stock/${queryArg.productionScheduleId}/${queryArg.productId}`,
          params: {
            status: queryArg.status,
          },
        }),
      }),
    getApiV1ProductionScheduleByProductionScheduleIdMaterialsWithInsufficientStockAndProductId:
      build.query<
        GetApiV1ProductionScheduleByProductionScheduleIdMaterialsWithInsufficientStockAndProductIdApiResponse,
        GetApiV1ProductionScheduleByProductionScheduleIdMaterialsWithInsufficientStockAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/${queryArg.productionScheduleId}/materials-with-insufficient-stock/${queryArg.productId}`,
        }),
      }),
    getApiV1ProductionScheduleByProductionScheduleIdPackageMaterialsWithInsufficientStockAndProductId:
      build.query<
        GetApiV1ProductionScheduleByProductionScheduleIdPackageMaterialsWithInsufficientStockAndProductIdApiResponse,
        GetApiV1ProductionScheduleByProductionScheduleIdPackageMaterialsWithInsufficientStockAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/${queryArg.productionScheduleId}/package-materials-with-insufficient-stock/${queryArg.productId}`,
        }),
      }),
    postApiV1ProductionScheduleActivityStartByProductionScheduleIdAndProductId:
      build.mutation<
        PostApiV1ProductionScheduleActivityStartByProductionScheduleIdAndProductIdApiResponse,
        PostApiV1ProductionScheduleActivityStartByProductionScheduleIdAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/activity/start/${queryArg.productionScheduleId}/${queryArg.productId}`,
          method: "POST",
        }),
      }),
    getApiV1ProductionScheduleActivity: build.query<
      GetApiV1ProductionScheduleActivityApiResponse,
      GetApiV1ProductionScheduleActivityApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/activity`,
        params: {
          userIds: queryArg.userIds,
          status: queryArg.status,
          pageSize: queryArg.pageSize,
          page: queryArg.page,
          sortLabel: queryArg.sortLabel,
          sortDirection: queryArg.sortDirection,
        },
      }),
    }),
    getApiV1ProductionScheduleActivityByProductionActivityId: build.query<
      GetApiV1ProductionScheduleActivityByProductionActivityIdApiResponse,
      GetApiV1ProductionScheduleActivityByProductionActivityIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/activity/${queryArg.productionActivityId}`,
      }),
    }),
    getApiV1ProductionScheduleActivityByProductionScheduleIdAndProductId:
      build.query<
        GetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdApiResponse,
        GetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/activity/${queryArg.productionScheduleId}/${queryArg.productId}`,
        }),
      }),
    getApiV1ProductionScheduleActivityStatusGrouped: build.query<
      GetApiV1ProductionScheduleActivityStatusGroupedApiResponse,
      GetApiV1ProductionScheduleActivityStatusGroupedApiArg
    >({
      query: () => ({
        url: `/api/v1/production-schedule/activity/status-grouped`,
      }),
    }),
    getApiV1ProductionScheduleActivityOperationGrouped: build.query<
      GetApiV1ProductionScheduleActivityOperationGroupedApiResponse,
      GetApiV1ProductionScheduleActivityOperationGroupedApiArg
    >({
      query: () => ({
        url: `/api/v1/production-schedule/activity/operation-grouped`,
      }),
    }),
    putApiV1ProductionScheduleActivityStepByProductionStepIdStatus:
      build.mutation<
        PutApiV1ProductionScheduleActivityStepByProductionStepIdStatusApiResponse,
        PutApiV1ProductionScheduleActivityStepByProductionStepIdStatusApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/activity-step/${queryArg.productionStepId}/status`,
          method: "PUT",
          params: {
            status: queryArg.status,
          },
        }),
      }),
    getApiV1ProductionScheduleActivityStep: build.query<
      GetApiV1ProductionScheduleActivityStepApiResponse,
      GetApiV1ProductionScheduleActivityStepApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/activity-step`,
        params: {
          userIds: queryArg.userIds,
          status: queryArg.status,
          pageSize: queryArg.pageSize,
          page: queryArg.page,
          sortLabel: queryArg.sortLabel,
          sortDirection: queryArg.sortDirection,
        },
      }),
    }),
    getApiV1ProductionScheduleActivityStepByProductionActivityStepId:
      build.query<
        GetApiV1ProductionScheduleActivityStepByProductionActivityStepIdApiResponse,
        GetApiV1ProductionScheduleActivityStepByProductionActivityStepIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/activity-step/${queryArg.productionActivityStepId}`,
        }),
      }),
    getApiV1ProductionScheduleActivityStepStatusGrouped: build.query<
      GetApiV1ProductionScheduleActivityStepStatusGroupedApiResponse,
      GetApiV1ProductionScheduleActivityStepStatusGroupedApiArg
    >({
      query: () => ({
        url: `/api/v1/production-schedule/activity-step/status-grouped`,
      }),
    }),
    getApiV1ProductionScheduleActivityStepOperationGrouped: build.query<
      GetApiV1ProductionScheduleActivityStepOperationGroupedApiResponse,
      GetApiV1ProductionScheduleActivityStepOperationGroupedApiArg
    >({
      query: () => ({
        url: `/api/v1/production-schedule/activity-step/operation-grouped`,
      }),
    }),
    postApiV1ProductionScheduleManufacturing: build.mutation<
      PostApiV1ProductionScheduleManufacturingApiResponse,
      PostApiV1ProductionScheduleManufacturingApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/manufacturing`,
        method: "POST",
        body: queryArg.createBatchManufacturingRecord,
      }),
    }),
    getApiV1ProductionScheduleManufacturing: build.query<
      GetApiV1ProductionScheduleManufacturingApiResponse,
      GetApiV1ProductionScheduleManufacturingApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/manufacturing`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleId:
      build.query<
        GetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdApiResponse,
        GetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/manufacturing/${queryArg.productionId}/${queryArg.productionScheduleId}`,
        }),
      }),
    postApiV1ProductionScheduleFinishedGoodsTransferNote: build.mutation<
      PostApiV1ProductionScheduleFinishedGoodsTransferNoteApiResponse,
      PostApiV1ProductionScheduleFinishedGoodsTransferNoteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/finished-goods-transfer-note`,
        method: "POST",
        body: queryArg.createFinishedGoodsTransferNoteRequest,
      }),
    }),
    getApiV1ProductionScheduleManufacturingById: build.query<
      GetApiV1ProductionScheduleManufacturingByIdApiResponse,
      GetApiV1ProductionScheduleManufacturingByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/manufacturing/${queryArg.id}`,
      }),
    }),
    putApiV1ProductionScheduleManufacturingById: build.mutation<
      PutApiV1ProductionScheduleManufacturingByIdApiResponse,
      PutApiV1ProductionScheduleManufacturingByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/manufacturing/${queryArg.id}`,
        method: "PUT",
        body: queryArg.updateBatchManufacturingRecord,
      }),
    }),
    putApiV1ProductionScheduleManufacturingIssueById: build.mutation<
      PutApiV1ProductionScheduleManufacturingIssueByIdApiResponse,
      PutApiV1ProductionScheduleManufacturingIssueByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/manufacturing/issue/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    postApiV1ProductionSchedulePackaging: build.mutation<
      PostApiV1ProductionSchedulePackagingApiResponse,
      PostApiV1ProductionSchedulePackagingApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/packaging`,
        method: "POST",
        body: queryArg.createBatchPackagingRecord,
      }),
    }),
    getApiV1ProductionSchedulePackaging: build.query<
      GetApiV1ProductionSchedulePackagingApiResponse,
      GetApiV1ProductionSchedulePackagingApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/packaging`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProductionSchedulePackagingById: build.query<
      GetApiV1ProductionSchedulePackagingByIdApiResponse,
      GetApiV1ProductionSchedulePackagingByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/packaging/${queryArg.id}`,
      }),
    }),
    putApiV1ProductionSchedulePackagingById: build.mutation<
      PutApiV1ProductionSchedulePackagingByIdApiResponse,
      PutApiV1ProductionSchedulePackagingByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/packaging/${queryArg.id}`,
        method: "PUT",
        body: queryArg.updateBatchPackagingRecord,
      }),
    }),
    putApiV1ProductionSchedulePackagingIssueById: build.mutation<
      PutApiV1ProductionSchedulePackagingIssueByIdApiResponse,
      PutApiV1ProductionSchedulePackagingIssueByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/packaging/issue/${queryArg.id}`,
        method: "PUT",
      }),
    }),
    postApiV1ProductionScheduleStockTransfer: build.mutation<
      PostApiV1ProductionScheduleStockTransferApiResponse,
      PostApiV1ProductionScheduleStockTransferApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/stock-transfer`,
        method: "POST",
        body: queryArg.createStockTransferRequest,
      }),
    }),
    getApiV1ProductionScheduleStockTransfer: build.query<
      GetApiV1ProductionScheduleStockTransferApiResponse,
      GetApiV1ProductionScheduleStockTransferApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/stock-transfer`,
        params: {
          fromDepartmentId: queryArg.fromDepartmentId,
          toDepartmentId: queryArg.toDepartmentId,
          materialId: queryArg.materialId,
        },
      }),
    }),
    getApiV1ProductionScheduleStockTransferInBound: build.query<
      GetApiV1ProductionScheduleStockTransferInBoundApiResponse,
      GetApiV1ProductionScheduleStockTransferInBoundApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/stock-transfer/in-bound`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          status: queryArg.status,
          toDepartmentId: queryArg.toDepartmentId,
        },
      }),
    }),
    getApiV1ProductionScheduleStockTransferOutBound: build.query<
      GetApiV1ProductionScheduleStockTransferOutBoundApiResponse,
      GetApiV1ProductionScheduleStockTransferOutBoundApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/stock-transfer/out-bound`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          status: queryArg.status,
          fromDepartmentId: queryArg.fromDepartmentId,
        },
      }),
    }),
    getApiV1ProductionScheduleStockTransferByStockTransferId: build.query<
      GetApiV1ProductionScheduleStockTransferByStockTransferIdApiResponse,
      GetApiV1ProductionScheduleStockTransferByStockTransferIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/stock-transfer/${queryArg.stockTransferId}`,
      }),
    }),
    putApiV1ProductionScheduleStockTransferApproveByStockTransferId:
      build.mutation<
        PutApiV1ProductionScheduleStockTransferApproveByStockTransferIdApiResponse,
        PutApiV1ProductionScheduleStockTransferApproveByStockTransferIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/stock-transfer/approve/${queryArg.stockTransferId}`,
          method: "PUT",
        }),
      }),
    putApiV1ProductionScheduleStockTransferRejectByStockTransferId:
      build.mutation<
        PutApiV1ProductionScheduleStockTransferRejectByStockTransferIdApiResponse,
        PutApiV1ProductionScheduleStockTransferRejectByStockTransferIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/stock-transfer/reject/${queryArg.stockTransferId}`,
          method: "PUT",
        }),
      }),
    getApiV1ProductionScheduleStockTransferBatchByStockTransferId: build.query<
      GetApiV1ProductionScheduleStockTransferBatchByStockTransferIdApiResponse,
      GetApiV1ProductionScheduleStockTransferBatchByStockTransferIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/stock-transfer/batch/${queryArg.stockTransferId}`,
      }),
    }),
    putApiV1ProductionScheduleStockTransferIssueByStockTransferId:
      build.mutation<
        PutApiV1ProductionScheduleStockTransferIssueByStockTransferIdApiResponse,
        PutApiV1ProductionScheduleStockTransferIssueByStockTransferIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/stock-transfer/issue/${queryArg.stockTransferId}`,
          method: "PUT",
          body: queryArg.body,
        }),
      }),
    postApiV1ProductionScheduleFinalPacking: build.mutation<
      PostApiV1ProductionScheduleFinalPackingApiResponse,
      PostApiV1ProductionScheduleFinalPackingApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/final-packing`,
        method: "POST",
        body: queryArg.createFinalPacking,
      }),
    }),
    getApiV1ProductionScheduleFinalPacking: build.query<
      GetApiV1ProductionScheduleFinalPackingApiResponse,
      GetApiV1ProductionScheduleFinalPackingApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/final-packing`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProductionScheduleFinalPackingByFinalPackingId: build.query<
      GetApiV1ProductionScheduleFinalPackingByFinalPackingIdApiResponse,
      GetApiV1ProductionScheduleFinalPackingByFinalPackingIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/final-packing/${queryArg.finalPackingId}`,
      }),
    }),
    putApiV1ProductionScheduleFinalPackingByFinalPackingId: build.mutation<
      PutApiV1ProductionScheduleFinalPackingByFinalPackingIdApiResponse,
      PutApiV1ProductionScheduleFinalPackingByFinalPackingIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/final-packing/${queryArg.finalPackingId}`,
        method: "PUT",
        body: queryArg.createFinalPacking,
      }),
    }),
    deleteApiV1ProductionScheduleFinalPackingByFinalPackingId: build.mutation<
      DeleteApiV1ProductionScheduleFinalPackingByFinalPackingIdApiResponse,
      DeleteApiV1ProductionScheduleFinalPackingByFinalPackingIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/final-packing/${queryArg.finalPackingId}`,
        method: "DELETE",
      }),
    }),
    getApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductId:
      build.query<
        GetApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductIdApiResponse,
        GetApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/final-packing/${queryArg.productionScheduleId}/${queryArg.productId}`,
        }),
      }),
    getApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductId:
      build.query<
        GetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdApiResponse,
        GetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/stock-requisition/package/${queryArg.productionScheduleId}/${queryArg.productId}`,
        }),
      }),
    postApiV1ProductionScheduleReturnBeforeProduction: build.mutation<
      PostApiV1ProductionScheduleReturnBeforeProductionApiResponse,
      PostApiV1ProductionScheduleReturnBeforeProductionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/return-before-production`,
        method: "POST",
        params: {
          productionScheduleId: queryArg.productionScheduleId,
          productId: queryArg.productId,
        },
      }),
    }),
    postApiV1ProductionScheduleReturnAfterProduction: build.mutation<
      PostApiV1ProductionScheduleReturnAfterProductionApiResponse,
      PostApiV1ProductionScheduleReturnAfterProductionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/return-after-production`,
        method: "POST",
        body: queryArg.body,
        params: {
          productionScheduleId: queryArg.productionScheduleId,
          productId: queryArg.productId,
        },
      }),
    }),
    getApiV1ProductionScheduleMaterialReturnNote: build.query<
      GetApiV1ProductionScheduleMaterialReturnNoteApiResponse,
      GetApiV1ProductionScheduleMaterialReturnNoteApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/material-return-note`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProductionScheduleMaterialReturnNoteByMaterialReturnNoteId:
      build.query<
        GetApiV1ProductionScheduleMaterialReturnNoteByMaterialReturnNoteIdApiResponse,
        GetApiV1ProductionScheduleMaterialReturnNoteByMaterialReturnNoteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/material-return-note/${queryArg.materialReturnNoteId}`,
        }),
      }),
    putApiV1ProductionScheduleMaterialReturnNoteCompleteByMaterialReturnNoteId:
      build.mutation<
        PutApiV1ProductionScheduleMaterialReturnNoteCompleteByMaterialReturnNoteIdApiResponse,
        PutApiV1ProductionScheduleMaterialReturnNoteCompleteByMaterialReturnNoteIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/material-return-note/complete/${queryArg.materialReturnNoteId}`,
          method: "PUT",
        }),
      }),
    postApiV1ProductionScheduleExtraPackingByProductionScheduleIdAndProductId:
      build.mutation<
        PostApiV1ProductionScheduleExtraPackingByProductionScheduleIdAndProductIdApiResponse,
        PostApiV1ProductionScheduleExtraPackingByProductionScheduleIdAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/extra-packing/${queryArg.productionScheduleId}/${queryArg.productId}`,
          method: "POST",
          body: queryArg.body,
        }),
      }),
    getApiV1ProductionScheduleExtraPacking: build.query<
      GetApiV1ProductionScheduleExtraPackingApiResponse,
      GetApiV1ProductionScheduleExtraPackingApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/extra-packing`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProductionScheduleExtraPackingByProductionExtraPackingId:
      build.query<
        GetApiV1ProductionScheduleExtraPackingByProductionExtraPackingIdApiResponse,
        GetApiV1ProductionScheduleExtraPackingByProductionExtraPackingIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/extra-packing/${queryArg.productionExtraPackingId}`,
        }),
      }),
    getApiV1ProductionScheduleExtraPackingByProductbyProductionScheduleIdAndProductId:
      build.query<
        GetApiV1ProductionScheduleExtraPackingByProductbyProductionScheduleIdAndProductIdApiResponse,
        GetApiV1ProductionScheduleExtraPackingByProductbyProductionScheduleIdAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/extra-packing/by-product${queryArg.productionScheduleId}/${queryArg.productId}`,
        }),
      }),
    getApiV1ProductionScheduleExtraPackingBatchesToSupplyByExtraPackingMaterialId:
      build.query<
        GetApiV1ProductionScheduleExtraPackingBatchesToSupplyByExtraPackingMaterialIdApiResponse,
        GetApiV1ProductionScheduleExtraPackingBatchesToSupplyByExtraPackingMaterialIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/extra-packing/batches-to-supply/${queryArg.extraPackingMaterialId}`,
        }),
      }),
    postApiV1ProductionScheduleExtraPackingApproveByProductionExtraPackingId:
      build.mutation<
        PostApiV1ProductionScheduleExtraPackingApproveByProductionExtraPackingIdApiResponse,
        PostApiV1ProductionScheduleExtraPackingApproveByProductionExtraPackingIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/extra-packing/approve/${queryArg.productionExtraPackingId}`,
          method: "POST",
          body: queryArg.body,
        }),
      }),
    postApiV1Requisition: build.mutation<
      PostApiV1RequisitionApiResponse,
      PostApiV1RequisitionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition`,
        method: "POST",
        body: queryArg.createRequisitionRequest,
      }),
    }),
    getApiV1Requisition: build.query<
      GetApiV1RequisitionApiResponse,
      GetApiV1RequisitionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          status: queryArg.status,
          type: queryArg["type"],
        },
      }),
    }),
    getApiV1RequisitionDepartment: build.query<
      GetApiV1RequisitionDepartmentApiResponse,
      GetApiV1RequisitionDepartmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/department`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          status: queryArg.status,
          type: queryArg["type"],
          kind: queryArg.kind,
        },
      }),
    }),
    getApiV1RequisitionByRequisitionId: build.query<
      GetApiV1RequisitionByRequisitionIdApiResponse,
      GetApiV1RequisitionByRequisitionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/${queryArg.requisitionId}`,
      }),
    }),
    postApiV1RequisitionIssueStockRequisitionByStockRequisitionId:
      build.mutation<
        PostApiV1RequisitionIssueStockRequisitionByStockRequisitionIdApiResponse,
        PostApiV1RequisitionIssueStockRequisitionByStockRequisitionIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/requisition/issue-stock-requisition/${queryArg.stockRequisitionId}`,
          method: "POST",
        }),
      }),
    postApiV1RequisitionByRequisitionIdIssue: build.mutation<
      PostApiV1RequisitionByRequisitionIdIssueApiResponse,
      PostApiV1RequisitionByRequisitionIdIssueApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/${queryArg.requisitionId}/issue`,
        method: "POST",
        body: queryArg.approveRequisitionRequest,
      }),
    }),
    postApiV1RequisitionSource: build.mutation<
      PostApiV1RequisitionSourceApiResponse,
      PostApiV1RequisitionSourceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source`,
        method: "POST",
        body: queryArg.createSourceRequisitionRequest,
      }),
    }),
    getApiV1RequisitionSource: build.query<
      GetApiV1RequisitionSourceApiResponse,
      GetApiV1RequisitionSourceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1RequisitionSourceBySourceRequisitionId: build.query<
      GetApiV1RequisitionSourceBySourceRequisitionIdApiResponse,
      GetApiV1RequisitionSourceBySourceRequisitionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/${queryArg.sourceRequisitionId}`,
      }),
    }),
    putApiV1RequisitionSourceBySourceRequisitionId: build.mutation<
      PutApiV1RequisitionSourceBySourceRequisitionIdApiResponse,
      PutApiV1RequisitionSourceBySourceRequisitionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/${queryArg.sourceRequisitionId}`,
        method: "PUT",
        body: queryArg.createSourceRequisitionRequest,
      }),
    }),
    deleteApiV1RequisitionSourceBySourceRequisitionId: build.mutation<
      DeleteApiV1RequisitionSourceBySourceRequisitionIdApiResponse,
      DeleteApiV1RequisitionSourceBySourceRequisitionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/${queryArg.sourceRequisitionId}`,
        method: "DELETE",
      }),
    }),
    getApiV1RequisitionSourceItems: build.query<
      GetApiV1RequisitionSourceItemsApiResponse,
      GetApiV1RequisitionSourceItemsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/items`,
        params: {
          source: queryArg.source,
          page: queryArg.page,
          pageSize: queryArg.pageSize,
        },
      }),
    }),
    getApiV1RequisitionSourceSupplier: build.query<
      GetApiV1RequisitionSourceSupplierApiResponse,
      GetApiV1RequisitionSourceSupplierApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/supplier`,
        params: {
          source: queryArg.source,
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          sent: queryArg.sent,
        },
      }),
    }),
    getApiV1RequisitionSourceSupplierBySupplierId: build.query<
      GetApiV1RequisitionSourceSupplierBySupplierIdApiResponse,
      GetApiV1RequisitionSourceSupplierBySupplierIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/supplier/${queryArg.supplierId}`,
      }),
    }),
    postApiV1RequisitionSourceSupplierBySupplierIdSendQuotation: build.mutation<
      PostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationApiResponse,
      PostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/supplier/${queryArg.supplierId}/send-quotation`,
        method: "POST",
      }),
    }),
    getApiV1RequisitionSourceSupplierQuotation: build.query<
      GetApiV1RequisitionSourceSupplierQuotationApiResponse,
      GetApiV1RequisitionSourceSupplierQuotationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/supplier/quotation`,
        params: {
          supplierType: queryArg.supplierType,
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          received: queryArg.received,
        },
      }),
    }),
    getApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotation:
      build.query<
        GetApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationApiResponse,
        GetApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/requisition/source/supplier/${queryArg.supplierQuotationId}/quotation`,
        }),
      }),
    postApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationReceive:
      build.mutation<
        PostApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationReceiveApiResponse,
        PostApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationReceiveApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/requisition/source/supplier/${queryArg.supplierQuotationId}/quotation/receive`,
          method: "POST",
          body: queryArg.body,
        }),
      }),
    getApiV1RequisitionSourceMaterialPriceComparison: build.query<
      GetApiV1RequisitionSourceMaterialPriceComparisonApiResponse,
      GetApiV1RequisitionSourceMaterialPriceComparisonApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/material/price-comparison`,
        params: {
          supplierType: queryArg.supplierType,
        },
      }),
    }),
    getApiV1RequisitionSourceMaterialPriceComparisonByMaterial: build.query<
      GetApiV1RequisitionSourceMaterialPriceComparisonByMaterialApiResponse,
      GetApiV1RequisitionSourceMaterialPriceComparisonByMaterialApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/material/price-comparison/by-material`,
        params: {
          supplierType: queryArg.supplierType,
          materialId: queryArg.materialId,
          purchaseOrderId: queryArg.purchaseOrderId,
          status: queryArg.status,
        },
      }),
    }),
    postApiV1RequisitionSourceQuotationProcessPurchaseOrder: build.mutation<
      PostApiV1RequisitionSourceQuotationProcessPurchaseOrderApiResponse,
      PostApiV1RequisitionSourceQuotationProcessPurchaseOrderApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/quotation/process-purchase-order`,
        method: "POST",
        body: queryArg.body,
        params: {
          supplierType: queryArg.supplierType,
        },
      }),
    }),
    getApiV1Role: build.query<GetApiV1RoleApiResponse, GetApiV1RoleApiArg>({
      query: () => ({ url: `/api/v1/role` }),
    }),
    postApiV1Role: build.mutation<
      PostApiV1RoleApiResponse,
      PostApiV1RoleApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/role`,
        method: "POST",
        body: queryArg.createRoleRequest,
      }),
    }),
    getApiV1RoleWithPermissions: build.query<
      GetApiV1RoleWithPermissionsApiResponse,
      GetApiV1RoleWithPermissionsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/role/with-permissions`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1RoleById: build.query<
      GetApiV1RoleByIdApiResponse,
      GetApiV1RoleByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/role/${queryArg.id}` }),
    }),
    putApiV1RoleById: build.mutation<
      PutApiV1RoleByIdApiResponse,
      PutApiV1RoleByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/role/${queryArg.id}`,
        method: "PUT",
        body: queryArg.updateRoleRequest,
      }),
    }),
    deleteApiV1RoleById: build.mutation<
      DeleteApiV1RoleByIdApiResponse,
      DeleteApiV1RoleByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/role/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    getApiV1RoleCheckById: build.query<
      GetApiV1RoleCheckByIdApiResponse,
      GetApiV1RoleCheckByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/role/check/${queryArg.id}` }),
    }),
    postApiV1ShiftSchedule: build.mutation<
      PostApiV1ShiftScheduleApiResponse,
      PostApiV1ShiftScheduleApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-schedule`,
        method: "POST",
        body: queryArg.createShiftScheduleRequest,
      }),
    }),
    getApiV1ShiftSchedule: build.query<
      GetApiV1ShiftScheduleApiResponse,
      GetApiV1ShiftScheduleApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-schedule`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ShiftScheduleById: build.query<
      GetApiV1ShiftScheduleByIdApiResponse,
      GetApiV1ShiftScheduleByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/shift-schedule/${queryArg.id}` }),
    }),
    putApiV1ShiftScheduleById: build.mutation<
      PutApiV1ShiftScheduleByIdApiResponse,
      PutApiV1ShiftScheduleByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-schedule/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createShiftScheduleRequest,
      }),
    }),
    deleteApiV1ShiftScheduleById: build.mutation<
      DeleteApiV1ShiftScheduleByIdApiResponse,
      DeleteApiV1ShiftScheduleByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-schedule/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiV1ShiftType: build.mutation<
      PostApiV1ShiftTypeApiResponse,
      PostApiV1ShiftTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-type`,
        method: "POST",
        body: queryArg.createShiftTypeRequest,
      }),
    }),
    getApiV1ShiftType: build.query<
      GetApiV1ShiftTypeApiResponse,
      GetApiV1ShiftTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-type`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    putApiV1ShiftType: build.mutation<
      PutApiV1ShiftTypeApiResponse,
      PutApiV1ShiftTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-type`,
        method: "PUT",
        body: queryArg.createShiftTypeRequest,
      }),
    }),
    getApiV1ShiftTypeById: build.query<
      GetApiV1ShiftTypeByIdApiResponse,
      GetApiV1ShiftTypeByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/shift-type/${queryArg.id}` }),
    }),
    deleteApiV1ShiftTypeById: build.mutation<
      DeleteApiV1ShiftTypeByIdApiResponse,
      DeleteApiV1ShiftTypeByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-type/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    postApiV1User: build.mutation<
      PostApiV1UserApiResponse,
      PostApiV1UserApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user`,
        method: "POST",
        body: queryArg.createUserRequest,
      }),
    }),
    getApiV1User: build.query<GetApiV1UserApiResponse, GetApiV1UserApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/user`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    postApiV1UserSignUp: build.mutation<
      PostApiV1UserSignUpApiResponse,
      PostApiV1UserSignUpApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/sign-up`,
        method: "POST",
        body: queryArg.createClientRequest,
      }),
    }),
    getApiV1UserAuthenticated: build.query<
      GetApiV1UserAuthenticatedApiResponse,
      GetApiV1UserAuthenticatedApiArg
    >({
      query: () => ({ url: `/api/v1/user/authenticated` }),
    }),
    putApiV1UserById: build.mutation<
      PutApiV1UserByIdApiResponse,
      PutApiV1UserByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/${queryArg.id}`,
        method: "PUT",
        body: queryArg.updateUserRequest,
      }),
    }),
    deleteApiV1UserById: build.mutation<
      DeleteApiV1UserByIdApiResponse,
      DeleteApiV1UserByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/${queryArg.id}`,
        method: "DELETE",
      }),
    }),
    putApiV1UserRoleById: build.mutation<
      PutApiV1UserRoleByIdApiResponse,
      PutApiV1UserRoleByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/role/${queryArg.id}`,
        method: "PUT",
        body: queryArg.updateUserRoleRequest,
      }),
    }),
    postApiV1UserAvatarById: build.mutation<
      PostApiV1UserAvatarByIdApiResponse,
      PostApiV1UserAvatarByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/avatar/${queryArg.id}`,
        method: "POST",
        body: queryArg.uploadFileRequest,
      }),
    }),
    postApiV1UserSignatureById: build.mutation<
      PostApiV1UserSignatureByIdApiResponse,
      PostApiV1UserSignatureByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/signature/${queryArg.id}`,
        method: "POST",
        body: queryArg.uploadFileRequest,
      }),
    }),
    getApiV1UserToggleDisableById: build.query<
      GetApiV1UserToggleDisableByIdApiResponse,
      GetApiV1UserToggleDisableByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/toggle-disable/${queryArg.id}`,
      }),
    }),
    postApiV1Warehouse: build.mutation<
      PostApiV1WarehouseApiResponse,
      PostApiV1WarehouseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse`,
        method: "POST",
        body: queryArg.createWarehouseRequest,
      }),
    }),
    getApiV1Warehouse: build.query<
      GetApiV1WarehouseApiResponse,
      GetApiV1WarehouseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          type: queryArg["type"],
        },
      }),
    }),
    getApiV1WarehouseByWarehouseId: build.query<
      GetApiV1WarehouseByWarehouseIdApiResponse,
      GetApiV1WarehouseByWarehouseIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/${queryArg.warehouseId}`,
      }),
    }),
    putApiV1WarehouseByWarehouseId: build.mutation<
      PutApiV1WarehouseByWarehouseIdApiResponse,
      PutApiV1WarehouseByWarehouseIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/${queryArg.warehouseId}`,
        method: "PUT",
        body: queryArg.createWarehouseRequest,
      }),
    }),
    deleteApiV1WarehouseByWarehouseId: build.mutation<
      DeleteApiV1WarehouseByWarehouseIdApiResponse,
      DeleteApiV1WarehouseByWarehouseIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/${queryArg.warehouseId}`,
        method: "DELETE",
      }),
    }),
    postApiV1WarehouseByWarehouseIdLocation: build.mutation<
      PostApiV1WarehouseByWarehouseIdLocationApiResponse,
      PostApiV1WarehouseByWarehouseIdLocationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/${queryArg.warehouseId}/location`,
        method: "POST",
        body: queryArg.createWarehouseLocationRequest,
      }),
    }),
    getApiV1WarehouseLocationByLocationId: build.query<
      GetApiV1WarehouseLocationByLocationIdApiResponse,
      GetApiV1WarehouseLocationByLocationIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/location/${queryArg.locationId}`,
      }),
    }),
    putApiV1WarehouseLocationByLocationId: build.mutation<
      PutApiV1WarehouseLocationByLocationIdApiResponse,
      PutApiV1WarehouseLocationByLocationIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/location/${queryArg.locationId}`,
        method: "PUT",
        body: queryArg.createWarehouseLocationRequest,
      }),
    }),
    deleteApiV1WarehouseLocationByLocationId: build.mutation<
      DeleteApiV1WarehouseLocationByLocationIdApiResponse,
      DeleteApiV1WarehouseLocationByLocationIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/location/${queryArg.locationId}`,
        method: "DELETE",
      }),
    }),
    getApiV1WarehouseLocation: build.query<
      GetApiV1WarehouseLocationApiResponse,
      GetApiV1WarehouseLocationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/location`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    postApiV1WarehouseByLocationIdRack: build.mutation<
      PostApiV1WarehouseByLocationIdRackApiResponse,
      PostApiV1WarehouseByLocationIdRackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/${queryArg.locationId}/rack`,
        method: "POST",
        body: queryArg.createWarehouseLocationRackRequest,
      }),
    }),
    getApiV1WarehouseRackByRackId: build.query<
      GetApiV1WarehouseRackByRackIdApiResponse,
      GetApiV1WarehouseRackByRackIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/rack/${queryArg.rackId}`,
      }),
    }),
    putApiV1WarehouseRackByRackId: build.mutation<
      PutApiV1WarehouseRackByRackIdApiResponse,
      PutApiV1WarehouseRackByRackIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/rack/${queryArg.rackId}`,
        method: "PUT",
        body: queryArg.createWarehouseLocationRackRequest,
      }),
    }),
    deleteApiV1WarehouseRackByRackId: build.mutation<
      DeleteApiV1WarehouseRackByRackIdApiResponse,
      DeleteApiV1WarehouseRackByRackIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/rack/${queryArg.rackId}`,
        method: "DELETE",
      }),
    }),
    getApiV1WarehouseRack: build.query<
      GetApiV1WarehouseRackApiResponse,
      GetApiV1WarehouseRackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/rack`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          kind: queryArg.kind,
        },
      }),
    }),
    getApiV1WarehouseRackByDepartment: build.query<
      GetApiV1WarehouseRackByDepartmentApiResponse,
      GetApiV1WarehouseRackByDepartmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/rack/by-department`,
        params: {
          kind: queryArg.kind,
        },
      }),
    }),
    postApiV1WarehouseByRackIdShelf: build.mutation<
      PostApiV1WarehouseByRackIdShelfApiResponse,
      PostApiV1WarehouseByRackIdShelfApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/${queryArg.rackId}/shelf`,
        method: "POST",
        body: queryArg.createWarehouseLocationShelfRequest,
      }),
    }),
    getApiV1WarehouseShelfByShelfId: build.query<
      GetApiV1WarehouseShelfByShelfIdApiResponse,
      GetApiV1WarehouseShelfByShelfIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/shelf/${queryArg.shelfId}`,
      }),
    }),
    putApiV1WarehouseShelfByShelfId: build.mutation<
      PutApiV1WarehouseShelfByShelfIdApiResponse,
      PutApiV1WarehouseShelfByShelfIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/shelf/${queryArg.shelfId}`,
        method: "PUT",
        body: queryArg.createWarehouseLocationShelfRequest,
      }),
    }),
    deleteApiV1WarehouseShelfByShelfId: build.mutation<
      DeleteApiV1WarehouseShelfByShelfIdApiResponse,
      DeleteApiV1WarehouseShelfByShelfIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/shelf/${queryArg.shelfId}`,
        method: "DELETE",
      }),
    }),
    getApiV1WarehouseShelf: build.query<
      GetApiV1WarehouseShelfApiResponse,
      GetApiV1WarehouseShelfApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/shelf`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1WarehouseShelfByDepartment: build.query<
      GetApiV1WarehouseShelfByDepartmentApiResponse,
      GetApiV1WarehouseShelfByDepartmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/shelf/by-department`,
        params: {
          kind: queryArg.kind,
        },
      }),
    }),
    getApiV1WarehouseByWarehouseIdShelvesByMaterialAndMaterialId: build.query<
      GetApiV1WarehouseByWarehouseIdShelvesByMaterialAndMaterialIdApiResponse,
      GetApiV1WarehouseByWarehouseIdShelvesByMaterialAndMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/${queryArg.warehouseId}/shelves/by-material/${queryArg.materialId}`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1WarehouseByWarehouseIdShelvesByMaterialbatchAndMaterialBatchId:
      build.query<
        GetApiV1WarehouseByWarehouseIdShelvesByMaterialbatchAndMaterialBatchIdApiResponse,
        GetApiV1WarehouseByWarehouseIdShelvesByMaterialbatchAndMaterialBatchIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/warehouse/${queryArg.warehouseId}/shelves/by-materialbatch/${queryArg.materialBatchId}`,
          params: {
            page: queryArg.page,
            pageSize: queryArg.pageSize,
            searchQuery: queryArg.searchQuery,
          },
        }),
      }),
    getApiV1WarehouseRackByRackIdShelves: build.query<
      GetApiV1WarehouseRackByRackIdShelvesApiResponse,
      GetApiV1WarehouseRackByRackIdShelvesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/rack/${queryArg.rackId}/shelves`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1WarehouseByWarehouseIdShelves: build.query<
      GetApiV1WarehouseByWarehouseIdShelvesApiResponse,
      GetApiV1WarehouseByWarehouseIdShelvesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/${queryArg.warehouseId}/shelves`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1WarehouseByWarehouseIdArrivalLocation: build.query<
      GetApiV1WarehouseByWarehouseIdArrivalLocationApiResponse,
      GetApiV1WarehouseByWarehouseIdArrivalLocationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/${queryArg.warehouseId}/arrival-location`,
      }),
    }),
    getApiV1WarehouseDistributedRequisitionMaterials: build.query<
      GetApiV1WarehouseDistributedRequisitionMaterialsApiResponse,
      GetApiV1WarehouseDistributedRequisitionMaterialsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/distributed-requisition-materials`,
        params: {
          kind: queryArg.kind,
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1WarehouseFinishedGoodsDetails: build.query<
      GetApiV1WarehouseFinishedGoodsDetailsApiResponse,
      GetApiV1WarehouseFinishedGoodsDetailsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/finished-goods-details`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1WarehouseStockTransferDetails: build.query<
      GetApiV1WarehouseStockTransferDetailsApiResponse,
      GetApiV1WarehouseStockTransferDetailsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/stock-transfer-details`,
        params: {
          kind: queryArg.kind,
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1WarehouseDistributedMaterialById: build.query<
      GetApiV1WarehouseDistributedMaterialByIdApiResponse,
      GetApiV1WarehouseDistributedMaterialByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/distributed-material/${queryArg.id}`,
      }),
    }),
    postApiV1WarehouseArrivalLocation: build.mutation<
      PostApiV1WarehouseArrivalLocationApiResponse,
      PostApiV1WarehouseArrivalLocationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/arrival-location`,
        method: "POST",
        body: queryArg.createArrivalLocationRequest,
      }),
    }),
    putApiV1WarehouseArrivalLocation: build.mutation<
      PutApiV1WarehouseArrivalLocationApiResponse,
      PutApiV1WarehouseArrivalLocationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/arrival-location`,
        method: "PUT",
        body: queryArg.updateArrivalLocationRequest,
      }),
    }),
    postApiV1WarehouseConfirmArrivalByDistributedMaterialId: build.mutation<
      PostApiV1WarehouseConfirmArrivalByDistributedMaterialIdApiResponse,
      PostApiV1WarehouseConfirmArrivalByDistributedMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/confirm-arrival/${queryArg.distributedMaterialId}`,
        method: "POST",
      }),
    }),
    postApiV1WarehouseChecklist: build.mutation<
      PostApiV1WarehouseChecklistApiResponse,
      PostApiV1WarehouseChecklistApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/checklist`,
        method: "POST",
        body: queryArg.createChecklistRequest,
      }),
    }),
    getApiV1WarehouseChecklistById: build.query<
      GetApiV1WarehouseChecklistByIdApiResponse,
      GetApiV1WarehouseChecklistByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/checklist/${queryArg.id}`,
      }),
    }),
    getApiV1WarehouseDistributedMaterialByDistributedMaterialIdMaterialBatch:
      build.query<
        GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdMaterialBatchApiResponse,
        GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdMaterialBatchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/warehouse/distributed-material/${queryArg.distributedMaterialId}/material-batch`,
        }),
      }),
    postApiV1WarehouseDistributedMaterialMaterialBatch: build.mutation<
      PostApiV1WarehouseDistributedMaterialMaterialBatchApiResponse,
      PostApiV1WarehouseDistributedMaterialMaterialBatchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/distributed-material/material-batch`,
        method: "POST",
        body: queryArg.body,
      }),
    }),
    getApiV1WarehouseDistributedMaterialByDistributedMaterialIdChecklist:
      build.query<
        GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdChecklistApiResponse,
        GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdChecklistApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/warehouse/distributed-material/${queryArg.distributedMaterialId}/checklist`,
        }),
      }),
    postApiV1WarehouseGrn: build.mutation<
      PostApiV1WarehouseGrnApiResponse,
      PostApiV1WarehouseGrnApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/grn`,
        method: "POST",
        body: queryArg.createGrnRequest,
      }),
    }),
    getApiV1WarehouseGrnById: build.query<
      GetApiV1WarehouseGrnByIdApiResponse,
      GetApiV1WarehouseGrnByIdApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/warehouse/grn/${queryArg.id}` }),
    }),
    getApiV1WarehouseGrns: build.query<
      GetApiV1WarehouseGrnsApiResponse,
      GetApiV1WarehouseGrnsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/grns`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          kind: queryArg.kind,
        },
      }),
    }),
    getApiV1WarehouseBincardinformationByMaterialId: build.query<
      GetApiV1WarehouseBincardinformationByMaterialIdApiResponse,
      GetApiV1WarehouseBincardinformationByMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/bincardinformation/${queryArg.materialId}`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1WarehouseBincardinformationByProductIdProduct: build.query<
      GetApiV1WarehouseBincardinformationByProductIdProductApiResponse,
      GetApiV1WarehouseBincardinformationByProductIdProductApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/bincardinformation/${queryArg.productId}/product`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    postApiV1WorkOrder: build.mutation<
      PostApiV1WorkOrderApiResponse,
      PostApiV1WorkOrderApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/work-order`,
        method: "POST",
        body: queryArg.createWorkOrderRequest,
        params: {
          userId: queryArg.userId,
        },
      }),
    }),
    getApiV1WorkOrder: build.query<
      GetApiV1WorkOrderApiResponse,
      GetApiV1WorkOrderApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/work-order`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1WorkOrderByWorkOrderId: build.query<
      GetApiV1WorkOrderByWorkOrderIdApiResponse,
      GetApiV1WorkOrderByWorkOrderIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/work-order/${queryArg.workOrderId}`,
      }),
    }),
    putApiV1WorkOrderByWorkOrderId: build.mutation<
      PutApiV1WorkOrderByWorkOrderIdApiResponse,
      PutApiV1WorkOrderByWorkOrderIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/work-order/${queryArg.workOrderId}`,
        method: "PUT",
        body: queryArg.updateWorkOrderRequest,
        params: {
          userId: queryArg.userId,
        },
      }),
    }),
    deleteApiV1WorkOrderByWorkOrderId: build.mutation<
      DeleteApiV1WorkOrderByWorkOrderIdApiResponse,
      DeleteApiV1WorkOrderByWorkOrderIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/work-order/${queryArg.workOrderId}`,
        method: "DELETE",
        params: {
          userId: queryArg.userId,
        },
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as api };
export type GetApiV1ActivityLogApiResponse =
  /** status 200 OK */ ActivityLogDtoIEnumerablePaginateable;
export type GetApiV1ActivityLogApiArg = {
  startDate?: string;
  endDate?: string;
  pageSize?: number;
  page?: number;
  sortLabel?: string;
  sortDirection?: SortDirection;
};
export type PostApiV1ApprovalApiResponse = /** status 201 Created */ string;
export type PostApiV1ApprovalApiArg = {
  createApprovalRequest: CreateApprovalRequest;
};
export type GetApiV1ApprovalApiResponse =
  /** status 200 OK */ ApprovalDtoIEnumerablePaginateable;
export type GetApiV1ApprovalApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1ApprovalByApprovalIdApiResponse =
  /** status 200 OK */ ApprovalDto;
export type GetApiV1ApprovalByApprovalIdApiArg = {
  approvalId: string;
};
export type PutApiV1ApprovalByApprovalIdApiResponse = unknown;
export type PutApiV1ApprovalByApprovalIdApiArg = {
  approvalId: string;
  createApprovalRequest: CreateApprovalRequest;
};
export type DeleteApiV1ApprovalByApprovalIdApiResponse = unknown;
export type DeleteApiV1ApprovalByApprovalIdApiArg = {
  approvalId: string;
};
export type GetApiV1ApprovalByModelTypeAndModelIdApiResponse =
  /** status 200 OK */ ApprovalEntityRead;
export type GetApiV1ApprovalByModelTypeAndModelIdApiArg = {
  modelType: string;
  modelId: string;
};
export type PostApiV1ApprovalApproveByModelTypeAndModelIdApiResponse = unknown;
export type PostApiV1ApprovalApproveByModelTypeAndModelIdApiArg = {
  modelType: string;
  modelId: string;
  approvalRequestBody: ApprovalRequestBody;
};
export type PostApiV1ApprovalRejectByModelTypeAndModelIdApiResponse = unknown;
export type PostApiV1ApprovalRejectByModelTypeAndModelIdApiArg = {
  modelType: string;
  modelId: string;
  approvalRequestBody: ApprovalRequestBody;
};
export type GetApiV1ApprovalMyPendingApiResponse =
  /** status 200 OK */ ApprovalEntityRead[];
export type GetApiV1ApprovalMyPendingApiArg = void;
export type PostApiV1AuthLoginApiResponse = /** status 200 OK */ LoginResponse;
export type PostApiV1AuthLoginApiArg = {
  loginRequest: LoginRequest;
};
export type PostApiV1AuthLoginWithRefreshTokenApiResponse =
  /** status 200 OK */ LoginResponse;
export type PostApiV1AuthLoginWithRefreshTokenApiArg = {
  loginWithRefreshToken: LoginWithRefreshToken;
};
export type PostApiV1AuthSetPasswordApiResponse =
  /** status 200 OK */ PasswordChangeResponse;
export type PostApiV1AuthSetPasswordApiArg = {
  setPasswordRequest: SetPasswordRequest;
};
export type PostApiV1AuthChangePasswordApiResponse =
  /** status 200 OK */ PasswordChangeResponse;
export type PostApiV1AuthChangePasswordApiArg = {
  changePasswordRequest: ChangePasswordRequest;
};
export type PostApiV1AuthForgotPasswordApiResponse = unknown;
export type PostApiV1AuthForgotPasswordApiArg = {
  forgotPasswordRequest: ForgotPasswordRequest;
};
export type PostApiV1BomApiResponse = /** status 201 Created */ string;
export type PostApiV1BomApiArg = {
  /** The CreateBillOfMaterialRequest object. */
  createBillOfMaterialRequest: CreateBillOfMaterialRequest;
};
export type GetApiV1BomApiResponse = unknown;
export type GetApiV1BomApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1BomByBillOfMaterialIdApiResponse = unknown;
export type GetApiV1BomByBillOfMaterialIdApiArg = {
  /** The ID of the Bill of Material. */
  billOfMaterialId: string;
};
export type PutApiV1BomByBillOfMaterialIdApiResponse = unknown;
export type PutApiV1BomByBillOfMaterialIdApiArg = {
  /** The ID of the Bill of Material to be updated. */
  billOfMaterialId: string;
  /** The CreateProductBillOfMaterialRequest object containing updated data. */
  createProductBillOfMaterialRequest: CreateProductBillOfMaterialRequest;
};
export type DeleteApiV1BomByBillOfMaterialIdApiResponse = unknown;
export type DeleteApiV1BomByBillOfMaterialIdApiArg = {
  /** The ID of the Bill of Material to be deleted. */
  billOfMaterialId: string;
};
export type PostApiV1CollectionApiResponse = /** status 200 OK */ {
  [key: string]: CollectionItemDto[];
};
export type PostApiV1CollectionApiArg = {
  /** The kind of material */
  materialKind?: MaterialKind;
  /** The types of items to retrieve */
  body: string[];
};
export type GetApiV1CollectionByItemTypeApiResponse =
  /** status 200 OK */ CollectionItemDto[];
export type GetApiV1CollectionByItemTypeApiArg = {
  /** The type of item to retrieve. */
  itemType: string;
  /** The kind of material */
  materialKind?: MaterialKind;
};
export type PostApiV1CollectionByItemTypeApiResponse =
  /** status 201 Created */ string;
export type PostApiV1CollectionByItemTypeApiArg = {
  /** The type of item to create. */
  itemType: string;
  /** The CreateItemRequest object containing item details. */
  createItemRequest: CreateItemRequest;
};
export type GetApiV1CollectionItemTypesApiResponse =
  /** status 200 OK */ string[];
export type GetApiV1CollectionItemTypesApiArg = void;
export type PutApiV1CollectionByItemTypeAndItemIdApiResponse =
  /** status 200 OK */ string;
export type PutApiV1CollectionByItemTypeAndItemIdApiArg = {
  /** The ID of the item to update. */
  itemId: string;
  /** The type of item to update. */
  itemType: string;
  /** The UpdateItemRequest object containing updated item details. */
  createItemRequest: CreateItemRequest;
};
export type DeleteApiV1CollectionByItemTypeAndItemIdApiResponse =
  /** status 200 OK */ string;
export type DeleteApiV1CollectionByItemTypeAndItemIdApiArg = {
  /** The ID of the item to delete. */
  itemId: string;
  /** The type of item to delete. */
  itemType: string;
};
export type GetApiV1CollectionUomApiResponse =
  /** status 200 OK */ UnitOfMeasureDto[];
export type GetApiV1CollectionUomApiArg = {
  isRawMaterial?: boolean;
};
export type GetApiV1CollectionPackageStylesApiResponse =
  /** status 200 OK */ PackageStyleDto[];
export type GetApiV1CollectionPackageStylesApiArg = void;
export type PostApiV1WorkingDaysApiResponse = unknown;
export type PostApiV1WorkingDaysApiArg = {
  body: CompanyWorkingDaysRequest[];
};
export type GetApiV1WorkingDaysApiResponse =
  /** status 200 OK */ CompanyWorkingDaysDtoIEnumerablePaginateable;
export type GetApiV1WorkingDaysApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1WorkingDaysByIdApiResponse =
  /** status 200 OK */ CompanyWorkingDaysDto;
export type GetApiV1WorkingDaysByIdApiArg = {
  id: string;
};
export type PutApiV1WorkingDaysByIdApiResponse =
  /** status 200 OK */ CompanyWorkingDaysDto;
export type PutApiV1WorkingDaysByIdApiArg = {
  id: string;
  companyWorkingDaysRequest: CompanyWorkingDaysRequest;
};
export type PostApiV1ConfigurationApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ConfigurationApiArg = {
  /** The configuration creation request. */
  createConfigurationRequest: CreateConfigurationRequest;
};
export type GetApiV1ConfigurationApiResponse =
  /** status 200 OK */ ConfigurationDtoIEnumerablePaginateable;
export type GetApiV1ConfigurationApiArg = {
  /** Page number of the pagination. */
  page?: number;
  /** Number of configurations per page. */
  pageSize?: number;
  /** Search query to filter configurations. */
  searchQuery?: string;
};
export type GetApiV1ConfigurationByConfigurationIdApiResponse =
  /** status 200 OK */ ConfigurationDto;
export type GetApiV1ConfigurationByConfigurationIdApiArg = {
  /** The ID of the configuration to retrieve. */
  configurationId: string;
};
export type PutApiV1ConfigurationByConfigurationIdApiResponse = unknown;
export type PutApiV1ConfigurationByConfigurationIdApiArg = {
  /** The ID of the configuration to update. */
  configurationId: string;
  /** The update request containing the new configuration data. */
  createConfigurationRequest: CreateConfigurationRequest;
};
export type DeleteApiV1ConfigurationByConfigurationIdApiResponse = unknown;
export type DeleteApiV1ConfigurationByConfigurationIdApiArg = {
  /** The ID of the configuration to delete. */
  configurationId: string;
};
export type GetApiV1ConfigurationByModelTypeByModelTypeApiResponse =
  /** status 200 OK */ ConfigurationDto;
export type GetApiV1ConfigurationByModelTypeByModelTypeApiArg = {
  /** The modeltype of the configuration to retrieve. */
  modelType: string;
};
export type GetApiV1ConfigurationNamingTypesApiResponse =
  /** status 200 Returns the list of namning types */ TypeResponse[];
export type GetApiV1ConfigurationNamingTypesApiArg = void;
export type GetApiV1ConfigurationByModelTypeAndPrefixApiResponse =
  /** status 200 OK */ number;
export type GetApiV1ConfigurationByModelTypeAndPrefixApiArg = {
  /** The model type of which the count is need */
  modelType: string;
  /** The prefix of the particular model */
  prefix: string;
};
export type PostApiV1DepartmentApiResponse = /** status 200 OK */ string;
export type PostApiV1DepartmentApiArg = {
  /** The CreateDepartmentRequest object. */
  createDepartmentRequest: CreateDepartmentRequest;
};
export type GetApiV1DepartmentApiResponse =
  /** status 200 OK */ DepartmentDtoIEnumerablePaginateableRead;
export type GetApiV1DepartmentApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
  /** The type of the department. (Product or Non Product Department) */
  type?: DepartmentType;
};
export type GetApiV1DepartmentByDepartmentIdApiResponse =
  /** status 200 OK */ DepartmentDtoRead;
export type GetApiV1DepartmentByDepartmentIdApiArg = {
  /** The ID of the department. */
  departmentId: string;
};
export type PutApiV1DepartmentByDepartmentIdApiResponse = unknown;
export type PutApiV1DepartmentByDepartmentIdApiArg = {
  /** The ID of the department to update. */
  departmentId: string;
  /** The CreateDepartmentRequest object. */
  createDepartmentRequest: CreateDepartmentRequest;
};
export type DeleteApiV1DepartmentByDepartmentIdApiResponse = unknown;
export type DeleteApiV1DepartmentByDepartmentIdApiArg = {
  /** The ID of the department to delete. */
  departmentId: string;
};
export type PostApiV1DesignationApiResponse = /** status 200 OK */ string;
export type PostApiV1DesignationApiArg = {
  createDesignationRequest: CreateDesignationRequest;
};
export type GetApiV1DesignationApiResponse =
  /** status 200 OK */ DesignationDtoIEnumerablePaginateableRead;
export type GetApiV1DesignationApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1DesignationByIdApiResponse =
  /** status 200 OK */ DesignationDtoRead;
export type GetApiV1DesignationByIdApiArg = {
  id: string;
};
export type PutApiV1DesignationByIdApiResponse =
  /** status 204 No Content */ DesignationDtoRead;
export type PutApiV1DesignationByIdApiArg = {
  id: string;
  createDesignationRequest: CreateDesignationRequest;
};
export type DeleteApiV1DesignationByIdApiResponse = unknown;
export type DeleteApiV1DesignationByIdApiArg = {
  id: string;
};
export type GetApiV1DesignationDepartmentByIdApiResponse =
  /** status 200 OK */ DesignationDtoRead[];
export type GetApiV1DesignationDepartmentByIdApiArg = {
  id: string;
};
export type PostApiV1EmployeeRegisterApiResponse = unknown;
export type PostApiV1EmployeeRegisterApiArg = {
  onboardEmployeeDto: OnboardEmployeeDto;
};
export type PostApiV1EmployeeApiResponse = /** status 200 OK */ string;
export type PostApiV1EmployeeApiArg = {
  createEmployeeRequest: CreateEmployeeRequest;
};
export type GetApiV1EmployeeApiResponse =
  /** status 200 OK */ EmployeeDtoIEnumerablePaginateableRead;
export type GetApiV1EmployeeApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  designation?: string;
  department?: string;
};
export type PostApiV1EmployeeUserApiResponse = /** status 200 OK */ string;
export type PostApiV1EmployeeUserApiArg = {
  employeeUserDto: EmployeeUserDto;
};
export type GetApiV1EmployeeByIdApiResponse =
  /** status 200 OK */ EmployeeDtoRead;
export type GetApiV1EmployeeByIdApiArg = {
  id: string;
};
export type PutApiV1EmployeeByIdApiResponse =
  /** status 204 No Content */ EmployeeDtoRead;
export type PutApiV1EmployeeByIdApiArg = {
  id: string;
  createEmployeeRequest: CreateEmployeeRequest;
};
export type DeleteApiV1EmployeeByIdApiResponse = unknown;
export type DeleteApiV1EmployeeByIdApiArg = {
  id: string;
};
export type PutApiV1EmployeeByIdAssignApiResponse =
  /** status 204 No Content */ EmployeeDtoRead;
export type PutApiV1EmployeeByIdAssignApiArg = {
  id: string;
  assignEmployeeDto: AssignEmployeeDto;
};
export type PostApiV1FileByModelTypeAndModelIdReferenceApiResponse = unknown;
export type PostApiV1FileByModelTypeAndModelIdReferenceApiArg = {
  /** Type of the model to associate the file with. */
  modelType: string;
  /** ID of the model to associate the file with. */
  modelId: string;
  /** A reference to the specific file or attachment. */
  reference: string;
  body: {
    file?: Blob;
  };
};
export type GetApiV1FileByModelTypeAndModelIdReferenceApiResponse =
  /** status 200 OK */ Blob;
export type GetApiV1FileByModelTypeAndModelIdReferenceApiArg = {
  /** The type of the model (e.g., "Product", "User", etc.) where the file is associated. */
  modelType: string;
  /** The unique identifier of the model (e.g., product ID, user ID, etc.) to which the file is attached. */
  modelId: string;
  /** A reference name for the specific file (e.g., file name, document ID, etc.). */
  reference: string;
};
export type PostApiV1FileByModelTypeAndModelIdApiResponse = unknown;
export type PostApiV1FileByModelTypeAndModelIdApiArg = {
  /** Type of the model to associate the file with. */
  modelType: string;
  /** ID of the model to associate the file with. */
  modelId: string;
  body: {
    files?: Blob[];
  };
};
export type DeleteApiV1FileByModelIdApiResponse = unknown;
export type DeleteApiV1FileByModelIdApiArg = {
  /** The ID of the model to delete attachments for. */
  modelId: string;
};
export type DeleteApiV1FileByModelIdAndReferenceApiResponse = unknown;
export type DeleteApiV1FileByModelIdAndReferenceApiArg = {
  /** The ID of the attachment. */
  modelId: string;
  /** The reference of the attachment to delete. */
  reference: string;
};
export type GetApiV1FileByModelTypeAndReferenceApiResponse =
  /** status 200 OK */ Blob;
export type GetApiV1FileByModelTypeAndReferenceApiArg = {
  /** The type of the model (e.g., "Product", "User", etc.) where the file is associated. */
  modelType: string;
  /** A reference name for the specific file (e.g., file name, document ID, etc.). */
  reference: string;
};
export type PostApiV1FormApiResponse = /** status 200 OK */ string;
export type PostApiV1FormApiArg = {
  /** The CreateFormRequest object. */
  createFormRequest: CreateFormRequest;
};
export type GetApiV1FormApiResponse =
  /** status 200 OK */ FormDtoIEnumerablePaginateable;
export type GetApiV1FormApiArg = {
  searchQuery?: string;
  pageSize?: number;
  page?: number;
  sortLabel?: string;
  sortDirection?: SortDirection;
};
export type GetApiV1FormByFormIdApiResponse = /** status 200 OK */ FormDto;
export type GetApiV1FormByFormIdApiArg = {
  /** The ID of the form. */
  formId: string;
};
export type PutApiV1FormByFormIdApiResponse = unknown;
export type PutApiV1FormByFormIdApiArg = {
  /** The ID of the form to be updated. */
  formId: string;
  /** The CreateFormRequest object containing updated form data. */
  createFormRequest: CreateFormRequest;
};
export type DeleteApiV1FormByFormIdApiResponse = unknown;
export type DeleteApiV1FormByFormIdApiArg = {
  /** The ID of the form to be deleted. */
  formId: string;
};
export type PostApiV1FormResponsesApiResponse = unknown;
export type PostApiV1FormResponsesApiArg = {
  /** The CreateResponseRequest object containing response data. */
  createResponseRequest: CreateResponseRequest;
};
export type GetApiV1FormResponsesByFormResponseIdApiResponse =
  /** status 200 OK */ FormResponseDto;
export type GetApiV1FormResponsesByFormResponseIdApiArg = {
  /** The ID of the form response. */
  formResponseId: string;
};
export type PostApiV1FormQuestionApiResponse = /** status 200 OK */ string;
export type PostApiV1FormQuestionApiArg = {
  /** The CreateQuestionRequest object containing question data. */
  createQuestionRequest: CreateQuestionRequest;
};
export type GetApiV1FormQuestionApiResponse =
  /** status 200 OK */ QuestionDtoIEnumerablePaginateable;
export type GetApiV1FormQuestionApiArg = {
  searchQuery?: string;
  pageSize?: number;
  page?: number;
  sortLabel?: string;
  sortDirection?: SortDirection;
};
export type GetApiV1FormQuestionByQuestionIdApiResponse =
  /** status 200 OK */ QuestionDto;
export type GetApiV1FormQuestionByQuestionIdApiArg = {
  /** The ID of the question. */
  questionId: string;
};
export type PutApiV1FormQuestionByQuestionIdApiResponse = unknown;
export type PutApiV1FormQuestionByQuestionIdApiArg = {
  /** The ID of the question to be updated. */
  questionId: string;
  /** The CreateQuestionRequest object containing updated question data. */
  createQuestionRequest: CreateQuestionRequest;
};
export type DeleteApiV1FormQuestionByQuestionIdApiResponse = unknown;
export type DeleteApiV1FormQuestionByQuestionIdApiArg = {
  /** The ID of the question to be deleted. */
  questionId: string;
};
export type PostApiV1LeaveEntitlementApiResponse = /** status 200 OK */ string;
export type PostApiV1LeaveEntitlementApiArg = {
  leaveEntitlementDto: LeaveEntitlementDto;
};
export type GetApiV1LeaveEntitlementApiResponse =
  /** status 200 OK */ LeaveEntitlementDtoIEnumerablePaginateable;
export type GetApiV1LeaveEntitlementApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1LeaveEntitlementByIdApiResponse =
  /** status 200 OK */ LeaveEntitlementDto;
export type GetApiV1LeaveEntitlementByIdApiArg = {
  id: string;
};
export type PutApiV1LeaveEntitlementByIdApiResponse =
  /** status 204 No Content */ LeaveEntitlementDto;
export type PutApiV1LeaveEntitlementByIdApiArg = {
  id: string;
  leaveEntitlementDto: LeaveEntitlementDto;
};
export type DeleteApiV1LeaveEntitlementByIdApiResponse = unknown;
export type DeleteApiV1LeaveEntitlementByIdApiArg = {
  id: string;
};
export type PostApiV1LeaveRequestApiResponse = /** status 200 OK */ string;
export type PostApiV1LeaveRequestApiArg = {
  createLeaveRequest: CreateLeaveRequest;
};
export type GetApiV1LeaveRequestApiResponse =
  /** status 200 OK */ LeaveRequestDtoIEnumerablePaginateableRead;
export type GetApiV1LeaveRequestApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1LeaveRequestByIdApiResponse =
  /** status 200 OK */ LeaveRequestDtoRead;
export type GetApiV1LeaveRequestByIdApiArg = {
  id: string;
};
export type PutApiV1LeaveRequestByIdApiResponse =
  /** status 204 No Content */ LeaveRequestDtoRead;
export type PutApiV1LeaveRequestByIdApiArg = {
  id: string;
  createLeaveRequest: CreateLeaveRequest;
};
export type DeleteApiV1LeaveRequestByIdApiResponse = unknown;
export type DeleteApiV1LeaveRequestByIdApiArg = {
  id: string;
};
export type PostApiV1LeaveTypeApiResponse = /** status 200 OK */ string;
export type PostApiV1LeaveTypeApiArg = {
  createLeaveTypeRequest: CreateLeaveTypeRequest;
};
export type GetApiV1LeaveTypeApiResponse =
  /** status 200 OK */ LeaveTypeDtoIEnumerablePaginateableRead;
export type GetApiV1LeaveTypeApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1LeaveTypeByIdApiResponse =
  /** status 200 OK */ LeaveTypeDtoRead;
export type GetApiV1LeaveTypeByIdApiArg = {
  id: string;
};
export type PutApiV1LeaveTypeByIdApiResponse =
  /** status 204 No Content */ LeaveTypeDtoRead;
export type PutApiV1LeaveTypeByIdApiArg = {
  id: string;
  createLeaveTypeRequest: CreateLeaveTypeRequest;
};
export type DeleteApiV1LeaveTypeByIdApiResponse = unknown;
export type DeleteApiV1LeaveTypeByIdApiArg = {
  id: string;
};
export type PostApiV1MaterialApiResponse = /** status 200 OK */ string;
export type PostApiV1MaterialApiArg = {
  /** The CreateMaterialRequest object. */
  createMaterialRequest: CreateMaterialRequest;
};
export type GetApiV1MaterialApiResponse =
  /** status 200 OK */ MaterialDtoIEnumerablePaginateable;
export type GetApiV1MaterialApiArg = {
  /** The kind of material being requested */
  kind?: MaterialKind;
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1MaterialByMaterialIdApiResponse =
  /** status 200 OK */ MaterialDto;
export type GetApiV1MaterialByMaterialIdApiArg = {
  /** The ID of the material. */
  materialId: string;
};
export type PutApiV1MaterialByMaterialIdApiResponse = unknown;
export type PutApiV1MaterialByMaterialIdApiArg = {
  /** The ID of the material to be updated. */
  materialId: string;
  /** The UpdateMaterialRequest object containing updated material data. */
  createMaterialRequest: CreateMaterialRequest;
};
export type DeleteApiV1MaterialByMaterialIdApiResponse = unknown;
export type DeleteApiV1MaterialByMaterialIdApiArg = {
  /** The ID of the material to be deleted. */
  materialId: string;
};
export type GetApiV1MaterialCategoryApiResponse =
  /** status 200 OK */ MaterialCategoryDto[];
export type GetApiV1MaterialCategoryApiArg = {
  /** The kind of material being requested */
  materialKind?: MaterialKind;
};
export type GetApiV1MaterialAllApiResponse = /** status 200 OK */ MaterialDto[];
export type GetApiV1MaterialAllApiArg = void;
export type PutApiV1MaterialByMaterialIdReorderLevelApiResponse = unknown;
export type PutApiV1MaterialByMaterialIdReorderLevelApiArg = {
  /** The ID of the material to be updated. */
  materialId: string;
  /** The new ReOrderLevel value. */
  updateReOrderLevelRequest: UpdateReOrderLevelRequest;
};
export type GetApiV1MaterialByMaterialIdStockLevelApiResponse =
  /** status 200 OK */ number;
export type GetApiV1MaterialByMaterialIdStockLevelApiArg = {
  /** The ID of the material. */
  materialId: string;
};
export type GetApiV1MaterialByMaterialIdBatchesApiResponse =
  /** status 200 OK */ MaterialBatchDtoRead[];
export type GetApiV1MaterialByMaterialIdBatchesApiArg = {
  /** The ID of the material. */
  materialId: string;
};
export type GetApiV1MaterialByMaterialIdInTransitApiResponse =
  /** status 200 OK */ number;
export type GetApiV1MaterialByMaterialIdInTransitApiArg = {
  /** The ID of the material. */
  materialId: string;
};
export type PostApiV1MaterialBatchApiResponse = unknown;
export type PostApiV1MaterialBatchApiArg = {
  /** The CreateMaterialBatchRequest object. */
  body: CreateMaterialBatchRequest[];
};
export type GetApiV1MaterialBatchApiResponse =
  /** status 200 OK */ MaterialBatchDtoIEnumerablePaginateableRead;
export type GetApiV1MaterialBatchApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1MaterialBatchByBatchIdApiResponse =
  /** status 200 OK */ MaterialBatchDtoRead;
export type GetApiV1MaterialBatchByBatchIdApiArg = {
  /** The ID of the material batch. */
  batchId: string;
};
export type PostApiV1MaterialBatchMoveApiResponse = unknown;
export type PostApiV1MaterialBatchMoveApiArg = {
  /** The move material to location request object */
  moveMaterialBatchRequest: MoveMaterialBatchRequest;
};
export type PutApiV1MaterialBatchByBatchIdApproveApiResponse = unknown;
export type PutApiV1MaterialBatchByBatchIdApproveApiArg = {
  batchId: string;
};
export type GetApiV1MaterialByMaterialIdStockAndWarehouseIdApiResponse =
  /** status 200 OK */ number;
export type GetApiV1MaterialByMaterialIdStockAndWarehouseIdApiArg = {
  /** The ID of the material. */
  materialId: string;
  /** The ID of the warehouse. */
  warehouseId: string;
};
export type PostApiV1MaterialBatchConsumeApiResponse = unknown;
export type PostApiV1MaterialBatchConsumeApiArg = {
  batchId?: string;
  locationId?: string;
  quantity?: number;
};
export type GetApiV1MaterialByMaterialIdStockAcrossWarehousesApiResponse =
  /** status 200 OK */ WarehouseStockDto[];
export type GetApiV1MaterialByMaterialIdStockAcrossWarehousesApiArg = {
  /** The id of the material */
  materialId: string;
};
export type GetApiV1MaterialByMaterialIdDepartmentStockAndQuantityApiResponse =
  /** status 200 OK */ DepartmentDtoRead[];
export type GetApiV1MaterialByMaterialIdDepartmentStockAndQuantityApiArg = {
  /** The id of the material */
  materialId: string;
  /** The minimum quantity of the stock the department should have. */
  quantity: number;
};
export type PostApiV1MaterialUploadApiResponse = unknown;
export type PostApiV1MaterialUploadApiArg = {
  /** The kind of materials being imported. */
  kind?: MaterialKind;
  body: {
    file?: Blob;
  };
};
export type PutApiV1MaterialBatchStatusApiResponse = unknown;
export type PutApiV1MaterialBatchStatusApiArg = {
  /** The UpdateBatchStatusRequest object. */
  updateBatchStatusRequest: UpdateBatchStatusRequest;
};
export type PostApiV1MaterialBatchSupplyApiResponse = unknown;
export type PostApiV1MaterialBatchSupplyApiArg = {
  /** The SupplyMaterialBatchRequest object. */
  supplyMaterialBatchRequest: SupplyMaterialBatchRequest;
};
export type PostApiV1MaterialBatchMoveV2ApiResponse = unknown;
export type PostApiV1MaterialBatchMoveV2ApiArg = {
  /** The MoveShelfMaterialBatchRequest object. */
  moveShelfMaterialBatchRequest: MoveShelfMaterialBatchRequest;
};
export type GetApiV1MaterialApprovedMaterialsApiResponse =
  /** status 200 OK */ MaterialDetailsDtoIEnumerablePaginateable;
export type GetApiV1MaterialApprovedMaterialsApiArg = {
  /** The kind of material needed. */
  kind?: MaterialKind;
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1MaterialByMaterialIdBatchesV2ApiResponse =
  /** status 200 OK */ ShelfMaterialBatchDtoIEnumerablePaginateableRead;
export type GetApiV1MaterialByMaterialIdBatchesV2ApiArg = {
  /** The ID of the material. */
  materialId: string;
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search material */
  searchQuery?: string;
};
export type GetApiV1MaterialByMaterialIdStockWarehousesApiResponse =
  /** status 200 OK */ MaterialStockByWarehouseDto[];
export type GetApiV1MaterialByMaterialIdStockWarehousesApiArg = {
  /** The ID of the material. */
  materialId: string;
};
export type GetApiV1MaterialByMaterialIdStockDepartmentsApiResponse =
  /** status 200 OK */ MaterialStockByDepartmentDto[];
export type GetApiV1MaterialByMaterialIdStockDepartmentsApiArg = {
  /** The ID of the material. */
  materialId: string;
};
export type PostApiV1MaterialDepartmentApiResponse = unknown;
export type PostApiV1MaterialDepartmentApiArg = {
  /** The list of material departments to create. */
  body: CreateMaterialDepartment[];
};
export type GetApiV1MaterialDepartmentApiResponse =
  /** status 200 OK */ MaterialDepartmentWithWarehouseStockDtoIEnumerablePaginateable;
export type GetApiV1MaterialDepartmentApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
  /** The material kind to filter */
  kind?: MaterialKind;
  /** Optional department ID filter. */
  departmentId?: string;
};
export type GetApiV1MaterialDepartmentNotLinkedApiResponse =
  /** status 200 OK */ MaterialWithWarehouseStockDtoIEnumerablePaginateable;
export type GetApiV1MaterialDepartmentNotLinkedApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search material */
  searchQuery?: string;
  /** The material kind to filter */
  kind?: MaterialKind;
};
export type GetApiV1MaterialByMaterialIdUomApiResponse =
  /** status 200 OK */ UnitOfMeasureDto[];
export type GetApiV1MaterialByMaterialIdUomApiArg = {
  /** The material Id for which you need the uom */
  materialId: string;
};
export type GetApiV1PermissionModulesApiResponse =
  /** status 200 OK */ PermissionModuleDto[];
export type GetApiV1PermissionModulesApiArg = void;
export type GetApiV1PermissionApiResponse =
  /** status 200 OK */ PermissionDto[];
export type GetApiV1PermissionApiArg = void;
export type GetApiV1PermissionUserByUserIdApiResponse =
  /** status 200 OK */ PermissionModuleDto[];
export type GetApiV1PermissionUserByUserIdApiArg = {
  /** The user ID. */
  userId: string;
};
export type GetApiV1PermissionRoleByRoleIdApiResponse =
  /** status 200 OK */ PermissionModuleDto[];
export type GetApiV1PermissionRoleByRoleIdApiArg = {
  /** The role ID. */
  roleId: string;
};
export type PutApiV1PermissionRoleByRoleIdApiResponse = unknown;
export type PutApiV1PermissionRoleByRoleIdApiArg = {
  /** The role ID. */
  roleId: string;
  /** List of permission identifiers. */
  body: PermissionModuleDto[];
};
export type GetApiV1PermissionMenuApiResponse = /** status 200 OK */ MenuItem[];
export type GetApiV1PermissionMenuApiArg = void;
export type PostApiV1ProcurementManufacturerApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementManufacturerApiArg = {
  /** The CreateManufacturerRequest object. */
  createManufacturerRequest: CreateManufacturerRequest;
};
export type GetApiV1ProcurementManufacturerApiResponse =
  /** status 200 OK */ ManufacturerDtoIEnumerablePaginateable;
export type GetApiV1ProcurementManufacturerApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1ProcurementManufacturerByManufacturerIdApiResponse =
  /** status 200 OK */ ManufacturerDto;
export type GetApiV1ProcurementManufacturerByManufacturerIdApiArg = {
  /** The ID of the manufacturer. */
  manufacturerId: string;
};
export type PutApiV1ProcurementManufacturerByManufacturerIdApiResponse =
  unknown;
export type PutApiV1ProcurementManufacturerByManufacturerIdApiArg = {
  /** The ID of the manufacturer to update. */
  manufacturerId: string;
  /** The CreateManufacturerRequest object. */
  createManufacturerRequest: CreateManufacturerRequest;
};
export type DeleteApiV1ProcurementManufacturerByManufacturerIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementManufacturerByManufacturerIdApiArg = {
  /** The ID of the manufacturer to delete. */
  manufacturerId: string;
};
export type GetApiV1ProcurementManufacturerMaterialByMaterialIdApiResponse =
  /** status 200 OK */ ManufacturerDto[];
export type GetApiV1ProcurementManufacturerMaterialByMaterialIdApiArg = {
  /** The ID of the material. */
  materialId: string;
};
export type PostApiV1ProcurementSupplierApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementSupplierApiArg = {
  /** The CreateSupplierRequest object. */
  createSupplierRequest: CreateSupplierRequest;
};
export type GetApiV1ProcurementSupplierApiResponse =
  /** status 200 OK */ SupplierDtoIEnumerablePaginateable;
export type GetApiV1ProcurementSupplierApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1ProcurementSupplierBySupplierIdApiResponse =
  /** status 200 OK */ SupplierDto;
export type GetApiV1ProcurementSupplierBySupplierIdApiArg = {
  /** The ID of the supplier. */
  supplierId: string;
};
export type PutApiV1ProcurementSupplierBySupplierIdApiResponse = unknown;
export type PutApiV1ProcurementSupplierBySupplierIdApiArg = {
  /** The ID of the supplier to update. */
  supplierId: string;
  /** The CreateSupplierRequest object. */
  createSupplierRequest: CreateSupplierRequest;
};
export type DeleteApiV1ProcurementSupplierBySupplierIdApiResponse = unknown;
export type DeleteApiV1ProcurementSupplierBySupplierIdApiArg = {
  /** The ID of the supplier to delete. */
  supplierId: string;
};
export type PutApiV1ProcurementSupplierBySupplierIdStatusApiResponse = unknown;
export type PutApiV1ProcurementSupplierBySupplierIdStatusApiArg = {
  /** The ID of the supplier to update. */
  supplierId: string;
  /** The new status of the supplier. */
  updateSupplierStatusRequest: UpdateSupplierStatusRequest;
};
export type GetApiV1ProcurementSupplierMaterialByMaterialIdApiResponse =
  /** status 200 OK */ SupplierDto[];
export type GetApiV1ProcurementSupplierMaterialByMaterialIdApiArg = {
  /** The ID of the material. */
  materialId: string;
};
export type GetApiV1ProcurementSupplierByMaterialIdAndTypeApiResponse =
  /** status 200 OK */ SupplierDto[];
export type GetApiV1ProcurementSupplierByMaterialIdAndTypeApiArg = {
  /** The ID of the material. */
  materialId: string;
  /** The type of the supplier. */
  type: SupplierType;
};
export type PostApiV1ProcurementPurchaseOrderApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementPurchaseOrderApiArg = {
  /** The CreatePurchaseOrderRequest object. */
  createPurchaseOrderRequest: CreatePurchaseOrderRequest;
};
export type GetApiV1ProcurementPurchaseOrderApiResponse =
  /** status 200 OK */ PurchaseOrderDtoIEnumerablePaginateableRead;
export type GetApiV1ProcurementPurchaseOrderApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
  /** Filter by the status of the purchase order. (Pending, Delivered, Completed) */
  status?: PurchaseOrderStatus;
  /** Filter by the supplier type */
  type?: SupplierType;
};
export type GetApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiResponse =
  /** status 200 OK */ PurchaseOrderDtoRead;
export type GetApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg = {
  /** The ID of the purchase order. */
  purchaseOrderId: string;
};
export type PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiResponse =
  unknown;
export type PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg = {
  /** The ID of the purchase order you want to send to a supplier as an email. */
  purchaseOrderId: string;
  /** The request metadata to send purchase orders to suppliers. */
  sendPurchaseOrderRequest: SendPurchaseOrderRequest;
};
export type PutApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiResponse =
  unknown;
export type PutApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg = {
  /** The ID of the purchase order to update. */
  purchaseOrderId: string;
  /** The UpdatePurchaseOrderRequest object. */
  updatePurchaseOrderRequest: UpdatePurchaseOrderRequest;
};
export type DeleteApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg = {
  /** The ID of the purchase order to delete. */
  purchaseOrderId: string;
};
export type GetApiV1ProcurementPurchaseOrderRequisitionByPurchaseOrderIdAndMaterialIdApiResponse =
  /** status 200 OK */ string;
export type GetApiV1ProcurementPurchaseOrderRequisitionByPurchaseOrderIdAndMaterialIdApiArg =
  {
    /** The ID of the purchase order. */
    purchaseOrderId: string;
    /** The material ID to know the requisition */
    materialId: string;
  };
export type PostApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderIdApiResponse =
  unknown;
export type PostApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderIdApiArg =
  {
    /** The ID of the purchase order you want to send to a supplier as an email. */
    purchaseOrderId: string;
  };
export type PutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseApiResponse =
  unknown;
export type PutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseApiArg = {
  /** The ID of the purchase order to revise. */
  purchaseOrderId: string;
  /** The list of revisions to be made for the purchase order */
  body: CreatePurchaseOrderRevision[];
};
export type PostApiV1ProcurementPurchaseOrderInvoiceApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementPurchaseOrderInvoiceApiArg = {
  /** The CreatePurchaseOrderInvoiceRequest object. */
  createPurchaseOrderInvoiceRequest: CreatePurchaseOrderInvoiceRequest;
};
export type GetApiV1ProcurementPurchaseOrderInvoiceApiResponse =
  /** status 200 OK */ PurchaseOrderInvoiceDtoIEnumerablePaginateable;
export type GetApiV1ProcurementPurchaseOrderInvoiceApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
  /** Filter by supplier type */
  type?: SupplierType;
};
export type GetApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiResponse =
  /** status 200 OK */ PurchaseOrderInvoiceDto;
export type GetApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiArg = {
  /** The ID of the invoice. */
  invoiceId: string;
};
export type PutApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiResponse =
  unknown;
export type PutApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiArg = {
  /** The ID of the invoice to update. */
  invoiceId: string;
  /** The UpdatePurchaseOrderInvoiceRequest object. */
  createPurchaseOrderInvoiceRequest: CreatePurchaseOrderInvoiceRequest;
};
export type DeleteApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiArg = {
  /** The ID of the invoice to delete. */
  invoiceId: string;
};
export type PostApiV1ProcurementBillingSheetApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementBillingSheetApiArg = {
  /** The CreateBillingSheetRequest object. */
  createBillingSheetRequest: CreateBillingSheetRequest;
};
export type GetApiV1ProcurementBillingSheetApiResponse =
  /** status 200 OK */ BillingSheetDtoIEnumerablePaginateable;
export type GetApiV1ProcurementBillingSheetApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
  /** The status of the billing sheet( 0 -> Pending, 1 -> Paid */
  status?: BillingSheetStatus;
};
export type GetApiV1ProcurementBillingSheetByBillingSheetIdApiResponse =
  /** status 200 OK */ BillingSheetDto;
export type GetApiV1ProcurementBillingSheetByBillingSheetIdApiArg = {
  /** The ID of the billing sheet. */
  billingSheetId: string;
};
export type PutApiV1ProcurementBillingSheetByBillingSheetIdApiResponse =
  unknown;
export type PutApiV1ProcurementBillingSheetByBillingSheetIdApiArg = {
  /** The ID of the billing sheet to update. */
  billingSheetId: string;
  /** The UpdateBillingSheetRequest object. */
  createBillingSheetRequest: CreateBillingSheetRequest;
};
export type DeleteApiV1ProcurementBillingSheetByBillingSheetIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementBillingSheetByBillingSheetIdApiArg = {
  /** The ID of the billing sheet to delete. */
  billingSheetId: string;
};
export type PostApiV1ProcurementShipmentDocumentApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementShipmentDocumentApiArg = {
  /** The CreateShipmentDocumentRequest object. */
  createShipmentDocumentRequest: CreateShipmentDocumentRequest;
};
export type GetApiV1ProcurementShipmentDocumentApiResponse =
  /** status 200 OK */ ShipmentDocumentDtoIEnumerablePaginateable;
export type GetApiV1ProcurementShipmentDocumentApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiResponse =
  /** status 200 OK */ ShipmentDocumentDto;
export type GetApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiArg = {
  /** The ID of the shipment document. */
  shipmentDocumentId: string;
};
export type PutApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiResponse =
  unknown;
export type PutApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiArg = {
  /** The ID of the shipment document to update. */
  shipmentDocumentId: string;
  /** The CreateShipmentDocumentRequest object. */
  createShipmentDocumentRequest: CreateShipmentDocumentRequest;
};
export type DeleteApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiArg = {
  /** The ID of the shipment document to delete. */
  shipmentDocumentId: string;
};
export type PostApiV1ProcurementWaybillApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementWaybillApiArg = {
  /** The CreateShipmentDocumentRequest object. */
  createShipmentDocumentRequest: CreateShipmentDocumentRequest;
};
export type GetApiV1ProcurementWaybillApiResponse =
  /** status 200 OK */ ShipmentDocumentDtoIEnumerablePaginateable;
export type GetApiV1ProcurementWaybillApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
  /** The status of the shipment. (0 -> New, 1 -> In Transit, 2 -> Cleared, 3 -> Arrived. */
  status?: ShipmentStatus;
};
export type GetApiV1ProcurementWaybillByWaybillIdApiResponse =
  /** status 200 OK */ ShipmentDocumentDto;
export type GetApiV1ProcurementWaybillByWaybillIdApiArg = {
  /** The ID of the waybill. */
  waybillId: string;
};
export type PutApiV1ProcurementWaybillByWaybillIdApiResponse = unknown;
export type PutApiV1ProcurementWaybillByWaybillIdApiArg = {
  /** The ID of the waybill to update. */
  waybillId: string;
  /** The CreateShipmentDocumentRequest object. */
  createShipmentDocumentRequest: CreateShipmentDocumentRequest;
};
export type DeleteApiV1ProcurementWaybillByWaybillIdApiResponse = unknown;
export type DeleteApiV1ProcurementWaybillByWaybillIdApiArg = {
  /** The ID of the waybill to delete. */
  waybillId: string;
};
export type PutApiV1ProcurementShipmentDocumentByShipmentDocumentIdArrivedApiResponse =
  unknown;
export type PutApiV1ProcurementShipmentDocumentByShipmentDocumentIdArrivedApiArg =
  {
    /** The ID of the shipment document. */
    shipmentDocumentId: string;
  };
export type PutApiV1ProcurementShipmentsByShipmentIdStatusApiResponse = unknown;
export type PutApiV1ProcurementShipmentsByShipmentIdStatusApiArg = {
  /** The ID of the shipment document. */
  shipmentId: string;
  updateShipmentStatusRequest: UpdateShipmentStatusRequest;
};
export type GetApiV1ProcurementShipmentDocumentArrivedApiResponse =
  /** status 200 OK */ ShipmentDocumentDtoIEnumerablePaginateable;
export type GetApiV1ProcurementShipmentDocumentArrivedApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type PostApiV1ProcurementShipmentInvoiceApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementShipmentInvoiceApiArg = {
  createShipmentInvoice: CreateShipmentInvoice;
};
export type GetApiV1ProcurementShipmentInvoiceApiResponse =
  /** status 200 OK */ ShipmentInvoiceDtoIEnumerablePaginateable;
export type GetApiV1ProcurementShipmentInvoiceApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1ProcurementShipmentInvoiceByIdApiResponse =
  /** status 200 OK */ ShipmentInvoiceDto;
export type GetApiV1ProcurementShipmentInvoiceByIdApiArg = {
  id: string;
};
export type GetApiV1ProcurementShipmentInvoiceUnattachedApiResponse =
  /** status 200 OK */ ShipmentInvoiceDto[];
export type GetApiV1ProcurementShipmentInvoiceUnattachedApiArg = void;
export type GetApiV1ProcurementShipmentInvoiceShipmentDocumentByShipmentDocumentIdApiResponse =
  /** status 200 OK */ ShipmentInvoiceDto;
export type GetApiV1ProcurementShipmentInvoiceShipmentDocumentByShipmentDocumentIdApiArg =
  {
    shipmentDocumentId: string;
  };
export type PutApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdApiResponse =
  unknown;
export type PutApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdApiArg = {
  shipmentInvoiceId: string;
  createShipmentInvoice: CreateShipmentInvoice;
};
export type DeleteApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdApiArg = {
  shipmentInvoiceId: string;
};
export type PostApiV1ProcurementShipmentDiscrepancyApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementShipmentDiscrepancyApiArg = {
  createShipmentDiscrepancy: CreateShipmentDiscrepancy;
};
export type GetApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiResponse =
  /** status 200 OK */ ShipmentDiscrepancyDto;
export type GetApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiArg =
  {
    shipmentDiscrepancyId: string;
  };
export type PutApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiResponse =
  unknown;
export type PutApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiArg =
  {
    shipmentDiscrepancyId: string;
    createShipmentDiscrepancy: CreateShipmentDiscrepancy;
  };
export type DeleteApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiArg =
  {
    shipmentDiscrepancyId: string;
  };
export type GetApiV1ProcurementPurchaseOrderNotLinkedApiResponse =
  /** status 200 OK */ SupplierDto[];
export type GetApiV1ProcurementPurchaseOrderNotLinkedApiArg = void;
export type GetApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinkedApiResponse =
  /** status 200 OK */ PurchaseOrderDtoRead[];
export type GetApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinkedApiArg =
  {
    /** The ID of the supplier. */
    supplierId: string;
  };
export type PostApiV1ProcurementMaterialsByPurchaseOrdersApiResponse =
  /** status 200 OK */ MaterialDto[];
export type PostApiV1ProcurementMaterialsByPurchaseOrdersApiArg = {
  /** A list of purchase order IDs. */
  body: string[];
};
export type GetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionApiResponse =
  /** status 200 OK */ MaterialDistributionDtoRead;
export type GetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionApiArg =
  {
    /** The ID of the shipment document. */
    shipmentDocumentId: string;
  };
export type PostApiV1ProcurementByShipmentDocumentIdConfirmDistributionAndMaterialIdApiResponse =
  unknown;
export type PostApiV1ProcurementByShipmentDocumentIdConfirmDistributionAndMaterialIdApiArg =
  {
    /** The shipment document id for which you want to approve distribution */
    shipmentDocumentId: string;
    materialId: string;
  };
export type PostApiV1ProcurementByShipmentDocumentIdConfirmDistributionApiResponse =
  unknown;
export type PostApiV1ProcurementByShipmentDocumentIdConfirmDistributionApiArg =
  {
    /** The shipment document id for which you want to approve distribution */
    shipmentDocumentId: string;
  };
export type PostApiV1ProductApiResponse = /** status 201 Created */ string;
export type PostApiV1ProductApiArg = {
  createProductRequest: CreateProductRequest;
};
export type GetApiV1ProductApiResponse =
  /** status 200 OK */ ProductListDtoIEnumerablePaginateableRead;
export type GetApiV1ProductApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1ProductByProductIdApiResponse =
  /** status 200 OK */ ProductDtoRead;
export type GetApiV1ProductByProductIdApiArg = {
  productId: string;
};
export type PutApiV1ProductByProductIdApiResponse = unknown;
export type PutApiV1ProductByProductIdApiArg = {
  productId: string;
  updateProductRequest: UpdateProductRequest;
};
export type DeleteApiV1ProductByProductIdApiResponse = unknown;
export type DeleteApiV1ProductByProductIdApiArg = {
  productId: string;
};
export type PutApiV1ProductPackageDescriptionByProductIdApiResponse = unknown;
export type PutApiV1ProductPackageDescriptionByProductIdApiArg = {
  productId: string;
  updateProductPackageDescriptionRequest: UpdateProductPackageDescriptionRequest;
};
export type GetApiV1ProductByProductIdBomApiResponse =
  /** status 200 OK */ ProductBillOfMaterialDto;
export type GetApiV1ProductByProductIdBomApiArg = {
  productId: string;
};
export type PostApiV1ProductByProductIdRoutesApiResponse = unknown;
export type PostApiV1ProductByProductIdRoutesApiArg = {
  productId: string;
  body: CreateRouteRequest[];
};
export type GetApiV1ProductByProductIdRoutesApiResponse = unknown;
export type GetApiV1ProductByProductIdRoutesApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  productId: string;
};
export type GetApiV1ProductRoutesByRouteIdApiResponse =
  /** status 200 OK */ RouteDtoRead;
export type GetApiV1ProductRoutesByRouteIdApiArg = {
  routeId: string;
};
export type DeleteApiV1ProductRoutesByRouteIdApiResponse = unknown;
export type DeleteApiV1ProductRoutesByRouteIdApiArg = {
  routeId: string;
};
export type PostApiV1ProductByProductIdPackagesApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductByProductIdPackagesApiArg = {
  productId: string;
  body: CreateProductPackageRequest[];
};
export type GetApiV1ProductByProductIdPackagesApiResponse = unknown;
export type GetApiV1ProductByProductIdPackagesApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  productId: string;
};
export type GetApiV1ProductPackagesByProductPackageIdApiResponse =
  /** status 200 OK */ ProductPackageDto;
export type GetApiV1ProductPackagesByProductPackageIdApiArg = {
  productPackageId: string;
};
export type PutApiV1ProductPackagesByProductPackageIdApiResponse = unknown;
export type PutApiV1ProductPackagesByProductPackageIdApiArg = {
  productPackageId: string;
  createProductPackageRequest: CreateProductPackageRequest;
};
export type DeleteApiV1ProductPackagesByProductPackageIdApiResponse = unknown;
export type DeleteApiV1ProductPackagesByProductPackageIdApiArg = {
  productPackageId: string;
};
export type PostApiV1ProductByProductIdFinishedApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductByProductIdFinishedApiArg = {
  productId: string;
  body: CreateFinishedProductRequest[];
};
export type PutApiV1ProductByProductIdBomArchiveApiResponse = unknown;
export type PutApiV1ProductByProductIdBomArchiveApiArg = {
  /** The ID of the Product for which the bom should be archived. */
  productId: string;
};
export type PostApiV1ProductEquipmentApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductEquipmentApiArg = {
  createEquipmentRequest: CreateEquipmentRequest;
};
export type GetApiV1ProductEquipmentApiResponse =
  /** status 200 OK */ EquipmentDtoIEnumerablePaginateable;
export type GetApiV1ProductEquipmentApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1ProductEquipmentByEquipmentIdApiResponse =
  /** status 200 OK */ EquipmentDto;
export type GetApiV1ProductEquipmentByEquipmentIdApiArg = {
  equipmentId: string;
};
export type PutApiV1ProductEquipmentByEquipmentIdApiResponse = unknown;
export type PutApiV1ProductEquipmentByEquipmentIdApiArg = {
  equipmentId: string;
  createEquipmentRequest: CreateEquipmentRequest;
};
export type DeleteApiV1ProductEquipmentByEquipmentIdApiResponse = unknown;
export type DeleteApiV1ProductEquipmentByEquipmentIdApiArg = {
  equipmentId: string;
};
export type GetApiV1ProductEquipmentAllApiResponse =
  /** status 200 OK */ EquipmentDto[];
export type GetApiV1ProductEquipmentAllApiArg = void;
export type PostApiV1ProductionScheduleApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionScheduleApiArg = {
  /** The CreateProductionScheduleRequest object. */
  createProductionScheduleRequest: CreateProductionScheduleRequest;
};
export type GetApiV1ProductionScheduleApiResponse =
  /** status 200 OK */ ProductionScheduleDtoIEnumerablePaginateableRead;
export type GetApiV1ProductionScheduleApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1ProductionScheduleByScheduleIdApiResponse =
  /** status 200 OK */ ProductionScheduleDtoRead;
export type GetApiV1ProductionScheduleByScheduleIdApiArg = {
  /** The ID of the Production Schedule. */
  scheduleId: string;
};
export type PutApiV1ProductionScheduleByScheduleIdApiResponse = unknown;
export type PutApiV1ProductionScheduleByScheduleIdApiArg = {
  /** The ID of the Production Schedule to be updated. */
  scheduleId: string;
  /** The UpdateProductionScheduleRequest object containing updated data. */
  updateProductionScheduleRequest: UpdateProductionScheduleRequest;
};
export type DeleteApiV1ProductionScheduleByScheduleIdApiResponse = unknown;
export type DeleteApiV1ProductionScheduleByScheduleIdApiArg = {
  /** The ID of the Production Schedule to be deleted. */
  scheduleId: string;
};
export type GetApiV1ProductionScheduleByProductionScheduleIdProductAndProductIdApiResponse =
  /** status 200 OK */ ProductionScheduleProductDtoRead;
export type GetApiV1ProductionScheduleByProductionScheduleIdProductAndProductIdApiArg =
  {
    /** The ID of the Production Schedule. */
    productionScheduleId: string;
    /** The ID of the Product. */
    productId: string;
  };
export type GetApiV1ProductionScheduleProductionStatusApiResponse =
  /** status 200 Returns the list of production status */ TypeResponse[];
export type GetApiV1ProductionScheduleProductionStatusApiArg = void;
export type GetApiV1ProductionScheduleByScheduleIdDetailsApiResponse =
  /** status 200 OK */ ProductionScheduleProcurementDto[];
export type GetApiV1ProductionScheduleByScheduleIdDetailsApiArg = {
  /** The ID of the Production Schedule. */
  scheduleId: string;
};
export type GetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdApiResponse =
  /** status 200 OK */ ProductionScheduleProcurementDto[];
export type GetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdApiArg =
  {
    productionScheduleId: string;
    productId: string;
    status?: MaterialRequisitionStatus;
  };
export type GetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdApiResponse =
  /** status 200 OK */ ProductionScheduleProcurementPackageDto[];
export type GetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdApiArg =
  {
    productionScheduleId: string;
    productId: string;
    status?: MaterialRequisitionStatus;
  };
export type GetApiV1ProductionScheduleByProductionScheduleIdMaterialsWithInsufficientStockAndProductIdApiResponse =
  /** status 200 OK */ ProductionScheduleProcurementDto[];
export type GetApiV1ProductionScheduleByProductionScheduleIdMaterialsWithInsufficientStockAndProductIdApiArg =
  {
    /** The ID of the Production Schedule. */
    productionScheduleId: string;
    /** The ID of the Product. */
    productId: string;
  };
export type GetApiV1ProductionScheduleByProductionScheduleIdPackageMaterialsWithInsufficientStockAndProductIdApiResponse =
  /** status 200 OK */ ProductionScheduleProcurementPackageDto[];
export type GetApiV1ProductionScheduleByProductionScheduleIdPackageMaterialsWithInsufficientStockAndProductIdApiArg =
  {
    /** The ID of the Production Schedule. */
    productionScheduleId: string;
    /** The ID of the Product. */
    productId: string;
  };
export type PostApiV1ProductionScheduleActivityStartByProductionScheduleIdAndProductIdApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionScheduleActivityStartByProductionScheduleIdAndProductIdApiArg =
  {
    /** The Production Schedule ID. */
    productionScheduleId: string;
    /** The Product ID. */
    productId: string;
  };
export type GetApiV1ProductionScheduleActivityApiResponse =
  /** status 200 OK */ ProductionActivityDtoIEnumerablePaginateable;
export type GetApiV1ProductionScheduleActivityApiArg = {
  userIds?: string[];
  status?: ProductionStatus;
  pageSize?: number;
  page?: number;
  sortLabel?: string;
  sortDirection?: SortDirection;
};
export type GetApiV1ProductionScheduleActivityByProductionActivityIdApiResponse =
  /** status 200 OK */ ProductionActivityDto;
export type GetApiV1ProductionScheduleActivityByProductionActivityIdApiArg = {
  /** The ID of the Production Activity. */
  productionActivityId: string;
};
export type GetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdApiResponse =
  /** status 200 OK */ ProductionActivityDto;
export type GetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdApiArg =
  {
    /** The Production Schedule ID. */
    productionScheduleId: string;
    /** The Product ID. */
    productId: string;
  };
export type GetApiV1ProductionScheduleActivityStatusGroupedApiResponse =
  /** status 200 OK */ {
    [key: string]: ProductionActivityDto[];
  };
export type GetApiV1ProductionScheduleActivityStatusGroupedApiArg = void;
export type GetApiV1ProductionScheduleActivityOperationGroupedApiResponse =
  /** status 200 OK */ ProductionActivityGroupResultDtoRead[];
export type GetApiV1ProductionScheduleActivityOperationGroupedApiArg = void;
export type PutApiV1ProductionScheduleActivityStepByProductionStepIdStatusApiResponse =
  unknown;
export type PutApiV1ProductionScheduleActivityStepByProductionStepIdStatusApiArg =
  {
    /** The ID of the Production Step. */
    productionStepId: string;
    /** The new status to set. */
    status?: ProductionStatus;
  };
export type GetApiV1ProductionScheduleActivityStepApiResponse =
  /** status 200 OK */ ProductionActivityStepDtoIEnumerablePaginateable;
export type GetApiV1ProductionScheduleActivityStepApiArg = {
  userIds?: string[];
  status?: ProductionStatus;
  pageSize?: number;
  page?: number;
  sortLabel?: string;
  sortDirection?: SortDirection;
};
export type GetApiV1ProductionScheduleActivityStepByProductionActivityStepIdApiResponse =
  /** status 200 OK */ ProductionActivityStepDto;
export type GetApiV1ProductionScheduleActivityStepByProductionActivityStepIdApiArg =
  {
    /** The ID of the Production Activity Step. */
    productionActivityStepId: string;
  };
export type GetApiV1ProductionScheduleActivityStepStatusGroupedApiResponse =
  /** status 200 OK */ {
    [key: string]: ProductionActivityStepDto[];
  };
export type GetApiV1ProductionScheduleActivityStepStatusGroupedApiArg = void;
export type GetApiV1ProductionScheduleActivityStepOperationGroupedApiResponse =
  /** status 200 OK */ {
    [key: string]: ProductionActivityStepDto[];
  };
export type GetApiV1ProductionScheduleActivityStepOperationGroupedApiArg = void;
export type PostApiV1ProductionScheduleManufacturingApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionScheduleManufacturingApiArg = {
  createBatchManufacturingRecord: CreateBatchManufacturingRecord;
};
export type GetApiV1ProductionScheduleManufacturingApiResponse =
  /** status 200 OK */ BatchManufacturingRecordDtoIEnumerablePaginateableRead;
export type GetApiV1ProductionScheduleManufacturingApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdApiResponse =
  /** status 200 OK */ BatchManufacturingRecordDtoRead;
export type GetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdApiArg =
  {
    productionId: string;
    productionScheduleId: string;
  };
export type PostApiV1ProductionScheduleFinishedGoodsTransferNoteApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionScheduleFinishedGoodsTransferNoteApiArg = {
  createFinishedGoodsTransferNoteRequest: CreateFinishedGoodsTransferNoteRequest;
};
export type GetApiV1ProductionScheduleManufacturingByIdApiResponse =
  /** status 200 OK */ BatchManufacturingRecordDtoRead;
export type GetApiV1ProductionScheduleManufacturingByIdApiArg = {
  id: string;
};
export type PutApiV1ProductionScheduleManufacturingByIdApiResponse = unknown;
export type PutApiV1ProductionScheduleManufacturingByIdApiArg = {
  id: string;
  updateBatchManufacturingRecord: UpdateBatchManufacturingRecord;
};
export type PutApiV1ProductionScheduleManufacturingIssueByIdApiResponse =
  unknown;
export type PutApiV1ProductionScheduleManufacturingIssueByIdApiArg = {
  id: string;
};
export type PostApiV1ProductionSchedulePackagingApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionSchedulePackagingApiArg = {
  createBatchPackagingRecord: CreateBatchPackagingRecord;
};
export type GetApiV1ProductionSchedulePackagingApiResponse =
  /** status 200 OK */ BatchPackagingRecordDtoIEnumerablePaginateable;
export type GetApiV1ProductionSchedulePackagingApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1ProductionSchedulePackagingByIdApiResponse =
  /** status 200 OK */ BatchPackagingRecordDto;
export type GetApiV1ProductionSchedulePackagingByIdApiArg = {
  id: string;
};
export type PutApiV1ProductionSchedulePackagingByIdApiResponse = unknown;
export type PutApiV1ProductionSchedulePackagingByIdApiArg = {
  id: string;
  updateBatchPackagingRecord: UpdateBatchPackagingRecord;
};
export type PutApiV1ProductionSchedulePackagingIssueByIdApiResponse = unknown;
export type PutApiV1ProductionSchedulePackagingIssueByIdApiArg = {
  id: string;
};
export type PostApiV1ProductionScheduleStockTransferApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionScheduleStockTransferApiArg = {
  createStockTransferRequest: CreateStockTransferRequest;
};
export type GetApiV1ProductionScheduleStockTransferApiResponse =
  /** status 200 OK */ StockTransferDtoRead[];
export type GetApiV1ProductionScheduleStockTransferApiArg = {
  fromDepartmentId?: string;
  toDepartmentId?: string;
  materialId?: string;
};
export type GetApiV1ProductionScheduleStockTransferInBoundApiResponse =
  /** status 200 OK */ DepartmentStockTransferDtoIEnumerablePaginateableRead;
export type GetApiV1ProductionScheduleStockTransferInBoundApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  status?: StockTransferStatus;
  toDepartmentId?: string;
};
export type GetApiV1ProductionScheduleStockTransferOutBoundApiResponse =
  /** status 200 OK */ DepartmentStockTransferDtoIEnumerablePaginateableRead;
export type GetApiV1ProductionScheduleStockTransferOutBoundApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  status?: StockTransferStatus;
  fromDepartmentId?: string;
};
export type GetApiV1ProductionScheduleStockTransferByStockTransferIdApiResponse =
  /** status 200 OK */ DepartmentStockTransferDtoRead;
export type GetApiV1ProductionScheduleStockTransferByStockTransferIdApiArg = {
  stockTransferId: string;
};
export type PutApiV1ProductionScheduleStockTransferApproveByStockTransferIdApiResponse =
  unknown;
export type PutApiV1ProductionScheduleStockTransferApproveByStockTransferIdApiArg =
  {
    stockTransferId: string;
  };
export type PutApiV1ProductionScheduleStockTransferRejectByStockTransferIdApiResponse =
  unknown;
export type PutApiV1ProductionScheduleStockTransferRejectByStockTransferIdApiArg =
  {
    stockTransferId: string;
  };
export type GetApiV1ProductionScheduleStockTransferBatchByStockTransferIdApiResponse =
  /** status 200 OK */ BatchToSupplyRead[];
export type GetApiV1ProductionScheduleStockTransferBatchByStockTransferIdApiArg =
  {
    stockTransferId: string;
  };
export type PutApiV1ProductionScheduleStockTransferIssueByStockTransferIdApiResponse =
  unknown;
export type PutApiV1ProductionScheduleStockTransferIssueByStockTransferIdApiArg =
  {
    stockTransferId: string;
    body: BatchTransferRequest[];
  };
export type PostApiV1ProductionScheduleFinalPackingApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionScheduleFinalPackingApiArg = {
  /** The CreateFinalPacking object. */
  createFinalPacking: CreateFinalPacking;
};
export type GetApiV1ProductionScheduleFinalPackingApiResponse =
  /** status 200 OK */ FinalPackingDtoIEnumerablePaginateable;
export type GetApiV1ProductionScheduleFinalPackingApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1ProductionScheduleFinalPackingByFinalPackingIdApiResponse =
  /** status 200 OK */ FinalPackingDto;
export type GetApiV1ProductionScheduleFinalPackingByFinalPackingIdApiArg = {
  /** The ID of the Final Packing. */
  finalPackingId: string;
};
export type PutApiV1ProductionScheduleFinalPackingByFinalPackingIdApiResponse =
  unknown;
export type PutApiV1ProductionScheduleFinalPackingByFinalPackingIdApiArg = {
  /** The ID of the Final Packing to be updated. */
  finalPackingId: string;
  /** The CreateFinalPacking object containing updated data. */
  createFinalPacking: CreateFinalPacking;
};
export type DeleteApiV1ProductionScheduleFinalPackingByFinalPackingIdApiResponse =
  unknown;
export type DeleteApiV1ProductionScheduleFinalPackingByFinalPackingIdApiArg = {
  /** The ID of the Final Packing to be deleted. */
  finalPackingId: string;
};
export type GetApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductIdApiResponse =
  /** status 200 OK */ FinalPackingDto;
export type GetApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductIdApiArg =
  {
    /** The Production Schedule ID. */
    productionScheduleId: string;
    /** The Product ID. */
    productId: string;
  };
export type GetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdApiResponse =
  /** status 200 OK */ RequisitionDtoRead;
export type GetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdApiArg =
  {
    /** The Production Schedule ID. */
    productionScheduleId: string;
    /** The Product ID. */
    productId: string;
  };
export type PostApiV1ProductionScheduleReturnBeforeProductionApiResponse =
  unknown;
export type PostApiV1ProductionScheduleReturnBeforeProductionApiArg = {
  /** The ID of the Production Schedule. */
  productionScheduleId?: string;
  /** The ID of the Product. */
  productId?: string;
};
export type PostApiV1ProductionScheduleReturnAfterProductionApiResponse =
  unknown;
export type PostApiV1ProductionScheduleReturnAfterProductionApiArg = {
  /** The ID of the Production Schedule. */
  productionScheduleId?: string;
  /** The ID of the Product. */
  productId?: string;
  /** The list of partially used materials to return. */
  body: PartialMaterialToReturn[];
};
export type GetApiV1ProductionScheduleMaterialReturnNoteApiResponse =
  /** status 200 OK */ MaterialReturnNoteDtoIEnumerablePaginateable;
export type GetApiV1ProductionScheduleMaterialReturnNoteApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1ProductionScheduleMaterialReturnNoteByMaterialReturnNoteIdApiResponse =
  /** status 200 OK */ MaterialReturnNoteDto;
export type GetApiV1ProductionScheduleMaterialReturnNoteByMaterialReturnNoteIdApiArg =
  {
    /** The ID of the Material Return Note. */
    materialReturnNoteId: string;
  };
export type PutApiV1ProductionScheduleMaterialReturnNoteCompleteByMaterialReturnNoteIdApiResponse =
  unknown;
export type PutApiV1ProductionScheduleMaterialReturnNoteCompleteByMaterialReturnNoteIdApiArg =
  {
    /** The ID of the Material Return Note. */
    materialReturnNoteId: string;
  };
export type PostApiV1ProductionScheduleExtraPackingByProductionScheduleIdAndProductIdApiResponse =
  unknown;
export type PostApiV1ProductionScheduleExtraPackingByProductionScheduleIdAndProductIdApiArg =
  {
    /** The ID of the Production Schedule. */
    productionScheduleId: string;
    /** The ID of the Product. */
    productId: string;
    /** List of Extra Packing details to create. */
    body: CreateProductionExtraPacking[];
  };
export type GetApiV1ProductionScheduleExtraPackingApiResponse =
  /** status 200 OK */ ProductionExtraPackingWithBatchesDtoIEnumerablePaginateable;
export type GetApiV1ProductionScheduleExtraPackingApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1ProductionScheduleExtraPackingByProductionExtraPackingIdApiResponse =
  /** status 200 OK */ ProductionExtraPackingWithBatchesDto;
export type GetApiV1ProductionScheduleExtraPackingByProductionExtraPackingIdApiArg =
  {
    /** The ID of the Extra Packing. */
    productionExtraPackingId: string;
  };
export type GetApiV1ProductionScheduleExtraPackingByProductbyProductionScheduleIdAndProductIdApiResponse =
  /** status 200 OK */ ProductionExtraPackingWithBatchesDto[];
export type GetApiV1ProductionScheduleExtraPackingByProductbyProductionScheduleIdAndProductIdApiArg =
  {
    /** The production schedule Id linked to the extra packing> */
    productionScheduleId: string;
    /** The product Id linked to the extra paccking */
    productId: string;
  };
export type GetApiV1ProductionScheduleExtraPackingBatchesToSupplyByExtraPackingMaterialIdApiResponse =
  /** status 200 OK */ BatchToSupplyRead[];
export type GetApiV1ProductionScheduleExtraPackingBatchesToSupplyByExtraPackingMaterialIdApiArg =
  {
    /** The ID of the Extra Packing Material. */
    extraPackingMaterialId: string;
  };
export type PostApiV1ProductionScheduleExtraPackingApproveByProductionExtraPackingIdApiResponse =
  unknown;
export type PostApiV1ProductionScheduleExtraPackingApproveByProductionExtraPackingIdApiArg =
  {
    /** The ID of the Extra Packing. */
    productionExtraPackingId: string;
    /** The list of batches for approval. */
    body: BatchTransferRequest[];
  };
export type PostApiV1RequisitionApiResponse = unknown;
export type PostApiV1RequisitionApiArg = {
  /** The CreateRequisitionRequest object. */
  createRequisitionRequest: CreateRequisitionRequest;
};
export type GetApiV1RequisitionApiResponse =
  /** status 200 OK */ RequisitionDtoIEnumerablePaginateableRead;
export type GetApiV1RequisitionApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
  /** Filter by status of the requisition. */
  status?: RequestStatus;
  /** Filter between stock and purchase requisitions. (Stock = 0, Purchase =  1) */
  type?: RequisitionType;
};
export type GetApiV1RequisitionDepartmentApiResponse =
  /** status 200 OK */ RequisitionDtoIEnumerablePaginateableRead;
export type GetApiV1RequisitionDepartmentApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
  /** Filter by status of the requisition. */
  status?: RequestStatus;
  /** Filter between stock and purchase requisitions. (Stock = 0, Purchase =  1) */
  type?: RequisitionType;
  kind?: MaterialKind;
};
export type GetApiV1RequisitionByRequisitionIdApiResponse =
  /** status 200 OK */ RequisitionDtoRead;
export type GetApiV1RequisitionByRequisitionIdApiArg = {
  /** The ID of the Stock Requisition. */
  requisitionId: string;
};
export type PostApiV1RequisitionIssueStockRequisitionByStockRequisitionIdApiResponse =
  unknown;
export type PostApiV1RequisitionIssueStockRequisitionByStockRequisitionIdApiArg =
  {
    stockRequisitionId: string;
  };
export type PostApiV1RequisitionByRequisitionIdIssueApiResponse = unknown;
export type PostApiV1RequisitionByRequisitionIdIssueApiArg = {
  /** The ID of the Stock Requisition being issued. */
  requisitionId: string;
  /** The ApproveRequisitionRequest object. */
  approveRequisitionRequest: ApproveRequisitionRequest;
};
export type PostApiV1RequisitionSourceApiResponse = /** status 200 OK */ string;
export type PostApiV1RequisitionSourceApiArg = {
  /** The CreateSourceRequisitionRequest object. */
  createSourceRequisitionRequest: CreateSourceRequisitionRequest;
};
export type GetApiV1RequisitionSourceApiResponse =
  /** status 200 OK */ SourceRequisitionDtoIEnumerablePaginateable;
export type GetApiV1RequisitionSourceApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1RequisitionSourceBySourceRequisitionIdApiResponse =
  /** status 200 OK */ SourceRequisitionDto;
export type GetApiV1RequisitionSourceBySourceRequisitionIdApiArg = {
  /** The ID of the Source Requisition. */
  sourceRequisitionId: string;
};
export type PutApiV1RequisitionSourceBySourceRequisitionIdApiResponse = unknown;
export type PutApiV1RequisitionSourceBySourceRequisitionIdApiArg = {
  /** The ID of the Source Requisition to update. */
  sourceRequisitionId: string;
  /** The CreateSourceRequisitionRequest object. */
  createSourceRequisitionRequest: CreateSourceRequisitionRequest;
};
export type DeleteApiV1RequisitionSourceBySourceRequisitionIdApiResponse =
  unknown;
export type DeleteApiV1RequisitionSourceBySourceRequisitionIdApiArg = {
  /** The ID of the Source Requisition to delete. */
  sourceRequisitionId: string;
};
export type GetApiV1RequisitionSourceItemsApiResponse =
  /** status 200 OK */ SourceRequisitionItemDtoIEnumerablePaginateable;
export type GetApiV1RequisitionSourceItemsApiArg = {
  /** The procurement source of the material(e.g., Local, Foreign, Internal). */
  source?: ProcurementSource;
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
};
export type GetApiV1RequisitionSourceSupplierApiResponse =
  /** status 200 OK */ SupplierQuotationDtoIEnumerablePaginateable;
export type GetApiV1RequisitionSourceSupplierApiArg = {
  /** The source of the requisition. (example Local, Foreign) */
  source?: SupplierType;
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Filter by whether a quotation has been sent. */
  sent?: boolean;
};
export type GetApiV1RequisitionSourceSupplierBySupplierIdApiResponse =
  /** status 200 OK */ SupplierQuotationDto;
export type GetApiV1RequisitionSourceSupplierBySupplierIdApiArg = {
  /** The id of the supplier with associated requisition items. */
  supplierId: string;
};
export type PostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationApiResponse =
  unknown;
export type PostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationApiArg =
  {
    /** The ID of the supplier. */
    supplierId: string;
  };
export type GetApiV1RequisitionSourceSupplierQuotationApiResponse =
  /** status 200 OK */ SupplierQuotationDtoIEnumerablePaginateable;
export type GetApiV1RequisitionSourceSupplierQuotationApiArg = {
  /** The type of the supplier (example Foreign, Local). */
  supplierType?: SupplierType;
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Filter by whether the quotation has been received. */
  received?: boolean;
};
export type GetApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationApiResponse =
  /** status 200 OK */ SupplierQuotationDto;
export type GetApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationApiArg =
  {
    /** The ID of the supplier quotation. */
    supplierQuotationId: string;
  };
export type PostApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationReceiveApiResponse =
  unknown;
export type PostApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationReceiveApiArg =
  {
    /** The ID of the supplier quotation. */
    supplierQuotationId: string;
    /** The list of quotations received from the supplier. */
    body: SupplierQuotationResponseDto[];
  };
export type GetApiV1RequisitionSourceMaterialPriceComparisonApiResponse =
  /** status 200 OK */ SupplierPriceComparison[];
export type GetApiV1RequisitionSourceMaterialPriceComparisonApiArg = {
  /** The type of the supplier (example Local, Foreign). */
  supplierType?: SupplierType;
};
export type GetApiV1RequisitionSourceMaterialPriceComparisonByMaterialApiResponse =
  /** status 200 OK */ SupplierPriceComparison[];
export type GetApiV1RequisitionSourceMaterialPriceComparisonByMaterialApiArg = {
  /** The type of the supplier (example Local, Foreign). */
  supplierType?: SupplierType;
  /** The materialId of the item */
  materialId?: string;
  /** The purchase order associated */
  purchaseOrderId?: string;
  /** The status of the price comparison (NotProcessed, Processed, NotUsed) */
  status?: SupplierQuotationItemStatus;
};
export type PostApiV1RequisitionSourceQuotationProcessPurchaseOrderApiResponse =
  unknown;
export type PostApiV1RequisitionSourceQuotationProcessPurchaseOrderApiArg = {
  /** The type of the supplier (example Local, Foreign). */
  supplierType?: SupplierType;
  /** The list of quotations to process. */
  body: ProcessQuotation[];
};
export type GetApiV1RoleApiResponse = /** status 200 OK */ RoleDto[];
export type GetApiV1RoleApiArg = void;
export type PostApiV1RoleApiResponse = unknown;
export type PostApiV1RoleApiArg = {
  createRoleRequest: CreateRoleRequest;
};
export type GetApiV1RoleWithPermissionsApiResponse =
  /** status 200 OK */ RolePermissionDtoIEnumerablePaginateable;
export type GetApiV1RoleWithPermissionsApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1RoleByIdApiResponse =
  /** status 200 OK */ RolePermissionDto;
export type GetApiV1RoleByIdApiArg = {
  id: string;
};
export type PutApiV1RoleByIdApiResponse = unknown;
export type PutApiV1RoleByIdApiArg = {
  id: string;
  updateRoleRequest: UpdateRoleRequest;
};
export type DeleteApiV1RoleByIdApiResponse = unknown;
export type DeleteApiV1RoleByIdApiArg = {
  id: string;
};
export type GetApiV1RoleCheckByIdApiResponse = unknown;
export type GetApiV1RoleCheckByIdApiArg = {
  id: string;
};
export type PostApiV1ShiftScheduleApiResponse = /** status 200 OK */ string;
export type PostApiV1ShiftScheduleApiArg = {
  createShiftScheduleRequest: CreateShiftScheduleRequest;
};
export type GetApiV1ShiftScheduleApiResponse =
  /** status 200 OK */ ShiftScheduleDtoIEnumerablePaginateableRead;
export type GetApiV1ShiftScheduleApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1ShiftScheduleByIdApiResponse =
  /** status 200 OK */ ShiftScheduleDtoRead;
export type GetApiV1ShiftScheduleByIdApiArg = {
  id: string;
};
export type PutApiV1ShiftScheduleByIdApiResponse =
  /** status 204 No Content */ ShiftScheduleDtoRead;
export type PutApiV1ShiftScheduleByIdApiArg = {
  id: string;
  createShiftScheduleRequest: CreateShiftScheduleRequest;
};
export type DeleteApiV1ShiftScheduleByIdApiResponse = unknown;
export type DeleteApiV1ShiftScheduleByIdApiArg = {
  id: string;
};
export type PostApiV1ShiftTypeApiResponse = /** status 200 OK */ string;
export type PostApiV1ShiftTypeApiArg = {
  createShiftTypeRequest: CreateShiftTypeRequest;
};
export type GetApiV1ShiftTypeApiResponse =
  /** status 200 OK */ ShiftTypeDtoIEnumerablePaginateable;
export type GetApiV1ShiftTypeApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type PutApiV1ShiftTypeApiResponse =
  /** status 204 No Content */ ShiftTypeDto;
export type PutApiV1ShiftTypeApiArg = {
  id: string;
  createShiftTypeRequest: CreateShiftTypeRequest;
};
export type GetApiV1ShiftTypeByIdApiResponse =
  /** status 200 OK */ ShiftTypeDto;
export type GetApiV1ShiftTypeByIdApiArg = {
  id: string;
};
export type DeleteApiV1ShiftTypeByIdApiResponse = unknown;
export type DeleteApiV1ShiftTypeByIdApiArg = {
  id: string;
};
export type PostApiV1UserApiResponse = unknown;
export type PostApiV1UserApiArg = {
  createUserRequest: CreateUserRequest;
};
export type GetApiV1UserApiResponse =
  /** status 200 OK */ UserWithRoleDtoIEnumerablePaginateable;
export type GetApiV1UserApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type PostApiV1UserSignUpApiResponse = unknown;
export type PostApiV1UserSignUpApiArg = {
  createClientRequest: CreateClientRequest;
};
export type GetApiV1UserAuthenticatedApiResponse =
  /** status 200 OK */ UserWithRoleDto;
export type GetApiV1UserAuthenticatedApiArg = void;
export type PutApiV1UserByIdApiResponse = unknown;
export type PutApiV1UserByIdApiArg = {
  id: string;
  updateUserRequest: UpdateUserRequest;
};
export type DeleteApiV1UserByIdApiResponse = unknown;
export type DeleteApiV1UserByIdApiArg = {
  id: string;
};
export type PutApiV1UserRoleByIdApiResponse = unknown;
export type PutApiV1UserRoleByIdApiArg = {
  id: string;
  updateUserRoleRequest: UpdateUserRoleRequest;
};
export type PostApiV1UserAvatarByIdApiResponse = unknown;
export type PostApiV1UserAvatarByIdApiArg = {
  id: string;
  uploadFileRequest: UploadFileRequest;
};
export type PostApiV1UserSignatureByIdApiResponse = unknown;
export type PostApiV1UserSignatureByIdApiArg = {
  id: string;
  uploadFileRequest: UploadFileRequest;
};
export type GetApiV1UserToggleDisableByIdApiResponse = unknown;
export type GetApiV1UserToggleDisableByIdApiArg = {
  id: string;
};
export type PostApiV1WarehouseApiResponse = /** status 200 OK */ string;
export type PostApiV1WarehouseApiArg = {
  createWarehouseRequest: CreateWarehouseRequest;
};
export type GetApiV1WarehouseApiResponse =
  /** status 200 OK */ WarehouseDtoIEnumerablePaginateable;
export type GetApiV1WarehouseApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  type?: WarehouseType;
};
export type GetApiV1WarehouseByWarehouseIdApiResponse =
  /** status 200 OK */ WarehouseDto;
export type GetApiV1WarehouseByWarehouseIdApiArg = {
  warehouseId: string;
};
export type PutApiV1WarehouseByWarehouseIdApiResponse = unknown;
export type PutApiV1WarehouseByWarehouseIdApiArg = {
  warehouseId: string;
  createWarehouseRequest: CreateWarehouseRequest;
};
export type DeleteApiV1WarehouseByWarehouseIdApiResponse = unknown;
export type DeleteApiV1WarehouseByWarehouseIdApiArg = {
  warehouseId: string;
};
export type PostApiV1WarehouseByWarehouseIdLocationApiResponse =
  /** status 200 OK */ string;
export type PostApiV1WarehouseByWarehouseIdLocationApiArg = {
  warehouseId: string;
  createWarehouseLocationRequest: CreateWarehouseLocationRequest;
};
export type GetApiV1WarehouseLocationByLocationIdApiResponse =
  /** status 200 OK */ WarehouseLocationDtoRead;
export type GetApiV1WarehouseLocationByLocationIdApiArg = {
  locationId: string;
};
export type PutApiV1WarehouseLocationByLocationIdApiResponse = unknown;
export type PutApiV1WarehouseLocationByLocationIdApiArg = {
  locationId: string;
  createWarehouseLocationRequest: CreateWarehouseLocationRequest;
};
export type DeleteApiV1WarehouseLocationByLocationIdApiResponse = unknown;
export type DeleteApiV1WarehouseLocationByLocationIdApiArg = {
  locationId: string;
};
export type GetApiV1WarehouseLocationApiResponse =
  /** status 200 OK */ WarehouseLocationDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseLocationApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type PostApiV1WarehouseByLocationIdRackApiResponse =
  /** status 200 OK */ string;
export type PostApiV1WarehouseByLocationIdRackApiArg = {
  locationId: string;
  createWarehouseLocationRackRequest: CreateWarehouseLocationRackRequest;
};
export type GetApiV1WarehouseRackByRackIdApiResponse =
  /** status 200 OK */ WarehouseLocationRackDtoRead;
export type GetApiV1WarehouseRackByRackIdApiArg = {
  rackId: string;
};
export type PutApiV1WarehouseRackByRackIdApiResponse = unknown;
export type PutApiV1WarehouseRackByRackIdApiArg = {
  rackId: string;
  createWarehouseLocationRackRequest: CreateWarehouseLocationRackRequest;
};
export type DeleteApiV1WarehouseRackByRackIdApiResponse = unknown;
export type DeleteApiV1WarehouseRackByRackIdApiArg = {
  rackId: string;
};
export type GetApiV1WarehouseRackApiResponse =
  /** status 200 OK */ WarehouseLocationRackDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseRackApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  kind?: MaterialKind;
};
export type GetApiV1WarehouseRackByDepartmentApiResponse =
  /** status 200 OK */ WarehouseLocationRackDtoRead[];
export type GetApiV1WarehouseRackByDepartmentApiArg = {
  kind?: MaterialKind;
};
export type PostApiV1WarehouseByRackIdShelfApiResponse =
  /** status 200 OK */ string;
export type PostApiV1WarehouseByRackIdShelfApiArg = {
  rackId: string;
  createWarehouseLocationShelfRequest: CreateWarehouseLocationShelfRequest;
};
export type GetApiV1WarehouseShelfByShelfIdApiResponse =
  /** status 200 OK */ WarehouseLocationShelfDtoRead;
export type GetApiV1WarehouseShelfByShelfIdApiArg = {
  shelfId: string;
};
export type PutApiV1WarehouseShelfByShelfIdApiResponse = unknown;
export type PutApiV1WarehouseShelfByShelfIdApiArg = {
  shelfId: string;
  createWarehouseLocationShelfRequest: CreateWarehouseLocationShelfRequest;
};
export type DeleteApiV1WarehouseShelfByShelfIdApiResponse = unknown;
export type DeleteApiV1WarehouseShelfByShelfIdApiArg = {
  shelfId: string;
};
export type GetApiV1WarehouseShelfApiResponse =
  /** status 200 OK */ WarehouseLocationShelfDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseShelfApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1WarehouseShelfByDepartmentApiResponse =
  /** status 200 OK */ WarehouseLocationShelfDtoRead[];
export type GetApiV1WarehouseShelfByDepartmentApiArg = {
  kind?: MaterialKind;
};
export type GetApiV1WarehouseByWarehouseIdShelvesByMaterialAndMaterialIdApiResponse =
  /** status 200 OK */ WarehouseLocationShelfDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseByWarehouseIdShelvesByMaterialAndMaterialIdApiArg =
  {
    warehouseId: string;
    materialId: string;
    page?: number;
    pageSize?: number;
    searchQuery?: string;
  };
export type GetApiV1WarehouseByWarehouseIdShelvesByMaterialbatchAndMaterialBatchIdApiResponse =
  /** status 200 OK */ WarehouseLocationShelfDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseByWarehouseIdShelvesByMaterialbatchAndMaterialBatchIdApiArg =
  {
    warehouseId: string;
    materialBatchId: string;
    page?: number;
    pageSize?: number;
    searchQuery?: string;
  };
export type GetApiV1WarehouseRackByRackIdShelvesApiResponse =
  /** status 200 OK */ WarehouseLocationShelfDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseRackByRackIdShelvesApiArg = {
  rackId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1WarehouseByWarehouseIdShelvesApiResponse =
  /** status 200 OK */ WarehouseLocationShelfDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseByWarehouseIdShelvesApiArg = {
  warehouseId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1WarehouseByWarehouseIdArrivalLocationApiResponse =
  /** status 200 OK */ WarehouseArrivalLocationDtoRead;
export type GetApiV1WarehouseByWarehouseIdArrivalLocationApiArg = {
  warehouseId: string;
};
export type GetApiV1WarehouseDistributedRequisitionMaterialsApiResponse =
  /** status 200 OK */ DistributedRequisitionMaterialDtoIEnumerablePaginateable;
export type GetApiV1WarehouseDistributedRequisitionMaterialsApiArg = {
  kind?: MaterialKind;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1WarehouseFinishedGoodsDetailsApiResponse =
  /** status 200 OK */ DistributedFinishedProductDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseFinishedGoodsDetailsApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1WarehouseStockTransferDetailsApiResponse =
  /** status 200 OK */ MaterialBatchDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseStockTransferDetailsApiArg = {
  kind?: MaterialKind;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1WarehouseDistributedMaterialByIdApiResponse =
  /** status 200 OK */ DistributedRequisitionMaterialDto;
export type GetApiV1WarehouseDistributedMaterialByIdApiArg = {
  id: string;
};
export type PostApiV1WarehouseArrivalLocationApiResponse = unknown;
export type PostApiV1WarehouseArrivalLocationApiArg = {
  createArrivalLocationRequest: CreateArrivalLocationRequest;
};
export type PutApiV1WarehouseArrivalLocationApiResponse = unknown;
export type PutApiV1WarehouseArrivalLocationApiArg = {
  updateArrivalLocationRequest: UpdateArrivalLocationRequest;
};
export type PostApiV1WarehouseConfirmArrivalByDistributedMaterialIdApiResponse =
  unknown;
export type PostApiV1WarehouseConfirmArrivalByDistributedMaterialIdApiArg = {
  distributedMaterialId: string;
};
export type PostApiV1WarehouseChecklistApiResponse = unknown;
export type PostApiV1WarehouseChecklistApiArg = {
  createChecklistRequest: CreateChecklistRequest;
};
export type GetApiV1WarehouseChecklistByIdApiResponse =
  /** status 200 OK */ ChecklistDtoRead;
export type GetApiV1WarehouseChecklistByIdApiArg = {
  id: string;
};
export type GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdMaterialBatchApiResponse =
  /** status 200 OK */ MaterialBatchDtoRead[];
export type GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdMaterialBatchApiArg =
  {
    distributedMaterialId: string;
  };
export type PostApiV1WarehouseDistributedMaterialMaterialBatchApiResponse =
  /** status 200 OK */ MaterialBatchDtoRead[];
export type PostApiV1WarehouseDistributedMaterialMaterialBatchApiArg = {
  body: string[];
};
export type GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdChecklistApiResponse =
  /** status 200 OK */ ChecklistDtoRead;
export type GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdChecklistApiArg =
  {
    distributedMaterialId: string;
  };
export type PostApiV1WarehouseGrnApiResponse = unknown;
export type PostApiV1WarehouseGrnApiArg = {
  createGrnRequest: CreateGrnRequest;
};
export type GetApiV1WarehouseGrnByIdApiResponse =
  /** status 200 OK */ GrnDtoRead;
export type GetApiV1WarehouseGrnByIdApiArg = {
  id: string;
};
export type GetApiV1WarehouseGrnsApiResponse =
  /** status 200 OK */ GrnDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseGrnsApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  kind?: MaterialKind;
};
export type GetApiV1WarehouseBincardinformationByMaterialIdApiResponse =
  /** status 200 OK */ BinCardInformationDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseBincardinformationByMaterialIdApiArg = {
  materialId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type GetApiV1WarehouseBincardinformationByProductIdProductApiResponse =
  /** status 200 OK */ BinCardInformationDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseBincardinformationByProductIdProductApiArg = {
  productId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type PostApiV1WorkOrderApiResponse = /** status 201 Created */ string;
export type PostApiV1WorkOrderApiArg = {
  /** The ID of the user creating the work order. */
  userId?: string;
  /** The CreateWorkOrderRequest object. */
  createWorkOrderRequest: CreateWorkOrderRequest;
};
export type GetApiV1WorkOrderApiResponse = unknown;
export type GetApiV1WorkOrderApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1WorkOrderByWorkOrderIdApiResponse =
  /** status 200 OK */ WorkOrderDto;
export type GetApiV1WorkOrderByWorkOrderIdApiArg = {
  /** The ID of the work order. */
  workOrderId: string;
};
export type PutApiV1WorkOrderByWorkOrderIdApiResponse = unknown;
export type PutApiV1WorkOrderByWorkOrderIdApiArg = {
  /** The ID of the work order to be updated. */
  workOrderId: string;
  /** The ID of the user performing the update. */
  userId?: string;
  /** The UpdateWorkOrderRequest object containing updated work order data. */
  updateWorkOrderRequest: UpdateWorkOrderRequest;
};
export type DeleteApiV1WorkOrderByWorkOrderIdApiResponse = unknown;
export type DeleteApiV1WorkOrderByWorkOrderIdApiArg = {
  /** The ID of the work order to be deleted. */
  workOrderId: string;
  /** The ID of the user performing the deletion. */
  userId?: string;
};
export type CollectionItemDto = {
  id?: string | null;
  name?: string | null;
  code?: string | null;
  description?: string | null;
  symbol?: string | null;
};
export type UserDto = {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  isDisabled?: boolean;
  avatar?: string | null;
  createdAt?: string;
  signature?: string | null;
  department?: CollectionItemDto;
};
export type ActionType = 0 | 1 | 2 | 3;
export type ActivityLogDto = {
  user?: UserDto;
  action?: string | null;
  module?: string | null;
  subModule?: string | null;
  actionType?: ActionType;
  ipAddress?: string | null;
  url?: string | null;
  httpMethod?: string | null;
  statusCode?: number;
  createdAt?: string;
};
export type ActivityLogDtoIEnumerablePaginateable = {
  data?: ActivityLogDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type SortDirection = 0 | 1 | 2;
export type ProblemDetails = {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
};
export type CreateApprovalStageRequest = {
  userId?: string | null;
  roleId?: string | null;
  required?: boolean;
  order?: number;
};
export type CreateApprovalRequest = {
  itemType?: string | null;
  escalationDuration?: string;
  approvalStages?: CreateApprovalStageRequest[] | null;
};
export type ApprovalStageDto = {
  user?: CollectionItemDto;
  role?: CollectionItemDto;
  required?: boolean;
  order?: number;
};
export type ApprovalDto = {
  id?: string;
  itemType?: string | null;
  escalationDuration?: string;
  approvalStages?: ApprovalStageDto[] | null;
  createdBy?: CollectionItemDto;
  createdAt?: string;
};
export type ApprovalDtoIEnumerablePaginateable = {
  data?: ApprovalDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type DepartmentType = 0 | 1;
export type WarehouseType = 0 | 1 | 2 | 3;
export type WarehouseDto = {
  id?: string;
  name?: string | null;
  description?: string | null;
  type?: WarehouseType;
  locations?: CollectionItemDto[] | null;
};
export type DepartmentDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  code?: string | null;
  name?: string | null;
  type?: DepartmentType;
  description?: string | null;
  warehouses?: WarehouseDto[] | null;
};
export type DepartmentDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  code?: string | null;
  name?: string | null;
  type?: DepartmentType;
  description?: string | null;
  warehouses?: WarehouseDto[] | null;
  isBeta?: boolean;
};
export type ApprovalStatus = 0 | 1 | 2;
export type ApprovalLog = {
  user?: CollectionItemDto;
  approvedAt?: string | null;
  status?: ApprovalStatus;
  comments?: string | null;
};
export type ApprovalEntity = {
  id?: string;
  code?: string | null;
  modelType?: string | null;
  department?: DepartmentDto;
  approvalLogs?: ApprovalLog[] | null;
  createdAt?: string;
  requestedBy?: CollectionItemDto;
};
export type ApprovalEntityRead = {
  id?: string;
  code?: string | null;
  modelType?: string | null;
  department?: DepartmentDtoRead;
  approvalLogs?: ApprovalLog[] | null;
  createdAt?: string;
  requestedBy?: CollectionItemDto;
};
export type ApprovalRequestBody = {
  comments?: string | null;
};
export type LoginResponse = {
  userId?: string | null;
  accessToken?: string | null;
  refreshToken?: string | null;
  expiresIn?: number;
  avatar?: string | null;
};
export type LoginRequest = {
  email: string | null;
  password: string | null;
  twoFactorCode?: string | null;
  twoFactorRecoveryCode?: string | null;
};
export type LoginWithRefreshToken = {
  clientId: string;
  refreshToken: string;
};
export type PasswordChangeResponse = {
  success?: boolean;
  errors?: string[] | null;
};
export type SetPasswordRequest = {
  password: string;
  confirmPassword: string;
  token: string;
};
export type ChangePasswordRequest = {
  newPassword?: string | null;
};
export type ForgotPasswordRequest = {
  clientId?: string | null;
  email?: string | null;
};
export type CreateBoMItemsRequest = {
  materialId?: string;
  uoMId?: string | null;
  isSubstitutable?: boolean;
  materialTypeId?: string | null;
  grade?: string | null;
  casNumber?: string | null;
  function?: string | null;
  baseQuantity?: number;
  baseUoMId?: string | null;
  order?: number;
};
export type CreateBillOfMaterialRequest = {
  productId?: string;
  items?: CreateBoMItemsRequest[] | null;
};
export type CreateProductBillOfMaterialRequest = {
  componentMaterialId?: string | null;
  componentProductId?: string | null;
  quantity?: number;
  uoMId?: string;
  isSubstitutable?: boolean;
};
export type MaterialKind = 0 | 1;
export type CreateItemRequest = {
  name?: string | null;
  description?: string | null;
  type?: string | null;
  isAvailable?: boolean;
  materialKind?: MaterialKind;
};
export type UnitOfMeasureDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  name?: string | null;
  symbol?: string | null;
  description?: string | null;
  isScalable?: boolean;
  isRawMaterial?: boolean;
};
export type PackageStyleDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  name?: string | null;
  description?: string | null;
};
export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type CompanyWorkingDaysRequest = {
  day: DayOfWeek;
  isWorkingDay: boolean;
  startTime: string;
  endTime: string;
};
export type CompanyWorkingDaysDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  day?: DayOfWeek;
  isWorkingDay?: boolean;
  startTime?: string;
  endTime?: string;
};
export type CompanyWorkingDaysDtoIEnumerablePaginateable = {
  data?: CompanyWorkingDaysDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type NamingType = 0 | 1 | 2;
export type CreateConfigurationRequest = {
  modelType?: string | null;
  prefix?: string | null;
  namingType?: NamingType;
  minimumNameLength?: number;
  maximumNameLength?: number;
};
export type ConfigurationDto = {
  id?: string;
  modelType?: string | null;
  prefix?: string | null;
  namingType?: NamingType;
  minimumNameLength?: number;
  maximumNameLength?: number;
};
export type ConfigurationDtoIEnumerablePaginateable = {
  data?: ConfigurationDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type TypeResponse = {
  value?: number;
  name?: string | null;
};
export type CreateWarehouseLocationShelfRequest = {
  code?: string | null;
  name?: string | null;
  description?: string | null;
};
export type CreateWarehouseLocationRackRequest = {
  name?: string | null;
  description?: string | null;
  shelves?: CreateWarehouseLocationShelfRequest[] | null;
};
export type CreateWarehouseLocationRequest = {
  name?: string | null;
  floorName?: string | null;
  description?: string | null;
  racks?: CreateWarehouseLocationRackRequest[] | null;
};
export type CreateWarehouseRequest = {
  name?: string | null;
  description?: string | null;
  type?: WarehouseType;
  materialKind?: MaterialKind;
  locations?: CreateWarehouseLocationRequest[] | null;
};
export type CreateDepartmentRequest = {
  code?: string | null;
  name?: string | null;
  description?: string | null;
  type?: DepartmentType;
  warehouses?: CreateWarehouseRequest[] | null;
};
export type DepartmentDtoIEnumerablePaginateable = {
  data?: DepartmentDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type DepartmentDtoIEnumerablePaginateableRead = {
  data?: DepartmentDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateDesignationRequest = {
  name: string;
  description?: string | null;
  maximumLeaveDays: number;
  departmentIds: string[];
};
export type DesignationDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  name?: string | null;
  description?: string | null;
  maximumLeaveDays?: number;
  departments?: DepartmentDto[] | null;
};
export type DesignationDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  name?: string | null;
  description?: string | null;
  maximumLeaveDays?: number;
  departments?: DepartmentDtoRead[] | null;
};
export type DesignationDtoIEnumerablePaginateable = {
  data?: DesignationDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type DesignationDtoIEnumerablePaginateableRead = {
  data?: DesignationDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type EmployeeType = 0 | 1;
export type EmployeeInviteDto = {
  email?: string | null;
  employeeType?: EmployeeType;
  staffNumber?: string | null;
};
export type OnboardEmployeeDto = {
  emailList: EmployeeInviteDto[];
};
export type Gender = 0 | 1;
export type MaritalStatus = 0 | 1;
export type Religion = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type LifeStatus = 0 | 1;
export type PersonDto = {
  fullName: string;
  phoneNumber: string;
  occupation: string;
  lifeStatus: LifeStatus;
};
export type EmergencyContactDto = {
  fullName: string;
  contactNumber: string;
  relationship: string;
  residentialAddress: string;
};
export type ChildDto = {
  fullName: string;
  dateOfBirth: string;
  gender: Gender;
};
export type SiblingDto = {
  fullName?: string | null;
  contact: string;
  gender: Gender;
};
export type EducationDto = {
  schoolName: string;
  startDate: string;
  endDate: string;
  major: string;
  qualificationEarned: string;
};
export type EmploymentHistoryDto = {
  companyName?: string | null;
  startDate?: string;
  endDate?: string;
  position?: string | null;
};
export type CreateEmployeeRequest = {
  avatar?: string | null;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
  phoneNumber: string;
  region: string;
  employeeType: EmployeeType;
  nationality: string;
  residentialAddress: string;
  maritalStatus: MaritalStatus;
  religion: Religion;
  dateEmployed: string;
  bankAccountNumber: string;
  ssnitNumber: string;
  ghanaCardNumber: string;
  staffNumber?: string | null;
  email: string;
  mother: PersonDto;
  father: PersonDto;
  spouse?: PersonDto;
  emergencyContact: EmergencyContactDto;
  nextOfKin: EmergencyContactDto;
  children?: ChildDto[] | null;
  siblings?: SiblingDto[] | null;
  educationBackground: EducationDto[];
  employmentHistory: EmploymentHistoryDto[];
};
export type AttachmentDto = {
  link?: string | null;
  name?: string | null;
  id?: string;
  reference?: string | null;
};
export type EmployeeDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  attachments?: AttachmentDto[] | null;
  firstName?: string | null;
  lastName?: string | null;
  avatar?: string | null;
  dateOfBirth?: string;
  gender?: Gender;
  residentialAddress?: string | null;
  annualLeaveDays?: number;
  nationality?: string | null;
  bankAccountNumber?: string | null;
  ssnitNumber?: string | null;
  ghanaCardNumber?: string | null;
  region?: string | null;
  maritalStatus?: MaritalStatus;
  religion?: Religion;
  staffNumber?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  type?: EmployeeType;
  dateEmployed?: string;
  designation?: DesignationDto;
  department?: DepartmentDto;
  mother?: PersonDto;
  father?: PersonDto;
  spouse?: PersonDto;
  emergencyContact?: EmergencyContactDto;
  nextOfKin?: EmergencyContactDto;
  children?: ChildDto[] | null;
  siblings?: SiblingDto[] | null;
  educationBackground?: EducationDto[] | null;
  employmentHistory?: EmploymentHistoryDto[] | null;
};
export type EmployeeDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  attachments?: AttachmentDto[] | null;
  firstName?: string | null;
  lastName?: string | null;
  avatar?: string | null;
  dateOfBirth?: string;
  gender?: Gender;
  residentialAddress?: string | null;
  annualLeaveDays?: number;
  nationality?: string | null;
  bankAccountNumber?: string | null;
  ssnitNumber?: string | null;
  ghanaCardNumber?: string | null;
  region?: string | null;
  maritalStatus?: MaritalStatus;
  religion?: Religion;
  staffNumber?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  type?: EmployeeType;
  dateEmployed?: string;
  designation?: DesignationDtoRead;
  department?: DepartmentDtoRead;
  mother?: PersonDto;
  father?: PersonDto;
  spouse?: PersonDto;
  emergencyContact?: EmergencyContactDto;
  nextOfKin?: EmergencyContactDto;
  children?: ChildDto[] | null;
  siblings?: SiblingDto[] | null;
  educationBackground?: EducationDto[] | null;
  employmentHistory?: EmploymentHistoryDto[] | null;
};
export type EmployeeDtoIEnumerablePaginateable = {
  data?: EmployeeDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type EmployeeDtoIEnumerablePaginateableRead = {
  data?: EmployeeDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type EmployeeUserDto = {
  employeeId: string;
  roleName: string;
};
export type AssignEmployeeDto = {
  designationId: string;
  departmentId: string;
  staffId?: string | null;
  startDate?: string;
  reportingManagerId: string;
};
export type CreateFormFieldRequest = {
  questionId?: string;
  required?: boolean;
  rank?: number;
  assigneeId?: string | null;
  reviewerId?: string | null;
};
export type CreateFormSectionRequest = {
  name?: string | null;
  description?: string | null;
  fields?: CreateFormFieldRequest[] | null;
};
export type CreateFormAssigneeRequest = {
  userId?: string;
};
export type CreateFormReviewerRequest = {
  userId?: string;
};
export type CreateFormRequest = {
  name?: string | null;
  sections?: CreateFormSectionRequest[] | null;
  assignees?: CreateFormAssigneeRequest[] | null;
  reviewers?: CreateFormReviewerRequest[] | null;
};
export type QuestionType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type QuestionValidationType = 0 | 1 | 2 | 3;
export type QuestionOptionDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  question?: CollectionItemDto;
  name?: string | null;
};
export type QuestionDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  label?: string | null;
  type?: QuestionType;
  validation?: QuestionValidationType;
  isMultiSelect?: boolean;
  reference?: string | null;
  options?: QuestionOptionDto[] | null;
};
export type FormFieldDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  formSection?: CollectionItemDto;
  question?: QuestionDto;
  required?: boolean;
  response?: string | null;
  rank?: number;
  assignee?: CollectionItemDto;
  reviewer?: CollectionItemDto;
};
export type FormSectionDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  form?: CollectionItemDto;
  name?: string | null;
  description?: string | null;
  fields?: FormFieldDto[] | null;
};
export type FormResponseDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  attachments?: AttachmentDto[] | null;
  formField?: FormFieldDto;
  value?: string | null;
};
export type FormAssigneeDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  form?: CollectionItemDto;
  user?: CollectionItemDto;
};
export type FormReviewerDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  form?: CollectionItemDto;
  user?: CollectionItemDto;
};
export type FormDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  name?: string | null;
  sections?: FormSectionDto[] | null;
  responses?: FormResponseDto[] | null;
  assignees?: FormAssigneeDto[] | null;
  reviewers?: FormReviewerDto[] | null;
};
export type FormDtoIEnumerablePaginateable = {
  data?: FormDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateFormResponseRequest = {
  formFieldId?: string;
  value?: string | null;
};
export type CreateResponseRequest = {
  formId?: string;
  formResponses?: CreateFormResponseRequest[] | null;
};
export type CreateQuestionOptionsRequest = {
  name?: string | null;
};
export type CreateQuestionRequest = {
  label: string;
  type: QuestionType;
  isMultiSelect?: boolean;
  validation?: QuestionValidationType;
  options?: CreateQuestionOptionsRequest[] | null;
  reference?: string | null;
};
export type QuestionDtoIEnumerablePaginateable = {
  data?: QuestionDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type LeaveEntitlementDto = {
  employeeId: string;
  year: number;
  daysAllowed?: number;
};
export type LeaveEntitlementDtoIEnumerablePaginateable = {
  data?: LeaveEntitlementDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type RequestCategory = 0 | 1 | 2;
export type CreateLeaveRequest = {
  leaveTypeId: string;
  startDate: string;
  endDate: string;
  employeeId: string;
  requestCategory: RequestCategory;
  contactPerson?: string | null;
  contactPersonNumber?: string | null;
  justification?: string | null;
};
export type LeaveTypeDto = {
  id?: string;
  name?: string | null;
  isPaid?: boolean;
  deductFromBalance?: boolean;
  deductionLimit?: number | null;
  numberOfDays?: number;
  isActive?: boolean;
  designations?: DesignationDto[] | null;
};
export type LeaveTypeDtoRead = {
  id?: string;
  name?: string | null;
  isPaid?: boolean;
  deductFromBalance?: boolean;
  deductionLimit?: number | null;
  numberOfDays?: number;
  isActive?: boolean;
  designations?: DesignationDtoRead[] | null;
};
export type LeaveStatus = 0 | 1 | 2 | 3;
export type LeaveRequestDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  attachments?: AttachmentDto[] | null;
  leaveTypeId?: string;
  leaveType?: LeaveTypeDto;
  startDate?: string;
  endDate?: string;
  contactPerson?: string | null;
  contactPersonNumber?: string | null;
  justification?: string | null;
  requestCategory?: RequestCategory;
  leaveStatus?: LeaveStatus;
  unpaidDays?: number;
  paidDays?: number;
  employeeId?: string;
  employee?: EmployeeDto;
};
export type LeaveRequestDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  attachments?: AttachmentDto[] | null;
  leaveTypeId?: string;
  leaveType?: LeaveTypeDtoRead;
  startDate?: string;
  endDate?: string;
  contactPerson?: string | null;
  contactPersonNumber?: string | null;
  justification?: string | null;
  requestCategory?: RequestCategory;
  leaveStatus?: LeaveStatus;
  unpaidDays?: number;
  paidDays?: number;
  employeeId?: string;
  employee?: EmployeeDtoRead;
};
export type LeaveRequestDtoIEnumerablePaginateable = {
  data?: LeaveRequestDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type LeaveRequestDtoIEnumerablePaginateableRead = {
  data?: LeaveRequestDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateLeaveTypeRequest = {
  name: string;
  isPaid: boolean;
  deductFromBalance: boolean;
  deductionLimit?: number | null;
  numberOfDays: number;
  isActive: boolean;
  designationList: string[];
};
export type LeaveTypeDtoIEnumerablePaginateable = {
  data?: LeaveTypeDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type LeaveTypeDtoIEnumerablePaginateableRead = {
  data?: LeaveTypeDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateMaterialRequest = {
  code?: string | null;
  name?: string | null;
  pharmacopoeia?: string | null;
  description?: string | null;
  alphabet?: string | null;
  materialCategoryId?: string | null;
  kind?: MaterialKind;
  reOrderLevel?: number;
};
export type MaterialCategoryDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  name?: string | null;
  description?: string | null;
  materialKind?: MaterialKind;
};
export type MaterialDto = {
  id?: string;
  code?: string | null;
  pharmacopoeia?: string | null;
  name?: string | null;
  description?: string | null;
  alphabet?: string | null;
  kind?: MaterialKind;
  materialCategory?: MaterialCategoryDto;
  totalStock?: number;
};
export type MaterialDtoIEnumerablePaginateable = {
  data?: MaterialDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type UpdateReOrderLevelRequest = {
  reOrderLevel?: number;
};
export type RequestStatus = 0 | 1 | 2 | 3 | 4;
export type BatchToSupply = {
  batch?: MaterialBatchDto;
  quantityToTake?: number;
};
export type BatchToSupplyRead = {
  batch?: MaterialBatchDto;
  quantityToTake?: number;
};
export type RequisitionItemDto = {
  id?: string;
  material?: MaterialDto;
  uoM?: UnitOfMeasureDto;
  quantity?: number;
  status?: RequestStatus;
  batches?: BatchToSupply[] | null;
};
export type CountryDto = {
  id?: string;
  name?: string | null;
  nationality?: string | null;
  code?: string | null;
};
export type CurrencyDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  name?: string | null;
  symbol?: string | null;
  description?: string | null;
};
export type SupplierType = 0 | 1;
export type SupplierStatus = 0 | 1 | 2;
export type ManufacturerMaterialDto = {
  material?: CollectionItemDto;
};
export type ManufacturerDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  name?: string | null;
  address?: string | null;
  email?: string | null;
  approvedAt?: string | null;
  validityDate?: string | null;
  country?: CountryDto;
  materials?: ManufacturerMaterialDto[] | null;
};
export type SupplierManufacturerDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  manufacturer?: ManufacturerDto;
  material?: MaterialDto;
  quantityPerPack?: number;
  default?: boolean;
};
export type SupplierDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  name?: string | null;
  email?: string | null;
  address?: string | null;
  contactPerson?: string | null;
  contactNumber?: string | null;
  country?: CountryDto;
  currency?: CurrencyDto;
  type?: SupplierType;
  status?: SupplierStatus;
  associatedManufacturers?: SupplierManufacturerDto[] | null;
};
export type ShipmentInvoiceItemDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  material?: CollectionItemDto;
  uoM?: UnitOfMeasureDto;
  manufacturer?: CollectionItemDto;
  purchaseOrder?: CollectionItemDto;
  expectedQuantity?: number;
  receivedQuantity?: number;
  price?: number;
  totalCost?: number;
  currency?: CurrencyDto;
  reason?: string | null;
};
export type ShipmentInvoiceDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  code?: string | null;
  supplier?: SupplierDto;
  items?: ShipmentInvoiceItemDto[] | null;
  isAttached?: boolean;
  totalCost?: number;
  currency?: CurrencyDto;
};
export type MaterialItemDistributionDto = {
  shipmentInvoiceItem?: ShipmentInvoiceItemDto;
  quantity?: number;
};
export type DistributedRequisitionMaterialStatus = 0 | 1 | 2 | 3;
export type BatchStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type EventType = 0 | 1 | 2 | 3;
export type MaterialBatchEventDto = {
  type?: EventType;
  quantity?: number;
  user?: CollectionItemDto;
  createdAt?: string;
};
export type MovementType = 0 | 1 | 2;
export type MaterialBatchMovementDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  batch?: CollectionItemDto;
  fromLocation?: CollectionItemDto;
  toLocation?: CollectionItemDto;
  quantity?: number;
  movedAt?: string;
  movedBy?: CollectionItemDto;
  movementType?: MovementType;
};
export type SrDto = {
  srNumber?: string | null;
  grossWeight?: number;
  uoM?: UnitOfMeasureDto;
};
export type MassMaterialBatchMovementDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  batch?: CollectionItemDto;
  fromWarehouse?: CollectionItemDto;
  toWarehouse?: CollectionItemDto;
  quantity?: number;
  movedAt?: string;
  movedBy?: CollectionItemDto;
  movementType?: MovementType;
};
export type CurrentLocationDto = {
  location?: CollectionItemDto;
  quantityAtLocation?: number;
};
export type MaterialBatchReservedQuantityDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  warehouse?: CollectionItemDto;
  uoM?: UnitOfMeasureDto;
  quantity?: number;
};
export type DistributedMaterialBatchDto = {
  id?: string;
  material?: CollectionItemDto;
  code?: string | null;
  batchNumber?: string | null;
  uoM?: UnitOfMeasureDto;
  numberOfContainers?: number;
  containerPackageStyle?: PackageStyleDto;
  quantityPerContainer?: number;
  status?: BatchStatus;
  dateReceived?: string;
  dateApproved?: string | null;
  quantityAssigned?: number;
  quantityUnassigned?: number;
  totalQuantity?: number;
  consumedQuantity?: number;
  remainingQuantity?: number;
  expiryDate?: string | null;
  manufacturingDate?: string | null;
  retestDate?: string | null;
  events?: MaterialBatchEventDto[] | null;
  movements?: MaterialBatchMovementDto[] | null;
  sampleWeights?: SrDto[] | null;
  massMovements?: MassMaterialBatchMovementDto[] | null;
  locations?: CurrentLocationDto[] | null;
  reservedQuantities?: MaterialBatchReservedQuantityDto[] | null;
  reservedQuantity?: number;
};
export type DistributedChecklistDto = {
  materialBatches?: DistributedMaterialBatchDto[] | null;
};
export type DistributedRequisitionMaterialDto = {
  id?: string;
  requisitionItem?: RequisitionItemDto;
  material?: MaterialDto;
  uom?: UnitOfMeasureDto;
  shipmentInvoice?: ShipmentInvoiceDto;
  quantity?: number;
  arrivedAt?: string | null;
  checkedAt?: string | null;
  distributedAt?: string | null;
  grnGeneratedAt?: string | null;
  materialItemDistributions?: MaterialItemDistributionDto[] | null;
  status?: DistributedRequisitionMaterialStatus;
  checklists?: DistributedChecklistDto[] | null;
};
export type Intactness = 0 | 1;
export type ConsignmentCarrier = 0 | 1 | 2 | 3 | 4 | 5;
export type BatchChecklistDto = {
  distributedRequisitionMaterial?: DistributedRequisitionMaterialDto;
  material?: MaterialDto;
  checkedAt?: string | null;
  shipmentInvoice?: ShipmentInvoiceDto;
  supplier?: SupplierDto;
  manufacturer?: ManufacturerDto;
  certificateOfAnalysisDelivered?: boolean;
  visibleLabelling?: boolean;
  intactnessStatus?: Intactness;
  consignmentCarrierStatus?: ConsignmentCarrier;
};
export type StockTransferStatus = 0 | 1 | 2 | 3;
export type MaterialBatchStockTransferDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  code?: string | null;
  material?: MaterialDto;
  uoM?: UnitOfMeasureDto;
  product?: CollectionItemDto;
  productionSchedule?: CollectionItemDto;
  reason?: string | null;
  requiredQuantity?: number;
  status?: StockTransferStatus;
};
export type MaterialBatchStockTransferSourceDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  stockTransfer?: MaterialBatchStockTransferDto;
  fromDepartment?: DepartmentDto;
  toDepartment?: DepartmentDto;
  quantity?: number;
  status?: StockTransferStatus;
  approvedAt?: string | null;
  issuedAt?: string | null;
};
export type MaterialBatchStockTransferSourceDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  stockTransfer?: MaterialBatchStockTransferDto;
  fromDepartment?: DepartmentDtoRead;
  toDepartment?: DepartmentDtoRead;
  quantity?: number;
  status?: StockTransferStatus;
  approvedAt?: string | null;
  issuedAt?: string | null;
};
export type MaterialBatchDto = {
  id?: string;
  material?: CollectionItemDto;
  code?: string | null;
  batchNumber?: string | null;
  checklist?: BatchChecklistDto;
  stockTransferSource?: MaterialBatchStockTransferSourceDto;
  uoM?: UnitOfMeasureDto;
  numberOfContainers?: number;
  containerPackageStyle?: PackageStyleDto;
  quantityPerContainer?: number;
  status?: BatchStatus;
  dateReceived?: string;
  dateApproved?: string | null;
  quantityAssigned?: number;
  quantityUnassigned?: number;
  totalQuantity?: number;
  consumedQuantity?: number;
  remainingQuantity?: number;
  expiryDate?: string | null;
  manufacturingDate?: string | null;
  retestDate?: string | null;
  events?: MaterialBatchEventDto[] | null;
  movements?: MaterialBatchMovementDto[] | null;
  sampleWeights?: SrDto[] | null;
  massMovements?: MassMaterialBatchMovementDto[] | null;
  locations?: CurrentLocationDto[] | null;
  reservedQuantities?: MaterialBatchReservedQuantityDto[] | null;
  reservedQuantity?: number;
};
export type MaterialBatchDtoRead = {
  id?: string;
  material?: CollectionItemDto;
  code?: string | null;
  batchNumber?: string | null;
  checklist?: BatchChecklistDto;
  stockTransferSource?: MaterialBatchStockTransferSourceDtoRead;
  uoM?: UnitOfMeasureDto;
  numberOfContainers?: number;
  containerPackageStyle?: PackageStyleDto;
  quantityPerContainer?: number;
  status?: BatchStatus;
  dateReceived?: string;
  dateApproved?: string | null;
  quantityAssigned?: number;
  quantityUnassigned?: number;
  totalQuantity?: number;
  consumedQuantity?: number;
  remainingQuantity?: number;
  expiryDate?: string | null;
  manufacturingDate?: string | null;
  retestDate?: string | null;
  events?: MaterialBatchEventDto[] | null;
  movements?: MaterialBatchMovementDto[] | null;
  sampleWeights?: SrDto[] | null;
  massMovements?: MassMaterialBatchMovementDto[] | null;
  locations?: CurrentLocationDto[] | null;
  reservedQuantities?: MaterialBatchReservedQuantityDto[] | null;
  reservedQuantity?: number;
};
export type CreateSrRequest = {
  srNumber?: string | null;
  grossWeight?: number;
  uoMId?: string | null;
};
export type CreateMaterialBatchRequest = {
  code?: string | null;
  materialId?: string;
  totalQuantity?: number;
  batchNumber?: string | null;
  manufacturingDate?: string | null;
  numberOfContainers?: number;
  containerPackageStyleId?: string | null;
  quantityPerContainer?: number;
  checklistId?: string | null;
  uoMId?: string | null;
  dateReceived?: string;
  expiryDate?: string;
  sampleWeights?: CreateSrRequest[] | null;
};
export type MaterialBatchDtoIEnumerablePaginateable = {
  data?: MaterialBatchDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type MaterialBatchDtoIEnumerablePaginateableRead = {
  data?: MaterialBatchDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type MoveMaterialBatchRequest = {
  materialId?: string;
  fromWarehouseId?: string;
  toWarehouseId?: string;
  quantity?: number;
};
export type WarehouseStockDto = {
  warehouse?: WarehouseDto;
  stockQuantity?: number;
};
export type UpdateBatchStatusRequest = {
  status?: string | null;
  materialBatchIds?: string[] | null;
};
export type CreateShelfMaterialBatch = {
  warehouseLocationShelfId?: string;
  quantity?: number;
  uomId?: string | null;
  note?: string | null;
};
export type SupplyMaterialBatchRequest = {
  materialBatchId?: string;
  shelfMaterialBatches?: CreateShelfMaterialBatch[] | null;
};
export type MovedShelfBatchMaterial = {
  warehouseLocationShelfId?: string;
  quantity?: number;
  uomId?: string | null;
  note?: string | null;
};
export type MoveShelfMaterialBatchRequest = {
  shelfMaterialBatchId?: string;
  movedShelfBatchMaterials?: MovedShelfBatchMaterial[] | null;
};
export type MaterialDetailsDto = {
  material?: MaterialDto;
  unitOfMeasure?: UnitOfMeasureDto;
  totalAvailableQuantity?: number;
};
export type MaterialDetailsDtoIEnumerablePaginateable = {
  data?: MaterialDetailsDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type WareHouseLocationDto = {
  id?: string;
  name?: string | null;
  floorName?: string | null;
  description?: string | null;
  warehouse?: CollectionItemDto;
};
export type WareHouseLocationRackDto = {
  id?: string;
  warehouseLocation?: WareHouseLocationDto;
  name?: string | null;
  description?: string | null;
};
export type MaterialWarehouseLocationShelfDto = {
  id?: string;
  warehouseLocationRack?: WareHouseLocationRackDto;
  code?: string | null;
  name?: string | null;
  description?: string | null;
};
export type ShelfMaterialBatchDto = {
  id?: string;
  warehouseLocationShelf?: MaterialWarehouseLocationShelfDto;
  materialBatch?: MaterialBatchDto;
  quantity?: number;
  uoM?: UnitOfMeasureDto;
  note?: string | null;
};
export type ShelfMaterialBatchDtoRead = {
  id?: string;
  warehouseLocationShelf?: MaterialWarehouseLocationShelfDto;
  materialBatch?: MaterialBatchDtoRead;
  quantity?: number;
  uoM?: UnitOfMeasureDto;
  note?: string | null;
};
export type ShelfMaterialBatchDtoIEnumerablePaginateable = {
  data?: ShelfMaterialBatchDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type ShelfMaterialBatchDtoIEnumerablePaginateableRead = {
  data?: ShelfMaterialBatchDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type MaterialStockByWarehouseDto = {
  warehouse?: CollectionItemDto;
  totalQuantity?: number;
};
export type MaterialStockByDepartmentDto = {
  department?: CollectionItemDto;
  totalQuantity?: number;
};
export type CreateMaterialDepartment = {
  materialId?: string;
  uoMId?: string | null;
  reOrderLevel?: number;
  minimumStockLevel?: number;
  maximumStockLevel?: number;
};
export type MaterialDepartmentWithWarehouseStockDto = {
  material?: MaterialDto;
  department?: CollectionItemDto;
  uoM?: UnitOfMeasureDto;
  reOrderLevel?: number;
  minimumStockLevel?: number;
  maximumStockLevel?: number;
  warehouseStock?: number;
};
export type MaterialDepartmentWithWarehouseStockDtoIEnumerablePaginateable = {
  data?: MaterialDepartmentWithWarehouseStockDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type MaterialWithWarehouseStockDto = {
  id?: string;
  code?: string | null;
  pharmacopoeia?: string | null;
  name?: string | null;
  description?: string | null;
  alphabet?: string | null;
  kind?: MaterialKind;
  materialCategory?: MaterialCategoryDto;
  totalStock?: number;
  warehouseStock?: number;
};
export type MaterialWithWarehouseStockDtoIEnumerablePaginateable = {
  data?: MaterialWithWarehouseStockDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type PermissionDetailDto = {
  key?: string | null;
  name?: string | null;
  description?: string | null;
  subModule?: string | null;
  hasOptions?: boolean;
  types?: string[] | null;
};
export type PermissionModuleDto = {
  module?: string | null;
  isActive?: boolean;
  children?: PermissionDetailDto[] | null;
};
export type PermissionDto = {
  module?: string | null;
  subModule?: string | null;
  key?: string | null;
  name?: string | null;
  description?: string | null;
  hasOptions?: boolean;
  types?: string[] | null;
};
export type MenuItem = {
  name?: string | null;
  module?: string | null;
  requiredPermissionKey?: string[] | null;
  children?: MenuItem[] | null;
  icon?: string | null;
  route?: string | null;
  order?: number;
  isVisible?: boolean;
};
export type CreateManufacturerMaterialRequest = {
  materialId?: string;
};
export type CreateManufacturerRequest = {
  name?: string | null;
  address?: string | null;
  email?: string | null;
  validityDate?: string | null;
  countryId?: string | null;
  materials?: CreateManufacturerMaterialRequest[] | null;
};
export type ManufacturerDtoIEnumerablePaginateable = {
  data?: ManufacturerDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateSupplierManufacturerRequest = {
  manufacturerId?: string;
  materialId?: string | null;
  quantityPerPack?: number;
  default?: boolean;
};
export type CreateSupplierRequest = {
  name?: string | null;
  email?: string | null;
  address?: string | null;
  contactPerson?: string | null;
  contactNumber?: string | null;
  countryId?: string | null;
  currencyId?: string | null;
  type?: SupplierType;
  associatedManufacturers?: CreateSupplierManufacturerRequest[] | null;
};
export type SupplierDtoIEnumerablePaginateable = {
  data?: SupplierDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type UpdateSupplierStatusRequest = {
  status?: SupplierStatus;
};
export type CreatePurchaseOrderItemRequest = {
  materialId?: string;
  uomId?: string;
  currencyId?: string | null;
  quantity?: number;
  price?: number;
};
export type CreatePurchaseOrderRequest = {
  code?: string | null;
  proFormaInvoiceNumber?: string | null;
  supplierId?: string;
  sourceRequisitionId?: string;
  requestDate?: string;
  expectedDeliveryDate?: string | null;
  items?: CreatePurchaseOrderItemRequest[] | null;
  deliveryModeId?: string | null;
  termsOfPaymentId?: string | null;
  totalFobValue?: number;
  totalCifValue?: number;
  seaFreight?: number;
  insurance?: number;
  amountInFigures?: string | null;
  estimatedDeliveryDate?: string | null;
};
export type PurchaseOrderItemDto = {
  id?: string;
  purchaseOrder?: CollectionItemDto;
  material?: CollectionItemDto;
  uom?: UnitOfMeasureDto;
  quantity?: number;
  price?: number;
  currency?: CollectionItemDto;
  manufacturers?: SupplierManufacturerDto[] | null;
  canReassignSupplier?: boolean;
};
export type PurchaseOrderItemDtoRead = {
  id?: string;
  purchaseOrder?: CollectionItemDto;
  material?: CollectionItemDto;
  uom?: UnitOfMeasureDto;
  quantity?: number;
  price?: number;
  currency?: CollectionItemDto;
  manufacturers?: SupplierManufacturerDto[] | null;
  cost?: number;
  canReassignSupplier?: boolean;
};
export type PurchaseOrderStatus = 0 | 1 | 2 | 3 | 4;
export type PurchaseOrderAttachmentStatus = 0 | 1 | 2;
export type PurchaseOrderRevisionDto = {
  revisionNumber?: number;
  items?: PurchaseOrderItemDto[] | null;
};
export type PurchaseOrderRevisionDtoRead = {
  revisionNumber?: number;
  items?: PurchaseOrderItemDtoRead[] | null;
};
export type PurchaseOrderDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  attachments?: AttachmentDto[] | null;
  code?: string | null;
  proFormaInvoiceNumber?: string | null;
  supplier?: SupplierDto;
  requestDate?: string;
  expectedDeliveryDate?: string | null;
  items?: PurchaseOrderItemDto[] | null;
  status?: PurchaseOrderStatus;
  isRevised?: boolean;
  attachmentStatus?: PurchaseOrderAttachmentStatus;
  deliveryMode?: CollectionItemDto;
  termsOfPayment?: CollectionItemDto;
  totalFobValue?: number;
  totalCifValue?: number;
  seaFreight?: number;
  amountInFigures?: string | null;
  insurance?: number;
  revisionNumber?: number;
  revisions?: PurchaseOrderRevisionDto[] | null;
  estimatedDeliveryDate?: string | null;
};
export type PurchaseOrderDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  attachments?: AttachmentDto[] | null;
  code?: string | null;
  proFormaInvoiceNumber?: string | null;
  supplier?: SupplierDto;
  requestDate?: string;
  expectedDeliveryDate?: string | null;
  items?: PurchaseOrderItemDtoRead[] | null;
  status?: PurchaseOrderStatus;
  isRevised?: boolean;
  attachmentStatus?: PurchaseOrderAttachmentStatus;
  deliveryMode?: CollectionItemDto;
  termsOfPayment?: CollectionItemDto;
  totalFobValue?: number;
  totalCifValue?: number;
  seaFreight?: number;
  amountInFigures?: string | null;
  insurance?: number;
  revisionNumber?: number;
  revisions?: PurchaseOrderRevisionDtoRead[] | null;
  estimatedDeliveryDate?: string | null;
};
export type PurchaseOrderDtoIEnumerablePaginateable = {
  data?: PurchaseOrderDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type PurchaseOrderDtoIEnumerablePaginateableRead = {
  data?: PurchaseOrderDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type SendPurchaseOrderRequest = {
  expectedDeliveryDate?: string;
};
export type UpdatePurchaseOrderRequest = {
  proFormaInvoiceNumber?: string | null;
  deliveryModeId?: string | null;
  termsOfPaymentId?: string | null;
  totalFobValue?: number;
  totalCifValue?: number;
  seaFreight?: number;
  insurance?: number;
  amountInFigures?: string | null;
  estimatedDeliveryDate?: string | null;
};
export type RevisedPurchaseOrderType = 0 | 1 | 2 | 3 | 4;
export type CreatePurchaseOrderRevision = {
  type?: RevisedPurchaseOrderType;
  purchaseOrderItemId?: string | null;
  materialId?: string | null;
  uoMId?: string | null;
  quantity?: number | null;
  price?: number | null;
  currencyId?: string | null;
};
export type CreateBatchItemRequest = {
  batchNumber?: string | null;
  manufacturerId?: string;
  quantity?: number;
};
export type CreatePurchaseOrderChargeRequest = {
  description?: string | null;
  amount?: number;
  currencyId?: string | null;
};
export type CreatePurchaseOrderInvoiceRequest = {
  code?: string | null;
  purchaseOrderId?: string;
  batchItems?: CreateBatchItemRequest[] | null;
  charges?: CreatePurchaseOrderChargeRequest[] | null;
};
export type BatchItemDto = {
  batchNumber?: string | null;
  purchaseOrderInvoice?: CollectionItemDto;
  manufacturer?: CollectionItemDto;
  quantity?: number;
};
export type PurchaseOrderChargeDto = {
  purchaseOrderInvoice?: PurchaseOrderInvoiceDto;
  description?: string | null;
  currency?: CollectionItemDto;
  amount?: number;
};
export type PurchaseOrderInvoiceDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  code?: string | null;
  purchaseOrder?: CollectionItemDto;
  batchItems?: BatchItemDto[] | null;
  charges?: PurchaseOrderChargeDto[] | null;
};
export type PurchaseOrderInvoiceDtoIEnumerablePaginateable = {
  data?: PurchaseOrderInvoiceDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type AssignChargeRequest = {
  id?: string | null;
  description?: string | null;
  currencyId?: string | null;
  amount?: number;
};
export type CreateBillingSheetRequest = {
  code?: string | null;
  billOfLading?: string | null;
  supplierId?: string | null;
  invoiceId?: string;
  expectedArrivalDate?: string;
  freeTimeExpiryDate?: string;
  freeTimeDuration?: string | null;
  demurrageStartDate?: string;
  charges?: AssignChargeRequest[] | null;
  containerNumber?: string | null;
  numberOfPackages?: string | null;
  packageDescription?: string | null;
  containerPackageStyleId?: string | null;
};
export type BillingSheetStatus = 0 | 1 | 2;
export type ChargeDto = {
  name?: string | null;
  description?: string | null;
  currency?: CurrencyDto;
  amount?: number;
};
export type BillingSheetDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  attachments?: AttachmentDto[] | null;
  code?: string | null;
  billOfLading?: string | null;
  supplier?: SupplierDto;
  invoice?: ShipmentInvoiceDto;
  expectedArrivalDate?: string;
  status?: BillingSheetStatus;
  freeTimeExpiryDate?: string;
  freeTimeDuration?: string | null;
  demurrageStartDate?: string;
  charges?: ChargeDto[] | null;
  containerNumber?: string | null;
  numberOfPackages?: string | null;
  packageDescription?: string | null;
  containerPackageStyle?: PackageStyleDto;
};
export type BillingSheetDtoIEnumerablePaginateable = {
  data?: BillingSheetDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateShipmentDocumentRequest = {
  code?: string | null;
  shipmentInvoiceId?: string | null;
};
export type ShipmentDiscrepancyItemDto = {
  material?: CollectionItemDto;
  uoM?: UnitOfMeasureDto;
  receivedQuantity?: number;
  type?: CollectionItemDto;
  reason?: string | null;
  resolved?: boolean;
};
export type ShipmentDiscrepancyDto = {
  shipmentDocument?: ShipmentDocumentDto;
  items?: ShipmentDiscrepancyItemDto[] | null;
};
export type DocType = 0 | 1;
export type ShipmentStatus = 0 | 1 | 2 | 3;
export type ShipmentDocumentDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  attachments?: AttachmentDto[] | null;
  code?: string | null;
  shipmentInvoice?: ShipmentInvoiceDto;
  discrepancies?: ShipmentDiscrepancyDto[] | null;
  arrivedAt?: string | null;
  clearedAt?: string | null;
  transitStartedAt?: string | null;
  type?: DocType;
  status?: ShipmentStatus;
};
export type ShipmentDocumentDtoIEnumerablePaginateable = {
  data?: ShipmentDocumentDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type UpdateShipmentStatusRequest = {
  status?: ShipmentStatus;
};
export type CreateShipmentInvoiceItem = {
  materialId?: string;
  uoMId?: string;
  manufacturerId?: string;
  purchaseOrderId?: string;
  expectedQuantity?: number;
  receivedQuantity?: number;
  reason?: string | null;
  totalCost?: number;
};
export type CreateShipmentInvoice = {
  code?: string | null;
  shipmentArrivedAt?: string | null;
  supplierId?: string | null;
  items?: CreateShipmentInvoiceItem[] | null;
  totalCost?: number;
};
export type ShipmentInvoiceDtoIEnumerablePaginateable = {
  data?: ShipmentInvoiceDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type MaterialCategory = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
  materialKind?: MaterialKind;
};
export type MaterialCategoryRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
  materialKind?: MaterialKind;
};
export type BatchKind = 0 | 1;
export type Material = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  pharmacopoeia?: string | null;
  alphabet?: string | null;
  materialCategoryId?: string | null;
  materialCategory?: MaterialCategory;
  batches?: MaterialBatch[] | null;
  kind?: MaterialKind;
  status?: BatchKind;
};
export type MaterialRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  pharmacopoeia?: string | null;
  alphabet?: string | null;
  materialCategoryId?: string | null;
  materialCategory?: MaterialCategoryRead;
  batches?: MaterialBatch[] | null;
  kind?: MaterialKind;
  status?: BatchKind;
  totalStock?: number;
};
export type RequisitionType = 0 | 1;
export type ProductCategory = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
};
export type ProductCategoryRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
};
export type UnitOfMeasure = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  symbol?: string | null;
  description?: string | null;
  isScalable?: boolean;
  isRawMaterial?: boolean;
};
export type UnitOfMeasureRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  symbol?: string | null;
  description?: string | null;
  isScalable?: boolean;
  isRawMaterial?: boolean;
};
export type Equipment = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  machineId?: string | null;
  isStorage?: boolean;
  capacityQuantity?: number;
  uoMId?: string;
  uoM?: UnitOfMeasure;
  relevanceCheck?: boolean;
  departmentId?: string;
  department?: Department;
  storageLocation?: string | null;
};
export type EquipmentRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  machineId?: string | null;
  isStorage?: boolean;
  capacityQuantity?: number;
  uoMId?: string;
  uoM?: UnitOfMeasureRead;
  relevanceCheck?: boolean;
  departmentId?: string;
  department?: Department;
  storageLocation?: string | null;
};
export type FinishedProduct = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  productId?: string;
  product?: Product;
  uoMId?: string;
  uoM?: UnitOfMeasure;
  standardCost?: number;
  sellingPrice?: number;
  dosageForm?: string | null;
  strength?: string | null;
};
export type FinishedProductRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  productId?: string;
  product?: Product;
  uoMId?: string;
  uoM?: UnitOfMeasureRead;
  standardCost?: number;
  sellingPrice?: number;
  dosageForm?: string | null;
  strength?: string | null;
};
export type MaterialType = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
};
export type MaterialTypeRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
};
export type BillOfMaterialItem = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  billOfMaterialId?: string;
  billOfMaterial?: BillOfMaterial;
  materialId?: string;
  material?: Material;
  materialTypeId?: string | null;
  materialType?: MaterialType;
  grade?: string | null;
  casNumber?: string | null;
  function?: string | null;
  order?: number;
  isSubstitutable?: boolean;
  baseQuantity?: number;
  baseUoMId?: string | null;
  baseUoM?: UnitOfMeasure;
};
export type BillOfMaterialItemRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  billOfMaterialId?: string;
  billOfMaterial?: BillOfMaterial;
  materialId?: string;
  material?: MaterialRead;
  materialTypeId?: string | null;
  materialType?: MaterialTypeRead;
  grade?: string | null;
  casNumber?: string | null;
  function?: string | null;
  order?: number;
  isSubstitutable?: boolean;
  baseQuantity?: number;
  baseUoMId?: string | null;
  baseUoM?: UnitOfMeasureRead;
};
export type BillOfMaterial = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productId?: string;
  product?: Product;
  version?: number;
  isActive?: boolean;
  items?: BillOfMaterialItem[] | null;
};
export type BillOfMaterialRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productId?: string;
  product?: Product;
  version?: number;
  isActive?: boolean;
  items?: BillOfMaterialItemRead[] | null;
};
export type ProductBillOfMaterial = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productId?: string;
  product?: Product;
  billOfMaterialId?: string;
  billOfMaterial?: BillOfMaterial;
  quantity?: number;
  version?: number;
  effectiveDate?: string;
  isActive?: boolean;
};
export type ProductBillOfMaterialRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productId?: string;
  product?: Product;
  billOfMaterialId?: string;
  billOfMaterial?: BillOfMaterialRead;
  quantity?: number;
  version?: number;
  effectiveDate?: string;
  isActive?: boolean;
};
export type ProductPackage = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productId?: string;
  product?: Product;
  materialId?: string;
  material?: Material;
  materialThickness?: string | null;
  otherStandards?: string | null;
  baseQuantity?: number;
  baseUoMId?: string | null;
  baseUoM?: UnitOfMeasure;
  unitCapacity?: number;
  directLinkMaterialId?: string | null;
  directLinkMaterial?: Material;
  packingExcessMargin?: number;
};
export type ProductPackageRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productId?: string;
  product?: Product;
  materialId?: string;
  material?: MaterialRead;
  materialThickness?: string | null;
  otherStandards?: string | null;
  baseQuantity?: number;
  baseUoMId?: string | null;
  baseUoM?: UnitOfMeasureRead;
  unitCapacity?: number;
  directLinkMaterialId?: string | null;
  directLinkMaterial?: MaterialRead;
  packingExcessMargin?: number;
};
export type Operation = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
  order?: number;
};
export type OperationRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
  order?: number;
};
export type QuestionOption = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  questionId?: string;
  question?: Question;
  name?: string | null;
};
export type QuestionOptionRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  questionId?: string;
  question?: Question;
  name?: string | null;
};
export type Question = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  label?: string | null;
  type?: QuestionType;
  validation?: QuestionValidationType;
  options?: QuestionOption[] | null;
  isMultiSelect?: boolean;
  reference?: string | null;
};
export type QuestionRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  label?: string | null;
  type?: QuestionType;
  validation?: QuestionValidationType;
  options?: QuestionOptionRead[] | null;
  isMultiSelect?: boolean;
  reference?: string | null;
};
export type FormField = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  formSectionId?: string;
  formSection?: FormSection;
  questionId?: string;
  question?: Question;
  required?: boolean;
  response?: string | null;
  rank?: number;
  assigneeId?: string | null;
  assignee?: User;
  reviewerId?: string | null;
  reviewer?: User;
};
export type FormFieldRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  formSectionId?: string;
  formSection?: FormSection;
  questionId?: string;
  question?: QuestionRead;
  required?: boolean;
  response?: string | null;
  rank?: number;
  assigneeId?: string | null;
  assignee?: User;
  reviewerId?: string | null;
  reviewer?: User;
};
export type FormSection = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  formId?: string;
  form?: Form;
  name?: string | null;
  description?: string | null;
  fields?: FormField[] | null;
};
export type FormSectionRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  formId?: string;
  form?: Form;
  name?: string | null;
  description?: string | null;
  fields?: FormFieldRead[] | null;
};
export type Response = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  formId?: string;
  form?: Form;
  formResponses?: FormResponse[] | null;
};
export type ResponseRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  formId?: string;
  form?: Form;
  formResponses?: FormResponse[] | null;
};
export type FormResponse = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  responseId?: string;
  response?: Response;
  formFieldId?: string;
  formField?: FormField;
  value?: string | null;
};
export type FormResponseRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  responseId?: string;
  response?: ResponseRead;
  formFieldId?: string;
  formField?: FormFieldRead;
  value?: string | null;
};
export type FormAssignee = {
  id?: string;
  formId?: string;
  form?: Form;
  userId?: string;
  user?: User;
};
export type FormAssigneeRead = {
  id?: string;
  formId?: string;
  form?: Form;
  userId?: string;
  user?: User;
};
export type FormReviewer = {
  id?: string;
  formId?: string;
  form?: Form;
  userId?: string;
  user?: User;
};
export type FormReviewerRead = {
  id?: string;
  formId?: string;
  form?: Form;
  userId?: string;
  user?: User;
};
export type Form = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  sections?: FormSection[] | null;
  responses?: FormResponse[] | null;
  assignees?: FormAssignee[] | null;
  reviewers?: FormReviewer[] | null;
};
export type FormRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  sections?: FormSectionRead[] | null;
  responses?: FormResponseRead[] | null;
  assignees?: FormAssigneeRead[] | null;
  reviewers?: FormReviewerRead[] | null;
};
export type Resource = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  type?: string | null;
  isAvailable?: boolean;
};
export type ResourceRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  type?: string | null;
  isAvailable?: boolean;
};
export type RouteResource = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  routeId?: string;
  route?: Route;
  resourceId?: string;
  resource?: Resource;
};
export type RouteResourceRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  routeId?: string;
  route?: Route;
  resourceId?: string;
  resource?: ResourceRead;
};
export type RouteResponsibleUser = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  routeId?: string;
  route?: Route;
  userId?: string;
  user?: User;
};
export type RouteResponsibleUserRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  routeId?: string;
  route?: Route;
  userId?: string;
  user?: User;
};
export type Role = {
  id?: string;
  name?: string | null;
  normalizedName?: string | null;
  concurrencyStamp?: string | null;
  displayName?: string | null;
  createdAt?: string;
  createdById?: string | null;
  updatedAt?: string | null;
  lastUpdatedById?: string | null;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
};
export type RouteResponsibleRole = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  routeId?: string;
  route?: Route;
  roleId?: string;
  role?: Role;
};
export type RouteResponsibleRoleRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  routeId?: string;
  route?: Route;
  roleId?: string;
  role?: Role;
};
export type WorkCenter = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
};
export type WorkCenterRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
};
export type RouteWorkCenter = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  routeId?: string;
  route?: Route;
  workCenterId?: string;
  workCenter?: WorkCenter;
};
export type RouteWorkCenterRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  routeId?: string;
  route?: Route;
  workCenterId?: string;
  workCenter?: WorkCenterRead;
};
export type Route = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productId?: string;
  product?: Product;
  operationId?: string;
  operation?: Operation;
  estimatedTime?: string | null;
  workflowId?: string | null;
  workFlow?: Form;
  order?: number;
  resources?: RouteResource[] | null;
  responsibleUsers?: RouteResponsibleUser[] | null;
  responsibleRoles?: RouteResponsibleRole[] | null;
  workCenters?: RouteWorkCenter[] | null;
};
export type RouteRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productId?: string;
  product?: Product;
  operationId?: string;
  operation?: OperationRead;
  estimatedTime?: string | null;
  workflowId?: string | null;
  workFlow?: FormRead;
  order?: number;
  resources?: RouteResourceRead[] | null;
  responsibleUsers?: RouteResponsibleUserRead[] | null;
  responsibleRoles?: RouteResponsibleRoleRead[] | null;
  workCenters?: RouteWorkCenterRead[] | null;
};
export type Product = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  name?: string | null;
  genericName?: string | null;
  storageCondition?: string | null;
  packageStyle?: string | null;
  filledWeight?: string | null;
  shelfLife?: string | null;
  actionUse?: string | null;
  description?: string | null;
  fdaRegistrationNumber?: string | null;
  masterFormulaNumber?: string | null;
  primaryPackDescription?: string | null;
  secondaryPackDescription?: string | null;
  tertiaryPackDescription?: string | null;
  categoryId?: string;
  category?: ProductCategory;
  baseQuantity?: number;
  basePackingQuantity?: number;
  baseUomId?: string | null;
  baseUoM?: UnitOfMeasure;
  basePackingUomId?: string | null;
  basePackingUoM?: UnitOfMeasure;
  equipmentId?: string | null;
  equipment?: Equipment;
  departmentId?: string | null;
  department?: Department;
  fullBatchSize?: number;
  finishedProducts?: FinishedProduct[] | null;
  billOfMaterials?: ProductBillOfMaterial[] | null;
  packages?: ProductPackage[] | null;
  routes?: Route[] | null;
};
export type ProductRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  name?: string | null;
  genericName?: string | null;
  storageCondition?: string | null;
  packageStyle?: string | null;
  filledWeight?: string | null;
  shelfLife?: string | null;
  actionUse?: string | null;
  description?: string | null;
  fdaRegistrationNumber?: string | null;
  masterFormulaNumber?: string | null;
  primaryPackDescription?: string | null;
  secondaryPackDescription?: string | null;
  tertiaryPackDescription?: string | null;
  categoryId?: string;
  category?: ProductCategoryRead;
  baseQuantity?: number;
  basePackingQuantity?: number;
  baseUomId?: string | null;
  baseUoM?: UnitOfMeasureRead;
  basePackingUomId?: string | null;
  basePackingUoM?: UnitOfMeasureRead;
  equipmentId?: string | null;
  equipment?: EquipmentRead;
  departmentId?: string | null;
  department?: Department;
  fullBatchSize?: number;
  finishedProducts?: FinishedProductRead[] | null;
  billOfMaterials?: ProductBillOfMaterialRead[] | null;
  packages?: ProductPackageRead[] | null;
  routes?: RouteRead[] | null;
};
export type ProductionStatus = 0 | 1 | 2 | 3 | 4;
export type BatchSize = 0 | 1;
export type ProductionScheduleProduct = {
  id?: string;
  productionScheduleId?: string;
  productionSchedule?: ProductionSchedule;
  productId?: string;
  product?: Product;
  batchNumber?: string | null;
  batchSize?: BatchSize;
  quantity?: number;
};
export type ProductionScheduleProductRead = {
  id?: string;
  productionScheduleId?: string;
  productionSchedule?: ProductionSchedule;
  productId?: string;
  product?: ProductRead;
  batchNumber?: string | null;
  batchSize?: BatchSize;
  quantity?: number;
};
export type ProductionSchedule = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  status?: ProductionStatus;
  remarks?: string | null;
  products?: ProductionScheduleProduct[] | null;
};
export type ProductionScheduleRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  status?: ProductionStatus;
  remarks?: string | null;
  products?: ProductionScheduleProductRead[] | null;
};
export type ProductionActivityLog = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productionActivityId?: string;
  productionActivity?: ProductionActivity;
  message?: string | null;
  userId?: string | null;
  user?: User;
  timestamp?: string;
};
export type ProductionActivityLogRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productionActivityId?: string;
  productionActivity?: ProductionActivity;
  message?: string | null;
  userId?: string | null;
  user?: User;
  timestamp?: string;
};
export type ProductionActivity = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  productionScheduleId?: string;
  productionSchedule?: ProductionSchedule;
  productId?: string;
  product?: Product;
  steps?: ProductionActivityStep[] | null;
  status?: ProductionStatus;
  startedAt?: string;
  completedAt?: string | null;
  activityLogs?: ProductionActivityLog[] | null;
};
export type ProductionActivityRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  productionScheduleId?: string;
  productionSchedule?: ProductionScheduleRead;
  productId?: string;
  product?: ProductRead;
  steps?: ProductionActivityStep[] | null;
  status?: ProductionStatus;
  startedAt?: string;
  completedAt?: string | null;
  activityLogs?: ProductionActivityLogRead[] | null;
};
export type ProductionActivityStepResource = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productionActivityStepId?: string;
  productionActivityStep?: ProductionActivityStep;
  resourceId?: string;
  resource?: Resource;
};
export type ProductionActivityStepResourceRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productionActivityStepId?: string;
  productionActivityStep?: ProductionActivityStep;
  resourceId?: string;
  resource?: ResourceRead;
};
export type ProductionActivityStepWorkCenter = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productionActivityStepId?: string;
  productionActivityStep?: ProductionActivityStep;
  workCenterId?: string;
  workCenter?: WorkCenter;
};
export type ProductionActivityStepWorkCenterRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productionActivityStepId?: string;
  productionActivityStep?: ProductionActivityStep;
  workCenterId?: string;
  workCenter?: WorkCenterRead;
};
export type ProductionActivityStepUser = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productionActivityStepId?: string;
  productionActivityStep?: ProductionActivityStep;
  userId?: string;
  user?: User;
};
export type ProductionActivityStepUserRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productionActivityStepId?: string;
  productionActivityStep?: ProductionActivityStep;
  userId?: string;
  user?: User;
};
export type ProductionActivityStep = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productionActivityId?: string;
  productionActivity?: ProductionActivity;
  operationId?: string;
  operation?: Operation;
  workflowId?: string | null;
  workFlow?: Form;
  order?: number;
  resources?: ProductionActivityStepResource[] | null;
  workCenters?: ProductionActivityStepWorkCenter[] | null;
  responsibleUsers?: ProductionActivityStepUser[] | null;
  status?: ProductionStatus;
  startedAt?: string | null;
  completedAt?: string | null;
};
export type ProductionActivityStepRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productionActivityId?: string;
  productionActivity?: ProductionActivityRead;
  operationId?: string;
  operation?: OperationRead;
  workflowId?: string | null;
  workFlow?: FormRead;
  order?: number;
  resources?: ProductionActivityStepResourceRead[] | null;
  workCenters?: ProductionActivityStepWorkCenterRead[] | null;
  responsibleUsers?: ProductionActivityStepUserRead[] | null;
  status?: ProductionStatus;
  startedAt?: string | null;
  completedAt?: string | null;
};
export type ApprovalStage = {
  userId?: string | null;
  user?: User;
  roleId?: string | null;
  role?: Role;
  id?: string;
  approvalId?: string;
  approval?: Approval;
  order?: number;
  required?: boolean;
};
export type ApprovalStageRead = {
  userId?: string | null;
  user?: User;
  roleId?: string | null;
  role?: Role;
  id?: string;
  approvalId?: string;
  approval?: Approval;
  order?: number;
  required?: boolean;
};
export type Approval = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  itemType?: string | null;
  escalationDuration?: string;
  approvalStages?: ApprovalStage[] | null;
};
export type ApprovalRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  itemType?: string | null;
  escalationDuration?: string;
  approvalStages?: ApprovalStageRead[] | null;
};
export type RequisitionApproval = {
  userId?: string | null;
  user?: User;
  roleId?: string | null;
  role?: Role;
  required?: boolean;
  order?: number;
  stageStartTime?: string | null;
  status?: ApprovalStatus;
  approvalTime?: string | null;
  approvedById?: string | null;
  approvedBy?: User;
  createdAt?: string;
  activatedAt?: string | null;
  comments?: string | null;
  id?: string;
  requisitionId?: string;
  requisition?: Requisition;
  approvalId?: string;
  approval?: Approval;
};
export type RequisitionApprovalRead = {
  userId?: string | null;
  user?: User;
  roleId?: string | null;
  role?: Role;
  required?: boolean;
  order?: number;
  stageStartTime?: string | null;
  status?: ApprovalStatus;
  approvalTime?: string | null;
  approvedById?: string | null;
  approvedBy?: User;
  createdAt?: string;
  activatedAt?: string | null;
  comments?: string | null;
  id?: string;
  requisitionId?: string;
  requisition?: Requisition;
  approvalId?: string;
  approval?: ApprovalRead;
};
export type Requisition = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  requestedById?: string;
  requestedBy?: User;
  departmentId?: string;
  department?: Department;
  requisitionType?: RequisitionType;
  status?: RequestStatus;
  comments?: string | null;
  expectedDelivery?: string | null;
  productId?: string | null;
  product?: Product;
  productionScheduleId?: string | null;
  productionSchedule?: ProductionSchedule;
  productionActivityStepId?: string | null;
  productionActivityStep?: ProductionActivityStep;
  approvals?: RequisitionApproval[] | null;
  items?: RequisitionItem[] | null;
  approved?: boolean;
};
export type RequisitionRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  requestedById?: string;
  requestedBy?: User;
  departmentId?: string;
  department?: Department;
  requisitionType?: RequisitionType;
  status?: RequestStatus;
  comments?: string | null;
  expectedDelivery?: string | null;
  productId?: string | null;
  product?: ProductRead;
  productionScheduleId?: string | null;
  productionSchedule?: ProductionScheduleRead;
  productionActivityStepId?: string | null;
  productionActivityStep?: ProductionActivityStepRead;
  approvals?: RequisitionApprovalRead[] | null;
  items?: RequisitionItem[] | null;
  approved?: boolean;
};
export type RequisitionItem = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  requisitionId?: string;
  requisition?: Requisition;
  materialId?: string;
  material?: Material;
  uoMId?: string | null;
  uoM?: UnitOfMeasure;
  quantity?: number;
  quantityReceived?: number;
  status?: RequestStatus;
};
export type RequisitionItemRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  requisitionId?: string;
  requisition?: RequisitionRead;
  materialId?: string;
  material?: MaterialRead;
  uoMId?: string | null;
  uoM?: UnitOfMeasureRead;
  quantity?: number;
  quantityReceived?: number;
  status?: RequestStatus;
};
export type BatchManufacturingRecord = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productId?: string;
  product?: Product;
  productionScheduleId?: string;
  productionSchedule?: ProductionSchedule;
  productionActivityStepId?: string;
  productionActivityStep?: ProductionActivityStep;
  batchNumber?: string | null;
  manufacturingDate?: string | null;
  expiryDate?: string | null;
  batchQuantity?: number;
  issuedById?: string | null;
  issuedBy?: User;
};
export type BatchManufacturingRecordRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  productId?: string;
  product?: ProductRead;
  productionScheduleId?: string;
  productionSchedule?: ProductionScheduleRead;
  productionActivityStepId?: string;
  productionActivityStep?: ProductionActivityStepRead;
  batchNumber?: string | null;
  manufacturingDate?: string | null;
  expiryDate?: string | null;
  batchQuantity?: number;
  issuedById?: string | null;
  issuedBy?: User;
};
export type PackageStyle = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
};
export type PackageStyleRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
};
export type FinishedGoodsTransferNote = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  fromWarehouseId?: string | null;
  fromWarehouse?: Warehouse;
  toWarehouseId?: string | null;
  toWarehouse?: Warehouse;
  quantityPerPack?: number;
  packageStyleId?: string | null;
  packageStyle?: PackageStyle;
  uoMId?: string | null;
  uoM?: UnitOfMeasure;
  totalQuantity?: number;
  qarNumber?: string | null;
  batchManufacturingRecordId?: string;
  batchManufacturingRecord?: BatchManufacturingRecord;
  productionActivityStepId?: string | null;
  productionActivityStep?: ProductionActivityStep;
};
export type FinishedGoodsTransferNoteRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  fromWarehouseId?: string | null;
  fromWarehouse?: Warehouse;
  toWarehouseId?: string | null;
  toWarehouse?: Warehouse;
  quantityPerPack?: number;
  packageStyleId?: string | null;
  packageStyle?: PackageStyleRead;
  uoMId?: string | null;
  uoM?: UnitOfMeasureRead;
  totalQuantity?: number;
  qarNumber?: string | null;
  batchManufacturingRecordId?: string;
  batchManufacturingRecord?: BatchManufacturingRecordRead;
  productionActivityStepId?: string | null;
  productionActivityStep?: ProductionActivityStepRead;
};
export type DistributedFinishedProductStatus = 0 | 1;
export type DistributedFinishedProduct = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  warehouseArrivalLocationId?: string | null;
  warehouseArrivalLocation?: WarehouseArrivalLocation;
  productId?: string | null;
  batchManufacturingRecordId?: string | null;
  batchManufacturingRecord?: BatchManufacturingRecord;
  transferNoteId?: string | null;
  transferNote?: FinishedGoodsTransferNote;
  product?: Product;
  uomId?: string | null;
  uoM?: UnitOfMeasure;
  quantity?: number;
  distributedAt?: string | null;
  arrivedAt?: string | null;
  status?: DistributedFinishedProductStatus;
};
export type DistributedFinishedProductRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  warehouseArrivalLocationId?: string | null;
  warehouseArrivalLocation?: WarehouseArrivalLocation;
  productId?: string | null;
  batchManufacturingRecordId?: string | null;
  batchManufacturingRecord?: BatchManufacturingRecordRead;
  transferNoteId?: string | null;
  transferNote?: FinishedGoodsTransferNoteRead;
  product?: ProductRead;
  uomId?: string | null;
  uoM?: UnitOfMeasureRead;
  quantity?: number;
  distributedAt?: string | null;
  arrivedAt?: string | null;
  status?: DistributedFinishedProductStatus;
};
export type WarehouseArrivalLocation = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  warehouseId?: string;
  warehouse?: Warehouse;
  name?: string | null;
  floorName?: string | null;
  description?: string | null;
  distributedRequisitionMaterials?: DistributedRequisitionMaterial[] | null;
  distributedFinishedProducts?: DistributedFinishedProduct[] | null;
  distributedStockTransferBatches?: MaterialBatch[] | null;
};
export type WarehouseArrivalLocationRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  warehouseId?: string;
  warehouse?: Warehouse;
  name?: string | null;
  floorName?: string | null;
  description?: string | null;
  distributedRequisitionMaterials?: DistributedRequisitionMaterial[] | null;
  distributedFinishedProducts?: DistributedFinishedProductRead[] | null;
  distributedStockTransferBatches?: MaterialBatch[] | null;
};
export type Country = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  nationality?: string | null;
  code?: string | null;
};
export type CountryRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  nationality?: string | null;
  code?: string | null;
};
export type Currency = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  symbol?: string | null;
  description?: string | null;
};
export type CurrencyRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  symbol?: string | null;
  description?: string | null;
};
export type ManufacturerMaterial = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  manufacturerId?: string;
  manufacturer?: Manufacturer;
  materialId?: string;
  material?: Material;
};
export type ManufacturerMaterialRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  manufacturerId?: string;
  manufacturer?: Manufacturer;
  materialId?: string;
  material?: MaterialRead;
};
export type Manufacturer = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  address?: string | null;
  email?: string | null;
  approvedAt?: string | null;
  validityDate?: string | null;
  countryId?: string | null;
  country?: Country;
  materials?: ManufacturerMaterial[] | null;
};
export type ManufacturerRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  address?: string | null;
  email?: string | null;
  approvedAt?: string | null;
  validityDate?: string | null;
  countryId?: string | null;
  country?: CountryRead;
  materials?: ManufacturerMaterialRead[] | null;
};
export type SupplierManufacturer = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  supplierId?: string;
  supplier?: Supplier;
  manufacturerId?: string;
  manufacturer?: Manufacturer;
  materialId?: string | null;
  material?: Material;
  quantityPerPack?: number;
  default?: boolean;
};
export type SupplierManufacturerRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  supplierId?: string;
  supplier?: Supplier;
  manufacturerId?: string;
  manufacturer?: ManufacturerRead;
  materialId?: string | null;
  material?: MaterialRead;
  quantityPerPack?: number;
  default?: boolean;
};
export type Supplier = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  email?: string | null;
  address?: string | null;
  contactPerson?: string | null;
  contactNumber?: string | null;
  countryId?: string | null;
  country?: Country;
  currencyId?: string | null;
  currency?: Currency;
  type?: SupplierType;
  status?: SupplierStatus;
  associatedManufacturers?: SupplierManufacturer[] | null;
};
export type SupplierRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  email?: string | null;
  address?: string | null;
  contactPerson?: string | null;
  contactNumber?: string | null;
  countryId?: string | null;
  country?: CountryRead;
  currencyId?: string | null;
  currency?: CurrencyRead;
  type?: SupplierType;
  status?: SupplierStatus;
  associatedManufacturers?: SupplierManufacturerRead[] | null;
};
export type ShipmentInvoice = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  supplierId?: string | null;
  supplier?: Supplier;
  items?: ShipmentInvoiceItem[] | null;
  totalCost?: number;
  currencyId?: string | null;
  currency?: Currency;
};
export type ShipmentInvoiceRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  supplierId?: string | null;
  supplier?: SupplierRead;
  items?: ShipmentInvoiceItem[] | null;
  totalCost?: number;
  currencyId?: string | null;
  currency?: CurrencyRead;
};
export type ProcurementSource = 0 | 1;
export type SourceRequisitionItem = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  sourceRequisitionId?: string;
  sourceRequisition?: SourceRequisition;
  materialId?: string;
  material?: Material;
  uoMId?: string;
  uoM?: UnitOfMeasure;
  quantity?: number;
  source?: ProcurementSource;
  requisitionId?: string;
};
export type SourceRequisitionItemRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  sourceRequisitionId?: string;
  sourceRequisition?: SourceRequisition;
  materialId?: string;
  material?: MaterialRead;
  uoMId?: string;
  uoM?: UnitOfMeasureRead;
  quantity?: number;
  source?: ProcurementSource;
  requisitionId?: string;
};
export type SourceRequisition = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  supplierId?: string;
  supplier?: Supplier;
  sentQuotationRequestAt?: string | null;
  items?: SourceRequisitionItem[] | null;
};
export type SourceRequisitionRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  supplierId?: string;
  supplier?: SupplierRead;
  sentQuotationRequestAt?: string | null;
  items?: SourceRequisitionItemRead[] | null;
};
export type PurchaseOrderItem = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  purchaseOrderId?: string;
  purchaseOrder?: PurchaseOrder;
  materialId?: string;
  material?: Material;
  uoMId?: string;
  uoM?: UnitOfMeasure;
  quantity?: number;
  price?: number;
  currencyId?: string | null;
  currency?: Currency;
};
export type PurchaseOrderItemRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  purchaseOrderId?: string;
  purchaseOrder?: PurchaseOrder;
  materialId?: string;
  material?: MaterialRead;
  uoMId?: string;
  uoM?: UnitOfMeasureRead;
  quantity?: number;
  price?: number;
  currencyId?: string | null;
  currency?: CurrencyRead;
};
export type RevisedPurchaseOrder = {
  id?: string;
  type?: RevisedPurchaseOrderType;
  purchaseOrderItemId?: string | null;
  purchaseOrderItem?: PurchaseOrderItem;
  materialId?: string | null;
  material?: Material;
  uoMId?: string | null;
  uoM?: UnitOfMeasure;
  quantity?: number | null;
  price?: number | null;
  currencyId?: string | null;
  currency?: Currency;
  uoMBeforeId?: string | null;
  uomBefore?: UnitOfMeasure;
  quantityBefore?: number | null;
  priceBefore?: number | null;
  currencyBeforeId?: string | null;
  currencyBefore?: Currency;
  materialBeforeId?: string | null;
  materialBefore?: Material;
  revisionNumber?: number;
};
export type RevisedPurchaseOrderRead = {
  id?: string;
  type?: RevisedPurchaseOrderType;
  purchaseOrderItemId?: string | null;
  purchaseOrderItem?: PurchaseOrderItemRead;
  materialId?: string | null;
  material?: MaterialRead;
  uoMId?: string | null;
  uoM?: UnitOfMeasureRead;
  quantity?: number | null;
  price?: number | null;
  currencyId?: string | null;
  currency?: CurrencyRead;
  uoMBeforeId?: string | null;
  uomBefore?: UnitOfMeasureRead;
  quantityBefore?: number | null;
  priceBefore?: number | null;
  currencyBeforeId?: string | null;
  currencyBefore?: CurrencyRead;
  materialBeforeId?: string | null;
  materialBefore?: MaterialRead;
  revisionNumber?: number;
};
export type DeliveryMode = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
};
export type DeliveryModeRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
};
export type TermsOfPayment = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
};
export type TermsOfPaymentRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
};
export type PurchaseOrderApproval = {
  userId?: string | null;
  user?: User;
  roleId?: string | null;
  role?: Role;
  required?: boolean;
  order?: number;
  stageStartTime?: string | null;
  status?: ApprovalStatus;
  approvalTime?: string | null;
  approvedById?: string | null;
  approvedBy?: User;
  createdAt?: string;
  activatedAt?: string | null;
  comments?: string | null;
  id?: string;
  purchaseOrderId?: string;
  purchaseOrder?: PurchaseOrder;
  approvalId?: string;
  approval?: Approval;
};
export type PurchaseOrderApprovalRead = {
  userId?: string | null;
  user?: User;
  roleId?: string | null;
  role?: Role;
  required?: boolean;
  order?: number;
  stageStartTime?: string | null;
  status?: ApprovalStatus;
  approvalTime?: string | null;
  approvedById?: string | null;
  approvedBy?: User;
  createdAt?: string;
  activatedAt?: string | null;
  comments?: string | null;
  id?: string;
  purchaseOrderId?: string;
  purchaseOrder?: PurchaseOrder;
  approvalId?: string;
  approval?: ApprovalRead;
};
export type PurchaseOrder = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  proFormaInvoiceNumber?: string | null;
  sourceRequisitionId?: string;
  sourceRequisition?: SourceRequisition;
  supplierId?: string;
  supplier?: Supplier;
  requestDate?: string;
  expectedDeliveryDate?: string | null;
  items?: PurchaseOrderItem[] | null;
  deliveryDate?: string | null;
  sentAt?: string | null;
  status?: PurchaseOrderStatus;
  revisionNumber?: number;
  revisedPurchaseOrders?: RevisedPurchaseOrder[] | null;
  deliveryMode?: DeliveryMode;
  termsOfPayment?: TermsOfPayment;
  deliveryModeId?: string | null;
  termsOfPaymentId?: string | null;
  totalFobValue?: number;
  totalCifValue?: number;
  seaFreight?: number;
  insurance?: number;
  amountInFigures?: string | null;
  estimatedDeliveryDate?: string | null;
  approvals?: PurchaseOrderApproval[] | null;
  approved?: boolean;
};
export type PurchaseOrderRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  proFormaInvoiceNumber?: string | null;
  sourceRequisitionId?: string;
  sourceRequisition?: SourceRequisitionRead;
  supplierId?: string;
  supplier?: SupplierRead;
  requestDate?: string;
  expectedDeliveryDate?: string | null;
  items?: PurchaseOrderItemRead[] | null;
  deliveryDate?: string | null;
  sentAt?: string | null;
  status?: PurchaseOrderStatus;
  isRevised?: boolean;
  revisionNumber?: number;
  revisedPurchaseOrders?: RevisedPurchaseOrderRead[] | null;
  deliveryMode?: DeliveryModeRead;
  termsOfPayment?: TermsOfPaymentRead;
  deliveryModeId?: string | null;
  termsOfPaymentId?: string | null;
  totalFobValue?: number;
  totalCifValue?: number;
  seaFreight?: number;
  insurance?: number;
  amountInFigures?: string | null;
  estimatedDeliveryDate?: string | null;
  approvals?: PurchaseOrderApprovalRead[] | null;
  approved?: boolean;
};
export type ShipmentInvoiceItem = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  shipmentInvoiceId?: string;
  shipmentInvoice?: ShipmentInvoice;
  materialId?: string;
  material?: Material;
  uoMId?: string;
  uoM?: UnitOfMeasure;
  manufacturerId?: string;
  manufacturer?: Manufacturer;
  purchaseOrderId?: string;
  purchaseOrder?: PurchaseOrder;
  expectedQuantity?: number;
  receivedQuantity?: number;
  reason?: string | null;
  distributed?: boolean;
  totalCost?: number;
  currencyId?: string | null;
  currency?: Currency;
};
export type ShipmentInvoiceItemRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  shipmentInvoiceId?: string;
  shipmentInvoice?: ShipmentInvoiceRead;
  materialId?: string;
  material?: MaterialRead;
  uoMId?: string;
  uoM?: UnitOfMeasureRead;
  manufacturerId?: string;
  manufacturer?: ManufacturerRead;
  purchaseOrderId?: string;
  purchaseOrder?: PurchaseOrderRead;
  expectedQuantity?: number;
  receivedQuantity?: number;
  reason?: string | null;
  distributed?: boolean;
  totalCost?: number;
  currencyId?: string | null;
  currency?: CurrencyRead;
};
export type MaterialItemDistribution = {
  id?: string;
  distributedRequisitionMaterialId?: string;
  distributedRequisitionMaterial?: DistributedRequisitionMaterial;
  shipmentInvoiceItemId?: string;
  shipmentInvoiceItem?: ShipmentInvoiceItem;
  quantity?: number;
};
export type MaterialItemDistributionRead = {
  id?: string;
  distributedRequisitionMaterialId?: string;
  distributedRequisitionMaterial?: DistributedRequisitionMaterial;
  shipmentInvoiceItemId?: string;
  shipmentInvoiceItem?: ShipmentInvoiceItemRead;
  quantity?: number;
};
export type DistributedRequisitionMaterial = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  requisitionItemId?: string | null;
  requisitionItem?: RequisitionItem;
  warehouseArrivalLocationId?: string | null;
  warehouseArrivalLocation?: WarehouseArrivalLocation;
  materialItemDistributions?: MaterialItemDistribution[] | null;
  shipmentInvoiceId?: string | null;
  shipmentInvoice?: ShipmentInvoice;
  materialId?: string | null;
  material?: Material;
  uomId?: string | null;
  uoM?: UnitOfMeasure;
  quantity?: number;
  distributedAt?: string | null;
  arrivedAt?: string | null;
  checkedAt?: string | null;
  grnGeneratedAt?: string | null;
  status?: DistributedRequisitionMaterialStatus;
  checkLists?: Checklist[] | null;
};
export type DistributedRequisitionMaterialRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  requisitionItemId?: string | null;
  requisitionItem?: RequisitionItemRead;
  warehouseArrivalLocationId?: string | null;
  warehouseArrivalLocation?: WarehouseArrivalLocationRead;
  materialItemDistributions?: MaterialItemDistributionRead[] | null;
  shipmentInvoiceId?: string | null;
  shipmentInvoice?: ShipmentInvoiceRead;
  materialId?: string | null;
  material?: MaterialRead;
  uomId?: string | null;
  uoM?: UnitOfMeasureRead;
  quantity?: number;
  distributedAt?: string | null;
  arrivedAt?: string | null;
  checkedAt?: string | null;
  grnGeneratedAt?: string | null;
  status?: DistributedRequisitionMaterialStatus;
  checkLists?: Checklist[] | null;
};
export type Checklist = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  distributedRequisitionMaterialId?: string;
  distributedRequisitionMaterial?: DistributedRequisitionMaterial;
  materialId?: string | null;
  material?: Material;
  checkedAt?: string | null;
  shipmentInvoiceId?: string | null;
  shipmentInvoice?: ShipmentInvoice;
  supplierId?: string | null;
  supplier?: Supplier;
  manufacturerId?: string | null;
  manufacturer?: Manufacturer;
  certificateOfAnalysisDelivered?: boolean;
  visibleLabelling?: boolean;
  intactnessStatus?: Intactness;
  consignmentCarrierStatus?: ConsignmentCarrier;
  materialBatches?: MaterialBatch[] | null;
};
export type ChecklistRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  distributedRequisitionMaterialId?: string;
  distributedRequisitionMaterial?: DistributedRequisitionMaterialRead;
  materialId?: string | null;
  material?: MaterialRead;
  checkedAt?: string | null;
  shipmentInvoiceId?: string | null;
  shipmentInvoice?: ShipmentInvoiceRead;
  supplierId?: string | null;
  supplier?: SupplierRead;
  manufacturerId?: string | null;
  manufacturer?: ManufacturerRead;
  certificateOfAnalysisDelivered?: boolean;
  visibleLabelling?: boolean;
  intactnessStatus?: Intactness;
  consignmentCarrierStatus?: ConsignmentCarrier;
  materialBatches?: MaterialBatch[] | null;
};
export type Grn = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  carrierName?: string | null;
  vehicleNumber?: string | null;
  remarks?: string | null;
  grnNumber?: string | null;
  materialBatches?: MaterialBatch[] | null;
};
export type GrnRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  carrierName?: string | null;
  vehicleNumber?: string | null;
  remarks?: string | null;
  grnNumber?: string | null;
  materialBatches?: MaterialBatch[] | null;
};
export type StockTransfer = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  materialId?: string;
  material?: Material;
  uoMId?: string | null;
  uoM?: UnitOfMeasure;
  reason?: string | null;
  requiredQuantity?: number;
  productId?: string | null;
  product?: Product;
  productionScheduleId?: string | null;
  productionSchedule?: ProductionSchedule;
  productionActivityStepId?: string | null;
  productionActivityStep?: ProductionActivityStep;
  sources?: StockTransferSource[] | null;
};
export type StockTransferRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  materialId?: string;
  material?: MaterialRead;
  uoMId?: string | null;
  uoM?: UnitOfMeasureRead;
  reason?: string | null;
  requiredQuantity?: number;
  productId?: string | null;
  product?: ProductRead;
  productionScheduleId?: string | null;
  productionSchedule?: ProductionScheduleRead;
  productionActivityStepId?: string | null;
  productionActivityStep?: ProductionActivityStepRead;
  sources?: StockTransferSource[] | null;
};
export type StockTransferSource = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  stockTransferId?: string;
  stockTransfer?: StockTransfer;
  fromDepartmentId?: string;
  fromDepartment?: Department;
  toDepartmentId?: string;
  toDepartment?: Department;
  quantity?: number;
  status?: StockTransferStatus;
  approvedAt?: string | null;
  approvedById?: string | null;
  approvedBy?: User;
  issuedById?: string | null;
  issuedBy?: User;
  issuedAt?: string | null;
};
export type StockTransferSourceRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  stockTransferId?: string;
  stockTransfer?: StockTransferRead;
  fromDepartmentId?: string;
  fromDepartment?: Department;
  toDepartmentId?: string;
  toDepartment?: Department;
  quantity?: number;
  status?: StockTransferStatus;
  approvedAt?: string | null;
  approvedById?: string | null;
  approvedBy?: User;
  issuedById?: string | null;
  issuedBy?: User;
  issuedAt?: string | null;
};
export type Sr = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  materialBatchId?: string;
  materialBatch?: MaterialBatch;
  srNumber?: string | null;
  grossWeight?: number;
  uoMId?: string | null;
  uoM?: UnitOfMeasure;
};
export type SrRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  materialBatchId?: string;
  materialBatch?: MaterialBatch;
  srNumber?: string | null;
  grossWeight?: number;
  uoMId?: string | null;
  uoM?: UnitOfMeasureRead;
};
export type MaterialBatchEvent = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  batchId?: string;
  batch?: MaterialBatch;
  quantity?: number;
  userId?: string;
  user?: User;
  type?: EventType;
  consumptionWarehouseId?: string | null;
  consumptionWarehouse?: Warehouse;
  consumedAt?: string | null;
};
export type MaterialBatchEventRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  batchId?: string;
  batch?: MaterialBatch;
  quantity?: number;
  userId?: string;
  user?: User;
  type?: EventType;
  consumptionWarehouseId?: string | null;
  consumptionWarehouse?: Warehouse;
  consumedAt?: string | null;
};
export type MassMaterialBatchMovement = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  batchId?: string;
  batch?: MaterialBatch;
  fromWarehouse?: Warehouse;
  fromWarehouseId?: string | null;
  toWarehouse?: Warehouse;
  toWarehouseId?: string | null;
  quantity?: number;
  movedAt?: string;
  movedById?: string;
  movedBy?: User;
  movementType?: MovementType;
};
export type MassMaterialBatchMovementRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  batchId?: string;
  batch?: MaterialBatch;
  fromWarehouse?: Warehouse;
  fromWarehouseId?: string | null;
  toWarehouse?: Warehouse;
  toWarehouseId?: string | null;
  quantity?: number;
  movedAt?: string;
  movedById?: string;
  movedBy?: User;
  movementType?: MovementType;
};
export type MaterialBatchReservedQuantity = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  materialBatchId?: string;
  materialBatch?: MaterialBatch;
  warehouseId?: string;
  warehouse?: Warehouse;
  productionScheduleId?: string;
  productionSchedule?: ProductionSchedule;
  productId?: string;
  product?: Product;
  uoMId?: string | null;
  uoM?: UnitOfMeasure;
  quantity?: number;
};
export type MaterialBatchReservedQuantityRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  materialBatchId?: string;
  materialBatch?: MaterialBatch;
  warehouseId?: string;
  warehouse?: Warehouse;
  productionScheduleId?: string;
  productionSchedule?: ProductionScheduleRead;
  productId?: string;
  product?: ProductRead;
  uoMId?: string | null;
  uoM?: UnitOfMeasureRead;
  quantity?: number;
};
export type MaterialBatch = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  materialId?: string;
  material?: Material;
  checklistId?: string | null;
  checklist?: Checklist;
  batchNumber?: string | null;
  grnId?: string | null;
  grn?: Grn;
  stockTransferSourceId?: string | null;
  stockTransferSource?: StockTransferSource;
  numberOfContainers?: number;
  containerPackageStyleId?: string | null;
  containerPackageStyle?: PackageStyle;
  quantityPerContainer?: number;
  quantityAssigned?: number;
  totalQuantity?: number;
  consumedQuantity?: number;
  uoMId?: string | null;
  uoM?: UnitOfMeasure;
  status?: BatchStatus;
  dateReceived?: string;
  dateApproved?: string | null;
  dateRejected?: string | null;
  expiryDate?: string | null;
  manufacturingDate?: string | null;
  retestDate?: string | null;
  sampleWeights?: Sr[] | null;
  events?: MaterialBatchEvent[] | null;
  massMovements?: MassMaterialBatchMovement[] | null;
  reservedQuantities?: MaterialBatchReservedQuantity[] | null;
};
export type MaterialBatchRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  materialId?: string;
  material?: MaterialRead;
  checklistId?: string | null;
  checklist?: ChecklistRead;
  batchNumber?: string | null;
  grnId?: string | null;
  grn?: GrnRead;
  stockTransferSourceId?: string | null;
  stockTransferSource?: StockTransferSourceRead;
  numberOfContainers?: number;
  containerPackageStyleId?: string | null;
  containerPackageStyle?: PackageStyleRead;
  quantityPerContainer?: number;
  quantityAssigned?: number;
  totalQuantity?: number;
  consumedQuantity?: number;
  remainingQuantity?: number;
  quantityUnassigned?: number;
  uoMId?: string | null;
  uoM?: UnitOfMeasureRead;
  status?: BatchStatus;
  dateReceived?: string;
  dateApproved?: string | null;
  dateRejected?: string | null;
  expiryDate?: string | null;
  manufacturingDate?: string | null;
  retestDate?: string | null;
  sampleWeights?: SrRead[] | null;
  events?: MaterialBatchEventRead[] | null;
  massMovements?: MassMaterialBatchMovementRead[] | null;
  reservedQuantities?: MaterialBatchReservedQuantityRead[] | null;
  reservedQuantity?: number;
};
export type ShelfMaterialBatch = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  warehouseLocationShelfId?: string;
  warehouseLocationShelf?: WarehouseLocationShelf;
  materialBatchId?: string;
  materialBatch?: MaterialBatch;
  quantity?: number;
  uomId?: string | null;
  uoM?: UnitOfMeasure;
  note?: string | null;
};
export type ShelfMaterialBatchRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  warehouseLocationShelfId?: string;
  warehouseLocationShelf?: WarehouseLocationShelf;
  materialBatchId?: string;
  materialBatch?: MaterialBatchRead;
  quantity?: number;
  uomId?: string | null;
  uoM?: UnitOfMeasureRead;
  note?: string | null;
};
export type WarehouseLocationShelf = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  warehouseLocationRackId?: string;
  warehouseLocationRack?: WarehouseLocationRack;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  materialBatches?: ShelfMaterialBatch[] | null;
};
export type WarehouseLocationShelfRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  warehouseLocationRackId?: string;
  warehouseLocationRack?: WarehouseLocationRack;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  materialBatches?: ShelfMaterialBatchRead[] | null;
};
export type WarehouseLocationRack = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  warehouseLocationId?: string;
  warehouseLocation?: WarehouseLocation;
  name?: string | null;
  description?: string | null;
  shelves?: WarehouseLocationShelf[] | null;
};
export type WarehouseLocationRackRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  warehouseLocationId?: string;
  warehouseLocation?: WarehouseLocation;
  name?: string | null;
  description?: string | null;
  shelves?: WarehouseLocationShelfRead[] | null;
};
export type WarehouseLocation = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  warehouseId?: string;
  warehouse?: Warehouse;
  name?: string | null;
  floorName?: string | null;
  description?: string | null;
  racks?: WarehouseLocationRack[] | null;
};
export type WarehouseLocationRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  warehouseId?: string;
  warehouse?: Warehouse;
  name?: string | null;
  floorName?: string | null;
  description?: string | null;
  racks?: WarehouseLocationRackRead[] | null;
};
export type Warehouse = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  departmentId?: string | null;
  department?: Department;
  description?: string | null;
  locations?: WarehouseLocation[] | null;
  arrivalLocation?: WarehouseArrivalLocation;
  type?: WarehouseType;
};
export type WarehouseRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  departmentId?: string | null;
  department?: Department;
  description?: string | null;
  locations?: WarehouseLocationRead[] | null;
  arrivalLocation?: WarehouseArrivalLocationRead;
  type?: WarehouseType;
};
export type LeaveType = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  isPaid?: boolean;
  deductFromBalance?: boolean;
  deductionLimit?: number | null;
  numberOfDays?: number;
  isActive?: boolean;
  designations?: Designation[] | null;
};
export type LeaveTypeRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  isPaid?: boolean;
  deductFromBalance?: boolean;
  deductionLimit?: number | null;
  numberOfDays?: number;
  isActive?: boolean;
  designations?: Designation[] | null;
};
export type Designation = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name: string;
  description?: string | null;
  maximumLeaveDays?: number;
  departments?: Department[] | null;
  leaveTypes?: LeaveType[] | null;
};
export type DesignationRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name: string;
  description?: string | null;
  maximumLeaveDays?: number;
  departments?: Department[] | null;
  leaveTypes?: LeaveTypeRead[] | null;
};
export type Department = {
  id?: string;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  type?: DepartmentType;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  lastUpdatedById?: string | null;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  warehouses?: Warehouse[] | null;
  designations?: Designation[] | null;
};
export type DepartmentRead = {
  id?: string;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  type?: DepartmentType;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  lastUpdatedById?: string | null;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  warehouses?: WarehouseRead[] | null;
  designations?: DesignationRead[] | null;
};
export type User = {
  id?: string;
  userName?: string | null;
  normalizedUserName?: string | null;
  email?: string | null;
  normalizedEmail?: string | null;
  emailConfirmed?: boolean;
  passwordHash?: string | null;
  securityStamp?: string | null;
  concurrencyStamp?: string | null;
  phoneNumber?: string | null;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnd?: string | null;
  lockoutEnabled?: boolean;
  accessFailedCount?: number;
  firstName?: string | null;
  lastName?: string | null;
  title?: string | null;
  dateOfBirth?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
  lastUpdatedById?: string | null;
  createdById?: string | null;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  avatar?: string | null;
  isDisabled?: boolean;
  departmentId?: string | null;
  department?: Department;
  signature?: string | null;
};
export type UserRead = {
  id?: string;
  userName?: string | null;
  normalizedUserName?: string | null;
  email?: string | null;
  normalizedEmail?: string | null;
  emailConfirmed?: boolean;
  passwordHash?: string | null;
  securityStamp?: string | null;
  concurrencyStamp?: string | null;
  phoneNumber?: string | null;
  phoneNumberConfirmed?: boolean;
  twoFactorEnabled?: boolean;
  lockoutEnd?: string | null;
  lockoutEnabled?: boolean;
  accessFailedCount?: number;
  firstName?: string | null;
  lastName?: string | null;
  title?: string | null;
  dateOfBirth?: string | null;
  createdAt?: string;
  updatedAt?: string | null;
  lastUpdatedById?: string | null;
  createdById?: string | null;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  avatar?: string | null;
  isDisabled?: boolean;
  departmentId?: string | null;
  department?: DepartmentRead;
  signature?: string | null;
};
export type ShipmentDocument = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  code?: string | null;
  discrepancies?: ShipmentDiscrepancy[] | null;
  shipmentInvoiceId?: string | null;
  shipmentInvoice?: ShipmentInvoice;
  arrivedAt?: string | null;
  clearedAt?: string | null;
  transitStartedAt?: string | null;
  type?: DocType;
  completedDistributionAt?: string | null;
  status?: ShipmentStatus;
};
export type ShipmentDocumentRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  code?: string | null;
  discrepancies?: ShipmentDiscrepancy[] | null;
  shipmentInvoiceId?: string | null;
  shipmentInvoice?: ShipmentInvoiceRead;
  arrivedAt?: string | null;
  clearedAt?: string | null;
  transitStartedAt?: string | null;
  type?: DocType;
  completedDistributionAt?: string | null;
  status?: ShipmentStatus;
};
export type ShipmentDiscrepancy = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  shipmentDocumentId?: string;
  shipmentDocument?: ShipmentDocument;
  items?: ShipmentDiscrepancyItem[] | null;
};
export type ShipmentDiscrepancyRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  shipmentDocumentId?: string;
  shipmentDocument?: ShipmentDocumentRead;
  items?: ShipmentDiscrepancyItem[] | null;
};
export type ShipmentDiscrepancyType = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  name?: string | null;
  description?: string | null;
};
export type ShipmentDiscrepancyTypeRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  name?: string | null;
  description?: string | null;
};
export type ShipmentDiscrepancyItem = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: User;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: User;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: User;
  shipmentDiscrepancyId?: string;
  shipmentDiscrepancy?: ShipmentDiscrepancy;
  materialId?: string;
  material?: Material;
  uoMId?: string;
  uoM?: UnitOfMeasure;
  receivedQuantity?: number;
  typeId?: string | null;
  type?: ShipmentDiscrepancyType;
  reason?: string | null;
  resolved?: boolean;
};
export type ShipmentDiscrepancyItemRead = {
  id?: string;
  createdAt?: string;
  updatedAt?: string | null;
  createdById?: string | null;
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  shipmentDiscrepancyId?: string;
  shipmentDiscrepancy?: ShipmentDiscrepancyRead;
  materialId?: string;
  material?: MaterialRead;
  uoMId?: string;
  uoM?: UnitOfMeasureRead;
  receivedQuantity?: number;
  typeId?: string | null;
  type?: ShipmentDiscrepancyTypeRead;
  reason?: string | null;
  resolved?: boolean;
};
export type CreateShipmentDiscrepancy = {
  shipmentDocumentId?: string;
  items?: ShipmentDiscrepancyItem[] | null;
};
export type CreateShipmentDiscrepancyRead = {
  shipmentDocumentId?: string;
  items?: ShipmentDiscrepancyItemRead[] | null;
};
export type DistributionRequisitionItem = {
  department?: DepartmentDto;
  requisitionItem?: RequisitionItemDto;
  quantityRequested?: number;
  quantityAllocated?: number;
  quantityRemaining?: number;
  distributions?: MaterialItemDistributionDto[] | null;
};
export type DistributionRequisitionItemRead = {
  department?: DepartmentDtoRead;
  requisitionItem?: RequisitionItemDto;
  quantityRequested?: number;
  quantityAllocated?: number;
  quantityRemaining?: number;
  distributions?: MaterialItemDistributionDto[] | null;
};
export type MaterialDistributionSection = {
  material?: MaterialDto;
  totalQuantity?: number;
  uoM?: UnitOfMeasureDto;
  items?: DistributionRequisitionItem[] | null;
};
export type MaterialDistributionSectionRead = {
  material?: MaterialDto;
  totalQuantity?: number;
  uoM?: UnitOfMeasureDto;
  items?: DistributionRequisitionItemRead[] | null;
};
export type MaterialDistributionDto = {
  sections?: MaterialDistributionSection[] | null;
};
export type MaterialDistributionDtoRead = {
  sections?: MaterialDistributionSectionRead[] | null;
};
export type CreateFinishedProductRequest = {
  name?: string | null;
  uoMId?: string;
  standardCost?: number;
  sellingPrice?: number;
  dosageForm?: string | null;
  strength?: string | null;
};
export type CreateProductRequest = {
  code?: string | null;
  name?: string | null;
  description?: string | null;
  genericName?: string | null;
  storageCondition?: string | null;
  packageStyle?: string | null;
  filledWeight?: string | null;
  shelfLife?: string | null;
  actionUse?: string | null;
  fdaRegistrationNumber?: string | null;
  masterFormulaNumber?: string | null;
  primaryPackDescription?: string | null;
  secondaryPackDescription?: string | null;
  tertiaryPackDescription?: string | null;
  categoryId?: string;
  finishedProducts?: CreateFinishedProductRequest[] | null;
  equipmentId?: string | null;
  baseQuantity?: number;
  baseUomId?: string | null;
  basePackingQuantity?: number;
  fullBatchSize?: number;
  basePackingUomId?: string | null;
  departmentId?: string | null;
};
export type EquipmentDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  name?: string | null;
  machineId?: string | null;
  isStorage?: boolean;
  capacityQuantity?: number;
  uoM?: UnitOfMeasureDto;
  relevanceCheck?: boolean;
  department?: CollectionItemDto;
  storageLocation?: string | null;
};
export type ProductListDto = {
  id?: string;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  genericName?: string | null;
  storageCondition?: string | null;
  packageStyle?: string | null;
  filledWeight?: string | null;
  shelfLife?: string | null;
  actionUse?: string | null;
  fdaRegistrationNumber?: string | null;
  masterFormulaNumber?: string | null;
  primaryPackDescription?: string | null;
  secondaryPackDescription?: string | null;
  tertiaryPackDescription?: string | null;
  category?: CollectionItemDto;
  baseQuantity?: number;
  basePackingQuantity?: number;
  fullBatchSize?: number;
  baseUoM?: UnitOfMeasureDto;
  basePackingUoM?: UnitOfMeasureDto;
  equipment?: EquipmentDto;
  department?: DepartmentDto;
  createdAt?: string;
};
export type ProductListDtoRead = {
  id?: string;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  genericName?: string | null;
  storageCondition?: string | null;
  packageStyle?: string | null;
  filledWeight?: string | null;
  shelfLife?: string | null;
  actionUse?: string | null;
  fdaRegistrationNumber?: string | null;
  masterFormulaNumber?: string | null;
  primaryPackDescription?: string | null;
  secondaryPackDescription?: string | null;
  tertiaryPackDescription?: string | null;
  category?: CollectionItemDto;
  baseQuantity?: number;
  basePackingQuantity?: number;
  fullBatchSize?: number;
  baseUoM?: UnitOfMeasureDto;
  basePackingUoM?: UnitOfMeasureDto;
  equipment?: EquipmentDto;
  department?: DepartmentDtoRead;
  createdAt?: string;
};
export type ProductListDtoIEnumerablePaginateable = {
  data?: ProductListDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type ProductListDtoIEnumerablePaginateableRead = {
  data?: ProductListDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type FinishedProductDto = {
  name?: string | null;
  product?: CollectionItemDto;
  uoM?: UnitOfMeasureDto;
  standardCost?: number;
  sellingPrice?: number;
  dosageForm?: string | null;
  strength?: string | null;
};
export type BillOfMaterialItemDto = {
  id?: string;
  material?: CollectionItemDto;
  materialType?: CollectionItemDto;
  isSubstitutable?: boolean;
  grade?: string | null;
  casNumber?: string | null;
  function?: string | null;
  baseQuantity?: number;
  baseUoM?: UnitOfMeasureDto;
  order?: number;
};
export type BillOfMaterialDto = {
  product?: CollectionItemDto;
  version?: number;
  isActive?: boolean;
  items?: BillOfMaterialItemDto[] | null;
};
export type ProductBillOfMaterialDto = {
  productId?: string;
  billOfMaterial?: BillOfMaterialDto;
  version?: number;
  effectiveDate?: string;
  isActive?: boolean;
};
export type ProductPackageDto = {
  id?: string;
  product?: CollectionItemDto;
  material?: CollectionItemDto;
  materialThickness?: string | null;
  otherStandards?: string | null;
  baseQuantity?: number;
  baseUoM?: UnitOfMeasureDto;
  unitCapacity?: number;
  directLinkMaterial?: CollectionItemDto;
  packingExcessMargin?: number;
};
export type RouteResponsibleUserDto = {
  user?: CollectionItemDto;
};
export type RouteResponsibleRoleDto = {
  role?: CollectionItemDto;
};
export type RouteWorkCenterDto = {
  workCenter?: CollectionItemDto;
};
export type RouteDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  operation?: CollectionItemDto;
  estimatedTime?: string | null;
  order?: number;
  responsibleUsers?: RouteResponsibleUserDto[] | null;
  responsibleRoles?: RouteResponsibleRoleDto[] | null;
  workCenters?: RouteWorkCenterDto[] | null;
};
export type RouteResourceDto = {
  resource?: CollectionItemDto;
};
export type RouteDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  operation?: CollectionItemDto;
  estimatedTime?: string | null;
  resources?: RouteResourceDto[] | null;
  order?: number;
  responsibleUsers?: RouteResponsibleUserDto[] | null;
  responsibleRoles?: RouteResponsibleRoleDto[] | null;
  workCenters?: RouteWorkCenterDto[] | null;
};
export type ProductDto = {
  id?: string;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  genericName?: string | null;
  storageCondition?: string | null;
  packageStyle?: string | null;
  filledWeight?: string | null;
  shelfLife?: string | null;
  actionUse?: string | null;
  fdaRegistrationNumber?: string | null;
  masterFormulaNumber?: string | null;
  primaryPackDescription?: string | null;
  secondaryPackDescription?: string | null;
  tertiaryPackDescription?: string | null;
  category?: CollectionItemDto;
  baseQuantity?: number;
  basePackingQuantity?: number;
  fullBatchSize?: number;
  baseUoM?: UnitOfMeasureDto;
  basePackingUoM?: UnitOfMeasureDto;
  equipment?: EquipmentDto;
  department?: DepartmentDto;
  createdAt?: string;
  finishedProducts?: FinishedProductDto[] | null;
  billOfMaterials?: ProductBillOfMaterialDto[] | null;
  currentBillOfMaterial?: ProductBillOfMaterialDto;
  outdatedBillOfMaterials?: ProductBillOfMaterialDto[] | null;
  packages?: ProductPackageDto[] | null;
  routes?: RouteDto[] | null;
  createdBy?: CollectionItemDto;
};
export type ProductDtoRead = {
  id?: string;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  genericName?: string | null;
  storageCondition?: string | null;
  packageStyle?: string | null;
  filledWeight?: string | null;
  shelfLife?: string | null;
  actionUse?: string | null;
  fdaRegistrationNumber?: string | null;
  masterFormulaNumber?: string | null;
  primaryPackDescription?: string | null;
  secondaryPackDescription?: string | null;
  tertiaryPackDescription?: string | null;
  category?: CollectionItemDto;
  baseQuantity?: number;
  basePackingQuantity?: number;
  fullBatchSize?: number;
  baseUoM?: UnitOfMeasureDto;
  basePackingUoM?: UnitOfMeasureDto;
  equipment?: EquipmentDto;
  department?: DepartmentDtoRead;
  createdAt?: string;
  finishedProducts?: FinishedProductDto[] | null;
  billOfMaterials?: ProductBillOfMaterialDto[] | null;
  currentBillOfMaterial?: ProductBillOfMaterialDto;
  outdatedBillOfMaterials?: ProductBillOfMaterialDto[] | null;
  packages?: ProductPackageDto[] | null;
  routes?: RouteDtoRead[] | null;
  createdBy?: CollectionItemDto;
};
export type UpdateProductRequest = {
  code?: string | null;
  name?: string | null;
  description?: string | null;
  genericName?: string | null;
  storageCondition?: string | null;
  packageStyle?: string | null;
  filledWeight?: string | null;
  shelfLife?: string | null;
  actionUse?: string | null;
  fdaRegistrationNumber?: string | null;
  masterFormulaNumber?: string | null;
  primaryPackDescription?: string | null;
  secondaryPackDescription?: string | null;
  tertiaryPackDescription?: string | null;
  categoryId?: string;
  finishedProducts?: CreateFinishedProductRequest[] | null;
  equipmentId?: string | null;
  baseQuantity?: number;
  baseUomId?: string | null;
  basePackingQuantity?: number;
  fullBatchSize?: number;
  basePackingUomId?: string | null;
  departmentId?: string | null;
};
export type UpdateProductPackageDescriptionRequest = {
  primaryPackDescription?: string | null;
  secondaryPackDescription?: string | null;
  tertiaryPackDescription?: string | null;
};
export type CreateRouteResource = {
  resourceId?: string;
};
export type CreateRouteResponsibleUser = {
  userId?: string;
};
export type CreateRouteResponsibleRole = {
  roleId?: string;
};
export type CreateRouteWorkCenter = {
  workCenterId?: string;
};
export type CreateRouteRequest = {
  operationId?: string;
  estimatedTime?: string | null;
  resources?: CreateRouteResource[] | null;
  responsibleUsers?: CreateRouteResponsibleUser[] | null;
  responsibleRoles?: CreateRouteResponsibleRole[] | null;
  workCenters?: CreateRouteWorkCenter[] | null;
  order?: number;
};
export type CreateProductPackageRequest = {
  materialId: string;
  materialThickness?: string | null;
  otherStandards?: string | null;
  baseQuantity?: number;
  baseUoMId?: string | null;
  unitCapacity?: number;
  directLinkMaterialId?: string | null;
  packingExcessMargin?: number;
};
export type CreateEquipmentRequest = {
  name?: string | null;
  machineId?: string | null;
  isStorage?: boolean;
  capacityQuantity?: number;
  uoMId?: string;
  relevanceCheck?: boolean;
  departmentId?: string;
  storageLocation?: string | null;
};
export type EquipmentDtoIEnumerablePaginateable = {
  data?: EquipmentDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateProductionScheduleProduct = {
  productId?: string;
  quantity?: number;
  batchSize?: BatchSize;
};
export type CreateProductionScheduleRequest = {
  code?: string | null;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  products?: CreateProductionScheduleProduct[] | null;
  remarks?: string | null;
};
export type ProductionScheduleProductDto = {
  product?: ProductListDto;
  quantity?: number;
  batchNumber?: string | null;
  batchSize?: BatchSize;
};
export type ProductionScheduleProductDtoRead = {
  product?: ProductListDtoRead;
  quantity?: number;
  batchNumber?: string | null;
  batchSize?: BatchSize;
};
export type ProductionScheduleDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  code?: string | null;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  status?: ProductionStatus;
  remarks?: string | null;
  products?: ProductionScheduleProductDto[] | null;
};
export type ProductionScheduleDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  code?: string | null;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  status?: ProductionStatus;
  remarks?: string | null;
  products?: ProductionScheduleProductDtoRead[] | null;
};
export type ProductionScheduleDtoIEnumerablePaginateable = {
  data?: ProductionScheduleDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type ProductionScheduleDtoIEnumerablePaginateableRead = {
  data?: ProductionScheduleDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type UpdateProductionScheduleRequest = object;
export type MaterialRequisitionStatus = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type ProductionScheduleProcurementDto = {
  material?: MaterialDto;
  baseUoM?: UnitOfMeasureDto;
  baseQuantity?: number;
  quantityNeeded?: number;
  quantityOnHand?: number;
  status?: MaterialRequisitionStatus;
  storageWarehouseId?: string;
  productionWarehouseId?: string;
};
export type ProductionScheduleProcurementPackageDto = {
  material?: MaterialDto;
  directLinkMaterial?: MaterialDto;
  baseUoM?: UnitOfMeasureDto;
  baseQuantity?: number;
  quantityNeeded?: number;
  quantityOnHand?: number;
  unitCapacity?: number;
  status?: MaterialRequisitionStatus;
  packingExcessMargin?: number;
  storageWarehouseId?: string;
  productionWarehouseId?: string;
};
export type ResourceDto = {
  id?: string | null;
  name?: string | null;
  type?: string | null;
  isAvailable?: boolean;
};
export type ProductionActivityStepResourceDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  resource?: ResourceDto;
};
export type ProductionActivityStepWorkCenterDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  workCenter?: CollectionItemDto;
};
export type ProductionActivityStepUserDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  user?: UserDto;
};
export type ProductionActivityStepDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  productionActivity?: CollectionItemDto;
  operation?: CollectionItemDto;
  workFlow?: CollectionItemDto;
  resources?: ProductionActivityStepResourceDto[] | null;
  workCenters?: ProductionActivityStepWorkCenterDto[] | null;
  responsibleUsers?: ProductionActivityStepUserDto[] | null;
  status?: ProductionStatus;
  startedAt?: string | null;
  completedAt?: string | null;
  order?: number;
};
export type ProductionActivityLogDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  message?: string | null;
  user?: UserDto;
  timestamp?: string;
};
export type ProductionActivityDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  productionSchedule?: CollectionItemDto;
  product?: CollectionItemDto;
  steps?: ProductionActivityStepDto[] | null;
  status?: ProductionStatus;
  startedAt?: string;
  completedAt?: string | null;
  currentStep?: ProductionActivityStepDto;
  activityLogs?: ProductionActivityLogDto[] | null;
};
export type ProductionActivityDtoIEnumerablePaginateable = {
  data?: ProductionActivityDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type ProductionActivityGroupDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  productionSchedule?: CollectionItemDto;
  product?: ProductListDto;
  status?: ProductionStatus;
  startedAt?: string;
  completedAt?: string | null;
  currentStep?: ProductionActivityStepDto;
  batchNumber?: string | null;
  quantity?: number;
};
export type ProductionActivityGroupDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  productionSchedule?: CollectionItemDto;
  product?: ProductListDtoRead;
  status?: ProductionStatus;
  startedAt?: string;
  completedAt?: string | null;
  currentStep?: ProductionActivityStepDto;
  batchNumber?: string | null;
  quantity?: number;
};
export type ProductionActivityGroupResultDto = {
  operation?: CollectionItemDto;
  activities?: ProductionActivityGroupDto[] | null;
};
export type ProductionActivityGroupResultDtoRead = {
  operation?: CollectionItemDto;
  activities?: ProductionActivityGroupDtoRead[] | null;
};
export type ProductionActivityStepDtoIEnumerablePaginateable = {
  data?: ProductionActivityStepDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateBatchManufacturingRecord = {
  productId?: string;
  productionScheduleId?: string;
  productionActivityStepId?: string;
  batchNumber?: string | null;
  manufacturingDate?: string | null;
  expiryDate?: string | null;
  batchQuantity?: number;
};
export type BatchManufacturingRecordDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  productionSchedule?: CollectionItemDto;
  product?: ProductDto;
  batchNumber?: string | null;
  manufacturingDate?: string | null;
  expiryDate?: string | null;
  batchQuantity?: number;
};
export type BatchManufacturingRecordDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  productionSchedule?: CollectionItemDto;
  product?: ProductDtoRead;
  batchNumber?: string | null;
  manufacturingDate?: string | null;
  expiryDate?: string | null;
  batchQuantity?: number;
  expectedQuantity?: number;
};
export type BatchManufacturingRecordDtoIEnumerablePaginateable = {
  data?: BatchManufacturingRecordDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type BatchManufacturingRecordDtoIEnumerablePaginateableRead = {
  data?: BatchManufacturingRecordDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateFinishedGoodsTransferNoteRequest = {
  batchManufacturingRecordId?: string;
  productionActivityStepId?: string | null;
  quantityPerPack?: number;
  packageStyleId?: string | null;
  totalQuantity?: number;
  uoMId?: string | null;
  qarNumber?: string | null;
};
export type UpdateBatchManufacturingRecord = {
  batchNumber?: string | null;
  manufacturingDate?: string | null;
  expiryDate?: string | null;
  batchQuantity?: number;
};
export type CreateBatchPackagingRecord = {
  productId?: string;
  productionScheduleId?: string;
  productionActivityStepId?: string;
  batchNumber?: string | null;
  manufacturingDate?: string | null;
  expiryDate?: string | null;
  batchQuantity?: number;
};
export type BatchPackagingRecordDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  productionSchedule?: CollectionItemDto;
  product?: CollectionItemDto;
  batchNumber?: string | null;
  manufacturingDate?: string | null;
  expiryDate?: string | null;
  batchQuantity?: number;
};
export type BatchPackagingRecordDtoIEnumerablePaginateable = {
  data?: BatchPackagingRecordDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type UpdateBatchPackagingRecord = {
  batchNumber?: string | null;
  manufacturingDate?: string | null;
  expiryDate?: string | null;
  batchQuantity?: number;
};
export type StockTransferSourceRequest = {
  fromDepartmentId?: string;
  quantity?: number;
};
export type CreateStockTransferRequest = {
  code?: string | null;
  materialId?: string;
  uoMId?: string;
  reason?: string | null;
  requiredQuantity?: number;
  productId?: string | null;
  productionScheduleId?: string | null;
  productionActivityStepId?: string | null;
  sources?: StockTransferSourceRequest[] | null;
};
export type StockTransferSourceDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  fromDepartment?: DepartmentDto;
  toDepartment?: DepartmentDto;
  quantity?: number;
  status?: StockTransferStatus;
  approvedAt?: string | null;
  issuedAt?: string | null;
};
export type StockTransferSourceDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  fromDepartment?: DepartmentDtoRead;
  toDepartment?: DepartmentDtoRead;
  quantity?: number;
  status?: StockTransferStatus;
  approvedAt?: string | null;
  issuedAt?: string | null;
};
export type StockTransferDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  code?: string | null;
  material?: MaterialDto;
  uoM?: UnitOfMeasureDto;
  product?: CollectionItemDto;
  productionSchedule?: CollectionItemDto;
  reason?: string | null;
  requiredQuantity?: number;
  status?: StockTransferStatus;
  sources?: StockTransferSourceDto[] | null;
};
export type StockTransferDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  code?: string | null;
  material?: MaterialDto;
  uoM?: UnitOfMeasureDto;
  product?: CollectionItemDto;
  productionSchedule?: CollectionItemDto;
  reason?: string | null;
  requiredQuantity?: number;
  status?: StockTransferStatus;
  sources?: StockTransferSourceDtoRead[] | null;
};
export type DepartmentStockTransferDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  material?: MaterialDto;
  uoM?: UnitOfMeasureDto;
  status?: StockTransferStatus;
  fromDepartment?: DepartmentDto;
  toDepartment?: DepartmentDto;
  quantity?: number;
  approvedAt?: string | null;
  issuedAt?: string | null;
  reason?: string | null;
};
export type DepartmentStockTransferDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  material?: MaterialDto;
  uoM?: UnitOfMeasureDto;
  status?: StockTransferStatus;
  fromDepartment?: DepartmentDtoRead;
  toDepartment?: DepartmentDtoRead;
  quantity?: number;
  approvedAt?: string | null;
  issuedAt?: string | null;
  reason?: string | null;
};
export type DepartmentStockTransferDtoIEnumerablePaginateable = {
  data?: DepartmentStockTransferDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type DepartmentStockTransferDtoIEnumerablePaginateableRead = {
  data?: DepartmentStockTransferDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type BatchTransferRequest = {
  batchId?: string;
  quantity?: number;
};
export type CreateFinalPackingMaterial = {
  materialId?: string;
  receivedQuantity?: number;
  subsequentDeliveredQuantity?: number;
  totalReceivedQuantity?: number;
  packedQuantity?: number;
  returnedQuantity?: number;
  rejectedQuantity?: number;
  sampledQuantity?: number;
  totalAccountedForQuantity?: number;
  percentageLoss?: number;
};
export type CreateFinalPacking = {
  productionScheduleId?: string;
  productId?: string;
  productionActivityStepId?: string | null;
  materials?: CreateFinalPackingMaterial[] | null;
  numberOfBottlesPerShipper?: number;
  nUmberOfFullShipperPacked?: number;
  leftOver?: number;
  batchSize?: number;
  averageVolumeFilledPerBottle?: number;
  packSize?: number;
  expectedYield?: number;
  totalQuantityPacked?: number;
  qualityControlAnalyticalSample?: number;
  retainedSamples?: number;
  stabilitySamples?: number;
  totalNumberOfBottles?: number;
  yieldTotalQuantityPacked?: number;
  totalGainOrLoss?: number;
};
export type FinalPackingMaterialDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  material?: MaterialDto;
  receivedQuantity?: number;
  subsequentDeliveredQuantity?: number;
  totalReceivedQuantity?: number;
  packedQuantity?: number;
  returnedQuantity?: number;
  rejectedQuantity?: number;
  sampledQuantity?: number;
  totalAccountedForQuantity?: number;
  percentageLoss?: number;
};
export type FinalPackingDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  productionSchedule?: CollectionItemDto;
  product?: CollectionItemDto;
  materials?: FinalPackingMaterialDto[] | null;
  numberOfBottlesPerShipper?: number;
  nUmberOfFullShipperPacked?: number;
  leftOver?: number;
  batchSize?: number;
  averageVolumeFilledPerBottle?: number;
  packSize?: number;
  expectedYield?: number;
  totalQuantityPacked?: number;
  qualityControlAnalyticalSample?: number;
  retainedSamples?: number;
  stabilitySamples?: number;
  totalNumberOfBottles?: number;
  yieldTotalQuantityPacked?: number;
  totalGainOrLoss?: number;
};
export type FinalPackingDtoIEnumerablePaginateable = {
  data?: FinalPackingDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type RoleDto = {
  id?: string;
  name?: string | null;
  displayName?: string | null;
};
export type RequisitionApprovalDto = {
  user?: CollectionItemDto;
  role?: RoleDto;
  required?: boolean;
  isApproved?: boolean;
  approvalTime?: string | null;
  comments?: string | null;
  order?: number;
};
export type RequisitionDto = {
  id?: string;
  code?: string | null;
  requisitionType?: RequisitionType;
  status?: RequestStatus;
  requestedBy?: UserDto;
  department?: DepartmentDto;
  items?: RequisitionItemDto[] | null;
  approved?: boolean;
  approvals?: RequisitionApprovalDto[] | null;
  expectedDelivery?: string | null;
  createdAt?: string;
  productionSchedule?: CollectionItemDto;
  product?: ProductDto;
  comments?: string | null;
};
export type RequisitionDtoRead = {
  id?: string;
  code?: string | null;
  requisitionType?: RequisitionType;
  status?: RequestStatus;
  requestedBy?: UserDto;
  department?: DepartmentDtoRead;
  items?: RequisitionItemDto[] | null;
  approved?: boolean;
  approvals?: RequisitionApprovalDto[] | null;
  expectedDelivery?: string | null;
  createdAt?: string;
  productionSchedule?: CollectionItemDto;
  product?: ProductDtoRead;
  comments?: string | null;
};
export type PartialMaterialToReturn = {
  materialId?: string;
  uoMId?: string | null;
  quantity?: number;
};
export type MaterialReturnStatus = 0 | 1;
export type MaterialReturnNoteFullReturnDto = {
  batchReservedQuantity?: MaterialBatchReservedQuantityDto;
  destinationWarehouse?: CollectionItemDto;
};
export type MaterialReturnNotePartialReturnDto = {
  material?: MaterialDto;
  quantity?: number;
  uoM?: UnitOfMeasureDto;
  destinationWarehouse?: CollectionItemDto;
};
export type MaterialReturnNoteDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  returnDate?: string;
  batchNumber?: string | null;
  productionSchedule?: CollectionItemDto;
  product?: CollectionItemDto;
  status?: MaterialReturnStatus;
  fullReturns?: MaterialReturnNoteFullReturnDto[] | null;
  partialReturns?: MaterialReturnNotePartialReturnDto[] | null;
};
export type MaterialReturnNoteDtoIEnumerablePaginateable = {
  data?: MaterialReturnNoteDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateProductionExtraPacking = {
  materialId?: string;
  uoMId?: string;
  quantity?: number;
};
export type ProductionExtraPackingWithBatchesDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  productionSchedule?: CollectionItemDto;
  product?: CollectionItemDto;
  material?: MaterialDto;
  uoM?: UnitOfMeasureDto;
  quantity?: number;
  batches?: BatchToSupply[] | null;
};
export type ProductionExtraPackingWithBatchesDtoIEnumerablePaginateable = {
  data?: ProductionExtraPackingWithBatchesDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateRequisitionItemRequest = {
  materialId?: string;
  quantity?: number;
  uomId?: string | null;
};
export type CreateRequisitionRequest = {
  code?: string | null;
  requisitionType?: RequisitionType;
  productId?: string | null;
  productionScheduleId?: string | null;
  productionActivityStepId?: string | null;
  comments?: string | null;
  expectedDelivery?: string | null;
  items?: CreateRequisitionItemRequest[] | null;
};
export type RequisitionDtoIEnumerablePaginateable = {
  data?: RequisitionDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type RequisitionDtoIEnumerablePaginateableRead = {
  data?: RequisitionDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type ApproveRequisitionRequest = {
  comments?: string | null;
};
export type CreateSourceRequisitionItemSupplierRequest = {
  supplierId?: string;
};
export type CreateSourceRequisitionItemRequest = {
  materialId?: string;
  uoMId?: string;
  quantity?: number;
  source?: ProcurementSource;
  suppliers?: CreateSourceRequisitionItemSupplierRequest[] | null;
};
export type CreateSourceRequisitionRequest = {
  code?: string | null;
  requisitionId?: string;
  items?: CreateSourceRequisitionItemRequest[] | null;
};
export type SourceRequisitionItemDto = {
  id?: string;
  sourceRequisition?: CollectionItemDto;
  material?: MaterialDto;
  uoM?: UnitOfMeasureDto;
  quantity?: number;
  source?: ProcurementSource;
  createdAt?: string;
};
export type SourceRequisitionDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  attachments?: AttachmentDto[] | null;
  code?: string | null;
  supplier?: CollectionItemDto;
  items?: SourceRequisitionItemDto[] | null;
};
export type SourceRequisitionDtoIEnumerablePaginateable = {
  data?: SourceRequisitionDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type SourceRequisitionItemDtoIEnumerablePaginateable = {
  data?: SourceRequisitionItemDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type SupplierQuotationItemDto = {
  id?: string;
  material?: CollectionItemDto;
  uoM?: UnitOfMeasureDto;
  quantity?: number;
  quotedPrice?: number | null;
};
export type SupplierQuotationDto = {
  id?: string;
  supplier?: SupplierDto;
  items?: SupplierQuotationItemDto[] | null;
  receivedQuotation?: boolean;
};
export type SupplierQuotationDtoIEnumerablePaginateable = {
  data?: SupplierQuotationDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type SupplierQuotationResponseDto = {
  id?: string;
  price?: number;
};
export type SupplierQuotationItemStatus = 0 | 1 | 2;
export type SupplierPrice = {
  supplier?: CollectionItemDto;
  sourceRequisition?: CollectionItemDto;
  status?: SupplierQuotationItemStatus;
  price?: number | null;
};
export type SupplierPriceComparison = {
  material?: CollectionItemDto;
  uoM?: UnitOfMeasureDto;
  quantity?: number;
  supplierQuotation?: SupplierPrice[] | null;
};
export type ProcessQuotation = {
  supplierId?: string;
  sourceRequisitionId?: string;
  items?: CreatePurchaseOrderItemRequest[] | null;
};
export type CreateRoleRequest = {
  name: string;
  permissions?: PermissionModuleDto[] | null;
};
export type RolePermissionDto = {
  id?: string;
  displayName?: string | null;
  name?: string | null;
  permissions?: PermissionModuleDto[] | null;
};
export type RolePermissionDtoIEnumerablePaginateable = {
  data?: RolePermissionDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type UpdateRoleRequest = {
  name: string;
  displayName: string;
};
export type ScheduleFrequency = 0 | 1 | 2 | 3 | 4;
export type CreateShiftScheduleRequest = {
  scheduleName: string;
  frequency: ScheduleFrequency;
  startTime: string;
  startDate?: DayOfWeek;
  shiftTypeIds: string[];
  departmentId: string;
};
export type RotationType = 0 | 1;
export type ShiftTypeDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  shiftName?: string | null;
  rotationType?: RotationType;
  startTime?: string;
  endTime?: string;
  applicableDays?: DayOfWeek[] | null;
};
export type ShiftScheduleDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  scheduleName?: string | null;
  shiftType?: ShiftTypeDto[] | null;
  departmentId?: string;
  department?: DepartmentDto;
};
export type ShiftScheduleDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  scheduleName?: string | null;
  shiftType?: ShiftTypeDto[] | null;
  departmentId?: string;
  department?: DepartmentDtoRead;
};
export type ShiftScheduleDtoIEnumerablePaginateable = {
  data?: ShiftScheduleDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type ShiftScheduleDtoIEnumerablePaginateableRead = {
  data?: ShiftScheduleDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateShiftTypeRequest = {
  shiftName: string;
  rotationType: RotationType;
  startTime: string;
  endTime: string;
  applicableDays: DayOfWeek[];
};
export type ShiftTypeDtoIEnumerablePaginateable = {
  data?: ShiftTypeDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  dateOfBirth?: string | null;
  password: string;
  phoneNumber?: string | null;
  departmentId?: string | null;
  avatar?: string | null;
};
export type CreateUserRequestRead = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  dateOfBirth?: string | null;
  password: string;
  phoneNumber?: string | null;
  departmentId?: string | null;
  avatar?: string | null;
  roleNames?: string[] | null;
};
export type UserWithRoleDto = {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  isDisabled?: boolean;
  avatar?: string | null;
  createdAt?: string;
  signature?: string | null;
  department?: CollectionItemDto;
  roles?: RoleDto[] | null;
};
export type UserWithRoleDtoIEnumerablePaginateable = {
  data?: UserWithRoleDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateClientRequest = {
  email: string;
  password: string;
};
export type UpdateUserRequest = {
  firstName: string;
  lastName: string;
  phoneNumber?: string | null;
  dateOfBirth?: string | null;
  departmentId?: string | null;
  avatar?: string | null;
  roleName?: string | null;
};
export type UpdateUserRoleRequest = {
  roleNames?: string[] | null;
};
export type UploadFileRequest = {
  file?: string | null;
};
export type WarehouseDtoIEnumerablePaginateable = {
  data?: WarehouseDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type WarehouseWithoutLocationDto = {
  id?: string;
  name?: string | null;
  description?: string | null;
  type?: WarehouseType;
};
export type WarehouseLocationShelfDto = {
  id?: string;
  warehouseLocationRack?: WareHouseLocationRackDto;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  materialBatches?: ShelfMaterialBatchDto[] | null;
};
export type WarehouseLocationShelfDtoRead = {
  id?: string;
  warehouseLocationRack?: WareHouseLocationRackDto;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  materialBatches?: ShelfMaterialBatchDtoRead[] | null;
};
export type WarehouseLocationRackDto = {
  id?: string;
  warehouseLocation?: WareHouseLocationDto;
  name?: string | null;
  description?: string | null;
  shelves?: WarehouseLocationShelfDto[] | null;
};
export type WarehouseLocationRackDtoRead = {
  id?: string;
  warehouseLocation?: WareHouseLocationDto;
  name?: string | null;
  description?: string | null;
  shelves?: WarehouseLocationShelfDtoRead[] | null;
};
export type WarehouseLocationDto = {
  id?: string;
  name?: string | null;
  floorName?: string | null;
  description?: string | null;
  warehouse?: WarehouseWithoutLocationDto;
  racks?: WarehouseLocationRackDto[] | null;
};
export type WarehouseLocationDtoRead = {
  id?: string;
  name?: string | null;
  floorName?: string | null;
  description?: string | null;
  warehouse?: WarehouseWithoutLocationDto;
  racks?: WarehouseLocationRackDtoRead[] | null;
};
export type WarehouseLocationDtoIEnumerablePaginateable = {
  data?: WarehouseLocationDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type WarehouseLocationDtoIEnumerablePaginateableRead = {
  data?: WarehouseLocationDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type WarehouseLocationRackDtoIEnumerablePaginateable = {
  data?: WarehouseLocationRackDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type WarehouseLocationRackDtoIEnumerablePaginateableRead = {
  data?: WarehouseLocationRackDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type WarehouseLocationShelfDtoIEnumerablePaginateable = {
  data?: WarehouseLocationShelfDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type WarehouseLocationShelfDtoIEnumerablePaginateableRead = {
  data?: WarehouseLocationShelfDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type FinishedGoodsTransferNoteDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  fromWarehouse?: WarehouseDto;
  toWarehouse?: WarehouseDto;
  quantityPerPack?: number;
  packageStyle?: PackageStyleDto;
  uoM?: UnitOfMeasureDto;
  totalQuantity?: number;
  qarNumber?: string | null;
  batchManufacturingRecord?: BatchManufacturingRecordDto;
};
export type FinishedGoodsTransferNoteDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  fromWarehouse?: WarehouseDto;
  toWarehouse?: WarehouseDto;
  quantityPerPack?: number;
  packageStyle?: PackageStyleDto;
  uoM?: UnitOfMeasureDto;
  totalQuantity?: number;
  qarNumber?: string | null;
  batchManufacturingRecord?: BatchManufacturingRecordDtoRead;
};
export type DistributedFinishedProductDto = {
  id?: string;
  product?: ProductDto;
  uom?: UnitOfMeasureDto;
  batchManufacturingRecord?: BatchManufacturingRecordDto;
  transferNote?: FinishedGoodsTransferNoteDto;
  quantity?: number;
  arrivedAt?: string | null;
  distributedAt?: string | null;
  status?: DistributedFinishedProductStatus;
};
export type DistributedFinishedProductDtoRead = {
  id?: string;
  product?: ProductDtoRead;
  uom?: UnitOfMeasureDto;
  batchManufacturingRecord?: BatchManufacturingRecordDtoRead;
  transferNote?: FinishedGoodsTransferNoteDtoRead;
  quantity?: number;
  arrivedAt?: string | null;
  distributedAt?: string | null;
  status?: DistributedFinishedProductStatus;
};
export type WarehouseArrivalLocationDto = {
  id?: string;
  warehouse?: WarehouseDto;
  name?: string | null;
  floorName?: string | null;
  description?: string | null;
  distributedRequisitionMaterials?: DistributedRequisitionMaterialDto[] | null;
  distributedFinishedProducts?: DistributedFinishedProductDto[] | null;
  distributedStockTransferBatches?: MaterialBatchDto[] | null;
};
export type WarehouseArrivalLocationDtoRead = {
  id?: string;
  warehouse?: WarehouseDto;
  name?: string | null;
  floorName?: string | null;
  description?: string | null;
  distributedRequisitionMaterials?: DistributedRequisitionMaterialDto[] | null;
  distributedFinishedProducts?: DistributedFinishedProductDtoRead[] | null;
  distributedStockTransferBatches?: MaterialBatchDtoRead[] | null;
};
export type DistributedRequisitionMaterialDtoIEnumerablePaginateable = {
  data?: DistributedRequisitionMaterialDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type DistributedFinishedProductDtoIEnumerablePaginateable = {
  data?: DistributedFinishedProductDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type DistributedFinishedProductDtoIEnumerablePaginateableRead = {
  data?: DistributedFinishedProductDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateArrivalLocationRequest = {
  warehouseId?: string;
  name?: string | null;
  floorName?: string | null;
  description?: string | null;
};
export type UpdateArrivalLocationRequest = {
  id?: string;
  name?: string | null;
  floorName?: string | null;
  description?: string | null;
};
export type CreateChecklistRequest = {
  distributedRequisitionMaterialId?: string;
  materialId?: string | null;
  checkedAt?: string | null;
  shipmentInvoiceId?: string | null;
  supplierId?: string | null;
  manufacturerId?: string | null;
  certificateOfAnalysisDelivered?: boolean;
  visibleLabelling?: boolean;
  intactnessStatus?: Intactness;
  consignmentCarrierStatus?: ConsignmentCarrier;
  materialBatches?: CreateMaterialBatchRequest[] | null;
};
export type ChecklistDto = {
  distributedRequisitionMaterial?: DistributedRequisitionMaterialDto;
  material?: MaterialDto;
  checkedAt?: string | null;
  shipmentInvoice?: ShipmentInvoiceDto;
  supplier?: SupplierDto;
  manufacturer?: ManufacturerDto;
  certificateOfAnalysisDelivered?: boolean;
  visibleLabelling?: boolean;
  intactnessStatus?: Intactness;
  consignmentCarrierStatus?: ConsignmentCarrier;
  materialBatches?: MaterialBatchDto[] | null;
};
export type ChecklistDtoRead = {
  distributedRequisitionMaterial?: DistributedRequisitionMaterialDto;
  material?: MaterialDto;
  checkedAt?: string | null;
  shipmentInvoice?: ShipmentInvoiceDto;
  supplier?: SupplierDto;
  manufacturer?: ManufacturerDto;
  certificateOfAnalysisDelivered?: boolean;
  visibleLabelling?: boolean;
  intactnessStatus?: Intactness;
  consignmentCarrierStatus?: ConsignmentCarrier;
  materialBatches?: MaterialBatchDtoRead[] | null;
};
export type CreateGrnRequest = {
  carrierName?: string | null;
  vehicleNumber?: string | null;
  remarks?: string | null;
  grnNumber?: string | null;
  materialBatchIds?: string[] | null;
};
export type GrnDto = {
  id?: string;
  createdAt?: string;
  carrierName?: string | null;
  vehicleNumber?: string | null;
  remarks?: string | null;
  grnNumber?: string | null;
  materialBatches?: MaterialBatchDto[] | null;
};
export type GrnDtoRead = {
  id?: string;
  createdAt?: string;
  carrierName?: string | null;
  vehicleNumber?: string | null;
  remarks?: string | null;
  grnNumber?: string | null;
  materialBatches?: MaterialBatchDtoRead[] | null;
};
export type GrnDtoIEnumerablePaginateable = {
  data?: GrnDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type GrnDtoIEnumerablePaginateableRead = {
  data?: GrnDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type BinCardInformationDto = {
  id?: string;
  createdAt?: string;
  materialBatch?: MaterialBatchDto;
  description?: string | null;
  wayBill?: string | null;
  arNumber?: string | null;
  quantityReceived?: number;
  quantityIssued?: number;
  balanceQuantity?: number;
  uoM?: UnitOfMeasureDto;
  product?: ProductDto;
};
export type BinCardInformationDtoRead = {
  id?: string;
  createdAt?: string;
  materialBatch?: MaterialBatchDtoRead;
  description?: string | null;
  wayBill?: string | null;
  arNumber?: string | null;
  quantityReceived?: number;
  quantityIssued?: number;
  balanceQuantity?: number;
  uoM?: UnitOfMeasureDto;
  product?: ProductDtoRead;
};
export type BinCardInformationDtoIEnumerablePaginateable = {
  data?: BinCardInformationDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type BinCardInformationDtoIEnumerablePaginateableRead = {
  data?: BinCardInformationDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateProductionStepRequest = {
  description?: string | null;
  resourceId?: string;
  duration?: string;
  startDate?: string | null;
  endDate?: string | null;
  status?: ProductionStatus;
  sequence?: number;
};
export type CreateWorkOrderRequest = {
  code?: string | null;
  productId?: string;
  masterProductionScheduleId?: string | null;
  quantity?: number;
  startDate?: string;
  endDate?: string;
  status?: ProductionStatus;
  batchNumber?: string | null;
  steps?: CreateProductionStepRequest[] | null;
};
export type MasterProductionScheduleDto = {
  product?: CollectionItemDto;
  plannedStartDate?: string;
  plannedEndDate?: string;
  plannedQuantity?: number;
  status?: ProductionStatus;
  workOrders?: WorkOrderDto[] | null;
};
export type ProductionStepDto = {
  workOrder?: WorkOrderDto;
  description?: string | null;
  resource?: ResourceDto;
  duration?: string;
  startDate?: string | null;
  endDate?: string | null;
  status?: ProductionStatus;
  sequence?: number;
};
export type WorkOrderDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  code?: string | null;
  product?: CollectionItemDto;
  masterProductionSchedule?: MasterProductionScheduleDto;
  quantity?: number;
  startDate?: string;
  endDate?: string;
  status?: ProductionStatus;
  batchNumber?: string | null;
  steps?: ProductionStepDto[] | null;
};
export type UpdateWorkOrderRequest = {
  code?: string | null;
  productId?: string;
  masterProductionScheduleId?: string | null;
  quantity?: number;
  startDate?: string;
  endDate?: string;
  status?: ProductionStatus;
  batchNumber?: string | null;
  steps?: CreateProductionStepRequest[] | null;
};
export const {
  useGetApiV1ActivityLogQuery,
  useLazyGetApiV1ActivityLogQuery,
  usePostApiV1ApprovalMutation,
  useGetApiV1ApprovalQuery,
  useLazyGetApiV1ApprovalQuery,
  useGetApiV1ApprovalByApprovalIdQuery,
  useLazyGetApiV1ApprovalByApprovalIdQuery,
  usePutApiV1ApprovalByApprovalIdMutation,
  useDeleteApiV1ApprovalByApprovalIdMutation,
  useGetApiV1ApprovalByModelTypeAndModelIdQuery,
  useLazyGetApiV1ApprovalByModelTypeAndModelIdQuery,
  usePostApiV1ApprovalApproveByModelTypeAndModelIdMutation,
  usePostApiV1ApprovalRejectByModelTypeAndModelIdMutation,
  useGetApiV1ApprovalMyPendingQuery,
  useLazyGetApiV1ApprovalMyPendingQuery,
  usePostApiV1AuthLoginMutation,
  usePostApiV1AuthLoginWithRefreshTokenMutation,
  usePostApiV1AuthSetPasswordMutation,
  usePostApiV1AuthChangePasswordMutation,
  usePostApiV1AuthForgotPasswordMutation,
  usePostApiV1BomMutation,
  useGetApiV1BomQuery,
  useLazyGetApiV1BomQuery,
  useGetApiV1BomByBillOfMaterialIdQuery,
  useLazyGetApiV1BomByBillOfMaterialIdQuery,
  usePutApiV1BomByBillOfMaterialIdMutation,
  useDeleteApiV1BomByBillOfMaterialIdMutation,
  usePostApiV1CollectionMutation,
  useGetApiV1CollectionByItemTypeQuery,
  useLazyGetApiV1CollectionByItemTypeQuery,
  usePostApiV1CollectionByItemTypeMutation,
  useGetApiV1CollectionItemTypesQuery,
  useLazyGetApiV1CollectionItemTypesQuery,
  usePutApiV1CollectionByItemTypeAndItemIdMutation,
  useDeleteApiV1CollectionByItemTypeAndItemIdMutation,
  useGetApiV1CollectionUomQuery,
  useLazyGetApiV1CollectionUomQuery,
  useGetApiV1CollectionPackageStylesQuery,
  useLazyGetApiV1CollectionPackageStylesQuery,
  usePostApiV1WorkingDaysMutation,
  useGetApiV1WorkingDaysQuery,
  useLazyGetApiV1WorkingDaysQuery,
  useGetApiV1WorkingDaysByIdQuery,
  useLazyGetApiV1WorkingDaysByIdQuery,
  usePutApiV1WorkingDaysByIdMutation,
  usePostApiV1ConfigurationMutation,
  useGetApiV1ConfigurationQuery,
  useLazyGetApiV1ConfigurationQuery,
  useGetApiV1ConfigurationByConfigurationIdQuery,
  useLazyGetApiV1ConfigurationByConfigurationIdQuery,
  usePutApiV1ConfigurationByConfigurationIdMutation,
  useDeleteApiV1ConfigurationByConfigurationIdMutation,
  useGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useLazyGetApiV1ConfigurationByModelTypeByModelTypeQuery,
  useGetApiV1ConfigurationNamingTypesQuery,
  useLazyGetApiV1ConfigurationNamingTypesQuery,
  useGetApiV1ConfigurationByModelTypeAndPrefixQuery,
  useLazyGetApiV1ConfigurationByModelTypeAndPrefixQuery,
  usePostApiV1DepartmentMutation,
  useGetApiV1DepartmentQuery,
  useLazyGetApiV1DepartmentQuery,
  useGetApiV1DepartmentByDepartmentIdQuery,
  useLazyGetApiV1DepartmentByDepartmentIdQuery,
  usePutApiV1DepartmentByDepartmentIdMutation,
  useDeleteApiV1DepartmentByDepartmentIdMutation,
  usePostApiV1DesignationMutation,
  useGetApiV1DesignationQuery,
  useLazyGetApiV1DesignationQuery,
  useGetApiV1DesignationByIdQuery,
  useLazyGetApiV1DesignationByIdQuery,
  usePutApiV1DesignationByIdMutation,
  useDeleteApiV1DesignationByIdMutation,
  useGetApiV1DesignationDepartmentByIdQuery,
  useLazyGetApiV1DesignationDepartmentByIdQuery,
  usePostApiV1EmployeeRegisterMutation,
  usePostApiV1EmployeeMutation,
  useGetApiV1EmployeeQuery,
  useLazyGetApiV1EmployeeQuery,
  usePostApiV1EmployeeUserMutation,
  useGetApiV1EmployeeByIdQuery,
  useLazyGetApiV1EmployeeByIdQuery,
  usePutApiV1EmployeeByIdMutation,
  useDeleteApiV1EmployeeByIdMutation,
  usePutApiV1EmployeeByIdAssignMutation,
  usePostApiV1FileByModelTypeAndModelIdReferenceMutation,
  useGetApiV1FileByModelTypeAndModelIdReferenceQuery,
  useLazyGetApiV1FileByModelTypeAndModelIdReferenceQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  useDeleteApiV1FileByModelIdMutation,
  useDeleteApiV1FileByModelIdAndReferenceMutation,
  useGetApiV1FileByModelTypeAndReferenceQuery,
  useLazyGetApiV1FileByModelTypeAndReferenceQuery,
  usePostApiV1FormMutation,
  useGetApiV1FormQuery,
  useLazyGetApiV1FormQuery,
  useGetApiV1FormByFormIdQuery,
  useLazyGetApiV1FormByFormIdQuery,
  usePutApiV1FormByFormIdMutation,
  useDeleteApiV1FormByFormIdMutation,
  usePostApiV1FormResponsesMutation,
  useGetApiV1FormResponsesByFormResponseIdQuery,
  useLazyGetApiV1FormResponsesByFormResponseIdQuery,
  usePostApiV1FormQuestionMutation,
  useGetApiV1FormQuestionQuery,
  useLazyGetApiV1FormQuestionQuery,
  useGetApiV1FormQuestionByQuestionIdQuery,
  useLazyGetApiV1FormQuestionByQuestionIdQuery,
  usePutApiV1FormQuestionByQuestionIdMutation,
  useDeleteApiV1FormQuestionByQuestionIdMutation,
  usePostApiV1LeaveEntitlementMutation,
  useGetApiV1LeaveEntitlementQuery,
  useLazyGetApiV1LeaveEntitlementQuery,
  useGetApiV1LeaveEntitlementByIdQuery,
  useLazyGetApiV1LeaveEntitlementByIdQuery,
  usePutApiV1LeaveEntitlementByIdMutation,
  useDeleteApiV1LeaveEntitlementByIdMutation,
  usePostApiV1LeaveRequestMutation,
  useGetApiV1LeaveRequestQuery,
  useLazyGetApiV1LeaveRequestQuery,
  useGetApiV1LeaveRequestByIdQuery,
  useLazyGetApiV1LeaveRequestByIdQuery,
  usePutApiV1LeaveRequestByIdMutation,
  useDeleteApiV1LeaveRequestByIdMutation,
  usePostApiV1LeaveTypeMutation,
  useGetApiV1LeaveTypeQuery,
  useLazyGetApiV1LeaveTypeQuery,
  useGetApiV1LeaveTypeByIdQuery,
  useLazyGetApiV1LeaveTypeByIdQuery,
  usePutApiV1LeaveTypeByIdMutation,
  useDeleteApiV1LeaveTypeByIdMutation,
  usePostApiV1MaterialMutation,
  useGetApiV1MaterialQuery,
  useLazyGetApiV1MaterialQuery,
  useGetApiV1MaterialByMaterialIdQuery,
  useLazyGetApiV1MaterialByMaterialIdQuery,
  usePutApiV1MaterialByMaterialIdMutation,
  useDeleteApiV1MaterialByMaterialIdMutation,
  useGetApiV1MaterialCategoryQuery,
  useLazyGetApiV1MaterialCategoryQuery,
  useGetApiV1MaterialAllQuery,
  useLazyGetApiV1MaterialAllQuery,
  usePutApiV1MaterialByMaterialIdReorderLevelMutation,
  useGetApiV1MaterialByMaterialIdStockLevelQuery,
  useLazyGetApiV1MaterialByMaterialIdStockLevelQuery,
  useGetApiV1MaterialByMaterialIdBatchesQuery,
  useLazyGetApiV1MaterialByMaterialIdBatchesQuery,
  useGetApiV1MaterialByMaterialIdInTransitQuery,
  useLazyGetApiV1MaterialByMaterialIdInTransitQuery,
  usePostApiV1MaterialBatchMutation,
  useGetApiV1MaterialBatchQuery,
  useLazyGetApiV1MaterialBatchQuery,
  useGetApiV1MaterialBatchByBatchIdQuery,
  useLazyGetApiV1MaterialBatchByBatchIdQuery,
  usePostApiV1MaterialBatchMoveMutation,
  usePutApiV1MaterialBatchByBatchIdApproveMutation,
  useGetApiV1MaterialByMaterialIdStockAndWarehouseIdQuery,
  useLazyGetApiV1MaterialByMaterialIdStockAndWarehouseIdQuery,
  usePostApiV1MaterialBatchConsumeMutation,
  useGetApiV1MaterialByMaterialIdStockAcrossWarehousesQuery,
  useLazyGetApiV1MaterialByMaterialIdStockAcrossWarehousesQuery,
  useGetApiV1MaterialByMaterialIdDepartmentStockAndQuantityQuery,
  useLazyGetApiV1MaterialByMaterialIdDepartmentStockAndQuantityQuery,
  usePostApiV1MaterialUploadMutation,
  usePutApiV1MaterialBatchStatusMutation,
  usePostApiV1MaterialBatchSupplyMutation,
  usePostApiV1MaterialBatchMoveV2Mutation,
  useGetApiV1MaterialApprovedMaterialsQuery,
  useLazyGetApiV1MaterialApprovedMaterialsQuery,
  useGetApiV1MaterialByMaterialIdBatchesV2Query,
  useLazyGetApiV1MaterialByMaterialIdBatchesV2Query,
  useGetApiV1MaterialByMaterialIdStockWarehousesQuery,
  useLazyGetApiV1MaterialByMaterialIdStockWarehousesQuery,
  useGetApiV1MaterialByMaterialIdStockDepartmentsQuery,
  useLazyGetApiV1MaterialByMaterialIdStockDepartmentsQuery,
  usePostApiV1MaterialDepartmentMutation,
  useGetApiV1MaterialDepartmentQuery,
  useLazyGetApiV1MaterialDepartmentQuery,
  useGetApiV1MaterialDepartmentNotLinkedQuery,
  useLazyGetApiV1MaterialDepartmentNotLinkedQuery,
  useGetApiV1MaterialByMaterialIdUomQuery,
  useLazyGetApiV1MaterialByMaterialIdUomQuery,
  useGetApiV1PermissionModulesQuery,
  useLazyGetApiV1PermissionModulesQuery,
  useGetApiV1PermissionQuery,
  useLazyGetApiV1PermissionQuery,
  useGetApiV1PermissionUserByUserIdQuery,
  useLazyGetApiV1PermissionUserByUserIdQuery,
  useGetApiV1PermissionRoleByRoleIdQuery,
  useLazyGetApiV1PermissionRoleByRoleIdQuery,
  usePutApiV1PermissionRoleByRoleIdMutation,
  useGetApiV1PermissionMenuQuery,
  useLazyGetApiV1PermissionMenuQuery,
  usePostApiV1ProcurementManufacturerMutation,
  useGetApiV1ProcurementManufacturerQuery,
  useLazyGetApiV1ProcurementManufacturerQuery,
  useGetApiV1ProcurementManufacturerByManufacturerIdQuery,
  useLazyGetApiV1ProcurementManufacturerByManufacturerIdQuery,
  usePutApiV1ProcurementManufacturerByManufacturerIdMutation,
  useDeleteApiV1ProcurementManufacturerByManufacturerIdMutation,
  useGetApiV1ProcurementManufacturerMaterialByMaterialIdQuery,
  useLazyGetApiV1ProcurementManufacturerMaterialByMaterialIdQuery,
  usePostApiV1ProcurementSupplierMutation,
  useGetApiV1ProcurementSupplierQuery,
  useLazyGetApiV1ProcurementSupplierQuery,
  useGetApiV1ProcurementSupplierBySupplierIdQuery,
  useLazyGetApiV1ProcurementSupplierBySupplierIdQuery,
  usePutApiV1ProcurementSupplierBySupplierIdMutation,
  useDeleteApiV1ProcurementSupplierBySupplierIdMutation,
  usePutApiV1ProcurementSupplierBySupplierIdStatusMutation,
  useGetApiV1ProcurementSupplierMaterialByMaterialIdQuery,
  useLazyGetApiV1ProcurementSupplierMaterialByMaterialIdQuery,
  useGetApiV1ProcurementSupplierByMaterialIdAndTypeQuery,
  useLazyGetApiV1ProcurementSupplierByMaterialIdAndTypeQuery,
  usePostApiV1ProcurementPurchaseOrderMutation,
  useGetApiV1ProcurementPurchaseOrderQuery,
  useLazyGetApiV1ProcurementPurchaseOrderQuery,
  useGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery,
  useLazyGetApiV1ProcurementPurchaseOrderByPurchaseOrderIdQuery,
  usePostApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation,
  usePutApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation,
  useDeleteApiV1ProcurementPurchaseOrderByPurchaseOrderIdMutation,
  useGetApiV1ProcurementPurchaseOrderRequisitionByPurchaseOrderIdAndMaterialIdQuery,
  useLazyGetApiV1ProcurementPurchaseOrderRequisitionByPurchaseOrderIdAndMaterialIdQuery,
  usePostApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderIdMutation,
  usePutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseMutation,
  usePostApiV1ProcurementPurchaseOrderInvoiceMutation,
  useGetApiV1ProcurementPurchaseOrderInvoiceQuery,
  useLazyGetApiV1ProcurementPurchaseOrderInvoiceQuery,
  useGetApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdQuery,
  useLazyGetApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdQuery,
  usePutApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdMutation,
  useDeleteApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdMutation,
  usePostApiV1ProcurementBillingSheetMutation,
  useGetApiV1ProcurementBillingSheetQuery,
  useLazyGetApiV1ProcurementBillingSheetQuery,
  useGetApiV1ProcurementBillingSheetByBillingSheetIdQuery,
  useLazyGetApiV1ProcurementBillingSheetByBillingSheetIdQuery,
  usePutApiV1ProcurementBillingSheetByBillingSheetIdMutation,
  useDeleteApiV1ProcurementBillingSheetByBillingSheetIdMutation,
  usePostApiV1ProcurementShipmentDocumentMutation,
  useGetApiV1ProcurementShipmentDocumentQuery,
  useLazyGetApiV1ProcurementShipmentDocumentQuery,
  useGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdQuery,
  useLazyGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdQuery,
  usePutApiV1ProcurementShipmentDocumentByShipmentDocumentIdMutation,
  useDeleteApiV1ProcurementShipmentDocumentByShipmentDocumentIdMutation,
  usePostApiV1ProcurementWaybillMutation,
  useGetApiV1ProcurementWaybillQuery,
  useLazyGetApiV1ProcurementWaybillQuery,
  useGetApiV1ProcurementWaybillByWaybillIdQuery,
  useLazyGetApiV1ProcurementWaybillByWaybillIdQuery,
  usePutApiV1ProcurementWaybillByWaybillIdMutation,
  useDeleteApiV1ProcurementWaybillByWaybillIdMutation,
  usePutApiV1ProcurementShipmentDocumentByShipmentDocumentIdArrivedMutation,
  usePutApiV1ProcurementShipmentsByShipmentIdStatusMutation,
  useGetApiV1ProcurementShipmentDocumentArrivedQuery,
  useLazyGetApiV1ProcurementShipmentDocumentArrivedQuery,
  usePostApiV1ProcurementShipmentInvoiceMutation,
  useGetApiV1ProcurementShipmentInvoiceQuery,
  useLazyGetApiV1ProcurementShipmentInvoiceQuery,
  useGetApiV1ProcurementShipmentInvoiceByIdQuery,
  useLazyGetApiV1ProcurementShipmentInvoiceByIdQuery,
  useGetApiV1ProcurementShipmentInvoiceUnattachedQuery,
  useLazyGetApiV1ProcurementShipmentInvoiceUnattachedQuery,
  useGetApiV1ProcurementShipmentInvoiceShipmentDocumentByShipmentDocumentIdQuery,
  useLazyGetApiV1ProcurementShipmentInvoiceShipmentDocumentByShipmentDocumentIdQuery,
  usePutApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdMutation,
  useDeleteApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdMutation,
  usePostApiV1ProcurementShipmentDiscrepancyMutation,
  useGetApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdQuery,
  useLazyGetApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdQuery,
  usePutApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdMutation,
  useDeleteApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdMutation,
  useGetApiV1ProcurementPurchaseOrderNotLinkedQuery,
  useLazyGetApiV1ProcurementPurchaseOrderNotLinkedQuery,
  useGetApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinkedQuery,
  useLazyGetApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinkedQuery,
  usePostApiV1ProcurementMaterialsByPurchaseOrdersMutation,
  useGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionQuery,
  useLazyGetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionQuery,
  usePostApiV1ProcurementByShipmentDocumentIdConfirmDistributionAndMaterialIdMutation,
  usePostApiV1ProcurementByShipmentDocumentIdConfirmDistributionMutation,
  usePostApiV1ProductMutation,
  useGetApiV1ProductQuery,
  useLazyGetApiV1ProductQuery,
  useGetApiV1ProductByProductIdQuery,
  useLazyGetApiV1ProductByProductIdQuery,
  usePutApiV1ProductByProductIdMutation,
  useDeleteApiV1ProductByProductIdMutation,
  usePutApiV1ProductPackageDescriptionByProductIdMutation,
  useGetApiV1ProductByProductIdBomQuery,
  useLazyGetApiV1ProductByProductIdBomQuery,
  usePostApiV1ProductByProductIdRoutesMutation,
  useGetApiV1ProductByProductIdRoutesQuery,
  useLazyGetApiV1ProductByProductIdRoutesQuery,
  useGetApiV1ProductRoutesByRouteIdQuery,
  useLazyGetApiV1ProductRoutesByRouteIdQuery,
  useDeleteApiV1ProductRoutesByRouteIdMutation,
  usePostApiV1ProductByProductIdPackagesMutation,
  useGetApiV1ProductByProductIdPackagesQuery,
  useLazyGetApiV1ProductByProductIdPackagesQuery,
  useGetApiV1ProductPackagesByProductPackageIdQuery,
  useLazyGetApiV1ProductPackagesByProductPackageIdQuery,
  usePutApiV1ProductPackagesByProductPackageIdMutation,
  useDeleteApiV1ProductPackagesByProductPackageIdMutation,
  usePostApiV1ProductByProductIdFinishedMutation,
  usePutApiV1ProductByProductIdBomArchiveMutation,
  usePostApiV1ProductEquipmentMutation,
  useGetApiV1ProductEquipmentQuery,
  useLazyGetApiV1ProductEquipmentQuery,
  useGetApiV1ProductEquipmentByEquipmentIdQuery,
  useLazyGetApiV1ProductEquipmentByEquipmentIdQuery,
  usePutApiV1ProductEquipmentByEquipmentIdMutation,
  useDeleteApiV1ProductEquipmentByEquipmentIdMutation,
  useGetApiV1ProductEquipmentAllQuery,
  useLazyGetApiV1ProductEquipmentAllQuery,
  usePostApiV1ProductionScheduleMutation,
  useGetApiV1ProductionScheduleQuery,
  useLazyGetApiV1ProductionScheduleQuery,
  useGetApiV1ProductionScheduleByScheduleIdQuery,
  useLazyGetApiV1ProductionScheduleByScheduleIdQuery,
  usePutApiV1ProductionScheduleByScheduleIdMutation,
  useDeleteApiV1ProductionScheduleByScheduleIdMutation,
  useGetApiV1ProductionScheduleByProductionScheduleIdProductAndProductIdQuery,
  useLazyGetApiV1ProductionScheduleByProductionScheduleIdProductAndProductIdQuery,
  useGetApiV1ProductionScheduleProductionStatusQuery,
  useLazyGetApiV1ProductionScheduleProductionStatusQuery,
  useGetApiV1ProductionScheduleByScheduleIdDetailsQuery,
  useLazyGetApiV1ProductionScheduleByScheduleIdDetailsQuery,
  useGetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdQuery,
  useLazyGetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdQuery,
  useGetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdQuery,
  useLazyGetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdQuery,
  useGetApiV1ProductionScheduleByProductionScheduleIdMaterialsWithInsufficientStockAndProductIdQuery,
  useLazyGetApiV1ProductionScheduleByProductionScheduleIdMaterialsWithInsufficientStockAndProductIdQuery,
  useGetApiV1ProductionScheduleByProductionScheduleIdPackageMaterialsWithInsufficientStockAndProductIdQuery,
  useLazyGetApiV1ProductionScheduleByProductionScheduleIdPackageMaterialsWithInsufficientStockAndProductIdQuery,
  usePostApiV1ProductionScheduleActivityStartByProductionScheduleIdAndProductIdMutation,
  useGetApiV1ProductionScheduleActivityQuery,
  useLazyGetApiV1ProductionScheduleActivityQuery,
  useGetApiV1ProductionScheduleActivityByProductionActivityIdQuery,
  useLazyGetApiV1ProductionScheduleActivityByProductionActivityIdQuery,
  useGetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdQuery,
  useLazyGetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdQuery,
  useGetApiV1ProductionScheduleActivityStatusGroupedQuery,
  useLazyGetApiV1ProductionScheduleActivityStatusGroupedQuery,
  useGetApiV1ProductionScheduleActivityOperationGroupedQuery,
  useLazyGetApiV1ProductionScheduleActivityOperationGroupedQuery,
  usePutApiV1ProductionScheduleActivityStepByProductionStepIdStatusMutation,
  useGetApiV1ProductionScheduleActivityStepQuery,
  useLazyGetApiV1ProductionScheduleActivityStepQuery,
  useGetApiV1ProductionScheduleActivityStepByProductionActivityStepIdQuery,
  useLazyGetApiV1ProductionScheduleActivityStepByProductionActivityStepIdQuery,
  useGetApiV1ProductionScheduleActivityStepStatusGroupedQuery,
  useLazyGetApiV1ProductionScheduleActivityStepStatusGroupedQuery,
  useGetApiV1ProductionScheduleActivityStepOperationGroupedQuery,
  useLazyGetApiV1ProductionScheduleActivityStepOperationGroupedQuery,
  usePostApiV1ProductionScheduleManufacturingMutation,
  useGetApiV1ProductionScheduleManufacturingQuery,
  useLazyGetApiV1ProductionScheduleManufacturingQuery,
  useGetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdQuery,
  useLazyGetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdQuery,
  usePostApiV1ProductionScheduleFinishedGoodsTransferNoteMutation,
  useGetApiV1ProductionScheduleManufacturingByIdQuery,
  useLazyGetApiV1ProductionScheduleManufacturingByIdQuery,
  usePutApiV1ProductionScheduleManufacturingByIdMutation,
  usePutApiV1ProductionScheduleManufacturingIssueByIdMutation,
  usePostApiV1ProductionSchedulePackagingMutation,
  useGetApiV1ProductionSchedulePackagingQuery,
  useLazyGetApiV1ProductionSchedulePackagingQuery,
  useGetApiV1ProductionSchedulePackagingByIdQuery,
  useLazyGetApiV1ProductionSchedulePackagingByIdQuery,
  usePutApiV1ProductionSchedulePackagingByIdMutation,
  usePutApiV1ProductionSchedulePackagingIssueByIdMutation,
  usePostApiV1ProductionScheduleStockTransferMutation,
  useGetApiV1ProductionScheduleStockTransferQuery,
  useLazyGetApiV1ProductionScheduleStockTransferQuery,
  useGetApiV1ProductionScheduleStockTransferInBoundQuery,
  useLazyGetApiV1ProductionScheduleStockTransferInBoundQuery,
  useGetApiV1ProductionScheduleStockTransferOutBoundQuery,
  useLazyGetApiV1ProductionScheduleStockTransferOutBoundQuery,
  useGetApiV1ProductionScheduleStockTransferByStockTransferIdQuery,
  useLazyGetApiV1ProductionScheduleStockTransferByStockTransferIdQuery,
  usePutApiV1ProductionScheduleStockTransferApproveByStockTransferIdMutation,
  usePutApiV1ProductionScheduleStockTransferRejectByStockTransferIdMutation,
  useGetApiV1ProductionScheduleStockTransferBatchByStockTransferIdQuery,
  useLazyGetApiV1ProductionScheduleStockTransferBatchByStockTransferIdQuery,
  usePutApiV1ProductionScheduleStockTransferIssueByStockTransferIdMutation,
  usePostApiV1ProductionScheduleFinalPackingMutation,
  useGetApiV1ProductionScheduleFinalPackingQuery,
  useLazyGetApiV1ProductionScheduleFinalPackingQuery,
  useGetApiV1ProductionScheduleFinalPackingByFinalPackingIdQuery,
  useLazyGetApiV1ProductionScheduleFinalPackingByFinalPackingIdQuery,
  usePutApiV1ProductionScheduleFinalPackingByFinalPackingIdMutation,
  useDeleteApiV1ProductionScheduleFinalPackingByFinalPackingIdMutation,
  useGetApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductIdQuery,
  useLazyGetApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductIdQuery,
  useGetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdQuery,
  useLazyGetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdQuery,
  usePostApiV1ProductionScheduleReturnBeforeProductionMutation,
  usePostApiV1ProductionScheduleReturnAfterProductionMutation,
  useGetApiV1ProductionScheduleMaterialReturnNoteQuery,
  useLazyGetApiV1ProductionScheduleMaterialReturnNoteQuery,
  useGetApiV1ProductionScheduleMaterialReturnNoteByMaterialReturnNoteIdQuery,
  useLazyGetApiV1ProductionScheduleMaterialReturnNoteByMaterialReturnNoteIdQuery,
  usePutApiV1ProductionScheduleMaterialReturnNoteCompleteByMaterialReturnNoteIdMutation,
  usePostApiV1ProductionScheduleExtraPackingByProductionScheduleIdAndProductIdMutation,
  useGetApiV1ProductionScheduleExtraPackingQuery,
  useLazyGetApiV1ProductionScheduleExtraPackingQuery,
  useGetApiV1ProductionScheduleExtraPackingByProductionExtraPackingIdQuery,
  useLazyGetApiV1ProductionScheduleExtraPackingByProductionExtraPackingIdQuery,
  useGetApiV1ProductionScheduleExtraPackingByProductbyProductionScheduleIdAndProductIdQuery,
  useLazyGetApiV1ProductionScheduleExtraPackingByProductbyProductionScheduleIdAndProductIdQuery,
  useGetApiV1ProductionScheduleExtraPackingBatchesToSupplyByExtraPackingMaterialIdQuery,
  useLazyGetApiV1ProductionScheduleExtraPackingBatchesToSupplyByExtraPackingMaterialIdQuery,
  usePostApiV1ProductionScheduleExtraPackingApproveByProductionExtraPackingIdMutation,
  usePostApiV1RequisitionMutation,
  useGetApiV1RequisitionQuery,
  useLazyGetApiV1RequisitionQuery,
  useGetApiV1RequisitionDepartmentQuery,
  useLazyGetApiV1RequisitionDepartmentQuery,
  useGetApiV1RequisitionByRequisitionIdQuery,
  useLazyGetApiV1RequisitionByRequisitionIdQuery,
  usePostApiV1RequisitionIssueStockRequisitionByStockRequisitionIdMutation,
  usePostApiV1RequisitionByRequisitionIdIssueMutation,
  usePostApiV1RequisitionSourceMutation,
  useGetApiV1RequisitionSourceQuery,
  useLazyGetApiV1RequisitionSourceQuery,
  useGetApiV1RequisitionSourceBySourceRequisitionIdQuery,
  useLazyGetApiV1RequisitionSourceBySourceRequisitionIdQuery,
  usePutApiV1RequisitionSourceBySourceRequisitionIdMutation,
  useDeleteApiV1RequisitionSourceBySourceRequisitionIdMutation,
  useGetApiV1RequisitionSourceItemsQuery,
  useLazyGetApiV1RequisitionSourceItemsQuery,
  useGetApiV1RequisitionSourceSupplierQuery,
  useLazyGetApiV1RequisitionSourceSupplierQuery,
  useGetApiV1RequisitionSourceSupplierBySupplierIdQuery,
  useLazyGetApiV1RequisitionSourceSupplierBySupplierIdQuery,
  usePostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationMutation,
  useGetApiV1RequisitionSourceSupplierQuotationQuery,
  useLazyGetApiV1RequisitionSourceSupplierQuotationQuery,
  useGetApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationQuery,
  useLazyGetApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationQuery,
  usePostApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationReceiveMutation,
  useGetApiV1RequisitionSourceMaterialPriceComparisonQuery,
  useLazyGetApiV1RequisitionSourceMaterialPriceComparisonQuery,
  useGetApiV1RequisitionSourceMaterialPriceComparisonByMaterialQuery,
  useLazyGetApiV1RequisitionSourceMaterialPriceComparisonByMaterialQuery,
  usePostApiV1RequisitionSourceQuotationProcessPurchaseOrderMutation,
  useGetApiV1RoleQuery,
  useLazyGetApiV1RoleQuery,
  usePostApiV1RoleMutation,
  useGetApiV1RoleWithPermissionsQuery,
  useLazyGetApiV1RoleWithPermissionsQuery,
  useGetApiV1RoleByIdQuery,
  useLazyGetApiV1RoleByIdQuery,
  usePutApiV1RoleByIdMutation,
  useDeleteApiV1RoleByIdMutation,
  useGetApiV1RoleCheckByIdQuery,
  useLazyGetApiV1RoleCheckByIdQuery,
  usePostApiV1ShiftScheduleMutation,
  useGetApiV1ShiftScheduleQuery,
  useLazyGetApiV1ShiftScheduleQuery,
  useGetApiV1ShiftScheduleByIdQuery,
  useLazyGetApiV1ShiftScheduleByIdQuery,
  usePutApiV1ShiftScheduleByIdMutation,
  useDeleteApiV1ShiftScheduleByIdMutation,
  usePostApiV1ShiftTypeMutation,
  useGetApiV1ShiftTypeQuery,
  useLazyGetApiV1ShiftTypeQuery,
  usePutApiV1ShiftTypeMutation,
  useGetApiV1ShiftTypeByIdQuery,
  useLazyGetApiV1ShiftTypeByIdQuery,
  useDeleteApiV1ShiftTypeByIdMutation,
  usePostApiV1UserMutation,
  useGetApiV1UserQuery,
  useLazyGetApiV1UserQuery,
  usePostApiV1UserSignUpMutation,
  useGetApiV1UserAuthenticatedQuery,
  useLazyGetApiV1UserAuthenticatedQuery,
  usePutApiV1UserByIdMutation,
  useDeleteApiV1UserByIdMutation,
  usePutApiV1UserRoleByIdMutation,
  usePostApiV1UserAvatarByIdMutation,
  usePostApiV1UserSignatureByIdMutation,
  useGetApiV1UserToggleDisableByIdQuery,
  useLazyGetApiV1UserToggleDisableByIdQuery,
  usePostApiV1WarehouseMutation,
  useGetApiV1WarehouseQuery,
  useLazyGetApiV1WarehouseQuery,
  useGetApiV1WarehouseByWarehouseIdQuery,
  useLazyGetApiV1WarehouseByWarehouseIdQuery,
  usePutApiV1WarehouseByWarehouseIdMutation,
  useDeleteApiV1WarehouseByWarehouseIdMutation,
  usePostApiV1WarehouseByWarehouseIdLocationMutation,
  useGetApiV1WarehouseLocationByLocationIdQuery,
  useLazyGetApiV1WarehouseLocationByLocationIdQuery,
  usePutApiV1WarehouseLocationByLocationIdMutation,
  useDeleteApiV1WarehouseLocationByLocationIdMutation,
  useGetApiV1WarehouseLocationQuery,
  useLazyGetApiV1WarehouseLocationQuery,
  usePostApiV1WarehouseByLocationIdRackMutation,
  useGetApiV1WarehouseRackByRackIdQuery,
  useLazyGetApiV1WarehouseRackByRackIdQuery,
  usePutApiV1WarehouseRackByRackIdMutation,
  useDeleteApiV1WarehouseRackByRackIdMutation,
  useGetApiV1WarehouseRackQuery,
  useLazyGetApiV1WarehouseRackQuery,
  useGetApiV1WarehouseRackByDepartmentQuery,
  useLazyGetApiV1WarehouseRackByDepartmentQuery,
  usePostApiV1WarehouseByRackIdShelfMutation,
  useGetApiV1WarehouseShelfByShelfIdQuery,
  useLazyGetApiV1WarehouseShelfByShelfIdQuery,
  usePutApiV1WarehouseShelfByShelfIdMutation,
  useDeleteApiV1WarehouseShelfByShelfIdMutation,
  useGetApiV1WarehouseShelfQuery,
  useLazyGetApiV1WarehouseShelfQuery,
  useGetApiV1WarehouseShelfByDepartmentQuery,
  useLazyGetApiV1WarehouseShelfByDepartmentQuery,
  useGetApiV1WarehouseByWarehouseIdShelvesByMaterialAndMaterialIdQuery,
  useLazyGetApiV1WarehouseByWarehouseIdShelvesByMaterialAndMaterialIdQuery,
  useGetApiV1WarehouseByWarehouseIdShelvesByMaterialbatchAndMaterialBatchIdQuery,
  useLazyGetApiV1WarehouseByWarehouseIdShelvesByMaterialbatchAndMaterialBatchIdQuery,
  useGetApiV1WarehouseRackByRackIdShelvesQuery,
  useLazyGetApiV1WarehouseRackByRackIdShelvesQuery,
  useGetApiV1WarehouseByWarehouseIdShelvesQuery,
  useLazyGetApiV1WarehouseByWarehouseIdShelvesQuery,
  useGetApiV1WarehouseByWarehouseIdArrivalLocationQuery,
  useLazyGetApiV1WarehouseByWarehouseIdArrivalLocationQuery,
  useGetApiV1WarehouseDistributedRequisitionMaterialsQuery,
  useLazyGetApiV1WarehouseDistributedRequisitionMaterialsQuery,
  useGetApiV1WarehouseFinishedGoodsDetailsQuery,
  useLazyGetApiV1WarehouseFinishedGoodsDetailsQuery,
  useGetApiV1WarehouseStockTransferDetailsQuery,
  useLazyGetApiV1WarehouseStockTransferDetailsQuery,
  useGetApiV1WarehouseDistributedMaterialByIdQuery,
  useLazyGetApiV1WarehouseDistributedMaterialByIdQuery,
  usePostApiV1WarehouseArrivalLocationMutation,
  usePutApiV1WarehouseArrivalLocationMutation,
  usePostApiV1WarehouseConfirmArrivalByDistributedMaterialIdMutation,
  usePostApiV1WarehouseChecklistMutation,
  useGetApiV1WarehouseChecklistByIdQuery,
  useLazyGetApiV1WarehouseChecklistByIdQuery,
  useGetApiV1WarehouseDistributedMaterialByDistributedMaterialIdMaterialBatchQuery,
  useLazyGetApiV1WarehouseDistributedMaterialByDistributedMaterialIdMaterialBatchQuery,
  usePostApiV1WarehouseDistributedMaterialMaterialBatchMutation,
  useGetApiV1WarehouseDistributedMaterialByDistributedMaterialIdChecklistQuery,
  useLazyGetApiV1WarehouseDistributedMaterialByDistributedMaterialIdChecklistQuery,
  usePostApiV1WarehouseGrnMutation,
  useGetApiV1WarehouseGrnByIdQuery,
  useLazyGetApiV1WarehouseGrnByIdQuery,
  useGetApiV1WarehouseGrnsQuery,
  useLazyGetApiV1WarehouseGrnsQuery,
  useGetApiV1WarehouseBincardinformationByMaterialIdQuery,
  useLazyGetApiV1WarehouseBincardinformationByMaterialIdQuery,
  useGetApiV1WarehouseBincardinformationByProductIdProductQuery,
  useLazyGetApiV1WarehouseBincardinformationByProductIdProductQuery,
  usePostApiV1WorkOrderMutation,
  useGetApiV1WorkOrderQuery,
  useLazyGetApiV1WorkOrderQuery,
  useGetApiV1WorkOrderByWorkOrderIdQuery,
  useLazyGetApiV1WorkOrderByWorkOrderIdQuery,
  usePutApiV1WorkOrderByWorkOrderIdMutation,
  useDeleteApiV1WorkOrderByWorkOrderIdMutation,
} = injectedRtkApi;
