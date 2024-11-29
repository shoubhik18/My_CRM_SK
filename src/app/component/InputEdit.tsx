// import Image from "next/image";
// import React from "react";
// import Edit from "../../assets/Edit.svg";
// import moment from "moment";

// const InputEdit = ({
//   lable,
//   disable,
//   type,
//   name,
//   value,
//   onChange,
//   handelOnStatus,
//   error,
// }: {
//   lable: String;
//   disable: Boolean;
//   type: string;
//   name: String;
//   value: string;
//   onChange?: (e: any) => void;
//   handelOnStatus: (name: String, status: Boolean) => void;
//   error?: string;
// }) => {
//   console.log("🚀 ~ type:", type, name, value, lable);
//   const handleKeyDown = (e: { key: string; preventDefault: () => void }) => {
//     // Allow only numeric digits
//     if (!/^\d$/.test(e.key) && e.key !== "Backspace") {
//       e.preventDefault();
//     }
//   };
//   const handleTextKeyDown = (e: {
//     key: string;
//     preventDefault: () => void;
//   }) => {
//     // Allow only numeric digits
//     if (!/^[a-zA-Z\s]*$/.test(e.key) && e.key !== "Backspace") {
//       e.preventDefault();
//     }
//   };

//   const handleDoubleClick = () => {
//     handelOnStatus(name, false);
//   };
//   return (
//     <div>
//       <button className="h-11 w-full min-w-[200px]">
//         <label className="font-medium text-base text-[#A8C6DF] flex gap-2">
//           {lable}{" "}
//           {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
//         </label>
//         <div className="relative">
//           {disable && (
//             <button
//               className="absolute w-full h-full"
//               onDoubleClick={handleDoubleClick}
//             ></button>
//           )}
//           {disable && (
//             <Image
//               src={Edit}
//               alt="edit icon"
//               onClick={() => handelOnStatus(name, false)}
//               className="absolute right-1 cursor-pointer"
//             />
//           )}
//           {type === "file" ? (
//             <label htmlFor="file">
//               <div className="flex cursor-pointer">
//                 <span onDoubleClick={handleDoubleClick} className="h-full text-start text-lg w-full border-b border-[#0003] -mt-2.5 bg-transparent pt-4 font-sans font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 text-neutral-400">
//                   {value ? value : lable ? lable : "Choose File"}
//                 </span>
//               </div>
//               <input
//                 id="file"
//                 placeholder={`${lable}`}
//                 name={`${name}`}
//                 onChange={onChange}
//                 disabled={disable ? true : false}
//                 onDoubleClick={handleDoubleClick}
//                 type={`${type}`}
//                 className="hidden"
//               />
//             </label>
//           ) : type === "date" ? (
//             <input
//               placeholder={`${lable}`}
//               name={`${name}`}
//               value={`${
//                 value ? moment(new Date(value)).format("YYYY-MM-DD") : ""
//               }`}
//               onChange={onChange}
//               onKeyDown={handleKeyDown}
//               min={moment(new Date()).format("YYYY-MM-DD")}
//               disabled={disable ? true : false}
//               type={`${type}`}
//               className="h-full text-lg w-full border-b border-[#0003] -mt-2 bg-transparent pt-4 pb-1.5 font-sans font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
//             />
//           ) : (
//             <input
//               placeholder={`${lable}`}
//               name={`${name}`}
//               value={`${value ? value : ""}`}
//               onChange={onChange}
//               disabled={disable ? true : false}
//               onDoubleClick={handleDoubleClick}
//               onKeyDown={
//                 name === "phone" ||
//                 name === "phoneNumber" ||
//                 name === "countryCode"
//                   ? handleKeyDown
//                   : name === "name"
//                   ? handleTextKeyDown
//                   : undefined
//               }
//               type={`${type}`}
//               className="h-full text-lg w-full border-b border-[#0003] -mt-2 bg-transparent pt-4 pb-1.5 font-sans font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
//             />
//           )}
//         </div>
//       </button>
//     </div>
//   );
// };

// export default InputEdit;

import Image from "next/image";
import React from "react";
import Edit from "../../assets/Edit.svg";
import moment from "moment";
import { convertDate } from "@/api/CommonData";

