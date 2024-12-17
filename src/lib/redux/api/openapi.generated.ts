import { api } from "./index";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
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
      }),
    }),
    getApiV1CollectionByItemType: build.query<
      GetApiV1CollectionByItemTypeApiResponse,
      GetApiV1CollectionByItemTypeApiArg
    >({
      query: (queryArg) => ({ url: `/api/v1/collection/${queryArg.itemType}` }),
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
    getApiV1MaterialAll: build.query<
      GetApiV1MaterialAllApiResponse,
      GetApiV1MaterialAllApiArg
    >({
      query: () => ({ url: `/api/v1/material/all` }),
    }),
    getApiV1MaterialByMaterialIdStockLevel: build.query<
      GetApiV1MaterialByMaterialIdStockLevelApiResponse,
      GetApiV1MaterialByMaterialIdStockLevelApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/material/${queryArg.materialId}/stock-level`,
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
        params: {
          batchId: queryArg.batchId,
          fromLocationId: queryArg.fromLocationId,
          toLocationId: queryArg.toLocationId,
          quantity: queryArg.quantity,
        },
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
        body: queryArg.createPurchaseOrderRequest,
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
    postApiV1ProductionScheduleMaster: build.mutation<
      PostApiV1ProductionScheduleMasterApiResponse,
      PostApiV1ProductionScheduleMasterApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/master`,
        method: "POST",
        body: queryArg.createMasterProductionScheduleRequest,
      }),
    }),
    getApiV1ProductionScheduleMasterByMasterScheduleId: build.query<
      GetApiV1ProductionScheduleMasterByMasterScheduleIdApiResponse,
      GetApiV1ProductionScheduleMasterByMasterScheduleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/master/${queryArg.masterScheduleId}`,
      }),
    }),
    putApiV1ProductionScheduleMasterByMasterScheduleId: build.mutation<
      PutApiV1ProductionScheduleMasterByMasterScheduleIdApiResponse,
      PutApiV1ProductionScheduleMasterByMasterScheduleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/master/${queryArg.masterScheduleId}`,
        method: "PUT",
        body: queryArg.updateMasterProductionScheduleRequest,
      }),
    }),
    deleteApiV1ProductionScheduleMasterByMasterScheduleId: build.mutation<
      DeleteApiV1ProductionScheduleMasterByMasterScheduleIdApiResponse,
      DeleteApiV1ProductionScheduleMasterByMasterScheduleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/master/${queryArg.masterScheduleId}`,
        method: "DELETE",
      }),
    }),
    getApiV1ProductionScheduleMasters: build.query<
      GetApiV1ProductionScheduleMastersApiResponse,
      GetApiV1ProductionScheduleMastersApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/masters`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
      }),
    }),
    postApiV1ProductionScheduleSchedule: build.mutation<
      PostApiV1ProductionScheduleScheduleApiResponse,
      PostApiV1ProductionScheduleScheduleApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/schedule`,
        method: "POST",
        body: queryArg.createProductionScheduleRequest,
      }),
    }),
    getApiV1ProductionScheduleScheduleByScheduleId: build.query<
      GetApiV1ProductionScheduleScheduleByScheduleIdApiResponse,
      GetApiV1ProductionScheduleScheduleByScheduleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/schedule/${queryArg.scheduleId}`,
      }),
    }),
    putApiV1ProductionScheduleScheduleByScheduleId: build.mutation<
      PutApiV1ProductionScheduleScheduleByScheduleIdApiResponse,
      PutApiV1ProductionScheduleScheduleByScheduleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/schedule/${queryArg.scheduleId}`,
        method: "PUT",
        body: queryArg.updateProductionScheduleRequest,
      }),
    }),
    deleteApiV1ProductionScheduleScheduleByScheduleId: build.mutation<
      DeleteApiV1ProductionScheduleScheduleByScheduleIdApiResponse,
      DeleteApiV1ProductionScheduleScheduleByScheduleIdApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/schedule/${queryArg.scheduleId}`,
        method: "DELETE",
      }),
    }),
    getApiV1ProductionScheduleSchedules: build.query<
      GetApiV1ProductionScheduleSchedulesApiResponse,
      GetApiV1ProductionScheduleSchedulesApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/production-schedule/schedules`,
        params: {
          page: queryArg.page,
          pageSize: queryArg.pageSize,
          searchQuery: queryArg.searchQuery,
        },
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
    postApiV1RequisitionByRequisitionIdApprove: build.mutation<
      PostApiV1RequisitionByRequisitionIdApproveApiResponse,
      PostApiV1RequisitionByRequisitionIdApproveApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/${queryArg.requisitionId}/approve`,
        method: "POST",
        body: queryArg.approveRequisitionRequest,
      }),
    }),
    postApiV1RequisitionByRequisitionIdProcess: build.mutation<
      PostApiV1RequisitionByRequisitionIdProcessApiResponse,
      PostApiV1RequisitionByRequisitionIdProcessApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/${queryArg.requisitionId}/process`,
        method: "POST",
        body: queryArg.createRequisitionRequest,
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
    postApiV1RequisitionSourceQuotationProcessPurchaseOrder: build.mutation<
      PostApiV1RequisitionSourceQuotationProcessPurchaseOrderApiResponse,
      PostApiV1RequisitionSourceQuotationProcessPurchaseOrderApiArg
    >({
      query: (queryArg) => ({
        url: `/api/v1/requisition/source/quotation/process-purchase-order`,
        method: "POST",
        body: queryArg.body,
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
          roleNames: queryArg.roleNames,
          searchQuery: queryArg.searchQuery,
          "with-disabled": queryArg["with-disabled"],
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
  body: string[];
};
export type GetApiV1CollectionByItemTypeApiResponse =
  /** status 200 OK */ CollectionItemDto[];
export type GetApiV1CollectionByItemTypeApiArg = {
  /** The type of item to retrieve. */
  itemType: string;
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
  /** status 200 OK */ DepartmentDtoIEnumerablePaginateable;
export type GetApiV1DepartmentApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1DepartmentByDepartmentIdApiResponse =
  /** status 200 OK */ DepartmentDto;
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
export type PostApiV1MaterialApiResponse = /** status 200 OK */ string;
export type PostApiV1MaterialApiArg = {
  /** The CreateMaterialRequest object. */
  createMaterialRequest: CreateMaterialRequest;
};
export type GetApiV1MaterialApiResponse =
  /** status 200 OK */ MaterialDtoIEnumerablePaginateableRead;
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
  /** status 200 OK */ MaterialDtoRead;
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
export type GetApiV1MaterialAllApiResponse =
  /** status 200 OK */ MaterialDtoRead[];
export type GetApiV1MaterialAllApiArg = void;
export type GetApiV1MaterialByMaterialIdStockLevelApiResponse =
  /** status 200 OK */ number;
export type GetApiV1MaterialByMaterialIdStockLevelApiArg = {
  /** The ID of the material. */
  materialId: string;
};
export type PostApiV1MaterialBatchApiResponse = unknown;
export type PostApiV1MaterialBatchApiArg = {
  /** The CreateMaterialBatchRequest object. */
  body: CreateMaterialBatchRequest[];
};
export type GetApiV1MaterialBatchApiResponse =
  /** status 200 OK */ MaterialBatchDtoIEnumerablePaginateable;
export type GetApiV1MaterialBatchApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1MaterialBatchByBatchIdApiResponse =
  /** status 200 OK */ MaterialBatchDto;
export type GetApiV1MaterialBatchByBatchIdApiArg = {
  /** The ID of the material batch. */
  batchId: string;
};
export type PostApiV1MaterialBatchMoveApiResponse = unknown;
export type PostApiV1MaterialBatchMoveApiArg = {
  /** The ID of the material batch to move. */
  batchId?: string;
  /** The ID of the warehouse source location. */
  fromLocationId?: string;
  /** The ID of the warehouse destination location. */
  toLocationId?: string;
  /** The quantity to move. */
  quantity?: number;
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
  /** status 200 OK */ SupplierDtoIEnumerablePaginateableRead;
export type GetApiV1ProcurementSupplierApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1ProcurementSupplierBySupplierIdApiResponse =
  /** status 200 OK */ SupplierDtoRead;
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
export type GetApiV1ProcurementSupplierMaterialByMaterialIdApiResponse =
  /** status 200 OK */ SupplierDtoRead[];
export type GetApiV1ProcurementSupplierMaterialByMaterialIdApiArg = {
  /** The ID of the material. */
  materialId: string;
};
export type GetApiV1ProcurementSupplierByMaterialIdAndTypeApiResponse =
  /** status 200 OK */ SupplierDtoRead[];
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
  createPurchaseOrderRequest: CreatePurchaseOrderRequest;
};
export type DeleteApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiResponse =
  unknown;
export type DeleteApiV1ProcurementPurchaseOrderByPurchaseOrderIdApiArg = {
  /** The ID of the purchase order to delete. */
  purchaseOrderId: string;
};
export type PostApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderIdApiResponse =
  unknown;
export type PostApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderIdApiArg =
  {
    /** The ID of the purchase order you want to send to a supplier as an email. */
    purchaseOrderId: string;
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
export type PostApiV1ProductApiResponse = /** status 201 Created */ string;
export type PostApiV1ProductApiArg = {
  createProductRequest: CreateProductRequest;
};
export type GetApiV1ProductApiResponse =
  /** status 200 OK */ ProductListDtoIEnumerablePaginateable;
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
export type GetApiV1ProductByProductIdBomApiResponse =
  /** status 200 OK */ ProductBillOfMaterialDto;
export type GetApiV1ProductByProductIdBomApiArg = {
  productId: string;
};
export type PostApiV1ProductByProductIdRoutesApiResponse =
  /** status 201 Created */ string;
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
export type PostApiV1ProductionScheduleMasterApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionScheduleMasterApiArg = {
  /** The CreateMasterProductionScheduleRequest object. */
  createMasterProductionScheduleRequest: CreateMasterProductionScheduleRequest;
};
export type GetApiV1ProductionScheduleMasterByMasterScheduleIdApiResponse =
  /** status 200 OK */ MasterProductionScheduleDto;
export type GetApiV1ProductionScheduleMasterByMasterScheduleIdApiArg = {
  /** The ID of the Master Production Schedule. */
  masterScheduleId: string;
};
export type PutApiV1ProductionScheduleMasterByMasterScheduleIdApiResponse =
  unknown;
export type PutApiV1ProductionScheduleMasterByMasterScheduleIdApiArg = {
  /** The ID of the Master Production Schedule to be updated. */
  masterScheduleId: string;
  /** The UpdateMasterProductionScheduleRequest object containing updated data. */
  updateMasterProductionScheduleRequest: UpdateMasterProductionScheduleRequest;
};
export type DeleteApiV1ProductionScheduleMasterByMasterScheduleIdApiResponse =
  unknown;
export type DeleteApiV1ProductionScheduleMasterByMasterScheduleIdApiArg = {
  /** The ID of the Master Production Schedule to be deleted. */
  masterScheduleId: string;
};
export type GetApiV1ProductionScheduleMastersApiResponse =
  /** status 200 OK */ MasterProductionScheduleDtoIEnumerablePaginateable;
export type GetApiV1ProductionScheduleMastersApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type PostApiV1ProductionScheduleScheduleApiResponse =
  /** status 201 Created */ string;
export type PostApiV1ProductionScheduleScheduleApiArg = {
  /** The CreateProductionScheduleRequest object. */
  createProductionScheduleRequest: CreateProductionScheduleRequest;
};
export type GetApiV1ProductionScheduleScheduleByScheduleIdApiResponse =
  /** status 200 OK */ ProductionScheduleDtoRead;
export type GetApiV1ProductionScheduleScheduleByScheduleIdApiArg = {
  /** The ID of the Production Schedule. */
  scheduleId: string;
};
export type PutApiV1ProductionScheduleScheduleByScheduleIdApiResponse = unknown;
export type PutApiV1ProductionScheduleScheduleByScheduleIdApiArg = {
  /** The ID of the Production Schedule to be updated. */
  scheduleId: string;
  /** The UpdateProductionScheduleRequest object containing updated data. */
  updateProductionScheduleRequest: UpdateProductionScheduleRequest;
};
export type DeleteApiV1ProductionScheduleScheduleByScheduleIdApiResponse =
  unknown;
export type DeleteApiV1ProductionScheduleScheduleByScheduleIdApiArg = {
  /** The ID of the Production Schedule to be deleted. */
  scheduleId: string;
};
export type GetApiV1ProductionScheduleSchedulesApiResponse =
  /** status 200 OK */ ProductionScheduleDtoIEnumerablePaginateableRead;
export type GetApiV1ProductionScheduleSchedulesApiArg = {
  /** The current page number. */
  page?: number;
  /** The number of items per page. */
  pageSize?: number;
  /** Search query for filtering results. */
  searchQuery?: string;
};
export type GetApiV1ProductionScheduleProductionStatusApiResponse =
  /** status 200 Returns the list of production status */ TypeResponse[];
export type GetApiV1ProductionScheduleProductionStatusApiArg = void;
export type GetApiV1ProductionScheduleByScheduleIdDetailsApiResponse =
  /** status 200 OK */ ProductionScheduleProcurementDtoRead[];
export type GetApiV1ProductionScheduleByScheduleIdDetailsApiArg = {
  /** The ID of the Production Schedule. */
  scheduleId: string;
};
export type PostApiV1RequisitionApiResponse = /** status 200 OK */ string;
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
};
export type GetApiV1RequisitionByRequisitionIdApiResponse =
  /** status 200 OK */ RequisitionDtoRead;
export type GetApiV1RequisitionByRequisitionIdApiArg = {
  /** The ID of the Stock Requisition. */
  requisitionId: string;
};
export type PostApiV1RequisitionByRequisitionIdApproveApiResponse = unknown;
export type PostApiV1RequisitionByRequisitionIdApproveApiArg = {
  /** The ID of the Stock Requisition being approved. */
  requisitionId: string;
  /** The ApproveRequisitionRequest object. */
  approveRequisitionRequest: ApproveRequisitionRequest;
};
export type PostApiV1RequisitionByRequisitionIdProcessApiResponse = unknown;
export type PostApiV1RequisitionByRequisitionIdProcessApiArg = {
  /** The ID of the Stock Requisition being processed. */
  requisitionId: string;
  /** The CreateRequisitionRequest object. */
  createRequisitionRequest: CreateRequisitionRequest;
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
  /** The source of the requisition. (example Local, Foreign, Internal) */
  source?: ProcurementSource;
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
  /** status 200 OK */ SupplierQuotationDtoIEnumerablePaginateableRead;
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
  /** status 200 OK */ SupplierQuotationDtoRead;
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
export type PostApiV1RequisitionSourceQuotationProcessPurchaseOrderApiResponse =
  unknown;
export type PostApiV1RequisitionSourceQuotationProcessPurchaseOrderApiArg = {
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
export type PostApiV1UserApiResponse = unknown;
export type PostApiV1UserApiArg = {
  createUserRequest: CreateUserRequest;
};
export type GetApiV1UserApiResponse =
  /** status 200 OK */ UserDtoIEnumerablePaginateable;
export type GetApiV1UserApiArg = {
  page?: number;
  pageSize?: number;
  roleNames?: string;
  searchQuery?: string;
  "with-disabled"?: boolean;
};
export type PostApiV1UserSignUpApiResponse = unknown;
export type PostApiV1UserSignUpApiArg = {
  createClientRequest: CreateClientRequest;
};
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
  /** status 200 OK */ WarehouseLocationDto;
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
  /** status 200 OK */ WarehouseLocationDtoIEnumerablePaginateable;
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
  /** status 200 OK */ WarehouseLocationRackDto;
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
  /** status 200 OK */ WarehouseLocationRackDtoIEnumerablePaginateable;
export type GetApiV1WarehouseRackApiArg = {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
};
export type PostApiV1WarehouseByRackIdShelfApiResponse =
  /** status 200 OK */ string;
export type PostApiV1WarehouseByRackIdShelfApiArg = {
  rackId: string;
  createWarehouseLocationShelfRequest: CreateWarehouseLocationShelfRequest;
};
export type GetApiV1WarehouseShelfByShelfIdApiResponse =
  /** status 200 OK */ WarehouseLocationShelfDto;
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
  /** status 200 OK */ WarehouseLocationShelfDtoIEnumerablePaginateable;
export type GetApiV1WarehouseShelfApiArg = {
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
export type ProblemDetails = {
  type?: string | null;
  title?: string | null;
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
};
export type RequisitionType = 0 | 1;
export type CreateApprovalStageRequest = {
  userId?: string | null;
  roleId?: string | null;
  required?: boolean;
  order?: number;
};
export type CreateApprovalRequest = {
  requisitionType?: RequisitionType;
  approvalStages?: CreateApprovalStageRequest[] | null;
};
export type CollectionItemDto = {
  id?: string | null;
  name?: string | null;
  code?: string | null;
  description?: string | null;
};
export type ApprovalStageDto = {
  user?: CollectionItemDto;
  role?: CollectionItemDto;
  required?: boolean;
  order?: number;
};
export type ApprovalDto = {
  id?: string;
  requisitionType?: RequisitionType;
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
  componentMaterialId?: string | null;
  componentProductId?: string | null;
  uoMId?: string | null;
  isSubstitutable?: boolean;
  materialTypeId?: string | null;
  grade?: string | null;
  casNumber?: string | null;
  function?: string | null;
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
export type CreateItemRequest = {
  name?: string | null;
  description?: string | null;
  type?: string | null;
  isAvailable?: boolean;
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
export type CreateDepartmentRequest = {
  code?: string | null;
  name?: string | null;
  description?: string | null;
  warehouseId?: string | null;
};
export type WarehouseType = 0 | 1;
export type WareHouseLocationDto = {
  id?: string;
  name?: string | null;
  floorName?: string | null;
  description?: string | null;
  warehouse?: CollectionItemDto;
};
export type WarehouseLocationShelfDto = {
  id?: string;
  warehouseLocationRack?: CollectionItemDto;
  code?: string | null;
  name?: string | null;
  description?: string | null;
};
export type WarehouseLocationRackDto = {
  id?: string;
  warehouseLocation?: WareHouseLocationDto;
  name?: string | null;
  description?: string | null;
  shelves?: WarehouseLocationShelfDto[] | null;
};
export type WarehouseLocationDto = {
  id?: string;
  name?: string | null;
  floorName?: string | null;
  description?: string | null;
  warehouse?: CollectionItemDto;
  racks?: WarehouseLocationRackDto[] | null;
};
export type WarehouseDto = {
  id?: string;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  type?: WarehouseType;
  locations?: WarehouseLocationDto[] | null;
};
export type DepartmentDto = {
  id?: string;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  warehouse?: WarehouseDto;
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
export type MaterialKind = 0 | 1;
export type CreateMaterialRequest = {
  code?: string | null;
  name?: string | null;
  pharmacopoeia?: string | null;
  description?: string | null;
  materialCategoryId?: string | null;
  kind?: MaterialKind;
};
export type BatchStatus = 0 | 1 | 2 | 3 | 4 | 5;
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
  createdBy?: CollectionItemDto;
  createdAt?: string;
  batch?: CollectionItemDto;
  fromLocation?: CollectionItemDto;
  toLocation?: CollectionItemDto;
  quantity?: number;
  movedAt?: string;
  movedBy?: CollectionItemDto;
  movementType?: MovementType;
};
export type CurrentLocationDto = {
  locationName?: string | null;
  quantityAtLocation?: number;
};
export type MaterialBatchDto = {
  id?: string;
  code?: string | null;
  uoM?: CollectionItemDto;
  status?: BatchStatus;
  dateReceived?: string;
  dateApproved?: string | null;
  totalQuantity?: number;
  consumedQuantity?: number;
  remainingQuantity?: number;
  expiryDate?: string;
  events?: MaterialBatchEventDto[] | null;
  movements?: MaterialBatchMovementDto[] | null;
  locations?: CurrentLocationDto[] | null;
};
export type MaterialDto = {
  id?: string;
  code?: string | null;
  pharmacopoeia?: string | null;
  name?: string | null;
  description?: string | null;
  kind?: MaterialKind;
  materialCategory?: CollectionItemDto;
  batches?: MaterialBatchDto[] | null;
};
export type MaterialDtoRead = {
  id?: string;
  code?: string | null;
  pharmacopoeia?: string | null;
  name?: string | null;
  description?: string | null;
  kind?: MaterialKind;
  materialCategory?: CollectionItemDto;
  batches?: MaterialBatchDto[] | null;
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
export type MaterialDtoIEnumerablePaginateableRead = {
  data?: MaterialDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateMaterialBatchRequest = {
  materialId?: string;
  quantity?: number;
  initialLocationId?: string;
  dateReceived?: string;
  expiryDate?: string;
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
export type WarehouseStockDto = {
  warehouse?: WarehouseDto;
  stockQuantity?: number;
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
export type CountryDto = {
  id?: string;
  name?: string | null;
  nationality?: string | null;
  code?: string | null;
};
export type ManufacturerMaterialDto = {
  material?: CollectionItemDto;
};
export type ManufacturerDto = {
  id?: string;
  createdBy?: CollectionItemDto;
  createdAt?: string;
  name?: string | null;
  address?: string | null;
  email?: string | null;
  approvedAt?: string | null;
  validityDate?: string | null;
  country?: CountryDto;
  materials?: ManufacturerMaterialDto[] | null;
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
export type SupplierType = 0 | 1;
export type CreateSupplierManufacturerRequest = {
  manufacturerId?: string;
  materialId?: string | null;
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
export type CurrencyDto = {
  name?: string | null;
  symbol?: string | null;
  description?: string | null;
};
export type SupplierManufacturerDto = {
  id?: string;
  createdBy?: CollectionItemDto;
  createdAt?: string;
  manufacturer?: ManufacturerDto;
  material?: MaterialDto;
};
export type SupplierManufacturerDtoRead = {
  id?: string;
  createdBy?: CollectionItemDto;
  createdAt?: string;
  manufacturer?: ManufacturerDto;
  material?: MaterialDtoRead;
};
export type SupplierDto = {
  id?: string;
  createdBy?: CollectionItemDto;
  createdAt?: string;
  name?: string | null;
  email?: string | null;
  address?: string | null;
  contactPerson?: string | null;
  contactNumber?: string | null;
  country?: CountryDto;
  currency?: CurrencyDto;
  type?: SupplierType;
  associatedManufacturers?: SupplierManufacturerDto[] | null;
};
export type SupplierDtoRead = {
  id?: string;
  createdBy?: CollectionItemDto;
  createdAt?: string;
  name?: string | null;
  email?: string | null;
  address?: string | null;
  contactPerson?: string | null;
  contactNumber?: string | null;
  country?: CountryDto;
  currency?: CurrencyDto;
  type?: SupplierType;
  associatedManufacturers?: SupplierManufacturerDtoRead[] | null;
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
export type SupplierDtoIEnumerablePaginateableRead = {
  data?: SupplierDtoRead[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreatePurchaseOrderItemRequest = {
  materialId?: string;
  uomId?: string;
  quantity?: number;
  price?: number;
};
export type CreatePurchaseOrderRequest = {
  supplierId?: string;
  requestDate?: string;
  expectedDeliveryDate?: string | null;
  items?: CreatePurchaseOrderItemRequest[] | null;
};
export type AttachmentDto = {
  link?: string | null;
  name?: string | null;
  id?: string;
  reference?: string | null;
};
export type PurchaseOrderItemDto = {
  purchaseOrder?: CollectionItemDto;
  material?: CollectionItemDto;
  uom?: CollectionItemDto;
  quantity?: number;
  price?: number;
  currency?: CollectionItemDto;
};
export type PurchaseOrderItemDtoRead = {
  purchaseOrder?: CollectionItemDto;
  material?: CollectionItemDto;
  uom?: CollectionItemDto;
  quantity?: number;
  price?: number;
  currency?: CollectionItemDto;
  cost?: number;
};
export type PurchaseOrderStatus = 0 | 1 | 2 | 3;
export type PurchaseOrderDto = {
  attachments?: AttachmentDto[] | null;
  id?: string;
  supplier?: CollectionItemDto;
  requestDate?: string;
  expectedDeliveryDate?: string | null;
  items?: PurchaseOrderItemDto[] | null;
  status?: PurchaseOrderStatus;
  createdAt?: string;
};
export type PurchaseOrderDtoRead = {
  attachments?: AttachmentDto[] | null;
  id?: string;
  supplier?: CollectionItemDto;
  requestDate?: string;
  expectedDeliveryDate?: string | null;
  items?: PurchaseOrderItemDtoRead[] | null;
  status?: PurchaseOrderStatus;
  createdAt?: string;
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
export type CreateBatchItemRequest = {
  batchNumber?: string | null;
  manufacturerId?: string;
  quantity?: number;
};
export type CreateChargeRequest = {
  description?: string | null;
  amount?: number;
  currencyId?: string | null;
};
export type CreatePurchaseOrderInvoiceRequest = {
  code?: string | null;
  purchaseOrderId?: string;
  batchItems?: CreateBatchItemRequest[] | null;
  charges?: CreateChargeRequest[] | null;
};
export type BatchItemDto = {
  batchNumber?: string | null;
  purchaseOrderInvoice?: CollectionItemDto;
  manufacturer?: CollectionItemDto;
  quantity?: number;
};
export type ChargeDto = {
  purchaseOrderInvoice?: PurchaseOrderInvoiceDto;
  description?: string | null;
  currency?: CollectionItemDto;
  amount?: number;
};
export type PurchaseOrderInvoiceDto = {
  id?: string;
  createdBy?: CollectionItemDto;
  createdAt?: string;
  code?: string | null;
  purchaseOrder?: CollectionItemDto;
  batchItems?: BatchItemDto[] | null;
  charges?: ChargeDto[] | null;
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
export type CreateBillingSheetRequest = {
  code?: string | null;
  billOfLading?: string | null;
  supplierId?: string;
  invoiceId?: string;
  expectedArrivalDate?: string;
  freeTimeExpiryDate?: string;
  freeTimeDuration?: string;
  demurrageStartDate?: string;
  containerNumber?: string | null;
  numberOfPackages?: string | null;
  packageDescription?: string | null;
};
export type BillingSheetDto = {
  attachments?: AttachmentDto[] | null;
  id?: string;
  code?: string | null;
  billOfLading?: string | null;
  supplier?: CollectionItemDto;
  invoice?: CollectionItemDto;
  expectedArrivalDate?: string;
  freeTimeExpiryDate?: string;
  freeTimeDuration?: string;
  demurrageStartDate?: string;
  containerNumber?: string | null;
  numberOfPackages?: string | null;
  packageDescription?: string | null;
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
  categoryId?: string;
  finishedProducts?: CreateFinishedProductRequest[] | null;
};
export type ProductListDto = {
  id?: string;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  category?: CollectionItemDto;
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
export type FinishedProductDto = {
  name?: string | null;
  product?: CollectionItemDto;
  uoM?: CollectionItemDto;
  standardCost?: number;
  sellingPrice?: number;
  dosageForm?: string | null;
  strength?: string | null;
};
export type BillOfMaterialItemDto = {
  id?: string;
  componentMaterial?: CollectionItemDto;
  componentProduct?: CollectionItemDto;
  materialType?: CollectionItemDto;
  quantity?: number;
  uoM?: CollectionItemDto;
  isSubstitutable?: boolean;
  grade?: string | null;
  casNumber?: string | null;
  function?: string | null;
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
  packageType?: CollectionItemDto;
  materialThickness?: string | null;
  otherStandards?: string | null;
  uoM?: CollectionItemDto;
};
export type RouteDto = {
  operation?: CollectionItemDto;
  workCenter?: CollectionItemDto;
  estimatedTime?: string | null;
  order?: number;
};
export type RouteDtoRead = {
  operation?: CollectionItemDto;
  workCenter?: CollectionItemDto;
  estimatedTime?: string | null;
  resources?: CollectionItemDto[] | null;
  order?: number;
};
export type ProductDto = {
  id?: string;
  code?: string | null;
  name?: string | null;
  description?: string | null;
  category?: CollectionItemDto;
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
  category?: CollectionItemDto;
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
  categoryId?: string;
  finishedProducts?: CreateFinishedProductRequest[] | null;
};
export type CreateRouteRequest = {
  operationId?: string;
  workCenterId?: string;
  estimatedTime?: string | null;
  resourceIds?: string[] | null;
  order?: number;
};
export type CreateProductPackageRequest = {
  materialId: string;
  packageTypeId: string;
  materialThickness?: string | null;
  otherStandards?: string | null;
  uoMId?: string | null;
};
export type ProductionStatus = 0 | 1 | 2 | 3 | 4;
export type CreateMasterProductionScheduleRequest = {
  productId?: string;
  plannedStartDate?: string;
  plannedEndDate?: string;
  plannedQuantity?: number;
  status?: ProductionStatus;
};
export type ResourceDto = {
  id?: string | null;
  name?: string | null;
  type?: string | null;
  isAvailable?: boolean;
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
  createdBy?: CollectionItemDto;
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
export type MasterProductionScheduleDto = {
  product?: CollectionItemDto;
  plannedStartDate?: string;
  plannedEndDate?: string;
  plannedQuantity?: number;
  status?: ProductionStatus;
  workOrders?: WorkOrderDto[] | null;
};
export type UpdateMasterProductionScheduleRequest = object;
export type MasterProductionScheduleDtoIEnumerablePaginateable = {
  data?: MasterProductionScheduleDto[] | null;
  pageIndex?: number;
  pageCount?: number;
  totalRecordCount?: number;
  numberOfPagesToShow?: number;
  startPageIndex?: number;
  stopPageIndex?: number;
};
export type CreateProductionScheduleItemRequest = {
  materialId?: string;
  uomId?: string | null;
  quantity?: number;
};
export type CreateProductionScheduleRequest = {
  code?: string | null;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  productId?: string | null;
  status?: ProductionStatus;
  quantity?: number;
  remarks?: string | null;
  items?: CreateProductionScheduleItemRequest[] | null;
};
export type ProductionScheduleItemDto = {
  id?: string;
  createdBy?: CollectionItemDto;
  createdAt?: string;
  material?: CollectionItemDto;
  uoM?: CollectionItemDto;
  quantity?: number;
};
export type ProductionScheduleDto = {
  id?: string;
  createdBy?: CollectionItemDto;
  createdAt?: string;
  code?: string | null;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  product?: ProductDto;
  status?: ProductionStatus;
  quantity?: number;
  remarks?: string | null;
  items?: ProductionScheduleItemDto[] | null;
};
export type ProductionScheduleDtoRead = {
  id?: string;
  createdBy?: CollectionItemDto;
  createdAt?: string;
  code?: string | null;
  scheduledStartTime?: string;
  scheduledEndTime?: string;
  product?: ProductDtoRead;
  status?: ProductionStatus;
  quantity?: number;
  remarks?: string | null;
  items?: ProductionScheduleItemDto[] | null;
};
export type UpdateProductionScheduleRequest = object;
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
export type ProductionScheduleProcurementDto = {
  material?: MaterialDto;
  uoM?: CollectionItemDto;
  quantityRequested?: number;
  quantityOnHand?: number;
};
export type ProductionScheduleProcurementDtoRead = {
  material?: MaterialDtoRead;
  uoM?: CollectionItemDto;
  quantityRequested?: number;
  quantityOnHand?: number;
};
export type CreateRequisitionItemRequest = {
  materialId?: string;
  quantity?: number;
  uomId?: string | null;
};
export type CreateRequisitionRequest = {
  code?: string | null;
  requisitionType?: RequisitionType;
  comments?: string | null;
  expectedDelivery?: string | null;
  items?: CreateRequisitionItemRequest[] | null;
};
export type UserDto = {
  id?: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  avatar?: string | null;
  department?: DepartmentDto;
};
export type RequisitionItemDto = {
  material?: MaterialDto;
  uoM?: CollectionItemDto;
  quantity?: number;
};
export type RequisitionItemDtoRead = {
  material?: MaterialDtoRead;
  uoM?: CollectionItemDto;
  quantity?: number;
};
export type RoleDto = {
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
export type RequestStatus = 0 | 1 | 2 | 3;
export type RequisitionDto = {
  id?: string;
  code?: string | null;
  requisitionType?: RequisitionType;
  requestedBy?: UserDto;
  items?: RequisitionItemDto[] | null;
  approved?: boolean;
  approvals?: RequisitionApprovalDto[] | null;
  expectedDelivery?: string | null;
  createdAt?: string;
  status?: RequestStatus;
  comments?: string | null;
};
export type RequisitionDtoRead = {
  id?: string;
  code?: string | null;
  requisitionType?: RequisitionType;
  requestedBy?: UserDto;
  items?: RequisitionItemDtoRead[] | null;
  approved?: boolean;
  approvals?: RequisitionApprovalDto[] | null;
  expectedDelivery?: string | null;
  createdAt?: string;
  status?: RequestStatus;
  comments?: string | null;
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
export type ProcurementSource = 0 | 1 | 2;
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
export type SourceRequisitionItemSupplierDto = {
  supplier?: CollectionItemDto;
  sentQuotationRequestAt?: string | null;
  supplierQuotedPrice?: number | null;
};
export type SourceRequisitionItemDto = {
  id?: string;
  sourceRequisition?: CollectionItemDto;
  material?: CollectionItemDto;
  uoM?: CollectionItemDto;
  quantity?: number;
  source?: ProcurementSource;
  suppliers?: SourceRequisitionItemSupplierDto[] | null;
  createdAt?: string;
};
export type SourceRequisitionDto = {
  attachments?: AttachmentDto[] | null;
  id?: string;
  code?: string | null;
  requisition?: CollectionItemDto;
  items?: SourceRequisitionItemDto[] | null;
  createdAt?: string;
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
  uoM?: CollectionItemDto;
  quantity?: number;
  quotedPrice?: number | null;
};
export type SupplierQuotationDto = {
  id?: string;
  supplier?: SupplierDto;
  items?: SupplierQuotationItemDto[] | null;
  receivedQuotation?: boolean;
};
export type SupplierQuotationDtoRead = {
  id?: string;
  supplier?: SupplierDtoRead;
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
export type SupplierQuotationDtoIEnumerablePaginateableRead = {
  data?: SupplierQuotationDtoRead[] | null;
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
export type SupplierPrice = {
  supplier?: CollectionItemDto;
  price?: number | null;
};
export type SupplierPriceComparison = {
  material?: CollectionItemDto;
  uoM?: CollectionItemDto;
  quantity?: number;
  supplierQuotation?: SupplierPrice[] | null;
};
export type ProcessQuotation = {
  supplierId?: string;
  items?: CreatePurchaseOrderItemRequest[] | null;
};
export type CreateRoleRequest = {
  name: string;
  permissions?: string[] | null;
};
export type PermissionResponseDto = {
  groupName?: string | null;
  action?: string | null;
  description?: string | null;
};
export type RolePermissionDto = {
  id?: string;
  displayName?: string | null;
  name?: string | null;
  permissions?: PermissionResponseDto[] | null;
  users?: CollectionItemDto[] | null;
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
export type CreateUserRequest = {
  title?: string | null;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber?: string | null;
  departmentId?: string | null;
  avatar?: string | null;
};
export type CreateUserRequestRead = {
  title?: string | null;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phoneNumber?: string | null;
  departmentId?: string | null;
  avatar?: string | null;
  roleNames?: string[] | null;
};
export type UserDtoIEnumerablePaginateable = {
  data?: UserDto[] | null;
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
  employeeId?: string | null;
  dateOfBirth: string;
  nationality?: string | null;
  email: string;
  privateEmail?: string | null;
  phoneNumber: string;
  title?: string | null;
  sex?: string | null;
  directReportId?: string | null;
  employmentTypeId?: string | null;
  hiredOn: string;
  roleNames?: string[] | null;
  password?: string | null;
  avatar?: string | null;
};
export type UpdateUserRoleRequest = {
  roleNames?: string[] | null;
};
export type UploadFileRequest = {
  file?: string | null;
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
  code?: string | null;
  description?: string | null;
  type?: WarehouseType;
  locations?: CreateWarehouseLocationRequest[] | null;
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
export type WarehouseLocationDtoIEnumerablePaginateable = {
  data?: WarehouseLocationDto[] | null;
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
export type WarehouseLocationShelfDtoIEnumerablePaginateable = {
  data?: WarehouseLocationShelfDto[] | null;
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
  usePostApiV1ApprovalMutation,
  useGetApiV1ApprovalQuery,
  useLazyGetApiV1ApprovalQuery,
  useGetApiV1ApprovalByApprovalIdQuery,
  useLazyGetApiV1ApprovalByApprovalIdQuery,
  usePutApiV1ApprovalByApprovalIdMutation,
  useDeleteApiV1ApprovalByApprovalIdMutation,
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
  usePostApiV1FileByModelTypeAndModelIdReferenceMutation,
  useGetApiV1FileByModelTypeAndModelIdReferenceQuery,
  useLazyGetApiV1FileByModelTypeAndModelIdReferenceQuery,
  usePostApiV1FileByModelTypeAndModelIdMutation,
  useDeleteApiV1FileByModelIdMutation,
  useDeleteApiV1FileByModelIdAndReferenceMutation,
  usePostApiV1MaterialMutation,
  useGetApiV1MaterialQuery,
  useLazyGetApiV1MaterialQuery,
  useGetApiV1MaterialByMaterialIdQuery,
  useLazyGetApiV1MaterialByMaterialIdQuery,
  usePutApiV1MaterialByMaterialIdMutation,
  useDeleteApiV1MaterialByMaterialIdMutation,
  useGetApiV1MaterialAllQuery,
  useLazyGetApiV1MaterialAllQuery,
  useGetApiV1MaterialByMaterialIdStockLevelQuery,
  useLazyGetApiV1MaterialByMaterialIdStockLevelQuery,
  usePostApiV1MaterialBatchMutation,
  useGetApiV1MaterialBatchQuery,
  useLazyGetApiV1MaterialBatchQuery,
  useGetApiV1MaterialBatchByBatchIdQuery,
  useLazyGetApiV1MaterialBatchByBatchIdQuery,
  usePostApiV1MaterialBatchMoveMutation,
  useGetApiV1MaterialByMaterialIdStockAndWarehouseIdQuery,
  useLazyGetApiV1MaterialByMaterialIdStockAndWarehouseIdQuery,
  usePostApiV1MaterialBatchConsumeMutation,
  useGetApiV1MaterialByMaterialIdStockAcrossWarehousesQuery,
  useLazyGetApiV1MaterialByMaterialIdStockAcrossWarehousesQuery,
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
  usePostApiV1ProcurementPurchaseOrderProformaInvoiceByPurchaseOrderIdMutation,
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
  usePostApiV1ProductMutation,
  useGetApiV1ProductQuery,
  useLazyGetApiV1ProductQuery,
  useGetApiV1ProductByProductIdQuery,
  useLazyGetApiV1ProductByProductIdQuery,
  usePutApiV1ProductByProductIdMutation,
  useDeleteApiV1ProductByProductIdMutation,
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
  usePostApiV1ProductionScheduleMasterMutation,
  useGetApiV1ProductionScheduleMasterByMasterScheduleIdQuery,
  useLazyGetApiV1ProductionScheduleMasterByMasterScheduleIdQuery,
  usePutApiV1ProductionScheduleMasterByMasterScheduleIdMutation,
  useDeleteApiV1ProductionScheduleMasterByMasterScheduleIdMutation,
  useGetApiV1ProductionScheduleMastersQuery,
  useLazyGetApiV1ProductionScheduleMastersQuery,
  usePostApiV1ProductionScheduleScheduleMutation,
  useGetApiV1ProductionScheduleScheduleByScheduleIdQuery,
  useLazyGetApiV1ProductionScheduleScheduleByScheduleIdQuery,
  usePutApiV1ProductionScheduleScheduleByScheduleIdMutation,
  useDeleteApiV1ProductionScheduleScheduleByScheduleIdMutation,
  useGetApiV1ProductionScheduleSchedulesQuery,
  useLazyGetApiV1ProductionScheduleSchedulesQuery,
  useGetApiV1ProductionScheduleProductionStatusQuery,
  useLazyGetApiV1ProductionScheduleProductionStatusQuery,
  useGetApiV1ProductionScheduleByScheduleIdDetailsQuery,
  useLazyGetApiV1ProductionScheduleByScheduleIdDetailsQuery,
  usePostApiV1RequisitionMutation,
  useGetApiV1RequisitionQuery,
  useLazyGetApiV1RequisitionQuery,
  useGetApiV1RequisitionByRequisitionIdQuery,
  useLazyGetApiV1RequisitionByRequisitionIdQuery,
  usePostApiV1RequisitionByRequisitionIdApproveMutation,
  usePostApiV1RequisitionByRequisitionIdProcessMutation,
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
  usePostApiV1UserMutation,
  useGetApiV1UserQuery,
  useLazyGetApiV1UserQuery,
  usePostApiV1UserSignUpMutation,
  usePutApiV1UserByIdMutation,
  useDeleteApiV1UserByIdMutation,
  usePutApiV1UserRoleByIdMutation,
  usePostApiV1UserAvatarByIdMutation,
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
  usePostApiV1WarehouseByRackIdShelfMutation,
  useGetApiV1WarehouseShelfByShelfIdQuery,
  useLazyGetApiV1WarehouseShelfByShelfIdQuery,
  usePutApiV1WarehouseShelfByShelfIdMutation,
  useDeleteApiV1WarehouseShelfByShelfIdMutation,
  useGetApiV1WarehouseShelfQuery,
  useLazyGetApiV1WarehouseShelfQuery,
  usePostApiV1WorkOrderMutation,
  useGetApiV1WorkOrderQuery,
  useLazyGetApiV1WorkOrderQuery,
  useGetApiV1WorkOrderByWorkOrderIdQuery,
  useLazyGetApiV1WorkOrderByWorkOrderIdQuery,
  usePutApiV1WorkOrderByWorkOrderIdMutation,
  useDeleteApiV1WorkOrderByWorkOrderIdMutation,
} = injectedRtkApi;
