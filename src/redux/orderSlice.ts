import { createSlice, createSelector, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import axios from 'axios';
import { IFormValues } from '@/components/composite/orderTable';

type SubmissionState = "SENDING" | "READY" | "ERROR";
interface OrderState {
    items: { [id: string]: number};
    submissionState: SubmissionState;
    queueNumber?: number | null;
}

const initialState: OrderState ={
    items: {},
    submissionState: "READY"
}

export const postOrder = createAsyncThunk('order/post', async (orders: IFormValues, thunkAPI) => {
        try {
            // const state = thunkAPI.getState() as RootState;
            let data = {
                "items": [
                  {
                    "itemName": "Bee hoon",
                    "quantity": 2
                  },
                ],
                "checkboxDeclare": true
              };
            axios.post(`http://localhost:3000/order`, data).then((res) => console.log(res));
            // state.order.queueNumber = res.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

const orderSlice = createSlice({
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
    },
    extraReducers: (builder) => {
        builder.addCase(postOrder.pending, (state, action) => {
            state.submissionState = 'SENDING';
        }),
        builder.addCase(postOrder.fulfilled, (state, action) => {
            // const { success } = action.payload;
            // if (success) {
                state.submissionState = "READY";
                state.items = {}
            // } else {
            //     state.submissionState ="ERROR";
            // }
        }),
        builder.addCase(postOrder.rejected, (state, action) => {
            state.submissionState = 'ERROR';
        })
    }
});

export const { addToOrder, incrementQuantity, decrementQuantity, removeFromOrder } = orderSlice.actions;
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