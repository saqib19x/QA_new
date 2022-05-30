import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    leads: [],
}

export const leadSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {
        setLeads: (state, action) => {
            state.leads = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLeads } = leadSlice.actions

export default leadSlice.reducer