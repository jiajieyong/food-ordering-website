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

export interface IMenuItem {
  name: string;
  pricing: number;
  description: string;
  category: string;
  imagePath: string;
}
interface IDetails {
  detail: IMenuItem;
}

export function CardDisplay(props: IDetails) {
  const { detail } = props;
  const { name, pricing, description, category, imagePath } = detail;

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
        <Button className="w-full"> Add to cart
        </Button>
      </CardFooter>
    </Card>
  )
}
