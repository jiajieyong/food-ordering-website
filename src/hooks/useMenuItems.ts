import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { getMenu } from "@/services/api";
import { receivedMenuItems } from '../redux/menuItemSlice';

export const useMenuItems = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        getMenu().then((menu) => {
            dispatch(receivedMenuItems(menu))
        });
    }, [dispatch]);

    const menuItems = useAppSelector((state) => state.menuItem.menuItems);

    return menuItems;
}