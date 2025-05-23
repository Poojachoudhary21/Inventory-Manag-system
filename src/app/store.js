import { configureStore } from '@reduxjs/toolkit'
import inventoryReducer from '../features/inventory/inventorySlice'
import tableReducer from '../features/inventory/inventoryAPI'

export const store = configureStore({
   reducer: {
    inventory: inventoryReducer,
    table: tableReducer,
  },
})