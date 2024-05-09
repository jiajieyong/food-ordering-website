import Image from "next/image";
import { useState } from "react";

import { useFormContext } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { useAppDispatch, useAppSelector } from "@/hooks/hooks";
import { addToOrder } from "@/redux/orderSlice";
import { MenuDropDown } from "./menuDropdown";

export const EmptyCart = () => {
    const dispatch = useAppDispatch();
    const { reset } = useFormContext();
    const [selectedItem, setSelectedItem] = useState('');
    const menu = useAppSelector((state) => state.menuItem.menuItems);


    function onSubmit() {
        if (selectedItem) {
            dispatch(addToOrder(selectedItem));
            const item = menu[selectedItem];
            reset({items: [{itemName: item.name, pricing: item.pricing, quantity: 1, identifier: selectedItem}]});
        }
    }

    return (
        <TableRow>
            <TableCell colSpan={2}>
                <Image
                    alt=""
                    className="rounded-md object-cover"
                    height="200"
                    src={`/images/empty.png`}
                    width="200"
                />
            </TableCell>
            <TableCell colSpan={4}>
                Oh no! Your cart is empty
                <MenuDropDown menu={menu} handleChange={setSelectedItem}/>
                <Button variant="outline" onClick={onSubmit}>
                    Add to cart
                </Button>
            </TableCell>
        </TableRow>
    )
}