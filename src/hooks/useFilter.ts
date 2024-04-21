import { useMemo, useState } from "react";

export function updateFilter(current: string[], selected: string): string[] {
    if (selected === 'All' && !current.includes('All')) {
        return ['All'];
    } else {
        current = current.filter((el: string) => el !== 'All');
    }

    if(current.includes(selected)) {
        current = current.filter((el: string) => el !== selected);
        return current.length === 0 ? ['All'] : current;
    } else {
        return current.concat(selected)
    }
}

export function useFilterOptions(filterList: string[]) {
    const [checkedSelection, setCheckedSelection] = useState([filterList[0]]);

    function onCheckedChange(item: string) {
        setCheckedSelection((current) =>
            updateFilter(current,item)
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


