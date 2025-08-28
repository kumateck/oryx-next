import type { ConfigFile } from "@rtk-query/codegen-openapi";

const config: ConfigFile = {
  schemaFile: `http://164.90.142.68:8080/swagger/v1/swagger.yml`,
  apiFile: "./index.ts",
  apiImport: "api",
  outputFile: "openapi.generated.ts",
  exportName: "api",
  hooks: {
    queries: true,
    lazyQueries: true,
    mutations: true,
  },
  // tag: true,
};

export default config;
