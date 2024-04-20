"use client";

import { Utensils } from 'lucide-react';
import Link from 'next/link';
import CartNavigation from './cartNavigation';
import OrderNavigation from './orderNavigation';

const Navigation = () => {
    return (
      <div className="py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-2 justify-between items-center">
          <Link href="/menu" className="text-3xl font-bold tracking-tight text-orange-500">Menu</Link>
          <Utensils className="text-orange-500"/>
        </div>
        <div className='flex space-x-4'>
          <OrderNavigation />
          <CartNavigation />
        </div>
        {/* <Link href="/queue" className="text-muted-foreground transition-colors hover:text-foreground">Queue</Link> */}
      </div>
    </div>
    );
  };

export default Navigation;