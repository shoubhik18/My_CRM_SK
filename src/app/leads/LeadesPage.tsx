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
  DealListView,
  filterId,
  leadActiveFilter,
  TechStack,
} from "@/api/CommonData";
import { getUser } from "@/lib/features/auth/authSlice";
import CreateLeade from "./CreateLeade";
import moment from "moment";
import { CreateLeadeStatus } from "@/lib/features/navbar/navbarSlice";
import { getUserID } from "@/assets/utils/auth.util";
import LeadsKanban from "./LeadsKanban";
import { getCourses } from "@/lib/features/courses/coursesSlice";

const initialColumnDefs: ColDef[] = [
  {
    field: "created_on",
    headerName: "Created on",
    minWidth: 200,
    maxWidth: 220,
    cellRenderer: (params: { data: any }) => {
      const data = params.data;
      return (
        <div className="flex items-center gap-2 capitalize ">
          {data?.createdAt
            ? moment(data?.createdAt).format("DD MMM, YYYY, h:mm A")
            : "-"}
        </div>
      );
    },
    checkboxSelection: true,
    headerCheckboxSelection: true,
  },
  {
    field: "leadStatus",
    headerName: "Lead Status",
    minWidth: 120,
    maxWidth: 150,
    cellRenderer: (params: { data: any }) => {
      const data = params.data;
      const statusStyle =
        data?.leadStatus === "Cold Lead" ? { color: "red" } : {};

      return (
        <div style={statusStyle}>
          {data?.leadStatus ? data?.leadStatus : "Not Contacted"}
        </div>
      );
    },
  },

  {
    field: "name",
    headerName: "Name",
    minWidth: 215,
    maxWidth: 350,
  },
  {
    field: "phone",
    headerName: "Phone",
    minWidth: 150,
    maxWidth: 180,
    cellRenderer: (params: { data: any }) => {
      const data = params.data;
      return (
        <div className="flex items-center gap-2">
          {"+ " + data?.countryCode?.replace("+", "") + " " + data?.phone}
        </div>
      );
    },
  },
  {
    field: "techStack",
    headerName: "Stack",
    minWidth: 200,
    maxWidth: 300,
    cellRenderer: (params: { data: any }) => {
      const data = params.data;
      return (
        <div className="flex justify-center items-center capitalize w-full">
          <span
            className={`flex justify-center flex-wrap w-full h-7 mt-1.5 px-4 rounded-full text-black-500 relative`}
          >
            <p
              className={`${data?.techStack === TechStack?.[0]
                ? "bg-blue-400"
                : data?.techStack === TechStack?.[1]
                  ? "bg-purple-400"
                  : data?.techStack === TechStack?.[2]
                    ? "bg-fuchsia-400"
                    : data?.techStack === TechStack?.[3]
                      ? "bg-lime-400"
                      : data?.techStack === TechStack?.[4]
                        ? "bg-teal-400"
                        : data?.techStack === TechStack?.[5]
                          ? "bg-rose-400"
                          : data?.techStack === TechStack?.[6]
                            ? "bg-green-400"
                            : data?.techStack === TechStack?.[7]
                              ? "bg-pink-400"
                              : data?.techStack === TechStack?.[8]
                                ? "bg-blue-300"
                                : data?.techStack ? "border-2" : ""
                }  ${data?.techStack ? "text-black-100" : "text-black"
                } flex justify-center rounded-full absolute w-36 h-7 items-center`}
            >
              {data?.techStack ? data?.techStack : "-"}
            </p>
          </span>
        </div>
      );
    },
  },
  {
    field: "course",
    headerName: "Course",
    minWidth: 350,
    maxWidth: 500,
    cellRenderer: (params: { data: any }) => {
      const data = params.data;
      const getColorClass = (courseName: string) => {
        switch (courseName) {
          case "Java":
          case "UI/US Design":
          case "Python":
          case "React JS":
          case "Full-Stack Developer":
          case "Business Analyst":
          case "Software Testing":
            return "bg-blue-400";
          case "DevOps":
          case "Azure DevOps":
          case "AWS Cloud":
          case "Azure Cloud":
          case "Salesforce":
            return "bg-purple-400";
          case "Azure Data Engineering":
          case "AWS Data Engineering":
          case "GCP Data Engineering":
          case "AI Training & Certification":
          case "Data Science Training":
          case "Power BI":
            return "bg-fuchsia-400";
          default:
            return "border-2";
        }
      };

      return (
        <div className="flex justify-center items-center capitalize w-full">
          <span className={` w-full h-auto flex justify-center flex-wrap mt-1.5 px-4 relative`}>
            {data?.Courses.map((course: any, index: number) => (
              <p
                key={index}
                className={`flex justify-center rounded-full w-48 h-7 items-center mb-1.5 ${getColorClass(
                  course.name
                )}`}
              >
                {course.name}
              </p>
            ))}
            {data?.Courses.length === 0 && (
              <p className=" flex justify-center items-center text-black-100">
                -
              </p>
            )}
          </span>
        </div>
      );
    },
  },


];

