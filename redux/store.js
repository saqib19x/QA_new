import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import leadSlice from './leadSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        leads: leadSlice
    },
})