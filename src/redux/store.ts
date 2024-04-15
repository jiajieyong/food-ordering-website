import { configureStore } from "@reduxjs/toolkit";
import orderReducer from "./orderSlice";
import menuItemReducer from  "./menuItemSlice";

export const store = configureStore({
    reducer: {
        order: orderReducer,
        menuItem: menuItemReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;