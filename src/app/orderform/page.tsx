"use client";
import { useState } from "react";
import { OrderTable } from '@/components/layouts/orderForm/orderTable';
import { SuccessBanner } from '@/components/layouts/orderForm/successBanner';

const Order = () => {
  const [successBanner, setSuccessBanner] = useState(false);

  function onSuccess() {
    setSuccessBanner(true);
  }

  return (
    <>
    { successBanner && <SuccessBanner /> }
      <div className="py-2 flex items-center justify-center">
        <OrderTable onSuccess={onSuccess}/>
      </div>
    </>
  );
};

export default Order;
