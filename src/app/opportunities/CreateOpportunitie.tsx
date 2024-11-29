"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "../component/CustomInput";
import SingleSelece from "../component/SingleSelece";
import {
  OpportunitiyDataView,
  OpportunitiyData1,
  HostItem,
} from "../component/Type";
import CustomModel from "../component/CustomModel";
import Contact from "../../assets/employee_contact.svg";
import { toast } from "react-toastify";
import { createOpportunityForm } from "@/api/CommonData";
import { addLeadData } from "@/lib/features/lead/leadSlice";
import { useAppDispatch, useAppSelector } from "../../lib/store";
import { getUserID } from "@/assets/utils/auth.util";
import MultiSelectDropdown from "../component/MultiSelectDropdown";
import { getCourses } from "@/lib/features/courses/coursesSlice";

const CreateOpportunitie = ({
  handelOnContactModel,
  handelOnSave,
}: {
  handelOnSave: () => void;
  handelOnContactModel: () => void;
}) => {
  const [opportunitiy, setOpportunitiy] =
    useState<OpportunitiyData1>(OpportunitiyDataView);
  const [error, setError] = useState<OpportunitiyData1>(OpportunitiyDataView);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { CoursesData } = useAppSelector((state) => state?.courses);

  const Courses: HostItem[] = CoursesData?.courses?.map((item: any) => {
    return { lable: item?.name, value: item?.id };
  });

  useEffect(() => {
    dispatch(getCourses());
    handelOnStaticData();
  }, []);
  
  const handelOnStaticData = () => {
    setOpportunitiy({
      ...opportunitiy,
      [`leadStatus`]: "Not Contacted",
      [`opportunityStatus`]: "Visiting",
      ["courseId"]:
        Courses?.filter(
          (item) => item?.lable?.toLocaleLowerCase() === "others" || item?.lable?.toLocaleLowerCase() === "other"
        )?.length > 0
          ? Courses?.filter(
            (item) =>
              item?.lable?.toLocaleLowerCase() === "others" || item?.lable?.toLocaleLowerCase() === "other"
          )
          : null,
    });
  };

  const handelOnChang = (
    e: { target: { name: any; value: any } },
    name1?: any
  ) => {
    if (name1) {
      setOpportunitiy({ ...opportunitiy, [`${name1}`]: e });
      setError({ ...error, [`${name1}`]: "" });
    } else {
      const { name, value } = e.target;
      setOpportunitiy({ ...opportunitiy, [`${name}`]: value });
      setError({ ...error, [`${name}`]: "" });
    }
  };

  const vaidation = () => {
    let formValid = true;
    const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
    const newError: any = {};

    if (!opportunitiy?.email?.trim()) {
      formValid = false;
      newError["email"] = "Please enter email";
    } else if (!regex.test(opportunitiy?.email)) {
      formValid = false;
      newError["email"] = "Please enter a valid email address";
    }
    if (!opportunitiy?.name?.trim()) {
      formValid = false;
      newError["name"] = "Please enter name";
    }
    if (!opportunitiy?.phone?.trim()) {
      formValid = false;
      newError["phone"] = "Please enter phone number";
    } else if (!(opportunitiy?.phone?.length === 10)) {
      formValid = false;
      newError["phone"] = "Please enter valid phone number";
    }
    if (!opportunitiy?.countryCode?.trim()) {
      formValid = false;
      newError["countryCode"] = "Please enter cc";
    } else if (opportunitiy?.countryCode?.length > 4) {
      formValid = false;
      newError["countryCode"] = "Please enter maximum 4 digit cc";
    }

    setError(newError);
    return formValid;
  };

  const handelOnSubmit = () => {
    if (vaidation()) {
      setIsLoading(true);
      const data = {
        name: opportunitiy?.name ? opportunitiy?.name : null,
        opportunityStatus: opportunitiy?.opportunityStatus
          ? opportunitiy?.opportunityStatus
          : null,
        phone: opportunitiy?.phone ? opportunitiy?.phone : null,
        countryCode: opportunitiy?.countryCode
          ? opportunitiy?.countryCode
          : null,
        opportunityStage: opportunitiy?.opportunityStage
          ? opportunitiy?.opportunityStage
          : null,
        email: opportunitiy?.email ? opportunitiy?.email : null,
        demoAttendedStage: opportunitiy?.demoAttendedStage
          ? opportunitiy?.demoAttendedStage
          : null,
        feeQuoted: opportunitiy?.feeQuoted ? opportunitiy?.feeQuoted : null,
        visitedStage: opportunitiy?.visitedStage
          ? opportunitiy?.visitedStage
          : null,
        batchTiming:
          opportunitiy?.batchTiming?.length > 0
            ? opportunitiy?.batchTiming?.map((item: any) => {
              return item?.value;
            })
            : null,
        coldLeadReason: opportunitiy?.coldLeadReason
          ? opportunitiy?.coldLeadReason
          : null,
        description: opportunitiy?.description
          ? opportunitiy?.description
          : null,
        leadSource: opportunitiy?.leadSource,
        techStack: opportunitiy?.techStack,
        courseIds:
          opportunitiy?.courseId?.length > 0
            ? opportunitiy?.courseId?.map((item: any) => {
              return item?.value;
            })
            : null,
        classMode: opportunitiy?.classMode,
        leadStatus: opportunitiy?.leadStatus,
        nextFollowUp: opportunitiy?.nextFollowUp
          ? opportunitiy?.nextFollowUp
          : null,
        userId: getUserID(),
        leadStage: "opportunity",
      };
      dispatch(addLeadData(data))
        .unwrap()
        .then((res: any) => {
          if (res?.status === 201) {
            toast.success(
              res?.data?.message
                ? res?.data?.message
                : "Opportunity Created Successfully"
            );
            setOpportunitiy(OpportunitiyDataView);
            setError(OpportunitiyDataView);
            handelOnSave();
            handelOnStaticData();
          }
        })
        .catch((err) => {
          const error = JSON.parse(err.message);
          toast.error(error?.error ? error?.error : "Something went wrong");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handelOnCancel = () => {
    setError(OpportunitiyDataView);
    handelOnContactModel();
  };

  return (
    <>
      <CustomModel
        headerImg={Contact}
        lable="Create Opportunitiy "
        onCancel={handelOnCancel}
        onSave={handelOnSubmit}
        isLoading={isLoading}
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {createOpportunityForm?.map((item: any) => {
            return item?.type === "input" ? (
              <CustomInput
                onChange={handelOnChang}
                lableValue={item?.lableValue}
                value={opportunitiy?.[item?.name]}
                error={error[item?.name]}
                name={item?.name}
                placeholder={item?.placeholder}
                typeValue={item?.typeValue}
              />
            ) : item?.type === "select" ? (
              <SingleSelece
                onChange={handelOnChang}
                value={opportunitiy?.[item?.name]}
                name={item?.name}
                lableValue={item?.lableValue}
                data={item?.data}
              />
            ) : item?.type === "multiSelect" ? (
              <MultiSelectDropdown
                onChange={(e) => handelOnChang(e, item?.name)}
                value={opportunitiy?.[item?.name]}
                name={item?.name}
                lableValue={item?.lableValue}
                data={item?.name === "courseId" ? Courses : item?.data}
              />
            ) : null;
          })}
        </div>
        <div className="mb-6">
          <CustomInput
            onChange={handelOnChang}
            lableValue="Description"
            value={opportunitiy?.description}
            name="description"
            placeholder="Description"
            typeValue="text"
          />
        </div>
      </CustomModel>
    </>
  );
};

export default CreateOpportunitie;
