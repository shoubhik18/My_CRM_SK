"use client";
import React, { useEffect, useState } from "react";
import {
  LearnerDataView,
  HostItem,
  OpportunitiyData1,
  LeadeData,
  LearnerDisableDataView,
} from "@/app/component/Type";
import JointBtn from "@/app/component/JointBtn";
import InputEdit from "../component/InputEdit";
import SingleSelece from "../component/SingleSelece";
import {
  createLearnerForm,
  FilterLableAndValue,
} from "@/api/CommonData";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getSingleLead, updateLeadData } from "@/lib/features/lead/leadSlice";
import { getUserID } from "@/assets/utils/auth.util";
import { getCourses } from "@/lib/features/courses/coursesSlice";
import MultiSelectDropdown from "../component/MultiSelectDropdown";
import { getSingleLearner, updateLearner } from "@/lib/features/learner/learnerSlice";

const LearnerDetail = ({
  handelOnSet,
}: {
  handelOnSet: (id: number, data: LeadeData[]) => void;
}) => {
  const dispatch = useAppDispatch();
  const [disableData, setDisableData] = useState<OpportunitiyData1>(
    LearnerDisableDataView
  );
  const [learnerData, setLearnerData] =
    useState<OpportunitiyData1>(LearnerDataView);
  console.log("🚀 ~ learnerData:", learnerData)
  const [error, setError] = useState<OpportunitiyData1>(LearnerDataView);
  const [changeContactData, setChangeContactData] =
    useState<OpportunitiyData1>(LearnerDataView);
  const [changeStatus, setChangeStatus] = useState<Boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { SingleLearner } = useAppSelector((state) => state?.learner);
  const handelOnStatus = (name: String, value: Boolean) => {
    setDisableData({ ...LearnerDisableDataView, [`${name}`]: value });
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
      setLearnerData({ ...learnerData, [name1]: e });
      setError({ ...error, [`${name1}`]: "" });
    } else {
      const { name, value } = e.target;
      setLearnerData({ ...learnerData, [`${name}`]: value });
      setError({ ...error, [`${name}`]: "" });
    }
  };
  useEffect(() => {
    if (SingleLearner) {
      handelonClear();
    }
  }, [SingleLearner]);

  useEffect(() => {
    if (learnerData) {
      const value =
        JSON.stringify(changeContactData) === JSON.stringify(learnerData);
      setChangeStatus(value);
    }
  }, [learnerData]);

  const handelOnCancel = () => {
    setDisableData(LearnerDisableDataView);
    setLearnerData(learnerData);
    handelOnSet(-1, []);
  };

  const handelonClear = () => {
    setLearnerData(SingleLearner);
    setChangeContactData(SingleLearner);
  };

  const vaidation = () => {
    let formValid = true;
    const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
    const newError: any = {};

    if (!learnerData?.email?.trim()) {
      formValid = false;
      newError["email"] = "Please enter email";
    } else if (!regex.test(learnerData?.email)) {
      formValid = false;
      newError["email"] = "Please enter a valid email address";
    }
    // if (!learnerData?.name?.trim()) {
    //   formValid = false;
    //   newError["name"] = "Please enter name";
    // }
    // if (!learnerData?.phone?.trim()) {
    //   formValid = false;
    //   newError["phone"] = "Please enter phone number";
    // } else if (!(learnerData?.phone?.length === 10)) {
    //   formValid = false;
    //   newError["phone"] = "Please enter valid phone number";
    // }
    //}

    setError(newError);
    return formValid;
  };

  const handelOnSave = () => {
    if (vaidation()) {
      setIsLoading(true);
      const data = {
        firstName: learnerData?.firstName ? learnerData?.firstName : null,
        lastName: learnerData?.lastName ? learnerData?.lastName : null,
        phone: learnerData?.phone ? learnerData?.phone : null,
        alternatePhone: learnerData?.alternatePhone ? learnerData?.alternatePhone : null,
        email: learnerData?.email ? learnerData?.email : null,
        location: learnerData?.location ? learnerData?.location : null,
        source: learnerData?.source ? learnerData?.source : null,
        attendedDemo: learnerData?.attendedDemo ? learnerData?.attendedDemo : null,
        leadCreatedTime: learnerData?.leadCreatedTime ? learnerData?.leadCreatedTime : null,
        counselingDoneBy: learnerData?.counselingDoneBy ? parseInt(learnerData?.counselingDoneBy) : null,
        idProof: learnerData?.idProof ? learnerData?.idProof : null,
        dateOfBirth: learnerData?.dateOfBirth ? learnerData?.dateOfBirth : null,
        registeredDate: learnerData?.registeredDate ? learnerData?.registeredDate : null,
        description: learnerData?.description ? learnerData?.description : null,
        exchangeRate: learnerData?.exchangeRate ? learnerData?.exchangeRate : null,
        learnerOwner: learnerData?.learnerOwner ? parseInt(learnerData?.learnerOwner) : null,
        currency: learnerData?.currency ? learnerData?.currency : null,
        learnerStage: learnerData?.learnerStage ? learnerData?.learnerStage : null,
        // batchIds: learnerData?.batchIds ? learnerData?.batchIds : ["4"],
        batchIds: ["4"],
        courses: learnerData?.courses ? learnerData?.courses : []
      };
      dispatch(updateLearner({ id: SingleLearner?.id, data: data }))
        .unwrap()
        .then((res: any) => {
          if (res) {
            toast.success(
              res?.message ? res?.message : "Learner Updated Successfully"
            );
            setError(LearnerDataView);
            handelOnCancel();
            dispatch(getSingleLearner(SingleLearner?.id));
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
            {createLearnerForm?.map((item: any) => {
              return item?.type === "input" ? (
                <InputEdit
                  lable={item?.lableValue}
                  disable={disableData?.[item?.name]}
                  name={item?.name}
                  error={error?.[item?.name]}
                  type={item?.typeValue}
                  value={learnerData?.[item?.name]}
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
                      learnerData?.[item?.name]
                        ? item?.data?.filter(
                          (i: any) => i?.value === learnerData?.[item?.name]
                        )?.[0]?.lable
                        : ""
                    }
                    onChange={handelOnChange}
                    handelOnStatus={handelOnStatus}
                  />
                ) : (
                  <SingleSelece
                    onChange={handelOnChange}
                    value={learnerData?.[item?.name]}
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
                        ? learnerData?.courseId
                          ? learnerData?.courseId
                            ?.map((item: any) => {
                              return item?.lable;
                            })
                            ?.join(",")
                          : ""
                        : typeof learnerData?.[item?.name] === "object" &&
                        learnerData?.[item?.name]?.length > 0 &&
                        learnerData?.[item?.name]
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
                        ? learnerData?.[item?.name]
                        : learnerData?.[item?.name]?.[0]?.lable
                          ? learnerData?.[item?.name]
                          : typeof learnerData?.[item?.name] === "object" &&
                          learnerData?.[item?.name]?.length > 0 &&
                          FilterLableAndValue(learnerData?.[item?.name])
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

export default LearnerDetail;
