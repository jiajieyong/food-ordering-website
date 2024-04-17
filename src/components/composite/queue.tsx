"use client";

import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/hooks';
import { getQueue } from "@/redux/queueSlice";

export function Queue() {
    const dispatch = useAppDispatch();
    const queue = useAppSelector((state) => state.queue);
    const { queueItems, status, error } = queue;

    useEffect(() => {
        let isMounted = true

        if (status === 'IDLE') {
            dispatch(getQueue())
        }
        // Cleanup function
        return () => {
            isMounted = false
        }
    }, [status, dispatch])


    return (
        <>
            {(status === "LOADING") && <div>loading data</div>}
            {(status === "SUCCESSFUL") && <div>{queueItems}</div>}
            {(status === "ERROR") && <div>{error}</div>}
        </>
    )
}