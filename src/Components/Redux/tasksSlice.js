// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import callApi from "../api";

// // Define the initial state
// const initialState = {
//     tasks: [],
//     loading: false,
//     error: null,
// };

// // Create an async thunk for fetching tasks
// export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
//     try {
//         return callApi("get", "/api/v1/crm/tasks");
//     } catch (error) {
//         throw error;
//     }
// });

// // Create an async thunk for deleting a task
// export const deleteTask = createAsyncThunk(
//     "tasks/deleteTask",
//     async (taskId) => {
//         try {
//             return callApi("delete", `/api/v1/crm/tasks/${taskId}`);
//         } catch (error) {
//             throw error;
//         }
//     }
// );

// // Create an async thunk for editing a task
// export const editTask = createAsyncThunk(
//     "tasks/editTask",
//     async ({ taskId, updatedData }) => {
//         try {
//             return callApi("put", `/api/v1/crm/tasks/${taskId}`, updatedData);
//         } catch (error) {
//             throw error;
//         }
//     }
// );

// // Create a slice of the Redux store
// const tasksSlice = createSlice({
//     name: "tasks",
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchTasks.pending, (state) => {
//                 state.status = "loading";
//             })
//             .addCase(fetchTasks.fulfilled, (state, action) => {
//                 state.status = "succeeded";
//                 state.tasks = action.payload.data;
//             })
//             .addCase(fetchTasks.rejected, (state, action) => {
//                 state.status = "failed";
//                 state.error = action.error.message;
//             })
//             .addCase(deleteTask.pending, (state) => {
//                 // You can handle loading state for deletion if needed
//             })
//             .addCase(deleteTask.fulfilled, (state, action) => {
//                 state.status = "succeeded";
//                 // Filter out the deleted task from the tasks state
//                 state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
//             })
//             .addCase(deleteTask.rejected, (state, action) => {
//                 state.status = "failed";
//                 state.error = action.error.message;
//             })
//             .addCase(editTask.pending, (state) => {
//                 // You can handle loading state for editing if needed
//             })
//             .addCase(editTask.fulfilled, (state, action) => {
//                 state.status = "succeeded";
//                 // Update the task in the tasks state with the edited data
//                 state.tasks = state.tasks.map((task) =>
//                     task.id === action.payload.id ? action.payload : task
//                 );
//             })
//             .addCase(editTask.rejected, (state, action) => {
//                 state.status = "failed";
//                 state.error = action.error.message;
//             });
//     },
// });

// // Export the async thunks for use in the component
// export { deleteTask, editTask, fetchTasks };


// // Export the reducer
// export default tasksSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../api";

// Define the initial state
const initialState = {
    tasks: [],
    status: "idle",
    error: null,
};

// Create an async thunk for fetching tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    try {
        const response = await callApi("get", "/api/v1/crm/tasks");
        return response.data; // Assuming your API response has a 'data' property
    } catch (error) {
        throw error;
    }
});

// Create an async thunk for deleting a task
export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (taskId) => {
        try {
            const response = await callApi("delete", `/api/v1/crm/tasks/${taskId}`);
            return { id: taskId, ...response.data }; // Include the deleted task ID in the payload
        } catch (error) {
            throw error;
        }
    }
);

// Create an async thunk for editing a task
export const editTask = createAsyncThunk(
    "tasks/editTask",
    async ({ taskId, updatedData }) => {
        try {
            const response = await callApi("put", `/api/v1/crm/tasks/${taskId}`, updatedData);
            return response.data; // Assuming your API response has a 'data' property
        } catch (error) {
            throw error;
        }
    }
);

// Create a slice of the Redux store
const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tasks = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(editTask.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.tasks = state.tasks.map((task) =>
                    task.id === action.payload.id ? action.payload : task
                );
            })
            .addCase(editTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

// Export the async thunks and the reducer
export const { reducer } = tasksSlice;
export const { fetchTasks, editTask, deleteTask } = tasksSlice.actions;
export default reducer;
