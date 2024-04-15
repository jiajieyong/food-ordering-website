import { createSlice } from '@reduxjs/toolkit';
import { IMenuItem } from '../components/composite/cardDisplay';

export interface MenuItemsState {
    menuItems: { [id: string]: IMenuItem}
}

const initialState: MenuItemsState ={
    menuItems: {}
}
const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        // addToOrder: (state, action) => {
        //     const itemExists = state.find((item) => item.id === action.payload.id);
        //     if (itemExists) {
        //         itemExists.quantity++;
        //     } else {
        //         state.push({ ...action.payload, quantity: 1});
        //     }
        // }
    }
});

export default orderSlice.reducer;
