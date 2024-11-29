import { HostItem, PriorityItem } from "@/app/component/Type";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export const navigation = [
  // { name: "Dashboard", href: "/dashboard", current: true },
  { name: "Campaigns", href: "/campaign", current: false },
  { name: "Leads", href: "/leads", current: false },
  // { name: 'Leads', href: '/leads', current: false, children: [{ name: 'Create Lead' }] },
  {
    name: "Opportunities",
    href: "/opportunities",
    current: false,
    children: [
      { name: "Create Opportunity" },
      { name: "Visited" },
      { name: "Demo Attended" },
    ],
  },
  { name: "Learners", href: "/learner", current: false },
  { name: "Batches", href: "/batches", current: false },
  { name: "Trainers", href: "/trainers", current: false },
  // { name: "Courses", href: "/courses", current: false },
  // { name: "Ask AI", href: "/ask_aI", current: true },
  // { name: "Activities", href: "#", current: false },
  { name: "Tasks", href: "#", current: false },
  { name: "Analytics", href: "/analytics", current: false },
];

export const LeadSource = [
  "None",
  "Walk In",
  "Student Referral",
  "Demo",
  "WebSite",
  "Website Chat",
  "Inbound Call",
  "Google AdWords",
  "Facebook Ads",
  "Google My Business",
  "WhatsApp - Digital Edify",
];

export const LeadStatus = [
  "Not Contacted",
  "Attempted",
  "Warm Lead",
  "Cold Lead",
];

export const SlotStatus = [
  "Morning",
  "Evening",
];
// "Opportunity"

export const TechStack = ["Application Stack", "Platform Stack", "AI Data Stack"];

// 'VFX',
// 'AR & VR',
// 'UX Design',
// 'Interior Design',
// 'Fashion Design',
// 'Game Design & Art',
// 'Game Development',
// 'Digital Marketing'

// "Career Counselling",
//     "Business Stack",
//     "ServiceNow",
//     "DataStack",
//     "FullStack",
//     "Salesforce",
//     "Cloud Ops",

export const ClassMode = [
  "International Online",
  "India Online",
  "BLR ClassRoom",
  "HYD ClassRoom",
];
export const BatchStatusMode = [
  "Upcoming",
  "Ongoing",
  "On Hold",
  "Completed",
];
export const BatchTiming = [
  "7AM-8AM",
  "8AM-9AM",
  "9AM-10AM",
  "10AM-11AM",
  "11AM-12PM",
  "12PM-1PM",
  "1PM-2PM",
  "2PM-3PM",
  "3PM-4PM",
  "4PM-5PM",
  "5PM-6PM",
  "6PM-7PM",
  "7PM-8PM",
  "8PM-9PM",
];

export const Prioritydata: PriorityItem[] = [
  { lable: "High", value: "High" },
  { lable: "Low", value: "Low" },
  { lable: "Medium", value: "Medium" },
];

export const CampaignListView: HostItem[] = [
  { lable: "All Active Campaigns", value: "all_active_campaigns" },
  { lable: "My Active Campaigns", value: "my_active_campaigns" },
  { lable: "Recently Viewed Campaigns", value: "recently_viewed_campaigns" },
];
export const DealListView: HostItem[] = [
  { lable: "All Leads", value: "all_leads" },
  { lable: "My Leads", value: "my_leads" },
  { lable: "Today’s Leads", value: "todays_leads" },
  { lable: "Yesterday’s Leads", value: "yesterdays_leads" },
  { lable: "This Week Leads", value: "this_week_leads" },
  { lable: "This Month Leads", value: "this_month_leads" },
  { lable: "Last Month Leads", value: "lastmonth_leads" },
];
export const BatcheListView: HostItem[] = [
  { lable: "All Batches", value: "all_batches" },
  { lable: "My Batches", value: "my_batches" },
  { lable: "Today’s Batches", value: "todays_batches" },
  { lable: "Yesterday’s Batches", value: "yesterdays_batches" },
  { lable: "This Week Batches", value: "this_week_batches" },
  { lable: "This Month Batches", value: "this_month_batches" },
  { lable: "Last Month Batches", value: "lastmonth_batches" },
];
export const TrainerListView: HostItem[] = [
  { lable: "All Trainer", value: "all_trainer" },
  { lable: "My Trainer", value: "my_trainer" },
  { lable: "Today’s Trainer", value: "todays_trainer" },
  { lable: "Yesterday’s Trainer", value: "yesterdays_trainer" },
  { lable: "This Week Trainer", value: "this_week_trainer" },
  { lable: "This Month Trainer", value: "this_month_trainer" },
  { lable: "Last Month Trainer", value: "lastmonth_trainer" },
];
export const OpportunitiesListView: HostItem[] = [
  { lable: "All Opportunities", value: "all_opportunities" },
  { lable: "My Opportunities", value: "my_opportunities" },
  { lable: "Today’s Opportunities", value: "todays_opportunities" },
  { lable: "Yesterday’s Opportunities", value: "yesterdays_opportunities" },
  { lable: "This Week Opportunities", value: "this_week_opportunities" },
  { lable: "This Month Opportunities", value: "this_month_opportunities" },
  { lable: "Last Month Opportunities", value: "last_month_opportunities" },
];

