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

export const fetchLeadById = createAsyncThunk("leads/fetchLeadById", async (leadId, { getState }) => {
    try {
        const response = await callApi("GET", `/crm/leads/${leadId}`);
        return response.data;
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

export const addNewLeads = createAsyncThunk("leads/addNewLeads", async (newLeadData, { getState }) => {
    try {
        const response = await callApi("POST", "/crm/leads", newLeadData);
        console.log(response);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const editLead = createAsyncThunk("leads/editLead", async ({ leadId, updatedData }, { getState }) => {
    try {
        const response = await callApi("PUT", `crm/leads/${leadId}`, updatedData);
        // console.log(updatedData);
        // return response.data;
        return updatedData;
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
        selectLeads: null
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
            })
            .addCase(fetchLeadById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeadById.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.selectLeads = action?.payload
            })
            .addCase(fetchLeadById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(addNewLeads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewLeads.fulfilled, (state, action) => {
                // console.log(JSON.stringify(state.data.data))
                state.loading = false;
                state.data.data.unshift(action.payload);

            })
            .addCase(addNewLeads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(editLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editLead.fulfilled, (state, action) => {
                state.loading = false;
                const updatedData = action.payload;
                state.data.data = state.data.data.map((lead) =>
                    lead.id === updatedData.id ? updatedData : lead
                );
            })
            .addCase(editLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });

    },
});
export const selectLeads = (state) => state.leads;

export default leadSlice.reducer;