import { configureStore } from "@reduxjs/toolkit";
import leadSlice, { fetchLeads } from "./leadSlice";
import tasksReducer, { fetchTasks } from "./tasksSlice";
const store = configureStore({
    reducer: {
        leads: leadSlice,
        tasks: tasksReducer,
    },
});

// Dispatch the fetchLeads action when the store is created
store.dispatch(fetchLeads());
store.dispatch(fetchTasks());

export default store;
