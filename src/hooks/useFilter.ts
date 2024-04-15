import { useState, useMemo } from "react";

export function useFilterOptions(filterList: string[]) {
    const [checkedSelection, setCheckedSelection] = useState([filterList[0]]);

    function onCheckedChange(item: string) {
        setCheckedSelection((current) =>
            current.includes(item)
        ? current.filter((el) => el !== item)
        : current.concat(item)
        )
    }

    return { checkedSelection, onCheckedChange }
}

export function useFilterItems(menu: IMenuItem[], checkedSelection: string[]) {
    const filteredMenu = useMemo(() => {
        const filterOptions = checkedSelection.map((selection) => selection.replace(/\s/g, '').toLowerCase());

        if (filterOptions.includes('all')) {
            return menu;
        } else {
            return menu.filter((item: IMenuItem) => filterOptions.includes(item.category.toLowerCase()));
        }
    }, [menu, checkedSelection]);

    return filteredMenu;
}


