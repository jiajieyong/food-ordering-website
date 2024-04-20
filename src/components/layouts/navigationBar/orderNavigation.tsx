import { ReceiptText } from 'lucide-react';
import Link from 'next/link';
import { useAppSelector } from '@/hooks/hooks';

const OrderNavigation = () => {
    const order = useAppSelector((state) => state.order.queueNumber);
    return (
        <span className="flex space-x-2 items-center">
            <Link href="/queue" className="flex space-x-2 justify-between items-center font-bold text-orange-500">
                <ReceiptText />
                <div>{order.length}</div>
            </Link>
        </span>
    );
};

export default OrderNavigation;