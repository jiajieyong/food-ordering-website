"use client";
import { useEffect } from 'react';
import { Filter } from "@/components/layouts/menu/filter";
import { MenuItem } from "@/components/layouts/menu/menuItem";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { useFilterItems, useFilterOptions } from "@/hooks/useFilter";
import { getMenu } from "@/redux/menuItemSlice";

const MenuPage = () => {
  const dispatch = useAppDispatch();
  const CHECK_ITEMS = ['All', 'Noodle', 'Rice', 'Side Dish'];
  const {menuItems, status} = useAppSelector((state) => state.menuItem);

  const { checkedSelection, onCheckedChange} = useFilterOptions(CHECK_ITEMS);
  const filteredMenu = useFilterItems(Object.values(menuItems), checkedSelection);

  useEffect(() => {
    if (status === 'IDLE') {
        dispatch(getMenu())
    }
}, [status, dispatch]);

  return (
    <div className="flex justify-center">
      <Filter list={CHECK_ITEMS} filterList={checkedSelection} handleChange={onCheckedChange} />
      <div className="grid grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4 gap-4">
          {
            filteredMenu.map((item: IMenuItem, index) => (
              <MenuItem key={index} detail={item} />
            ))
          }
      </div>
    </div>
  );
};

export default MenuPage;
