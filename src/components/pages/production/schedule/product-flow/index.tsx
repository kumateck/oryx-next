// // "use client";
// // import {
// //   Background,
// //   ReactFlow,
// //   addEdge,
// //   useEdgesState,
// //   useNodesState,
// // } from "@xyflow/react";
// // import "@xyflow/react/dist/style.css";
// // import React, { useCallback } from "react";
// // const initialNodes: any = [
// //   {
// //     id: "horizontal-1",
// //     sourcePosition: "right",
// //     type: "input",
// //     data: { label: "Stage 1" },
// //     position: { x: 0, y: 80 },
// //   },
// //   {
// //     id: "horizontal-2",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Stage 2" },
// //     position: { x: 250, y: 0 },
// //   },
// //   {
// //     id: "horizontal-3",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Stage 3" },
// //     position: { x: 250, y: 160 },
// //   },
// //   {
// //     id: "horizontal-4",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Stage 4" },
// //     position: { x: 500, y: 0 },
// //   },
// //   {
// //     id: "horizontal-5",
// //     sourcePosition: "top",
// //     targetPosition: "bottom",
// //     data: { label: "Stage 5" },
// //     position: { x: 500, y: 100 },
// //   },
// //   {
// //     id: "horizontal-6",
// //     sourcePosition: "bottom",
// //     targetPosition: "top",
// //     data: { label: "Stage 6" },
// //     position: { x: 500, y: 230 },
// //   },
// //   {
// //     id: "horizontal-7",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Node 7" },
// //     position: { x: 750, y: 50 },
// //   },
// //   {
// //     id: "horizontal-8",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Node 8" },
// //     position: { x: 750, y: 300 },
// //   },
// // ];
// // const initialEdges = [
// //   {
// //     id: "horizontal-e1-2",
// //     source: "horizontal-1",
// //     type: "smoothstep",
// //     target: "horizontal-2",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e1-3",
// //     source: "horizontal-1",
// //     type: "smoothstep",
// //     target: "horizontal-3",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e1-4",
// //     source: "horizontal-2",
// //     type: "smoothstep",
// //     target: "horizontal-4",
// //     // label: "edge label",
// //   },
// //   {
// //     id: "horizontal-e3-5",
// //     source: "horizontal-3",
// //     type: "smoothstep",
// //     target: "horizontal-5",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e3-6",
// //     source: "horizontal-3",
// //     type: "smoothstep",
// //     target: "horizontal-6",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e5-7",
// //     source: "horizontal-5",
// //     type: "smoothstep",
// //     target: "horizontal-7",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e6-8",
// //     source: "horizontal-6",
// //     type: "smoothstep",
// //     target: "horizontal-8",
// //     animated: true,
// //   },
// // ];
// // const Page = () => {
// //   const [nodes, _, onNodesChange] = useNodesState(initialNodes);
// //   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
// //   const onConnect = useCallback(
// //     (params) => setEdges((els) => addEdge(params, els)),
// //     [],
// //   );
// //   return (
// //     <div>
// //       Flow Page
// //       <div className="h-svh w-full">
// //         <ReactFlow
// //           nodes={nodes}
// //           edges={edges}
// //           onNodesChange={onNodesChange}
// //           onEdgesChange={onEdgesChange}
// //           onConnect={onConnect}
// //           fitView
// //           attributionPosition="bottom-left"
// //           style={{ backgroundColor: "#F7F9FB" }}
// //         >
// //           <Background />
// //         </ReactFlow>
// //       </div>
// //     </div>
// //   );
// // };
// // export default Page;
// "use client";
// import React, { useState } from "react";
// import ReactFlow, { Background, Controls, MiniMap } from "react-flow-renderer";
// import CustomNode from "./custom";
// // "use client";
// // import {
// //   Background,
// //   ReactFlow,
// //   addEdge,
// //   useEdgesState,
// //   useNodesState,
// // } from "@xyflow/react";
// // import "@xyflow/react/dist/style.css";
// // import React, { useCallback } from "react";
// // const initialNodes: any = [
// //   {
// //     id: "horizontal-1",
// //     sourcePosition: "right",
// //     type: "input",
// //     data: { label: "Stage 1" },
// //     position: { x: 0, y: 80 },
// //   },
// //   {
// //     id: "horizontal-2",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Stage 2" },
// //     position: { x: 250, y: 0 },
// //   },
// //   {
// //     id: "horizontal-3",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Stage 3" },
// //     position: { x: 250, y: 160 },
// //   },
// //   {
// //     id: "horizontal-4",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Stage 4" },
// //     position: { x: 500, y: 0 },
// //   },
// //   {
// //     id: "horizontal-5",
// //     sourcePosition: "top",
// //     targetPosition: "bottom",
// //     data: { label: "Stage 5" },
// //     position: { x: 500, y: 100 },
// //   },
// //   {
// //     id: "horizontal-6",
// //     sourcePosition: "bottom",
// //     targetPosition: "top",
// //     data: { label: "Stage 6" },
// //     position: { x: 500, y: 230 },
// //   },
// //   {
// //     id: "horizontal-7",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Node 7" },
// //     position: { x: 750, y: 50 },
// //   },
// //   {
// //     id: "horizontal-8",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Node 8" },
// //     position: { x: 750, y: 300 },
// //   },
// // ];
// // const initialEdges = [
// //   {
// //     id: "horizontal-e1-2",
// //     source: "horizontal-1",
// //     type: "smoothstep",
// //     target: "horizontal-2",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e1-3",
// //     source: "horizontal-1",
// //     type: "smoothstep",
// //     target: "horizontal-3",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e1-4",
// //     source: "horizontal-2",
// //     type: "smoothstep",
// //     target: "horizontal-4",
// //     // label: "edge label",
// //   },
// //   {
// //     id: "horizontal-e3-5",
// //     source: "horizontal-3",
// //     type: "smoothstep",
// //     target: "horizontal-5",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e3-6",
// //     source: "horizontal-3",
// //     type: "smoothstep",
// //     target: "horizontal-6",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e5-7",
// //     source: "horizontal-5",
// //     type: "smoothstep",
// //     target: "horizontal-7",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e6-8",
// //     source: "horizontal-6",
// //     type: "smoothstep",
// //     target: "horizontal-8",
// //     animated: true,
// //   },
// // ];
// // const Page = () => {
// //   const [nodes, _, onNodesChange] = useNodesState(initialNodes);
// //   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
// //   const onConnect = useCallback(
// //     (params) => setEdges((els) => addEdge(params, els)),
// //     [],
// //   );
// //   return (
// //     <div>
// //       Flow Page
// //       <div className="h-svh w-full">
// //         <ReactFlow
// //           nodes={nodes}
// //           edges={edges}
// //           onNodesChange={onNodesChange}
// //           onEdgesChange={onEdgesChange}
// //           onConnect={onConnect}
// //           fitView
// //           attributionPosition="bottom-left"
// //           style={{ backgroundColor: "#F7F9FB" }}
// //         >
// //           <Background />
// //         </ReactFlow>
// //       </div>
// //     </div>
// //   );
// // };
// // export default Page;
// // "use client";
// // import {
// //   Background,
// //   ReactFlow,
// //   addEdge,
// //   useEdgesState,
// //   useNodesState,
// // } from "@xyflow/react";
// // import "@xyflow/react/dist/style.css";
// // import React, { useCallback } from "react";
// // const initialNodes: any = [
// //   {
// //     id: "horizontal-1",
// //     sourcePosition: "right",
// //     type: "input",
// //     data: { label: "Stage 1" },
// //     position: { x: 0, y: 80 },
// //   },
// //   {
// //     id: "horizontal-2",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Stage 2" },
// //     position: { x: 250, y: 0 },
// //   },
// //   {
// //     id: "horizontal-3",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Stage 3" },
// //     position: { x: 250, y: 160 },
// //   },
// //   {
// //     id: "horizontal-4",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Stage 4" },
// //     position: { x: 500, y: 0 },
// //   },
// //   {
// //     id: "horizontal-5",
// //     sourcePosition: "top",
// //     targetPosition: "bottom",
// //     data: { label: "Stage 5" },
// //     position: { x: 500, y: 100 },
// //   },
// //   {
// //     id: "horizontal-6",
// //     sourcePosition: "bottom",
// //     targetPosition: "top",
// //     data: { label: "Stage 6" },
// //     position: { x: 500, y: 230 },
// //   },
// //   {
// //     id: "horizontal-7",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Node 7" },
// //     position: { x: 750, y: 50 },
// //   },
// //   {
// //     id: "horizontal-8",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Node 8" },
// //     position: { x: 750, y: 300 },
// //   },
// // ];
// // const initialEdges = [
// //   {
// //     id: "horizontal-e1-2",
// //     source: "horizontal-1",
// //     type: "smoothstep",
// //     target: "horizontal-2",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e1-3",
// //     source: "horizontal-1",
// //     type: "smoothstep",
// //     target: "horizontal-3",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e1-4",
// //     source: "horizontal-2",
// //     type: "smoothstep",
// //     target: "horizontal-4",
// //     // label: "edge label",
// //   },
// //   {
// //     id: "horizontal-e3-5",
// //     source: "horizontal-3",
// //     type: "smoothstep",
// //     target: "horizontal-5",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e3-6",
// //     source: "horizontal-3",
// //     type: "smoothstep",
// //     target: "horizontal-6",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e5-7",
// //     source: "horizontal-5",
// //     type: "smoothstep",
// //     target: "horizontal-7",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e6-8",
// //     source: "horizontal-6",
// //     type: "smoothstep",
// //     target: "horizontal-8",
// //     animated: true,
// //   },
// // ];
// // const Page = () => {
// //   const [nodes, _, onNodesChange] = useNodesState(initialNodes);
// //   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
// //   const onConnect = useCallback(
// //     (params) => setEdges((els) => addEdge(params, els)),
// //     [],
// //   );
// //   return (
// //     <div>
// //       Flow Page
// //       <div className="h-svh w-full">
// //         <ReactFlow
// //           nodes={nodes}
// //           edges={edges}
// //           onNodesChange={onNodesChange}
// //           onEdgesChange={onEdgesChange}
// //           onConnect={onConnect}
// //           fitView
// //           attributionPosition="bottom-left"
// //           style={{ backgroundColor: "#F7F9FB" }}
// //         >
// //           <Background />
// //         </ReactFlow>
// //       </div>
// //     </div>
// //   );
// // };
// // export default Page;
// // "use client";
// // import {
// //   Background,
// //   ReactFlow,
// //   addEdge,
// //   useEdgesState,
// //   useNodesState,
// // } from "@xyflow/react";
// // import "@xyflow/react/dist/style.css";
// // import React, { useCallback } from "react";
// // const initialNodes: any = [
// //   {
// //     id: "horizontal-1",
// //     sourcePosition: "right",
// //     type: "input",
// //     data: { label: "Stage 1" },
// //     position: { x: 0, y: 80 },
// //   },
// //   {
// //     id: "horizontal-2",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Stage 2" },
// //     position: { x: 250, y: 0 },
// //   },
// //   {
// //     id: "horizontal-3",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Stage 3" },
// //     position: { x: 250, y: 160 },
// //   },
// //   {
// //     id: "horizontal-4",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Stage 4" },
// //     position: { x: 500, y: 0 },
// //   },
// //   {
// //     id: "horizontal-5",
// //     sourcePosition: "top",
// //     targetPosition: "bottom",
// //     data: { label: "Stage 5" },
// //     position: { x: 500, y: 100 },
// //   },
// //   {
// //     id: "horizontal-6",
// //     sourcePosition: "bottom",
// //     targetPosition: "top",
// //     data: { label: "Stage 6" },
// //     position: { x: 500, y: 230 },
// //   },
// //   {
// //     id: "horizontal-7",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Node 7" },
// //     position: { x: 750, y: 50 },
// //   },
// //   {
// //     id: "horizontal-8",
// //     sourcePosition: "right",
// //     targetPosition: "left",
// //     data: { label: "Node 8" },
// //     position: { x: 750, y: 300 },
// //   },
// // ];
// // const initialEdges = [
// //   {
// //     id: "horizontal-e1-2",
// //     source: "horizontal-1",
// //     type: "smoothstep",
// //     target: "horizontal-2",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e1-3",
// //     source: "horizontal-1",
// //     type: "smoothstep",
// //     target: "horizontal-3",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e1-4",
// //     source: "horizontal-2",
// //     type: "smoothstep",
// //     target: "horizontal-4",
// //     // label: "edge label",
// //   },
// //   {
// //     id: "horizontal-e3-5",
// //     source: "horizontal-3",
// //     type: "smoothstep",
// //     target: "horizontal-5",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e3-6",
// //     source: "horizontal-3",
// //     type: "smoothstep",
// //     target: "horizontal-6",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e5-7",
// //     source: "horizontal-5",
// //     type: "smoothstep",
// //     target: "horizontal-7",
// //     animated: true,
// //   },
// //   {
// //     id: "horizontal-e6-8",
// //     source: "horizontal-6",
// //     type: "smoothstep",
// //     target: "horizontal-8",
// //     animated: true,
// //   },
// // ];
// // const Page = () => {
// //   const [nodes, _, onNodesChange] = useNodesState(initialNodes);
// //   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
// //   const onConnect = useCallback(
// //     (params) => setEdges((els) => addEdge(params, els)),
// //     [],
// //   );
// //   return (
// //     <div>
// //       Flow Page
// //       <div className="h-svh w-full">
// //         <ReactFlow
// //           nodes={nodes}
// //           edges={edges}
// //           onNodesChange={onNodesChange}
// //           onEdgesChange={onEdgesChange}
// //           onConnect={onConnect}
// //           fitView
// //           attributionPosition="bottom-left"
// //           style={{ backgroundColor: "#F7F9FB" }}
// //         >
// //           <Background />
// //         </ReactFlow>
// //       </div>
// //     </div>
// //   );
// // };
// // export default Page;
// // Define the element types
// interface Element {
//   id: string;
//   type: string;
//   position: { x: number; y: number };
//   data: { title: string; description: string };
// }
// const initialElements: Element[] = [
//   {
//     id: "1",
//     type: "custom",
//     position: { x: 50, y: 50 },
//     data: { title: "Node 1", description: "This is a custom node" },
//   },
//   {
//     id: "2",
//     type: "custom",
//     position: { x: 300, y: 50 },
//     data: { title: "Node 2", description: "Another custom node" },
//   },
// ];
// const Page: React.FC = () => {
//   const [elements, setElements] = useState(initialElements);
//   const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
//   const onElementClick = (id: string) => {
//     alert(`Node with ID ${id} clicked`);
//     setSelectedNodeId(id);
//   };
//   const nodeTypes = {
//     custom: CustomNode, // Register custom node type
//   };
//   return (
//     <div style={{ height: "500px" }}>
//       <ReactFlow
//         elements={elements}
//         nodeTypes={nodeTypes}
//         onElementClick={(event: React.MouseEvent, element: { id: string }) =>
//           onElementClick(element.id)
//         }
//       >
//         <MiniMap />
//         <Controls />
//         <Background />
//       </ReactFlow>
//     </div>
//   );
// };
// export default Page;
import React from "react";

const Page = () => {
  return <div>Page</div>;
};

export default Page;
