"use client";

import Link from 'next/link';
import MainNav from './MainNav';
import { Utensils } from 'lucide-react';

const Navigation = () => {
    return (
      <div className="py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-2 justify-between items-center">
          <Link href="/menu" className="text-3xl font-bold tracking-tight text-orange-500">Menu</Link>
          <Utensils className="text-orange-500"/>
        </div>
        <MainNav />
        {/* <Link href="/queue" className="text-muted-foreground transition-colors hover:text-foreground">Queue</Link> */}
      </div>
    </div>
    );
  };

export default Navigation;