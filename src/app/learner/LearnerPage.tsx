"use client";
import * as React from "react";
import Contact from "../../assets/employee_contact.svg";
import { AgGridReact } from "ag-grid-react";
import {
  CellClickedEvent,
  ColDef,
  SelectionChangedEvent,
} from "ag-grid-community";
import { useRef, useState, useEffect, useMemo } from "react";
import { LeadeData } from "../component/Type";
import TableHeader from "../component/TableHeader";
import Loader from "../component/Loader";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  deleteLeadsData,
  getLeadData,
  getLeadFilter,
} from "@/lib/features/lead/leadSlice";
import { toast } from "react-toastify";
import {
  dataFilter,
  filterId,
  LearnersListView,
  LearnerActiveFilter,
} from "@/api/CommonData";
import { getUser } from "@/lib/features/auth/authSlice";
import moment from "moment";
import {
  CreateLeadeStatus,
  GreetingStatus,
} from "@/lib/features/navbar/navbarSlice";
import { getUserID } from "@/assets/utils/auth.util";
import CreateLearner from "./CreateLearner";
import LearnerKanban from "./LearnerKanban";
import { deleteLearnerData, getLearner } from "@/lib/features/learner/learnerSlice";

const initialColumnDefs: ColDef[] = [
  {
    field: "created_on",
    headerName: "Created Time",
    minWidth: 215,
    maxWidth: 320,
    cellRenderer: (params: { data: any }) => {
      const data = params.data;
      return (
        <div className="flex items-center gap-2 capitalize ">
          {data?.createdAt
            ? moment(data?.createdAt).format("h:mm A")
            : "-"}
        </div>
      );
    },
    checkboxSelection: true,
    headerCheckboxSelection: true,
  },
  {
    field: "registeredDate",
    headerName: "Registered Date",
    minWidth: 215,
    maxWidth: 320,
    cellRenderer: (params: { data: any }) => {
      const data = params.data;
      return (
        <div className="flex items-center gap-2 capitalize ">
          {data?.registeredDate
            ? moment(data?.registeredDate).format("DD-MM-YYYY")
            : "-"}
        </div>
      );
    },
  },
  {
    field: "lastName",
    headerName: "Last Name",
    minWidth: 215,
    maxWidth: 320,
  },
  {
    field: "phone",
    headerName: "Phone",
    minWidth: 170,
    maxWidth: 180,
    cellRenderer: (params: { data: any }) => {
      const data = params.data;
      return (
        <div className="flex items-center gap-2">
          { data?.phone}
          {/* {"+ " + data?.countryCode?.replace("+", "") + " " + data?.phone} */}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 320,
    maxWidth: 400,
  },
  {
    field: "modeofClass",
    headerName: "Mode of Class",
    minWidth: 250,
    maxWidth: 350,
    cellRenderer: (params: { data: any }) => {
      const data = params.data;
      const getColorClass = (courseName: string) => {
        switch (courseName) {
          case "Morning":
            return "bg-orange-500 text-white";
          case "Evening":
            return "bg-stone-500 text-white";
          default:
            return "bg-transparent text-black";
        }
      }
      return (
        <div className="flex justify-center items-center capitalize w-full">
          <span className={` w-full h-auto flex justify-center flex-wrap mt-1.5 px-4 relative`}>
            <p
              className={`flex justify-center rounded-full w-48 h-7 items-center mb-1.5 ${getColorClass(
                data.slot
              )}`}
            >
              {data.slot}
            </p>
            {data?.Courses?.length === 0 && (
              <p className=" flex justify-center items-center text-black-100">
                -
              </p>
            )}
          </span>
        </div>
      );
    },
  },
  {
    field: "techStack",
    headerName: "Tech Stack",
    minWidth: 250,
    maxWidth: 350,
    cellRenderer: (params: { data: any }) => {
      const data = params.data;
      const getColorClass = () => {
        switch (data?.stack) {
          case "App Stack":
            return "bg-red-500 text-white";
          case "Ai Stack":
            return "bg-indigo-700 text-white";
          case "Agile Stack":
            return "bg-green-600 text-white";
          default:
            return "bg-transparent text-black";
        }
      }
      return (
        <div className="flex justify-center items-center capitalize w-full">
          <span className={` w-full h-auto flex justify-center flex-wrap mt-1.5 px-4 relative`}>
            {data?.stack && <p
              className={`flex justify-center rounded-full w-48 h-7 items-center mb-1.5 ${getColorClass()}`}
            >
              {data?.stack}
            </p>}
          </span>
        </div>
      );
    },
  },
  {
    field: "totalFees",
    headerName: "Total Fees",
    minWidth: 250,
    maxWidth: 350,
  },
  {
    field: "feePaid",
    headerName: "Fee Paid",
    minWidth: 250,
    maxWidth: 350,
  },
  {
    field: "dueAmount",
    headerName: "Due Amount",
    minWidth: 250,
    maxWidth: 350,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    minWidth: 250,
    maxWidth: 350,
    cellRenderer: (params: { data: any }) => {
      const data = params.data;
      return (
        <div className="flex items-center gap-2 capitalize ">
          {data?.dueDate
            ? moment(data?.dueDate).format("DD-MM-YYYY")
            : "-"}
        </div>
      );
    },
  },
];

const LearnerPage = ({
  handelOnSet, activeFilter, setActiveFilter
}: {
  handelOnSet: (id: number, data: LeadeData[]) => void; activeFilter?: string, setActiveFilter?: any
}) => {
  const dispatch = useAppDispatch();
  const tableRef = useRef<any>(null);
  const [selectedCell, setSelectedCell] = useState<any>([]);
  const [fieldStatus, setFieldStatus] = useState<Boolean>(true);
  const [active, setActive] = useState<string>("table");
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterData, setFilterData] = useState<any>(
    LearnersListView?.[0]?.value
  );
  const { nav } = useAppSelector((state) => state);
  const { learnerData, isLoader, isdelLoader } = useAppSelector((state) => state?.learner);
  console.log("🚀 ~ learnerData:", learnerData)

  useEffect(() => {
    dispatch(getLearner());
    setTimeout(() => {
      dispatch(GreetingStatus(false));
    }, 5000);
  }, []);

  const [columnDefs] = useState<ColDef[]>(initialColumnDefs);

  const defaultColDef = {
    sortable: true,
    flex: 1,
    headerComponentParams: { placeholder: "Enter Member ID" },
    resizable: true,
    suppressMovable: true,
    //cellClass: "uppercase",
    cellStyle: {
      color: "#181818",
      fontSize: "14px",
      fontStyle: "normal",
      fontWeight: "400",
      fontFamily: "Inter",
    },
    headerClass: "whitespace-normal",
    wrapText: true,
    autoHeight: true,
    wrapHeaderText: true,
    autoHeaderHeight: true,
  };

  const handleCellClicked = (param: CellClickedEvent<LeadeData, any>) => {
    if (param?.rowIndex !== null && param?.data !== undefined) {
      handelOnSet(param?.rowIndex, [param?.data]);
    }
  };

  const gridOptions = {
    rowClass: "custom-row-hover",
    // domLayout: 'autoHeight',
  };

  const onGridReady = (params: { api: any }) => {
    tableRef.current = params.api;
  };

  const handleSelectionChanged = (e: SelectionChangedEvent<LeadeData>) => {
    const selectedData = e.api.getSelectedRows();
    if (selectedData.length > 0) {
      setFieldStatus(false);
      setSelectedCell(selectedData);
    } else {
      setFieldStatus(true);
      setSelectedCell([]);
    }
  };

  const handelOnContactModel = () => {
    dispatch(CreateLeadeStatus(!nav?.LeadStatus));
    dispatch(getUser("salesperson"));
  };

  const handelOnSave = () => {
    handelOnContactModel();
    dispatch(getLearner());
  };
  const handelOnFilter = (data: string) => {
    if (data === "my_learners") {
      const filterData = `userId=${getUserID()}`;
      dispatch(getLeadFilter({ leadStage: "learner", data: filterData }));
    } else if (data === "yesterdays_learners") {
      const filterData = `fromDate=${moment(new Date())
        .subtract(1, "days")
        .format("YYYY-MM-DD")}&toDate=${moment(new Date()).format(
          "YYYY-MM-DD"
        )}`;
      dispatch(getLeadFilter({ leadStage: "learner", data: filterData }));
    } else if (data === "todays_learners") {
      const filterData = `fromDate=${moment(new Date()).format(
        "YYYY-MM-DD"
      )}&toDate=${moment(new Date()).add(1, "days").format("YYYY-MM-DD")}`;
      dispatch(getLeadFilter({ leadStage: "learner", data: filterData }));
    } else if (data === "this_week_learners") {
      const filterData = `fromDate=${moment()
        .startOf("week")
        .format("YYYY-MM-DD")}&toDate=${moment()
          .endOf("week")
          .format("YYYY-MM-DD")}`;
      dispatch(getLeadFilter({ leadStage: "learner", data: filterData }));
    } else if (data === "this_month_learners") {
      const filterData = `fromDate=${moment()
        .startOf("month")
        .format("YYYY-MM-DD")}&toDate=${moment()
          .endOf("month")
          .add(1, "days")
          .format("YYYY-MM-DD")}`;
      dispatch(getLeadFilter({ leadStage: "learner", data: filterData }));
    } else if (data === "lastmonth_learners") {
      const filterData = `fromDate=${moment()
        .subtract(1, "months")
        .startOf("month")
        .format("YYYY-MM-DD")}&toDate=${moment()
          .subtract(1, "months")
          .endOf("month")
          .add(1, "days")
          .format("YYYY-MM-DD")}`;
      dispatch(getLeadFilter({ leadStage: "learner", data: filterData }));
    } else if (data === "all_learners") {
      dispatch(getLearner());
      setActiveFilter("all")
    }

    setFilterData(data);
  };

  const TopHeader = useMemo(
    () =>
      LearnersListView?.filter?.((item: any) => item?.value === filterData)?.[0]
        ?.lable,
    [filterData]
  );

  const handelOnTableChange = (data: string) => {
    setActive(data);
  };
  const handelOnDelete = () => {
    dispatch(deleteLearnerData(filterId(selectedCell)))
      .unwrap()
      .then((res: any) => {
          toast.success(
            res?.data?.message
              ? res?.data?.message
              : "Learners Deleted Successfully"
          );
          dispatch(getLearner());
          setFieldStatus(true);
      })
      .catch((err: any) => {
        const error = JSON.parse(err?.message);
        toast.error(error?.message ? error?.message : "Something went wrong");
      });
  };

  const handelOnSearch = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchValue(e?.target.value);
  };

  const filteredActivities = React.useMemo(() => {
    if (learnerData?.length > 0) {
      if (searchValue) {
        return dataFilter(
          learnerData?.map((item: any) => ({
            ...item,
          })),
          searchValue,
          ["name", "techStack", "phone", "classMode", "leadStatus"]
        );
      } else {
        return learnerData;
      }
    } else {
      return [];
    }
  }, [learnerData, searchValue]);

  const handelOnTableFilterChange = (data: string) => {
    setActiveFilter(data)
  }
  return (
    <div className="lg:w-full">
      <div className="mx-5 my-2.5 py-2.5 shadow-lg border-2 bg-[#FFF] rounded-lg">
        <TableHeader
          tableData={learnerData}
          handelOnSearch={handelOnSearch}
          searchValue={searchValue}
          active={active}
          handelOnTableChange={handelOnTableChange}
          filterData={filterData}
          handelOnFilter={handelOnFilter}
          filterList={LearnersListView}
          headerImg={Contact}
          headerLable={TopHeader}
          headerBtnLable="Create Learner"
          headerBtnOnClick={handelOnContactModel}
          deletBtnStatus={fieldStatus}
          isdelLoader={isdelLoader}
          handelOnDelete={handelOnDelete}
          activeFilter={activeFilter}
          handelOnTableFilterChange={handelOnTableFilterChange}
          activeFilterStatus={LearnerActiveFilter}
        />
        {active === "table" ? (
          <div className="w-full px-5 gap-6 xl:h-full">
            <div
              className={`flex min-h-[68vh] xl:min-h-[70vh] xl:h-full w-${isLoader ? "[fit-content]" : "full"
                } mx-auto ag-theme-alpine`}
            >
              {isLoader ? ( // Check if contactData is null
                <Loader size={10} />
              ) : (
                <div
                  className="relative overflow-auto"
                  style={{ width: "100%" }}
                >
                  <AgGridReact
                    ref={tableRef}
                    rowData={filteredActivities}
                    columnDefs={columnDefs}
                    defaultColDef={defaultColDef}
                    enableBrowserTooltips={true}
                    //tooltipShowDelay={{ tooltipShowDelay: 2 }}
                    rowSelection="multiple"
                    pagination={true}
                    onCellClicked={handleCellClicked}
                    gridOptions={gridOptions}
                    paginationAutoPageSize={true}
                    onSelectionChanged={(e) => handleSelectionChanged(e)}
                    onGridReady={onGridReady}
                    animateRows={true}
                    suppressRowClickSelection={true}
                    overlayNoRowsTemplate={"Leads data no found"}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <LearnerKanban />
        )}
      </div>
      {nav?.LeadStatus && (
        <CreateLearner
          handelOnContactModel={handelOnContactModel}
          handelOnSave={handelOnSave}
        />
      )}
    </div>
  );
};

export default LearnerPage;
