import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Label } from "../ui/label"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { useAppDispatch } from '@/hooks/hooks';
import { incrementQuantity, decrementQuantity, removeFromOrder } from '@/redux/orderSlice';
import { Button } from "../ui/button";
import { Trash2 } from  "lucide-react";
import { UseFormRegister, UseFormSetValue, UseFormUnregister } from 'react-hook-form';
import { IFormValues } from "./orderTable";

interface IDetails {
    detail: IMenuItem;
    index: number;
    quantity: number;
    register: UseFormRegister<IFormValues>;
    setValue: UseFormSetValue<IFormValues>;
    unregister: UseFormUnregister<IFormValues>;
}

export function OrderRow(props: IDetails) {
    const dispatch = useAppDispatch();
    const { detail, index, quantity, register, setValue, unregister } = props;
    const { id, name, pricing } = detail;
    return (
        <TableRow>
            <input type="hidden" {...register(`order.${index}.name`)} value={name} />
            <input type="hidden" {...register(`order.${index}.pricing`)} value={pricing} />
            <input type="hidden" {...register(`order.${index}.quantity`)} value={quantity} />

            <TableCell className="font-semibold">
                {name}
            </TableCell>
            <TableCell>
                <Label htmlFor="stock-1" className="sr-only">
                    Price
                </Label>
                S$ {pricing}
            </TableCell>
            <TableCell>
                <Label htmlFor="price-1" className="sr-only">
                    Quantity
                </Label>
                <ToggleGroup
                    type="multiple"
                    variant="outline"
                >
                <ToggleGroupItem
                    value="-"
                    onClick={() => {
                        dispatch(decrementQuantity(id));
                        setValue(`order.${index}.quantity`, quantity-1);
                    }}
                >-
                </ToggleGroupItem>
                <div>{quantity}</div>
                <ToggleGroupItem value="+" onClick={() => {
                    dispatch(incrementQuantity(id))
                    setValue(`order.${index}.quantity`, quantity+1);
                }}>+</ToggleGroupItem>
                </ToggleGroup>
            </TableCell>
            <TableCell>
                S$ {pricing * quantity}
            </TableCell>
            <TableCell>
                <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center h-7 gap-1 text-sm"
                    onClick={() => {
                        dispatch(removeFromOrder(id));
                        unregister(`order.${index}` );
                        }
                    }
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </TableCell>
        </TableRow>
    )

};