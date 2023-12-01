import { configureStore } from "@reduxjs/toolkit";
import contactSlice, { fetchContacts } from "./contactSlice";
import leadSlice, { fetchLeads } from "./leadSlice";
import tasksReducer, { fetchTasks } from "./tasksSlice";
const store = configureStore({
    reducer: {
        leads: leadSlice,
        tasks: tasksReducer,
        contacts: contactSlice
    },
});

// Dispatch the fetchLeads action when the store is created
store.dispatch(fetchLeads());
store.dispatch(fetchTasks());
store.dispatch(fetchContacts());

export default store;