export const LearnersListView: HostItem[] = [
  { lable: "All Learners", value: "all_learners" },
  { lable: "My Learners", value: "my_learners" },
  { lable: "Today’s Learners", value: "todays_learners" },
  { lable: "Yesterday’s Learners", value: "yesterdays_learners" },
  { lable: "This Week Learners", value: "this_week_learners" },
  { lable: "This Month Learners", value: "this_month_learners" },
  { lable: "Last Month Learners", value: "last_month_learners" },
];

export const CoursePageView: HostItem[] = [
  { lable: "Courses", value: "courses" },
];
export const UserPageView: HostItem[] = [
  { lable: "All User", value: "All User" },
];

export const UserRole: HostItem[] = [
  { lable: "Admin", value: "admin" },
  { lable: "Salesperson", value: "salesperson" },
  { lable: "Stakeholder", value: "stakeholder" },
  { lable: "Support", value: "support" },
  { lable: "Trainer", value: "trainer" },
];

export const OpportunityStage = [
  "None",
  "Advanced Discussion",
  "Ready To Join",
  "Visiting",
  "Fees Negotiation",
  "Batch Allocation",
  "Intersted in Demo",
  "Need Time This week",
  "Need Time Next Week",
  "Need Time This Month",
  "Needs Time Next Month",
  "Special Requirements",
  "Payment Link Sent",
  "Closed Won(Registered)",
  "Busy & Asked a call back",
  "Closed Lost",
];

export const DemoAttendedStage = [
  "None",
  "Ready to Join",
  "Advanced Discussion",
  "Call Not Answered",
  "Visiting",
  "Fees Negotiation",
  "Batch Allocation",
  "Need time this Week",
  "Need Time Next Week",
  "Need Time This Month",
  "Need Time Next Month",
  "Special Requirements",
  "Closed Won(Registered)",
  "Closed Lost(Cold Lead)",
];

export const VisitedStage = [
  "None",
  "Call Not Answered",
  "Ready To Join",
  "Fees Negotiation",
  "Batch Allocation",
  "Interested Demo",
  "Special Requirements",
  "Need Time This week",
  "Need Time Next Week",
  "Need Time This Month",
  "Need Time Next Month",
  "Closed Won(Registered)",
  "Closed Lost(Cold Lead)",
];

export const ColdLeadReason = [
  "None",
  "Invalid Number",
  "Not Interested",
  "Joined another institute",
  "Asking free course",
  "Pay after Placement",
];

export const OpportunityStatus = ["Visiting", "Visited", "Demo attended", "Lost Opportunity"];

export const EmailTypeData = [
  "Cold Leads Emails Template",
  "Business analyst Email Template",
  "Generic_Followup_Mail",
  "ServiceNow-Stage 1",
  "Testing - Stage 1",
  "Java - Stage 1",
  "React - Stage 1",
  "Angular - Stage 1",
  "Python - Stage 1",
];

// hooks
export const filterId = (selectedCell: any[]) => {
  return selectedCell
    ?.map((item: any) => {
      return item?.id;
    })
    ?.join();
};

export const dataFilter = (
  options: any[],
  searchValue: string = "",
  fields: string[] = []
) => {
  return options?.filter((option: any) => {
    // Check if any field in the option matches the search value
    return fields?.some((field: any) => {
      // Perform filtering logic for each field
      const fieldValue = option?.[field] || "";
      return fieldValue && fieldValue?.toString()?.toLowerCase()?.indexOf(searchValue?.toString()?.toLowerCase()) > -1;
    });
  });
};

