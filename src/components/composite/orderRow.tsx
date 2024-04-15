import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Label } from "../ui/label"
import {
    ToggleGroup,
    ToggleGroupItem,
} from "@/components/ui/toggle-group"
interface IDetails {
    detail: IMenuItem;
    quantity: number;
}

export function OrderRow(props: IDetails) {
    const { detail, quantity } = props;
    const { name, pricing } = detail;
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
        </TableRow>
    )

};