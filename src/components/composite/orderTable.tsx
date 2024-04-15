"use client";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { OrderRow } from "./orderRow"
import { useAppSelector } from '@/hooks/hooks';

export function OrderTable() {
    const menuItems = useAppSelector((state) => state.menuItem.menuItems);
    const orderItems: {[id: string]: number } = useAppSelector((state) => state.order.items);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Item</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="w-[100px]">Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Object.entries(orderItems).map(([id, quantity], index) => (
                    <OrderRow key={index} detail={menuItems[id] as IMenuItem} quantity={quantity}/>
                ))}

            </TableBody>
        </Table>
    )
}