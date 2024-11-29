"use client";
import React, { useEffect, useState } from "react";
import {
  OpportunitiyDataView,
  OpportunitiyDisableDataView,
  LeadeData,
  OpportunitiyData1,
  HostItem,
} from "@/app/component/Type";
import JointBtn from "@/app/component/JointBtn";
import InputEdit from "../component/InputEdit";
import SingleSelece from "../component/SingleSelece";
import { createOpportunityForm, FilterLableAndValue } from "@/api/CommonData";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getSingleLead, updateLeadData } from "@/lib/features/lead/leadSlice";
import { getUserID } from "@/assets/utils/auth.util";
import MultiSelectDropdown from "../component/MultiSelectDropdown";
import { getCourses } from "@/lib/features/courses/coursesSlice";

const EditOpportunitie = ({
  handelOnSet,
}: {
  handelOnSet: (id: number, data: LeadeData[]) => void;
}) => {
  const dispatch = useAppDispatch();
  const [disableData, setDisableData] = useState<OpportunitiyData1>(
    OpportunitiyDisableDataView
  );
  const [opportunitiyData, setOpportunitiyData] =
    useState<OpportunitiyData1>(OpportunitiyDataView);
  const [error, setError] = useState<OpportunitiyData1>(OpportunitiyDataView);
  const [changeContactData, setChangeContactData] =
    useState<OpportunitiyData1>(OpportunitiyDataView);
  const [changeStatus, setChangeStatus] = useState<Boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { SingleLead } = useAppSelector((state) => state?.lead);
  const handelOnStatus = (name: String, value: Boolean) => {
    setDisableData({ ...OpportunitiyDisableDataView, [`${name}`]: value });
  };

  const { CoursesData } = useAppSelector((state) => state?.courses);

  const Courses: HostItem[] = CoursesData?.courses?.map((item: any) => {
    return { lable: item?.name, value: item?.id };
  });

  useEffect(() => {
    dispatch(getCourses());
  }, []);

  const handelOnChange = (
    e: { target: { name: String; value: String } },
    name1?: string
  ) => {
    if (name1) {
      setOpportunitiyData({ ...opportunitiyData, [name1]: e });
      setError({ ...error, [`${name1}`]: "" });
    } else {
      const { name, value } = e.target;
      setOpportunitiyData({ ...opportunitiyData, [`${name}`]: value });
      setError({ ...error, [`${name}`]: "" });
    }
  };
  useEffect(() => {
    if (SingleLead) {
      handelonClear();
    }
  }, [SingleLead]);

  useEffect(() => {
    if (opportunitiyData) {
      const value =
        JSON.stringify(changeContactData) === JSON.stringify(opportunitiyData);
      setChangeStatus(value);
    }
  }, [opportunitiyData]);

  const handelOnCancel = () => {
    setDisableData(OpportunitiyDisableDataView);
    setOpportunitiyData(opportunitiyData);
    handelOnSet(-1, []);
  };

  const handelonClear = () => {
    setOpportunitiyData({
      ...SingleLead,
      courseId: SingleLead?.Courses?.map((item: any) => {
        return {
          lable: item?.name,
          value: item?.LeadCourse?.courseId,
        };
      }),
    });
    setChangeContactData({
      ...SingleLead,
      courseId: SingleLead?.Courses?.map((item: any) => {
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

    if (!opportunitiyData?.email?.trim()) {
      formValid = false;
      newError["email"] = "Please enter email";
    } else if (!regex.test(opportunitiyData?.email)) {
      formValid = false;
      newError["email"] = "Please enter a valid email address";
    }
    if (!opportunitiyData?.name?.trim()) {
      formValid = false;
      newError["name"] = "Please enter name";
    }
    if (!opportunitiyData?.phone?.trim()) {
      formValid = false;
      newError["phone"] = "Please enter phone number";
    } else if (!(opportunitiyData?.phone?.length === 10)) {
      formValid = false;
      newError["phone"] = "Please enter valid phone number";
    }

    setError(newError);
    return formValid;
  };

  const handelOnSave = () => {
    if (vaidation()) {
      setIsLoading(true);
      const data = {
        name: opportunitiyData?.name ? opportunitiyData?.name : null,
        opportunityStatus: opportunitiyData?.opportunityStatus
          ? opportunitiyData?.opportunityStatus
          : null,
        phone: opportunitiyData?.phone ? opportunitiyData?.phone : null,
        countryCode: opportunitiyData?.countryCode
          ? opportunitiyData?.countryCode
          : null,
        opportunityStage: opportunitiyData?.opportunityStage
          ? opportunitiyData?.opportunityStage
          : null,
        email: opportunitiyData?.email ? opportunitiyData?.email : null,
        demoAttendedStage: opportunitiyData?.demoAttendedStage
          ? opportunitiyData?.demoAttendedStage
          : null,
        feeQuoted: opportunitiyData?.feeQuoted
          ? opportunitiyData?.feeQuoted
          : null,
        visitedStage: opportunitiyData?.visitedStage
          ? opportunitiyData?.visitedStage
          : null,
        batchTiming:
          typeof opportunitiyData?.batchTiming === "object" &&
          opportunitiyData?.batchTiming?.length > 0
            ? opportunitiyData?.batchTiming?.map((item: any) => {
                return item?.value;
              })
            : null,
        coldLeadReason: opportunitiyData?.coldLeadReason
          ? opportunitiyData?.coldLeadReason
          : null,
        description: opportunitiyData?.description
          ? opportunitiyData?.description
          : null,
        leadSource: opportunitiyData?.leadSource,
        techStack: opportunitiyData?.techStack,
        courseIds:
          typeof opportunitiyData?.courseId === "object" &&
          opportunitiyData?.courseId?.length > 0
            ? opportunitiyData?.courseId?.map((item: any) => {
                return item?.value ? item?.value : item;
              })
            : null,
        classMode: opportunitiyData?.classMode,
        leadStatus: opportunitiyData?.leadStatus,
        nextFollowUp: opportunitiyData?.nextFollowUp,
        userId: getUserID(),
        leadStage: opportunitiyData?.leadStage,
      };
      dispatch(updateLeadData({ id: SingleLead?.id, data: data }))
        .unwrap()
        .then((res: any) => {
          if (res) {
            toast.success(
              res?.message ? res?.message : "Opportunity Updated Successfully"
            );
            setError(OpportunitiyDataView);
            handelOnCancel();
            dispatch(getSingleLead(SingleLead?.id));
          }
        })
        .catch((err: any) => {
          toast.error(err?.message ? err?.message : "Something went wrong");
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
          <div className="grid gap-10 mb-6 md:grid-cols-2">
            {createOpportunityForm?.map((item: any) => {
              return item?.type === "input" ? (
                <InputEdit
                  lable={item?.lableValue}
                  disable={disableData?.[item?.name]}
                  name={item?.name}
                  error={error?.[item?.name]}
                  type={item?.typeValue}
                  value={opportunitiyData?.[item?.name]}
                  onChange={handelOnChange}
                  handelOnStatus={handelOnStatus}
                />
              ) : item?.type === "select" ? (
                disableData?.[item?.name] ? (
                  <InputEdit
                    lable={item?.lableValue}
                    disable={disableData?.[item?.name]}
                    name={item?.name}
                    error={error?.[item?.name]}
                    type="text"
                    value={
                      opportunitiyData?.[item?.name]
                        ? item?.data?.filter(
                            (i: any) =>
                              i?.value === opportunitiyData?.[item?.name]
                          )?.[0]?.lable
                        : ""
                    }
                    onChange={handelOnChange}
                    handelOnStatus={handelOnStatus}
                  />
                ) : (
                  <SingleSelece
                    onChange={handelOnChange}
                    value={opportunitiyData?.[item?.name]}
                    error={error?.[item?.name]}
                    name={item?.name}
                    lableValue={item?.lableValue}
                    data={item?.data}
                  />
                )
              ) : item?.type === "multiSelect" ? (
                disableData?.[item?.name] ? (
                  <InputEdit
                    lable={item?.lableValue}
                    disable={disableData?.[item?.name]}
                    name={item?.name}
                    error={error?.[item?.name]}
                    type="text"
                    value={
                      item?.name === "courseId"
                        ? opportunitiyData?.courseId
                          ? opportunitiyData?.courseId
                              ?.map((item: any) => {
                                return item?.lable;
                              })
                              ?.join(",")
                          : ""
                        : typeof opportunitiyData?.[item?.name] === "object" &&
                          opportunitiyData?.[item?.name]?.length > 0 &&
                          opportunitiyData?.[item?.name]
                            ?.map((item: any) => {
                              return item;
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
                        ? opportunitiyData?.[item?.name]
                        : opportunitiyData?.[item?.name]?.[0]?.lable
                        ? opportunitiyData?.[item?.name]
                        : typeof opportunitiyData?.[item?.name] === "object" &&
                          opportunitiyData?.[item?.name]?.length > 0 &&
                          FilterLableAndValue(opportunitiyData?.[item?.name])
                    }
                    error={error?.[item?.name]}
                    name={item?.name}
                    lableValue={item?.lableValue}
                    data={item?.name === "courseId" ? Courses : item?.data}
                  />
                )
              ) : null;
            })}
          </div>
          <div className="mb-6">
            <InputEdit
              lable="Description"
              disable={disableData?.description}
              name="description"
              error={error?.description}
              type="text"
              value={opportunitiyData?.description}
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

export default EditOpportunitie;
