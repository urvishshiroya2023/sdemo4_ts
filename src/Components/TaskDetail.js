import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import HomePageHeader from './HomePageHeader';
import TaskData from './TaskData';
import TaskForm from './TaskForm';

const initialValues = {
    module: '',
    type: '',
    title: '',
    dueDate: '',
    priority: '',
    assignedTo: '',
    connectedLead: '',
    descriptions: '',
    reactjsTags: [],
    nodejsTags: [],
    size: '',
    dob: '',
};


const TaskDetail = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10);
    const [searchTitle, setSearchTitle] = useState('');
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    const [formMode, setFormMode] = useState(null);

    const authToken = localStorage.getItem('authToken');

    const fetchData = async () => {
        try {
            const response = await axios.get('https://crmapi.sarvadhi.work/api/v1/crm/tasks', {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            setTasks(response?.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // const handleEdit = async (taskId) => {
    //     try {
    //         const response = await axios.get(`https://crmapi.sarvadhi.work/api/v1/crm/tasks/${taskId}`, {
    //             headers: {
    //                 Authorization: `Bearer ${authToken}`,
    //             },
    //         });


    //         const taskDetails = response?.data;
    //         console.log(taskDetails);



    //         setShowTaskForm(true);
    //     } catch (error) {
    //         console.error('Error fetching task details for editing:', error);
    //     }
    // };


    const handleEdit = async (taskId) => {
        try {
            const response = await axios.get(`https://crmapi.sarvadhi.work/api/v1/crm/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            const taskDetails = response?.data?.data;
            console.log('Task Details:', taskDetails);

            if (taskDetails) {
                // console.log('Module:', taskDetails.module);
                // console.log('Type:', taskDetails.type);

                setFormValues((prevValues) => ({
                    ...prevValues,
                    module: taskDetails.module || '',
                    type: taskDetails.type || '',
                    title: taskDetails.title || '',
                    dueDate: taskDetails.dueDate || '',
                    priority: taskDetails.priority || '',
                    assignedTo: taskDetails.assignedToData?.firstName || '',
                    connectedLead: taskDetails.connectedLead || '',
                    descriptions: taskDetails.descriptions || '',
                    Id: taskDetails.id
                }));
                setFormMode('edit');
            } else {
                console.log('Task details not found or undefined.');
            }

            setShowTaskForm(true);
        } catch (error) {
            console.error('Error fetching task details for editing:', error);
        }
    };



    const handleDelete = async (taskId) => {
        try {
            const response = await axios.delete(`https://crmapi.sarvadhi.work/api/v1/crm/tasks/${taskId}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });

            // Assuming response.data contains a success message or status
            const deleteStatus = response?.data;

            // Check the delete status and update the tasks accordingly
            if (deleteStatus === 'success') {
                // Filter out the deleted task from the tasks state
                setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
            }

            // You can also show a toast or notification for successful deletion
            toast.success('Task deleted successfully!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        } catch (error) {
            console.error('Error deleting task:', error);
            // Handle error, show toast, or notification for deletion failure
        }
    };

    useEffect(() => {
        if (authToken) {
            fetchData();
        } else {
            console.error('User not authenticated');
        }
    }, [authToken]);

    const totalTasks = tasks.data?.length;
    const totalPages = Math.ceil(totalTasks / tasksPerPage);
    const maxVisibleButtons = 10;

    const calculateButtonRange = () => {
        const leftOffset = Math.max(0, currentPage - Math.floor(maxVisibleButtons / 2));
        const rightOffset = Math.min(totalPages - maxVisibleButtons, leftOffset > 0 ? currentPage - leftOffset : 0);
        const startPage = 1 + leftOffset;
        const endPage = Math.min(totalPages, maxVisibleButtons + startPage);

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
    };

    const buttonRange = calculateButtonRange();

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handleCloseForm = (e) => {
        if (e.target.classList.contains('overlay')) {
            setShowTaskForm(false);
            setFormValues(initialValues); // Reset form values
            setFormMode(null);
        }
    };

    const handleSearchChange = (event) => {
        setSearchTitle(event.target.value);
    };

    const filteredTasks = tasks.data?.filter((task) =>
        task.title.toLowerCase().includes(searchTitle.toLowerCase())
    );

    return (
        <div className='bg-[#e5e7eb] bg-opacity-50 h-full min-h-screen'>
            <div>
                <HomePageHeader />
            </div>

            <div className='flex py-5 h-full justify-center'>
                <div className='container border bg-white rounded-lg p-5'>
                    <div className='flex justify-between items-center'>
                        <div className="">
                            <span className="flex items-center border border-gray-300 focus-within:border-indigo-600 focus-within:border-2 px-3 rounded-lg ">
                                <div className="w-6 contents h-6">
                                    <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" aria-hidden="true" className="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
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

                        <div className=''>
                            <button
                                className="border py-2 px-3 rounded mt-2"
                                formValues={formValues}
                                onClick={() => setShowTaskForm(true)}
                            >
                                Add New
                            </button>
                        </div>
                    </div>

                    <div className='mt-3'>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div>
                                <>
                                    <table className='table-auto w-full text-sm border-collapse'>
                                        <thead>
                                            <tr className='text-[#6B7280] text-left uppercase border-b'>
                                                <th className='truncate p-3'>Actions </th>
                                                <th className='truncate p-3'>Title</th>
                                                <th className='truncate p-3'>Due Date</th>
                                                <th className='truncate p-3 '>Priority</th>
                                                <th className='truncate p-3'>Module</th>
                                                <th className='truncate p-3'>ReactJs</th>
                                                <th className='truncate p-3'>NodeJs</th>
                                                <th className='truncate p-3'>Type</th>
                                                <th className='truncate p-3'>Assigned to</th>
                                                <th className='truncate p-3'>Connected Lead</th>
                                                <th className='truncate p-3'>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredTasks && filteredTasks.length > 0 ? (
                                                <>
                                                    <>
                                                        {filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage).map((item) => (
                                                            <TaskData handleEdit={handleEdit} handleDelete={handleDelete} key={item.id} item={item} />
                                                        ))}
                                                    </>

                                                </>
                                            ) : (
                                                <div>No data available</div>
                                            )}
                                        </tbody>
                                    </table>
                                    <div className='pagination mt-5 text-[#6B7280]'>
                                        <button className='mx-2' onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
                                            &lsaquo;
                                        </button>
                                        {buttonRange.map((pageNumber) => (
                                            <button
                                                key={pageNumber}
                                                onClick={() => changePage(pageNumber)}
                                                className={`${pageNumber === currentPage ? 'active text-indigo-600 bg-indigo-50 py-1 px-3 rounded' : ''
                                                    } mx-3`}
                                            >
                                                {pageNumber}
                                            </button>
                                        ))}
                                        <button className='mx-2' onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
                                            &rsaquo;
                                        </button>
                                    </div>
                                </>


                            </div>
                        )}
                    </div>

                    {/* TaskForm overlay */}
                    {showTaskForm && (
                        <div onClick={handleCloseForm} className="fixed top-0 right-0 w-full h-full bg-black bg-opacity-80 overlay">
                            <div className='w-1/2 fixed  top-0 right-0'>
                                <TaskForm formValues={formValues} formMode={formMode} onClose={() => setShowTaskForm(false)} />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;



