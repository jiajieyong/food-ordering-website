"use client";

import { Button } from  "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from 'next/link';
import { Menu, Package2 } from "lucide-react"

const Navigation = () => {
    return (
      <div className="flex min-h-screen w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link href="/menu" className="text-muted-foreground transition-colors hover:text-foreground">Menu</Link>
            <Link href="/order" className="text-muted-foreground transition-colors hover:text-foreground">Order</Link>
            <Link href="/queue" className="text-muted-foreground transition-colors hover:text-foreground">Queue</Link>
          </nav>
          <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="/menu" className="flex items-center gap-2 text-lg font-semibold"><Package2 className="h-6 w-6" /></Link>
              <Link href="/menu" className="text-muted-foreground hover:text-foreground">Menu</Link>
              <Link href="/order" className="text-muted-foreground hover:text-foreground">Orders</Link>
              <Link href="/queue" className="text-muted-foreground hover:text-foreground">Queue</Link>
            </nav>
          </SheetContent>
        </Sheet>
        </header>
      </div>
    );
  };

export default Navigation;