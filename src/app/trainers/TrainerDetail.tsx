"use client";
import React, { useEffect, useState } from "react";
import {
  TrainerForm,
  HostItem,
  LeadeData,
  TrainerDataView,
  CommonInterFace,
} from "@/app/component/Type";
import JointBtn from "@/app/component/JointBtn";
import InputEdit from "../component/InputEdit";
import SingleSelece from "../component/SingleSelece";
import { createTrainerForm, FilterLableAndValue } from "@/api/CommonData";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getUserID } from "@/assets/utils/auth.util";
import MultiSelectDropdown from "../component/MultiSelectDropdown";
import { getUser } from "@/lib/features/auth/authSlice";
import { updateTrainer } from "@/lib/features/trainer/trainerSlice";

const TrainerDetail = ({
  handelOnSet,
}: {
  handelOnSet: (id: number, data: LeadeData[]) => void;
}) => {
  const dispatch = useAppDispatch();
  const [disableData, setDisableData] = useState<CommonInterFace>(TrainerDataView);
  const [trainerData, setTrainerData] = useState<CommonInterFace>(TrainerForm);
  const [error, setError] = useState<CommonInterFace>(TrainerForm);
  const [changeContactData, setChangeContactData] = useState<CommonInterFace>(TrainerForm);
  const [changeStatus, setChangeStatus] = useState<Boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { singleTrainerData } = useAppSelector((state) => state?.trainer);
  const handelOnStatus = (name: String, value: Boolean) => {
    setDisableData((prevData) => ({ ...prevData, [`${name}`]: value }));
  };
  const { allUser } = useAppSelector((state) => state?.auth);

  const TrainerData: HostItem[] = allUser?.users?.map((item: any) => {
    return { lable: item?.name, value: item?.id };
  });
  useEffect(() => {
    dispatch(getUser("trainer"));
  }, []);

  const handelOnChange = (e: any, name1?: any) => {
    if (name1) {
      setTrainerData({ ...trainerData, [`${name1}`]: e });
      setError({ ...error, [`${name1}`]: "" });
    } else {
      const { name, value, files } = e.target;
      if (name === "idProof") {
        setTrainerData({ ...trainerData, [`${name}`]: files?.[0] });
        setError({ ...error, [`${name}`]: "" });
      } else {
        setTrainerData({ ...trainerData, [`${name}`]: value });
        setError({ ...error, [`${name}`]: "" });
      }
    }
  };
  useEffect(() => {
    if (singleTrainerData) {
      handelonClear();
    }
  }, [singleTrainerData]);

  useEffect(() => {
    if (trainerData) {
      const value =
        JSON.stringify(changeContactData) === JSON.stringify(trainerData);
      setChangeStatus(value);
    }
  }, [trainerData]);

  const handelOnCancel = () => {
    setDisableData(TrainerDataView);
    setTrainerData(trainerData);
    setError(TrainerForm);
    handelOnSet(-1, []);
  };

  const handelonClear = () => {
    setTrainerData(singleTrainerData);
    setChangeContactData(singleTrainerData);
    // setChangeContactData({
    //   ...SingleLead,
    //   courseId:
    //     SingleLead?.Courses?.length > 0 &&
    //     SingleLead?.Courses?.map((item: any) => {
    //       return {
    //         lable: item?.name,
    //         value: item?.LeadCourse?.courseId,
    //       };
    //     }),
    // });
  };

  const vaidation = () => {
    let formValid = true;
    const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
    const newError: any = {};

    // if (!trainerData?.email?.trim()) {
    //   formValid = false;
    //   newError["email"] = "Please enter email";
    // } else if (!regex.test(trainerData?.email)) {
    //   formValid = false;
    //   newError["email"] = "Please enter a valid email address";
    // }
    if (!trainerData?.trainerName?.trim()) {
      formValid = false;
      newError["trainerName"] = "Please enter trainer name";
    }
    // if (!trainerData?.trainerID?.trim()) {
    //   formValid = false;
    //   newError["trainerID"] = "Please enter trainer id";
    // }
    // if (!trainerData?.phone?.trim()) {
    //   formValid = false;
    //   newError["phone"] = "Please enter phone number";
    // } else if (!(trainerData?.phone?.length === 10)) {
    //   formValid = false;
    //   newError["phone"] = "Please enter valid phone number";
    // }

    {
      /*
         if (!trainerData?.leadSource?.trim()) {
            formValid = false
            newError["leadSource"] = "Please select lead source"
        }
        if (!trainerData?.techStack?.trim()) {
            formValid = false
            newError["techStack"] = "Please select tech stack"
        }
        if (!(trainerData?.courseId?.length > 0)) {
            formValid = false
            newError["courseId"] = "Please select course"
        }
        if (!trainerData?.feeQuoted) {
            formValid = false
            newError["feeQuoted"] = "Please enter fee quoted"
        }
        if (!trainerData?.classMode) {
            formValid = false
            newError["classMode"] = "Please select classMode"
        }
        if (!trainerData?.batchTiming) {
            formValid = false
            newError["batchTiming"] = "Please select batch timimng"
        }
        if (!trainerData?.description?.trim()) {
            formValid = false
            newError["description"] = "Please enter description"
        }
        if (!trainerData?.leadStatus) {
            formValid = false
            newError["leadStatus"] = "Please select lead status"
        }
        if (!trainerData?.nextFollowUp) {
            formValid = false
            newError["nextFollowUp"] = "Please select next followUp"
        }
        */
    }

    setError(newError);
    return formValid;
  };

  const handelOnSave = () => {
    if (vaidation()) {
      setIsLoading(true);
      const formData = new FormData();

      const data = {
        trainerName: trainerData?.trainerName ? trainerData?.trainerName : null,
        trainerOwner: trainerData?.trainerOwner ? trainerData?.trainerOwner : null,
        description: trainerData?.description ? trainerData?.description : null,
        freeSlots: trainerData?.freeSlots ? trainerData?.freeSlots : null,
        idProof: trainerData?.idProof ? trainerData?.idProof : null,
        techStack: trainerData?.techStack ? trainerData?.techStack : null,
        trainerStatus: trainerData?.trainerStatus ? trainerData?.trainerStatus : null,
        phone: trainerData?.phone ? trainerData?.phone : null,
        batches: trainerData?.batches ? trainerData?.batches : null,
        email: trainerData?.email ? trainerData?.email : null,
        location: trainerData?.location ? trainerData?.location : null,
        batchStage: trainerData?.batchStage ? trainerData?.batchStage : null,
      }

      dispatch(updateTrainer({ id: singleTrainerData?.id, data: data }))
        .unwrap()
        .then((res: any) => {
          if (res) {
            toast.success(
              res?.message ? res?.message : "Trainer Update Successfully"
            );
            setError(TrainerForm);
            handelOnCancel();
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
            {createTrainerForm?.map((item: any) => {
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
                    value={item?.name === "idProof" ? trainerData[item?.name]?.name ? trainerData[item?.name]?.name : trainerData[item?.name]?.name : trainerData?.[item?.name]}
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
                        trainerData?.[item?.name]
                          ? item?.data?.filter(
                            (i: any) => i?.value === trainerData?.[item?.name]
                          )?.[0]?.lable
                          : ""
                      }
                      onChange={handelOnChange}
                      handelOnStatus={handelOnStatus}
                    />
                  ) : (
                    <SingleSelece
                      onChange={handelOnChange}
                      value={trainerData?.[item?.name]}
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
                          ? trainerData?.courseId
                            ? trainerData?.courseId
                              ?.map((item: any) => {
                                return item?.lable;
                              })
                              ?.join(",")
                            : ""
                          : typeof trainerData?.[item?.name] === "object" &&
                          trainerData?.[item?.name]?.length > 0 &&
                          trainerData?.[item?.name]
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
                          ? trainerData?.[item?.name]
                          : trainerData?.[item?.name]?.[0]?.lable
                            ? typeof trainerData?.[item?.name] === "object" &&
                            trainerData?.[item?.name]?.length > 0 &&
                            trainerData?.[item?.name]
                            : typeof trainerData?.[item?.name] === "object" &&
                            FilterLableAndValue(trainerData?.[item?.name])
                      }
                      error={error?.[item?.name]}
                      name={item?.name}
                      lableValue={item?.lableValue}
                      data={item?.data}
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

export default TrainerDetail;

