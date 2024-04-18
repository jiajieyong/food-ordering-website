
import Link from 'next/link';
import { useAppSelector } from '@/hooks/hooks';
import { ShoppingCart } from 'lucide-react';
import { getMemoizedNumItems } from '@/redux/orderSlice';

const MainNav = () => {
    const getCartItems = useAppSelector(getMemoizedNumItems);
    return (
        <span className="flex space-x-2 items-center">
            <Link href="/orderform" className="flex space-x-2 justify-between items-center font-bold text-orange-500">
                    <ShoppingCart />
                    <div>{getCartItems}</div>
            </Link>
        </span>
    );
};

export default MainNav;