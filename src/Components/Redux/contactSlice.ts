// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import callApi from "../api";

// export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
//     try {
//         const response = await callApi("GET", "crm/contacts");
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });

// export const fetchContactById = createAsyncThunk("contacts/fetchContactById", async (contactId) => {
//     try {
//         const response = await callApi("GET", `crm/contacts/${contactId}`);
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });

// export const addNewContact = createAsyncThunk("contacts/addNewContact", async (newContactData) => {
//     try {
//         const response = await callApi("POST", "crm/contacts", newContactData);
//         console.log(response.data)
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// });

// export const deleteContact = createAsyncThunk("contacts/deleteContact", async (contactId) => {
//     try {
//         const response = await callApi("DELETE", `crm/contacts/${contactId}`);
//         return { id: contactId, ...response.data };
//     } catch (error) {
//         throw error;
//     }
// });


// export const editContact = createAsyncThunk("contacts/editContact", async ({ contactId, updatedData }) => {
//     try {
//         console.log(contactId)
//         console.log(updatedData)
//         const response = await callApi("PUT", `crm/contacts/${contactId}`, updatedData);
//         console.log(response)
//         return updatedData;
//     } catch (error) {
//         console.error("Error editing contact:", error);
//         throw error;
//     }
// });

// const contactsSlice = createSlice({
//     name: "contacts",
//     initialState: {
//         data: [],
//         loading: false,
//         error: null,
//         selectedContact: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchContacts.pending, (state) => {
//                 state.status = "loading";
//             })
//             .addCase(fetchContacts.fulfilled, (state, action) => {
//                 state.status = "succeeded";
//                 state.data = action.payload;
//             })
//             .addCase(fetchContacts.rejected, (state, action) => {
//                 state.status = "failed";
//                 state.error = action.error.message;
//             })
//             .addCase(deleteContact.fulfilled, (state, action) => {
//                 state.status = "succeeded";
//                 state.data = state.data.filter((contact) => contact.id !== action.payload.id);
//             })
//             .addCase(deleteContact.rejected, (state, action) => {
//                 state.status = "failed";
//                 state.error = action.error.message;
//             })
//             .addCase(editContact.fulfilled, (state, action) => {
//                 state.status = "succeeded";
//                 const updatedData = action.payload;
//                 console.log(updatedData);
//                 state.data = state.data.map((contact) =>
//                     contact.id === updatedData.id ? updatedData : contact
//                 );
//             })
//             .addCase(editContact.rejected, (state, action) => {
//                 state.status = "failed";
//                 state.error = action.error.message;
//             })
//             .addCase(fetchContactById.fulfilled, (state, action) => {
//                 state.status = "succeeded";
//                 state.selectedContact = action?.payload;
//             })
//             .addCase(fetchContactById.pending, (state) => {
//                 state.selectedContact = null;
//             })
//             .addCase(fetchContactById.rejected, (state, action) => {
//                 state.status = "failed";
//                 state.error = action.error.message;
//             })
//             .addCase(addNewContact.pending, (state) => {
//                 state.status = "loading";
//             })
//             .addCase(addNewContact.fulfilled, (state, action) => {
//                 state.status = "succeeded";
//                 console.log(action.payload);
//                 state.data.push(action.payload);
//             })
//             .addCase(addNewContact.rejected, (state, action) => {
//                 state.status = "failed";
//                 state.error = action.error.message;
//             });
//     },
// });

// export const selectContacts = (state) => state.contacts;
// export default contactsSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { METHOD } from "../../Constant/Methods";
import callApi from "../api";

interface Contact {
   id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  notes: string;
  designation?: string;
  address?: string;
  title?: string;
  zipcode?: string;
  description?: string;
  sourceId?: string;
  companyName?: string;
  tags: [];
  companiesId?: string;
  tagId: string[];
}

interface ContactsState {
  data: Contact[];
  loading: boolean;
  error: string | null;
  selectedContact: Contact | null;
}

interface FetchContactsResponse {
  data: Contact[];
}

interface FetchContactByIdResponse {
  data: Contact;
}

