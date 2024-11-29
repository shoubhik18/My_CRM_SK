'use client'
import React, { useState } from 'react';
import New_Task from "../../assets/new_task.svg";
import Image from 'next/image';
import { IoIosArrowDown, IoIosArrowForward, IoIosArrowUp } from 'react-icons/io';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useAppDispatch, useAppSelector } from '@/lib/store';
import { deleteSingleTaskData, getTaskIdData } from '@/lib/features/task/taskSlice';
import moment from 'moment';
import { toast } from 'react-toastify';
import Loader from '../component/Loader';

const ActivityAccordion = () => {
    const [childId, setChildId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch()
    const { SingleLead } = useAppSelector((state) => state?.lead)


    const handleOnChildId = (id: number) => {
        setChildId(childId === id ? null : id);
    }

    const handelOnDelete = (id: any) => {
        setIsLoading(id);
        dispatch(deleteSingleTaskData(id)).unwrap().then((res: any) => {
            if (res) {
                toast.success(res?.data?.message ? res?.data?.message : "Task Deleted Successfully");
                dispatch(getTaskIdData(SingleLead?.userId))
            }
        })
            .catch((err: any) => {
                const error = JSON.parse(err?.message)
                toast.error(error?.message ? error?.message : "Something went wrong");
            }).finally(() => {
                setIsLoading(false);
            });

    }


    const item: any[] = [{
        id: 1,
        subject: "test",
        dueDate: new Date(),
        priority: "testttt",
        header: "assigned To Pavan",
        des: "Lorem ipsum dolor sit amet consectetur. Accumsan risus ut luctus eleifend varius turpis.",
        lead: {
            name: "111"
        }
    }]

    return (
        <div>
            {/* <h2>
                <button
                    type="button"
                    className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border-b border-b-gray-200"
                >
                    <span className="text-black text-xl font-bold">{'Upcoming & Overdue'}</span>
                    <IoIosArrowUp size={22} />
                </button>
            </h2> */}
            <div className='border-b border-gray-200 mt-4'>
                {item?.map((data: any, index: number) => {
                    const key = Object.keys(data)[0];
                    const value = data[key];
                    return (
                        <div key={index} className="flex gap-3.5" >
                            {index === childId ? <IoIosArrowDown size={22} /> : <IoIosArrowForward size={22} />}

                            {/* <ol className="relative border-s-2 border-dashed border-red-600 w-full"> */}
                            <ol className="relative w-full">
                                <li className="mb-10 ms-6">
                                    <span className="absolute flex items-center justify-center w-8 h-8 bg-white rounded-full -start-4">
                                        <Image src={New_Task} alt={key} />
                                    </span>
                                    <div className="flex justify-between items-center">
                                        <div className='flex gap-5' onClick={() => handleOnChildId(index)}>
                                            <h3 className="text-sky-600 text-xl font-bold mb-2 cursor-pointer">Task {index + 1}</h3>
                                            <span className='text-base'>{data?.header}</span>
                                        </div>
                                        {isLoading === data?.id ? <Loader /> : < div className="text-base p-1 rounded z-10 cursor-pointer" onClick={() => handelOnDelete(data?.id)}>
                                            {/* <RiDeleteBin6Line size={24} className='text-red-400' /> */}
                                            25 Aug 2024 at 12:30Pm
                                        </div>}
                                    </div>
                                    <span className='text-base'>{data?.des}</span>
                                    {index === childId && <div className="px-2 sm:px-8 py-4 flex flex-wrap gap-2 sm:gap-4 lg:gap-10">
                                        <div className="flex flex-wrap gap-2 sm:gap-4 lg:gap-10">
                                            <p className="text-neutral-800 text-sm sm:text-base font-semibold">Subject: <span className="font-normal">{data?.subject ? data?.subject : '-'}</span></p>
                                            <p className="text-neutral-800 text-sm sm:text-base font-semibold">DueDate: <span className="font-normal">{data?.dueDate ? moment.utc(data?.dueDate).format("DD-MM-YYYY h:mm A") : "-"}</span></p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 sm:gap-4 lg:gap-10">
                                            <p className="text-neutral-800 text-sm sm:text-base font-semibold">Priority: <span className="font-normal">{data?.priority ? data?.priority : "-"}</span></p>
                                            <p className="text-neutral-800 text-sm sm:text-base font-semibold">Owner: <span className="font-normal">{data?.lead?.name ? data?.lead?.name : '-'}</span></p>
                                        </div>
                                    </div>}
                                </li>
                            </ol>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

export default ActivityAccordion;
