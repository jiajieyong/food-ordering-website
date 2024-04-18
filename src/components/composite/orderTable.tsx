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
import { Button } from "../ui/button";
import { Checkbox } from '@/components/ui/checkbox';
import { OrderRow } from "./orderRow";
import { useAppSelector, useAppDispatch } from '@/hooks/hooks';
import { getTotalPrice, postOrder } from '@/redux/orderSlice';
import { zodResolver } from "@hookform/resolvers/zod";
import { FormFieldSchema } from "@/types/form";

export type IOrder = {
    identifier: string,
    itemName: string,
    quantity: number,
    pricing: number
}

export interface IFormValues {
    items: IOrder[]
}

export function OrderTable() {
    const dispatch = useAppDispatch();
    const menuItems = useAppSelector((state) => state.menuItem.menuItems);
    const order = useAppSelector((state) => state.order);
    const totalPrice = useAppSelector(getTotalPrice);
    const methods = useForm(
        {
            defaultValues:  {
                items: Object.entries(order.items).map(([identifier, quantity]) => (
                    { itemName: menuItems[identifier].name,  pricing: menuItems[identifier].pricing, quantity: quantity, identifier: identifier}
                )),
            },
            resolver: zodResolver(FormFieldSchema),
        }
    );
    const { reset, formState: {errors}} = methods;

    const onSubmit = (data:IFormValues) => {
        dispatch(postOrder(data))
            .unwrap()
            .then((originalPromiseResult) => {
                reset({items: []});
            })
            .catch((rejectedValueOrSerializedError) => {
                console.log('error');
            });
    };


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
            <div className="flex flex-col">
                <div className="items-top flex space-x-2">
                    <Checkbox id="terms1" required={true}/>
                    <div className="grid gap-1.5 leading-none">
                        <label
                        htmlFor="terms1"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            I agree I have no food allergy
                        </label>
                    </div>
                </div>
            {errors && <span className="error-message">{errors.items?.root?.message}</span>}
                <Button className={"my-8"}>
                    Submit
                </Button>

            </div>
        </form>
        </FormProvider>
    )
}

const FormArray = () => {
    const { control } = useFormContext();
    const { fields, remove, update } = useFieldArray({
        control,
        name: 'items'
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