const LeadesPage = ({
  handelOnSet, setPagination, pagination = 0, activeFilter, setActiveFilter, setCalendar, calendar
}: {
  handelOnSet: (id: number, data: LeadeData[]) => void; pagination: number, setPagination?: any, activeFilter?: string, setActiveFilter?: any; calendar?: any; setCalendar?: any
}) => {
  const dispatch = useAppDispatch();
  const tableRef = useRef<any>(null);
  const [selectedCell, setSelectedCell] = useState<any>([]);
  const [fieldStatus, setFieldStatus] = useState<Boolean>(true);
  const [active, setActive] = useState<string>("table");
  const [searchValue, setSearchValue] = useState<string>("");
  const [filterData, setFilterData] = useState<any>(DealListView?.[0]?.value);
  const { lead, nav } = useAppSelector((state) => state);
  const { CoursesData } = useAppSelector((state) => state?.courses);

  useEffect(() => {
    dispatch(getLeadData("lead"));
    if (!(CoursesData?.courses?.length > 0)) {
      dispatch(getCourses());
    }
  }, []);

  const onFirstDataRendered = React.useCallback((params: { api: { paginationGoToPage: (arg0: number) => void; }; }) => {
    params.api.paginationGoToPage(pagination);
  }, []);

  const paginationNumberFormatter = React.useCallback((params: {
    api: any; value: { toLocaleString: () => string; };
  }) => {
    setPagination(params.api.paginationProxy.currentPage)
    return params.value.toLocaleString();
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
    dispatch(getLeadData("lead"));
  };

  const handelOnFilter = (data: string) => {
    if (data === "my_leads") {
      const filterData = `userId=${getUserID()}`;
      dispatch(getLeadFilter({ leadStage: "lead", data: filterData }));
    } else if (data === "yesterdays_leads") {
      const filterData = `fromDate=${moment(new Date())
        .subtract(1, "days")
        .format("YYYY-MM-DD")}&toDate=${moment(new Date()).format(
          "YYYY-MM-DD"
        )}`;
      dispatch(getLeadFilter({ leadStage: "lead", data: filterData }));
    } else if (data === "todays_leads") {
      const filterData = `fromDate=${moment(new Date()).format(
        "YYYY-MM-DD"
      )}&toDate=${moment(new Date()).add(1, "days").format("YYYY-MM-DD")}`;
      dispatch(getLeadFilter({ leadStage: "lead", data: filterData }));
    } else if (data === "this_week_leads") {
      const filterData = `fromDate=${moment()
        .startOf("week")
        .format("YYYY-MM-DD")}&toDate=${moment()
          .endOf("week")
          .format("YYYY-MM-DD")}`;
      dispatch(getLeadFilter({ leadStage: "lead", data: filterData }));
    } else if (data === "this_month_leads") {
      const filterData = `fromDate=${moment()
        .startOf("month")
        .format("YYYY-MM-DD")}&toDate=${moment()
          .endOf("month")
          .add(1, "days")
          .format("YYYY-MM-DD")}`;
      dispatch(getLeadFilter({ leadStage: "lead", data: filterData }));
    } else if (data === "lastmonth_leads") {
      const filterData = `fromDate=${moment()
        .subtract(1, "months")
        .startOf("month")
        .format("YYYY-MM-DD")}&toDate=${moment()
          .subtract(1, "months")
          .endOf("month")
          .add(1, "days")
          .format("YYYY-MM-DD")}`;
      dispatch(getLeadFilter({ leadStage: "lead", data: filterData }));
    } else if (data === "all_leads") {
      dispatch(getLeadData("lead"));
      setActiveFilter("all")
    }

    setFilterData(data);
  };

  const TopHeader = useMemo(
    () =>
      DealListView?.filter?.((item: any) => item?.value === filterData)?.[0]
        ?.lable,
    [filterData]
  );

  const handelOnTableChange = (data: string) => {
    setActive(data);
  };
  const handelOnDelete = () => {
    dispatch(deleteLeadsData(filterId(selectedCell)))
      .unwrap()
      .then((res: any) => {
        if (res) {
          toast.success(
            res?.data?.message
              ? res?.data?.message
              : "Lead Deleted Successfully"
          );
          dispatch(getLeadData("lead"));
          setFieldStatus(true);
        }
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
    if (lead?.LeadData?.leads?.length > 0) {
      const filtetData = activeFilter === "all" ? lead?.LeadData?.leads : lead?.LeadData?.leads?.filter((item: any) => item?.leadStatus === activeFilter)
      if (searchValue) {
        return dataFilter(
          filtetData?.map((item: any) => ({
            ...item,
          })),
          searchValue,
          ["name", "techStack", "phone", "classMode", "leadStatus"]
        );
      } else {
        return filtetData;
      }
    } else {
      return [];
    }
  }, [lead?.LeadData, searchValue, activeFilter]);


  const handelOnTableFilterChange = (data: string) => {
    setActiveFilter(data)
  }
  const handelOnCalendar = () => {
    setCalendar(!calendar)
  }

  return (
    <div className="lg:w-full">
      <div className="mx-5 my-2.5 py-2.5 shadow-lg border-2 bg-[#FFF] rounded-lg">
        <TableHeader
          tableData={lead?.LeadData?.leads}
          handelOnSearch={handelOnSearch}
          searchValue={searchValue}
          active={active}
          handelOnTableChange={handelOnTableChange}
          filterData={filterData}
          handelOnFilter={handelOnFilter}
          filterList={DealListView}
          headerImg={Contact}
          headerLable={TopHeader}
          headerBtnLable="Create Lead"
          headerBtnOnClick={handelOnContactModel}
          deletBtnStatus={fieldStatus}
          isdelLoader={lead?.isdelLoader}
          handelOnDelete={handelOnDelete}
          activeFilter={activeFilter}
          handelOnTableFilterChange={handelOnTableFilterChange}
          activeFilterStatus={leadActiveFilter}
          calendarView={true}
          handelOnCalendar={handelOnCalendar}

        />
        {active === "table" ? (
          <div className="w-full px-5 gap-6 xl:h-full">
            <div
              className={`flex min-h-[68vh] xl:min-h-[70vh] xl:h-full w-${lead?.isLoader ? "[fit-content]" : "full"
                } mx-auto ag-theme-alpine`}
            >
              {lead?.isLoader ? (
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
                    onFirstDataRendered={onFirstDataRendered}
                    paginationNumberFormatter={paginationNumberFormatter}
                  />
                </div>
              )}
            </div>
          </div>
        ) : (
          <LeadsKanban />
        )}
      </div>
      {nav?.LeadStatus && (
        <CreateLeade
          handelOnContactModel={handelOnContactModel}
          handelOnSave={handelOnSave}
        />
      )}
    </div>
  );
};

export default LeadesPage;
