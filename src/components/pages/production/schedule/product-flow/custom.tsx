// import React from "react";

// // Define the CustomNode type
// interface CustomNodeProps {
//   data: { title: string; description: string };
//   id: string;
//   selected: boolean;
//   xPos: number;
//   yPos: number;
// //   onClick: (id: string) => void;
// }

// const CustomNode: React.FC<CustomNodeProps> = ({
//   data,
//   id,
//   selected,
//   xPos,
//   yPos,
// //   onClick,
// }) => {
//   return (
//     <div
//       className={`cursor-pointer rounded-lg p-5 shadow-md ${
//         selected ? "bg-blue-50" : "bg-white"
//       }`}
//       style={{
//         position: "absolute",
//         top: yPos,
//         left: xPos,
//         width: "200px",
//         height: "150px",
//       }}
//     //   onClick={() => onClick(id)}
//     >
//       {/* Icon */}
//       <div className="mb-3 text-center text-3xl">
//         <i className="fas fa-cogs"></i> {/* Replace with FontAwesomeIcon */}
//       </div>

//       {/* Title */}
//       <h4 className="text-center text-xl font-semibold">{data.title}</h4>

//       {/* Description */}
//       <p className="mt-2 text-center text-sm text-gray-600">
//         {data.description}
//       </p>
//     </div>
//   );
// };

// export default CustomNode;
