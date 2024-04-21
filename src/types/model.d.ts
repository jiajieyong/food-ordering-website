interface IMenuItem {
    id: string;
    name: string;
    pricing: number;
    description: string;
    category: string;
    imagePath: string;
}

interface IOrder  {
    identifier: string;
    itemName: string;
    quantity: number;
    pricing: number;
}

interface IFormValues {
    items: IOrder[]
}