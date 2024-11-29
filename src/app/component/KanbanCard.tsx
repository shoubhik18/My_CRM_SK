import moment from 'moment';
import React from 'react';

const KanbanCard = ({
    onDragLeave,
    onDragEnter,
    onDragEnd,
    onDragOver,
    onDragStart,
    onDrop,
    data,
    name,
    headerName,
    designStatus = 1
}: {
    onDragLeave?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnter?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
    onDrop?: (e: React.DragEvent<HTMLDivElement>, data: string) => void;
    data?: any;
    name: string;
    headerName: string;
    designStatus?: number
}) => {
    const getBackgroundColor = () => {
        switch (headerName) {
            case 'Visiting':
            case 'Not Contacted':
            case 'Upcoming':
                return 'bg-green-100 border-t-green-300';
            case 'Visited':
            case 'Attempted':
            case 'Ongoing':
                return 'bg-blue-100 border-t-blue-300';
            case 'Lost Opportunity':
            case 'Cold Lead':
            case 'Completed':
                return 'bg-indigo-100 border-t-slate-400';
            case 'Demo attended':
            case 'Warm Lead':
            case 'Opportunity':
            case 'On Hold':
                return 'bg-orange-100 border-t-stone-400';
            default:
                return '';
        }
    };

    return (
        <div className="h-full grid gap-4">
            <div
                className={`${getBackgroundColor() || ''
                    } border-t-4 rounded-t-md h-20 min-w-96 py-3 px-5`}
            >
                <h3 className="text-base font-semibold">{headerName}</h3>
                <p className="text-sm font-semibold">
                    ₹ 0.00 <span className="text-sm font-medium"> . {data?.length} Leads</span>
                </p>
            </div>
            <div
                onDragLeave={onDragLeave}
                onDragEnter={onDragEnter}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                onDrop={(e) => onDrop && onDrop(e, name)}
                className="bg-gray-200 h-[63vh] px-0.5 max-w-96 flex items-center justify-center rounded"
            >
                {data?.length > 0 ? (
                    <div className="w-full h-full py-1 overflow-auto flex flex-col gap-3">
                        {data?.map((item: any) => {
                            console.log("🚀 ~ {data?.map ~ item:", item)
                            if (designStatus === 2) {
                                const getColorClass = (courseName: string) => {
                                    switch (courseName) {
                                        case "Morning":
                                            return "bg-orange-500 text-white";
                                        case "Evening":
                                            return "bg-stone-500 text-white";
                                        default:
                                            return "bg-transparent text-black";
                                    }
                                }
                                return (
                                    <div
                                        key={item?.id}
                                        id={item.id}
                                        draggable
                                        onDragStart={onDragStart}
                                        onDragEnd={onDragEnd}
                                        className="bg-white rounded py-3 px-5 cursor-move"
                                    >
                                        <div className="text-black text-base font-semibold">
                                            {item?.batchName}
                                        </div>
                                        <span className={`w-full h-auto flex flex-wrap mt-1.5 relative`}>
                                            <p
                                                className={`flex justify-center rounded-full w-48 h-7 items-center mb-1.5 ${getColorClass(
                                                    item?.slot
                                                )}`}
                                            >
                                                {item?.slot}
                                            </p>
                                        </span>

                                    </div>
                                )
                            } else if (designStatus === 3) {

                                return (
                                    <div
                                        key={item?.id}
                                        id={item.id}
                                        draggable
                                        onDragStart={onDragStart}
                                        onDragEnd={onDragEnd}
                                        className="bg-white rounded py-3 px-5 cursor-move"
                                    >
                                        <div className="text-black text-base font-semibold">
                                            {item?.trainerName}
                                        </div>
                                        <div className="text-black text-sm font-medium">
                                            {moment(item?.createdAt).format("DD/MM/YYYY, h:mm A")}
                                        </div>
                                        <div className="text-black text-sm font-medium">
                                            {item?.phone}
                                        </div>

                                    </div>
                                )
                            } else {
                                return (
                                    <div
                                        key={item?.id}
                                        id={item.id}
                                        draggable
                                        onDragStart={onDragStart}
                                        onDragEnd={onDragEnd}
                                        className="bg-white rounded py-3 px-5 cursor-move"
                                    >
                                        <div className="text-black text-base font-semibold">
                                            {item?.name}
                                        </div>
                                        <div className="text-black text-sm font-medium">
                                            {moment(item?.createdAt).format("DD/MM/YYYY, h:mm A")}
                                        </div>
                                        {item?.phone && <div className="text-black text-sm font-medium">
                                            {'+' + item?.countryCode + ' ' + item?.phone}
                                        </div>}
                                    </div>
                                )
                            }
                        })}
                    </div>
                ) : (
                    <span className="text-sm font-medium">No data found.</span>
                )}
            </div>
        </div>
    );
};

export default KanbanCard;
