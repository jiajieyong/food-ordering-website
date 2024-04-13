import Image from "next/image"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import  beehoon from '../../lib/images/noodle/beehoon.jpg' ;
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"


const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

type CardProps = React.ComponentProps<typeof Card>

export function CardDisplay({ className, ...props }: CardProps) {
  return (
    <Card className={cn("w-[380px]", className)} {...props}>
      <CardHeader>
        <CardTitle>Bee Hoon</CardTitle>
        <CardDescription>S$ 6.50</CardDescription>
        <CardDescription>Fried noodle served with egg</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
            <Image
              alt="Product image"
              className="aspect-square w-full rounded-md object-cover"
              height="300"
              src={beehoon}
              width="300"
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
