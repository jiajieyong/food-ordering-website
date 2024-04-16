"use client";
import { useForm, FormProvider } from 'react-hook-form';
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

type IOrder = {
    name: string,
    quantity: number,
    pricing: number
}

export interface IFormValues {
    order: IOrder[]
}

export function OrderTable() {
    const menuItems = useAppSelector((state) => state.menuItem.menuItems);
    const orderItems = useAppSelector((state) => state.order.items);
    const totalPrice = useAppSelector(getTotalPrice);
    const methods = useForm<IFormValues>();

    const onSubmit = (data:any) => console.log(data);

    return (
        <FormProvider {...methods} >
        <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                            index={index}
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
            <input type="submit" />
        </form>
        </FormProvider>
    )
}