"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "../component/CustomInput";
import SingleSelece from "../component/SingleSelece";
import { CommonInterFace } from "../component/Type";
import CustomModel from "../component/CustomModel";
import Contact from "../../assets/employee_contact.svg";
import { toast } from "react-toastify";
import { createCampaignForm } from "@/api/CommonData";
import { addLeadData } from "@/lib/features/lead/leadSlice";
import { useAppDispatch } from "../../lib/store";
import { getUserID } from "@/assets/utils/auth.util";
import MultiSelectDropdown from "../component/MultiSelectDropdown";
import { createCampaign } from "@/lib/features/campaign/campaignSlice";

const CreateCampaign = ({
  handelOnContactModel,
  handelOnSave,
}: {
  handelOnSave: () => void;
  handelOnContactModel: () => void;
}) => {
  const [campaign, setCampaign] = useState<CommonInterFace>({});
  const [error, setError] = useState<CommonInterFace>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();


  useEffect(() => {
    handelOnStaticData();
  }, []);

  const handelOnChang = (e: any, name1?: any) => {
    if (name1) {
      setCampaign({ ...campaign, [`${name1}`]: e });
      setError({ ...error, [`${name1}`]: "" });
    } else {
      const { name, value } = e.target;
      setCampaign({ ...campaign, [`${name}`]: value });
      setError({ ...error, [`${name}`]: "" });
    }
  };

  const vaidation = () => {
    let formValid = true;
    const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
    const newError: any = {};

    // if (!campaign?.email?.trim()) {
    //   formValid = false;
    //   newError["email"] = "Please enter email";
    // } else if (!regex.test(campaign?.email)) {
    //   formValid = false;
    //   newError["email"] = "Please enter a valid email address";
    // }
    if (!campaign?.name?.trim()) {
      formValid = false;
      newError["name"] = "Please enter campaign name";
    }
    if (!campaign?.status?.trim()) {
      formValid = false;
      newError["status"] = "Please enter campaign status";
    }
    if (!campaign?.type?.trim()) {
      formValid = false;
      newError["type"] = "Please enter campaign type";
    }
    if (!campaign?.campaignDate?.trim()) {
      formValid = false;
      newError["campaignDate"] = "Please enter campaign start date";
    }
    if (!campaign?.endDate?.trim()) {
      formValid = false;
      newError["endDate"] = "Please enter campaign end date";
    }
    

    setError(newError);
    return formValid;
  };

  const handelOnSubmit = () => {
    if (vaidation()) {
      setIsLoading(true);
      const data = {
        name: campaign?.name,
        status: campaign?.status,
        type: campaign?.type,
        campaignDate: campaign?.campaignDate,
        endDate: campaign?.endDate,
      };
      dispatch(createCampaign(data))
        .unwrap()
        .then((res: any) => {
          console.log("🚀 ~ .then ~ res:", res)
          if (res?.status === 201) {
            toast.success(
              res?.data?.message
                ? res?.data?.message
                : "Campaign Created Successfully"
            );
            setCampaign({});
            setError({});
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
    setCampaign({});
  };

  const handelOnCancel = () => {
    setError({});
    handelOnContactModel();
    handelOnStaticData();
  };

  return (
    <>
      <CustomModel
        headerImg={Contact}
        lable="Create Campaign"
        onCancel={handelOnCancel}
        onSave={handelOnSubmit}
        isLoading={isLoading}
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {createCampaignForm?.map((item: any) => {
            return item?.type === "input" ? (
              <CustomInput
                onChange={handelOnChang}
                lableValue={item?.lableValue}
                value={campaign[item?.name]}
                error={error[item?.name]}
                name={item?.name}
                placeholder={item?.placeholder}
                typeValue={item?.typeValue}
              />
            ) : item?.type === "select" ? (
              <SingleSelece
                onChange={handelOnChang}
                value={campaign?.[item?.name]}
                name={item?.name}
                lableValue={item?.lableValue}
                data={item?.data}
              />
            ) : item?.type === "multiSelect" ? (
              <MultiSelectDropdown
                onChange={(e) => handelOnChang(e, item?.name)}
                value={campaign?.[item?.name]}
                name={item?.name}
                lableValue={item?.lableValue}
                data={item?.data}
              />
            ) : null;
          })}
        </div>
      </CustomModel>
    </>
  );
};

export default CreateCampaign;
