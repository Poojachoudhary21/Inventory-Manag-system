// import React, { useState, useMemo } from "react";

// // Helper: safely get nested values like "a.b.c"
// const getNestedValue = (obj, path) =>
//   path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);

// const Pagination = ({
//   data = [],
//   columns = [],
//   itemsPerPage = 10,
//   initialSortKey = null,
//   initialSortOrder = "asc",
//   filterPlaceholder = "Filter...",
// }) => {
//   const [filter, setFilter] = useState("");
//   const [sortKey, setSortKey] = useState(initialSortKey);
//   const [sortOrder, setSortOrder] = useState(initialSortOrder);
//   const [page, setPage] = useState(1);

//   // Normalize columns to objects { key, label }
//   const normalizedColumns = columns.map((col) =>
//     typeof col === "string" ? { key: col, label: col.replace(/_/g, " ") } : col
//   );

//   // Filter data
//   const filteredData = useMemo(() => {
//     if (!filter) return data;
//     return data.filter((item) =>
//       normalizedColumns.some(({ key }) => {
//         const val = getNestedValue(item, key);
//         return String(val ?? "")
//           .toLowerCase()
//           .includes(filter.toLowerCase());
//       })
//     );
//   }, [data, filter, normalizedColumns]);

//   // Sort data
//   const sortedData = useMemo(() => {
//     if (!sortKey) return filteredData;
//     return [...filteredData].sort((a, b) => {
//       const valA = getNestedValue(a, sortKey);
//       const valB = getNestedValue(b, sortKey);

//       if (valA == null) return 1;
//       if (valB == null) return -1;
//       if (valA < valB) return sortOrder === "asc" ? -1 : 1;
//       if (valA > valB) return sortOrder === "asc" ? 1 : -1;
//       return 0;
//     });
//   }, [filteredData, sortKey, sortOrder]);

//   // Pagination calculations
//   const totalPages = Math.ceil(sortedData.length / itemsPerPage);
//   const paginatedData = useMemo(() => {
//     const start = (page - 1) * itemsPerPage;
//     return sortedData.slice(start, start + itemsPerPage);
//   }, [page, itemsPerPage, sortedData]);

//   // When filter or sorting changes, reset to page 1
//   React.useEffect(() => {
//     setPage(1);
//   }, [filter, sortKey, sortOrder]);

//   const toggleSortOrder = (key) => {
//     if (sortKey === key) {
//       setSortOrder((order) => (order === "asc" ? "desc" : "asc"));
//     } else {
//       setSortKey(key);
//       setSortOrder("asc");
//     }
//   };

//   return (
//     <div className="max-w-full mx-auto p-4 bg-slate-900 rounded-lg border border-slate-700 text-gray-300">
//       <input
//         type="text"
//         placeholder={filterPlaceholder}
//         value={filter}
//         onChange={(e) => setFilter(e.target.value)}
//         className="mb-6 w-full max-w-md p-2 bg-slate-800 border border-slate-700 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />

//       <div className="overflow-x-auto rounded-lg border border-slate-700">
//         <table className="w-full table-auto border-collapse border border-slate-700">
//           <thead className="bg-slate-800">
//             <tr>
//               {normalizedColumns.map(({ key, label }) => (
//                 <th
//                   key={key}
//                   onClick={() => toggleSortOrder(key)}
//                   className="cursor-pointer border-b border-slate-700 p-3 text-left text-sm font-semibold text-gray-300 select-none truncate min-w-[150px]"
//                   title={label}
//                 >
//                   {label.toUpperCase()}{" "}
//                   {sortKey === key && (
//                     <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
//                   )}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.length === 0 && (
//               <tr>
//                 <td
//                   colSpan={normalizedColumns.length}
//                   className="text-center p-6 text-gray-500"
//                 >
//                   No data found.
//                 </td>
//               </tr>
//             )}
//             {paginatedData.map((row, idx) => (
//               <tr
//                 key={idx}
//                 className="bg-slate-900 hover:bg-blue-900 transition-colors"
//               >
//                 {normalizedColumns.map(({ key }) => {
//                   const cellValue = getNestedValue(row, key);
//                   return (
//                     <td
//                       key={key}
//                       className="border border-slate-700 p-3 whitespace-nowrap truncate min-w-[150px]"
//                       title={cellValue}
//                     >
//                       {cellValue !== undefined && cellValue !== null
//                         ? typeof cellValue === "object"
//                           ? JSON.stringify(cellValue)
//                           : cellValue
//                         : "-"}
//                     </td>
//                   );
//                 })}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       <div className="mt-6 flex justify-center items-center gap-4 p-4 bg-slate-800 border-t border-slate-700 rounded-b-lg">
//         <button
//           disabled={page === 1}
//           onClick={() => setPage(page - 1)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition"
//         >
//           Prev
//         </button>
//         <span className="text-gray-300 font-medium select-none">
//           Page {page} / {totalPages || 1}
//         </span>
//         <button
//           disabled={page === totalPages || totalPages === 0}
//           onClick={() => setPage(page + 1)}
//           className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;















