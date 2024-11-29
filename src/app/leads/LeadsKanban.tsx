import React, { useEffect, useState } from "react";
import KanbanCard from "../component/KanbanCard";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getLeadData, updateLeadData } from "@/lib/features/lead/leadSlice";
import { toast } from "react-toastify";
import { getUserID } from "@/assets/utils/auth.util";
import { usePathname } from "next/navigation";

const LeadsKanban = () => {
  const [tasks, setTasks] = useState<any>([]);
  const { LeadData } = useAppSelector((state) => state?.lead);
  const dispatch = useAppDispatch();
  const pathName = usePathname();

  useEffect(() => {
    setTasks(LeadData?.leads);
  }, [LeadData]);

  const onDragStart = (evt: {
    currentTarget: {
      [x: string]: any;
      id: any;
    };
    dataTransfer: {
      setData: (arg0: string, arg1: any) => void;
      effectAllowed: string;
    };
  }) => {
    let element = evt.currentTarget;
    element.classList.add("dragged");
    evt.dataTransfer.setData("text/plain", evt.currentTarget.id);
    evt.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = (evt: {
    currentTarget: { classList: { remove: (arg0: string) => void } };
  }) => {
    evt.currentTarget.classList.remove("dragged");
  };

  const onDragEnter = (evt: {
    preventDefault: () => void;
    currentTarget: any;
    dataTransfer: { dropEffect: string };
  }) => {
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.add("dragged-over");
    evt.dataTransfer.dropEffect = "move";
  };

  const onDragLeave = (evt: {
    currentTarget: any;
    relatedTarget: any;
    preventDefault: () => void;
  }) => {
    let currentTarget = evt.currentTarget;
    let newTarget = evt.relatedTarget;
    if (newTarget.parentNode === currentTarget || newTarget === currentTarget)
      return;
    evt.preventDefault();
    let element = evt.currentTarget;
    element.classList.remove("dragged-over");
  };

  const onDragOver = (evt: {
    preventDefault: () => void;
    dataTransfer: { dropEffect: string };
  }) => {
    evt.preventDefault();
    evt.dataTransfer.dropEffect = "move";
  };

  const onDrop = (evt: React.DragEvent<HTMLDivElement>, leadStatus: string) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    const id = evt.dataTransfer.getData("text/plain");

    const task = tasks.find(
      (task: { id: { toString: () => string } }) =>
        task.id.toString() === id.toString()
    );

    const data = {
      name: task?.name,
      leadSource: task?.leadSource,
      techStack: task?.techStack,
      countryCode: task?.countryCode,
      phone: task?.phone,
      courseId: task?.courseId,
      email: task?.email,
      classMode: task?.classMode,
      feeQuoted: task?.feeQuoted,
      batchTiming: task?.batchTiming,
      leadStatus: leadStatus,
      description: task?.description,
      nextFollowUp: task?.nextFollowUp,
      userId: getUserID(),
    };
    dispatch(updateLeadData({ id: task?.id, data: data }))
      .unwrap()
      .then((res: any) => {
        if (res) {
          toast.success(
            res?.message ? res?.message : "Lead Updated Successfully"
          );
          dispatch(getLeadData(pathName === "/leads" ? "lead" : "opportunity"));
        }
      })
      .catch((err: any) => {
        const error = JSON.parse(err?.message);
        toast.error(error?.message ? error?.message : "Something went wrong");
      });

    if (task && task.leadStatus !== leadStatus) {
      const updatedTasks = tasks.map(
        (task: { id: { toString: () => string } }) => {
          if (task.id.toString() === id.toString()) {
            return { ...task, leadStatus };
          }
          return task;
        }
      );
      setTasks(updatedTasks);
    }
  };

  let newOrder = tasks?.filter(
    (data: { leadStatus: string }) => data?.leadStatus === "Not Contacted"
  );
  let waiting = tasks?.filter(
    (data: { leadStatus: string }) => data?.leadStatus === "Attempted"
  );
  let pending = tasks?.filter(
    (data: { leadStatus: string }) => data?.leadStatus === (pathName === "/leads" ? "Warm Lead" : "Opportunity")
  );
  let done = tasks?.filter(
    (data: { leadStatus: string }) => data?.leadStatus === "Cold Lead"
  );

  return (
    <div className="w-[100%] overflow-auto px-5 h-full">
      <div className="flex gap-3">
        <KanbanCard
          headerName="Not Contacted"
          name="Not Contacted"
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDrop={onDrop}
          data={newOrder}
        />
        <KanbanCard
          headerName="Attempted"
          name="Attempted"
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDrop={onDrop}
          data={waiting}
        />
        <KanbanCard
          headerName={pathName === "/leads" ? "Warm Lead" : "Opportunity"}
          name={pathName === "/leads" ? "Warm Lead" : "Opportunity"}
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDrop={onDrop}
          data={pending}
        />
        <KanbanCard
          headerName="Cold Lead"
          name="Cold Lead"
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDrop={onDrop}
          data={done}
        />
      </div>
    </div>
  );
};

export default LeadsKanban;
