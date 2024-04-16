"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { OrderRow } from "./orderRow";
import { useAppSelector } from '@/hooks/hooks';
import { getTotalPrice } from '@/redux/orderSlice';

export function OrderTable() {

    const menuItems = useAppSelector((state) => state.menuItem.menuItems);
    const orderItems = useAppSelector((state) => state.order.items);
    const totalPrice = useAppSelector(getTotalPrice);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Item</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="w-[100px]">Total</TableHead>
                    <TableHead />
                </TableRow>
            </TableHeader>
            <TableBody>
                {Object.entries(orderItems).map(([id, quantity], index) => (
                    <OrderRow
                        key={index}
                        detail={menuItems[id]}
                        quantity={quantity}
                    />
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell/>
                    <TableCell/>
                    <TableCell>S$ {totalPrice}</TableCell>
                    <TableCell/>
                </TableRow>
            </TableFooter>
        </Table>
    )
}