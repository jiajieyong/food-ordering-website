import Image from "next/image";
import _ from 'lodash';
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


export const EmptyCart = () => {
    const menu = useMenuItems();
    const menuGroup = Object.groupBy(Object.values(menu), ({ category}) => category);

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
                <Select>
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
            </TableCell>
        </TableRow>
    )
}