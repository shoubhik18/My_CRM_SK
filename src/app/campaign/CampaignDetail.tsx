"use client";
import React, { useEffect, useState } from "react";
import {
  CampaignForm,
  LeadeData,
  CampaignDataView,
  CommonInterFace,
} from "@/app/component/Type";
import JointBtn from "@/app/component/JointBtn";
import InputEdit from "../component/InputEdit";
import SingleSelece from "../component/SingleSelece";
import { FilterLableAndValue, createCampaignForm } from "@/api/CommonData";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getSingleLead, updateLeadData } from "@/lib/features/lead/leadSlice";
import MultiSelectDropdown from "../component/MultiSelectDropdown";
import { updateCampaign } from "@/lib/features/campaign/campaignSlice";

const CampaignDetail = ({
  handelOnSet,
}: {
  handelOnSet: (id: number, data: LeadeData[]) => void;
}) => {
  const dispatch = useAppDispatch();
  const [disableData, setDisableData] = useState<CommonInterFace>(CampaignDataView);
  const [campaignData, setCampaignData] = useState<CommonInterFace>(CampaignForm);
  const [error, setError] = useState<CommonInterFace>(CampaignForm);
  const [changeContactData, setChangeContactData] = useState<CommonInterFace>(CampaignForm);
  const [changeStatus, setChangeStatus] = useState<Boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { singleCampaignData } = useAppSelector((state) => state?.campaign);
  const handelOnStatus = (name: String, value: Boolean) => {
    setDisableData((prevData) => ({ ...prevData, [`${name}`]: value }));
  };

  const handelOnChange = (e: any, name1?: any) => {
    if (name1) {
      setCampaignData({ ...campaignData, [`${name1}`]: e });
      setError({ ...error, [`${name1}`]: "" });
    } else {
      const { name, value } = e.target;
      setCampaignData({ ...campaignData, [`${name}`]: value });
      setError({ ...error, [`${name}`]: "" });
    }
  };
  useEffect(() => {
    if (singleCampaignData?.campaign) {
      handelonClear();
    }
  }, [singleCampaignData?.campaign]);

  useEffect(() => {
    if (campaignData) {
      const value =
        JSON.stringify(changeContactData) === JSON.stringify(campaignData);
      setChangeStatus(value);
    }
  }, [campaignData]);

  const handelOnCancel = () => {
    setDisableData(CampaignDataView);
    setCampaignData(campaignData);
    handelOnSet(-1, []);
  };

  const handelonClear = () => {
    setCampaignData(singleCampaignData?.campaign);
    setChangeContactData(singleCampaignData?.campaign);
  };

  const vaidation = () => {
    let formValid = true;
    const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
    const newError: any = {};

    // if (!campaignData?.email?.trim()) {
    //   formValid = false;
    //   newError["email"] = "Please enter email";
    // } else if (!regex.test(campaignData?.email)) {
    //   formValid = false;
    //   newError["email"] = "Please enter a valid email address";
    // }
    if (!campaignData?.name?.trim()) {
      formValid = false;
      newError["name"] = "Please enter campaign name";
    }
    if (!campaignData?.status?.trim()) {
      formValid = false;
      newError["status"] = "Please enter campaign status";
    }
    if (!campaignData?.type?.trim()) {
      formValid = false;
      newError["type"] = "Please enter campaign type";
    }
    if (!campaignData?.campaignDate?.trim()) {
      formValid = false;
      newError["campaignDate"] = "Please enter campaign start date";
    }
    if (!campaignData?.endDate?.trim()) {
      formValid = false;
      newError["endDate"] = "Please enter campaign end date";
    }

    setError(newError);
    return formValid;
  };

  const handelOnSave = () => {
    if (vaidation()) {
      setIsLoading(true);
      const data = {
        name: campaignData?.name,
        status: campaignData?.status,
        type: campaignData?.type,
        campaignDate: campaignData?.campaignDate,
        endDate: campaignData?.endDate,
      };
      dispatch(updateCampaign({ id: singleCampaignData?.campaign?.id, data: data }))
        .unwrap()
        .then((res: any) => {
          if (res) {
            toast.success(
              res?.message ? res?.message : "Campaign Update Successfully"
            );
            setError(CampaignForm);
            handelOnCancel();
            dispatch(getSingleLead(singleCampaignData?.campaign?.id));
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
            {createCampaignForm?.map((item: any) => {          // updateCampaignForm
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
                    value={campaignData?.[item?.name]}
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
                        campaignData?.[item?.name]
                          ? item?.data?.filter(
                            (i: any) => i?.value === campaignData?.[item?.name]
                          )?.[0]?.lable
                          : ""
                      }
                      onChange={handelOnChange}
                      handelOnStatus={handelOnStatus}
                    />
                  ) : (
                    <SingleSelece
                      onChange={handelOnChange}
                      value={campaignData?.[item?.name]}
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
                          ? campaignData?.courseId
                            ? campaignData?.courseId
                              ?.map((item: any) => {
                                return item?.lable;
                              })
                              ?.join(",")
                            : ""
                          : typeof campaignData?.[item?.name] === "object" &&
                          campaignData?.[item?.name]?.length > 0 &&
                          campaignData?.[item?.name]
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
                          ? campaignData?.[item?.name]
                          : campaignData?.[item?.name]?.[0]?.lable
                            ? typeof campaignData?.[item?.name] === "object" &&
                            campaignData?.[item?.name]?.length > 0 &&
                            campaignData?.[item?.name]
                            : typeof campaignData?.[item?.name] === "object" &&
                            FilterLableAndValue(campaignData?.[item?.name])
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

export default CampaignDetail;

