import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface MenuItemsState {
    menuItems: { [id: string]: IMenuItem}
}

const initialState: MenuItemsState ={
    menuItems: {}
}
const menuItemsSlice = createSlice({
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