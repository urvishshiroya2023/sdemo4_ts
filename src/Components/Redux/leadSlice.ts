// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { METHOD } from "../../Constant/Methods";
// import callApi from "../api";

// const LEADPATH = "crm/leads"

// export const fetchLeads = createAsyncThunk("leads/fetchLeads", async (_, { getState }) => {
//     try {
//         const response = await callApi(METHOD.GET, `${LEADPATH}`);
//         return response;
//     } catch (error) {
//         throw error;
//     }
// });

// export const fetchLeadById = createAsyncThunk("leads/fetchLeadById", async (leadId, { getState }) => {
//     try {
//         const response = await callApi(METHOD.GET, `${LEADPATH}/${leadId}`);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });

// export const deleteLead = createAsyncThunk("leads/deleteLead", async (leadId, { getState }) => {
//     try {
//         await callApi(METHOD.DELETE, `${LEADPATH}/${leadId}`);
//         return leadId;
//     } catch (error) {
//         throw error;
//     }
// });

// export const addNewLeads = createAsyncThunk("leads/addNewLeads", async (newLeadData, { getState }) => {
//     try {
//         const response = await callApi(METHOD.POST, `${LEADPATH}`, newLeadData);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });

// export const editLead = createAsyncThunk("leads/editLead", async ({ leadId, updatedData }, { getState }) => {
//     try {
//         const response = await callApi(METHOD.PUT, `${LEADPATH}/${leadId}`, updatedData);
//         return updatedData;
//     } catch (error) {
//         throw error;
//     }
// });

// const leadSlice = createSlice({
//     name: "leads",
//     initialState: {
//         data: [],
//         loading: false,
//         error: null,
//         selectLeads: null
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
//             .addCase(fetchLeadById.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(fetchLeadById.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.status = "succeeded";
//                 state.selectLeads = action?.payload
//             })
//             .addCase(fetchLeadById.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(addNewLeads.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(addNewLeads.fulfilled, (state, action) => {
//                 // console.log(JSON.stringify(state.data.data))
//                 state.loading = false;
//                 state.data.data.unshift(action.payload);

//             })
//             .addCase(addNewLeads.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             })
//             .addCase(editLead.pending, (state) => {
//                 state.loading = true;
//                 state.error = null;
//             })
//             .addCase(editLead.fulfilled, (state, action) => {
//                 state.loading = false;
//                 const updatedData = action.payload;
//                 state.data.data = state.data.data.map((lead) =>
//                     lead.id === updatedData.id ? updatedData : lead
//                 );
//             })
//             .addCase(editLead.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message;
//             });
//     },
// });
// export const selectLeads = (state) => state.leads;

// export default leadSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { METHOD } from "../../Constant/Methods";
import callApi from "../api";

export interface contactData{
    firstName: string;
    lastName: string;
}

export interface tags{
    id: string;
    colorName: string;
    length: number;
    tagName: string;
}

export interface leadStatus{
    statusName: string
    colorCode:string
}

export interface Lead {
    leadsActivity: any[];
    reason: string;
    tags: tags[];
    leadStatus: leadStatus;
    contactData: contactData;
    id: string ;
    contactName: string;
    title: string;
    email: string;
    contactNumber: string;
    budget: string;
    notes: string;
    leadsNewCategory: string;
    leadCate2: string;
    leadsCategory: string;
    bhargav: string;
    skills: string;
}

interface LeadsState {
    data: Lead[];
    loading: boolean;
    error: string | null;
    selectLeads: Lead | null;
    status: "idle" | "loading" | "succeeded" | "failed";
}

const LEADPATH = "crm/leads";

export const fetchLeads = createAsyncThunk < Lead[] > ("leads/fetchLeads", async (_, { getState }) => {
    try {
        const response = await callApi(METHOD.GET, `${LEADPATH}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const fetchLeadById = createAsyncThunk < Lead | undefined,string > (
    "leads/fetchLeadById",
    async (leadId, { getState }) => {
        try {
            const response = await callApi(METHOD.GET, `${LEADPATH}/${leadId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

export const deleteLead = createAsyncThunk < string, string> ("leads/deleteLead", async (leadId, { getState }) => {
    try {
        await callApi(METHOD.DELETE, `${LEADPATH}/${leadId}`);
        return leadId;
    } catch (error) {
        throw error;
    }
});

export const addNewLeads = createAsyncThunk < Lead, { newLeadData: Lead }> ("leads/addNewLeads", async ({ newLeadData }, { getState }) => {
    try {
        const response = await callApi(METHOD.POST, `${LEADPATH}`, newLeadData);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const editLead = createAsyncThunk < Lead, { leadId: string; updatedData: Lead }> (
    "leads/editLead",
    async ({ leadId, updatedData }, { getState }) => {
        try {
            const response = await callApi(METHOD.PUT, `${LEADPATH}/${leadId}`, updatedData);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const leadSlice = createSlice({
    name: "leads",
    initialState: {
        data: [],
        loading: false,
        error: null,
        selectLeads: null,
        status: "idle"
    } as LeadsState,
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
                state.error = action.error?.message ?? null;
            })
            .addCase(fetchLeadById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeadById.fulfilled, (state, action) => {
                state.loading = false;
                state.status = "succeeded";
                state.selectLeads = action?.payload ?? null;
            })
            .addCase(fetchLeadById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message ?? null;
            })
            .addCase(addNewLeads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addNewLeads.fulfilled, (state, action) => {
                state.loading = false;
                state.data.unshift(action.payload);
            })
            .addCase(addNewLeads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message?? null;
            })
            .addCase(editLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editLead.fulfilled, (state, action) => {
                state.loading = false;
                const updatedData = action?.meta?.arg?.updatedData;
                state.data = state.data.map((lead) => (lead.id === updatedData.id ? updatedData : lead));

            })
            .addCase(editLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error?.message ?? null;
            });
    },
});

export const selectLeads = (state: { leads: LeadsState }) => state.leads;
// export const selectLeads = (state: { leads: { data: Lead[] } }) => state.leads;


export default leadSlice.reducer;
