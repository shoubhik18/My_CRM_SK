"use client";
import React, { useEffect, useState } from "react";
import {
  BatchForm,
  HostItem,
  LeadeData,
  BatchDataView,
  CommonInterFace,
} from "@/app/component/Type";
import JointBtn from "@/app/component/JointBtn";
import InputEdit from "../component/InputEdit";
import SingleSelece from "../component/SingleSelece";
import { createBatchForm, FilterLableAndValue } from "@/api/CommonData";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getLeadData } from "@/lib/features/lead/leadSlice";
import MultiSelectDropdown from "../component/MultiSelectDropdown";
import { getSingleBatch, updateBatch } from "@/lib/features/batch/batchSlice";
import { getTrainer } from "@/lib/features/trainer/trainerSlice";

const BatchDetail = ({
  handelOnSet,
}: {
  handelOnSet: (id: number, data: LeadeData[]) => void;
}) => {
  const dispatch = useAppDispatch();
  const [disableData, setDisableData] = useState<CommonInterFace>(BatchDataView);
  const [batchData, setBatchData] = useState<CommonInterFace>(BatchForm);
  const [error, setError] = useState<CommonInterFace>(BatchForm);
  const [changeContactData, setChangeContactData] = useState<CommonInterFace>(BatchForm);
  const [changeStatus, setChangeStatus] = useState<Boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { SingleBatch } = useAppSelector((state) => state?.batch);
  const { LeadData } = useAppSelector((state) => state?.lead);
  const handelOnStatus = (name: String, value: Boolean) => {
    setDisableData((prevData) => ({ ...prevData, [`${name}`]: value }));
  };
  const { trainerData } = useAppSelector((state) => state?.trainer);

  const TrainerData: HostItem[] = trainerData?.data?.map((item: any) => {
    return { lable: item?.trainerName, value: item?.id };
  });

  const LeadeDatas: HostItem[] = LeadData?.leads?.map((item: any) => {
    return { lable: item?.name, value: item?.id };
  });

  useEffect(() => {
    dispatch(getTrainer());
    dispatch(getLeadData("learner"));
  }, []);

  const handelOnChange = (e: any, name1?: any) => {
    if (name1) {
      setBatchData({ ...batchData, [`${name1}`]: e });
      setError({ ...error, [`${name1}`]: "" });
    } else {
      const { name, value } = e.target;
      setBatchData({ ...batchData, [`${name}`]: value });
      setError({ ...error, [`${name}`]: "" });
    }
  };
  useEffect(() => {
    if (SingleBatch) {
      handelonClear();
    }
  }, [SingleBatch]);

  useEffect(() => {
    if (batchData) {
      const value =
        JSON.stringify(changeContactData) === JSON.stringify(batchData);
      setChangeStatus(value);
    }
  }, [batchData]);

  const handelOnCancel = () => {
    setDisableData(BatchDataView);
    setBatchData(batchData);
    handelOnSet(-1, []);
  };

  const handelonClear = () => {
    setBatchData({
      ...SingleBatch,
      learnerIds:
        SingleBatch?.leads?.length > 0 &&
        SingleBatch?.leads?.map((item: any) => {
          return {
            lable: item?.name,
            value: item?.id,
          };
        }),
    });
    setChangeContactData({
      ...SingleBatch,
      learnerIds:
        SingleBatch?.leads?.length > 0 &&
        SingleBatch?.leads?.map((item: any) => {
          return {
            lable: item?.name,
            value: item?.id,
          };
        }),
    });
  };

  const vaidation = () => {
    let formValid = true;
    const newError: any = {};

    if (!batchData?.batchName?.trim()) {
      formValid = false;
      newError["batchName"] = "Please enter batch name";
    }

    setError(newError);
    return formValid;
  };

  const handelOnSave = () => {
    if (vaidation()) {
      setIsLoading(true);
      const data = {
        batchName: batchData?.batchName,
        learnerIds:
          batchData?.learnerIds?.length > 0
            ? batchData?.learnerIds?.map((item: any) => {
              return item?.value;
            })
            : null,
        location: batchData?.location,
        stack: batchData?.stack,
        slot: batchData?.slot,
        startDate: batchData?.startDate,
        trainerId: batchData?.trainerId,
        tentativeEndDate: batchData?.tentativeEndDate,
        batchStatus: batchData?.batchStatus ? batchData?.batchStatus : null,
        classMode: batchData?.classMode,
        topicStatus: batchData?.topicStatus ? batchData?.topicStatus : null,
        stage: batchData?.stage ? batchData?.stage : null,
        noOfStudents: batchData?.noOfStudents ? batchData?.noOfStudents : null,
        comment: batchData?.comment,
      };
      dispatch(updateBatch({ id: SingleBatch?.id, data: data }))
        .unwrap()
        .then((res: any) => {
          if (res) {
            toast.success(
              res?.message ? res?.message : "Batch Update Successfully"
            );
            setError(BatchForm);
            handelOnCancel();
            dispatch(getSingleBatch(SingleBatch?.id));
          }
        })
        .catch((err: any) => {
          const error = JSON.parse(err?.message);
          toast.error(error?.message ? error?.message : "Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      <div>
        <div className="p-4 md:p-5">
          <div className="grid gap-10 mb-8 md:grid-cols-2">
            {createBatchForm?.map((item: any) => {
              return item?.type === "input" ? (
                <div
                  key={item.name}
                  onClick={() => handelOnStatus(item.name, false)}
                  className="cursor-pointer"
                >
                  <InputEdit
                    lable={item?.lableValue}
                    disable={disableData?.[item?.name]}
                    name={item?.name}
                    error={error?.[item?.name]}
                    type={item?.typeValue}
                    value={batchData?.[item?.name]}
                    onChange={handelOnChange}
                    handelOnStatus={handelOnStatus}

                  />
                </div>
              ) : item?.type === "select" ? (
                <div
                  key={item.name}
                  onClick={() => handelOnStatus(item.name, false)}
                  className="cursor-pointer"
                >
                  {disableData?.[item?.name] ? (
                    <InputEdit
                      lable={item?.lableValue}
                      disable={disableData?.[item?.name]}
                      name={item?.name}
                      error={error?.[item?.name]}
                      type="text"
                      value={
                        batchData?.[item?.name]
                          ? item?.data?.filter(
                            (i: any) => i?.value === batchData?.[item?.name]
                          )?.[0]?.lable
                          : ""
                      }
                      onChange={handelOnChange}
                      handelOnStatus={handelOnStatus}
                    />
                  ) : (
                    <SingleSelece
                      onChange={handelOnChange}
                      value={batchData?.[item?.name]}
                      error={error?.[item?.name]}
                      name={item?.name}
                      lableValue={item?.lableValue}
                      data={item?.name === "trainerId" ? TrainerData : item?.data}
                    />
                  )}
                </div>
              ) : item?.type === "multiSelect" ? (
                <div
                  key={item.name}
                  onClick={() => handelOnStatus(item.name, false)}
                  className="cursor-pointer"
                >
                  {disableData?.[item?.name] ? (
                    <InputEdit
                      lable={item?.lableValue}
                      disable={disableData?.[item?.name]}
                      name={item?.name}
                      error={error?.[item?.name]}
                      type="text"
                      value={
                        item?.name === "courseId"
                          ? batchData?.courseId
                            ? batchData?.courseId
                              ?.map((item: any) => {
                                return item?.lable;
                              })
                              ?.join(",")
                            : ""
                          : typeof batchData?.[item?.name] === "object" &&
                          batchData?.[item?.name]?.length > 0 &&
                          batchData?.[item?.name]
                            ?.map((item: any) => {
                              return item?.lable ? item?.lable : item;
                            })
                            ?.join(",")
                      }
                      onChange={handelOnChange}
                      handelOnStatus={handelOnStatus}
                    />
                  ) : (
                    <MultiSelectDropdown
                      onChange={(e) => handelOnChange(e, item?.name)}
                      value={
                        item?.name === "courseId"
                          ? batchData?.[item?.name]
                          : batchData?.[item?.name]?.[0]?.lable
                            ? typeof batchData?.[item?.name] === "object" &&
                            batchData?.[item?.name]?.length > 0 &&
                            batchData?.[item?.name]
                            : typeof batchData?.[item?.name] === "object" &&
                            FilterLableAndValue(batchData?.[item?.name])
                      }
                      error={error?.[item?.name]}
                      name={item?.name}
                      lableValue={item?.lableValue}
                      data={item?.name === "learnerIds" ? LeadeDatas : item?.data}
                    />
                  )}
                </div>
              ) : null;
            })}
          </div>
        </div>
        <div className="flex items-center gap-2 justify-center h-32 py-14  mt-7">
          {!changeStatus && (
            <JointBtn
              button1="Cancel"
              button2="Save"
              onClick1={handelonClear}
              isLoading={isLoading}
              onClick2={handelOnSave}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default BatchDetail;

