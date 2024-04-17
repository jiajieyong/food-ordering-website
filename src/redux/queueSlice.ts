import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

type QueueStatus = "IDLE" | "LOADING" | "SUCCESSFUL" | "ERROR";

interface IQueueState {
    queueItems: number[],
    status: QueueStatus,
    error?: string
}

const initialState: IQueueState = {
    queueItems: [],
    status: 'IDLE',
}

  // Get queue from the API
export const getQueue = createAsyncThunk('queue/get', async () => {
    try {
        const res = await axios.get(`http://localhost:8080/queue-numbers`, {
            headers: {
                "Access-Control-Allow-Origin": 'http://localhost:3000',
                "Access-Control-Allow-Credentials": 'true'
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
        // return thunkAPI.rejectWithValue(error);
    }
})

const queueSlice = createSlice({
    name: 'queue',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getQueue.pending, (state, action) => {
            state.status = 'LOADING'
        })
        builder.addCase(getQueue.fulfilled, (state, action) => {
            state.status = 'SUCCESSFUL'
        })
        builder.addCase(getQueue.rejected, (state, action) => {
            state.status = 'ERROR';
            state.error = action.error.message;
        })
    }
});

export default queueSlice.reducer;