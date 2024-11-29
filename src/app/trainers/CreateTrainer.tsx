"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "../component/CustomInput";
import SingleSelece from "../component/SingleSelece";
import { LeadeDataView, HostItem, BatchData } from "../component/Type";
import CustomModel from "../component/CustomModel";
import Contact from "../../assets/employee_contact.svg";
import { toast } from "react-toastify";
import { createTrainerForm } from "@/api/CommonData";
import { addLeadData } from "@/lib/features/lead/leadSlice";
import { useAppDispatch, useAppSelector } from "../../lib/store";
import { getUserID } from "@/assets/utils/auth.util";
import MultiSelectDropdown from "../component/MultiSelectDropdown";
import { getUser } from "@/lib/features/auth/authSlice";
import { createTrainer } from "@/lib/features/trainer/trainerSlice";

const CreateTrainer = ({
  handelOnContactModel,
  handelOnSave,
}: {
  handelOnSave: () => void;
  handelOnContactModel: () => void;
}) => {
  const [trainer, setTrainer] = useState<BatchData>({});
  const [error, setError] = useState<BatchData>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { allUser } = useAppSelector((state) => state?.auth);

  const TrainerData: HostItem[] = allUser?.users?.map((item: any) => {
    return { lable: item?.name, value: item?.id };
  });

  useEffect(() => {
    dispatch(getUser("trainer"));
    handelOnStaticData();
  }, []);

  const handelOnChang = (e: any, name1?: any, name2?: string) => {

    const keys = Object.keys(trainer)
    if (name2 && keys?.includes(name2)) {
      const filterData = trainer?.[name2]?.map((item: any, i: number) => {
        const { name, value, checked } = e.target;
        if (name1 === i) {
          return { ...item, [`${name}`]: name === "videoUpload" ? checked : value }
        } else {
          return item
        }
      })
      setTrainer({ ...trainer, [name2]: filterData })
    }
    else if (name1) {
      setTrainer({ ...trainer, [`${name1}`]: e });
      setError({ ...error, [`${name1}`]: "" });
    } else {
      const { name, value, files } = e.target;
      if (name === "idProof") {
        setTrainer({ ...trainer, [`${name}`]: files?.[0] });
        setError({ ...error, [`${name}`]: "" });
      } else {
        setTrainer({ ...trainer, [`${name}`]: value });
        setError({ ...error, [`${name}`]: "" });
      }
    }
  };

  const vaidation = () => {
    let formValid = true;
    const regex = /^[\w-]+(\.[\w-]+)*@([a-z\d]+(-[a-z\d]+)*\.)+[a-z]{2,}$/i;
    const newError: any = {};

    // if (!trainer?.email?.trim()) {
    //   formValid = false;
    //   newError["email"] = "Please enter email";
    // } else if (!regex.test(trainer?.email)) {
    //   formValid = false;
    //   newError["email"] = "Please enter a valid email address";
    // }
    if (!trainer?.trainerName?.trim()) {
      formValid = false;
      newError["trainerName"] = "Please enter trainer name";
    }
    // if (!trainer?.phone?.trim()) {
    //   formValid = false;
    //   newError["phone"] = "Please enter phone number";
    // } else if (!(trainer?.phone?.length === 10)) {
    //   formValid = false;
    //   newError["phone"] = "Please enter valid phone number";
    // }

    setError(newError);
    return formValid;
  };

  const handelOnSubmit = () => {
    if (vaidation()) {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("trainerName", trainer?.trainerName ? trainer?.trainerName : null);
      formData.append("trainerOwner", trainer?.trainerOwner ? trainer?.trainerOwner : null);
      formData.append("description", trainer?.description ? trainer?.description : null);
      formData.append("freeSlots", trainer?.freeSlots ? trainer?.freeSlots : null);
      formData.append("idProof", trainer?.idProof ? trainer?.idProof : null);
      formData.append("techStack", trainer?.techStack ? trainer?.techStack : null);
      formData.append("trainerStatus", trainer?.trainerStatus ? trainer?.trainerStatus : null);
      formData.append("phone", trainer?.phone ? trainer?.phone : null);
      formData.append("batches", trainer?.batches ? trainer?.batches : null);
      formData.append("email", trainer?.email ? trainer?.email : null);
      formData.append("location", trainer?.location ? trainer?.location : null);
      formData.append("batchStage", trainer?.batchStage ? trainer?.batchStage : null);

      // const data = {
      //   trainerName: trainer?.trainerName ? trainer?.trainerName : null,
      //   trainerOwner: trainer?.trainerOwner ? trainer?.trainerOwner : null,
      //   description: trainer?.description ? trainer?.description : null,
      //   freeSlots: trainer?.freeSlots ? trainer?.freeSlots : null,
      //   idProof: trainer?.idProof ? trainer?.idProof : null,
      //   techStack: trainer?.techStack ? trainer?.techStack : null,
      //   trainerStatus: trainer?.trainerStatus ? trainer?.trainerStatus : null,
      //   phone: trainer?.phone ? trainer?.phone : null,
      //   batchStage: trainer?.batchStage ? trainer?.batchStage : null,
      //   email: trainer?.email ? trainer?.email : null,
      //   location: trainer?.location ? trainer?.location : null,

      //   slackStage: trainer?.slackStage ? trainer?.slackStage : null,
      //   trainerId: trainer?.trainerId ? trainer?.trainerId : null,
      // }

      dispatch(createTrainer(formData))
        .unwrap()
        .then((res: any) => {
          if (res) {
            toast.success(
              res?.message
                ? res?.message
                : "Trainer Created Successfully"
            );
            setTrainer({ ...LeadeDataView, countryCode: '91' });
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
    setTrainer({
      ...trainer
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
        lable="Create Trainer"
        onCancel={handelOnCancel}
        onSave={handelOnSubmit}
        isLoading={isLoading}
        large={true}
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2 ">
          {createTrainerForm?.map((item: any) => {
            return item?.type === "input" ? (
              <CustomInput
                onChange={handelOnChang}
                lableValue={item?.lableValue}
                value={item?.name === "idProof" ? trainer[item?.name]?.name : trainer[item?.name]}
                error={error[item?.name]}
                name={item?.name}
                placeholder={item?.placeholder}
                typeValue={item?.typeValue}
              />
            ) : item?.type === "select" ? (
              <SingleSelece
                onChange={handelOnChang}
                value={trainer?.[item?.name]}
                name={item?.name}
                lableValue={item?.lableValue}
                data={item?.name === "trainerId" ? TrainerData : item?.data}
              />
            ) : item?.type === "multiSelect" ? (
              <MultiSelectDropdown
                onChange={(e) => handelOnChang(e, item?.name)}
                value={trainer?.[item?.name]}
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

export default CreateTrainer;
