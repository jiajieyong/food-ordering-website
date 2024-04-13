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

interface IDetails {
  dishName: string;
  pricing: number;
  description: string;
  category: string;
  image: string;
}

type CardProps = React.ComponentProps<typeof Card>

export function CardDisplay(details: IDetails, { className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[300px]", className)} {...props}>
      <CardHeader>
        <CardTitle>{details.dishName}</CardTitle>
        <CardDescription>S$ {details.pricing}</CardDescription>
        <CardDescription>{details.description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
            <Image
              alt={details.dishName}
              className="aspect-square w-full rounded-md object-cover"
              height="270"
              src={`images/${details.category}/${details.image}.jpg`}
              width="270"
            />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full"> Add to cart
        </Button>
      </CardFooter>
    </Card>
  )
}
