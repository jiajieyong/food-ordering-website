"use client";
import { Filter } from "@/components/layouts/menu/filter";
import { MenuItem } from "@/components/layouts/menu/menuItem";
import { useFilterItems, useFilterOptions } from "@/hooks/useFilter";
import { useMenuItems } from "@/hooks/useMenuItems";

const MenuPage = () => {
  const CHECK_ITEMS = ['All', 'Noodle', 'Rice', 'Side Dish'];
  const menu = useMenuItems();

  const { checkedSelection, onCheckedChange} = useFilterOptions(CHECK_ITEMS);
  const filteredMenu = useFilterItems(Object.values(menu), checkedSelection);

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
