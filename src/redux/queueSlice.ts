import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type QueueStatus = "IDLE" | "LOADING" | "SUCCESSFUL" | "ERROR";

interface IQueueResult {
    collection: number | null,
    preparing: number[],
}

interface IQueueState {
    queueItems: IQueueResult,
    status: QueueStatus,
    error?: string
}

const initialState: IQueueState = {
    queueItems: {
        collection: null,
        preparing: []
    },
    status: 'IDLE',
}

  // Get queue from the API
export const getQueue = createAsyncThunk('queue/get', async (_, thunkAPI) => {
    try {
        const res = await axios.get(`http://localhost:3000/queue-numbers`, {
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue(error);
    }
});

const queueSlice = createSlice({
    name: 'queue',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getQueue.pending, (state, action) => {
            state.status = 'LOADING';
        })
        builder.addCase(getQueue.fulfilled, (state, action) => {
            state.queueItems = action.payload;
            state.status = 'SUCCESSFUL';
        })
        builder.addCase(getQueue.rejected, (state, action) => {
            state.status = 'ERROR';
            state.error = action.error.message;
        })
    }
});

export default queueSlice.reducer;