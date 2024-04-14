import { useEffect, useState } from "react";
import { IMenuItem } from '../components/composite/cardDisplay';

const menu: IMenuItem[] = [
    { name: "Bee Hoon", pricing: 99.99, description: "Fried noodle", category: "noodle" , imagePath: "beehoon"  },
    { name: "Chicken Rice", pricing: 99.99, description: "Hainanese Recipe", category: "rice" , imagePath: "chickenrice"  },
    { name: "Calamari", pricing: 99.99, description: "Served with dips", category: "sideDish" , imagePath: "calamari"  },
    { name: "Dumpling", pricing: 99.99, description: "", category: "sideDish" , imagePath: "dumpling"  },
    { name: "Laksa", pricing: 99.99, description: "Coconut infused noodle", category: "noodle" , imagePath: "laksa"  },
    { name: "Ramen", pricing: 99.99, description: "Topped with naruto", category: "noodle" , imagePath: "ramen"  },
    { name: "Fries", pricing: 99.99, description: "Cheese melted over it", category: "sideDish" , imagePath: "fries"  },
    { name: "Fried Egg Plant", pricing: 99.99, description: "Worst seller", category: "sideDish" , imagePath: "friedeggplant"  },
];

export const useMenuItems = () => {
    const [menuItems, setMenuItems] = useState<any[]>([]);

    const fetchMenuItems = async () => {
        const response = await menu;

        if ( response ) setMenuItems(menu);
    }

    useEffect(() => {
        fetchMenuItems();
    }, []);

    return menuItems;
}