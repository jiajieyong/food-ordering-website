"use client";
import { useForm, FormProvider, useFieldArray, useFormContext } from 'react-hook-form';
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
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldSchema } from "@/types/form";

export type IOrder = {
    identifier: string,
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
    const methods = useForm(
        {
            defaultValues:  {
                orders: Object.entries(orderItems).map(([identifier, quantity]) => (
                    { name: menuItems[identifier].name,  pricing: menuItems[identifier].pricing, quantity: quantity, identifier: identifier}
                ))
            },
            resolver: zodResolver(FormFieldSchema),
        }
    );

    const onSubmit = (data:any) => console.log(data.orders);
    const { formState: {errors}} = methods;

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
                    <FormArray />
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Total</TableCell>
                        <TableCell/>
                        <TableCell/>
                        <TableCell>S$ ${totalPrice}</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableFooter>
            </Table>
            {errors && <span className="error-message">{errors.orders?.root?.message}</span>}
            <input type="submit" />
        </form>
        </FormProvider>
    )
}

const FormArray = () => {
    const { control } = useFormContext();
    const { fields, remove, update } = useFieldArray({
        control,
        name: 'orders'
    });

    return (fields.map((field, index) => (
        <OrderRow
            key={field.id}
            index={index}
            value={field}
            remove={remove}
            update={update}
        />
        ))
    )
}