import { useState } from "react";
import Image from "next/image";
import _ from 'lodash';
import { Button } from "../../ui/button";
import {
    TableRow,
    TableCell
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useMenuItems } from "@/hooks/useMenuItems";
import { addToOrder } from "@/redux/orderSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { useFormContext } from 'react-hook-form';

export const EmptyCart = () => {
    const dispatch = useAppDispatch();
    const { reset } = useFormContext();
    const [selectedItem, setSelectedItem] = useState('');
    const menu = useMenuItems();
    const menuGroup = Object.groupBy(Object.values(menu), ({ category}) => category);


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
                <Select onValueChange={(e) => setSelectedItem(e)}>
                    <SelectTrigger className="w-[280px] my-4">
                        <SelectValue placeholder="Select a menu item" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        {
                            Object.entries(menuGroup).map(([category, items], index) => {
                                return (
                                    <SelectGroup key={index}>
                                        <SelectLabel>{_.startCase(category).toString()}</SelectLabel>
                                        {
                                            items && items.map((item: IMenuItem, index: number) => {
                                                return <SelectItem key={index} value={item.id}>{item.name}</SelectItem>
                                            })
                                        }
                                    </SelectGroup>
                                )
                            })
                        }
                    </SelectContent>
                </Select>
                <Button
                    variant="outline"
                    onClick={onSubmit}
                >
                    Add to cart
                </Button>
            </TableCell>
        </TableRow>
    )
}