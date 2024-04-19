import {
    TableRow,
    TableCell
} from "@/components/ui/table";
import Image from "next/image";

export const EmptyCart = () => {
    return (
        <TableRow>
            <TableCell colSpan={2}>
                <Image
                    alt=""
                    className="rounded-md object-cover"
                    height="200"
                    src={`/images/empty.png`}
                    width="200"
                />
            </TableCell>
            <TableCell colSpan={4}>
                Oh no! Your cart is empty
            </TableCell>
        </TableRow>
    )
}