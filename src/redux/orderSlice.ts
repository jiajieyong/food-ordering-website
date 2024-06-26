import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from './store';

export type SubmissionState = "SENDING" | "READY" | "ERROR";
export interface OrderState {
    items: { [id: string]: number};
    submissionState: SubmissionState;
    queueNumber: number[];
}

export const initialState: OrderState = {
    items: {},
    submissionState: "READY",
    queueNumber: []
}

export const postOrder = createAsyncThunk('order/post', async (orders: IFormValues, thunkAPI) => {
        try {
            const res = await axios.post(`http://localhost:3000/order`, orders);
            return res;
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addToOrder(state, action: PayloadAction<string>) {
            const id = action.payload;
            if (state.items[id]) {
                state.items[id]++;
            } else {
                state.items[id] = 1;
            }
        },
        incrementQuantity(state, action: PayloadAction<string>) {
            state.items[action.payload]++;
        },
        decrementQuantity(state, action: PayloadAction<string>) {
            state.items[action.payload]--;
        },
        removeFromOrder(state,action: PayloadAction<string>) {
            delete state.items[action.payload];
        },
        dequeue(state) {
            state.queueNumber.shift();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(postOrder.pending, (state, action) => {
            state.submissionState = 'SENDING';
        }),
        builder.addCase(postOrder.fulfilled, (state, action) => {
            state.submissionState = "READY";
            state.items = {};
            state.queueNumber.push(action.payload.data.queueNum);
        }),
        builder.addCase(postOrder.rejected, (state, action) => {
            state.submissionState = 'ERROR';
        })
    }
});

export const { addToOrder, incrementQuantity, decrementQuantity, removeFromOrder, dequeue } = orderSlice.actions;
export default orderSlice.reducer;

export const getMemoizedNumItems = createSelector(
    (state: RootState) => state.order.items,
    (items) => {
        let numItems = 0;
        for (let id in items) {
            numItems += items[id];
        }
        return numItems;
    }
)

export const getTotalPrice = createSelector(
    (state: RootState) => state.order.items,
    (state: RootState) => state.menuItem.menuItems,
    (items, menuItems) => {
        let total = 0;
        for (let id in items) {
            total += menuItems[id].pricing * items[id];
        }

        return total.toFixed(2);
    }
)