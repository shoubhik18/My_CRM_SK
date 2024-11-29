'use client'
import React, { useState } from 'react';
import { LeadeData } from '../component/Type';
import EditLeade from '@/app/leads/EditLeade';
import LeadesPage from '@/app/leads/LeadesPage';
import { useAppDispatch } from '@/lib/store';
import { getUser } from '@/lib/features/auth/authSlice';
import Calendar from './calendar/Calendar';

const Page = () => {
    const [leade, setLeade] = useState<LeadeData[] | null>(null);
    const [id, setID] = useState<number>(-1);
    const [calendar, setCalendar] = useState<boolean>(false);
    const [pagination, setPagination] = useState<number>(0);
    const [activeFilter, setActiveFilter] = useState<string>('all')
    const dispatch = useAppDispatch()


    const handelOnSet = (id: number, data: LeadeData[]) => {
        setID(id);
        setLeade(data);
        if (id !== -1) {
            dispatch(getUser('salesperson'))
        }
    };


    return (
        <>
            {calendar ?
                <Calendar setCalendar={setCalendar} /> :
                id === -1 ? (
                    <LeadesPage handelOnSet={handelOnSet} pagination={pagination} activeFilter={activeFilter} setActiveFilter={setActiveFilter} setPagination={setPagination} calendar={calendar} setCalendar={setCalendar} />
                ) : (
                    <EditLeade handelOnSet={handelOnSet} leade={leade} />
                )}
        </>
    );
};

export default Page;
