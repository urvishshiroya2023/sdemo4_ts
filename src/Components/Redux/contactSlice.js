import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../api";

export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
    try {
        const response = await callApi("GET", "crm/contacts");
        // console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const fetchContactById = createAsyncThunk("contacts/fetchContactById", async (contactId) => {
    try {
        const response = await callApi("GET", `crm/contacts/${contactId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const addNewContact = createAsyncThunk("contacts/addNewContact", async (newContactData) => {
    try {
        const response = await callApi("POST", "crm/contacts", newContactData);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId) => {
    try {
        const response = await callApi("DELETE", `crm/contacts/${contactId}`);
        return { id: contactId, ...response.data };
    } catch (error) {
        throw error;
    }
});

export const editContact = createAsyncThunk("contacts/editContact", async ({ contactId, updatedData }) => {
    try {
        const response = await callApi("PUT", `crm/contacts/${contactId}`, updatedData);
        return updatedData;
    } catch (error) {
        console.error("Error editing contact:", error);
        throw error;
    }
});

const contactsSlice = createSlice({
    name: "contacts",
    initialState: {
        data: [],
        loading: false,
        error: null,
        selectedContact: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
                // console.log(action.payload);
            })
            .addCase(fetchContacts.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteContact.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = state.data.filter((contact) => contact.id !== action.payload.id);
            })
            .addCase(deleteContact.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(editContact.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedData = action.payload;
                state.data = state.data.map((contact) =>
                    contact.id === updatedData.id ? updatedData : contact
                );
            })
            .addCase(editContact.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchContactById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedContact = action?.payload;
            })
            .addCase(fetchContactById.pending, (state) => {
                state.selectedContact = null;
            })
            .addCase(fetchContactById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewContact.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addNewContact.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data.push(action.payload);
            })
            .addCase(addNewContact.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export const selectContacts = (state) => state.contacts;
export default contactsSlice.reducer;
