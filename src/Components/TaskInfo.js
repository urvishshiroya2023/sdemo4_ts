import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getPriorityColor } from "./Constants";
import HomePageHeader from "./HomePageHeader";
import Loader from "./Loader";
import { fetchTaskById, selectTasks } from "./Redux/tasksSlice";

const TaskInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedTask = useSelector(selectTasks).selectedTask;

  // const [selectedTask, setselectedTask] = useState(null);
  const priorityColor = getPriorityColor(selectedTask?.priority);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const authToken = localStorage.getItem("authToken");
  //       const headers = {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${authToken}`,
  //       };

  //       const response = await axios.get(
  //         `https://crmapi.sarvadhi.work/api/v1/crm/tasks/${id}`,
  //         { headers }
  //       );

  //       setselectedTask(response?.data?.data);
  //       console.log(response?.data?.data);
  //     } catch (error) {
  //       console.error("Error fetching task data:", error);
  //       // Handle error as needed
  //     }
  //   };

  //   fetchData();
  // }, [id]);

  useEffect(() => {
    // Dispatch the fetchTaskById action when the component mounts
    dispatch(fetchTaskById(id));
  }, [dispatch, id]);


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
          <div className="mt-5">
            {selectedTask ? (
              <div className="">
                <div className="grid grid-cols-5 bg-white p-5 border rounded-md">
                  {selectedTask?.priority && (
                    <div className={`text-[#6B7280] text-sm font-semibold `}>
                      Priority:
                      <span
                        className={`font-light ml-2 py-1 px-2 rounded-md text-xs font-semibold ${priorityColor}`}
                      >
                        {selectedTask.priority}
                      </span>
                    </div>
                  )}

                  {selectedTask?.taskStatus && (
                    <div className="text-[#6B7280] text-sm font-semibold">
                      Status:
                      <span className="font-light">
                        {selectedTask.taskStatus.statusName}
                      </span>
                    </div>
                  )}

                  {selectedTask?.dueDate && (
                    <div className="text-[#6B7280] text-sm font-semibold">
                      Due Date:
                      <span className="font-light">
                        {formatDate(selectedTask.dueDate)}
                      </span>
                    </div>
                  )}

                  {selectedTask?.title && (
                    <div className="text-[#6B7280] text-sm font-semibold">
                      Title:
                      <span className="font-light"> {selectedTask.title}</span>
                    </div>
                  )}

                  {selectedTask?.module && (
                    <div className="text-[#6B7280] text-sm font-semibold">
                      Module:
                      <span className="font-light"> {selectedTask.module}</span>
                    </div>
                  )}

                  {selectedTask?.type && (
                    <div className="text-[#6B7280] text-sm font-semibold">
                      Type:
                      <span className="font-light"> {selectedTask.type}</span>
                    </div>
                  )}

                  {selectedTask?.assignedToData && (
                    <div className="text-[#6B7280] text-sm font-semibold">
                      Assigned To:
                      <span className="font-light">
                        {selectedTask.assignedToData.firstName}{" "}
                        {selectedTask.assignedToData.lastName}
                      </span>
                    </div>
                  )}

                  {selectedTask?.leadModel && (
                    <div className="text-[#6B7280] text-sm font-semibold">
                      Connected Lead:
                      <span className="font-light">
                        {selectedTask.leadModel.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* {selectedTask?.taskNotes.length > 0 ? ( */}
                <div className="grid grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
                  <div className="col-span-2 bg-white p-5 mt-5 border rounded-md">
                    <div className="text-[#6B7280] text-sm font-semibold">
                      <span className="text-2xl text-black">Notes</span>

                      {/* <ul className="mt-3 font-light">
                        {selectedTask.taskNotes.map((note) => (
                          <>
                            <li className="" key={note.id}>
                              {note.notes}
                              <span className="font-semibold ml-2">
                                {note.createdData?.firstName}{" "}
                                {note.createdData?.lastName}
                              </span>
                            </li>
                            <div className="mb-5">{note.createdAt}</div>
                          </>
                        ))}
                      </ul> */}

                      {selectedTask?.taskNotes.length > 0 ? (
                        <ul className="mt-3 font-light">
                          {selectedTask.taskNotes.map((note) => {
                            // Convert the date string to a Date object
                            const createdAtDate = new Date(note.createdAt);

                            // Format the date using Intl.DateTimeFormat
                            const formattedDate = new Intl.DateTimeFormat(
                              "en-US",
                              {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                                hour12: true,
                              }
                            ).format(createdAtDate);

                            return (
                              <>
                                <li className="" key={note.id}>
                                  {note.notes} -{" "}
                                  <span className="font-semibold">
                                    {note.createdData?.firstName}{" "}
                                    {note.createdData?.lastName}
                                  </span>
                                </li>
                                <div className="mb-5">{formattedDate}</div>
                              </>
                            );
                          })}
                        </ul>
                      ) : (
                        <p className="mt-3 flex text-center">No Notes Found.</p>
                      )}
                    </div>
                  </div>
                  <div className=" bg-white p-5 mt-5 border rounded-md">
                    <div>
                      <span className="text-2xl text-black">Task Activity</span>
                    </div>
                    <div>0</div>
                  </div>
                  <div></div>
                </div>
                {/* ) : null} */}

                {selectedTask?.ReactJSTags && (
                  <div className="text-[#6B7280] text-sm font-semibold">
                    ReactJS Tags:
                    <span className="font-light">
                      {selectedTask.ReactJSTags.map((tag) => (
                        // Render each ReactJS tag
                        <span key={tag.id}>{tag.name}</span>
                      ))}
                    </span>
                  </div>
                )}

                {selectedTask?.NodeJSTags && (
                  <div className="text-[#6B7280] text-sm font-semibold">
                    NodeJS Tags:
                    <span className="font-light">
                      {selectedTask.NodeJSTags.map((tag) => (
                        // Render each NodeJS tag
                        <span key={tag.id}>{tag.name}</span>
                      ))}
                    </span>
                  </div>
                )}

                {/* {selectedTask?.taskFields.find(
                  (field) => field.name === "size"
                ) && (
                  <div className="text-[#6B7280] text-sm font-semibold">
                    Size:
                    <span className="font-light">
                      {
                        selectedTask.taskFields.find(
                          (field) => field.name === "size"
                        ).value
                      }
                    </span>
                  </div>
                )}

                {selectedTask?.taskFields.find(
                  (field) => field.name === "date of birth"
                ) && (
                  <div className="text-[#6B7280] text-sm font-semibold">
                    Date of Birth:
                    <span className="font-light">
                      {
                        selectedTask.taskFields.find(
                          (field) => field.name === "date of birth"
                        ).value
                      }
                    </span>
                  </div>
                )} */}
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
