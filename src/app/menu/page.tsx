"use client";
import { CardDisplay, IMenuItem } from "../../components/composite/cardDisplay";
import { Filter } from "../../components/composite/filter";
import { useFilterOptions, useFilterItems } from "@/hooks/useFilter";
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
              <CardDisplay key={index} detail={item} />
            ))
          }
      </div>
    </div>
  );
};

export default MenuPage;
