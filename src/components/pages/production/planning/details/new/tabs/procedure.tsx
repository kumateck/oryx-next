// import { sanitizeNumber } from "@/lib";
// import { RouteDtoRead } from "@/lib/redux/api/openapi.generated";

// export const ProcedureTab: React.FC<{ routes?: RouteDtoRead[] | null }> = ({
//   routes,
// }) => (
//   <div className="space-y-6">
//     <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
//       <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
//         <h3 className="text-lg font-semibold text-gray-900">
//           Production Routes
//         </h3>
//       </div>
//       <div className="p-6 space-y-4">
//         {routes
//           ?.sort((a, b) => sanitizeNumber(a?.order) - sanitizeNumber(b?.order))
//           ?.map((route) => (
//             <div
//               key={route.id}
//               className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
//             >
//               <div className="flex items-start gap-4">
//                 <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                   <span className="text-sm font-semibold text-blue-700">
//                     {route?.order}
//                   </span>
//                 </div>
//                 <div className="flex-1">
//                   <h4 className="font-medium text-gray-900 mb-2">
//                     {route?.operation?.name}
//                   </h4>
//                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
//                     <div>
//                       <span className="text-gray-500 font-medium">
//                         Work Centers:
//                       </span>
//                       <div className="flex flex-wrap gap-1 mt-1">
//                         {route?.workCenters?.map((wc, wcIdx) => (
//                           <span
//                             key={wcIdx}
//                             className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
//                           >
//                             {wc?.workCenter?.name}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                     <div>
//                       <span className="text-gray-500 font-medium">
//                         Resources:
//                       </span>
//                       <div className="flex flex-wrap gap-1 mt-1">
//                         {route?.resources?.map((res, resIdx) => (
//                           <span
//                             key={resIdx}
//                             className="inline-flex px-2 py-1 text-xs bg-green-100 text-green-700 rounded"
//                           >
//                             {res?.resource?.name}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                     <div>
//                       <span className="text-gray-500 font-medium">
//                         Responsible Roles:
//                       </span>
//                       <div className="flex flex-wrap gap-1 mt-1">
//                         {route?.responsibleRoles?.map((role, roleIdx) => (
//                           <span
//                             key={roleIdx}
//                             className="inline-flex px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded"
//                           >
//                             {role?.role?.name}
//                           </span>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   </div>
// );

import { sanitizeNumber } from "@/lib";
import { RouteDtoRead } from "@/lib/redux/api/openapi.generated";
import { Clock, Users, Settings, MapPin } from "lucide-react";

export const ProcedureTab: React.FC<{ routes?: RouteDtoRead[] | null }> = ({
  routes,
}) => (
  <div className="space-y-6">
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          Production Routes
        </h3>
      </div>
      <div className="p-6 space-y-4">
        {routes && routes.length > 0 ? (
          [...routes] // Create a copy of the array before sorting
            .sort((a, b) => sanitizeNumber(a?.order) - sanitizeNumber(b?.order))
            .map((route) => (
              <div
                key={route.id}
                className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-md transition-all duration-200 bg-white"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-sm font-bold text-blue-700">
                      {route?.order}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-3 text-lg">
                      {route?.operation?.name}
                    </h4>

                    {route?.operation?.description && (
                      <p className="text-gray-600 mb-4 text-sm">
                        {route.operation.description}
                      </p>
                    )}

                    {route?.estimatedTime && route.estimatedTime !== "0" && (
                      <div className="flex items-center gap-1 mb-4 text-sm text-gray-600">
                        <Clock className="w-4 h-4" />
                        <span>Estimated Time: {route.estimatedTime}</span>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 font-medium">
                            Work Centers:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {route?.workCenters &&
                          route.workCenters.length > 0 ? (
                            route.workCenters.map((wc, wcIdx) => (
                              <span
                                key={wcIdx}
                                className="inline-flex px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full border"
                              >
                                {wc?.workCenter?.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs">
                              No work centers assigned
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Settings className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 font-medium">
                            Resources:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {route?.resources && route.resources.length > 0 ? (
                            route.resources.map((res, resIdx) => (
                              <span
                                key={resIdx}
                                className="inline-flex px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full border border-green-200"
                              >
                                {res?.resource?.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs">
                              No resources assigned
                            </span>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-700 font-medium">
                            Responsible Roles:
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {route?.responsibleRoles &&
                          route.responsibleRoles.length > 0 ? (
                            route.responsibleRoles.map((role, roleIdx) => (
                              <span
                                key={roleIdx}
                                className="inline-flex px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full border border-purple-200"
                              >
                                {role?.role?.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400 text-xs">
                              No roles assigned
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
        ) : (
          <div className="text-center py-12">
            <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">
              No production routes available
            </p>
            <p className="text-gray-400 text-sm">
              Routes will appear here once they are configured
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);
