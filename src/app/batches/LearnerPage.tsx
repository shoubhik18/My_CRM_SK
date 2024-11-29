"use client";
import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import {
  CellClickedEvent,
  ColDef,
  SelectionChangedEvent,
} from "ag-grid-community";
import { useRef, useState, useEffect } from "react";
import { LeadeData } from "../component/Type";
import Loader from "../component/Loader";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import moment from "moment";
import { getCourses } from "@/lib/features/courses/coursesSlice";

const initialColumnDefs: ColDef[] = [
  {
    checkboxSelection: true,
    headerCheckboxSelection: true,
    field: "createdAt",
    headerName: "Created Time",
    minWidth: 250,
    maxWidth: 350,
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
  },
  {
    field: "createdAt",
    headerName: "Registered Date",
    minWidth: 190,
    maxWidth: 250,
    cellRenderer: (params: { data: any }) => {
      const data = params.data;
      return (
        <div className="flex items-center gap-2 capitalize ">
          {data?.BatchLead?.createdAt
            ? moment(data?.BatchLead?.createdAt).format("DD-MM-YYYY")
            : "-"}
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Name",
    minWidth: 190,
    maxWidth: 250,
  },
  {
    field: "phone",
    headerName: "Phone",
    minWidth: 190,
    maxWidth: 250,
  },
  {
    field: "email",
    headerName: "Email",
    minWidth: 190,
    maxWidth: 250,
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
    field: "stack",
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
    minWidth: 190,
    maxWidth: 250,
  },
  {
    field: "feePaid",
    headerName: "Fee Paid",
    minWidth: 215,
    maxWidth: 350,
  },
  {
    field: "dueAmount",
    headerName: "Due Amount",
    minWidth: 215,
    maxWidth: 350,
  },
  {
    field: "dueDate",
    headerName: "Due Date",
    minWidth: 200,
    maxWidth: 220,
    cellRenderer: (params: { data: any }) => {
      const data = params.data;
      return (
        <div className="flex items-center gap-2 capitalize ">
          {data?.startDate
            ? moment(data?.startDate).format("DD-MM-YYYY")
            : "-"}
        </div>
      );
    },
  },
];

const dummyData = [
  {
    batchName: "Az-900 Devops",
    trainer: "K. Pavan",
    batchStatus: "Upcoming",
    stage: "Orange",
    slot: "Morning",
    stack: "Agile Stack",
    startDate: new Date(),
    tentativeEndDate: new Date(),
    timings: "7:00 PM",
    noOfStudents: 30,
    Location: "Hyderabad",
  },
  {
    batchName: "Az-900 Devops",
    trainer: "K. Pavan",
    batchStatus: "Ongoing",
    stage: "Green",
    slot: "Evening",
    stack: "Ai Stack",
    startDate: new Date(),
    tentativeEndDate: new Date(),
    timings: "7:00 PM",
    noOfStudents: 30,
    Location: "Hyderabad",
  },
  {
    batchName: "Az-900 Devops",
    trainer: "K. Pavan",
    batchStatus: "Upcoming",
    stage: "Orange",
    slot: "Morning",
    stack: "App Stack",
    startDate: new Date(),
    tentativeEndDate: new Date(),
    timings: "7:00 PM",
    noOfStudents: 30,
    Location: "Hyderabad",
  }
]

const LearnerPage = () => {
  const dispatch = useAppDispatch();
  const tableRef = useRef<any>(null);
  const { CoursesData } = useAppSelector((state) => state?.courses);
  const [pagination, setPagination] = useState<number>(0);
  const { SingleBatch, isLoader } = useAppSelector((state) => state?.batch);
  console.log("🚀 ~ LearnerPage ~ SingleBatch:", SingleBatch)

  useEffect(() => {
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
      // handelOnSet(param?.rowIndex, [param?.data]);
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
    } else {
    }
  };

  return (
    <div className="lg:w-full">
      <div className="w-full px-3 gap-6 xl:h-full">
        <div
          className={`flex min-h-[62vh] xl:min-h-[70vh] xl:h-full w-${isLoader ? "[fit-content]" : "full"
            } mx-auto ag-theme-alpine`}
        >
          {isLoader ? (
            <Loader size={10} />
          ) : (
            <div
              className="relative overflow-auto"
              style={{ width: "100%" }}
            >
              <AgGridReact
                ref={tableRef}
                rowData={SingleBatch?.leads}
                // rowData={dummyData}
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
                overlayNoRowsTemplate={"Batch data no found"}
                onFirstDataRendered={onFirstDataRendered}
                paginationNumberFormatter={paginationNumberFormatter}
              />
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default LearnerPage;
