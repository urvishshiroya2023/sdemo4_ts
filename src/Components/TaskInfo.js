// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import { getPriorityColor } from "./Constants";
// import HomePageHeader from "./HomePageHeader";
// import Loader from "./Loader";

// const TaskInfo = () => {
//   const { id } = useParams();
//   const [taskData, setTaskData] = useState(null);
//   const priorityColor = getPriorityColor(taskData?.priority);

//   const formatDate = (dateString) => {
//     const options = { year: "numeric", month: "long", day: "numeric" };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const authToken = localStorage.getItem("authToken");
//         const headers = {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${authToken}`,
//         };

//         const response = await axios.get(
//           `https://crmapi.sarvadhi.work/api/v1/crm/tasks/${id}`,
//           { headers }
//         );

//         setTaskData(response?.data?.data);
//         console.log(response?.data?.data);
//       } catch (error) {
//         console.error("Error fetching task data:", error);
//         // Handle error as needed
//       }
//     };

//     fetchData();
//   }, [id]);

//   // return (
//   //   <div className="bg-[#e5e7eb] bg-opacity-50 h-full min-h-screen">
//   //     <div>
//   //       <HomePageHeader />
//   //     </div>
//   //     <div className="flex mt-5 items-center justify-center">
//   //       <div className="container">
//   //         <div>
//   //           <h3 className="text-2xl">
//   //             <Link to="/taskdetail">
//   //               <span> &larr;</span>
//   //             </Link>
//   //             Task Details
//   //           </h3>
//   //         </div>
//   //         <div className="mt-5 bg-white p-5 border rounded-md">
//   //           {taskData ? (
//   //             <div className="grid grid-cols-5">
//   //               <div className={`text-[#6B7280] text-sm font-semibold `}>
//   //                 Priority :
//   //                 <span
//   //                   className={`font-light ml-2 py-1 px-2 rounded-md text-xs font-semibold ${priorityColor}`}
//   //                 >
//   //                   {taskData?.priority}
//   //                 </span>
//   //               </div>
//   //               <div className="text-[#6B7280] text-sm font-semibold">
//   //                 Status :
//   //                 <span className="font-light">
//   //                   {taskData?.taskStatus?.statusName}
//   //                 </span>
//   //               </div>
//   //               <div className="text-[#6B7280] text-sm font-semibold">
//   //                 Due Date
//   //                 <span className="font-light">
//   //                   {" "}
//   //                   : {formatDate(taskData?.dueDate)}
//   //                 </span>
//   //               </div>
//   //               <div className="text-[#6B7280] text-sm font-semibold">
//   //                 Title : <span className="font-light"> {taskData?.title}</span>
//   //               </div>
//   //               <div className="text-[#6B7280] text-sm font-semibold">
//   //                 Module :
//   //                 <span className="font-light"> {taskData?.module}</span>
//   //               </div>
//   //               <div className="text-[#6B7280] text-sm font-semibold">
//   //                 Type : <span className="font-light"> {taskData?.type}</span>
//   //               </div>
//   //             </div>
//   //           ) : (
//   //             <div className="h-full min-h-screen">
//   //               <Loader />
//   //             </div>
//   //           )}
//   //         </div>
//   //       </div>
//   //     </div>
//   //   </div>
//   // );

//   return (
//     <div className="bg-[#e5e7eb] bg-opacity-50 h-full min-h-screen">
//       <div>
//         <HomePageHeader />
//       </div>
//       <div className="flex mt-5 items-center justify-center">
//         <div className="container">
//           <div>
//             <h3 className="text-2xl">
//               <Link to="/taskdetail">
//                 <span> &larr;</span>
//               </Link>
//               Task Details
//             </h3>
//           </div>
//           <div className="mt-5 bg-white p-5 border rounded-md">
//             {taskData ? (
//               <div className="grid grid-cols-5">
//                 <div className={`text-[#6B7280] text-sm font-semibold `}>
//                   Priority :
//                   <span
//                     className={`font-light ml-2 py-1 px-2 rounded-md text-xs font-semibold ${priorityColor}`}
//                   >
//                     {taskData?.priority}
//                   </span>
//                 </div>
//                 <div className="text-[#6B7280] text-sm font-semibold">
//                   Status :
//                   <span className="font-light">
//                     {taskData?.taskStatus?.statusName}
//                   </span>
//                 </div>
//                 <div className="text-[#6B7280] text-sm font-semibold">
//                   Due Date
//                   <span className="font-light">
//                     : {formatDate(taskData?.dueDate)}
//                   </span>
//                 </div>
//                 <div className="text-[#6B7280] text-sm font-semibold">
//                   Title : <span className="font-light"> {taskData?.title}</span>
//                 </div>
//                 <div className="text-[#6B7280] text-sm font-semibold">
//                   Module :
//                   <span className="font-light"> {taskData?.module}</span>
//                 </div>
//                 <div className="text-[#6B7280] text-sm font-semibold">
//                   Type : <span className="font-light"> {taskData?.type}</span>
//                 </div>
//                 <div className="text-[#6B7280] text-sm font-semibold">
//                   Assigned To:
//                   <span className="font-light">
//                     {taskData?.assignedToData?.firstName}{" "}
//                     {taskData?.assignedToData?.lastName}
//                   </span>
//                 </div>
//                 <div className="text-[#6B7280] text-sm font-semibold">
//                   Connected Lead:
//                   <span className="font-light">
//                     {taskData?.leadModel?.title}
//                   </span>
//                 </div>
//                 <div className="text-[#6B7280] text-sm font-semibold">
//                   Notes:
//                   {taskData?.taskNotes.length > 0 ? (
//                     <ul>
//                       {taskData.taskNotes.map((note) => (
//                         <li key={note.id}>
//                           {note.notes} - {note.createdData?.firstName}{" "}
//                           {note.createdData?.lastName}
//                         </li>
//                       ))}
//                     </ul>
//                   ) : (
//                     <span className="font-light">No notes available.</span>
//                   )}
//                 </div>
//                 <div className="text-[#6B7280] text-sm font-semibold">
//                   ReactJS Tags:
//                   <span className="font-light">
//                     {/* Render your ReactJS tags data here */}
//                   </span>
//                 </div>
//                 <div className="text-[#6B7280] text-sm font-semibold">
//                   NodeJS Tags:
//                   <span className="font-light">
//                     {/* Render your NodeJS tags data here */}
//                   </span>
//                 </div>
//                 <div className="text-[#6B7280] text-sm font-semibold">
//                   Size:
//                   <span className="font-light">
//                     {
//                       taskData?.taskFields.find(
//                         (field) => field.name === "size"
//                       )?.value
//                     }
//                   </span>
//                 </div>
//                 <div className="text-[#6B7280] text-sm font-semibold">
//                   Date of Birth:
//                   <span className="font-light">
//                     {
//                       taskData?.taskFields.find(
//                         (field) => field.name === "date of birth"
//                       )?.value
//                     }
//                   </span>
//                 </div>
//               </div>
//             ) : (
//               <div className="h-full min-h-screen">
//                 <Loader />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskInfo;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPriorityColor } from "./Constants";
import HomePageHeader from "./HomePageHeader";
import Loader from "./Loader";

