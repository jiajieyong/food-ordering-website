"use client";

import Link from 'next/link';

const Navigation = () => {
    return (
      <div className="flex w-full flex-col">
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <nav className="flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
            <Link href="/menu" className="text-muted-foreground transition-colors hover:text-foreground">Menu</Link>
            <Link href="/orderform" className="text-muted-foreground transition-colors hover:text-foreground">Order</Link>
            <Link href="/queue" className="text-muted-foreground transition-colors hover:text-foreground">Queue</Link>
          </nav>
        </header>
      </div>
    );
  };

export default Navigation;