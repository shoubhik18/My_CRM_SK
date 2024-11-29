'use client'
import React, { useState } from 'react';
import { LeadeData } from '../component/Type';
import { useAppDispatch } from '@/lib/store';
import { getUser } from '@/lib/features/auth/authSlice';
import EditTrainer from './EditTrainer';
import TrainerPage from './TrainerPage';

const Page = () => {
    const [trainer, setTrainer] = useState<LeadeData[] | null>(null);
    const [id, setID] = useState<number>(-1);
    const [pagination, setPagination] = useState<number>(0);
    const [activeFilter, setActiveFilter] = useState<string>('all')
    const dispatch = useAppDispatch()

    const handelOnSet = (id: number, data: LeadeData[]) => {
        setID(id);
        setTrainer(data);
        if (id !== -1) {
            dispatch(getUser('salesperson'))
        }
    };

    return (
        <>
            {id === -1 ? (
                <TrainerPage handelOnSet={handelOnSet} pagination={pagination} activeFilter={activeFilter} setActiveFilter={setActiveFilter} setPagination={setPagination} />
            ) : (
                <EditTrainer handelOnSet={handelOnSet} trainer={trainer} />
            )}
        </>
    );
};

export default Page;
