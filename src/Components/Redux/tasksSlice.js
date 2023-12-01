import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import callApi from "../api";


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
        return response.data;
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

export const editTask = createAsyncThunk("tasks/editTask", async ({ taskId, updatedData }) => {
    try {
        const response = await callApi("PUT", `crm/tasks/${taskId}`, updatedData);
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
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = action.payload;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.data = state.data.filter((task) => task.id !== action.payload.id);
                console.log(action.payload)
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(editTask.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedData = action.payload;
                state.data = state.data.map((task) =>
                    task.id === updatedData.id ? updatedData : task
                );
            })
            .addCase(editTask.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchTaskById.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.selectedTask = action?.payload;
            })
            .addCase(fetchTaskById.pending, (state) => {
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