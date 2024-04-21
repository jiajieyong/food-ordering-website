"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from 'react-hook-form';
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ToastAction } from "@/components/ui/toast"
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useToast } from "@/hooks/useToast"
import { getTotalPrice, postOrder } from '@/redux/orderSlice';
import { FormFieldSchema } from "@/types/form";
import { DeclarationBox } from './declarationBox';
import { OrderArray } from "./orderArray";
import { Button } from "../../ui/button";
interface IProps {
    onSuccess: () => void,
}

export function OrderTable({onSuccess}: IProps) {
    const dispatch = useAppDispatch();
    const { toast } = useToast();
    const menuItems = useAppSelector((state) => state.menuItem.menuItems);
    const order = useAppSelector((state) => state.order);
    const totalPrice = useAppSelector(getTotalPrice);
    const cartItems = Object.entries(order.items).map(([identifier, quantity]) => (
        { itemName: menuItems[identifier].name,  pricing: menuItems[identifier].pricing, quantity: quantity, identifier: identifier}
    ));
    const methods = useForm({
            defaultValues: { items: cartItems },
            resolver: zodResolver(FormFieldSchema),
    });
    const { reset, formState: {errors}} = methods;

    const onSubmit = (data: IFormValues) => {
        dispatch(postOrder(data))
            .unwrap()
            .then(() => {
                reset({items: []});
                onSuccess();
            })
            .catch(() => {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,})
            });
    };

    return (
        <>
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
                        <OrderArray />
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
                    <DeclarationBox />
                        {errors && <span className="error-message">{errors.items?.root?.message || errors.items?.message }</span>}
                    <Button className={"my-8"}>
                        Submit
                    </Button>
                </div>
            </form>
            </FormProvider>
        </>
    )
}