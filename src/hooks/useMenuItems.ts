import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { receivedMenuItems } from '../redux/menuItemSlice';

const menu: IMenuItem[] = [
    { id: "1", name: "Bee Hoon", pricing: 99.99, description: "Fried noodle", category: "noodle" , imagePath: "beehoon"  },
    { id: "2", name: "Chicken Rice", pricing: 99.99, description: "Hainanese Recipe", category: "rice" , imagePath: "chickenrice"  },
    { id: "3", name: "Calamari", pricing: 99.99, description: "Served with dips", category: "sideDish" , imagePath: "calamari"  },
    { id: "4", name: "Dumpling", pricing: 99.99, description: "", category: "sideDish" , imagePath: "dumpling"  },
    { id: "5", name: "Laksa", pricing: 99.99, description: "Coconut infused noodle", category: "noodle" , imagePath: "laksa"  },
    { id: "6", name: "Ramen", pricing: 99.99, description: "Topped with naruto", category: "noodle" , imagePath: "ramen"  },
    { id: "7", name: "Fries", pricing: 99.99, description: "Cheese melted over it", category: "sideDish" , imagePath: "fries"  },
    { id: "8", name: "Fried Egg Plant", pricing: 99.99, description: "Worst seller", category: "sideDish" , imagePath: "friedeggplant"  },
];

export const useMenuItems = () => {
    const dispatch = useAppDispatch();

    const fetchMenuItems = async () => {
        const response = await menu;

        if ( response ) dispatch(receivedMenuItems(menu));
    }

    useEffect(() => {
        fetchMenuItems();
    });

    const menuItems = useAppSelector((state) => state.menuItem.menuItems);

    return menuItems;
}