const TaskInfo = () => {
  const { id } = useParams();
  const [taskData, setTaskData] = useState(null);
  const priorityColor = getPriorityColor(taskData?.priority);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        };

        const response = await axios.get(
          `https://crmapi.sarvadhi.work/api/v1/crm/tasks/${id}`,
          { headers }
        );

        setTaskData(response?.data?.data);
        console.log(response?.data?.data);
      } catch (error) {
        console.error("Error fetching task data:", error);
        // Handle error as needed
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="bg-[#e5e7eb] bg-opacity-50 h-full min-h-screen">
      <div>
        <HomePageHeader />
      </div>
      <div className="flex mt-5 items-center justify-center">
        <div className="container">
          <div>
            <h3 className="text-2xl">
              <Link to="/taskdetail">
                <span> &larr;</span>
              </Link>
              Task Details
            </h3>
          </div>
          <div className="mt-5 bg-white p-5 border rounded-md">
            {taskData ? (
              <div className="grid grid-cols-5">
                <div className={`text-[#6B7280] text-sm font-semibold `}>
                  Priority :
                  <span
                    className={`font-light ml-2 py-1 px-2 rounded-md text-xs font-semibold ${priorityColor}`}
                  >
                    {taskData?.priority}
                  </span>
                </div>

                <div className="text-[#6B7280] text-sm font-semibold">
                  Status :
                  <span className="font-light">
                    {taskData?.taskStatus?.statusName}
                  </span>
                </div>

                <div className="text-[#6B7280] text-sm font-semibold">
                  Due Date
                  <span className="font-light">
                    : {formatDate(taskData?.dueDate)}
                  </span>
                </div>

                <div className="text-[#6B7280] text-sm font-semibold">
                  Title : <span className="font-light"> {taskData?.title}</span>
                </div>

                <div className="text-[#6B7280] text-sm font-semibold">
                  Module :
                  <span className="font-light"> {taskData?.module}</span>
                </div>

                <div className="text-[#6B7280] text-sm font-semibold">
                  Type : <span className="font-light"> {taskData?.type}</span>
                </div>

                {taskData?.assignedToData && (
                  <div className="text-[#6B7280] text-sm font-semibold">
                    Assigned To:
                    <span className="font-light">
                      {taskData.assignedToData.firstName}{" "}
                      {taskData.assignedToData.lastName}
                    </span>
                  </div>
                )}

                {taskData?.leadModel && (
                  <div className="text-[#6B7280] text-sm font-semibold">
                    Connected Lead:
                    <span className="font-light">
                      {taskData.leadModel.title}
                    </span>
                  </div>
                )}

                {taskData?.taskNotes.length > 0 ? (
                  <div className="text-[#6B7280] text-sm font-semibold">
                    Notes:
                    <ul>
                      {taskData.taskNotes.map((note) => (
                        <li key={note.id}>
                          {note.notes} - {note.createdData?.firstName}{" "}
                          {note.createdData?.lastName}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="text-[#6B7280] text-sm font-semibold">
                  ReactJS Tags:
                  <span className="font-light">
                    {/* Render your ReactJS tags data here */}
                  </span>
                </div>

                <div className="text-[#6B7280] text-sm font-semibold">
                  NodeJS Tags:
                  <span className="font-light">
                    {/* Render your NodeJS tags data here */}
                  </span>
                </div>

                <div className="text-[#6B7280] text-sm font-semibold">
                  Size:
                  <span className="font-light">
                    {
                      taskData?.taskFields.find(
                        (field) => field.name === "size"
                      )?.value
                    }
                  </span>
                </div>

                <div className="text-[#6B7280] text-sm font-semibold">
                  Date of Birth:
                  <span className="font-light">
                    {
                      taskData?.taskFields.find(
                        (field) => field.name === "date of birth"
                      )?.value
                    }
                  </span>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-screen">
                <Loader />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInfo;
