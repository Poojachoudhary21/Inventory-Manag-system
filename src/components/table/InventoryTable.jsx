// import React from "react";
// import TableWithPagination from "./Pagination";

// const InventoryTable = () => {
//       const data = [
//     {
//       component_id: "C1001",
//       component_name: "Main Engine",
//       subcomponents: [
//         {
//           component_id: "SC1001",
//           component_name: "Fuel Pump",
//           total_quantity: 15,
//           usable_quantity: 12,
//           damaged_quantity: 2,
//           discarded_quantity: 1,
//         },
//         {
//           component_id: "SC1002",
//           component_name: "Oil Filter",
//           total_quantity: 10,
//           usable_quantity: 9,
//           damaged_quantity: 1,
//           discarded_quantity: 0,
//         },
//       ],
//     },
//     {
//       component_id: "C1002",
//       component_name: "Control Panel",
//       subcomponents: [
//         {
//           component_id: "SC2001",
//           component_name: "Switch",
//           total_quantity: 30,
//           usable_quantity: 28,
//           damaged_quantity: 1,
//           discarded_quantity: 1,
//         },
//       ],
//     },
//     {
//       component_id: "C1001",
//       component_name: "Main Engine",
//       subcomponents: [
//         {
//           component_id: "SC1001",
//           component_name: "Fuel Pump",
//           total_quantity: 15,
//           usable_quantity: 12,
//           damaged_quantity: 2,
//           discarded_quantity: 1,
//         },
//         {
//           component_id: "SC1002",
//           component_name: "Oil Filter",
//           total_quantity: 10,
//           usable_quantity: 9,
//           damaged_quantity: 1,
//           discarded_quantity: 0,
//         },
//       ],
//     },
//     {
//       component_id: "C1002",
//       component_name: "Control Panel",
//       subcomponents: [
//         {
//           component_id: "SC2001",
//           component_name: "Switch",
//           total_quantity: 30,
//           usable_quantity: 28,
//           damaged_quantity: 1,
//           discarded_quantity: 1,
//         },
//       ],
//     },
//   ];


// //  Flatten subcomponents
//   const flattenedData = data.flatMap((item) =>
//     item.subcomponents.map((sub) => ({
//       ...sub,
//       parent_component_id: item.component_id,
//       parent_component_name: item.component_name,
//     }))
//   );

//   const columnsToShow = [
//     "parent_component_name",
//     "component_id",
//     "component_name",
//     "total_quantity",
//     "usable_quantity",
//     // "damaged_quantity",
//     // "discarded_quantity",
//   ];

//   return (
//     <TableWithPagination
//       data={flattenedData}
//       columns={columnsToShow}
//       itemsPerPage={10}
//       filterPlaceholder="Filter components..."
//     />
//   );
// };

// export default InventoryTable;
