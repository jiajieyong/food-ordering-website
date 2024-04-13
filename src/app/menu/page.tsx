import { CardDisplay, IDetails } from "../../components/composite/cardDisplay";

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
  return (
    <div className="flex justify-center">
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
