import { api } from "./index";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getApiV1ActivityLog: build.query<
      GetApiV1ActivityLogApiResponse,
      GetApiV1ActivityLogApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/activity-log`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
    postApiV1Alert: build.mutation<
      PostApiV1AlertApiResponse,
      PostApiV1AlertApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/alert`,
        method: "POST",
        body: queryArg.createAlertRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Alert: build.query<GetApiV1AlertApiResponse, GetApiV1AlertApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/alert`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          withDisabled: queryArg.withDisabled,
        },
      }),
    }),
    getApiV1AlertByAlertId: build.query<
      GetApiV1AlertByAlertIdApiResponse,
      GetApiV1AlertByAlertIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/alert/${queryArg.alertId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1AlertByAlertId: build.mutation<
      PutApiV1AlertByAlertIdApiResponse,
      PutApiV1AlertByAlertIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/alert/${queryArg.alertId}`,
        method: "PUT",
        body: queryArg.createAlertRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    patchApiV1AlertByIdToggleDisable: build.mutation<
      PatchApiV1AlertByIdToggleDisableApiResponse,
      PatchApiV1AlertByIdToggleDisableApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/alert/${queryArg.id}/toggle-disable`,
        method: "PATCH",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1QaAnalyticalTests: build.mutation<
      PostApiV1QaAnalyticalTestsApiResponse,
      PostApiV1QaAnalyticalTestsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/qa/analytical-tests`,
        method: "POST",
        body: queryArg.createAnalyticalTestRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1QaAnalyticalTests: build.query<
      GetApiV1QaAnalyticalTestsApiResponse,
      GetApiV1QaAnalyticalTestsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/qa/analytical-tests`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1QaAnalyticalTestsById: build.query<
      GetApiV1QaAnalyticalTestsByIdApiResponse,
      GetApiV1QaAnalyticalTestsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/qa/analytical-tests/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1QaAnalyticalTestsById: build.mutation<
      PutApiV1QaAnalyticalTestsByIdApiResponse,
      PutApiV1QaAnalyticalTestsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/qa/analytical-tests/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createAnalyticalTestRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1QaAnalyticalTestsById: build.mutation<
      DeleteApiV1QaAnalyticalTestsByIdApiResponse,
      DeleteApiV1QaAnalyticalTestsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/qa/analytical-tests/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Approval: build.query<
      GetApiV1ApprovalApiResponse,
      GetApiV1ApprovalApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/approval`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
      query: (queryArg) => ({
        url: `/api/v1/approval/${queryArg.approvalId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1ApprovalByApprovalId: build.mutation<
      PutApiV1ApprovalByApprovalIdApiResponse,
      PutApiV1ApprovalByApprovalIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/approval/${queryArg.approvalId}`,
        method: "PUT",
        body: queryArg.createApprovalRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ApprovalByApprovalId: build.mutation<
      DeleteApiV1ApprovalByApprovalIdApiResponse,
      DeleteApiV1ApprovalByApprovalIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/approval/${queryArg.approvalId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ApprovalByModelTypeAndModelId: build.query<
      GetApiV1ApprovalByModelTypeAndModelIdApiResponse,
      GetApiV1ApprovalByModelTypeAndModelIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/approval/${queryArg.modelType}/${queryArg.modelId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ApprovalMyPending: build.query<
      GetApiV1ApprovalMyPendingApiResponse,
      GetApiV1ApprovalMyPendingApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/approval/my-pending`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1AttendanceRecordsUpload: build.mutation<
      PostApiV1AttendanceRecordsUploadApiResponse,
      PostApiV1AttendanceRecordsUploadApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/attendance-records/upload`,
        method: "POST",
        body: queryArg.body,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1AttendanceRecordsDailySummary: build.query<
      GetApiV1AttendanceRecordsDailySummaryApiResponse,
      GetApiV1AttendanceRecordsDailySummaryApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/attendance-records/daily-summary`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          departmentName: queryArg.departmentName,
          date: queryArg.date,
        },
      }),
    }),
    getApiV1AttendanceRecordsGeneralSummary: build.query<
      GetApiV1AttendanceRecordsGeneralSummaryApiResponse,
      GetApiV1AttendanceRecordsGeneralSummaryApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/attendance-records/general-summary`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          date: queryArg.date,
        },
      }),
    }),
    postApiV1AuthLogin: build.mutation<
      PostApiV1AuthLoginApiResponse,
      PostApiV1AuthLoginApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/auth/login`,
        method: "POST",
        body: queryArg.loginRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1Bom: build.mutation<PostApiV1BomApiResponse, PostApiV1BomApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/bom`,
        method: "POST",
        body: queryArg.createBillOfMaterialRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Bom: build.query<GetApiV1BomApiResponse, GetApiV1BomApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/bom`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1BomByBillOfMaterialId: build.mutation<
      DeleteApiV1BomByBillOfMaterialIdApiResponse,
      DeleteApiV1BomByBillOfMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/bom/${queryArg.billOfMaterialId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1CollectionItemTypes: build.query<
      GetApiV1CollectionItemTypesApiResponse,
      GetApiV1CollectionItemTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/collection/item-types`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1CollectionByItemTypeAndItemId: build.mutation<
      PutApiV1CollectionByItemTypeAndItemIdApiResponse,
      PutApiV1CollectionByItemTypeAndItemIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/collection/${queryArg.itemType}/${queryArg.itemId}`,
        method: "PUT",
        body: queryArg.createItemRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1CollectionByItemTypeAndItemId: build.mutation<
      DeleteApiV1CollectionByItemTypeAndItemIdApiResponse,
      DeleteApiV1CollectionByItemTypeAndItemIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/collection/${queryArg.itemType}/${queryArg.itemId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1CollectionUom: build.query<
      GetApiV1CollectionUomApiResponse,
      GetApiV1CollectionUomApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/collection/uom`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          isRawMaterial: queryArg.isRawMaterial,
        },
      }),
    }),
    getApiV1CollectionPackageStyles: build.query<
      GetApiV1CollectionPackageStylesApiResponse,
      GetApiV1CollectionPackageStylesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/collection/package-styles`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1WorkingDays: build.mutation<
      PostApiV1WorkingDaysApiResponse,
      PostApiV1WorkingDaysApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/working-days`,
        method: "POST",
        body: queryArg.body,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1WorkingDays: build.query<
      GetApiV1WorkingDaysApiResponse,
      GetApiV1WorkingDaysApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/working-days`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Configuration: build.query<
      GetApiV1ConfigurationApiResponse,
      GetApiV1ConfigurationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/configuration`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ConfigurationByConfigurationId: build.mutation<
      DeleteApiV1ConfigurationByConfigurationIdApiResponse,
      DeleteApiV1ConfigurationByConfigurationIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/configuration/${queryArg.configurationId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ConfigurationByModelTypeByModelType: build.query<
      GetApiV1ConfigurationByModelTypeByModelTypeApiResponse,
      GetApiV1ConfigurationByModelTypeByModelTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/configuration/by-model-type/${queryArg.modelType}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ConfigurationNamingTypes: build.query<
      GetApiV1ConfigurationNamingTypesApiResponse,
      GetApiV1ConfigurationNamingTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/configuration/naming-types`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ConfigurationByModelTypeAndPrefix: build.query<
      GetApiV1ConfigurationByModelTypeAndPrefixApiResponse,
      GetApiV1ConfigurationByModelTypeAndPrefixApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/configuration/${queryArg.modelType}/${queryArg.prefix}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Countries: build.query<
      GetApiV1CountriesApiResponse,
      GetApiV1CountriesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/countries`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Department: build.query<
      GetApiV1DepartmentApiResponse,
      GetApiV1DepartmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/department`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1DepartmentByDepartmentId: build.mutation<
      DeleteApiV1DepartmentByDepartmentIdApiResponse,
      DeleteApiV1DepartmentByDepartmentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/department/${queryArg.departmentId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Designation: build.query<
      GetApiV1DesignationApiResponse,
      GetApiV1DesignationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/designation`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
      query: (queryArg) => ({
        url: `/api/v1/designation/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1DesignationById: build.mutation<
      PutApiV1DesignationByIdApiResponse,
      PutApiV1DesignationByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/designation/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createDesignationRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1DesignationById: build.mutation<
      DeleteApiV1DesignationByIdApiResponse,
      DeleteApiV1DesignationByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/designation/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1DesignationDepartmentById: build.query<
      GetApiV1DesignationDepartmentByIdApiResponse,
      GetApiV1DesignationDepartmentByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/designation/department/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Employee: build.query<
      GetApiV1EmployeeApiResponse,
      GetApiV1EmployeeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employee`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1EmployeeDepartmentsById: build.query<
      GetApiV1EmployeeDepartmentsByIdApiResponse,
      GetApiV1EmployeeDepartmentsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employee/departments/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1EmployeeByShiftScheduleIdAvailable: build.query<
      GetApiV1EmployeeByShiftScheduleIdAvailableApiResponse,
      GetApiV1EmployeeByShiftScheduleIdAvailableApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employee/${queryArg.shiftScheduleId}/available`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          date: queryArg.date,
        },
      }),
    }),
    getApiV1EmployeeById: build.query<
      GetApiV1EmployeeByIdApiResponse,
      GetApiV1EmployeeByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employee/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1EmployeeById: build.mutation<
      PutApiV1EmployeeByIdApiResponse,
      PutApiV1EmployeeByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employee/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createEmployeeRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1EmployeeById: build.mutation<
      DeleteApiV1EmployeeByIdApiResponse,
      DeleteApiV1EmployeeByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/employee/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1FileByModelTypeAndModelIdReference: build.query<
      GetApiV1FileByModelTypeAndModelIdReferenceApiResponse,
      GetApiV1FileByModelTypeAndModelIdReferenceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/file/${queryArg.modelType}/${queryArg.modelId}/${queryArg.reference}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1FileByModelId: build.mutation<
      DeleteApiV1FileByModelIdApiResponse,
      DeleteApiV1FileByModelIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/file/${queryArg.modelId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1FileByModelIdAndReference: build.mutation<
      DeleteApiV1FileByModelIdAndReferenceApiResponse,
      DeleteApiV1FileByModelIdAndReferenceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/file/${queryArg.modelId}/${queryArg.reference}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1FileByModelTypeAndReference: build.query<
      GetApiV1FileByModelTypeAndReferenceApiResponse,
      GetApiV1FileByModelTypeAndReferenceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/file/${queryArg.modelType}/${queryArg.reference}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Form: build.query<GetApiV1FormApiResponse, GetApiV1FormApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/form`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
      query: (queryArg) => ({
        url: `/api/v1/form/${queryArg.formId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1FormByFormId: build.mutation<
      PutApiV1FormByFormIdApiResponse,
      PutApiV1FormByFormIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form/${queryArg.formId}`,
        method: "PUT",
        body: queryArg.createFormRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1FormByFormId: build.mutation<
      DeleteApiV1FormByFormIdApiResponse,
      DeleteApiV1FormByFormIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form/${queryArg.formId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1FormResponsesByFormResponseId: build.query<
      GetApiV1FormResponsesByFormResponseIdApiResponse,
      GetApiV1FormResponsesByFormResponseIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form/responses/${queryArg.formResponseId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1FormQuestion: build.query<
      GetApiV1FormQuestionApiResponse,
      GetApiV1FormQuestionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form/question`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1FormQuestionByQuestionId: build.mutation<
      DeleteApiV1FormQuestionByQuestionIdApiResponse,
      DeleteApiV1FormQuestionByQuestionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/form/question/${queryArg.questionId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1Holidays: build.mutation<
      PostApiV1HolidaysApiResponse,
      PostApiV1HolidaysApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/holidays`,
        method: "POST",
        body: queryArg.createHolidayRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Holidays: build.query<
      GetApiV1HolidaysApiResponse,
      GetApiV1HolidaysApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/holidays`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1HolidaysById: build.query<
      GetApiV1HolidaysByIdApiResponse,
      GetApiV1HolidaysByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/holidays/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1HolidaysById: build.mutation<
      PutApiV1HolidaysByIdApiResponse,
      PutApiV1HolidaysByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/holidays/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createHolidayRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1HolidaysById: build.mutation<
      DeleteApiV1HolidaysByIdApiResponse,
      DeleteApiV1HolidaysByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/holidays/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1LeaveEntitlement: build.query<
      GetApiV1LeaveEntitlementApiResponse,
      GetApiV1LeaveEntitlementApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-entitlement`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1LeaveEntitlementById: build.mutation<
      DeleteApiV1LeaveEntitlementByIdApiResponse,
      DeleteApiV1LeaveEntitlementByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-entitlement/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1LeaveRequest: build.query<
      GetApiV1LeaveRequestApiResponse,
      GetApiV1LeaveRequestApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-request`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
      query: (queryArg) => ({
        url: `/api/v1/leave-request/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1LeaveRequestById: build.mutation<
      PutApiV1LeaveRequestByIdApiResponse,
      PutApiV1LeaveRequestByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-request/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createLeaveRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1LeaveRequestById: build.mutation<
      DeleteApiV1LeaveRequestByIdApiResponse,
      DeleteApiV1LeaveRequestByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-request/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1LeaveRequestRecall: build.mutation<
      PutApiV1LeaveRequestRecallApiResponse,
      PutApiV1LeaveRequestRecallApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-request/recall`,
        method: "PUT",
        body: queryArg.createLeaveRecallRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1LeaveType: build.query<
      GetApiV1LeaveTypeApiResponse,
      GetApiV1LeaveTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-type`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
      query: (queryArg) => ({
        url: `/api/v1/leave-type/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1LeaveTypeById: build.mutation<
      PutApiV1LeaveTypeByIdApiResponse,
      PutApiV1LeaveTypeByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-type/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createLeaveTypeRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1LeaveTypeById: build.mutation<
      DeleteApiV1LeaveTypeByIdApiResponse,
      DeleteApiV1LeaveTypeByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/leave-type/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Material: build.query<
      GetApiV1MaterialApiResponse,
      GetApiV1MaterialApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1MaterialByMaterialId: build.mutation<
      PutApiV1MaterialByMaterialIdApiResponse,
      PutApiV1MaterialByMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}`,
        method: "PUT",
        body: queryArg.createMaterialRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1MaterialByMaterialId: build.mutation<
      DeleteApiV1MaterialByMaterialIdApiResponse,
      DeleteApiV1MaterialByMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1MaterialCategory: build.query<
      GetApiV1MaterialCategoryApiResponse,
      GetApiV1MaterialCategoryApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/category`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          materialKind: queryArg.materialKind,
        },
      }),
    }),
    getApiV1MaterialAll: build.query<
      GetApiV1MaterialAllApiResponse,
      GetApiV1MaterialAllApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/all`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1MaterialByMaterialIdReorderLevel: build.mutation<
      PutApiV1MaterialByMaterialIdReorderLevelApiResponse,
      PutApiV1MaterialByMaterialIdReorderLevelApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/reorder-level`,
        method: "PUT",
        body: queryArg.updateReOrderLevelRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1MaterialByMaterialIdStockLevel: build.query<
      GetApiV1MaterialByMaterialIdStockLevelApiResponse,
      GetApiV1MaterialByMaterialIdStockLevelApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/stock-level`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1MaterialByMaterialIdBatches: build.query<
      GetApiV1MaterialByMaterialIdBatchesApiResponse,
      GetApiV1MaterialByMaterialIdBatchesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/batches`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1MaterialByMaterialIdInTransit: build.query<
      GetApiV1MaterialByMaterialIdInTransitApiResponse,
      GetApiV1MaterialByMaterialIdInTransitApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/in-transit`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1MaterialBatch: build.query<
      GetApiV1MaterialBatchApiResponse,
      GetApiV1MaterialBatchApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/batch`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1MaterialBatchByBatchIdApprove: build.mutation<
      PutApiV1MaterialBatchByBatchIdApproveApiResponse,
      PutApiV1MaterialBatchByBatchIdApproveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/batch/${queryArg.batchId}/approve`,
        method: "PUT",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1MaterialByMaterialIdStockAndWarehouseId: build.query<
      GetApiV1MaterialByMaterialIdStockAndWarehouseIdApiResponse,
      GetApiV1MaterialByMaterialIdStockAndWarehouseIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/stock/${queryArg.warehouseId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1MaterialBatchConsume: build.mutation<
      PostApiV1MaterialBatchConsumeApiResponse,
      PostApiV1MaterialBatchConsumeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/batch/consume`,
        method: "POST",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1MaterialByMaterialIdDepartmentStockAndQuantity: build.query<
      GetApiV1MaterialByMaterialIdDepartmentStockAndQuantityApiResponse,
      GetApiV1MaterialByMaterialIdDepartmentStockAndQuantityApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/department-stock/${queryArg.quantity}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1MaterialApprovedMaterials: build.query<
      GetApiV1MaterialApprovedMaterialsApiResponse,
      GetApiV1MaterialApprovedMaterialsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/approved-materials`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1MaterialByMaterialIdStockDepartments: build.query<
      GetApiV1MaterialByMaterialIdStockDepartmentsApiResponse,
      GetApiV1MaterialByMaterialIdStockDepartmentsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/stock/departments`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1MaterialDepartment: build.query<
      GetApiV1MaterialDepartmentApiResponse,
      GetApiV1MaterialDepartmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/department`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1MaterialHolding: build.query<
      GetApiV1MaterialHoldingApiResponse,
      GetApiV1MaterialHoldingApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/holding`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          withProcessed: queryArg.withProcessed,
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          userId: queryArg.userId,
        },
      }),
    }),
    postApiV1MaterialHoldingMoveByHoldingMaterialId: build.mutation<
      PostApiV1MaterialHoldingMoveByHoldingMaterialIdApiResponse,
      PostApiV1MaterialHoldingMoveByHoldingMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/holding/move/${queryArg.holdingMaterialId}`,
        method: "POST",
        body: queryArg.moveShelfMaterialBatchRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1MaterialArd: build.mutation<
      PostApiV1MaterialArdApiResponse,
      PostApiV1MaterialArdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material-ard`,
        method: "POST",
        body: queryArg.createMaterialAnalyticalRawDataRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1MaterialArd: build.query<
      GetApiV1MaterialArdApiResponse,
      GetApiV1MaterialArdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material-ard`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          materialKind: queryArg.materialKind,
        },
      }),
    }),
    getApiV1MaterialArdById: build.query<
      GetApiV1MaterialArdByIdApiResponse,
      GetApiV1MaterialArdByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material-ard/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1MaterialArdById: build.mutation<
      PutApiV1MaterialArdByIdApiResponse,
      PutApiV1MaterialArdByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material-ard/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createMaterialAnalyticalRawDataRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1MaterialArdById: build.mutation<
      DeleteApiV1MaterialArdByIdApiResponse,
      DeleteApiV1MaterialArdByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material-ard/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1MaterialStps: build.mutation<
      PostApiV1MaterialStpsApiResponse,
      PostApiV1MaterialStpsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material-stps`,
        method: "POST",
        body: queryArg.createMaterialStandardTestProcedureRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1MaterialStps: build.query<
      GetApiV1MaterialStpsApiResponse,
      GetApiV1MaterialStpsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material-stps`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          materialKind: queryArg.materialKind,
        },
      }),
    }),
    getApiV1MaterialStpsById: build.query<
      GetApiV1MaterialStpsByIdApiResponse,
      GetApiV1MaterialStpsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material-stps/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1MaterialStpsById: build.mutation<
      PutApiV1MaterialStpsByIdApiResponse,
      PutApiV1MaterialStpsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material-stps/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createMaterialStandardTestProcedureRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1MaterialStpsById: build.mutation<
      DeleteApiV1MaterialStpsByIdApiResponse,
      DeleteApiV1MaterialStpsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material-stps/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1OvertimeRequests: build.mutation<
      PostApiV1OvertimeRequestsApiResponse,
      PostApiV1OvertimeRequestsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/overtime-requests`,
        method: "POST",
        body: queryArg.createOvertimeRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1OvertimeRequests: build.query<
      GetApiV1OvertimeRequestsApiResponse,
      GetApiV1OvertimeRequestsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/overtime-requests`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1OvertimeRequestsById: build.query<
      GetApiV1OvertimeRequestsByIdApiResponse,
      GetApiV1OvertimeRequestsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/overtime-requests/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1OvertimeRequestsById: build.mutation<
      PutApiV1OvertimeRequestsByIdApiResponse,
      PutApiV1OvertimeRequestsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/overtime-requests/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createOvertimeRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1OvertimeRequestsById: build.mutation<
      DeleteApiV1OvertimeRequestsByIdApiResponse,
      DeleteApiV1OvertimeRequestsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/overtime-requests/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1PermissionModules: build.query<
      GetApiV1PermissionModulesApiResponse,
      GetApiV1PermissionModulesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/permission/modules`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Permission: build.query<
      GetApiV1PermissionApiResponse,
      GetApiV1PermissionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/permission`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1PermissionUserByUserId: build.query<
      GetApiV1PermissionUserByUserIdApiResponse,
      GetApiV1PermissionUserByUserIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/permission/user/${queryArg.userId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1PermissionRoleByRoleId: build.query<
      GetApiV1PermissionRoleByRoleIdApiResponse,
      GetApiV1PermissionRoleByRoleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/permission/role/${queryArg.roleId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1PermissionMenu: build.query<
      GetApiV1PermissionMenuApiResponse,
      GetApiV1PermissionMenuApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/permission/menu`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1ProcurementManufacturer: build.mutation<
      PostApiV1ProcurementManufacturerApiResponse,
      PostApiV1ProcurementManufacturerApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/manufacturer`,
        method: "POST",
        body: queryArg.createManufacturerRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementManufacturer: build.query<
      GetApiV1ProcurementManufacturerApiResponse,
      GetApiV1ProcurementManufacturerApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/manufacturer`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProcurementManufacturerByManufacturerId: build.mutation<
      DeleteApiV1ProcurementManufacturerByManufacturerIdApiResponse,
      DeleteApiV1ProcurementManufacturerByManufacturerIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/manufacturer/${queryArg.manufacturerId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementManufacturerMaterialByMaterialId: build.query<
      GetApiV1ProcurementManufacturerMaterialByMaterialIdApiResponse,
      GetApiV1ProcurementManufacturerMaterialByMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/manufacturer/material/${queryArg.materialId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementSupplier: build.query<
      GetApiV1ProcurementSupplierApiResponse,
      GetApiV1ProcurementSupplierApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/supplier`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProcurementSupplierBySupplierId: build.mutation<
      DeleteApiV1ProcurementSupplierBySupplierIdApiResponse,
      DeleteApiV1ProcurementSupplierBySupplierIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/supplier/${queryArg.supplierId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementSupplierMaterialByMaterialId: build.query<
      GetApiV1ProcurementSupplierMaterialByMaterialIdApiResponse,
      GetApiV1ProcurementSupplierMaterialByMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/supplier/material/${queryArg.materialId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementSupplierByMaterialIdAndType: build.query<
      GetApiV1ProcurementSupplierByMaterialIdAndTypeApiResponse,
      GetApiV1ProcurementSupplierByMaterialIdAndTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/supplier/${queryArg.materialId}/${queryArg["type"]}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementPurchaseOrder: build.query<
      GetApiV1ProcurementPurchaseOrderApiResponse,
      GetApiV1ProcurementPurchaseOrderApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProcurementPurchaseOrderByPurchaseOrderId: build.mutation<
      DeleteApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiResponse,
      DeleteApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order/${queryArg.purchaseOrderId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementPurchaseOrderRequisitionByPurchaseOrderIdAndMaterialId:
      build.query<
        GetApiV1ProcurementPurchaseOrderRequisitionByPurchaseOrderIdAndMaterialIdApiResponse,
        GetApiV1ProcurementPurchaseOrderRequisitionByPurchaseOrderIdAndMaterialIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/procurement/purchase-order/requisition/${queryArg.purchaseOrderId}/${queryArg.materialId}`,
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementPurchaseOrderInvoice: build.query<
      GetApiV1ProcurementPurchaseOrderInvoiceApiResponse,
      GetApiV1ProcurementPurchaseOrderInvoiceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order-invoice`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProcurementPurchaseOrderInvoiceByInvoiceId: build.mutation<
      DeleteApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiResponse,
      DeleteApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order-invoice/${queryArg.invoiceId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementBillingSheet: build.query<
      GetApiV1ProcurementBillingSheetApiResponse,
      GetApiV1ProcurementBillingSheetApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/billing-sheet`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProcurementBillingSheetByBillingSheetId: build.mutation<
      DeleteApiV1ProcurementBillingSheetByBillingSheetIdApiResponse,
      DeleteApiV1ProcurementBillingSheetByBillingSheetIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/billing-sheet/${queryArg.billingSheetId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementShipmentDocument: build.query<
      GetApiV1ProcurementShipmentDocumentApiResponse,
      GetApiV1ProcurementShipmentDocumentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-document`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProcurementShipmentDocumentByShipmentDocumentId: build.mutation<
      DeleteApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiResponse,
      DeleteApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-document/${queryArg.shipmentDocumentId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementWaybill: build.query<
      GetApiV1ProcurementWaybillApiResponse,
      GetApiV1ProcurementWaybillApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/waybill`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProcurementWaybillByWaybillId: build.mutation<
      DeleteApiV1ProcurementWaybillByWaybillIdApiResponse,
      DeleteApiV1ProcurementWaybillByWaybillIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/waybill/${queryArg.waybillId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementShipmentDocumentArrived: build.query<
      GetApiV1ProcurementShipmentDocumentArrivedApiResponse,
      GetApiV1ProcurementShipmentDocumentArrivedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-document/arrived`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementShipmentInvoice: build.query<
      GetApiV1ProcurementShipmentInvoiceApiResponse,
      GetApiV1ProcurementShipmentInvoiceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-invoice`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementShipmentInvoiceUnattached: build.query<
      GetApiV1ProcurementShipmentInvoiceUnattachedApiResponse,
      GetApiV1ProcurementShipmentInvoiceUnattachedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-invoice/unattached`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementShipmentInvoiceShipmentDocumentByShipmentDocumentId:
      build.query<
        GetApiV1ProcurementShipmentInvoiceShipmentDocumentByShipmentDocumentIdApiResponse,
        GetApiV1ProcurementShipmentInvoiceShipmentDocumentByShipmentDocumentIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/procurement/shipment-invoice/shipment-document/${queryArg.shipmentDocumentId}`,
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProcurementShipmentInvoiceByShipmentInvoiceId: build.mutation<
      DeleteApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdApiResponse,
      DeleteApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-invoice/${queryArg.shipmentInvoiceId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyId: build.query<
      GetApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiResponse,
      GetApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/shipment-discrepancy/${queryArg.shipmentDiscrepancyId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    getApiV1ProcurementPurchaseOrderNotLinked: build.query<
      GetApiV1ProcurementPurchaseOrderNotLinkedApiResponse,
      GetApiV1ProcurementPurchaseOrderNotLinkedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order/not-linked`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinked: build.query<
      GetApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinkedApiResponse,
      GetApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinkedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/purchase-order/supplier/${queryArg.supplierId}/not-linked`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistribution:
      build.query<
        GetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionApiResponse,
        GetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/procurement/shipment-document/${queryArg.shipmentDocumentId}/material-distribution`,
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    postApiV1ProcurementByShipmentDocumentIdConfirmDistribution: build.mutation<
      PostApiV1ProcurementByShipmentDocumentIdConfirmDistributionApiResponse,
      PostApiV1ProcurementByShipmentDocumentIdConfirmDistributionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/procurement/${queryArg.shipmentDocumentId}/confirm-distribution`,
        method: "POST",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Product: build.query<
      GetApiV1ProductApiResponse,
      GetApiV1ProductApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1ProductByProductId: build.mutation<
      PutApiV1ProductByProductIdApiResponse,
      PutApiV1ProductByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}`,
        method: "PUT",
        body: queryArg.updateProductRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProductByProductId: build.mutation<
      DeleteApiV1ProductByProductIdApiResponse,
      DeleteApiV1ProductByProductIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductByProductIdBom: build.query<
      GetApiV1ProductByProductIdBomApiResponse,
      GetApiV1ProductByProductIdBomApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}/bom`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductByProductIdRoutes: build.query<
      GetApiV1ProductByProductIdRoutesApiResponse,
      GetApiV1ProductByProductIdRoutesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}/routes`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductRoutesByRouteId: build.query<
      GetApiV1ProductRoutesByRouteIdApiResponse,
      GetApiV1ProductRoutesByRouteIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/routes/${queryArg.routeId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProductRoutesByRouteId: build.mutation<
      DeleteApiV1ProductRoutesByRouteIdApiResponse,
      DeleteApiV1ProductRoutesByRouteIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/routes/${queryArg.routeId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductByProductIdPackages: build.query<
      GetApiV1ProductByProductIdPackagesApiResponse,
      GetApiV1ProductByProductIdPackagesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}/packages`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductPackagesByProductPackageId: build.query<
      GetApiV1ProductPackagesByProductPackageIdApiResponse,
      GetApiV1ProductPackagesByProductPackageIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/packages/${queryArg.productPackageId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProductPackagesByProductPackageId: build.mutation<
      DeleteApiV1ProductPackagesByProductPackageIdApiResponse,
      DeleteApiV1ProductPackagesByProductPackageIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/packages/${queryArg.productPackageId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1ProductByProductIdBomArchive: build.mutation<
      PutApiV1ProductByProductIdBomArchiveApiResponse,
      PutApiV1ProductByProductIdBomArchiveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/${queryArg.productId}/bom/archive`,
        method: "PUT",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductEquipment: build.query<
      GetApiV1ProductEquipmentApiResponse,
      GetApiV1ProductEquipmentApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/equipment`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProductEquipmentByEquipmentId: build.mutation<
      DeleteApiV1ProductEquipmentByEquipmentIdApiResponse,
      DeleteApiV1ProductEquipmentByEquipmentIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/equipment/${queryArg.equipmentId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductEquipmentAll: build.query<
      GetApiV1ProductEquipmentAllApiResponse,
      GetApiV1ProductEquipmentAllApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product/equipment/all`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1ProductArd: build.mutation<
      PostApiV1ProductArdApiResponse,
      PostApiV1ProductArdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product-ard`,
        method: "POST",
        body: queryArg.createProductAnalyticalRawDataRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductArd: build.query<
      GetApiV1ProductArdApiResponse,
      GetApiV1ProductArdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product-ard`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProductArdById: build.query<
      GetApiV1ProductArdByIdApiResponse,
      GetApiV1ProductArdByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product-ard/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1ProductArdById: build.mutation<
      PutApiV1ProductArdByIdApiResponse,
      PutApiV1ProductArdByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product-ard/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createProductAnalyticalRawDataRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProductArdById: build.mutation<
      DeleteApiV1ProductArdByIdApiResponse,
      DeleteApiV1ProductArdByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product-ard/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1ProductionSchedule: build.mutation<
      PostApiV1ProductionScheduleApiResponse,
      PostApiV1ProductionScheduleApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule`,
        method: "POST",
        body: queryArg.createProductionScheduleRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductionSchedule: build.query<
      GetApiV1ProductionScheduleApiResponse,
      GetApiV1ProductionScheduleApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProductionScheduleByScheduleId: build.mutation<
      DeleteApiV1ProductionScheduleByScheduleIdApiResponse,
      DeleteApiV1ProductionScheduleByScheduleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/${queryArg.scheduleId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductionScheduleByProductionScheduleIdProductAndProductId:
      build.query<
        GetApiV1ProductionScheduleByProductionScheduleIdProductAndProductIdApiResponse,
        GetApiV1ProductionScheduleByProductionScheduleIdProductAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/${queryArg.productionScheduleId}/product/${queryArg.productId}`,
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    getApiV1ProductionScheduleProductionStatus: build.query<
      GetApiV1ProductionScheduleProductionStatusApiResponse,
      GetApiV1ProductionScheduleProductionStatusApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/production-status`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductionScheduleByScheduleIdDetails: build.query<
      GetApiV1ProductionScheduleByScheduleIdDetailsApiResponse,
      GetApiV1ProductionScheduleByScheduleIdDetailsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/${queryArg.scheduleId}/details`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductId:
      build.query<
        GetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdApiResponse,
        GetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/material-stock/${queryArg.productionScheduleId}/${queryArg.productId}`,
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    getApiV1ProductionScheduleByProductionScheduleIdPackageMaterialsWithInsufficientStockAndProductId:
      build.query<
        GetApiV1ProductionScheduleByProductionScheduleIdPackageMaterialsWithInsufficientStockAndProductIdApiResponse,
        GetApiV1ProductionScheduleByProductionScheduleIdPackageMaterialsWithInsufficientStockAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/${queryArg.productionScheduleId}/package-materials-with-insufficient-stock/${queryArg.productId}`,
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    getApiV1ProductionScheduleActivity: build.query<
      GetApiV1ProductionScheduleActivityApiResponse,
      GetApiV1ProductionScheduleActivityApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/activity`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductionScheduleActivityByProductionScheduleIdAndProductId:
      build.query<
        GetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdApiResponse,
        GetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/activity/${queryArg.productionScheduleId}/${queryArg.productId}`,
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    getApiV1ProductionScheduleActivityStatusGrouped: build.query<
      GetApiV1ProductionScheduleActivityStatusGroupedApiResponse,
      GetApiV1ProductionScheduleActivityStatusGroupedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/activity/status-grouped`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductionScheduleActivityOperationGrouped: build.query<
      GetApiV1ProductionScheduleActivityOperationGroupedApiResponse,
      GetApiV1ProductionScheduleActivityOperationGroupedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/activity/operation-grouped`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    getApiV1ProductionScheduleActivityStepStatusGrouped: build.query<
      GetApiV1ProductionScheduleActivityStepStatusGroupedApiResponse,
      GetApiV1ProductionScheduleActivityStepStatusGroupedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/activity-step/status-grouped`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductionScheduleActivityStepOperationGrouped: build.query<
      GetApiV1ProductionScheduleActivityStepOperationGroupedApiResponse,
      GetApiV1ProductionScheduleActivityStepOperationGroupedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/activity-step/operation-grouped`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductionScheduleManufacturing: build.query<
      GetApiV1ProductionScheduleManufacturingApiResponse,
      GetApiV1ProductionScheduleManufacturingApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/manufacturing`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductionScheduleManufacturingById: build.query<
      GetApiV1ProductionScheduleManufacturingByIdApiResponse,
      GetApiV1ProductionScheduleManufacturingByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/manufacturing/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1ProductionScheduleManufacturingIssueById: build.mutation<
      PutApiV1ProductionScheduleManufacturingIssueByIdApiResponse,
      PutApiV1ProductionScheduleManufacturingIssueByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/manufacturing/issue/${queryArg.id}`,
        method: "PUT",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductionSchedulePackaging: build.query<
      GetApiV1ProductionSchedulePackagingApiResponse,
      GetApiV1ProductionSchedulePackagingApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/packaging`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1ProductionSchedulePackagingIssueById: build.mutation<
      PutApiV1ProductionSchedulePackagingIssueByIdApiResponse,
      PutApiV1ProductionSchedulePackagingIssueByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/packaging/issue/${queryArg.id}`,
        method: "PUT",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductionScheduleStockTransfer: build.query<
      GetApiV1ProductionScheduleStockTransferApiResponse,
      GetApiV1ProductionScheduleStockTransferApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/stock-transfer`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    getApiV1ProductionScheduleStockTransferBatchByStockTransferId: build.query<
      GetApiV1ProductionScheduleStockTransferBatchByStockTransferIdApiResponse,
      GetApiV1ProductionScheduleStockTransferBatchByStockTransferIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/stock-transfer/batch/${queryArg.stockTransferId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductionScheduleFinalPacking: build.query<
      GetApiV1ProductionScheduleFinalPackingApiResponse,
      GetApiV1ProductionScheduleFinalPackingApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/final-packing`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProductionScheduleFinalPackingByFinalPackingId: build.mutation<
      DeleteApiV1ProductionScheduleFinalPackingByFinalPackingIdApiResponse,
      DeleteApiV1ProductionScheduleFinalPackingByFinalPackingIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/final-packing/${queryArg.finalPackingId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductId:
      build.query<
        GetApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductIdApiResponse,
        GetApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/final-packing/${queryArg.productionScheduleId}/${queryArg.productId}`,
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    getApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductId:
      build.query<
        GetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdApiResponse,
        GetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/stock-requisition/package/${queryArg.productionScheduleId}/${queryArg.productId}`,
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    postApiV1ProductionScheduleReturnBeforeProduction: build.mutation<
      PostApiV1ProductionScheduleReturnBeforeProductionApiResponse,
      PostApiV1ProductionScheduleReturnBeforeProductionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/return-before-production`,
        method: "POST",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          productionScheduleId: queryArg.productionScheduleId,
          productId: queryArg.productId,
          reason: queryArg.reason,
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    getApiV1ProductionScheduleExtraPacking: build.query<
      GetApiV1ProductionScheduleExtraPackingApiResponse,
      GetApiV1ProductionScheduleExtraPackingApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/extra-packing`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    getApiV1ProductionScheduleExtraPackingByProductByProductionScheduleIdAndProductId:
      build.query<
        GetApiV1ProductionScheduleExtraPackingByProductByProductionScheduleIdAndProductIdApiResponse,
        GetApiV1ProductionScheduleExtraPackingByProductByProductionScheduleIdAndProductIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/extra-packing/by-product/${queryArg.productionScheduleId}/${queryArg.productId}`,
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    getApiV1ProductionScheduleExtraPackingBatchesToSupplyByExtraPackingMaterialId:
      build.query<
        GetApiV1ProductionScheduleExtraPackingBatchesToSupplyByExtraPackingMaterialIdApiResponse,
        GetApiV1ProductionScheduleExtraPackingBatchesToSupplyByExtraPackingMaterialIdApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/production-schedule/extra-packing/batches-to-supply/${queryArg.extraPackingMaterialId}`,
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    postApiV1ProductStps: build.mutation<
      PostApiV1ProductStpsApiResponse,
      PostApiV1ProductStpsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product-stps`,
        method: "POST",
        body: queryArg.createProductStandardTestProcedureRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ProductStps: build.query<
      GetApiV1ProductStpsApiResponse,
      GetApiV1ProductStpsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product-stps`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    getApiV1ProductStpsById: build.query<
      GetApiV1ProductStpsByIdApiResponse,
      GetApiV1ProductStpsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product-stps/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1ProductStpsById: build.mutation<
      PutApiV1ProductStpsByIdApiResponse,
      PutApiV1ProductStpsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product-stps/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createProductStandardTestProcedureRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ProductStpsById: build.mutation<
      DeleteApiV1ProductStpsByIdApiResponse,
      DeleteApiV1ProductStpsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/product-stps/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Requisition: build.query<
      GetApiV1RequisitionApiResponse,
      GetApiV1RequisitionApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1RequisitionSource: build.query<
      GetApiV1RequisitionSourceApiResponse,
      GetApiV1RequisitionSourceApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1RequisitionSourceBySourceRequisitionId: build.mutation<
      DeleteApiV1RequisitionSourceBySourceRequisitionIdApiResponse,
      DeleteApiV1RequisitionSourceBySourceRequisitionIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/${queryArg.sourceRequisitionId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1RequisitionSourceItems: build.query<
      GetApiV1RequisitionSourceItemsApiResponse,
      GetApiV1RequisitionSourceItemsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/items`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1RequisitionSourceSupplierBySupplierIdSendQuotation: build.mutation<
      PostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationApiResponse,
      PostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/supplier/${queryArg.supplierId}/send-quotation`,
        method: "POST",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1RequisitionSourceSupplierQuotation: build.query<
      GetApiV1RequisitionSourceSupplierQuotationApiResponse,
      GetApiV1RequisitionSourceSupplierQuotationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/supplier/quotation`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
        }),
      }),
    getApiV1RequisitionSourceMaterialPriceComparison: build.query<
      GetApiV1RequisitionSourceMaterialPriceComparisonApiResponse,
      GetApiV1RequisitionSourceMaterialPriceComparisonApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/material/price-comparison`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          supplierType: queryArg.supplierType,
        },
      }),
    }),
    getApiV1Role: build.query<GetApiV1RoleApiResponse, GetApiV1RoleApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/role`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1Role: build.mutation<
      PostApiV1RoleApiResponse,
      PostApiV1RoleApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/role`,
        method: "POST",
        body: queryArg.createRoleRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1RoleWithPermissions: build.query<
      GetApiV1RoleWithPermissionsApiResponse,
      GetApiV1RoleWithPermissionsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/role/with-permissions`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
      query: (queryArg) => ({
        url: `/api/v1/role/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1RoleById: build.mutation<
      PutApiV1RoleByIdApiResponse,
      PutApiV1RoleByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/role/${queryArg.id}`,
        method: "PUT",
        body: queryArg.updateRoleRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1RoleById: build.mutation<
      DeleteApiV1RoleByIdApiResponse,
      DeleteApiV1RoleByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/role/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1RoleCheckById: build.query<
      GetApiV1RoleCheckByIdApiResponse,
      GetApiV1RoleCheckByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/role/check/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1ShiftSchedules: build.mutation<
      PostApiV1ShiftSchedulesApiResponse,
      PostApiV1ShiftSchedulesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-schedules`,
        method: "POST",
        body: queryArg.createShiftScheduleRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ShiftSchedules: build.query<
      GetApiV1ShiftSchedulesApiResponse,
      GetApiV1ShiftSchedulesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-schedules`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    postApiV1ShiftSchedulesAssign: build.mutation<
      PostApiV1ShiftSchedulesAssignApiResponse,
      PostApiV1ShiftSchedulesAssignApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-schedules/assign`,
        method: "POST",
        body: queryArg.assignShiftRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ShiftSchedulesById: build.query<
      GetApiV1ShiftSchedulesByIdApiResponse,
      GetApiV1ShiftSchedulesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-schedules/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1ShiftSchedulesById: build.mutation<
      PutApiV1ShiftSchedulesByIdApiResponse,
      PutApiV1ShiftSchedulesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-schedules/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createShiftScheduleRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ShiftSchedulesById: build.mutation<
      DeleteApiV1ShiftSchedulesByIdApiResponse,
      DeleteApiV1ShiftSchedulesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-schedules/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ShiftSchedulesByScheduleIdView: build.query<
      GetApiV1ShiftSchedulesByScheduleIdViewApiResponse,
      GetApiV1ShiftSchedulesByScheduleIdViewApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-schedules/${queryArg.scheduleId}/view`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
        },
      }),
    }),
    getApiV1ShiftSchedulesByScheduleIdDay: build.query<
      GetApiV1ShiftSchedulesByScheduleIdDayApiResponse,
      GetApiV1ShiftSchedulesByScheduleIdDayApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-schedules/${queryArg.scheduleId}/day`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          date: queryArg.date,
        },
      }),
    }),
    putApiV1ShiftSchedulesByIdUpdateSchedule: build.mutation<
      PutApiV1ShiftSchedulesByIdUpdateScheduleApiResponse,
      PutApiV1ShiftSchedulesByIdUpdateScheduleApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-schedules/${queryArg.id}/update-schedule`,
        method: "PUT",
        body: queryArg.updateShiftAssignment,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ShiftType: build.query<
      GetApiV1ShiftTypeApiResponse,
      GetApiV1ShiftTypeApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-type`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1ShiftTypeById: build.query<
      GetApiV1ShiftTypeByIdApiResponse,
      GetApiV1ShiftTypeByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-type/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1ShiftTypeById: build.mutation<
      DeleteApiV1ShiftTypeByIdApiResponse,
      DeleteApiV1ShiftTypeByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/shift-type/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1StaffRequisitions: build.mutation<
      PostApiV1StaffRequisitionsApiResponse,
      PostApiV1StaffRequisitionsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/staff-requisitions`,
        method: "POST",
        body: queryArg.createStaffRequisitionRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1StaffRequisitions: build.query<
      GetApiV1StaffRequisitionsApiResponse,
      GetApiV1StaffRequisitionsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/staff-requisitions`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
        },
      }),
    }),
    getApiV1StaffRequisitionsById: build.query<
      GetApiV1StaffRequisitionsByIdApiResponse,
      GetApiV1StaffRequisitionsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/staff-requisitions/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1StaffRequisitionsById: build.mutation<
      PutApiV1StaffRequisitionsByIdApiResponse,
      PutApiV1StaffRequisitionsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/staff-requisitions/${queryArg.id}`,
        method: "PUT",
        body: queryArg.createStaffRequisitionRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1StaffRequisitionsById: build.mutation<
      DeleteApiV1StaffRequisitionsByIdApiResponse,
      DeleteApiV1StaffRequisitionsByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/staff-requisitions/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1User: build.query<GetApiV1UserApiResponse, GetApiV1UserApiArg>({
      query: (queryArg) => ({
        url: `/api/v1/user`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1UserAuthenticated: build.query<
      GetApiV1UserAuthenticatedApiResponse,
      GetApiV1UserAuthenticatedApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/authenticated`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    putApiV1UserById: build.mutation<
      PutApiV1UserByIdApiResponse,
      PutApiV1UserByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/${queryArg.id}`,
        method: "PUT",
        body: queryArg.updateUserRequest,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1UserById: build.mutation<
      DeleteApiV1UserByIdApiResponse,
      DeleteApiV1UserByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/${queryArg.id}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1UserToggleDisableById: build.query<
      GetApiV1UserToggleDisableByIdApiResponse,
      GetApiV1UserToggleDisableByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/user/toggle-disable/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1Warehouse: build.query<
      GetApiV1WarehouseApiResponse,
      GetApiV1WarehouseApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1WarehouseByWarehouseId: build.mutation<
      DeleteApiV1WarehouseByWarehouseIdApiResponse,
      DeleteApiV1WarehouseByWarehouseIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/${queryArg.warehouseId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1WarehouseLocationByLocationId: build.query<
      GetApiV1WarehouseLocationByLocationIdApiResponse,
      GetApiV1WarehouseLocationByLocationIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/location/${queryArg.locationId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1WarehouseLocationByLocationId: build.mutation<
      DeleteApiV1WarehouseLocationByLocationIdApiResponse,
      DeleteApiV1WarehouseLocationByLocationIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/location/${queryArg.locationId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1WarehouseLocation: build.query<
      GetApiV1WarehouseLocationApiResponse,
      GetApiV1WarehouseLocationApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/location`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1WarehouseRackByRackId: build.query<
      GetApiV1WarehouseRackByRackIdApiResponse,
      GetApiV1WarehouseRackByRackIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/rack/${queryArg.rackId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1WarehouseRackByRackId: build.mutation<
      DeleteApiV1WarehouseRackByRackIdApiResponse,
      DeleteApiV1WarehouseRackByRackIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/rack/${queryArg.rackId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1WarehouseRack: build.query<
      GetApiV1WarehouseRackApiResponse,
      GetApiV1WarehouseRackApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/rack`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1WarehouseShelfByShelfId: build.query<
      GetApiV1WarehouseShelfByShelfIdApiResponse,
      GetApiV1WarehouseShelfByShelfIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/shelf/${queryArg.shelfId}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    deleteApiV1WarehouseShelfByShelfId: build.mutation<
      DeleteApiV1WarehouseShelfByShelfIdApiResponse,
      DeleteApiV1WarehouseShelfByShelfIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/shelf/${queryArg.shelfId}`,
        method: "DELETE",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1WarehouseShelf: build.query<
      GetApiV1WarehouseShelfApiResponse,
      GetApiV1WarehouseShelfApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/shelf`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1WarehouseDistributedRequisitionMaterials: build.query<
      GetApiV1WarehouseDistributedRequisitionMaterialsApiResponse,
      GetApiV1WarehouseDistributedRequisitionMaterialsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/distributed-requisition-materials`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    postApiV1WarehouseConfirmArrivalByDistributedMaterialId: build.mutation<
      PostApiV1WarehouseConfirmArrivalByDistributedMaterialIdApiResponse,
      PostApiV1WarehouseConfirmArrivalByDistributedMaterialIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/confirm-arrival/${queryArg.distributedMaterialId}`,
        method: "POST",
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1WarehouseChecklistById: build.query<
      GetApiV1WarehouseChecklistByIdApiResponse,
      GetApiV1WarehouseChecklistByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/checklist/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1WarehouseDistributedMaterialByDistributedMaterialIdMaterialBatch:
      build.query<
        GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdMaterialBatchApiResponse,
        GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdMaterialBatchApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/warehouse/distributed-material/${queryArg.distributedMaterialId}/material-batch`,
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1WarehouseDistributedMaterialByDistributedMaterialIdChecklist:
      build.query<
        GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdChecklistApiResponse,
        GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdChecklistApiArg
      >({
        query: (queryArg) => ({
          url: `/api/v1/warehouse/distributed-material/${queryArg.distributedMaterialId}/checklist`,
          headers: {
            Module: queryArg["module"],
            SubModule: queryArg.subModule,
          },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1WarehouseGrnById: build.query<
      GetApiV1WarehouseGrnByIdApiResponse,
      GetApiV1WarehouseGrnByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/grn/${queryArg.id}`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
      }),
    }),
    getApiV1WarehouseGrns: build.query<
      GetApiV1WarehouseGrnsApiResponse,
      GetApiV1WarehouseGrnsApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/warehouse/grns`,
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
        headers: {
          Module: queryArg["module"],
          SubModule: queryArg.subModule,
        },
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1AlertApiResponse = /** status 200 OK */ string;
export type PostApiV1AlertApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createAlertRequest: CreateAlertRequest;
};
export type GetApiV1AlertApiResponse =
  /** status 200 OK */ AlertDtoIEnumerablePaginateable;
export type GetApiV1AlertApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  withDisabled?: boolean;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1AlertByAlertIdApiResponse = /** status 200 OK */ AlertDto;
export type GetApiV1AlertByAlertIdApiArg = {
  alertId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1AlertByAlertIdApiResponse = unknown;
export type PutApiV1AlertByAlertIdApiArg = {
  alertId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createAlertRequest: CreateAlertRequest;
};
export type PatchApiV1AlertByIdToggleDisableApiResponse = unknown;
export type PatchApiV1AlertByIdToggleDisableApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1QaAnalyticalTestsApiResponse = /** status 200 OK */ string;
export type PostApiV1QaAnalyticalTestsApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createAnalyticalTestRequest: CreateAnalyticalTestRequest;
};
export type GetApiV1QaAnalyticalTestsApiResponse =
  /** status 200 OK */ AnalyticalTestRequestDtoIEnumerablePaginateable;
export type GetApiV1QaAnalyticalTestsApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1QaAnalyticalTestsByIdApiResponse =
  /** status 200 OK */ AnalyticalTestRequestDto;
export type GetApiV1QaAnalyticalTestsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1QaAnalyticalTestsByIdApiResponse =
  /** status 204 No Content */ AnalyticalTestRequestDto;
export type PutApiV1QaAnalyticalTestsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createAnalyticalTestRequest: CreateAnalyticalTestRequest;
};
export type DeleteApiV1QaAnalyticalTestsByIdApiResponse = unknown;
export type DeleteApiV1QaAnalyticalTestsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ApprovalApiResponse = /** status 201 Created */ string;
export type PostApiV1ApprovalApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createApprovalRequest: CreateApprovalRequest;
};
export type GetApiV1ApprovalApiResponse =
  /** status 200 OK */ ApprovalDtoIEnumerablePaginateable;
export type GetApiV1ApprovalApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ApprovalByApprovalIdApiResponse =
  /** status 200 OK */ ApprovalDto;
export type GetApiV1ApprovalByApprovalIdApiArg = {
  approvalId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ApprovalByApprovalIdApiResponse = unknown;
export type PutApiV1ApprovalByApprovalIdApiArg = {
  approvalId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createApprovalRequest: CreateApprovalRequest;
};
export type DeleteApiV1ApprovalByApprovalIdApiResponse = unknown;
export type DeleteApiV1ApprovalByApprovalIdApiArg = {
  approvalId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ApprovalByModelTypeAndModelIdApiResponse =
  /** status 200 OK */ ApprovalEntityRead;
export type GetApiV1ApprovalByModelTypeAndModelIdApiArg = {
  modelType: string;
  modelId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ApprovalApproveByModelTypeAndModelIdApiResponse = unknown;
export type PostApiV1ApprovalApproveByModelTypeAndModelIdApiArg = {
  modelType: string;
  modelId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  approvalRequestBody: ApprovalRequestBody;
};
export type PostApiV1ApprovalRejectByModelTypeAndModelIdApiResponse = unknown;
export type PostApiV1ApprovalRejectByModelTypeAndModelIdApiArg = {
  modelType: string;
  modelId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  approvalRequestBody: ApprovalRequestBody;
};
export type GetApiV1ApprovalMyPendingApiResponse =
  /** status 200 OK */ ApprovalEntityRead[];
export type GetApiV1ApprovalMyPendingApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1AttendanceRecordsUploadApiResponse = unknown;
export type PostApiV1AttendanceRecordsUploadApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  body: {
    attendance: Blob;
  };
};
export type GetApiV1AttendanceRecordsDailySummaryApiResponse =
  /** status 200 OK */ AttendanceRecordDepartmentDto[];
export type GetApiV1AttendanceRecordsDailySummaryApiArg = {
  departmentName?: string;
  date?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1AttendanceRecordsGeneralSummaryApiResponse =
  /** status 200 OK */ GeneralAttendanceReportDtoRead;
export type GetApiV1AttendanceRecordsGeneralSummaryApiArg = {
  date?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1AuthLoginApiResponse = /** status 200 OK */ LoginResponse;
export type PostApiV1AuthLoginApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  loginRequest: LoginRequest;
};
export type PostApiV1AuthLoginWithRefreshTokenApiResponse =
  /** status 200 OK */ LoginResponse;
export type PostApiV1AuthLoginWithRefreshTokenApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  loginWithRefreshToken: LoginWithRefreshToken;
};
export type PostApiV1AuthSetPasswordApiResponse =
  /** status 200 OK */ PasswordChangeResponse;
export type PostApiV1AuthSetPasswordApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  setPasswordRequest: SetPasswordRequest;
};
export type PostApiV1AuthChangePasswordApiResponse =
  /** status 200 OK */ PasswordChangeResponse;
export type PostApiV1AuthChangePasswordApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  changePasswordRequest: ChangePasswordRequest;
};
export type PostApiV1AuthForgotPasswordApiResponse = unknown;
export type PostApiV1AuthForgotPasswordApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  forgotPasswordRequest: ForgotPasswordRequest;
};
export type PostApiV1BomApiResponse = /** status 201 Created */ string;
export type PostApiV1BomApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1BomByBillOfMaterialIdApiResponse = unknown;
export type GetApiV1BomByBillOfMaterialIdApiArg = {
  /** The ID of the Bill of Material. */
  billOfMaterialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1BomByBillOfMaterialIdApiResponse = unknown;
export type PutApiV1BomByBillOfMaterialIdApiArg = {
  /** The ID of the Bill of Material to be updated. */
  billOfMaterialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The CreateProductBillOfMaterialRequest object containing updated data. */
  createProductBillOfMaterialRequest: CreateProductBillOfMaterialRequest;
};
export type DeleteApiV1BomByBillOfMaterialIdApiResponse = unknown;
export type DeleteApiV1BomByBillOfMaterialIdApiArg = {
  /** The ID of the Bill of Material to be deleted. */
  billOfMaterialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1CollectionApiResponse = /** status 200 OK */ {
  [key: string]: CollectionItemDto[];
};
export type PostApiV1CollectionApiArg = {
  /** The kind of material */
  materialKind?: MaterialKind;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1CollectionByItemTypeApiResponse =
  /** status 201 Created */ string;
export type PostApiV1CollectionByItemTypeApiArg = {
  /** The type of item to create. */
  itemType: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The CreateItemRequest object containing item details. */
  createItemRequest: CreateItemRequest;
};
export type GetApiV1CollectionItemTypesApiResponse =
  /** status 200 OK */ string[];
export type GetApiV1CollectionItemTypesApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1CollectionByItemTypeAndItemIdApiResponse =
  /** status 200 OK */ string;
export type PutApiV1CollectionByItemTypeAndItemIdApiArg = {
  /** The ID of the item to update. */
  itemId: string;
  /** The type of item to update. */
  itemType: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1CollectionUomApiResponse =
  /** status 200 OK */ UnitOfMeasureDto[];
export type GetApiV1CollectionUomApiArg = {
  isRawMaterial?: boolean;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1CollectionPackageStylesApiResponse =
  /** status 200 OK */ PackageStyleDto[];
export type GetApiV1CollectionPackageStylesApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1WorkingDaysApiResponse = unknown;
export type PostApiV1WorkingDaysApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  body: CompanyWorkingDaysRequest[];
};
export type GetApiV1WorkingDaysApiResponse =
  /** status 200 OK */ CompanyWorkingDaysDtoIEnumerablePaginateable;
export type GetApiV1WorkingDaysApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ConfigurationApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ConfigurationApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ConfigurationByConfigurationIdApiResponse =
  /** status 200 OK */ ConfigurationDto;
export type GetApiV1ConfigurationByConfigurationIdApiArg = {
  /** The ID of the configuration to retrieve. */
  configurationId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ConfigurationByConfigurationIdApiResponse = unknown;
export type PutApiV1ConfigurationByConfigurationIdApiArg = {
  /** The ID of the configuration to update. */
  configurationId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The update request containing the new configuration data. */
  createConfigurationRequest: CreateConfigurationRequest;
};
export type DeleteApiV1ConfigurationByConfigurationIdApiResponse = unknown;
export type DeleteApiV1ConfigurationByConfigurationIdApiArg = {
  /** The ID of the configuration to delete. */
  configurationId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ConfigurationByModelTypeByModelTypeApiResponse =
  /** status 200 OK */ ConfigurationDto;
export type GetApiV1ConfigurationByModelTypeByModelTypeApiArg = {
  /** The modeltype of the configuration to retrieve. */
  modelType: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ConfigurationNamingTypesApiResponse =
  /** status 200 Returns the list of namning types */ TypeResponse[];
export type GetApiV1ConfigurationNamingTypesApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ConfigurationByModelTypeAndPrefixApiResponse =
  /** status 200 OK */ number;
export type GetApiV1ConfigurationByModelTypeAndPrefixApiArg = {
  /** The model type of which the count is need */
  modelType: string;
  /** The prefix of the particular model */
  prefix: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1CountriesApiResponse = /** status 200 OK */ CountryDto[];
export type GetApiV1CountriesApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1DepartmentApiResponse = /** status 200 OK */ string;
export type PostApiV1DepartmentApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1DepartmentByDepartmentIdApiResponse =
  /** status 200 OK */ DepartmentDtoRead;
export type GetApiV1DepartmentByDepartmentIdApiArg = {
  /** The ID of the department. */
  departmentId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1DepartmentByDepartmentIdApiResponse = unknown;
export type PutApiV1DepartmentByDepartmentIdApiArg = {
  /** The ID of the department to update. */
  departmentId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The CreateDepartmentRequest object. */
  createDepartmentRequest: CreateDepartmentRequest;
};
export type DeleteApiV1DepartmentByDepartmentIdApiResponse = unknown;
export type DeleteApiV1DepartmentByDepartmentIdApiArg = {
  /** The ID of the department to delete. */
  departmentId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1DesignationApiResponse = /** status 200 OK */ string;
export type PostApiV1DesignationApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createDesignationRequest: CreateDesignationRequest;
};
export type GetApiV1DesignationApiResponse =
  /** status 200 OK */ DesignationDtoIEnumerablePaginateableRead;
export type GetApiV1DesignationApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1DesignationByIdApiResponse =
  /** status 200 OK */ DesignationDtoRead;
export type GetApiV1DesignationByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1DesignationByIdApiResponse =
  /** status 204 No Content */ DesignationDtoRead;
export type PutApiV1DesignationByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createDesignationRequest: CreateDesignationRequest;
};
export type DeleteApiV1DesignationByIdApiResponse = unknown;
export type DeleteApiV1DesignationByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1DesignationDepartmentByIdApiResponse =
  /** status 200 OK */ DesignationDtoRead[];
export type GetApiV1DesignationDepartmentByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1EmployeeRegisterApiResponse = unknown;
export type PostApiV1EmployeeRegisterApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  onboardEmployeeDto: OnboardEmployeeDto;
};
export type PostApiV1EmployeeApiResponse = /** status 200 OK */ string;
export type PostApiV1EmployeeApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1EmployeeUserApiResponse = /** status 200 OK */ string;
export type PostApiV1EmployeeUserApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  employeeUserDto: EmployeeUserDto;
};
export type GetApiV1EmployeeDepartmentsByIdApiResponse =
  /** status 200 OK */ EmployeeDtoRead[];
export type GetApiV1EmployeeDepartmentsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1EmployeeByShiftScheduleIdAvailableApiResponse =
  /** status 200 OK */ MinimalEmployeeInfoDto[];
export type GetApiV1EmployeeByShiftScheduleIdAvailableApiArg = {
  shiftScheduleId: string;
  date?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1EmployeeByIdApiResponse =
  /** status 200 OK */ EmployeeDtoRead;
export type GetApiV1EmployeeByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1EmployeeByIdApiResponse =
  /** status 204 No Content */ EmployeeDtoRead;
export type PutApiV1EmployeeByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createEmployeeRequest: CreateEmployeeRequest;
};
export type DeleteApiV1EmployeeByIdApiResponse = unknown;
export type DeleteApiV1EmployeeByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1EmployeeByIdAssignApiResponse =
  /** status 204 No Content */ EmployeeDtoRead;
export type PutApiV1EmployeeByIdAssignApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1FileByModelTypeAndModelIdApiResponse = unknown;
export type PostApiV1FileByModelTypeAndModelIdApiArg = {
  /** Type of the model to associate the file with. */
  modelType: string;
  /** ID of the model to associate the file with. */
  modelId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  body: {
    files?: Blob[];
  };
};
export type DeleteApiV1FileByModelIdApiResponse = unknown;
export type DeleteApiV1FileByModelIdApiArg = {
  /** The ID of the model to delete attachments for. */
  modelId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type DeleteApiV1FileByModelIdAndReferenceApiResponse = unknown;
export type DeleteApiV1FileByModelIdAndReferenceApiArg = {
  /** The ID of the attachment. */
  modelId: string;
  /** The reference of the attachment to delete. */
  reference: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1FileByModelTypeAndReferenceApiResponse =
  /** status 200 OK */ Blob;
export type GetApiV1FileByModelTypeAndReferenceApiArg = {
  /** The type of the model (e.g., "Product", "User", etc.) where the file is associated. */
  modelType: string;
  /** A reference name for the specific file (e.g., file name, document ID, etc.). */
  reference: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1FormApiResponse = /** status 200 OK */ string;
export type PostApiV1FormApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1FormByFormIdApiResponse = /** status 200 OK */ FormDto;
export type GetApiV1FormByFormIdApiArg = {
  /** The ID of the form. */
  formId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1FormByFormIdApiResponse = unknown;
export type PutApiV1FormByFormIdApiArg = {
  /** The ID of the form to be updated. */
  formId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The CreateFormRequest object containing updated form data. */
  createFormRequest: CreateFormRequest;
};
export type DeleteApiV1FormByFormIdApiResponse = unknown;
export type DeleteApiV1FormByFormIdApiArg = {
  /** The ID of the form to be deleted. */
  formId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1FormResponsesApiResponse = unknown;
export type PostApiV1FormResponsesApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The CreateResponseRequest object containing response data. */
  createResponseRequest: CreateResponseRequest;
};
export type GetApiV1FormResponsesByFormResponseIdApiResponse =
  /** status 200 OK */ FormResponseDto;
export type GetApiV1FormResponsesByFormResponseIdApiArg = {
  /** The ID of the form response. */
  formResponseId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1FormQuestionApiResponse = /** status 200 OK */ string;
export type PostApiV1FormQuestionApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1FormQuestionByQuestionIdApiResponse =
  /** status 200 OK */ QuestionDto;
export type GetApiV1FormQuestionByQuestionIdApiArg = {
  /** The ID of the question. */
  questionId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1FormQuestionByQuestionIdApiResponse = unknown;
export type PutApiV1FormQuestionByQuestionIdApiArg = {
  /** The ID of the question to be updated. */
  questionId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The CreateQuestionRequest object containing updated question data. */
  createQuestionRequest: CreateQuestionRequest;
};
export type DeleteApiV1FormQuestionByQuestionIdApiResponse = unknown;
export type DeleteApiV1FormQuestionByQuestionIdApiArg = {
  /** The ID of the question to be deleted. */
  questionId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1HolidaysApiResponse = /** status 200 OK */ string;
export type PostApiV1HolidaysApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createHolidayRequest: CreateHolidayRequest;
};
export type GetApiV1HolidaysApiResponse =
  /** status 200 OK */ HolidayDtoIEnumerablePaginateable;
export type GetApiV1HolidaysApiArg = {
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1HolidaysByIdApiResponse = /** status 200 OK */ HolidayDto;
export type GetApiV1HolidaysByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1HolidaysByIdApiResponse =
  /** status 204 No Content */ HolidayDto;
export type PutApiV1HolidaysByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createHolidayRequest: CreateHolidayRequest;
};
export type DeleteApiV1HolidaysByIdApiResponse = unknown;
export type DeleteApiV1HolidaysByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1LeaveEntitlementApiResponse = /** status 200 OK */ string;
export type PostApiV1LeaveEntitlementApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  leaveEntitlementDto: LeaveEntitlementDto;
};
export type GetApiV1LeaveEntitlementApiResponse =
  /** status 200 OK */ LeaveEntitlementDtoIEnumerablePaginateable;
export type GetApiV1LeaveEntitlementApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1LeaveEntitlementByIdApiResponse =
  /** status 200 OK */ LeaveEntitlementDto;
export type GetApiV1LeaveEntitlementByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1LeaveEntitlementByIdApiResponse =
  /** status 204 No Content */ LeaveEntitlementDto;
export type PutApiV1LeaveEntitlementByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  leaveEntitlementDto: LeaveEntitlementDto;
};
export type DeleteApiV1LeaveEntitlementByIdApiResponse = unknown;
export type DeleteApiV1LeaveEntitlementByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1LeaveRequestApiResponse = /** status 200 OK */ string;
export type PostApiV1LeaveRequestApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createLeaveRequest: CreateLeaveRequest;
};
export type GetApiV1LeaveRequestApiResponse =
  /** status 200 OK */ LeaveRequestDtoIEnumerablePaginateableRead;
export type GetApiV1LeaveRequestApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1LeaveRequestByIdApiResponse =
  /** status 200 OK */ LeaveRequestDtoRead;
export type GetApiV1LeaveRequestByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1LeaveRequestByIdApiResponse =
  /** status 204 No Content */ LeaveRequestDtoRead;
export type PutApiV1LeaveRequestByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createLeaveRequest: CreateLeaveRequest;
};
export type DeleteApiV1LeaveRequestByIdApiResponse = unknown;
export type DeleteApiV1LeaveRequestByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1LeaveRequestRecallApiResponse =
  /** status 204 No Content */ LeaveRequestDtoRead;
export type PutApiV1LeaveRequestRecallApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createLeaveRecallRequest: CreateLeaveRecallRequest;
};
export type PostApiV1LeaveTypeApiResponse = /** status 200 OK */ string;
export type PostApiV1LeaveTypeApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createLeaveTypeRequest: CreateLeaveTypeRequest;
};
export type GetApiV1LeaveTypeApiResponse =
  /** status 200 OK */ LeaveTypeDtoIEnumerablePaginateableRead;
export type GetApiV1LeaveTypeApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1LeaveTypeByIdApiResponse =
  /** status 200 OK */ LeaveTypeDtoRead;
export type GetApiV1LeaveTypeByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1LeaveTypeByIdApiResponse =
  /** status 204 No Content */ LeaveTypeDtoRead;
export type PutApiV1LeaveTypeByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createLeaveTypeRequest: CreateLeaveTypeRequest;
};
export type DeleteApiV1LeaveTypeByIdApiResponse = unknown;
export type DeleteApiV1LeaveTypeByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1MaterialApiResponse = /** status 200 OK */ string;
export type PostApiV1MaterialApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialByMaterialIdApiResponse =
  /** status 200 OK */ MaterialDto;
export type GetApiV1MaterialByMaterialIdApiArg = {
  /** The ID of the material. */
  materialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1MaterialByMaterialIdApiResponse = unknown;
export type PutApiV1MaterialByMaterialIdApiArg = {
  /** The ID of the material to be updated. */
  materialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The UpdateMaterialRequest object containing updated material data. */
  createMaterialRequest: CreateMaterialRequest;
};
export type DeleteApiV1MaterialByMaterialIdApiResponse = unknown;
export type DeleteApiV1MaterialByMaterialIdApiArg = {
  /** The ID of the material to be deleted. */
  materialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialCategoryApiResponse =
  /** status 200 OK */ MaterialCategoryDto[];
export type GetApiV1MaterialCategoryApiArg = {
  /** The kind of material being requested */
  materialKind?: MaterialKind;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialAllApiResponse = /** status 200 OK */ MaterialDto[];
export type GetApiV1MaterialAllApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1MaterialByMaterialIdReorderLevelApiResponse = unknown;
export type PutApiV1MaterialByMaterialIdReorderLevelApiArg = {
  /** The ID of the material to be updated. */
  materialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The new ReOrderLevel value. */
  updateReOrderLevelRequest: UpdateReOrderLevelRequest;
};
export type GetApiV1MaterialByMaterialIdStockLevelApiResponse =
  /** status 200 OK */ number;
export type GetApiV1MaterialByMaterialIdStockLevelApiArg = {
  /** The ID of the material. */
  materialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialByMaterialIdBatchesApiResponse =
  /** status 200 OK */ MaterialBatchDtoRead[];
export type GetApiV1MaterialByMaterialIdBatchesApiArg = {
  /** The ID of the material. */
  materialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialByMaterialIdInTransitApiResponse =
  /** status 200 OK */ number;
export type GetApiV1MaterialByMaterialIdInTransitApiArg = {
  /** The ID of the material. */
  materialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1MaterialBatchApiResponse = unknown;
export type PostApiV1MaterialBatchApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialBatchByBatchIdApiResponse =
  /** status 200 OK */ MaterialBatchDtoRead;
export type GetApiV1MaterialBatchByBatchIdApiArg = {
  /** The ID of the material batch. */
  batchId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1MaterialBatchMoveApiResponse = unknown;
export type PostApiV1MaterialBatchMoveApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The move material to location request object */
  moveMaterialBatchRequest: MoveMaterialBatchRequest;
};
export type PutApiV1MaterialBatchByBatchIdApproveApiResponse = unknown;
export type PutApiV1MaterialBatchByBatchIdApproveApiArg = {
  batchId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialByMaterialIdStockAndWarehouseIdApiResponse =
  /** status 200 OK */ number;
export type GetApiV1MaterialByMaterialIdStockAndWarehouseIdApiArg = {
  /** The ID of the material. */
  materialId: string;
  /** The ID of the warehouse. */
  warehouseId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1MaterialBatchConsumeApiResponse = unknown;
export type PostApiV1MaterialBatchConsumeApiArg = {
  batchId?: string;
  locationId?: string;
  quantity?: number;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialByMaterialIdStockAcrossWarehousesApiResponse =
  /** status 200 OK */ WarehouseStockDto[];
export type GetApiV1MaterialByMaterialIdStockAcrossWarehousesApiArg = {
  /** The id of the material */
  materialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialByMaterialIdDepartmentStockAndQuantityApiResponse =
  /** status 200 OK */ DepartmentDtoRead[];
export type GetApiV1MaterialByMaterialIdDepartmentStockAndQuantityApiArg = {
  /** The id of the material */
  materialId: string;
  /** The minimum quantity of the stock the department should have. */
  quantity: number;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1MaterialUploadApiResponse = unknown;
export type PostApiV1MaterialUploadApiArg = {
  /** The kind of materials being imported. */
  kind?: MaterialKind;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  body: {
    file?: Blob;
  };
};
export type PutApiV1MaterialBatchStatusApiResponse = unknown;
export type PutApiV1MaterialBatchStatusApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The UpdateBatchStatusRequest object. */
  updateBatchStatusRequest: UpdateBatchStatusRequest;
};
export type PostApiV1MaterialBatchSupplyApiResponse = unknown;
export type PostApiV1MaterialBatchSupplyApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The SupplyMaterialBatchRequest object. */
  supplyMaterialBatchRequest: SupplyMaterialBatchRequest;
};
export type PostApiV1MaterialBatchMoveV2ApiResponse = unknown;
export type PostApiV1MaterialBatchMoveV2ApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialByMaterialIdStockWarehousesApiResponse =
  /** status 200 OK */ MaterialStockByWarehouseDto[];
export type GetApiV1MaterialByMaterialIdStockWarehousesApiArg = {
  /** The ID of the material. */
  materialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialByMaterialIdStockDepartmentsApiResponse =
  /** status 200 OK */ MaterialStockByDepartmentDto[];
export type GetApiV1MaterialByMaterialIdStockDepartmentsApiArg = {
  /** The ID of the material. */
  materialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1MaterialDepartmentApiResponse = unknown;
export type PostApiV1MaterialDepartmentApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialByMaterialIdUomApiResponse =
  /** status 200 OK */ UnitOfMeasureDto[];
export type GetApiV1MaterialByMaterialIdUomApiArg = {
  /** The material Id for which you need the uom */
  materialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialHoldingApiResponse =
  /** status 200 OK */ MaterialDepartmentWithWarehouseStockDtoIEnumerablePaginateable;
export type GetApiV1MaterialHoldingApiArg = {
  /** Filter to include transferred holding materials */
  withProcessed?: boolean;
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
  /** Optional user ID filter. */
  userId?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1MaterialHoldingMoveByHoldingMaterialIdApiResponse =
  unknown;
export type PostApiV1MaterialHoldingMoveByHoldingMaterialIdApiArg = {
  /** The holding material for which the items are to be moved */
  holdingMaterialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The MoveShelfMaterialBatchRequest object. */
  moveShelfMaterialBatchRequest: MoveShelfMaterialBatchRequest;
};
export type PostApiV1MaterialArdApiResponse = /** status 200 OK */ string;
export type PostApiV1MaterialArdApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createMaterialAnalyticalRawDataRequest: CreateMaterialAnalyticalRawDataRequest;
};
export type GetApiV1MaterialArdApiResponse =
  /** status 200 OK */ MaterialAnalyticalRawDataDtoIEnumerablePaginateable;
export type GetApiV1MaterialArdApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  materialKind?: number;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialArdByIdApiResponse =
  /** status 200 OK */ MaterialAnalyticalRawDataDto;
export type GetApiV1MaterialArdByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1MaterialArdByIdApiResponse =
  /** status 204 No Content */ MaterialAnalyticalRawDataDto;
export type PutApiV1MaterialArdByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createMaterialAnalyticalRawDataRequest: CreateMaterialAnalyticalRawDataRequest;
};
export type DeleteApiV1MaterialArdByIdApiResponse = unknown;
export type DeleteApiV1MaterialArdByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1MaterialStpsApiResponse = /** status 200 OK */ string;
export type PostApiV1MaterialStpsApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createMaterialStandardTestProcedureRequest: CreateMaterialStandardTestProcedureRequest;
};
export type GetApiV1MaterialStpsApiResponse =
  /** status 200 OK */ MaterialStandardTestProcedureDtoIEnumerablePaginateable;
export type GetApiV1MaterialStpsApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  materialKind?: number;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1MaterialStpsByIdApiResponse =
  /** status 200 OK */ MaterialStandardTestProcedureDto;
export type GetApiV1MaterialStpsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1MaterialStpsByIdApiResponse =
  /** status 204 No Content */ MaterialStandardTestProcedureDto;
export type PutApiV1MaterialStpsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createMaterialStandardTestProcedureRequest: CreateMaterialStandardTestProcedureRequest;
};
export type DeleteApiV1MaterialStpsByIdApiResponse = unknown;
export type DeleteApiV1MaterialStpsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1OvertimeRequestsApiResponse = /** status 200 OK */ string;
export type PostApiV1OvertimeRequestsApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createOvertimeRequest: CreateOvertimeRequest;
};
export type GetApiV1OvertimeRequestsApiResponse =
  /** status 200 OK */ OvertimeRequestDtoIEnumerablePaginateableRead;
export type GetApiV1OvertimeRequestsApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1OvertimeRequestsByIdApiResponse =
  /** status 200 OK */ OvertimeRequestDtoRead;
export type GetApiV1OvertimeRequestsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1OvertimeRequestsByIdApiResponse =
  /** status 204 No Content */ OvertimeRequestDtoRead;
export type PutApiV1OvertimeRequestsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createOvertimeRequest: CreateOvertimeRequest;
};
export type DeleteApiV1OvertimeRequestsByIdApiResponse = unknown;
export type DeleteApiV1OvertimeRequestsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1PermissionModulesApiResponse =
  /** status 200 OK */ PermissionModuleDto[];
export type GetApiV1PermissionModulesApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1PermissionApiResponse =
  /** status 200 OK */ PermissionDto[];
export type GetApiV1PermissionApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1PermissionUserByUserIdApiResponse =
  /** status 200 OK */ PermissionModuleDto[];
export type GetApiV1PermissionUserByUserIdApiArg = {
  /** The user ID. */
  userId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1PermissionRoleByRoleIdApiResponse =
  /** status 200 OK */ PermissionModuleDto[];
export type GetApiV1PermissionRoleByRoleIdApiArg = {
  /** The role ID. */
  roleId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1PermissionRoleByRoleIdApiResponse = unknown;
export type PutApiV1PermissionRoleByRoleIdApiArg = {
  /** The role ID. */
  roleId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** List of permission identifiers. */
  body: PermissionModuleDto[];
};
export type GetApiV1PermissionMenuApiResponse = /** status 200 OK */ MenuItem[];
export type GetApiV1PermissionMenuApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProcurementManufacturerApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementManufacturerApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProcurementManufacturerByManufacturerIdApiResponse =
  /** status 200 OK */ ManufacturerDto;
export type GetApiV1ProcurementManufacturerByManufacturerIdApiArg = {
  /** The ID of the manufacturer. */
  manufacturerId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProcurementManufacturerByManufacturerIdApiResponse =
  unknown;
export type PutApiV1ProcurementManufacturerByManufacturerIdApiArg = {
  /** The ID of the manufacturer to update. */
  manufacturerId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The CreateManufacturerRequest object. */
  createManufacturerRequest: CreateManufacturerRequest;
};
export type DeleteApiV1ProcurementManufacturerByManufacturerIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementManufacturerByManufacturerIdApiArg = {
  /** The ID of the manufacturer to delete. */
  manufacturerId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProcurementManufacturerMaterialByMaterialIdApiResponse =
  /** status 200 OK */ ManufacturerDto[];
export type GetApiV1ProcurementManufacturerMaterialByMaterialIdApiArg = {
  /** The ID of the material. */
  materialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProcurementSupplierApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementSupplierApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProcurementSupplierBySupplierIdApiResponse =
  /** status 200 OK */ SupplierDto;
export type GetApiV1ProcurementSupplierBySupplierIdApiArg = {
  /** The ID of the supplier. */
  supplierId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProcurementSupplierBySupplierIdApiResponse = unknown;
export type PutApiV1ProcurementSupplierBySupplierIdApiArg = {
  /** The ID of the supplier to update. */
  supplierId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The CreateSupplierRequest object. */
  createSupplierRequest: CreateSupplierRequest;
};
export type DeleteApiV1ProcurementSupplierBySupplierIdApiResponse = unknown;
export type DeleteApiV1ProcurementSupplierBySupplierIdApiArg = {
  /** The ID of the supplier to delete. */
  supplierId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProcurementSupplierBySupplierIdStatusApiResponse = unknown;
export type PutApiV1ProcurementSupplierBySupplierIdStatusApiArg = {
  /** The ID of the supplier to update. */
  supplierId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The new status of the supplier. */
  updateSupplierStatusRequest: UpdateSupplierStatusRequest;
};
export type GetApiV1ProcurementSupplierMaterialByMaterialIdApiResponse =
  /** status 200 OK */ SupplierDto[];
export type GetApiV1ProcurementSupplierMaterialByMaterialIdApiArg = {
  /** The ID of the material. */
  materialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProcurementSupplierByMaterialIdAndTypeApiResponse =
  /** status 200 OK */ SupplierDto[];
export type GetApiV1ProcurementSupplierByMaterialIdAndTypeApiArg = {
  /** The ID of the material. */
  materialId: string;
  /** The type of the supplier. */
  type: SupplierType;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProcurementPurchaseOrderApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementPurchaseOrderApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiResponse =
  /** status 200 OK */ PurchaseOrderDtoRead;
export type GetApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg = {
  /** The ID of the purchase order. */
  purchaseOrderId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiResponse =
  unknown;
export type PostApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg = {
  /** The ID of the purchase order you want to send to a supplier as an email. */
  purchaseOrderId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The request metadata to send purchase orders to suppliers. */
  sendPurchaseOrderRequest: SendPurchaseOrderRequest;
};
export type PutApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiResponse =
  unknown;
export type PutApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg = {
  /** The ID of the purchase order to update. */
  purchaseOrderId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The UpdatePurchaseOrderRequest object. */
  updatePurchaseOrderRequest: UpdatePurchaseOrderRequest;
};
export type DeleteApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg = {
  /** The ID of the purchase order to delete. */
  purchaseOrderId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProcurementPurchaseOrderRequisitionByPurchaseOrderIdAndMaterialIdApiResponse =
  /** status 200 OK */ string;
export type GetApiV1ProcurementPurchaseOrderRequisitionByPurchaseOrderIdAndMaterialIdApiArg =
  {
    /** The ID of the purchase order. */
    purchaseOrderId: string;
    /** The material ID to know the requisition */
    materialId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PostApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderIdApiResponse =
  unknown;
export type PostApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderIdApiArg =
  {
    /** The ID of the purchase order you want to send to a supplier as an email. */
    purchaseOrderId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseApiResponse =
  unknown;
export type PutApiV1ProcurementPurchaseOrderByPurchaseOrderIdReviseApiArg = {
  /** The ID of the purchase order to revise. */
  purchaseOrderId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The list of revisions to be made for the purchase order */
  body: CreatePurchaseOrderRevision[];
};
export type PostApiV1ProcurementPurchaseOrderInvoiceApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementPurchaseOrderInvoiceApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiResponse =
  /** status 200 OK */ PurchaseOrderInvoiceDto;
export type GetApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiArg = {
  /** The ID of the invoice. */
  invoiceId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiResponse =
  unknown;
export type PutApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiArg = {
  /** The ID of the invoice to update. */
  invoiceId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The UpdatePurchaseOrderInvoiceRequest object. */
  createPurchaseOrderInvoiceRequest: CreatePurchaseOrderInvoiceRequest;
};
export type DeleteApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementPurchaseOrderInvoiceByInvoiceIdApiArg = {
  /** The ID of the invoice to delete. */
  invoiceId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProcurementBillingSheetApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementBillingSheetApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProcurementBillingSheetByBillingSheetIdApiResponse =
  /** status 200 OK */ BillingSheetDto;
export type GetApiV1ProcurementBillingSheetByBillingSheetIdApiArg = {
  /** The ID of the billing sheet. */
  billingSheetId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProcurementBillingSheetByBillingSheetIdApiResponse =
  unknown;
export type PutApiV1ProcurementBillingSheetByBillingSheetIdApiArg = {
  /** The ID of the billing sheet to update. */
  billingSheetId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The UpdateBillingSheetRequest object. */
  createBillingSheetRequest: CreateBillingSheetRequest;
};
export type DeleteApiV1ProcurementBillingSheetByBillingSheetIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementBillingSheetByBillingSheetIdApiArg = {
  /** The ID of the billing sheet to delete. */
  billingSheetId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProcurementShipmentDocumentApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementShipmentDocumentApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiResponse =
  /** status 200 OK */ ShipmentDocumentDto;
export type GetApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiArg = {
  /** The ID of the shipment document. */
  shipmentDocumentId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiResponse =
  unknown;
export type PutApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiArg = {
  /** The ID of the shipment document to update. */
  shipmentDocumentId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The CreateShipmentDocumentRequest object. */
  createShipmentDocumentRequest: CreateShipmentDocumentRequest;
};
export type DeleteApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementShipmentDocumentByShipmentDocumentIdApiArg = {
  /** The ID of the shipment document to delete. */
  shipmentDocumentId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProcurementWaybillApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementWaybillApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProcurementWaybillByWaybillIdApiResponse =
  /** status 200 OK */ ShipmentDocumentDto;
export type GetApiV1ProcurementWaybillByWaybillIdApiArg = {
  /** The ID of the waybill. */
  waybillId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProcurementWaybillByWaybillIdApiResponse = unknown;
export type PutApiV1ProcurementWaybillByWaybillIdApiArg = {
  /** The ID of the waybill to update. */
  waybillId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The CreateShipmentDocumentRequest object. */
  createShipmentDocumentRequest: CreateShipmentDocumentRequest;
};
export type DeleteApiV1ProcurementWaybillByWaybillIdApiResponse = unknown;
export type DeleteApiV1ProcurementWaybillByWaybillIdApiArg = {
  /** The ID of the waybill to delete. */
  waybillId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProcurementShipmentDocumentByShipmentDocumentIdArrivedApiResponse =
  unknown;
export type PutApiV1ProcurementShipmentDocumentByShipmentDocumentIdArrivedApiArg =
  {
    /** The ID of the shipment document. */
    shipmentDocumentId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PutApiV1ProcurementShipmentsByShipmentIdStatusApiResponse = unknown;
export type PutApiV1ProcurementShipmentsByShipmentIdStatusApiArg = {
  /** The ID of the shipment document. */
  shipmentId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  updateShipmentStatusRequest: UpdateShipmentStatusRequest;
};
export type GetApiV1ProcurementShipmentDocumentArrivedApiResponse =
  /** status 200 OK */ ShipmentDocumentDtoIEnumerablePaginateable;
export type GetApiV1ProcurementShipmentDocumentArrivedApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProcurementShipmentInvoiceApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementShipmentInvoiceApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProcurementShipmentInvoiceByIdApiResponse =
  /** status 200 OK */ ShipmentInvoiceDto;
export type GetApiV1ProcurementShipmentInvoiceByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProcurementShipmentInvoiceUnattachedApiResponse =
  /** status 200 OK */ ShipmentInvoiceDto[];
export type GetApiV1ProcurementShipmentInvoiceUnattachedApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProcurementShipmentInvoiceShipmentDocumentByShipmentDocumentIdApiResponse =
  /** status 200 OK */ ShipmentInvoiceDto;
export type GetApiV1ProcurementShipmentInvoiceShipmentDocumentByShipmentDocumentIdApiArg =
  {
    shipmentDocumentId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PutApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdApiResponse =
  unknown;
export type PutApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdApiArg = {
  shipmentInvoiceId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createShipmentInvoice: CreateShipmentInvoice;
};
export type DeleteApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementShipmentInvoiceByShipmentInvoiceIdApiArg = {
  shipmentInvoiceId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProcurementShipmentDiscrepancyApiResponse =
  /** status 200 OK */ string;
export type PostApiV1ProcurementShipmentDiscrepancyApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createShipmentDiscrepancy: CreateShipmentDiscrepancy;
};
export type GetApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiResponse =
  /** status 200 OK */ ShipmentDiscrepancyDto;
export type GetApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiArg =
  {
    shipmentDiscrepancyId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PutApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiResponse =
  unknown;
export type PutApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiArg =
  {
    shipmentDiscrepancyId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
    createShipmentDiscrepancy: CreateShipmentDiscrepancy;
  };
export type DeleteApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementShipmentDiscrepancyByShipmentDiscrepancyIdApiArg =
  {
    shipmentDiscrepancyId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type GetApiV1ProcurementPurchaseOrderNotLinkedApiResponse =
  /** status 200 OK */ SupplierDto[];
export type GetApiV1ProcurementPurchaseOrderNotLinkedApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinkedApiResponse =
  /** status 200 OK */ PurchaseOrderDtoRead[];
export type GetApiV1ProcurementPurchaseOrderSupplierBySupplierIdNotLinkedApiArg =
  {
    /** The ID of the supplier. */
    supplierId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PostApiV1ProcurementMaterialsByPurchaseOrdersApiResponse =
  /** status 200 OK */ MaterialDto[];
export type PostApiV1ProcurementMaterialsByPurchaseOrdersApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** A list of purchase order IDs. */
  body: string[];
};
export type GetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionApiResponse =
  /** status 200 OK */ MaterialDistributionDtoRead;
export type GetApiV1ProcurementShipmentDocumentByShipmentDocumentIdMaterialDistributionApiArg =
  {
    /** The ID of the shipment document. */
    shipmentDocumentId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PostApiV1ProcurementByShipmentDocumentIdConfirmDistributionAndMaterialIdApiResponse =
  unknown;
export type PostApiV1ProcurementByShipmentDocumentIdConfirmDistributionAndMaterialIdApiArg =
  {
    /** The shipment document id for which you want to approve distribution */
    shipmentDocumentId: string;
    materialId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PostApiV1ProcurementByShipmentDocumentIdConfirmDistributionApiResponse =
  unknown;
export type PostApiV1ProcurementByShipmentDocumentIdConfirmDistributionApiArg =
  {
    /** The shipment document id for which you want to approve distribution */
    shipmentDocumentId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PostApiV1ProductApiResponse = /** status 201 Created */ string;
export type PostApiV1ProductApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createProductRequest: CreateProductRequest;
};
export type GetApiV1ProductApiResponse =
  /** status 200 OK */ ProductListDtoIEnumerablePaginateableRead;
export type GetApiV1ProductApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductByProductIdApiResponse =
  /** status 200 OK */ ProductDtoRead;
export type GetApiV1ProductByProductIdApiArg = {
  productId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProductByProductIdApiResponse = unknown;
export type PutApiV1ProductByProductIdApiArg = {
  productId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  updateProductRequest: UpdateProductRequest;
};
export type DeleteApiV1ProductByProductIdApiResponse = unknown;
export type DeleteApiV1ProductByProductIdApiArg = {
  productId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProductPackageDescriptionByProductIdApiResponse = unknown;
export type PutApiV1ProductPackageDescriptionByProductIdApiArg = {
  productId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  updateProductPackageDescriptionRequest: UpdateProductPackageDescriptionRequest;
};
export type GetApiV1ProductByProductIdBomApiResponse =
  /** status 200 OK */ ProductBillOfMaterialDto;
export type GetApiV1ProductByProductIdBomApiArg = {
  productId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProductByProductIdRoutesApiResponse = unknown;
export type PostApiV1ProductByProductIdRoutesApiArg = {
  productId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  body: CreateRouteRequest[];
};
export type GetApiV1ProductByProductIdRoutesApiResponse =
  /** status 200 OK */ RouteDtoRead[];
export type GetApiV1ProductByProductIdRoutesApiArg = {
  productId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductRoutesByRouteIdApiResponse =
  /** status 200 OK */ RouteDtoRead;
export type GetApiV1ProductRoutesByRouteIdApiArg = {
  routeId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type DeleteApiV1ProductRoutesByRouteIdApiResponse = unknown;
export type DeleteApiV1ProductRoutesByRouteIdApiArg = {
  routeId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProductByProductIdPackagesApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductByProductIdPackagesApiArg = {
  productId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  body: CreateProductPackageRequest[];
};
export type GetApiV1ProductByProductIdPackagesApiResponse =
  /** status 200 OK */ ProductPackageDto[];
export type GetApiV1ProductByProductIdPackagesApiArg = {
  productId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductPackagesByProductPackageIdApiResponse =
  /** status 200 OK */ ProductPackageDto;
export type GetApiV1ProductPackagesByProductPackageIdApiArg = {
  productPackageId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProductPackagesByProductPackageIdApiResponse = unknown;
export type PutApiV1ProductPackagesByProductPackageIdApiArg = {
  productPackageId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createProductPackageRequest: CreateProductPackageRequest;
};
export type DeleteApiV1ProductPackagesByProductPackageIdApiResponse = unknown;
export type DeleteApiV1ProductPackagesByProductPackageIdApiArg = {
  productPackageId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProductByProductIdFinishedApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductByProductIdFinishedApiArg = {
  productId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  body: CreateFinishedProductRequest[];
};
export type PutApiV1ProductByProductIdBomArchiveApiResponse = unknown;
export type PutApiV1ProductByProductIdBomArchiveApiArg = {
  /** The ID of the Product for which the bom should be archived. */
  productId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProductEquipmentApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductEquipmentApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createEquipmentRequest: CreateEquipmentRequest;
};
export type GetApiV1ProductEquipmentApiResponse =
  /** status 200 OK */ EquipmentDtoIEnumerablePaginateable;
export type GetApiV1ProductEquipmentApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductEquipmentByEquipmentIdApiResponse =
  /** status 200 OK */ EquipmentDto;
export type GetApiV1ProductEquipmentByEquipmentIdApiArg = {
  equipmentId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProductEquipmentByEquipmentIdApiResponse = unknown;
export type PutApiV1ProductEquipmentByEquipmentIdApiArg = {
  equipmentId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createEquipmentRequest: CreateEquipmentRequest;
};
export type DeleteApiV1ProductEquipmentByEquipmentIdApiResponse = unknown;
export type DeleteApiV1ProductEquipmentByEquipmentIdApiArg = {
  equipmentId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductEquipmentAllApiResponse =
  /** status 200 OK */ EquipmentDto[];
export type GetApiV1ProductEquipmentAllApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProductArdApiResponse = /** status 200 OK */ string;
export type PostApiV1ProductArdApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createProductAnalyticalRawDataRequest: CreateProductAnalyticalRawDataRequest;
};
export type GetApiV1ProductArdApiResponse =
  /** status 200 OK */ ProductAnalyticalRawDataDtoIEnumerablePaginateable;
export type GetApiV1ProductArdApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductArdByIdApiResponse =
  /** status 200 OK */ ProductAnalyticalRawDataDto;
export type GetApiV1ProductArdByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProductArdByIdApiResponse =
  /** status 204 No Content */ ProductAnalyticalRawDataDto;
export type PutApiV1ProductArdByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createProductAnalyticalRawDataRequest: CreateProductAnalyticalRawDataRequest;
};
export type DeleteApiV1ProductArdByIdApiResponse = unknown;
export type DeleteApiV1ProductArdByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProductionScheduleApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionScheduleApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleByScheduleIdApiResponse =
  /** status 200 OK */ ProductionScheduleDtoRead;
export type GetApiV1ProductionScheduleByScheduleIdApiArg = {
  /** The ID of the Production Schedule. */
  scheduleId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProductionScheduleByScheduleIdApiResponse = unknown;
export type PutApiV1ProductionScheduleByScheduleIdApiArg = {
  /** The ID of the Production Schedule to be updated. */
  scheduleId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The UpdateProductionScheduleRequest object containing updated data. */
  updateProductionScheduleRequest: UpdateProductionScheduleRequest;
};
export type DeleteApiV1ProductionScheduleByScheduleIdApiResponse = unknown;
export type DeleteApiV1ProductionScheduleByScheduleIdApiArg = {
  /** The ID of the Production Schedule to be deleted. */
  scheduleId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleByProductionScheduleIdProductAndProductIdApiResponse =
  /** status 200 OK */ ProductionScheduleProductDtoRead;
export type GetApiV1ProductionScheduleByProductionScheduleIdProductAndProductIdApiArg =
  {
    /** The ID of the Production Schedule. */
    productionScheduleId: string;
    /** The ID of the Product. */
    productId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type GetApiV1ProductionScheduleProductionStatusApiResponse =
  /** status 200 Returns the list of production status */ TypeResponse[];
export type GetApiV1ProductionScheduleProductionStatusApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleByScheduleIdDetailsApiResponse =
  /** status 200 OK */ ProductionScheduleProcurementDto[];
export type GetApiV1ProductionScheduleByScheduleIdDetailsApiArg = {
  /** The ID of the Production Schedule. */
  scheduleId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdApiResponse =
  /** status 200 OK */ ProductionScheduleProcurementDto[];
export type GetApiV1ProductionScheduleMaterialStockByProductionScheduleIdAndProductIdApiArg =
  {
    productionScheduleId: string;
    productId: string;
    status?: MaterialRequisitionStatus;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type GetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdApiResponse =
  /** status 200 OK */ ProductionScheduleProcurementPackageDto[];
export type GetApiV1ProductionSchedulePackageMaterialStockByProductionScheduleIdAndProductIdApiArg =
  {
    productionScheduleId: string;
    productId: string;
    status?: MaterialRequisitionStatus;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type GetApiV1ProductionScheduleByProductionScheduleIdMaterialsWithInsufficientStockAndProductIdApiResponse =
  /** status 200 OK */ ProductionScheduleProcurementDto[];
export type GetApiV1ProductionScheduleByProductionScheduleIdMaterialsWithInsufficientStockAndProductIdApiArg =
  {
    /** The ID of the Production Schedule. */
    productionScheduleId: string;
    /** The ID of the Product. */
    productId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type GetApiV1ProductionScheduleByProductionScheduleIdPackageMaterialsWithInsufficientStockAndProductIdApiResponse =
  /** status 200 OK */ ProductionScheduleProcurementPackageDto[];
export type GetApiV1ProductionScheduleByProductionScheduleIdPackageMaterialsWithInsufficientStockAndProductIdApiArg =
  {
    /** The ID of the Production Schedule. */
    productionScheduleId: string;
    /** The ID of the Product. */
    productId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PostApiV1ProductionScheduleActivityStartByProductionScheduleIdAndProductIdApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionScheduleActivityStartByProductionScheduleIdAndProductIdApiArg =
  {
    /** The Production Schedule ID. */
    productionScheduleId: string;
    /** The Product ID. */
    productId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleActivityByProductionActivityIdApiResponse =
  /** status 200 OK */ ProductionActivityDto;
export type GetApiV1ProductionScheduleActivityByProductionActivityIdApiArg = {
  /** The ID of the Production Activity. */
  productionActivityId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdApiResponse =
  /** status 200 OK */ ProductionActivityDto;
export type GetApiV1ProductionScheduleActivityByProductionScheduleIdAndProductIdApiArg =
  {
    /** The Production Schedule ID. */
    productionScheduleId: string;
    /** The Product ID. */
    productId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type GetApiV1ProductionScheduleActivityStatusGroupedApiResponse =
  /** status 200 OK */ {
    [key: string]: ProductionActivityDto[];
  };
export type GetApiV1ProductionScheduleActivityStatusGroupedApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleActivityOperationGroupedApiResponse =
  /** status 200 OK */ ProductionActivityGroupResultDtoRead[];
export type GetApiV1ProductionScheduleActivityOperationGroupedApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProductionScheduleActivityStepByProductionStepIdStatusApiResponse =
  unknown;
export type PutApiV1ProductionScheduleActivityStepByProductionStepIdStatusApiArg =
  {
    /** The ID of the Production Step. */
    productionStepId: string;
    /** The new status to set. */
    status?: ProductionStatus;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleActivityStepByProductionActivityStepIdApiResponse =
  /** status 200 OK */ ProductionActivityStepDto;
export type GetApiV1ProductionScheduleActivityStepByProductionActivityStepIdApiArg =
  {
    /** The ID of the Production Activity Step. */
    productionActivityStepId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type GetApiV1ProductionScheduleActivityStepStatusGroupedApiResponse =
  /** status 200 OK */ {
    [key: string]: ProductionActivityStepDto[];
  };
export type GetApiV1ProductionScheduleActivityStepStatusGroupedApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleActivityStepOperationGroupedApiResponse =
  /** status 200 OK */ {
    [key: string]: ProductionActivityStepDto[];
  };
export type GetApiV1ProductionScheduleActivityStepOperationGroupedApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProductionScheduleManufacturingApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionScheduleManufacturingApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createBatchManufacturingRecord: CreateBatchManufacturingRecord;
};
export type GetApiV1ProductionScheduleManufacturingApiResponse =
  /** status 200 OK */ BatchManufacturingRecordDtoIEnumerablePaginateableRead;
export type GetApiV1ProductionScheduleManufacturingApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdApiResponse =
  /** status 200 OK */ BatchManufacturingRecordDtoRead;
export type GetApiV1ProductionScheduleManufacturingByProductionIdAndProductionScheduleIdApiArg =
  {
    productionId: string;
    productionScheduleId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PostApiV1ProductionScheduleFinishedGoodsTransferNoteApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionScheduleFinishedGoodsTransferNoteApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createFinishedGoodsTransferNoteRequest: CreateFinishedGoodsTransferNoteRequest;
};
export type GetApiV1ProductionScheduleManufacturingByIdApiResponse =
  /** status 200 OK */ BatchManufacturingRecordDtoRead;
export type GetApiV1ProductionScheduleManufacturingByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProductionScheduleManufacturingByIdApiResponse = unknown;
export type PutApiV1ProductionScheduleManufacturingByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  updateBatchManufacturingRecord: UpdateBatchManufacturingRecord;
};
export type PutApiV1ProductionScheduleManufacturingIssueByIdApiResponse =
  unknown;
export type PutApiV1ProductionScheduleManufacturingIssueByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProductionSchedulePackagingApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionSchedulePackagingApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createBatchPackagingRecord: CreateBatchPackagingRecord;
};
export type GetApiV1ProductionSchedulePackagingApiResponse =
  /** status 200 OK */ BatchPackagingRecordDtoIEnumerablePaginateable;
export type GetApiV1ProductionSchedulePackagingApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionSchedulePackagingByIdApiResponse =
  /** status 200 OK */ BatchPackagingRecordDto;
export type GetApiV1ProductionSchedulePackagingByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProductionSchedulePackagingByIdApiResponse = unknown;
export type PutApiV1ProductionSchedulePackagingByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  updateBatchPackagingRecord: UpdateBatchPackagingRecord;
};
export type PutApiV1ProductionSchedulePackagingIssueByIdApiResponse = unknown;
export type PutApiV1ProductionSchedulePackagingIssueByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProductionScheduleStockTransferApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionScheduleStockTransferApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createStockTransferRequest: CreateStockTransferRequest;
};
export type GetApiV1ProductionScheduleStockTransferApiResponse =
  /** status 200 OK */ StockTransferDtoRead[];
export type GetApiV1ProductionScheduleStockTransferApiArg = {
  fromDepartmentId?: string;
  toDepartmentId?: string;
  materialId?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleStockTransferInBoundApiResponse =
  /** status 200 OK */ DepartmentStockTransferDtoIEnumerablePaginateableRead;
export type GetApiV1ProductionScheduleStockTransferInBoundApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  status?: StockTransferStatus;
  toDepartmentId?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleStockTransferOutBoundApiResponse =
  /** status 200 OK */ DepartmentStockTransferDtoIEnumerablePaginateableRead;
export type GetApiV1ProductionScheduleStockTransferOutBoundApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  status?: StockTransferStatus;
  fromDepartmentId?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleStockTransferByStockTransferIdApiResponse =
  /** status 200 OK */ DepartmentStockTransferDtoRead;
export type GetApiV1ProductionScheduleStockTransferByStockTransferIdApiArg = {
  stockTransferId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProductionScheduleStockTransferApproveByStockTransferIdApiResponse =
  unknown;
export type PutApiV1ProductionScheduleStockTransferApproveByStockTransferIdApiArg =
  {
    stockTransferId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PutApiV1ProductionScheduleStockTransferRejectByStockTransferIdApiResponse =
  unknown;
export type PutApiV1ProductionScheduleStockTransferRejectByStockTransferIdApiArg =
  {
    stockTransferId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type GetApiV1ProductionScheduleStockTransferBatchByStockTransferIdApiResponse =
  /** status 200 OK */ BatchToSupplyRead[];
export type GetApiV1ProductionScheduleStockTransferBatchByStockTransferIdApiArg =
  {
    stockTransferId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PutApiV1ProductionScheduleStockTransferIssueByStockTransferIdApiResponse =
  unknown;
export type PutApiV1ProductionScheduleStockTransferIssueByStockTransferIdApiArg =
  {
    stockTransferId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
    body: BatchTransferRequest[];
  };
export type PostApiV1ProductionScheduleFinalPackingApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionScheduleFinalPackingApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleFinalPackingByFinalPackingIdApiResponse =
  /** status 200 OK */ FinalPackingDto;
export type GetApiV1ProductionScheduleFinalPackingByFinalPackingIdApiArg = {
  /** The ID of the Final Packing. */
  finalPackingId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProductionScheduleFinalPackingByFinalPackingIdApiResponse =
  unknown;
export type PutApiV1ProductionScheduleFinalPackingByFinalPackingIdApiArg = {
  /** The ID of the Final Packing to be updated. */
  finalPackingId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The CreateFinalPacking object containing updated data. */
  createFinalPacking: CreateFinalPacking;
};
export type DeleteApiV1ProductionScheduleFinalPackingByFinalPackingIdApiResponse =
  unknown;
export type DeleteApiV1ProductionScheduleFinalPackingByFinalPackingIdApiArg = {
  /** The ID of the Final Packing to be deleted. */
  finalPackingId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductIdApiResponse =
  /** status 200 OK */ FinalPackingDto;
export type GetApiV1ProductionScheduleFinalPackingByProductionScheduleIdAndProductIdApiArg =
  {
    /** The Production Schedule ID. */
    productionScheduleId: string;
    /** The Product ID. */
    productId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type GetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdApiResponse =
  /** status 200 OK */ RequisitionDtoRead;
export type GetApiV1ProductionScheduleStockRequisitionPackageByProductionScheduleIdAndProductIdApiArg =
  {
    /** The Production Schedule ID. */
    productionScheduleId: string;
    /** The Product ID. */
    productId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PostApiV1ProductionScheduleReturnBeforeProductionApiResponse =
  unknown;
export type PostApiV1ProductionScheduleReturnBeforeProductionApiArg = {
  /** The ID of the Production Schedule. */
  productionScheduleId?: string;
  /** The ID of the Product. */
  productId?: string;
  /** The reason for cancelling the production */
  reason?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ProductionScheduleReturnAfterProductionApiResponse =
  unknown;
export type PostApiV1ProductionScheduleReturnAfterProductionApiArg = {
  /** The ID of the Production Schedule. */
  productionScheduleId?: string;
  /** The ID of the Product. */
  productId?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleMaterialReturnNoteByMaterialReturnNoteIdApiResponse =
  /** status 200 OK */ MaterialReturnNoteDto;
export type GetApiV1ProductionScheduleMaterialReturnNoteByMaterialReturnNoteIdApiArg =
  {
    /** The ID of the Material Return Note. */
    materialReturnNoteId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PutApiV1ProductionScheduleMaterialReturnNoteCompleteByMaterialReturnNoteIdApiResponse =
  unknown;
export type PutApiV1ProductionScheduleMaterialReturnNoteCompleteByMaterialReturnNoteIdApiArg =
  {
    /** The ID of the Material Return Note. */
    materialReturnNoteId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PostApiV1ProductionScheduleExtraPackingByProductionScheduleIdAndProductIdApiResponse =
  unknown;
export type PostApiV1ProductionScheduleExtraPackingByProductionScheduleIdAndProductIdApiArg =
  {
    /** The ID of the Production Schedule. */
    productionScheduleId: string;
    /** The ID of the Product. */
    productId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductionScheduleExtraPackingByProductionExtraPackingIdApiResponse =
  /** status 200 OK */ ProductionExtraPackingWithBatchesDto;
export type GetApiV1ProductionScheduleExtraPackingByProductionExtraPackingIdApiArg =
  {
    /** The ID of the Extra Packing. */
    productionExtraPackingId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type GetApiV1ProductionScheduleExtraPackingByProductByProductionScheduleIdAndProductIdApiResponse =
  /** status 200 OK */ ProductionExtraPackingWithBatchesDto[];
export type GetApiV1ProductionScheduleExtraPackingByProductByProductionScheduleIdAndProductIdApiArg =
  {
    /** The production schedule Id linked to the extra packing> */
    productionScheduleId: string;
    /** The product Id linked to the extra paccking */
    productId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type GetApiV1ProductionScheduleExtraPackingBatchesToSupplyByExtraPackingMaterialIdApiResponse =
  /** status 200 OK */ BatchToSupplyRead[];
export type GetApiV1ProductionScheduleExtraPackingBatchesToSupplyByExtraPackingMaterialIdApiArg =
  {
    /** The ID of the Extra Packing Material. */
    extraPackingMaterialId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PostApiV1ProductionScheduleExtraPackingApproveByProductionExtraPackingIdApiResponse =
  unknown;
export type PostApiV1ProductionScheduleExtraPackingApproveByProductionExtraPackingIdApiArg =
  {
    /** The ID of the Extra Packing. */
    productionExtraPackingId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
    /** The list of batches for approval. */
    body: BatchTransferRequest[];
  };
export type PostApiV1ProductStpsApiResponse = /** status 200 OK */ string;
export type PostApiV1ProductStpsApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createProductStandardTestProcedureRequest: CreateProductStandardTestProcedureRequest;
};
export type GetApiV1ProductStpsApiResponse =
  /** status 200 OK */ ProductStandardTestProcedureDtoIEnumerablePaginateable;
export type GetApiV1ProductStpsApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ProductStpsByIdApiResponse =
  /** status 200 OK */ ProductStandardTestProcedureDto;
export type GetApiV1ProductStpsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ProductStpsByIdApiResponse =
  /** status 204 No Content */ ProductStandardTestProcedureDto;
export type PutApiV1ProductStpsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createProductStandardTestProcedureRequest: CreateProductStandardTestProcedureRequest;
};
export type DeleteApiV1ProductStpsByIdApiResponse = unknown;
export type DeleteApiV1ProductStpsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1RequisitionApiResponse = unknown;
export type PostApiV1RequisitionApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1RequisitionByRequisitionIdApiResponse =
  /** status 200 OK */ RequisitionDtoRead;
export type GetApiV1RequisitionByRequisitionIdApiArg = {
  /** The ID of the Stock Requisition. */
  requisitionId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1RequisitionIssueStockRequisitionByStockRequisitionIdApiResponse =
  unknown;
export type PostApiV1RequisitionIssueStockRequisitionByStockRequisitionIdApiArg =
  {
    stockRequisitionId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PostApiV1RequisitionByRequisitionIdIssueApiResponse = unknown;
export type PostApiV1RequisitionByRequisitionIdIssueApiArg = {
  /** The ID of the Stock Requisition being issued. */
  requisitionId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The ApproveRequisitionRequest object. */
  approveRequisitionRequest: ApproveRequisitionRequest;
};
export type PostApiV1RequisitionSourceApiResponse = /** status 200 OK */ string;
export type PostApiV1RequisitionSourceApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1RequisitionSourceBySourceRequisitionIdApiResponse =
  /** status 200 OK */ SourceRequisitionDto;
export type GetApiV1RequisitionSourceBySourceRequisitionIdApiArg = {
  /** The ID of the Source Requisition. */
  sourceRequisitionId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1RequisitionSourceBySourceRequisitionIdApiResponse = unknown;
export type PutApiV1RequisitionSourceBySourceRequisitionIdApiArg = {
  /** The ID of the Source Requisition to update. */
  sourceRequisitionId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The CreateSourceRequisitionRequest object. */
  createSourceRequisitionRequest: CreateSourceRequisitionRequest;
};
export type DeleteApiV1RequisitionSourceBySourceRequisitionIdApiResponse =
  unknown;
export type DeleteApiV1RequisitionSourceBySourceRequisitionIdApiArg = {
  /** The ID of the Source Requisition to delete. */
  sourceRequisitionId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1RequisitionSourceSupplierBySupplierIdApiResponse =
  /** status 200 OK */ SupplierQuotationDto;
export type GetApiV1RequisitionSourceSupplierBySupplierIdApiArg = {
  /** The id of the supplier with associated requisition items. */
  supplierId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationApiResponse =
  unknown;
export type PostApiV1RequisitionSourceSupplierBySupplierIdSendQuotationApiArg =
  {
    /** The ID of the supplier. */
    supplierId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationApiResponse =
  /** status 200 OK */ SupplierQuotationDto;
export type GetApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationApiArg =
  {
    /** The ID of the supplier quotation. */
    supplierQuotationId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PostApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationReceiveApiResponse =
  unknown;
export type PostApiV1RequisitionSourceSupplierBySupplierQuotationIdQuotationReceiveApiArg =
  {
    /** The ID of the supplier quotation. */
    supplierQuotationId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
    /** The list of quotations received from the supplier. */
    body: SupplierQuotationResponseDto[];
  };
export type GetApiV1RequisitionSourceMaterialPriceComparisonApiResponse =
  /** status 200 OK */ SupplierPriceComparison[];
export type GetApiV1RequisitionSourceMaterialPriceComparisonApiArg = {
  /** The type of the supplier (example Local, Foreign). */
  supplierType?: SupplierType;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1RequisitionSourceQuotationProcessPurchaseOrderApiResponse =
  unknown;
export type PostApiV1RequisitionSourceQuotationProcessPurchaseOrderApiArg = {
  /** The type of the supplier (example Local, Foreign). */
  supplierType?: SupplierType;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The list of quotations to process. */
  body: ProcessQuotation[];
};
export type GetApiV1RoleApiResponse = /** status 200 OK */ RoleDto[];
export type GetApiV1RoleApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1RoleApiResponse = unknown;
export type PostApiV1RoleApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createRoleRequest: CreateRoleRequest;
};
export type GetApiV1RoleWithPermissionsApiResponse =
  /** status 200 OK */ RolePermissionDtoIEnumerablePaginateable;
export type GetApiV1RoleWithPermissionsApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1RoleByIdApiResponse =
  /** status 200 OK */ RolePermissionDto;
export type GetApiV1RoleByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1RoleByIdApiResponse = unknown;
export type PutApiV1RoleByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  updateRoleRequest: UpdateRoleRequest;
};
export type DeleteApiV1RoleByIdApiResponse = unknown;
export type DeleteApiV1RoleByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1RoleCheckByIdApiResponse = unknown;
export type GetApiV1RoleCheckByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ShiftSchedulesApiResponse = /** status 200 OK */ string;
export type PostApiV1ShiftSchedulesApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createShiftScheduleRequest: CreateShiftScheduleRequest;
};
export type GetApiV1ShiftSchedulesApiResponse =
  /** status 200 OK */ ShiftScheduleDtoIEnumerablePaginateableRead;
export type GetApiV1ShiftSchedulesApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1ShiftSchedulesAssignApiResponse = unknown;
export type PostApiV1ShiftSchedulesAssignApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  assignShiftRequest: AssignShiftRequest;
};
export type GetApiV1ShiftSchedulesByIdApiResponse =
  /** status 200 OK */ ShiftScheduleDtoRead;
export type GetApiV1ShiftSchedulesByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ShiftSchedulesByIdApiResponse =
  /** status 204 No Content */ ShiftScheduleDtoRead;
export type PutApiV1ShiftSchedulesByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createShiftScheduleRequest: CreateShiftScheduleRequest;
};
export type DeleteApiV1ShiftSchedulesByIdApiResponse = unknown;
export type DeleteApiV1ShiftSchedulesByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ShiftSchedulesByScheduleIdViewApiResponse =
  /** status 200 OK */ ShiftAssignmentDto[];
export type GetApiV1ShiftSchedulesByScheduleIdViewApiArg = {
  scheduleId: string;
  startDate?: string;
  endDate?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1ShiftSchedulesByScheduleIdDayApiResponse =
  /** status 200 OK */ ShiftAssignmentDto[];
export type GetApiV1ShiftSchedulesByScheduleIdDayApiArg = {
  scheduleId: string;
  date?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ShiftSchedulesByIdUpdateScheduleApiResponse = unknown;
export type PutApiV1ShiftSchedulesByIdUpdateScheduleApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  updateShiftAssignment: UpdateShiftAssignment;
};
export type PostApiV1ShiftTypeApiResponse = /** status 200 OK */ string;
export type PostApiV1ShiftTypeApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createShiftTypeRequest: CreateShiftTypeRequest;
};
export type GetApiV1ShiftTypeApiResponse =
  /** status 200 OK */ ShiftTypeDtoIEnumerablePaginateable;
export type GetApiV1ShiftTypeApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1ShiftTypeApiResponse =
  /** status 204 No Content */ ShiftTypeDto;
export type PutApiV1ShiftTypeApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createShiftTypeRequest: CreateShiftTypeRequest;
};
export type GetApiV1ShiftTypeByIdApiResponse =
  /** status 200 OK */ ShiftTypeDto;
export type GetApiV1ShiftTypeByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type DeleteApiV1ShiftTypeByIdApiResponse = unknown;
export type DeleteApiV1ShiftTypeByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1StaffRequisitionsApiResponse = /** status 200 OK */ string;
export type PostApiV1StaffRequisitionsApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createStaffRequisitionRequest: CreateStaffRequisitionRequest;
};
export type GetApiV1StaffRequisitionsApiResponse =
  /** status 200 OK */ StaffRequisitionDtoIEnumerablePaginateableRead;
export type GetApiV1StaffRequisitionsApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  startDate?: string;
  endDate?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1StaffRequisitionsByIdApiResponse =
  /** status 200 OK */ StaffRequisitionDtoRead;
export type GetApiV1StaffRequisitionsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1StaffRequisitionsByIdApiResponse =
  /** status 204 No Content */ StaffRequisitionDtoRead;
export type PutApiV1StaffRequisitionsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createStaffRequisitionRequest: CreateStaffRequisitionRequest;
};
export type DeleteApiV1StaffRequisitionsByIdApiResponse = unknown;
export type DeleteApiV1StaffRequisitionsByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1UserApiResponse = unknown;
export type PostApiV1UserApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createUserRequest: CreateUserRequest;
};
export type GetApiV1UserApiResponse =
  /** status 200 OK */ UserWithRoleDtoIEnumerablePaginateable;
export type GetApiV1UserApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1UserSignUpApiResponse = unknown;
export type PostApiV1UserSignUpApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createClientRequest: CreateClientRequest;
};
export type GetApiV1UserAuthenticatedApiResponse =
  /** status 200 OK */ UserWithRoleDto;
export type GetApiV1UserAuthenticatedApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1UserByIdApiResponse = unknown;
export type PutApiV1UserByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  updateUserRequest: UpdateUserRequest;
};
export type DeleteApiV1UserByIdApiResponse = unknown;
export type DeleteApiV1UserByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1UserRoleByIdApiResponse = unknown;
export type PutApiV1UserRoleByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  updateUserRoleRequest: UpdateUserRoleRequest;
};
export type PostApiV1UserAvatarByIdApiResponse = unknown;
export type PostApiV1UserAvatarByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  uploadFileRequest: UploadFileRequest;
};
export type PostApiV1UserSignatureByIdApiResponse = unknown;
export type PostApiV1UserSignatureByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  uploadFileRequest: UploadFileRequest;
};
export type GetApiV1UserToggleDisableByIdApiResponse = unknown;
export type GetApiV1UserToggleDisableByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1WarehouseApiResponse = /** status 200 OK */ string;
export type PostApiV1WarehouseApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createWarehouseRequest: CreateWarehouseRequest;
};
export type GetApiV1WarehouseApiResponse =
  /** status 200 OK */ WarehouseDtoIEnumerablePaginateable;
export type GetApiV1WarehouseApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  type?: WarehouseType;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseByWarehouseIdApiResponse =
  /** status 200 OK */ WarehouseDto;
export type GetApiV1WarehouseByWarehouseIdApiArg = {
  warehouseId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1WarehouseByWarehouseIdApiResponse = unknown;
export type PutApiV1WarehouseByWarehouseIdApiArg = {
  warehouseId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createWarehouseRequest: CreateWarehouseRequest;
};
export type DeleteApiV1WarehouseByWarehouseIdApiResponse = unknown;
export type DeleteApiV1WarehouseByWarehouseIdApiArg = {
  warehouseId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1WarehouseByWarehouseIdLocationApiResponse =
  /** status 200 OK */ string;
export type PostApiV1WarehouseByWarehouseIdLocationApiArg = {
  warehouseId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createWarehouseLocationRequest: CreateWarehouseLocationRequest;
};
export type GetApiV1WarehouseLocationByLocationIdApiResponse =
  /** status 200 OK */ WarehouseLocationDtoRead;
export type GetApiV1WarehouseLocationByLocationIdApiArg = {
  locationId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1WarehouseLocationByLocationIdApiResponse = unknown;
export type PutApiV1WarehouseLocationByLocationIdApiArg = {
  locationId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createWarehouseLocationRequest: CreateWarehouseLocationRequest;
};
export type DeleteApiV1WarehouseLocationByLocationIdApiResponse = unknown;
export type DeleteApiV1WarehouseLocationByLocationIdApiArg = {
  locationId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseLocationApiResponse =
  /** status 200 OK */ WarehouseLocationDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseLocationApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1WarehouseByLocationIdRackApiResponse =
  /** status 200 OK */ string;
export type PostApiV1WarehouseByLocationIdRackApiArg = {
  locationId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createWarehouseLocationRackRequest: CreateWarehouseLocationRackRequest;
};
export type GetApiV1WarehouseRackByRackIdApiResponse =
  /** status 200 OK */ WarehouseLocationRackDtoRead;
export type GetApiV1WarehouseRackByRackIdApiArg = {
  rackId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1WarehouseRackByRackIdApiResponse = unknown;
export type PutApiV1WarehouseRackByRackIdApiArg = {
  rackId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createWarehouseLocationRackRequest: CreateWarehouseLocationRackRequest;
};
export type DeleteApiV1WarehouseRackByRackIdApiResponse = unknown;
export type DeleteApiV1WarehouseRackByRackIdApiArg = {
  rackId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseRackApiResponse =
  /** status 200 OK */ WarehouseLocationRackDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseRackApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  kind?: MaterialKind;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseRackByDepartmentApiResponse =
  /** status 200 OK */ WarehouseLocationRackDtoRead[];
export type GetApiV1WarehouseRackByDepartmentApiArg = {
  kind?: MaterialKind;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1WarehouseByRackIdShelfApiResponse =
  /** status 200 OK */ string;
export type PostApiV1WarehouseByRackIdShelfApiArg = {
  rackId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createWarehouseLocationShelfRequest: CreateWarehouseLocationShelfRequest;
};
export type GetApiV1WarehouseShelfByShelfIdApiResponse =
  /** status 200 OK */ WarehouseLocationShelfDtoRead;
export type GetApiV1WarehouseShelfByShelfIdApiArg = {
  shelfId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1WarehouseShelfByShelfIdApiResponse = unknown;
export type PutApiV1WarehouseShelfByShelfIdApiArg = {
  shelfId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createWarehouseLocationShelfRequest: CreateWarehouseLocationShelfRequest;
};
export type DeleteApiV1WarehouseShelfByShelfIdApiResponse = unknown;
export type DeleteApiV1WarehouseShelfByShelfIdApiArg = {
  shelfId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseShelfApiResponse =
  /** status 200 OK */ WarehouseLocationShelfDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseShelfApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseShelfByDepartmentApiResponse =
  /** status 200 OK */ WarehouseLocationShelfDtoRead[];
export type GetApiV1WarehouseShelfByDepartmentApiArg = {
  kind?: MaterialKind;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
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
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type GetApiV1WarehouseRackByRackIdShelvesApiResponse =
  /** status 200 OK */ WarehouseLocationShelfDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseRackByRackIdShelvesApiArg = {
  rackId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseByWarehouseIdShelvesApiResponse =
  /** status 200 OK */ WarehouseLocationShelfDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseByWarehouseIdShelvesApiArg = {
  warehouseId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseByWarehouseIdArrivalLocationApiResponse =
  /** status 200 OK */ WarehouseArrivalLocationDtoRead;
export type GetApiV1WarehouseByWarehouseIdArrivalLocationApiArg = {
  warehouseId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseDistributedRequisitionMaterialsApiResponse =
  /** status 200 OK */ DistributedRequisitionMaterialDtoIEnumerablePaginateable;
export type GetApiV1WarehouseDistributedRequisitionMaterialsApiArg = {
  kind?: MaterialKind;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseFinishedGoodsDetailsApiResponse =
  /** status 200 OK */ DistributedFinishedProductDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseFinishedGoodsDetailsApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseStockTransferDetailsApiResponse =
  /** status 200 OK */ MaterialBatchDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseStockTransferDetailsApiArg = {
  kind?: MaterialKind;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseDistributedMaterialByIdApiResponse =
  /** status 200 OK */ DistributedRequisitionMaterialDto;
export type GetApiV1WarehouseDistributedMaterialByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1WarehouseArrivalLocationApiResponse = unknown;
export type PostApiV1WarehouseArrivalLocationApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createArrivalLocationRequest: CreateArrivalLocationRequest;
};
export type PutApiV1WarehouseArrivalLocationApiResponse = unknown;
export type PutApiV1WarehouseArrivalLocationApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  updateArrivalLocationRequest: UpdateArrivalLocationRequest;
};
export type PostApiV1WarehouseConfirmArrivalByDistributedMaterialIdApiResponse =
  unknown;
export type PostApiV1WarehouseConfirmArrivalByDistributedMaterialIdApiArg = {
  distributedMaterialId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1WarehouseChecklistApiResponse = unknown;
export type PostApiV1WarehouseChecklistApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createChecklistRequest: CreateChecklistRequest;
};
export type GetApiV1WarehouseChecklistByIdApiResponse =
  /** status 200 OK */ ChecklistDtoRead;
export type GetApiV1WarehouseChecklistByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdMaterialBatchApiResponse =
  /** status 200 OK */ MaterialBatchDtoRead[];
export type GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdMaterialBatchApiArg =
  {
    distributedMaterialId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PostApiV1WarehouseDistributedMaterialMaterialBatchApiResponse =
  /** status 200 OK */ MaterialBatchDtoRead[];
export type PostApiV1WarehouseDistributedMaterialMaterialBatchApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  body: string[];
};
export type GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdChecklistApiResponse =
  /** status 200 OK */ ChecklistDtoRead;
export type GetApiV1WarehouseDistributedMaterialByDistributedMaterialIdChecklistApiArg =
  {
    distributedMaterialId: string;
    /** The module this request falls under */
    module?: any;
    /** The sub module this request falls under */
    subModule?: any;
  };
export type PostApiV1WarehouseGrnApiResponse = unknown;
export type PostApiV1WarehouseGrnApiArg = {
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  createGrnRequest: CreateGrnRequest;
};
export type GetApiV1WarehouseGrnByIdApiResponse =
  /** status 200 OK */ GrnDtoRead;
export type GetApiV1WarehouseGrnByIdApiArg = {
  id: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseGrnsApiResponse =
  /** status 200 OK */ GrnDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseGrnsApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  kind?: MaterialKind;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseBincardinformationByMaterialIdApiResponse =
  /** status 200 OK */ BinCardInformationDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseBincardinformationByMaterialIdApiArg = {
  materialId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WarehouseBincardinformationByProductIdProductApiResponse =
  /** status 200 OK */ BinCardInformationDtoIEnumerablePaginateableRead;
export type GetApiV1WarehouseBincardinformationByProductIdProductApiArg = {
  productId: string;
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PostApiV1WorkOrderApiResponse = /** status 201 Created */ string;
export type PostApiV1WorkOrderApiArg = {
  /** The ID of the user creating the work order. */
  userId?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
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
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type GetApiV1WorkOrderByWorkOrderIdApiResponse =
  /** status 200 OK */ WorkOrderDto;
export type GetApiV1WorkOrderByWorkOrderIdApiArg = {
  /** The ID of the work order. */
  workOrderId: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type PutApiV1WorkOrderByWorkOrderIdApiResponse = unknown;
export type PutApiV1WorkOrderByWorkOrderIdApiArg = {
  /** The ID of the work order to be updated. */
  workOrderId: string;
  /** The ID of the user performing the update. */
  userId?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
  /** The UpdateWorkOrderRequest object containing updated work order data. */
  updateWorkOrderRequest: UpdateWorkOrderRequest;
};
export type DeleteApiV1WorkOrderByWorkOrderIdApiResponse = unknown;
export type DeleteApiV1WorkOrderByWorkOrderIdApiArg = {
  /** The ID of the work order to be deleted. */
  workOrderId: string;
  /** The ID of the user performing the deletion. */
  userId?: string;
  /** The module this request falls under */
  module?: any;
  /** The sub module this request falls under */
  subModule?: any;
};
export type BsonUserDto = {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  createdAt?: string;
};
export type ActionType = 0 | 1 | 2 | 3;
export type ActivityLogDto = {
  user?: BsonUserDto;
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
export type NotificationType =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14;
export type AlertType = 0 | 1 | 2;
export type CreateAlertRequest = {
  title?: string | null;
  notificationType?: NotificationType;
  alertTypes?: AlertType[] | null;
  timeFrame?: string;
  roleIds?: string[] | null;
  userIds?: string[] | null;
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
export type AlertDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  title?: string | null;
  notificationType?: NotificationType;
  alertTypes?: AlertType[] | null;
  timeFrame?: string;
  isDisabled?: boolean;
};
export type AlertDtoIEnumerablePaginateable = {
  data?: AlertDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type TestStage = 0 | 1 | 2;
export type State = 0 | 1 | 2 | 3 | 4 | 5;
export type Status = 0 | 1 | 2;
export type CreateAnalyticalTestRequest = {
  batchNumber: string;
  productName: string;
  productSchedule: string;
  sampledQuantity: string;
  manufacturingDate: string;
  expiryDate: string;
  releasedAt: string;
  releaseDate: string;
  qcManagerSignature: string;
  qaManagerSignature: string;
  stage: TestStage;
  state: State;
  status: Status;
};
export type AnalyticalTestRequestDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  batchNumber?: string | null;
  productName?: string | null;
  productSchedule?: string | null;
  manufacturingDate?: string;
  expiryDate?: string;
  releasedAt?: string | null;
  filled?: string | null;
  releaseDate?: string;
  qcManagerSignature?: string | null;
  sampledQuantity?: string | null;
  qaManagerSignature?: string | null;
  stage?: TestStage;
  state?: State;
  status?: Status;
};
export type AnalyticalTestRequestDtoIEnumerablePaginateable = {
  data?: AnalyticalTestRequestDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
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
export type AttendanceRecordDepartmentDto = {
  staffName?: string | null;
  employeeId?: string | null;
  shiftName?: string | null;
  clockInTime?: string | null;
  clockOutTime?: string | null;
  workHours?: number;
};
export type GeneralAttendanceReportDto = {
  departmentName?: string | null;
  permanentStaff?: number;
  casualStaff?: number;
  permanentMorning?: number;
  permanentAfternoon?: number;
  permanentNight?: number;
  casualMorning?: number;
  casualAfternoon?: number;
  casualNight?: number;
};
export type GeneralAttendanceReportDtoRead = {
  departmentName?: string | null;
  permanentStaff?: number;
  casualStaff?: number;
  totalStaff?: number;
  permanentMorning?: number;
  permanentAfternoon?: number;
  permanentNight?: number;
  casualMorning?: number;
  casualAfternoon?: number;
  casualNight?: number;
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
  startTime?: string | null;
  endTime?: string | null;
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
export type CountryDto = {
  id?: string;
  name?: string | null;
  nationality?: string | null;
  code?: string | null;
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
  email: string;
  employeeType: EmployeeType;
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
  type: EmployeeType;
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
  roleId: string;
};
export type MinimalEmployeeInfoDto = {
  employeeId?: string;
  firstName?: string | null;
  lastName?: string | null;
  staffNumber?: string | null;
  type?: string | null;
  department?: string | null;
  designation?: string | null;
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
export type QuestionType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
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
  description?: string | null;
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
export type FormulaDto = {
  expression?: string | null;
  variables?: string | null;
};
export type CreateQuestionRequest = {
  label: string;
  type: QuestionType;
  isMultiSelect?: boolean;
  validation?: QuestionValidationType;
  options?: CreateQuestionOptionsRequest[] | null;
  description?: string | null;
  reference?: string | null;
  formula?: FormulaDto;
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
export type CreateHolidayRequest = {
  name: string;
  date: string;
  description?: string | null;
};
export type HolidayDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  name?: string | null;
  date?: string;
  description?: string | null;
};
export type HolidayDtoIEnumerablePaginateable = {
  data?: HolidayDto[] | null;
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
export type LeaveStatus = 0 | 1 | 2 | 3 | 4;
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
  recallDate?: string;
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
  recallDate?: string;
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
export type CreateLeaveRecallRequest = {
  employeeId: string;
  recallDate: string;
  recallReason?: string | null;
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
  pendingStockTransferQuantity?: number;
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
export type CreateMaterialAnalyticalRawDataRequest = {
  stpNumber: string;
  specNumber: string;
  description?: string | null;
  stpId: string;
  formId: string;
};
export type MaterialAnalyticalRawDataDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  attachments?: AttachmentDto[] | null;
  stpNumber?: string | null;
  specNumber?: string | null;
  description?: string | null;
  materialName?: string | null;
  stpId?: string;
  formId?: string;
  formName?: string | null;
};
export type MaterialAnalyticalRawDataDtoIEnumerablePaginateable = {
  data?: MaterialAnalyticalRawDataDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateMaterialStandardTestProcedureRequest = {
  stpNumber: string;
  materialId: string;
  description?: string | null;
};
export type MaterialStandardTestProcedureDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  attachments?: AttachmentDto[] | null;
  stpNumber?: string | null;
  materialId?: string;
  materialName?: string | null;
  description?: string | null;
};
export type MaterialStandardTestProcedureDtoIEnumerablePaginateable = {
  data?: MaterialStandardTestProcedureDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateOvertimeRequest = {
  code: string;
  employeeIds: string[];
  overtimeDate: string;
  departmentId: string;
  startTime: string;
  endTime: string;
  justification?: string | null;
};
export type OvertimeStatus = 0 | 1 | 2 | 3;
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
  department?: Department;
  signature?: string | null;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  billOfMaterialId?: string;
  billOfMaterial?: BillOfMaterial;
  materialId?: string;
  material?: MaterialRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  productId?: string;
  product?: Product;
  materialId?: string;
  material?: MaterialRead;
  materialThickness?: string | null;
  otherStandards?: string | null;
  baseQuantity?: number;
  baseUoMId?: string | null;
  baseUoM?: UnitOfMeasure;
  unitCapacity?: number;
  directLinkMaterialId?: string | null;
  directLinkMaterial?: MaterialRead;
  packingExcessMargin?: number;
};
export type OperationAction = 0 | 1 | 2 | 3 | 4 | 5 | 6;
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
  action?: OperationAction;
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
  description?: string | null;
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
export type FormAssignee = {
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
  type?: DepartmentType;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  cancelled?: boolean;
  reasonForCancellation?: string | null;
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
  cancelled?: boolean;
  reasonForCancellation?: string | null;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  productionActivityId?: string;
  productionActivity?: ProductionActivity;
  message?: string | null;
  userId?: string | null;
  user?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  productionActivityStepId?: string;
  productionActivityStep?: ProductionActivityStep;
  resourceId?: string;
  resource?: Resource;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  productionActivityStepId?: string;
  productionActivityStep?: ProductionActivityStep;
  workCenterId?: string;
  workCenter?: WorkCenter;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  productionActivityStepId?: string;
  productionActivityStep?: ProductionActivityStep;
  userId?: string;
  user?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  productionActivityId?: string;
  productionActivity?: ProductionActivityRead;
  operationId?: string;
  operation?: Operation;
  workflowId?: string | null;
  workFlow?: Form;
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
  user?: UserRead;
  roleId?: string | null;
  role?: Role;
  required?: boolean;
  order?: number;
  stageStartTime?: string | null;
  status?: ApprovalStatus;
  approvalTime?: string | null;
  approvedById?: string | null;
  approvedBy?: UserRead;
  createdAt?: string;
  activatedAt?: string | null;
  comments?: string | null;
  id?: string;
  requisitionId?: string;
  requisition?: Requisition;
  approvalId?: string;
  approval?: Approval;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  code?: string | null;
  requestedById?: string;
  requestedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  requisitionId?: string;
  requisition?: RequisitionRead;
  materialId?: string;
  material?: MaterialRead;
  uoMId?: string | null;
  uoM?: UnitOfMeasure;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  issuedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  warehouseArrivalLocationId?: string | null;
  warehouseArrivalLocation?: WarehouseArrivalLocation;
  productId?: string | null;
  batchManufacturingRecordId?: string | null;
  batchManufacturingRecord?: BatchManufacturingRecordRead;
  transferNoteId?: string | null;
  transferNote?: FinishedGoodsTransferNoteRead;
  product?: ProductRead;
  uomId?: string | null;
  uoM?: UnitOfMeasure;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  name?: string | null;
  address?: string | null;
  email?: string | null;
  approvedAt?: string | null;
  validityDate?: string | null;
  countryId?: string | null;
  country?: Country;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  code?: string | null;
  supplierId?: string | null;
  supplier?: SupplierRead;
  items?: ShipmentInvoiceItem[] | null;
  totalCost?: number;
  currencyId?: string | null;
  currency?: Currency;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  sourceRequisitionId?: string;
  sourceRequisition?: SourceRequisition;
  materialId?: string;
  material?: MaterialRead;
  uoMId?: string;
  uoM?: UnitOfMeasure;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  purchaseOrderId?: string;
  purchaseOrder?: PurchaseOrder;
  materialId?: string;
  material?: MaterialRead;
  uoMId?: string;
  uoM?: UnitOfMeasure;
  quantity?: number;
  price?: number;
  currencyId?: string | null;
  currency?: Currency;
};
export type PurchaseOrderStatus = 0 | 1 | 2 | 3 | 4;
export type RevisedPurchaseOrderType = 0 | 1 | 2 | 3 | 4;
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
  user?: UserRead;
  roleId?: string | null;
  role?: Role;
  required?: boolean;
  order?: number;
  stageStartTime?: string | null;
  status?: ApprovalStatus;
  approvalTime?: string | null;
  approvedById?: string | null;
  approvedBy?: UserRead;
  createdAt?: string;
  activatedAt?: string | null;
  comments?: string | null;
  id?: string;
  purchaseOrderId?: string;
  purchaseOrder?: PurchaseOrder;
  approvalId?: string;
  approval?: Approval;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  shipmentInvoiceId?: string;
  shipmentInvoice?: ShipmentInvoiceRead;
  materialId?: string;
  material?: MaterialRead;
  uoMId?: string;
  uoM?: UnitOfMeasure;
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
  currency?: Currency;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  uoM?: UnitOfMeasure;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  code?: string | null;
  materialId?: string;
  material?: MaterialRead;
  uoMId?: string | null;
  uoM?: UnitOfMeasure;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  approvedBy?: UserRead;
  issuedById?: string | null;
  issuedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  materialBatchId?: string;
  materialBatch?: MaterialBatch;
  srNumber?: string | null;
  grossWeight?: number;
  uoMId?: string | null;
  uoM?: UnitOfMeasure;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  batchId?: string;
  batch?: MaterialBatch;
  quantity?: number;
  userId?: string;
  user?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  batchId?: string;
  batch?: MaterialBatch;
  fromWarehouse?: Warehouse;
  fromWarehouseId?: string | null;
  toWarehouse?: Warehouse;
  toWarehouseId?: string | null;
  quantity?: number;
  movedAt?: string;
  movedById?: string;
  movedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  materialBatchId?: string;
  materialBatch?: MaterialBatch;
  warehouseId?: string;
  warehouse?: Warehouse;
  productionScheduleId?: string;
  productionSchedule?: ProductionScheduleRead;
  productId?: string;
  product?: ProductRead;
  uoMId?: string | null;
  uoM?: UnitOfMeasure;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  containerPackageStyle?: PackageStyle;
  quantityPerContainer?: number;
  quantityAssigned?: number;
  totalQuantity?: number;
  consumedQuantity?: number;
  remainingQuantity?: number;
  quantityUnassigned?: number;
  uoMId?: string | null;
  uoM?: UnitOfMeasure;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  warehouseLocationShelfId?: string;
  warehouseLocationShelf?: WarehouseLocationShelf;
  materialBatchId?: string;
  materialBatch?: MaterialBatchRead;
  quantity?: number;
  uomId?: string | null;
  uoM?: UnitOfMeasure;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
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
  createdBy?: UserRead;
  lastUpdatedById?: string | null;
  lastUpdatedBy?: UserRead;
  deletedAt?: string | null;
  lastDeletedById?: string | null;
  lastDeletedBy?: UserRead;
  name: string;
  description?: string | null;
  maximumLeaveDays?: number;
  departments?: Department[] | null;
  leaveTypes?: LeaveType[] | null;
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
export type OvertimeRequestDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  code?: string | null;
  employees?: EmployeeDto[] | null;
  overtimeDate?: string;
  startTime?: string | null;
  endTime?: string | null;
  status?: OvertimeStatus;
  justification?: string | null;
  departmentId?: string;
  department?: Department;
  totalHours?: number;
};
export type OvertimeRequestDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  code?: string | null;
  employees?: EmployeeDtoRead[] | null;
  overtimeDate?: string;
  startTime?: string | null;
  endTime?: string | null;
  status?: OvertimeStatus;
  justification?: string | null;
  departmentId?: string;
  department?: DepartmentRead;
  totalHours?: number;
};
export type OvertimeRequestDtoIEnumerablePaginateable = {
  data?: OvertimeRequestDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type OvertimeRequestDtoIEnumerablePaginateableRead = {
  data?: OvertimeRequestDtoRead[] | null;
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
  uoM?: UnitOfMeasure;
  receivedQuantity?: number;
  typeId?: string | null;
  type?: ShipmentDiscrepancyType;
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
export type Stage = 0 | 1 | 2;
export type CreateProductAnalyticalRawDataRequest = {
  stpNumber: string;
  specNumber: string;
  stage: Stage;
  description?: string | null;
  stpId: string;
  formId: string;
};
export type ProductAnalyticalRawDataDto = {
  stpNumber?: string | null;
  specNumber?: string | null;
  stage?: Stage;
  description?: string | null;
  stpId?: string;
  formId?: string;
};
export type ProductAnalyticalRawDataDtoIEnumerablePaginateable = {
  data?: ProductAnalyticalRawDataDto[] | null;
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
  cancelled?: boolean;
  reasonForCancellation?: string | null;
};
export type ProductionScheduleProductDtoRead = {
  product?: ProductListDtoRead;
  quantity?: number;
  batchNumber?: string | null;
  batchSize?: BatchSize;
  cancelled?: boolean;
  reasonForCancellation?: string | null;
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
export type OperationDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  name?: string | null;
  description?: string | null;
  order?: number;
  action?: OperationAction;
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
  operation?: OperationDto;
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
  operation?: OperationDto;
  activities?: ProductionActivityGroupDto[] | null;
};
export type ProductionActivityGroupResultDtoRead = {
  operation?: OperationDto;
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
  uoMId?: string | null;
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
  type?: DepartmentType;
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
export type ProductionExtraPackingStatus = 0 | 1;
export type ProductionExtraPackingWithBatchesDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  productionSchedule?: CollectionItemDto;
  product?: CollectionItemDto;
  material?: MaterialDto;
  uoM?: UnitOfMeasureDto;
  status?: ProductionExtraPackingStatus;
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
export type CreateProductStandardTestProcedureRequest = {
  stpNumber: string;
  productId: string;
};
export type ProductStandardTestProcedureDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  attachments?: AttachmentDto[] | null;
  stpNumber?: string | null;
  productId?: string;
  productName?: string | null;
};
export type ProductStandardTestProcedureDtoIEnumerablePaginateable = {
  data?: ProductStandardTestProcedureDto[] | null;
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
  type?: DepartmentType;
  permissions?: PermissionModuleDto[] | null;
};
export type RolePermissionDto = {
  id?: string;
  displayName?: string | null;
  name?: string | null;
  type?: DepartmentType;
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
  type?: DepartmentType;
};
export type ScheduleFrequency = 0 | 1 | 2 | 3 | 4 | 5;
export type CreateShiftScheduleRequest = {
  scheduleName: string;
  frequency: ScheduleFrequency;
  startDate: string;
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
  startTime?: string | null;
  endTime?: string | null;
  applicableDays?: DayOfWeek[] | null;
};
export type ShiftScheduleDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  scheduleName?: string | null;
  startDate?: string;
  endDate?: string;
  frequency?: ScheduleFrequency;
  shiftType?: ShiftTypeDto[] | null;
  departmentId?: string;
  department?: DepartmentDto;
};
export type ShiftScheduleDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  scheduleName?: string | null;
  startDate?: string;
  endDate?: string;
  frequency?: ScheduleFrequency;
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
export type AssignShiftRequest = {
  employeeIds: string[];
  shiftScheduleId: string;
  shiftCategoryId: string;
  shiftTypeId: string;
  scheduleDate: string;
};
export type ShiftCategoryDto = {
  id?: string;
  name?: string | null;
};
export type MinimalShiftTypeDto = {
  shiftTypeId?: string;
  shiftName?: string | null;
};
export type MinimalShiftScheduleDto = {
  scheduleId?: string;
  scheduleName?: string | null;
  startDate?: string;
  endDate?: string;
};
export type ShiftAssignmentDto = {
  employees?: MinimalEmployeeInfoDto[] | null;
  scheduleDate?: string;
  startDate?: string;
  endDate?: string;
  shiftCategory?: ShiftCategoryDto;
  shiftType?: MinimalShiftTypeDto;
  shiftSchedule?: MinimalShiftScheduleDto;
};
export type UpdateShiftAssignment = {
  shiftCategoryId: string;
  scheduleDate: string;
  addEmployeeIds?: string[] | null;
  removeEmployeeIds?: string[] | null;
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
export type BudgetStatus = 0 | 1;
export type AppointmentType = 0 | 1;
export type CreateStaffRequisitionRequest = {
  budgetStatus: BudgetStatus;
  staffRequired: number;
  educationalQualification: string;
  qualification: string;
  designationId: string;
  departmentId: string;
  additionalRequests?: string | null;
  appointmentType: AppointmentType;
  requestUrgency: string;
  justification?: string | null;
  additionalRequirements?: string | null;
  departmentName?: string | null;
};
export type StaffRequisitionStatus = 0 | 1 | 2 | 3 | 4;
export type StaffRequisitionDto = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  budgetStatus?: BudgetStatus;
  staffRequired?: number;
  qualification?: string | null;
  educationalQualification?: string | null;
  additionalRequests?: string | null;
  departmentName?: string | null;
  appointmentType?: AppointmentType;
  staffRequisitionStatus?: StaffRequisitionStatus;
  requestUrgency?: string;
  justification?: string | null;
  additionalRequirements?: string | null;
  designationId?: string;
  designation?: DesignationDto;
  departmentId?: string;
  department?: DepartmentDto;
};
export type StaffRequisitionDtoRead = {
  id?: string;
  createdBy?: UserDto;
  createdAt?: string;
  budgetStatus?: BudgetStatus;
  staffRequired?: number;
  qualification?: string | null;
  educationalQualification?: string | null;
  additionalRequests?: string | null;
  departmentName?: string | null;
  appointmentType?: AppointmentType;
  staffRequisitionStatus?: StaffRequisitionStatus;
  requestUrgency?: string;
  justification?: string | null;
  additionalRequirements?: string | null;
  designationId?: string;
  designation?: DesignationDtoRead;
  departmentId?: string;
  department?: DepartmentDtoRead;
};
export type StaffRequisitionDtoIEnumerablePaginateable = {
  data?: StaffRequisitionDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type StaffRequisitionDtoIEnumerablePaginateableRead = {
  data?: StaffRequisitionDtoRead[] | null;
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
  usePostApiV1AlertMutation,
  useGetApiV1AlertQuery,
  useLazyGetApiV1AlertQuery,
  useGetApiV1AlertByAlertIdQuery,
  useLazyGetApiV1AlertByAlertIdQuery,
  usePutApiV1AlertByAlertIdMutation,
  usePatchApiV1AlertByIdToggleDisableMutation,
  usePostApiV1QaAnalyticalTestsMutation,
  useGetApiV1QaAnalyticalTestsQuery,
  useLazyGetApiV1QaAnalyticalTestsQuery,
  useGetApiV1QaAnalyticalTestsByIdQuery,
  useLazyGetApiV1QaAnalyticalTestsByIdQuery,
  usePutApiV1QaAnalyticalTestsByIdMutation,
  useDeleteApiV1QaAnalyticalTestsByIdMutation,
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
  usePostApiV1AttendanceRecordsUploadMutation,
  useGetApiV1AttendanceRecordsDailySummaryQuery,
  useLazyGetApiV1AttendanceRecordsDailySummaryQuery,
  useGetApiV1AttendanceRecordsGeneralSummaryQuery,
  useLazyGetApiV1AttendanceRecordsGeneralSummaryQuery,
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
  useGetApiV1CountriesQuery,
  useLazyGetApiV1CountriesQuery,
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
  useGetApiV1EmployeeDepartmentsByIdQuery,
  useLazyGetApiV1EmployeeDepartmentsByIdQuery,
  useGetApiV1EmployeeByShiftScheduleIdAvailableQuery,
  useLazyGetApiV1EmployeeByShiftScheduleIdAvailableQuery,
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
  usePostApiV1HolidaysMutation,
  useGetApiV1HolidaysQuery,
  useLazyGetApiV1HolidaysQuery,
  useGetApiV1HolidaysByIdQuery,
  useLazyGetApiV1HolidaysByIdQuery,
  usePutApiV1HolidaysByIdMutation,
  useDeleteApiV1HolidaysByIdMutation,
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
  usePutApiV1LeaveRequestRecallMutation,
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
  useGetApiV1MaterialHoldingQuery,
  useLazyGetApiV1MaterialHoldingQuery,
  usePostApiV1MaterialHoldingMoveByHoldingMaterialIdMutation,
  usePostApiV1MaterialArdMutation,
  useGetApiV1MaterialArdQuery,
  useLazyGetApiV1MaterialArdQuery,
  useGetApiV1MaterialArdByIdQuery,
  useLazyGetApiV1MaterialArdByIdQuery,
  usePutApiV1MaterialArdByIdMutation,
  useDeleteApiV1MaterialArdByIdMutation,
  usePostApiV1MaterialStpsMutation,
  useGetApiV1MaterialStpsQuery,
  useLazyGetApiV1MaterialStpsQuery,
  useGetApiV1MaterialStpsByIdQuery,
  useLazyGetApiV1MaterialStpsByIdQuery,
  usePutApiV1MaterialStpsByIdMutation,
  useDeleteApiV1MaterialStpsByIdMutation,
  usePostApiV1OvertimeRequestsMutation,
  useGetApiV1OvertimeRequestsQuery,
  useLazyGetApiV1OvertimeRequestsQuery,
  useGetApiV1OvertimeRequestsByIdQuery,
  useLazyGetApiV1OvertimeRequestsByIdQuery,
  usePutApiV1OvertimeRequestsByIdMutation,
  useDeleteApiV1OvertimeRequestsByIdMutation,
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
  usePostApiV1ProductArdMutation,
  useGetApiV1ProductArdQuery,
  useLazyGetApiV1ProductArdQuery,
  useGetApiV1ProductArdByIdQuery,
  useLazyGetApiV1ProductArdByIdQuery,
  usePutApiV1ProductArdByIdMutation,
  useDeleteApiV1ProductArdByIdMutation,
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
  useGetApiV1ProductionScheduleExtraPackingByProductByProductionScheduleIdAndProductIdQuery,
  useLazyGetApiV1ProductionScheduleExtraPackingByProductByProductionScheduleIdAndProductIdQuery,
  useGetApiV1ProductionScheduleExtraPackingBatchesToSupplyByExtraPackingMaterialIdQuery,
  useLazyGetApiV1ProductionScheduleExtraPackingBatchesToSupplyByExtraPackingMaterialIdQuery,
  usePostApiV1ProductionScheduleExtraPackingApproveByProductionExtraPackingIdMutation,
  usePostApiV1ProductStpsMutation,
  useGetApiV1ProductStpsQuery,
  useLazyGetApiV1ProductStpsQuery,
  useGetApiV1ProductStpsByIdQuery,
  useLazyGetApiV1ProductStpsByIdQuery,
  usePutApiV1ProductStpsByIdMutation,
  useDeleteApiV1ProductStpsByIdMutation,
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
  usePostApiV1ShiftSchedulesMutation,
  useGetApiV1ShiftSchedulesQuery,
  useLazyGetApiV1ShiftSchedulesQuery,
  usePostApiV1ShiftSchedulesAssignMutation,
  useGetApiV1ShiftSchedulesByIdQuery,
  useLazyGetApiV1ShiftSchedulesByIdQuery,
  usePutApiV1ShiftSchedulesByIdMutation,
  useDeleteApiV1ShiftSchedulesByIdMutation,
  useGetApiV1ShiftSchedulesByScheduleIdViewQuery,
  useLazyGetApiV1ShiftSchedulesByScheduleIdViewQuery,
  useGetApiV1ShiftSchedulesByScheduleIdDayQuery,
  useLazyGetApiV1ShiftSchedulesByScheduleIdDayQuery,
  usePutApiV1ShiftSchedulesByIdUpdateScheduleMutation,
  usePostApiV1ShiftTypeMutation,
  useGetApiV1ShiftTypeQuery,
  useLazyGetApiV1ShiftTypeQuery,
  usePutApiV1ShiftTypeMutation,
  useGetApiV1ShiftTypeByIdQuery,
  useLazyGetApiV1ShiftTypeByIdQuery,
  useDeleteApiV1ShiftTypeByIdMutation,
  usePostApiV1StaffRequisitionsMutation,
  useGetApiV1StaffRequisitionsQuery,
  useLazyGetApiV1StaffRequisitionsQuery,
  useGetApiV1StaffRequisitionsByIdQuery,
  useLazyGetApiV1StaffRequisitionsByIdQuery,
  usePutApiV1StaffRequisitionsByIdMutation,
  useDeleteApiV1StaffRequisitionsByIdMutation,
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