export interface AddNewContactPayload {
  // newContactData: Omit<Contact, "id">;
  newContactData: Contact;
}



interface EditContactPayload {
  contactId: string;
  // updatedData: Partial<Contact>;
  updatedData:Contact;
}

// interface EditContactPayload {
//   contactId: string;
//   updatedData: {
//     address?: string;
//     avatar: null | string;
//     cityData: null | any; // You might want to replace `any` with a more specific type
//     cityId: null | string;
//     companiesId: null | string;
//     company: null | string;
//     contactFields: any[]; // You might want to replace `any` with a more specific type
//     contactNumber?: string;
//     createdAt: string;
//     createdBy: string;
//     createdData: {
//       id: string;
//       firstName: string;
//       lastName: string;
//     };
//     description?: string;
//     email: string;
//     firstName: string;
//     id: string;
//     lastName: string;
//     leadModels: any[]; // You might want to replace `any` with a more specific type
//     modifiedBy: null | string;
//     modifiedData: null | any; // You might want to replace `any` with a more specific type
//     source: null | string;
//     sourceId: null | string;
//     stateData: null | any; // You might want to replace `any` with a more specific type
//     stateId: null | string;
//     tags: any[]; // You might want to replace `any` with a more specific type
//     title?: string;
//     updatedAt: string;
//     zipcode:  string;
//     // Add other properties as needed
//   };
// }

const PATH = "crm/contacts"

export const fetchContacts = createAsyncThunk<FetchContactsResponse>(
  "contacts/fetchContacts",
  async () => {
    try {
        const response = await callApi(METHOD.GET, `${PATH}`);
        // console.log(response.data);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchContactById = createAsyncThunk<FetchContactByIdResponse, string>(
  "contacts/fetchContactById",
  async (contactId) => {
    try {
        const response = await callApi(METHOD.GET, `${PATH}/${contactId}`);
        // console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

export const addNewContact = createAsyncThunk<Contact, AddNewContactPayload>(
  "contacts/addNewContact",
    async (payload) => {
        console.log(payload.newContactData);
    try {
        // const response = await callApi("POST", "crm/contacts", payload.newContactData as any);
        const response = await callApi(METHOD.POST, `${PATH}`, payload.newContactData as any);
        console.log(response);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editContact = createAsyncThunk<void, EditContactPayload>(
  "contacts/editContact",
  // async ({ contactId, updatedData }) => {
  async (payload:{contactId:string,updatedData:Contact}) => {
    console.log(payload)
    try {
      const { contactId, updatedData } = payload;
      // console.log(updatedData);
      const response = await callApi(METHOD.PUT, `${PATH}/${contactId}`, updatedData);
      return response
    } catch (error) {
      console.error("Error editing contact:", error);
      throw error;
    }
  }
);


export const deleteContact = createAsyncThunk<void, string>(
  "contacts/deleteContact",
  async (contactId) => {
    try {
      await callApi(METHOD.DELETE, `${PATH}/${contactId}`);
    } catch (error) {
      throw error;
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    data: [],
    loading: false,
    error: null,
    selectedContact: null as Contact | null,
  } as ContactsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.loading = false;
        //   state.data = action.payload.data;
          state.data = action.payload.data;
        //   console.log(action.payload);
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((contact) => contact.id !== action.meta.arg);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(editContact.fulfilled, (state, action) => {
          state.loading = false;
        // action.meta.arg contains the payload passed to the action
        // const { contactId, updatedData } = action.meta.arg;
          const { contactId, updatedData } = action.meta.arg;
        //   console.log(updatedData);
          state.data = state.data.map((contact) =>
          contact.id === contactId ? { ...contact, ...updatedData } : contact
        );
         
      })
      .addCase(editContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      })
      .addCase(fetchContactById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchContactById.fulfilled, (state, action) => {
          state.loading = false;
          console.log(action.payload)
          state.selectedContact = action.payload.data; // Set the selectedContact to the fetched contact
      })
      .addCase(fetchContactById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "An error occurred";
      })
  },
});

export const selectContacts = (state: { contacts: ContactsState }) => state?.contacts;

export default contactsSlice.reducer;

