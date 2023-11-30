import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../api";

// const initialState = {
//     tasks: [],
//     loading: false,
//     error: null,
//     selectedTask: null
// };

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
    try {
        const response = await callApi("GET", "crm/tasks");
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const fetchTaskById = createAsyncThunk("tasks/fetchTaskById", async (taskId) => {
    try {
        const response = await callApi("GET", `crm/tasks/${taskId}`);
        // console.log(response.data)
        return response.data; // Assuming the task details are nested under the "data" key
    } catch (error) {
        throw error;
    }
});

export const addNewTask = createAsyncThunk("tasks/addNewTask", async (newTaskData) => {
    try {
        const response = await callApi("POST", "crm/tasks", newTaskData);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
});

export const deleteTask = createAsyncThunk("tasks/deleteTask", async (taskId) => {
    try {
        const response = await callApi("DELETE", `crm/tasks/${taskId}`);
        return { id: taskId, ...response.data };
    } catch (error) {
        throw error;
    }
});

// export const editTask = createAsyncThunk("tasks/editTask", async ({ taskId, updatedData }) => {
//     try {
//         const response = await callApi("PUT", `crm/tasks/${taskId}`, updatedData);
//         console.log(response?.data);
//         console.log(response);
//         console.log(updatedData);
//         return response.data;
//     } catch (error) {
//         console.log(error);
//         throw error;
//     }
// });


export const editTask = createAsyncThunk("tasks/editTask", async ({ taskId, updatedData }) => {
    try {
        const response = await callApi("PUT", `crm/tasks/${taskId}`, updatedData);
        console.log(response);

        // Assuming your server includes the updated data in the response.data property
        // const updatedTaskData = response.data;

        // return updatedTaskData;
        return updatedData;
    } catch (error) {
        console.error("Error editing task:", error);
        throw error;
    }
});


const tasksSlice = createSlice({
    name: "tasks",
    initialState: {
        data: [],
        loading: false,
        error: null,
        selectTasks: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.status = "loading";
            })
            // .addCase(fetchTasks.fulfilled, (state, action) => {
            //     state.status = "succeeded";
            //     state.tasks = action.payload;
            // })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                // console.log("Fulfilled Action Payload:", action.payload); 
                state.status = "succeeded";
                state.data = action.payload; // Check if this should be state.data
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = "succeeded";
                // state.data = state.tasks.filter((task) => task.id !== action.payload.id);
                state.data = state.data.filter((task) => task.id !== action.payload.id);
                console.log(action.payload)
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            // .addCase(editTask.fulfilled, (state, action) => {
            //     state.status = "succeeded";
            //     // state.tasks = state.tasks.map((task) =>
            //     //     task.id === action.payload.id ? action.payload : task
            //     // );
            //     state.data = state.data.map((task) =>
            //         task.id === action.payload.id ? action.payload : task
            //     );
            //     console.log("Fulfilled edit Payload:", state.data);
            // })
            // .addCase(editTask.fulfilled, (state, action) => {
            //     state.status = "succeeded";
            //     // Check if response indicates success
            //     if (action.payload.success) {
            //         // Optionally, you can include the updated task details in the API response
            //         // and update the state accordingly.
            //         // Example assuming the updated task details are available in action.payload.task:
            //         const updatedTask = action.payload;
            //         state.data = state.data.map((task) =>
            //             task.id === updatedTask.id ? updatedTask : task
            //         );

            //     } else {
            //         // Handle the case where success is false or no specific data payload
            //         // You may not need to make any changes to the state in this scenario.
            //     }
            // })
            // .addCase(editTask.fulfilled, (state, action) => {
            //     state.status = "succeeded";
            //     // Check if response indicates success
            //     if (action.payload.success) {
            //         // Assuming your server includes the updated data in the response
            //         const updatedTaskData = action.payload.updatedTaskData;
            //         // Update the state with the new data
            //         state.data = state.data.map((task) =>
            //             task.id === updatedTaskData.id ? updatedTaskData : task
            //         );
            //     } else {
            //         // Handle the case where success is false or no specific data payload
            //         // You may not need to make any changes to the state in this scenario.
            //     }
            // })
            .addCase(editTask.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedData = action.payload; // Assuming action.payload contains the updated data
                console.log("edit fulfill ", action.payload)
                // Update the state with the new data
                state.data = state.data.map((task) =>
                    task.id === updatedData.id ? updatedData : task
                );
            })


            .addCase(editTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchTaskById.fulfilled, (state, action) => {
                // console.log("fetch task by id", action.payload)
                state.status = "succeeded";
                state.selectedTask = action?.payload;
            })
            .addCase(fetchTaskById.pending, (state) => {
                // Clear the selectedTask state when a new fetch starts
                state.selectedTask = null;
            })
            .addCase(fetchTaskById.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(addNewTask.pending, (state) => {
                state.status = "loading";
            })
            .addCase(addNewTask.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data.push(action.payload);
            })
            .addCase(addNewTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

// export const { reducer: tasksReducer } = tasksSlice;
// export const { fetchTasks, editTask, deleteTask } = tasksSlice.actions;

export const selectTasks = (state) => state.tasks;
export default tasksSlice.reducer;