const InputEdit = ({
  lable,
  disable,
  type,
  name,
  value,
  onChange,
  handelOnStatus,
  error,
}: {
  lable: String;
  disable: Boolean;
  type: string;
  name: String;
  value: string;
  onChange?: (e: any) => void;
  handelOnStatus: (name: String, status: Boolean) => void;
  error?: string;
}) => {
  const handleKeyDown = (e: { ctrlKey: any; key: string; preventDefault: () => void; }) => {
    // Allow only numeric digits, backspace, and clipboard operations (Ctrl+C, Ctrl+V, Ctrl+A)
    const allowedKeys = [
      "Backspace",
      "ArrowLeft",
      "ArrowRight",
      "Delete",
      "Tab",
      "Enter",
      "Control",
      "c",
      "v",
      "a",
    ];

    const isControlKey = e.ctrlKey && ["c", "v", "a"].includes(e.key);

    if (!/^\d$/.test(e.key) && !allowedKeys.includes(e.key) && !isControlKey) {
      e.preventDefault();
    }
  };

  const handleTextKeyDown = (e: { key: string; preventDefault: () => void; }) => {
    // Allow only alphabetic characters and spaces
    if (!/^[a-zA-Z\s]*$/.test(e.key) && e.key !== "Backspace") {
      e.preventDefault();
    }
  };

  const handleDoubleClick = () => {
    handelOnStatus(name, false);
  };

  return (
    <div>
      <button className="h-11 w-full min-w-[200px]">
        <label className="font-medium text-base text-[#A8C6DF] flex gap-2">
          {lable}{" "}
          {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
        </label>
        <div className="relative">
          {disable && (
            <button
              className="absolute w-full h-full"
              onDoubleClick={handleDoubleClick}
            ></button>
          )}
          {disable && (
            <Image
              src={Edit}
              alt="edit icon"
              onClick={() => handelOnStatus(name, false)}
              className="absolute right-1 cursor-pointer"
            />
          )}
          {type === "file" ? (
            <label htmlFor="file">
              <div className="flex cursor-pointer">
                <span
                  onDoubleClick={handleDoubleClick}
                  className="h-full text-start text-lg w-full border-b border-[#0003] -mt-2.5 bg-transparent pt-4 font-sans font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 text-neutral-400"
                >
                  {value ? value : lable ? lable : "Choose File"}
                </span>
              </div>
              <input
                id="file"
                placeholder={`${lable}`}
                name={`${name}`}
                onChange={onChange}
                disabled={disable ? true : false}
                onDoubleClick={handleDoubleClick}
                type={`${type}`}
                className="hidden"
              />
            </label>
          ) : type === "date" ? (
            <input
              placeholder={`${lable}`}
              name={`${name}`}
              value={`${value ? moment(new Date(value)).format("YYYY-MM-DD") : ""
                }`}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              min={moment(new Date()).format("YYYY-MM-DD")}
              disabled={disable ? true : false}
              type={`${type}`}
              className="h-full text-lg w-full border-b border-[#0003] -mt-2 bg-transparent pt-4 pb-1.5 font-sans font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
            />
          ) : type === "datetime-local" ? (
            <input
              placeholder={`${lable}`}
              name={`${name}`}
              value={`${value ? convertDate(value) : "" 
                }`}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              min={convertDate(new Date())}
              disabled={disable ? true : false}
              type={`${type}`}
              className="h-full text-lg w-full border-b border-[#0003] -mt-2 bg-transparent pt-4 pb-1.5 font-sans font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
            />
          ) : (
            <input
              placeholder={`${lable}`}
              name={`${name}`}
              value={`${value ? value : ""}`}
              onChange={onChange}
              disabled={disable ? true : false}
              onDoubleClick={handleDoubleClick}
              onKeyDown={
                name === "phone" || name === "phoneNumber" || name === "countryCode"
                  ? handleKeyDown
                  : name === "name"
                    ? handleTextKeyDown
                    : undefined
              }
              type={`${type}`}
              className="h-full text-lg w-full border-b border-[#0003] -mt-2 bg-transparent pt-4 pb-1.5 font-sans font-semibold text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-900 focus:outline-0"
            />
          )}
        </div>
      </button>
    </div>
  );
};

export default InputEdit;
