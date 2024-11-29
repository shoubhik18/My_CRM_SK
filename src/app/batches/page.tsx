'use client'
import React, { useState } from 'react';
import { CommonInterFace } from '../component/Type';
import { useAppDispatch } from '@/lib/store';
import { getUser } from '@/lib/features/auth/authSlice';
import BatchPage from './BatchPage';
import EditBatch from './EditBatch';

const Page = () => {
    const [batche, setBatche] = useState<CommonInterFace[] | null>(null);
    const [id, setID] = useState<number>(-1);
    const [pagination, setPagination] = useState<number>(0);
    const [activeFilter, setActiveFilter] = useState<string>('all')
    const dispatch = useAppDispatch()


    const handelOnSet = (id: number, data: CommonInterFace[]) => {
        setID(id);
        setBatche(data);
        if (id !== -1) {
            dispatch(getUser('salesperson'))
        }
    };


    return (
        <>
            {id === -1 ? (
                <BatchPage handelOnSet={handelOnSet} pagination={pagination} activeFilter={activeFilter} setActiveFilter={setActiveFilter} setPagination={setPagination} />
            ) : (
                <EditBatch handelOnSet={handelOnSet} batche={batche} />
            )}
        </>
    );
};

export default Page;
