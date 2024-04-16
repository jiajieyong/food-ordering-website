import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Label } from "../ui/label"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
import { Button } from "../ui/button";
import { Trash2 } from  "lucide-react";
interface IDetails {
    detail: IMenuItem;
    quantity: number;
    handleDelete: (itemID: string) => void,
}

export function OrderRow(props: IDetails) {
    const { detail, quantity, handleDelete } = props;
    const { id, name, pricing } = detail;
    return (
        <TableRow>
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
                <ToggleGroupItem value="-">-</ToggleGroupItem>
                <div>{quantity}</div>
                <ToggleGroupItem value="+">+</ToggleGroupItem>
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
                    onClick={() => handleDelete(id)}
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </TableCell>
        </TableRow>
    )

};