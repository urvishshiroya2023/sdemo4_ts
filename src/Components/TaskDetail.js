


import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import Footer from "./Footer";
import HomePageHeader from "./HomePageHeader";
import Loader from "./Loader";
import { deleteTask, fetchTaskById, fetchTasks, selectTasks } from "./Redux/tasksSlice";
import TaskData from "./TaskData";
import TaskForm from "./TaskForm";
import TasksHeader from "./TasksHeader";

const initialValues = {
  module: "",
  type: "",
  title: "",
  dueDate: "",
  priority: "",
  assignedTo: "",
  connectedLead: "",
  descriptions: "",
  reactjsTags: [],
  nodejsTags: [],
  size: "",
  dob: "",
};

const TaskDetail = () => {
  const dispatch = useDispatch();
  const { data: tasks, status, error } = useSelector(selectTasks);
  const selectedTask = useSelector((state) => state?.tasks?.selectedTask);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(10);
  const [searchTitle, setSearchTitle] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [formValues, setFormValues] = useState(initialValues);
  const [formMode, setFormMode] = useState(null);
  const [paginatedTasks, setPaginatedTasks] = useState([]);

  const authToken = localStorage.getItem("authToken");

  const handleCloseForm = useCallback((e) => {
    if (e.target.classList.contains("overlay")) {
      setShowTaskForm(false);
      setFormValues(initialValues); // Reset form values
      setFormMode(null);
    }
  }, [setShowTaskForm, setFormValues, setFormMode]);

  const handleDelete = useCallback(async (taskId) => {
    try {
      await dispatch(deleteTask(taskId));
      toast.success('Tasks deleted successfully');
      dispatch(fetchTasks());
    } catch (error) {
      console.error("Error deleting lead:", error);
      toast.error('Error deleting lead');
    }
  }, [dispatch]);

  const handleEdit = useCallback(async (taskId) => {
    try {
      await dispatch(fetchTaskById(taskId));
    } catch (error) {
      console.error("Error fetching task details for editing:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedTask) {
      console.log("Task Details:", selectedTask);
      setFormValues((prevValues) => ({
        ...prevValues,
        module: selectedTask.module || "",
        type: selectedTask.type || "",
        title: selectedTask.title || "",
        dueDate: selectedTask.dueDate || "",
        priority: selectedTask.priority || "",
        assignedTo: selectedTask.assignedToData?.firstName || "",
        connectedLead: selectedTask.connectedLead || "",
        descriptions: selectedTask.descriptions || "",
        Id: selectedTask.id,
      }));
      setFormMode("edit");
      setShowTaskForm(true);
    }
  }, [selectedTask, setFormValues, setFormMode, setShowTaskForm]);

  useEffect(() => {
    dispatch(fetchTasks()).then(() => setLoading(false));
  }, [dispatch]);

  const totalTasks = tasks?.length;
  const totalPages = Math.ceil(totalTasks / tasksPerPage);
  const maxVisibleButtons = 10;

  const calculateButtonRange = useCallback(() => {
    const leftOffset = Math.max(
      0,
      currentPage - Math.floor(maxVisibleButtons / 2)
    );
    const rightOffset = Math.min(
      totalPages - maxVisibleButtons,
      leftOffset > 0 ? currentPage - leftOffset : 0
    );
    const startPage = 1 + leftOffset;
    const endPage = Math.min(totalPages, maxVisibleButtons + startPage);

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => i + startPage
    );
  }, [currentPage, totalPages]);

  const buttonRange = useMemo(() => calculateButtonRange(), [calculateButtonRange]);

  const changePage = useCallback((newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  }, [setCurrentPage, totalPages]);

  const handleSearchChange = useCallback((event) => {
    setSearchTitle(event.target.value);
  }, [setSearchTitle]);

  const filteredTasks = useMemo(() => {
    return tasks?.filter((task) =>
      task?.title?.toLowerCase().includes(searchTitle.toLowerCase())
    );
  }, [tasks, searchTitle, currentPage]);

  const memoizedTaskForm = useMemo(() => (
    <div className="w-1/2 fixed h-full top-0 right-0">
      <TaskForm
        formValues={formValues}
        formMode={formMode}
        setShowTaskForm={setShowTaskForm}
        onClose={() => setShowTaskForm(false)}
      />
    </div>
  ), [formValues, formMode, setShowTaskForm]);

  return (
    <div className="bg-[#e5e7eb] bg-opacity-50 h-full min-h-screen">
      <div className="sticky top-0">
        <HomePageHeader />
      </div>

      <div className="mt-5">
        <TasksHeader />
      </div>

      <div className="flex py-5 h-full justify-center">
        <div className="container border bg-white rounded-lg p-5">
          <div className="flex justify-between items-center">
            <div className="">
              <span className="flex items-center border border-gray-300 focus-within:border-indigo-600 focus-within:border-2 px-3 rounded-lg ">
                <div className="w-6 contents h-6">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="text-lg"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    ></path>
                  </svg>
                </div>
                <input
                  className="ms-2 h-9 focus:outline-none"
                  type="text"
                  placeholder="Search by title"
                  value={searchTitle}
                  onChange={handleSearchChange}
                />
              </span>
            </div>

            <div className="">
              <button
                className="border py-2 text-[#6B7280] text-sm font-semibold px-3 rounded mt-2"
                formValues={formValues}
                onClick={() => setShowTaskForm(true)}
              >
                Add New
              </button>
            </div>
          </div>

          <div className="mt-3">
            {loading ? (
              <div className="h-full min-h-screen">
                <Loader />
              </div>
            ) : (
              <div>
                <>
                  <table className="table-auto w-full text-sm border-collapse">
                    <thead>
                      <tr className="text-[#6B7280] bg-gray-50 text-left uppercase border-b">
                        <th className="truncate p-3">Actions </th>
                        <th className="truncate p-3">Title</th>
                        <th className="truncate p-3">Due Date</th>
                        <th className="truncate p-3 ">Priority</th>
                        <th className="truncate p-3">Module</th>
                        <th className="truncate p-3">ReactJs</th>
                        <th className="truncate p-3">NodeJs</th>
                        <th className="truncate p-3">Type</th>
                        <th className="truncate p-3">Assigned to</th>
                        <th className="truncate p-3">Connected Lead</th>
                        <th className="truncate p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks && filteredTasks.length > 0 ? (
                        <>
                          {filteredTasks
                            .slice(
                              (currentPage - 1) * tasksPerPage,
                              currentPage * tasksPerPage
                            )
                            .map((item) => (
                              <TaskData
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                                key={item.id}
                                item={item}
                              />
                            ))}
                        </>
                      ) : (
                        <div>No Tasks Found</div>
                      )}
                    </tbody>
                  </table>
                  <div className="pagination mt-5 text-[#6B7280]">
                    <button
                      className="mx-2"
                      onClick={() => changePage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      &lsaquo;
                    </button>
                    {buttonRange.map((pageNumber) => (
                      <button
                        key={pageNumber}
                        onClick={() => changePage(pageNumber)}
                        className={`${pageNumber === currentPage
                          ? "active text-indigo-600 bg-indigo-50 py-1 px-3 rounded"
                          : ""
                          } mx-3`}
                      >
                        {pageNumber}
                      </button>
                    ))}
                    <button
                      className="mx-2"
                      onClick={() => changePage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      &rsaquo;
                    </button>
                  </div>
                </>
              </div>
            )}
          </div>

          {/* TaskForm overlay */}
          {showTaskForm && (
            <div
              onClick={handleCloseForm}
              className="fixed top-0 right-0 w-full h-full bg-black bg-opacity-80 overlay"
            >
              {memoizedTaskForm}
            </div>
          )}
        </div>
      </div>

      <div className=" ">
        <Footer />
      </div>
    </div>
  );
};

export default TaskDetail;
