import { Trash2 } from  "lucide-react";
import { FieldValues, UseFieldArrayRemove, UseFieldArrayUpdate, useFormContext } from 'react-hook-form';
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { useAppDispatch } from '@/hooks/hooks';
import { decrementQuantity, incrementQuantity, removeFromOrder } from '@/redux/orderSlice';
import FormField from './formField'
import { Button } from "../../ui/button";
import { Label } from "../../ui/label"
interface IRowProps {
    index: number;
    value: any;
    remove: UseFieldArrayRemove;
    update: UseFieldArrayUpdate<FieldValues, "items">
}

export function FormFieldRow({ index, value, remove, update }: IRowProps) {
    const dispatch = useAppDispatch();
    const { register, formState: { errors } } = useFormContext();
    const { identifier, itemName, pricing, quantity } = value;

    return (
        <TableRow>
            <TableCell className="font-semibold">
                <input type="hidden" {...register(`items.${index}.itemName`)} value={itemName} />
                {itemName}
            </TableCell>
            <TableCell>
                <Label htmlFor="stock-1" className="sr-only">
                    Price
                </Label>
                <input type="hidden" {...register(`items.${index}.pricing`)} value={pricing} />
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
                        dispatch(decrementQuantity(identifier));
                        update(index, {...value, quantity: quantity-1})
                    }}
                >-
                </ToggleGroupItem>
                <div>{quantity}</div>
                <ToggleGroupItem value="+" onClick={() => {
                    dispatch(incrementQuantity(identifier));
                    update(index, {...value, quantity: quantity+1})
                }}>+</ToggleGroupItem>
                </ToggleGroup>
                <FormField
                    type="hidden"
                    name={`items.${index}.quantity`}
                    register={register}
                    error={errors.items?.[index]?.quantity}
                    value={quantity}
                    valueAsNumber
                />
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