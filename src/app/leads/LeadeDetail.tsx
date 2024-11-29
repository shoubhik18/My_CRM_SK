"use client";
import React, { useEffect, useState } from "react";
import {
  LeadeDataView,
  HostItem,
  LeadeData,
  RowDataView,
  CommonInterFace,
} from "@/app/component/Type";
import JointBtn from "@/app/component/JointBtn";
import InputEdit from "../component/InputEdit";
import SingleSelece from "../component/SingleSelece";
import { createLeadForm, FilterLableAndValue } from "@/api/CommonData";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getSingleLead, updateLeadData } from "@/lib/features/lead/leadSlice";
import { getUserID } from "@/assets/utils/auth.util";
import { getCourses } from "@/lib/features/courses/coursesSlice";
import MultiSelectDropdown from "../component/MultiSelectDropdown";

const LeadeDetail = ({
  handelOnSet,
}: {
  handelOnSet: (id: number, data: LeadeData[]) => void;
}) => {
  const dispatch = useAppDispatch();
  const [disableData, setDisableData] = useState<CommonInterFace>(RowDataView);
  const [leadeData, setLeadeData] = useState<CommonInterFace>(LeadeDataView);
  const [error, setError] = useState<CommonInterFace>(LeadeDataView);
  const [changeContactData, setChangeContactData] =
    useState<CommonInterFace>(LeadeDataView);
  const [changeStatus, setChangeStatus] = useState<Boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { SingleLead } = useAppSelector((state) => state?.lead);
  const handelOnStatus = (name: String, value: Boolean) => {
    setDisableData((prevData) => ({ ...prevData, [`${name}`]: value }));
  };
  const { CoursesData } = useAppSelector((state) => state?.courses);

  const Courses: HostItem[] = CoursesData?.courses?.map((item: any) => {
    return { lable: item?.name, value: item?.id };
  });

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const handelOnChange = (e: any, name1?: any) => {
    if (name1) {
      setLeadeData({ ...leadeData, [`${name1}`]: e });
      setError({ ...error, [`${name1}`]: "" });
    } else {
      const { name, value } = e.target;
      setLeadeData({ ...leadeData, [`${name}`]: value });
      setError({ ...error, [`${name}`]: "" });
    }
  };
  useEffect(() => {
    if (SingleLead) {
      handelonClear();
    }
  }, [SingleLead]);

  useEffect(() => {
    if (leadeData) {
      const value =
        JSON.stringify(changeContactData) === JSON.stringify(leadeData);
      setChangeStatus(value);
    }
  }, [leadeData]);

  const handelOnCancel = () => {
    setDisableData(RowDataView);
    setLeadeData(leadeData);
    handelOnSet(-1, []);
  };

  const handelonClear = () => {
    setLeadeData({
      ...SingleLead,
      courseId:
        SingleLead?.Courses?.length > 0 &&
        SingleLead?.Courses?.map((item: any) => {
          return {
            lable: item?.name,
            value: item?.LeadCourse?.courseId,
          };
        }),
    });
    setChangeContactData({
      ...SingleLead,
      courseId:
        SingleLead?.Courses?.length > 0 &&
        SingleLead?.Courses?.map((item: any) => {
          return {
            lable: item?.name,
            value: item?.LeadCourse?.courseId,
          };
        }),
    });
  };

  const vaidation = () => {
    let formValid = true;
    const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
    const newError: any = {};

    if (!leadeData?.email?.trim()) {
      formValid = false;
      newError["email"] = "Please enter email";
    } else if (!regex.test(leadeData?.email)) {
      formValid = false;
      newError["email"] = "Please enter a valid email address";
    }
    // if (!leadeData?.name?.trim()) {
    //   formValid = false;
    //   newError["name"] = "Please enter name";
    // }
    // if (!leadeData?.countryCode?.trim()) {
    //   formValid = false;
    //   newError["countryCode"] = "Please enter cc";
    // } else if (leadeData?.countryCode?.length > 4) {
    //   formValid = false;
    //   newError["countryCode"] = "Please enter maximum 4 digit cc";
    // }
    // if (!leadeData?.phone?.trim()) {
    //   formValid = false;
    //   newError["phone"] = "Please enter phone number";
    // } else if (!(leadeData?.phone?.length === 10)) {
    //   formValid = false;
    //   newError["phone"] = "Please enter valid phone number";
    // }

    {
      /*
         if (!leadeData?.leadSource?.trim()) {
            formValid = false
            newError["leadSource"] = "Please select lead source"
        }
        if (!leadeData?.techStack?.trim()) {
            formValid = false
            newError["techStack"] = "Please select tech stack"
        }
        if (!(leadeData?.courseId?.length > 0)) {
            formValid = false
            newError["courseId"] = "Please select course"
        }
        if (!leadeData?.feeQuoted) {
            formValid = false
            newError["feeQuoted"] = "Please enter fee quoted"
        }
        if (!leadeData?.classMode) {
            formValid = false
            newError["classMode"] = "Please select classMode"
        }
        if (!leadeData?.batchTiming) {
            formValid = false
            newError["batchTiming"] = "Please select batch timimng"
        }
        if (!leadeData?.description?.trim()) {
            formValid = false
            newError["description"] = "Please enter description"
        }
        if (!leadeData?.leadStatus) {
            formValid = false
            newError["leadStatus"] = "Please select lead status"
        }
        if (!leadeData?.nextFollowUp) {
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
      const data = {
        name: leadeData?.name,
        leadSource: leadeData?.leadSource,
        techStack: leadeData?.techStack,
        countryCode: leadeData?.countryCode,
        phone: leadeData?.phone,
        courseIds:
          leadeData?.courseId?.length > 0
            ? leadeData?.courseId?.map((item: any) => {
              return item?.value;
            })
            : null,
        email: leadeData?.email,
        classMode: leadeData?.classMode,
        feeQuoted: leadeData?.feeQuoted,
        batchTiming:
          leadeData?.batchTiming?.length > 0
            ? leadeData?.batchTiming?.map((item: any) => {
              return item?.value ? item?.value : item;
            })
            : null,
        leadStatus: leadeData?.leadStatus,
        description: leadeData?.description,
        nextFollowUp: leadeData?.nextFollowUp,
        userId: getUserID(),
        leadStage: leadeData?.leadStage,
      };
      dispatch(updateLeadData({ id: SingleLead?.id, data: data }))
        .unwrap()
        .then((res: any) => {
          if (res) {
            toast.success(
              res?.message ? res?.message : "Leade Update Successfully"
            );
            setError(LeadeDataView);
            handelOnCancel();
            dispatch(getSingleLead(SingleLead?.id));
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
            {createLeadForm?.map((item: any) => {
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
                    value={leadeData?.[item?.name]}
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
                        leadeData?.[item?.name]
                          ? item?.data?.filter(
                            (i: any) => i?.value === leadeData?.[item?.name]
                          )?.[0]?.lable
                          : ""
                      }
                      onChange={handelOnChange}
                      handelOnStatus={handelOnStatus}
                    />
                  ) : (
                    <SingleSelece
                      onChange={handelOnChange}
                      value={leadeData?.[item?.name]}
                      error={error?.[item?.name]}
                      name={item?.name}
                      lableValue={item?.lableValue}
                      data={item?.data}
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
                          ? leadeData?.courseId
                            ? leadeData?.courseId
                              ?.map((item: any) => {
                                return item?.lable;
                              })
                              ?.join(",")
                            : ""
                          : typeof leadeData?.[item?.name] === "object" &&
                          leadeData?.[item?.name]?.length > 0 &&
                          leadeData?.[item?.name]
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
                          ? leadeData?.[item?.name]
                          : leadeData?.[item?.name]?.[0]?.lable
                            ? typeof leadeData?.[item?.name] === "object" &&
                            leadeData?.[item?.name]?.length > 0 &&
                            leadeData?.[item?.name]
                            : typeof leadeData?.[item?.name] === "object" &&
                            FilterLableAndValue(leadeData?.[item?.name])
                      }
                      error={error?.[item?.name]}
                      name={item?.name}
                      lableValue={item?.lableValue}
                      data={item?.name === "courseId" ? Courses : item?.data}
                    />
                  )}
                </div>
              ) : null;
            })}
          </div>
          <div
            onClick={() => handelOnStatus("description", false)}
            className="cursor-pointer"
          >
            <InputEdit
              lable="Description"
              disable={disableData?.description}
              name="description"
              error={error?.description}
              type="text"
              value={leadeData?.description}
              onChange={handelOnChange}
              handelOnStatus={handelOnStatus}
            />
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

export default LeadeDetail;

