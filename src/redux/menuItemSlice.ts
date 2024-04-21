import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface MenuItemsState {
    menuItems: { [id: string]: IMenuItem}
}

export const initialState: MenuItemsState = {
    menuItems: {}
}
export const menuItemsSlice = createSlice({
    name: 'menuItems',
    initialState,
    reducers: {
        receivedMenuItems(state, action: PayloadAction<IMenuItem[]>) {
            const menuItems = action.payload;
            menuItems.forEach(item => {
                state.menuItems[item.id] = item;
            })
        }
    }
});

export const { receivedMenuItems } = menuItemsSlice.actions;
export default menuItemsSlice.reducer;