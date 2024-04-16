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
import { useFormContext } from 'react-hook-form';

interface IDetails {
    detail: IMenuItem;
    index: number;
    quantity: number;
}

export function OrderRow({ index, value, remove }: any) {
    const dispatch = useAppDispatch();
    const { register , setValue } = useFormContext();
    const { identifier, name, pricing, quantity } = value;
    return (
        <TableRow>
            <TableCell className="font-semibold">
                <input type="hidden" {...register(`${index}.name`)} value={name} />
                {name}
            </TableCell>
            <TableCell>
                <Label htmlFor="stock-1" className="sr-only">
                    Price
                </Label>
                <input type="hidden" {...register(`${index}.pricing`)} value={pricing} />
                S$ {pricing}
            </TableCell>
            <TableCell>
                <Label htmlFor="price-1" className="sr-only">
                    Quantity
                </Label>
                <input type="hidden" {...register(`${index}.quantity`)} value={quantity} />
                <ToggleGroup
                    type="multiple"
                    variant="outline"
                >
                <ToggleGroupItem
                    value="-"
                    onClick={() => {
                        dispatch(decrementQuantity(identifier));
                        setValue(`orders.${index}.quantity`, quantity-1);
                    }}
                >-
                </ToggleGroupItem>
                <div>{quantity}</div>
                <ToggleGroupItem value="+" onClick={() => {
                    dispatch(incrementQuantity(identifier))
                    setValue(`orders[${index}].quantity`, quantity+1);
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
                        dispatch(removeFromOrder(identifier));
                        remove(index);
                        }
                    }
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </TableCell>
        </TableRow>
    )

};