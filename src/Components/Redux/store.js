import { configureStore } from "@reduxjs/toolkit";
import leadSlice, { fetchLeads } from "./leadSlice";
import tasksSlice, { fetchTasks } from "./tasksSlice";

const store = configureStore({
    reducer: {
        leads: leadSlice,
        tasks: tasksSlice,
    },
});

// Dispatch the fetchLeads action when the store is created
store.dispatch(fetchLeads());
store.dispatch(fetchTasks());

export default store;
