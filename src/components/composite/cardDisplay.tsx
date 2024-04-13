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

export interface IDetails {
  dishName: string;
  pricing: number;
  description: string;
  category: string;
  image: string;
}

export function CardDisplay(details: IDetails) {
  return (
    <Card className={cn("w-[300px] bg-white")}>
      <CardHeader>
        <CardTitle>{details.dishName}</CardTitle>
        <CardDescription>S$ {details.pricing}</CardDescription>
        <CardDescription>{details.description}</CardDescription>
      </CardHeader>
      <CardContent>
          <Image
            alt={details.dishName}
            className="aspect-square w-full rounded-md object-cover"
            height="270"
            src={`/images/${details.category}/${details.image}.jpg`}
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
