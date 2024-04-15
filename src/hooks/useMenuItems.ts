import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { receivedMenuItems } from '../redux/menuItemSlice';
import { getMenu } from "@/services/api";

export const useMenuItems = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        getMenu().then((menu) => {
            dispatch(receivedMenuItems(menu))
        });
    }, []);

    const menuItems = useAppSelector((state) => state.menuItem.menuItems);

    return menuItems;
}