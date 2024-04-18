
import { CircleCheckBig } from 'lucide-react';
import { useAppSelector } from "@/hooks/hooks";

export function SuccessBanner() {
    const queue = useAppSelector((state) => state.order.queueNumber);
    const orderNumber = queue[queue.length -1];

    return (
            <div className="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md" role="alert">
                <div className="flex justify-center">
                    <div className="py-2"><CircleCheckBig className="h-6 w-6 mr-4"/></div>
                    <div>
                        <p className="font-bold">Your order #{orderNumber} has been submitted successfully!</p>
                        <p className="text-sm">You can check the progress in the orders page.</p>
                    </div>
                </div>
            </div>
    );
};