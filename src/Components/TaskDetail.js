import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HomePageHeader from './HomePageHeader';
import TaskData from './TaskData';

const TaskDetail = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10);
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

    return (
        <div className='bg-[#e5e7eb]  h-full'>
            <div>
                <HomePageHeader />
            </div>

            <div className='flex py-5 justify-center'>
                <div className='container bg-white rounded-md p-5'>
                    <div className=''>
                        <Link to={"/addtask"}><button className='bg-indigo-600 py-2 px-3 rounded mt-2 text-white'>Add New Task</button></Link>
                    </div>
                    <div className='mt-3'>Task Details</div>
                    <div className='mt-3'>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div>
                                <div>
                                    <div className='grid grid-cols-4 gap-4 my-2'>
                                        <div className='truncate'>Title</div>
                                        <div className='truncate'>Due Date</div>
                                        <div className='truncate'>Priority</div>
                                        <div className='truncate'>Status</div>
                                    </div>
                                </div>
                                {tasks.data && tasks.data.length > 0 ? (
                                    <div>
                                        <div>
                                            {tasks.data.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage).map((item) => (
                                                <TaskData key={item.id} item={item} />
                                            ))}
                                        </div>
                                        <div className='pagination'>
                                            <button className='mx-2' onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
                                                Previous
                                            </button>
                                            {buttonRange.map((pageNumber) => (
                                                <button
                                                    key={pageNumber}
                                                    onClick={() => changePage(pageNumber)}
                                                    className={`${pageNumber === currentPage ? 'active bg-red-300 p-1 rounded' : ''
                                                        } mx-2`}
                                                >
                                                    {pageNumber}
                                                </button>
                                            ))}
                                            <button className='mx-2' onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div>No data available</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskDetail;
