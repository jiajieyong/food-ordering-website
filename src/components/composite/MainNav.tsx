
import Link from 'next/link';

const MainNav = () => {
    return (
        <span className="flex space-x-2 items-center">
            <Link href="/orderform" className="font-bold text-orange-500">
                Order
            </Link>
        </span>
    );
};

export default MainNav;