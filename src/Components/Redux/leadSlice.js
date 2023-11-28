import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../Constants";

export const fetchLeads = createAsyncThunk("leads/fetchLeads", async (_, { getState }) => {
    try {
        const authToken = localStorage.getItem("authToken");


        if (!authToken) {
            throw new Error("Authentication token not found");
        }

        const response = await axios.get(BASE_URL + "/crm/leads", {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        });

        return response.data;
    } catch (error) {
        throw error;
    }
});

const leadSlice = createSlice({
    name: "leads",
    initialState: {
        data: [], // Assuming leads data is an array
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
