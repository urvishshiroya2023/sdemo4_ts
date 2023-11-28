import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../api";


export const fetchLeads = createAsyncThunk("leads/fetchLeads", async (_, { getState }) => {
    try {
        const response = await callApi("GET", "/crm/leads");
        return response;
    } catch (error) {
        throw error;
    }
});

export const deleteLead = createAsyncThunk("leads/deleteLead", async (leadId, { getState }) => {
    try {
        await callApi("DELETE", `/crm/leads/${leadId}`);
        return leadId;
    } catch (error) {
        throw error;
    }
});

const leadSlice = createSlice({
    name: "leads",
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLeads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeads.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchLeads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const selectLeads = (state) => state.leads;

export default leadSlice.reducer;


// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import callApi from "../api";

// export const fetchLeads = createAsyncThunk("leads/fetchLeads", async (_, { getState }) => {
//     try {
//         const response = await callApi("GET", "/crm/leads");
//         return response;
//     } catch (error) {
//         throw error;
//     }
// });

// export const deleteLead = createAsyncThunk("leads/deleteLead", async (leadId, { getState }) => {
//     try {
//         await callApi("DELETE", `/crm/leads/${leadId}`);
//         return leadId;
//     } catch (error) {
//         throw error;
//     }
// });

// // const leadSlice = createSlice({
// //     name: "leads",
// //     initialState: {
// //         data: [],
// //         loading: false,
// //         error: null,
// //     },
// //     reducers: {},
// //     extraReducers: (builder) => {
// //         builder
// //             .addCase(fetchLeads.pending, (state) => {
// //                 state.loading = true;
// //                 state.error = null;
// //             })
// //             .addCase(fetchLeads.fulfilled, (state, action) => {
// //                 state.loading = false;
// //                 state.data = action.payload;
// //             })
// //             .addCase(fetchLeads.rejected, (state, action) => {
// //                 state.loading = false;
// //                 state.error = action.error.message;
// //             })
// //             .addCase(deleteLead.fulfilled, (state, action) => {
// //                 // Remove the deleted lead from the state
// //                 state.data = state.data.filter((lead) => lead.id !== action.payload);
// //             });
// //     },
// // });

// const leadSlice = createSlice({
//     name: "leads",
//     initialState: {
//         data: [],
//         loading: false,
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchLeads.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchLeads.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.data = action.payload;
//             })
//             .addCase(fetchLeads.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(deleteLead.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(deleteLead.fulfilled, (state, action) => {
//                 state.loading = false;
//                 // Update state.data by filtering out the deleted lead
//                 state.data = state.data.filter((lead) => lead.id !== action.payload);
//             })
//             .addCase(deleteLead.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             });
//     },
// });


// export const selectLeads = (state) => state.leads;

// export default leadSlice.reducer;
