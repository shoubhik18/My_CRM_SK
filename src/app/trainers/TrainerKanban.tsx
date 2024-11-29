import React, { useEffect, useState } from "react";
import KanbanCard from "../component/KanbanCard";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { toast } from "react-toastify";
import { getTrainer, updateTrainer } from "@/lib/features/trainer/trainerSlice";

const TrainerKanban = () => {
  const [tasks, setTasks] = useState<any>([]);
  const { trainerData } = useAppSelector((state) => state?.trainer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTasks(trainerData?.data);
  }, [trainerData]);

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

  const onDrop = (evt: React.DragEvent<HTMLDivElement>, batchStage: string) => {
    evt.preventDefault();
    evt.currentTarget.classList.remove("dragged-over");
    const id = evt.dataTransfer.getData("text/plain");
    
    const task = tasks.find(
      (task: { id: { toString: () => string } }) =>
        task.id.toString() === id.toString()
    );
    console.log("🚀 ~ onDrop ~ task:", task)
    console.log("🚀 ~ onDrop ~ batchStage:", batchStage)

    const data = {
        trainerName: task?.trainerName ? task?.trainerName : null,
        trainerOwner: task?.trainerOwner ? task?.trainerOwner : null,
        description: task?.description ? task?.description : null,
        freeSlots: task?.freeSlots ? task?.freeSlots : null,
        idProof: task?.idProof ? task?.idProof : null,
        techStack: task?.techStack ? task?.techStack : null,
        trainerStatus: task?.trainerStatus ? task?.trainerStatus : null,
        batches: trainerData?.batches ? trainerData?.batches : null,
        phone: task?.phone ? task?.phone : null,
        batchStage: batchStage,
        email: task?.email ? task?.email : null,
        location: task?.location ? task?.location : null,
    };
    dispatch(updateTrainer({ id: task?.id, data: data }))
      .unwrap()
      .then((res: any) => {
        if (res) {
          toast.success(
            res?.message ? res?.message : "Trainer Updated Successfully"
          );
          dispatch(getTrainer());
        }
      })
      .catch((err: any) => {
        const error = JSON.parse(err?.message);
        toast.error(error?.message ? error?.message : "Something went wrong");
      });

    if (task && task.batchStage !== batchStage) {
      const updatedTasks = tasks.map(
        (task: { id: { toString: () => string } }) => {
          if (task.id.toString() === id.toString()) {
            return { ...task, batchStage };
          }
          return task;
        }
      );
      setTasks(updatedTasks);
    }
  };

  let newOrder = tasks?.filter(
    (data: { batchStage: string }) => data?.batchStage === "Upcoming"
  );
  let waiting = tasks?.filter(
    (data: { batchStage: string }) => data?.batchStage === "Ongoing"
  );
  let pending = tasks?.filter(
    (data: { batchStage: string }) => data?.batchStage === "Completed"
  );
  let done = tasks?.filter(
    (data: { batchStage: string }) => data?.batchStage === "On Hold"
  );

  return (
    <div className="w-[100%] overflow-auto px-5 h-full">
      <div className="flex gap-3">
        <KanbanCard
          headerName="Upcoming"
          name="Upcoming"
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDrop={onDrop}
          data={newOrder}
          designStatus={3}
        />
        <KanbanCard
          headerName="Ongoing"
          name="Ongoing"
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDrop={onDrop}
          data={waiting}
          designStatus={3}
        />
        <KanbanCard
          headerName="On Hold"
          name="On Hold"
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDrop={onDrop}
          data={done}
          designStatus={3}
        />
        <KanbanCard
          headerName="Completed"
          name="Completed"
          onDragLeave={onDragLeave}
          onDragEnter={onDragEnter}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
          onDragStart={onDragStart}
          onDrop={onDrop}
          data={pending}
          designStatus={3}
        />
      </div>
    </div>
  );
};

export default TrainerKanban;
