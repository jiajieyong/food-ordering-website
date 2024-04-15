import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { addToOrder } from "@/redux/orderSlice";
import { useAppDispatch } from "@/hooks/hooks";

interface IDetails {
  detail: IMenuItem;
}

export function CardDisplay(props: IDetails) {
  const { detail } = props;
  const { id, name, pricing, description, category, imagePath } = detail;
  const dispatch = useAppDispatch();

  return (
    <Card className={cn("w-[300px] bg-white")}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>S$ {pricing}</CardDescription>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
          <Image
            alt={name}
            className="aspect-square w-full rounded-md object-cover"
            height="270"
            src={`/images/${category}/${imagePath}.jpg`}
            width="270"
          />
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => dispatch(addToOrder(id))}
        >
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  )
}
