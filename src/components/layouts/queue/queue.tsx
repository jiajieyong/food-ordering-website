"use client";

import { RefreshCcw } from 'lucide-react';
import { useEffect } from 'react';
import { ToastAction } from "@/components/ui/toast"
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { useToast } from "@/hooks/useToast"
import { dequeue } from '@/redux/orderSlice';
import { getQueue } from "@/redux/queueSlice";

import { LoadingPage } from './loadingPage';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "../../ui/card"

export function Queue() {
    const dispatch = useAppDispatch();
    const { queueItems, status }  = useAppSelector((state) => state.queue);
    const order = useAppSelector((state) => state.order.queueNumber);
    const { toast } = useToast();

    useEffect(() => {
        if (status === 'IDLE') {
            dispatch(getQueue())
        }
    }, [status, dispatch]);

    useEffect(() => {
      if (status === 'ERROR') {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request.",
          action: <ToastAction altText="Try again">Try again</ToastAction>,})
      }
  }, [status, toast])

    return (
        <>
            {(status === "LOADING") && <LoadingPage />}
            {
                (
                  <main className="grid flex-1 items-start gap-4 p-4 mobile:px-6 mobile:py-0 tablet:gap-8 laptop:grid-cols-3 desktop:grid-cols-3">
                  <div className="grid auto-rows-max items-start gap-4 tablet:gap-8 laptop:col-span-3">
                    <div className="grid gap-4 mobile:grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-2 desktop:grid-cols-4">
                        <Card className="mobile:col-span-2">
                          <CardHeader className="py-3">
                            <CardTitle className='flex item-center gap-4'>
                              Your Orders
                                <RefreshCcw
                                  onClick={
                                    () => {
                                      if (order[0] === queueItems.collection) {
                                        dispatch(dequeue());
                                      }
                                      dispatch(getQueue());
                                    }
                                    }
                                  />
                              </CardTitle>
                            <CardDescription className="max-w-lg text-balance leading-relaxed">
                              <div className="text-4xl">{order.join(', ')}</div>
                              {order.length === 0 && <div className="text-s text-muted-foreground">No pending orders</div>}
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      <Card>
                        <CardHeader className="py-3">
                          <CardDescription>Ready for collection</CardDescription>
                          <CardTitle className="text-4xl">{queueItems.collection}</CardTitle>
                        </CardHeader>
                      </Card>
                      <Card>
                        <CardHeader className="py-3">
                          <CardDescription>Preparing in kitchen</CardDescription>
                            <CardTitle className="text-4xl">{queueItems.preparing.join(', ')}</CardTitle>
                        </CardHeader>
                      </Card>
                    </div>
                  </div>
                </main>
                )
            }
        </>
    )
}