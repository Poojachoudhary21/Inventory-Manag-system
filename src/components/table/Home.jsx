
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInventory } from '../../features/inventory/inventorySlice';
import Table from './Table';

function Home() {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.inventory);

  useEffect(() => {
    dispatch(fetchInventory());
  }, [dispatch]);
  // Example of different dataset
  //  const data = [
  //     {
  //       component_id: 'P001',
  //       component_name: 'Main Frame',
  //       sku_code: 'MF-001',
  //       hsn_code: '1234',
  //       created_at: '2023-12-01',
  //       updated_at: '2024-01-10',
  //       total: '100',
        
  //     },
  //     {
  //       component_id: 'P002',
  //       component_name: 'Control Unit',
  //       sku_code: 'CU-045',
  //       hsn_code: '5678',
  //       created_at: '2023-12-15',
  //       updated_at: '2024-01-22',
  //        total: '100',
  //       
  //     },
  //     {
  //       component_id: 'P003',
  //       component_name: 'Sensor Kit',
  //       sku_code: 'SK-003',
  //       hsn_code: '9012',
  //       created_at: '2024-01-01',
  //       updated_at: '2024-01-25',
  //        total: '100',
       
  //     },
  //   ];

  // Flatten data so each row has both parent and subcomponent info
  const flattenedData = useMemo(() => {
    if (!data) return [];

    return data.flatMap((parent) => {
      const parentInfo = {
        parent_component_id: parent.component_id,
        parent_component_name: parent.component_name,
        parent_sku_code: parent.sku_code,
        parent_hsn_code: parent.hsn_code,
        parent_created_at: parent.created_at,
        parent_updated_at: parent.updated_at,
        // total: parent.total,
      };

      if (parent.subcomponents && parent.subcomponents.length > 0) {
        return parent.subcomponents.map((sub) => ({
          ...parentInfo,
          ...sub, // merge subcomponent fields
        }));
      } else {
        // No subcomponents, show only parent as a row
        return [{
          ...parentInfo,
          ...parent,
        }];
      }
    });
  }, [data]);

  // Choose which fields to show in the table
  const visibleColumns = [
    'parent_component_name',
    'component_id',
    'component_name',
    'sku_code',
    'hsn_code',
    // 'total',
    'total_quantity',
    'usable_quantity',
    'damaged_quantity',
    'discarded_quantity',
  ];

  return (
    <>
      <Table
        loading={loading}
        data={flattenedData}
        dynamicKeys={visibleColumns}
      />
    </>
  );
}

export default Home;



// import React, { useEffect,useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchInventory } from '../../features/inventory/inventorySlice';

// import Table from './Table';



// function Home() {
//   const dispatch = useDispatch();
//   const { data, loading, error } = useSelector((state) => state.inventory);
//   console.log(data);

//   useEffect(() => {
//     dispatch(fetchInventory());
//   }, [dispatch]);
 
//  const groupedData = useMemo(() => {
//   if (!data) return [];

//   return data.map((parent) => ({
//     parent: parent.component_name,
//     subcomponents: parent.subcomponents.map((sub) => {
//       const { component_name, ...rest } = sub;
//       return {
//         sub_component: component_name,
//         ...rest,
//       };
//     }),
//   }));
// }, [data]);
// //decide which fields should appear as columns:
// const visibleColumns = ['parent', 'parent.component_id'];



//   return (
//     <>
//       <Table loading={loading} data={groupedData} dynamicKeys={visibleColumns}  />
    
      
//     </>
//   )
// }


// export default Home
