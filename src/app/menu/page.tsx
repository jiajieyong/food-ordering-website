"use client";

import { useState } from "react";
import { CardDisplay, IDetails } from "../../components/composite/cardDisplay";
import { Filter } from "../../components/composite/filter";

const menu: IDetails[] = [
    { dishName: "Bee Hoon", pricing: 99.99, description: "Fried noodle", category: "noodle" , image: "beehoon"  },
    { dishName: "Chicken Rice", pricing: 99.99, description: "Hainanese Recipe", category: "rice" , image: "chickenrice"  },
    { dishName: "Calamari", pricing: 99.99, description: "Served with dips", category: "sideDish" , image: "calamari"  },
    { dishName: "Dumpling", pricing: 99.99, description: "", category: "sideDish" , image: "dumpling"  },
    { dishName: "Laksa", pricing: 99.99, description: "Coconut infused noodle", category: "noodle" , image: "laksa"  },
    { dishName: "Ramen", pricing: 99.99, description: "Topped with naruto", category: "noodle" , image: "ramen"  },
    { dishName: "Fries", pricing: 99.99, description: "Cheese melted over it", category: "sideDish" , image: "fries"  },
    { dishName: "Fried Egg Plant", pricing: 99.99, description: "Worst seller", category: "sideDish" , image: "friedeggplant"  },
];

const MenuPage = () => {
  const CHECK_ITEMS = ['All', 'Noodles', 'Rice', 'Side Dish'];
  const [checkedSelection, setCheckedSelection] = useState([CHECK_ITEMS[0]]);

  function onCheckedChange(item: string) {
      setCheckedSelection((current) =>
          current.includes(item)
      ? current.filter((el) => el !== item)
      : current.concat(item)
      )
  }

  return (
    <div className="flex justify-center">
      <Filter list={CHECK_ITEMS} filterList={checkedSelection} handleChange={onCheckedChange} />
      <div className="grid grid-cols-1 tablet:grid-cols-3 laptop:grid-cols-4 gap-4">
          {menu.map((item: IDetails, index) => (
            <CardDisplay
              key={index}
              dishName={item.dishName}
              pricing={item.pricing}
              description={item.description}
              category={item.category}
              image={item.image}
            />
          ))
      }
      </div>
    </div>
  );
};

export default MenuPage;
