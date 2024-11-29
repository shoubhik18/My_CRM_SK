"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "../component/CustomInput";
import SingleSelece from "../component/SingleSelece";
import { LeadeDataView, HostItem, CommonInterFace } from "../component/Type";
import CustomModel from "../component/CustomModel";
import Contact from "../../assets/employee_contact.svg";
import { toast } from "react-toastify";
import { createLeadForm } from "@/api/CommonData";
import { addLeadData } from "@/lib/features/lead/leadSlice";
import { useAppDispatch, useAppSelector } from "../../lib/store";
import { getUserID } from "@/assets/utils/auth.util";
import { getCourses } from "@/lib/features/courses/coursesSlice";
import MultiSelectDropdown from "../component/MultiSelectDropdown";

const CreateLeade = ({
  handelOnContactModel,
  handelOnSave,
}: {
  handelOnSave: () => void;
  handelOnContactModel: () => void;
}) => {
  const [leade, setLeade] = useState<CommonInterFace>({ ...LeadeDataView, countryCode: '91' });
  const [error, setError] = useState<CommonInterFace>(LeadeDataView);
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

  const handelOnChang = (e: any, name1?: any) => {
    if (name1) {
      setLeade({ ...leade, [`${name1}`]: e });
      setError({ ...error, [`${name1}`]: "" });
    } else {
      const { name, value } = e.target;
      setLeade({ ...leade, [`${name}`]: value });
      setError({ ...error, [`${name}`]: "" });
    }
  };

  const vaidation = () => {
    let formValid = true;
    const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
    const newError: any = {};

    if (!leade?.email?.trim()) {
      formValid = false;
      newError["email"] = "Please enter email";
    } else if (!regex.test(leade?.email)) {
      formValid = false;
      newError["email"] = "Please enter a valid email address";
    }
    if (!leade?.name?.trim()) {
      formValid = false;
      newError["name"] = "Please enter name";
    }
    if (!leade?.countryCode?.trim()) {
      formValid = false;
      newError["countryCode"] = "Please enter cc";
    } else if (leade?.countryCode?.length > 4) {
      formValid = false;
      newError["countryCode"] = "Please enter maximum 4 digit cc";
    }
    if (!leade?.phone?.trim()) {
      formValid = false;
      newError["phone"] = "Please enter phone number";
    } else if (!(leade?.phone?.length === 10)) {
      formValid = false;
      newError["phone"] = "Please enter valid phone number";
    }

    setError(newError);
    return formValid;
  };

  const handelOnSubmit = () => {
    if (vaidation()) {
      setIsLoading(true);
      const data = {
        name: leade?.name,
        leadSource: leade?.leadSource,
        techStack: leade?.techStack,
        countryCode: leade?.countryCode,
        phone: leade?.phone,
        courseIds:
          leade?.courseId?.length > 0
            ? leade?.courseId?.map((item: any) => {
              return item?.value;
            })
            : null,
        email: leade?.email,
        classMode: leade?.classMode,
        feeQuoted: leade?.feeQuoted ? leade?.feeQuoted : null,
        batchTiming:
          leade?.batchTiming?.length > 0
            ? leade?.batchTiming?.map((item: any) => {
              return item?.value;
            })
            : null,
        leadStatus: leade?.leadStatus,
        description: leade?.description,
        nextFollowUp: leade?.nextFollowUp ? leade?.nextFollowUp : null,
        userId: getUserID(),
        leadStage: "lead",
      };
      dispatch(addLeadData(data))
        .unwrap()
        .then((res: any) => {
          if (res?.status === 201) {
            toast.success(
              res?.data?.message
                ? res?.data?.message
                : "Lead Created Successfully"
            );
            setLeade({ ...LeadeDataView, countryCode: '91' });
            setError(LeadeDataView);
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

  const handelOnStaticData = () => {
    setLeade({
      ...leade,
      [`leadStatus`]: "Not Contacted",
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

const handelOnCancel = () => {
  setError(LeadeDataView);
  handelOnContactModel();
  handelOnStaticData();
};

return (
  <>
    <CustomModel
      headerImg={Contact}
      lable="Create Lead "
      onCancel={handelOnCancel}
      onSave={handelOnSubmit}
      isLoading={isLoading}
    >
      <div className="grid gap-6 mb-6 md:grid-cols-2">
        {createLeadForm?.map((item: any) => {
          return item?.type === "input" ? (
            <CustomInput
              onChange={handelOnChang}
              lableValue={item?.lableValue}
              value={leade[item?.name]}
              error={error[item?.name]}
              name={item?.name}
              placeholder={item?.placeholder}
              typeValue={item?.typeValue}
            />
          ) : item?.type === "select" ? (
            <SingleSelece
              onChange={handelOnChang}
              value={leade?.[item?.name]}
              name={item?.name}
              lableValue={item?.lableValue}
              data={item?.data}
            />
          ) : item?.type === "multiSelect" ? (
            <MultiSelectDropdown
              onChange={(e) => handelOnChang(e, item?.name)}
              value={leade?.[item?.name]}
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
          value={leade?.description}
          name="description"
          placeholder="Description"
          typeValue="text"
        />
      </div>
    </CustomModel>
  </>
);
};

export default CreateLeade;
