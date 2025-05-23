import React, { useState, useMemo } from "react";

const Table = ({ dynamicKeys, data, loading }) => {
  const [filterTerm, setFilterTerm] = useState("");
  const [sortKey, setSortKey] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const processedData = useMemo(() => {
    let filtered = data.filter((item) =>
      dynamicKeys.some((key) =>
        String(item[key] || "")
          .toLowerCase()
          .includes(filterTerm.toLowerCase())
      )
    );

    if (sortKey) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortKey] ?? "";
        const bVal = b[sortKey] ?? "";

        const aNum = Number(aVal);
        const bNum = Number(bVal);
        const isNumberSort = !isNaN(aNum) && !isNaN(bNum);

        if (isNumberSort) {
          return sortOrder === "asc" ? aNum - bNum : bNum - aNum;
        } else {
          const aStr = String(aVal).toLowerCase();
          const bStr = String(bVal).toLowerCase();
          if (aStr < bStr) return sortOrder === "asc" ? -1 : 1;
          if (aStr > bStr) return sortOrder === "asc" ? 1 : -1;
          return 0;
        }
      });
    }

    const startIdx = (currentPage - 1) * itemsPerPage;
    return filtered.slice(startIdx, startIdx + itemsPerPage);
  }, [data, filterTerm, sortKey, sortOrder, currentPage, dynamicKeys]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleSortChange = (key) => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
        <input
          type="text"
          placeholder="Filter..."
          value={filterTerm}
          onChange={(e) => setFilterTerm(e.target.value)}
          className="px-3 py-2 border border-gray-300 bg-slate-800 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
        />

        <select
          onChange={(e) => handleSortChange(e.target.value)}
          value={sortKey}
          className="px-3 py-2 border border-gray-300 bg-slate-800 text-white rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
        >
          <option value="">Sort By</option>
          {dynamicKeys.map((key) => (
            <option key={key} value={key}>
              {key.replace(/_/g, " ")}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-center text-gray-400">Loading...</p>
      ) : (
        <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-300">
            <thead className="bg-slate-700 text-gray-100">
              <tr>
                {dynamicKeys.map((key) => (
                  <th
                    key={key}
                    className="px-4 py-3 capitalize cursor-pointer"
                    onClick={() => handleSortChange(key)}
                  >
                    {key.replace(/_/g, " ")}{" "}
                    {sortKey === key ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {processedData.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-t border-slate-700 hover:bg-slate-700/50"
                >
                  {dynamicKeys.map((key) => (
                    <td key={key} className="px-4 py-3">
                      {item[key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 p-4 bg-slate-900 border-t border-slate-700">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;


// import React, { useState, useMemo } from "react";

// const Table = ({ dynamicKeys, data, loading }) => {
//   const [filterTerm, setFilterTerm] = useState("");
//   const [sortKey, setSortKey] = useState("");
//   const [sortOrder, setSortOrder] = useState("asc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8;

//   const processedData = useMemo(() => {
//     let filtered = data.filter((group) => {
//       const parentMatch = group.parent
//         .toLowerCase()
//         .includes(filterTerm.toLowerCase());

//       const subMatch =
//         Array.isArray(group.subcomponents) &&
//         group.subcomponents.some((sub) =>
//           Object.values(sub).some((val) =>
//             String(val).toLowerCase().includes(filterTerm.toLowerCase())
//           )
//         );
//       return parentMatch || subMatch;
//     });

//     if (sortKey === "parent") {
//       filtered = [...filtered].sort((a, b) => {
//         const aVal = a.parent?.toLowerCase() || "";
//         const bVal = b.parent?.toLowerCase() || "";
//         if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
//         if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
//         return 0;
//       });
//     }

//     const startIdx = (currentPage - 1) * itemsPerPage;
//     return filtered.slice(startIdx, startIdx + itemsPerPage);
//   }, [data, filterTerm, sortKey, sortOrder, currentPage]);

//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const handleSortChange = (key) => {
//     if (sortKey === key) {
//       setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
//     } else {
//       setSortKey(key);
//       setSortOrder("asc");
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
//         <input
//           type="text"
//           placeholder="Filter..."
//           value={filterTerm}
//           onChange={(e) => setFilterTerm(e.target.value)}
//           className="px-3 py-2 border border-gray-300 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
//         />

//         <select
//           onChange={(e) => handleSortChange(e.target.value)}
//           value={sortKey}
//           className="px-3 py-2 border border-gray-300 bg-slate-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
//         >
//           <option value="">Sort By</option>
//           <option value="parent">Parent</option>
//           <option value="subcomponents">Subcomponents</option>
//         </select>
//       </div>

//       {loading ? (
//         <p className="text-center text-gray-400">Loading...</p>
//       ) : (
//         <div className="overflow-x-auto bg-slate-800 rounded-lg shadow-lg">
//           <table className="min-w-full text-sm text-left text-gray-300">
//             <thead className="bg-slate-700 text-gray-100">
//               <tr>
//                 {dynamicKeys.includes("parent") && (
//                   <th className="px-4 py-3">Parent</th>
//                 )}
//                 {dynamicKeys.map((key) =>
//                   key === "parent" ? null : (
//                     <th key={key} className="px-4 py-3 capitalize">
//                       {key.replace(/_/g, " ")}
//                     </th>
//                   )
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {processedData.map((group, groupIdx) => {
//                 if (
//                   Array.isArray(group.subcomponents) &&
//                   group.subcomponents.length > 0
//                 ) {
//                   return group.subcomponents.map((sub, subIdx) => (
//                     <tr
//                       key={`${groupIdx}-${subIdx}`}
//                       className="border-t border-slate-700 hover:bg-slate-700/50"
//                     >
//                       {dynamicKeys.includes("parent") && subIdx === 0 && (
//                         <td
//                           rowSpan={group.subcomponents.length}
//                           className="px-4 py-3 align-top font-medium"
//                         >
//                           {group.parent}
//                         </td>
//                       )}
//                       {dynamicKeys.map((key) =>
//                         key === "parent" ? null : (
//                           <td key={key} className="px-4 py-3">
//                             {sub[key]}
//                           </td>
//                         )
//                       )}
//                     </tr>
//                   ));
//                 } else {
//                   return (
//                     <tr
//                       key={groupIdx}
//                       className="border-t border-slate-700 hover:bg-slate-700/50"
//                     >
//                       {dynamicKeys.includes("parent") && (
//                         <td className="px-4 py-3">{group.parent}</td>
//                       )}
//                       {dynamicKeys.map((key) =>
//                         key === "parent" ? null : (
//                           <td key={key} className="px-4 py-3">
//                             {group[key]}
//                           </td>
//                         )
//                       )}
//                     </tr>
//                   );
//                 }
//               })}
//             </tbody>
//           </table>

//           {/* Pagination */}
//           <div className="flex items-center justify-center gap-4 p-4 bg-slate-900 border-t border-slate-700">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
//             >
//               Previous
//             </button>
//             <span className="text-sm">
//               Page {currentPage} of {totalPages}
//             </span>
//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className="px-3 py-1 bg-blue-600 text-white rounded disabled:opacity-50"
//             >
//               Next
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Table;