import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTableData,
  setFilter,
  setSortKey,
  toggleSortOrder,
  setPage,
} from "../../features/inventory/inventoryAPI";

const columnsToShow = [
  "parent_component_name",
  "component_id",
  "component_name",
  "total_quantity",
  "usable_quantity",
  "damaged_quantity",
  "discarded_quantity",
];

// Helper to safely get nested property value
const getNestedValue = (obj, path) =>
  path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);

const Pagination = () => {
  const dispatch = useDispatch();
  const { data, loading, filter, sortKey, sortOrder, page, itemsPerPage } =
    useSelector((state) => state.table);

  useEffect(() => {
    dispatch(fetchTableData());
  }, [dispatch]);

  // Flatten subcomponents
  const flattenedData = data.flatMap((item) =>
    item.subcomponents.map((sub) => ({
      ...sub,
      parent_component_id: item.component_id,
      parent_component_name: item.component_name,
    }))
  );

  // Filter
  const filteredData = flattenedData.filter((item) =>
    columnsToShow.some((key) =>
      String(item[key] ?? "").toLowerCase().includes(filter.toLowerCase())
    )
  );

  // Sort
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = getNestedValue(a, sortKey);
    const valB = getNestedValue(b, sortKey);
    if (valA < valB) return sortOrder === "asc" ? -1 : 1;
    if (valA > valB) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  // Pagination
  const start = (page - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(start, start + itemsPerPage);

  return (
    <div className="max-w-full mx-auto p-4 bg-slate-900 rounded-lg border border-slate-700 text-gray-300">
      <input
        type="text"
        placeholder="Filter components..."
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value))}
        className="mb-6 w-full max-w-md p-2 bg-slate-800 border border-slate-700 rounded-md text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-700">
          <table className="w-full table-auto border-collapse border border-slate-700">
            <thead className="bg-slate-800">
              <tr>
                {columnsToShow.map((key) => (
                  <th
                    key={key}
                    onClick={() => {
                      dispatch(setSortKey(key));
                      dispatch(toggleSortOrder());
                    }}
                    className="cursor-pointer border-b border-slate-700 p-3 text-left text-sm font-semibold text-gray-300 select-none truncate min-w-[150px]"
                    title={key.replace(/_/g, " ")}
                  >
                    {key.replace(/_/g, " ").toUpperCase()}{" "}
                    {sortKey === key && (
                      <span>{sortOrder === "asc" ? "↑" : "↓"}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className="bg-slate-900 hover:bg-blue-900 transition-colors"
                >
                  {columnsToShow.map((key) => {
                    const cellValue = getNestedValue(row, key);
                    return (
                      <td
                        key={key}
                        className="border border-slate-700 p-3 whitespace-nowrap truncate min-w-[150px]"
                        title={cellValue}
                      >
                        {cellValue !== undefined && cellValue !== null
                          ? typeof cellValue === "object"
                            ? JSON.stringify(cellValue)
                            : cellValue
                          : "-"}
                      </td>
                    );
                  })}
                </tr>
              ))}
              {paginatedData.length === 0 && (
                <tr>
                  <td
                    colSpan={columnsToShow.length}
                    className="text-center p-6 text-gray-500"
                  >
                    No data found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center items-center gap-4 p-4 bg-slate-800 border-t border-slate-700 rounded-b-lg">
        <button
          disabled={page === 1}
          onClick={() => dispatch(setPage(page - 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition"
        >
          Prev
        </button>
        <span className="text-gray-300 font-medium select-none">
          Page {page}
        </span>
        <button
          disabled={start + itemsPerPage >= sortedData.length}
          onClick={() => dispatch(setPage(page + 1))}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
