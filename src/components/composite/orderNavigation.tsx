import Link from 'next/link';
import { useAppSelector } from '@/hooks/hooks';
import { ReceiptText } from 'lucide-react';
import { getMemoizedNumItems } from '@/redux/orderSlice';

const OrderNavigation = () => {
    const getCartItems = useAppSelector(getMemoizedNumItems);
    return (
        <span className="flex space-x-2 items-center">
            <Link href="/queue" className="flex space-x-2 justify-between items-center font-bold text-orange-500">
                <ReceiptText />
                <div>{getCartItems}</div>
            </Link>
        </span>
    );
};

export default OrderNavigation;