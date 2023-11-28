import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../api";

// export const fetchLeads = createAsyncThunk("leads/fetchLeads", async (_, { getState }) => {
//     try {
//         const authToken = localStorage.getItem("authToken");
//         if (!authToken) {
//             throw new Error("Authentication token not found");
//         }

//         const response = await axios.get(BASE_URL + "/crm/leads", {
//             headers: {
//                 Authorization: `Bearer ${authToken}`,
//             },
//         });

//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });

// export const deleteLead = createAsyncThunk("leads/deleteLead", async (leadId, { getState }) => {
//     try {
//         const authToken = localStorage.getItem("authToken");

//         if (!authToken) {
//             throw new Error("Authentication token not found");
//         }

//         await axios.delete(`${BASE_URL}/crm/leads/${leadId}`, {
//             headers: {
//                 Authorization: `Bearer ${authToken}`,
//             },
//         });

//         return leadId;
//     } catch (error) {
//         throw error;
//     }
// });


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
