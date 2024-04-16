import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
interface OrderState {
    items: { [id: string]: number}
}

const initialState: OrderState ={
    items: {}
}
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
        removeFromOrder(state,action: PayloadAction<string>) {
            delete state.items[action.payload];
        }
    }
});

export const { addToOrder, removeFromOrder } = orderSlice.actions;
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