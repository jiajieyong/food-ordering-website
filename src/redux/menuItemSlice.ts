import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type MenuStatus = "IDLE" | "LOADING" | "SUCCESSFUL" | "ERROR";
export interface MenuItemsState {
    menuItems: { [id: string]: IMenuItem},
    status: MenuStatus;
    error?: string
}

export const initialState: MenuItemsState = {
    menuItems: {},
    status: 'IDLE',
}

export const getMenu = createAsyncThunk('menu/get', async (_, thunkAPI) => {
    try {
        const res = await axios.get(`./mockData.json`);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error);
    }
}
)

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
    }, extraReducers: (builder) => {
        builder.addCase(getMenu.pending, (state, action) => {
            state.status = 'LOADING';
        })
        builder.addCase(getMenu.fulfilled, (state, action) => {
            const menuItems = action.payload;
            menuItems.forEach((item: IMenuItem) => {
                state.menuItems[item.id] = item;
            });
            state.status = 'SUCCESSFUL';
        })
        builder.addCase(getMenu.rejected, (state, action) => {
            state.status = 'ERROR';
            state.error = action.error.message;
        })
    }
});

export const { receivedMenuItems } = menuItemsSlice.actions;
export default menuItemsSlice.reducer;