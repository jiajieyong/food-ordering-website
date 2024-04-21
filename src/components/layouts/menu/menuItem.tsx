import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useAppDispatch } from "@/hooks/hooks";
import { cn } from "@/lib/utils"
import { addToOrder } from "@/redux/orderSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"

interface IDetails {
  detail: IMenuItem;
}

export function MenuItem(props: IDetails) {
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
            src={`/images/${category}/${imagePath}`}
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
