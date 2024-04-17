"use client";

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getQueue } from "@/redux/queueSlice";

export function Queue() {
    const dispatch = useAppDispatch();
    const queue = useAppSelector((state) => state.queue);
    const { queueItems, status, error } = queue;

    useEffect(() => {
        if (status === 'IDLE') {
            dispatch(getQueue())
        }
    }, [status, dispatch])


    return (
        <>
            {(status === "LOADING") && <div>loading data</div>}
            {(status === "SUCCESSFUL") &&
                (
                    <>
                        <div>Ready to collect: {queueItems.collection}</div>
                        <div>Preparing:</div>
                        {
                            queueItems.preparing.map((orderNumber, index) => {
                                return <div key={index}>{orderNumber}</div>
                            })
                        }
                    </>
                )
            }
            {(status === "ERROR") && <div>{error}</div>}
        </>
    )
}