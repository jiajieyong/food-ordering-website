import { Trash2 } from  "lucide-react";
import { UseFieldArrayRemove, UseFieldArrayUpdate, useFormContext } from 'react-hook-form';
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useAppDispatch } from '@/hooks/hooks';
import { decrementQuantity, incrementQuantity, removeFromOrder } from '@/redux/orderSlice';
import FormField from './formField'
interface IRowProps {
    index: number;
    value: IOrder;
    remove: UseFieldArrayRemove;
    update: UseFieldArrayUpdate<IFormValues, "items">
}

export function FormFieldRow({ index, value, remove, update }: IRowProps) {
    const dispatch = useAppDispatch();
    const { register, formState: { errors } } = useFormContext<IFormValues>();
    const { identifier, itemName, pricing, quantity } = value;

    const decreaseQuantity = () => {
        dispatch(decrementQuantity(identifier));
        update(index, {...value, quantity: quantity-1});
    }

    const increaseQuantity = () => {
        dispatch(incrementQuantity(identifier));
        update(index, {...value, quantity: quantity+1});
    }

    const deleteRow = () => {
        dispatch(removeFromOrder(identifier));
        remove(index);
    }

    return (
        <TableRow>
            <TableCell className="font-semibold">
                <input type="hidden" {...register(`items.${index}.itemName`)} value={itemName} />
                {itemName}
            </TableCell>
            <TableCell>
                <input type="hidden" {...register(`items.${index}.pricing`)} value={pricing} />
                S$ {pricing}
            </TableCell>
            <TableCell>
                <ToggleGroup type="multiple" variant="outline">
                    <ToggleGroupItem value="-" onClick={decreaseQuantity}>-</ToggleGroupItem>
                        <div>{quantity}</div>
                    <ToggleGroupItem value="+" onClick={increaseQuantity}>+</ToggleGroupItem>
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
                    onClick={deleteRow}
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </TableCell>
        </TableRow>
    )

};