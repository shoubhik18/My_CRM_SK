'use client'
import React, { useState } from 'react';
import { CommonInterFace } from '../component/Type';
import EditCampaign from './EditCampaign';
import CampaignPage from './CampaignPage';
import Calendar from './calendar/Calendar';

const Page = () => {
    const [campaign, setCampaign] = useState<CommonInterFace[] | null>(null);
    const [id, setID] = useState<number>(-1);
    const [pagination, setPagination] = useState<number>(0);
    const [activeFilter, setActiveFilter] = useState<string>('all')
    const [calendar, setCalendar] = useState<boolean>(false);

    const handelOnSet = (id: number, data: CommonInterFace[]) => {
        setID(id);
        setCampaign(data);
    };

    return (
        <>
            {calendar ?
                <Calendar setCalendar={setCalendar} /> :
                id === -1 ? (
                    <CampaignPage handelOnSet={handelOnSet} pagination={pagination} activeFilter={activeFilter} setActiveFilter={setActiveFilter} setPagination={setPagination} calendar={calendar} setCalendar={setCalendar} />
                ) : (
                    <EditCampaign handelOnSet={handelOnSet} campaign={campaign} />
                )}
        </>
    );
};

export default Page;