export const extractFilename = (url: any) => {
  const pathname = new URL(url).pathname;
  // Extract filename from pathname
  const filename = pathname.substring(pathname.lastIndexOf("/") + 1);
  return decodeURIComponent(filename);
};

type Ref<T> = React.RefObject<T>;

type EventHandler = (event: MouseEvent | TouchEvent) => void;

export function useOnClickOutsideMultiple(
  refs: Ref<any>[],
  handler: EventHandler
): void {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Check if the event target is not contained in any of the refs
      if (
        refs.every(
          (ref) => !ref.current || !ref.current.contains(event.target as Node)
        )
      ) {
        handler(event);
      }
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [refs, handler]);
}

export const FilterLableAndValue = (datas: any) => {
  const data: HostItem[] = datas?.map((item: any) => {
    return { lable: item, value: item };
  });
  return data;
};

export const DateFormate = (data: string) => {
  if (data) {
    const date = new Date(data);
    const convertedDate = date.toISOString().split("T")[0];
    return convertedDate;
  }
  return "";
};

export const downloadExcel = (data: any[], name?: string) => {
  try {
    const worksheet = XLSX.utils.json_to_sheet(data);
    if (name === "Call Log") {
      worksheet["!cols"] = [
        { wch: 50 },
        { wch: 25 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
        { wch: 20 },
      ];
    }
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const file = new Blob([excelBuffer], { type: fileType });
    saveAs(file, `${name}.xlsx`);
  } catch (error) {
    console.error("Error generating Excel:", error);
  }
};

export const formatHour = (hour: number) => {
  if (hour === 0) {
    return "12am";
  } else if (hour === 12) {
    return "12pm";
  } else if (hour < 12) {
    return hour + "am";
  } else {
    return hour - 12 + "pm";
  }
};


interface WindowDimensions {
  width: number;
  height: number;
}

const getWindowDimensions = (): WindowDimensions => {
  if (typeof window !== 'undefined') {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  };
  return {
    width: 0,
    height: 0
  };
}


export const useWindowDimensions = (): WindowDimensions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;


export const convertDate = (dateString: any) => {
  // Create a new Date object from the input string
  const date = new Date(dateString);

  // Extract the date parts
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Format the date as required
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDate;
}

export const adjustTime = (dateString: any) => {
  // Parse the input date string into a Date object
  const date = new Date(dateString);

  // Adjust the time by adding 5.5 hours (19800 seconds)
  const adjustedTime = new Date(date.getTime());
  // const adjustedTime = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);

  // Return the adjusted time as a string or Date object
  return adjustedTime.toISOString(); // or use adjustedTime.toLocaleString() for a more readable format
};

// Time duration find
export const calculateDuration = (start: string, end: string) => {
  const [startHours, startMinutes] = start.split(':').map(Number);
  const [endHours, endMinutes] = end.split(':').map(Number);
  const startTime: any = new Date();
  startTime.setHours(startHours, startMinutes, 0);

  const endTime: any = new Date();
  endTime.setHours(endHours, endMinutes, 0);

  const diffMs = endTime - startTime; // Difference in milliseconds
  const diffMins = Math.floor(diffMs / 60000); // Difference in minutes

  const diffHrs = Math.floor(diffMins / 60); // Hours
  const remainingMins = diffMins % 60; // Remaining minutes

  // console.log(`${diffHrs} hours, ${remainingMins} minutes`);
  return `${diffHrs} h, ${remainingMins} min`
};



//create leade
export const createLeadForm: any = [
  {
    name: "name",
    lableValue: "Name",
    placeholder: "Name",
    typeValue: "text",
    type: "input",
  },
  {
    name: "leadStatus",
    lableValue: "Lead Status",
    data: FilterLableAndValue(LeadStatus),
    type: "select",
  },
  {
    name: "countryCode",
    lableValue: "CC",
    placeholder: "CC",
    typeValue: "text",
    type: "input",
  },
  {
    name: "leadSource",
    lableValue: "Lead Source",
    data: FilterLableAndValue(LeadSource),
    type: "select",
  },
  {
    name: "phone",
    lableValue: "Phone",
    placeholder: "Phone",
    typeValue: "text",
    type: "input",
  },
  {
    name: "techStack",
    lableValue: "Stack",
    data: FilterLableAndValue(TechStack),
    type: "select",
  },
  {
    name: "email",
    lableValue: "Email",
    placeholder: "Email",
    typeValue: "email",
    type: "input",
  },
  { name: "courseId", lableValue: "Course", type: "multiSelect" },
  {
    name: "feeQuoted",
    lableValue: "Fee Quoted",
    placeholder: "Fee Quoted",
    typeValue: "number",
    type: "input",
  },
  {
    name: "classMode",
    lableValue: "Class Mode",
    data: FilterLableAndValue(ClassMode),
    type: "select",
  },
  {
    name: "batchTiming",
    lableValue: "Batch Timing",
    data: FilterLableAndValue(BatchTiming),
    type: "multiSelect",
  },
  {
    name: "nextFollowUp",
    lableValue: "Next FollowUp",
    placeholder: "Next FollowUp",
    typeValue: "datetime-local",
    type: "input",
  },
];

//create Opportunity
export const createOpportunityForm: any = [
  {
    name: "name",
    lableValue: "Name",
    placeholder: "Name",
    typeValue: "text",
    type: "input",
  },
  {
    name: "opportunityStatus",
    lableValue: "Opportunity Status",
    data: FilterLableAndValue(OpportunityStatus),
    type: "select",
  },
  {
    name: "countryCode",
    lableValue: "CC",
    placeholder: "CC",
    typeValue: "text",
    type: "input",
  },
  {
    name: "opportunityStage",
    lableValue: "Opportunity Stage",
    data: FilterLableAndValue(OpportunityStage),
    type: "select",
  },
  {
    name: "phone",
    lableValue: "Phone",
    placeholder: "Phone",
    typeValue: "text",
    type: "input",
  },
  {
    name: "demoAttendedStage",
    lableValue: "Demo Attended Stage",
    data: FilterLableAndValue(DemoAttendedStage),
    type: "select",
  },
  {
    name: "email",
    lableValue: "Email",
    placeholder: "Email",
    typeValue: "email",
    type: "input",
  },
  {
    name: "visitedStage",
    lableValue: "Visited Stage",
    data: FilterLableAndValue(VisitedStage),
    type: "select",
  },
  {
    name: "feeQuoted",
    lableValue: "Fee Quoted",
    placeholder: "Fee Quoted",
    typeValue: "number",
    type: "input",
  },
  {
    name: "coldLeadReason",
    lableValue: "Lost Opportunity Reason",
    data: FilterLableAndValue(ColdLeadReason),
    type: "select",
  },
  {
    name: "batchTiming",
    lableValue: "Batch Timing",
    data: FilterLableAndValue(BatchTiming),
    type: "multiSelect",
  },
  {
    name: "nextFollowUp",
    lableValue: "Next FollowUp",
    placeholder: "Next FollowUp",
    typeValue: "datetime-local",
    type: "input",
  },
  {
    name: "leadStatus",
    lableValue: "Lead Status",
    data: FilterLableAndValue(LeadStatus),
    type: "select",
  },
  {
    name: "leadSource",
    lableValue: "Lead Source",
    data: FilterLableAndValue(LeadSource),
    type: "select",
  },
  {
    name: "techStack",
    lableValue: "Stack",
    data: FilterLableAndValue(TechStack),
    type: "select",
  },
  { name: "courseId", lableValue: "Course", type: "multiSelect" },
  {
    name: "classMode",
    lableValue: "Class Mode",
    data: FilterLableAndValue(ClassMode),
    type: "select",
  },
];

//Crate user
export const CreateUserFrom = [
  {
    name: "name",
    lableValue: "Name",
    placeholder: "Name",
    typeValue: "text",
    type: "input",
  },
  {
    name: "mobile",
    lableValue: "Mobile",
    placeholder: "Mobile",
    typeValue: "text",
    type: "input",
  },
  {
    name: "empCode",
    lableValue: "Employee Code",
    placeholder: "Employee Code",
    typeValue: "text",
    type: "input",
  },
  {
    name: "email",
    lableValue: "Email",
    placeholder: "Email",
    typeValue: "email",
    type: "input",
  },
  {
    name: "username",
    lableValue: "User name",
    placeholder: "User name",
    typeValue: "text",
    type: "input",
  },
  {
    name: "password",
    lableValue: "Password",
    placeholder: "Password",
    typeValue: "password",
    type: "input",
  },
  { name: "role", lableValue: "Role", data: UserRole, type: "select" },
  {
    name: "teleCMIAgentId",
    lableValue: "Tele CMI Agent Id",
    placeholder: "Tele CMI Agent Id",
    typeValue: "text",
    type: "input",
  },
  {
    name: "teleCMIPassword",
    lableValue: "Tele CMI Password",
    placeholder: "Tele CMI Password",
    typeValue: "password",
    type: "input",
  },
];


export const calendarLead: any = [
  {
    name: "name",
    lableValue: "Name",
  },
  {
    name: "leadStatus",
    lableValue: "Lead Status",
  },
  {
    name: "countryCode",
    lableValue: "CC",
  },
  {
    name: "leadSource",
    lableValue: "Lead Source",
  },
  {
    name: "phone",
    lableValue: "Phone",
  },
  {
    name: "leadStage",
    lableValue: "Lead Stage",
  },
  {
    name: "email",
    lableValue: "Email",
  },
  {
    name: "techStack",
    lableValue: "Stack",
  },
  { name: "Courses", lableValue: "Course" },
  {
    name: "feeQuoted",
    lableValue: "Fee Quoted",
  },
  {
    name: "classMode",
    lableValue: "Class Mode",
  },
  {
    name: "batchTiming",
    lableValue: "Batch Timing",
  },
  {
    name: "nextFollowUp",
    lableValue: "Next FollowUp",
  },
  {
    name: "techStack",
    lableValue: "Tech Stack",
  },

];

export const leadActiveFilter = [
  { key: "Not Contacted", value: "Not Contacted" },
  { key: "Attempted", value: "Attempted" },
  { key: "Warm Lead", value: "Warm Lead" },
  { key: "Cold Lead", value: "Cold Lead" },
]

export const OpportunityActiveFilter = [
  { key: "Visiting", value: "Visiting" },
  { key: "Visited", value: "Visited" },
  { key: "Demo attended", value: "Demo attended" },
  { key: "Lost Opportunity", value: "Lost Opportunity" },
]

export const BatchActiveFilter = [
  { key: "Upcoming", value: "Upcoming" },
  { key: "Ongoing", value: "Ongoing" },
  { key: "On Hold", value: "On Hold" },
  { key: "Completed", value: "Completed" },
]
export const LearnerActiveFilter = [
  { key: "Upcoming", value: "Upcoming" },
  { key: "Ongoing", value: "Ongoing" },
  { key: "On Hold", value: "On Hold" },
  { key: "Completed", value: "Completed" },
]
export const TrainerActiveFilter = [
  { key: "Upcoming", value: "Upcoming" },
  { key: "Ongoing", value: "Ongoing" },
  { key: "On Hold", value: "On Hold" },
  { key: "Completed", value: "Completed" },
]
export const CampaignActiveFilter = [
  // { key: "All Campaign", value: "all" },
  { key: "Upcoming", value: "Upcoming" },
  { key: "Ongoing", value: "Ongoing" },
  { key: "On Hold", value: "On Hold" },
  { key: "Completed", value: "Completed" },
]


//create leade
export const createBatchForm: any = [
  {
    name: "batchName",
    lableValue: "Batch Name",
    placeholder: "Batch Name",
    typeValue: "text",
    type: "input",
  },
  { name: "learnerIds", lableValue: "Learners", type: "multiSelect" },
  {
    name: "location",
    lableValue: "Location",
    data: FilterLableAndValue(LeadStatus),
    type: "select",
  },
  {
    name: "stack",
    lableValue: "Stack",
    data: FilterLableAndValue(TechStack),
    type: "select",
  },
  {
    name: "slot",
    lableValue: "Slot",
    data: FilterLableAndValue(SlotStatus),
    type: "select",
  },
  {
    name: "startDate",
    lableValue: "Start Date",
    placeholder: "Start Date",
    typeValue: "date",
    type: "input",
  },
  {
    name: "trainerId",
    lableValue: "Trainer",
    type: "select",
  },
  {
    name: "tentativeEndDate",
    lableValue: "Tentative End Date",
    placeholder: "Tentative End Date",
    typeValue: "date",
    type: "input",
  },
  {
    name: "batchStatus",
    lableValue: "Batch Status",
    data: FilterLableAndValue(BatchStatusMode),
    type: "select",
  },
  {
    name: "classMode",
    lableValue: "Class Mode",
    data: FilterLableAndValue(ClassMode),
    type: "select",
  },
  {
    name: "topicStatus",
    lableValue: "Topic Status",
    data: FilterLableAndValue(ClassMode),
    type: "select",
  },
  {
    name: "stage",
    lableValue: "Stage",
    data: FilterLableAndValue(ClassMode),
    type: "select",
  },
  {
    name: "noOfStudents",
    lableValue: "No of Students",
    placeholder: "No of Students",
    typeValue: "number",
    type: "input",
  },
  {
    name: "comment",
    lableValue: "Comment",
    placeholder: "Comment",
    typeValue: "text",
    type: "input",
  },
];


//create Trainer
export const createTrainerForm: any = [
  {
    name: "trainerName",
    lableValue: "Trainers Name",
    placeholder: "Trainers Name",
    typeValue: "text",
    type: "input",
  },
  {
    name: "trainerOwner",
    lableValue: "Trainers Owner",
    placeholder: "Trainers Owner",
    typeValue: "text",
    type: "input",
  },
  // {
  //   name: "trainerId",
  //   lableValue: "Trainer ID",
  //   type: "select",
  // },
  {
    name: "description",
    lableValue: "Description",
    placeholder: "Description",
    typeValue: "text",
    type: "input",
  },
  {
    name: "freeSlots",
    lableValue: "Free-Slots",
    placeholder: "Free-Slots",
    typeValue: "text",
    type: "input",
  },
  {
    name: "idProof",
    lableValue: "Id Proof",
    typeValue: "file",
    type: "input",
  },
  {
    name: "techStack",
    lableValue: "Tech Stack",
    data: FilterLableAndValue(TechStack),
    type: "select",
  },
  {
    name: "trainerStatus",
    lableValue: "Trainer Status",
    data: FilterLableAndValue(LeadStatus),
    type: "select",
  },
  {
    name: "phone",
    lableValue: "Phone",
    placeholder: "Phone",
    typeValue: "text",
    type: "input",
  },
  {
    name: "batches",
    lableValue: "Batches",
    data: FilterLableAndValue(LeadStatus),
    type: "select",
  },
  {
    name: "email",
    lableValue: "Email",
    placeholder: "Email",
    typeValue: "text",
    type: "input",
  },
  {
    name: "batchStage",
    lableValue: "Batch Stage",
    data: FilterLableAndValue(BatchStatusMode),
    type: "select",
  },
  {
    name: "location",
    lableValue: "Location",
    data: FilterLableAndValue(LeadStatus),
    type: "select",
  },
];


//create Campaign
export const createCampaignForm: any = [
  {
    name: "name",
    lableValue: "Campaign Name",
    placeholder: "Name",
    typeValue: "text",
    type: "input",
  },
  {
    name: "type",
    lableValue: "Campaign Type",
    placeholder: "",
    typeValue: "text",
    type: "input",
  },
  {
    name: "status",
    lableValue: "Campaign Status",
    data: FilterLableAndValue(BatchStatusMode),
    type: "select",
  },
  {
    name: "campaignDate",
    lableValue: "Campaign Date",
    placeholder: "Campaign Date",
    typeValue: "date",
    type: "input",
  },
  {
    name: "endDate",
    lableValue: "Campaign End Date",
    placeholder: "Campaign End Date",
    typeValue: "date",
    type: "input",
  },
];
//update Campaign
export const updateCampaignForm: any = [
  {
    name: "campaignOwner",
    lableValue: "Campaign Owner",
    placeholder: "Name",
    typeValue: "text",
    type: "input",
  },
  {
    name: "name",
    lableValue: "Campaign Name",
    placeholder: "Name",
    typeValue: "text",
    type: "input",
  },
  {
    name: "phone",
    lableValue: "Phone",
    placeholder: "Phone",
    typeValue: "text",
    type: "input",
  },
  {
    name: "courseName",
    lableValue: "Course Name",
    placeholder: "Course Name",
    typeValue: "text",
    type: "input",
  },
  {
    name: "active",
    lableValue: "Active",
    placeholder: "Active",
    typeValue: "text",
    type: "input",
  },
  {
    name: "type",
    lableValue: "Type",
    placeholder: "Type",
    typeValue: "text",
    type: "input",
  },
  {
    name: "status",
    lableValue: "Status",
    placeholder: "Status",
    typeValue: "text",
    type: "input",
  },
  {
    name: "startDate",
    lableValue: "Start Date",
    placeholder: "Start Date",
    typeValue: "date",
    type: "input",
  },
  {
    name: "endDate",
    lableValue: "End Date",
    placeholder: "End Date",
    typeValue: "date",
    type: "input",
  },
  {
    name: "amountSpentOnCampaign",
    lableValue: "Amount Spent On Campaign",
    placeholder: "Amount Spent On Campaign",
    typeValue: "text",
    type: "input",
  },
];


//create Learner
export const createLearnerForm: any = [
  {
    name: "firstName",
    lableValue: "First Name",
    placeholder: "First Name",
    typeValue: "text",
    type: "input",
  },
  {
    name: "lastName",
    lableValue: "Last Name",
    placeholder: "Last Name",
    typeValue: "text",
    type: "input",
  },
  {
    name: "idProof",
    lableValue: "Id Proof",
    placeholder: "Id Proof",
    typeValue: "text",
    type: "input",
  },
  {
    name: "phone",
    lableValue: "Phone",
    placeholder: "Phone",
    typeValue: "text",
    type: "input",
  },
  {
    name: "dateOfBirth",
    lableValue: "Date of Birth",
    placeholder: "Date of Birth",
    typeValue: "date",
    type: "input",
  },
  {
    name: "email",
    lableValue: "Email",
    placeholder: "Email",
    typeValue: "text",
    type: "input",
  },
  {
    name: "registeredDate",
    lableValue: "Registered Date",
    placeholder: "Registered Date",
    typeValue: "date",
    type: "input",
  },
  {
    name: "location",
    lableValue: "Location",
    data: FilterLableAndValue(OpportunityStage),
    type: "select",
  },
  {
    name: "batchIds",
    lableValue: "Batch ID's",
    placeholder: "Batch ID's",
    typeValue: "text",
    type: "input",
  },
  {
    name: "alternatePhone",
    lableValue: "Alternate phone",
    placeholder: "Alternate phone",
    typeValue: "text",
    type: "input",
  },
  {
    name: "description",
    lableValue: "Description",
    placeholder: "Description",
    typeValue: "text",
    type: "input",
  },
  {
    name: "exchangeRate",
    lableValue: "Exchange Rate",
    placeholder: "Exchange Rate",
    typeValue: "text",
    type: "input",
  },
  {
    name: "source",
    lableValue: "Source",
    placeholder: "Source",
    typeValue: "text",
    type: "input",
  },
  {
    name: "attendedDemo",
    lableValue: "Attended Demo",
    data: FilterLableAndValue(DemoAttendedStage),
    type: "select",
  },
  {
    name: "learnerOwner",
    lableValue: "Learner Owner",
    placeholder: "Learner Owner",
    typeValue: "number",
    type: "input",
  },
  {
    name: "learnerStage",
    lableValue: "Learner Stage",
    data: FilterLableAndValue(VisitedStage),
    type: "select",
  },
  {
    name: "currency",
    lableValue: "Currency",
    placeholder: "Currency",
    typeValue: "text",
    type: "input",
  },
  {
    name: "leadCreatedTime",
    lableValue: "Lead crated time",
    placeholder: "Lead crated time",
    typeValue: "datetime-local",
    type: "input",
  },
  {
    name: "counselingDoneBy",
    lableValue: "Counseling Done BY",
    placeholder: "Counseling Done BY",
    typeValue: "number",
    type: "input",
  },
];
export const createLearnerCourseDetails: any = [
  {
    name: "courseId",
    lableValue: "Registered Course",
    placeholder: "Registered Course",
    typeValue: "number",
    type: "input",
  },
  {
    name: "preferableTime",
    lableValue: "Preferable Time",
    placeholder: "Preferable Time",
    typeValue: "datetime-local",
    type: "input",
  },
  {
    name: "techStack",
    lableValue: "Tech Stack",
    placeholder: "Tech Stack",
    typeValue: "text",
    type: "input",
  },
  {
    name: "batchTiming",
    lableValue: "Batch Timing",
    placeholder: "Batch Timing",
    typeValue: "datetime-local",
    type: "input",
  },
  {
    name: "courseComments",
    lableValue: "Course Comments",
    placeholder: "Course Comments",
    typeValue: "text",
    type: "input",
  },
  {
    name: "modeOfClass",
    lableValue: "Mode Of Class",
    placeholder: "Mode Of Class",
    typeValue: "text",
    type: "input",
  },
  {
    name: "slackAccess",
    lableValue: "Slack Access",
    placeholder: "Slack Access",
    typeValue: "text",
    type: "input",
  },
  {
    name: "comment",
    lableValue: "Comment",
    placeholder: "Comment",
    typeValue: "text",
    type: "input",
  },
  {
    name: "lmsAccess",
    lableValue: "LMS Access",
    placeholder: "LMS Access",
    typeValue: "text",
    type: "input",
  },
]


export const createLearnerTrainerForm: any = [
  {
    name: "trainerName",
    lableValue: "Trainer Name",
    placeholder: "Trainer Name",
    typeValue: "text",
    type: "input",
  },
  {
    name: "idProof",
    lableValue: "Id Proof",
    typeValue: "file",
    type: "input",
  },
  {
    name: "phone",
    lableValue: "Phone",
    placeholder: "Phone",
    typeValue: "text",
    type: "input",
  },
  {
    name: "dateofBirth",
    lableValue: "Date of Birth",
    placeholder: "Date of Birth",
    typeValue: "date",
    type: "input",
  },
  {
    name: "email",
    lableValue: "Email",
    placeholder: "Email",
    typeValue: "text",
    type: "input",
  },
  {
    name: "registeredDate",
    lableValue: "Registered Date",
    placeholder: "Registered Date",
    typeValue: "date",
    type: "input",
  },
  {
    name: "location",
    lableValue: "Location",
    data: FilterLableAndValue(OpportunityStage),
    type: "select",
  },
  {
    name: "batchId",
    lableValue: "Batch ID's",
    placeholder: "Batch ID's",
    typeValue: "text",
    type: "input",
  },
  {
    name: "alternatePhone",
    lableValue: "Alternate phone",
    placeholder: "Alternate phone",
    typeValue: "text",
    type: "input",
  },
  {
    name: "description",
    lableValue: "Description",
    placeholder: "Description",
    typeValue: "text",
    type: "input",
  },
  {
    name: "source",
    lableValue: "Source",
    placeholder: "Source",
    typeValue: "text",
    type: "input",
  },
  {
    name: "exchangeRate",
    lableValue: "Exchange Rate",
    placeholder: "Exchange Rate",
    typeValue: "text",
    type: "input",
  },
  {
    name: "Attended Demo",
    lableValue: "Attended Demo",
    data: FilterLableAndValue(DemoAttendedStage),
    type: "select",
  },
  {
    name: "learnerOwner",
    lableValue: "Learner Owner",
    placeholder: "Learner Owner",
    typeValue: "text",
    type: "input",
  },
  {
    name: "visitedStage",
    lableValue: "Visited Stage",
    data: FilterLableAndValue(VisitedStage),
    type: "select",
  },
  {
    name: "currency",
    lableValue: "Currency",
    placeholder: "Currency",
    typeValue: "text",
    type: "input",
  },
  {
    name: "leadCratedTime",
    lableValue: "Lead crated time",
    placeholder: "Lead crated time",
    typeValue: "datetime-local",
    type: "input",
  },
  {
    name: "counselingDoneBY",
    lableValue: "Counseling Done BY",
    placeholder: "Counseling Done BY",
    typeValue: "text",
    type: "input",
  },
  {
    name: "walkinDate",
    lableValue: "Walkin Date",
    placeholder: "Walkin Date",
    typeValue: "datetime-local",
    type: "input",
  },
];
export const createLearnerCoursesForm: any = [
  {
    name: "registeredCourse",
    lableValue: "Registered Course",
    placeholder: "Registered Course",
    typeValue: "text",
    type: "input",
  },
  {
    name: "preferableTime",
    lableValue: "Preferable Time",
    placeholder: "Preferable Time",
    typeValue: "datetime-local",
    type: "input",
  },
  {
    name: "techStackAI",
    lableValue: "Tech Stack AI",
    data: FilterLableAndValue(OpportunityStage),
    type: "select",
  },
  {
    name: "batchTiming",
    lableValue: "Batch Timing",
    placeholder: "Batch Timing",
    typeValue: "datetime-local",
    type: "input",
  },
  {
    name: "courseComments",
    lableValue: "Course Comments",
    placeholder: "Course Comments",
    typeValue: "text",
    type: "input",
  },
  {
    name: "modeOfClass",
    lableValue: "Mode Of Class",
    data: FilterLableAndValue(OpportunityStage),
    type: "select",
  },
  {
    name: "slackAccess",
    lableValue: "Slack Access",
    data: FilterLableAndValue(OpportunityStage),
    type: "select",
  },
  {
    name: "comment",
    lableValue: "Comment",
    placeholder: "Comment",
    typeValue: "text",
    type: "input",
  },
  {
    name: "lmsAccess",
    lableValue: "LMS Access",
    placeholder: "LMS Access",
    typeValue: "text",
    type: "input",
  },
];