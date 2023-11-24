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
        <div className='bg-[#e5e7eb] bg-opacity-50  h-full min-h-screen'>
            <div>
                <HomePageHeader />
            </div>

            <div className='flex py-5 h-full justify-center'>
                <div className='container border bg-white rounded-lg p-5'>
                    <div className='flex justify-between items-center'>
                        {/* <div>Search</div> */}

                        {/* <div className="relative border focus:border-blue-300">
                            <span className="flex items-center">
                                <div className="w-6 h-6">
                                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" className="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                                <input className="ms-2 h-9 focus:outline-none" type="text" placeholder="Search by title" />
                            </span>
                        </div> */}

                        <div class="">
                            <span class="flex items-center border border-gray-300 focus-within:border-indigo-600 focus-within:border-2 px-3 rounded-lg ">
                                <div class="w-6 contents h-6">
                                    <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" class="text-lg" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                    </svg>
                                </div>
                                <input class="ms-2 h-9 focus:outline-none" type="text" placeholder="Search by title" />
                            </span>
                        </div>









                        <div className=''>
                            <Link to={"/addtask"}><button className='border py-2 px-3 rounded mt-2 '>Add New</button></Link>
                        </div>
                    </div>


                    <div className='mt-3'>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div>
                                <div>
                                    <div className='grid text-[12px] bg-[#e5e7eb] bg-opacity-25  p-3 font-semibold text-[#6B7280] uppercase grid-cols-12 gap-4 my-2'>
                                        <div className='truncate '>Action</div>
                                        <div className='truncate'>Title</div>
                                        <div className='truncate'>Due Date</div>
                                        <div className='truncate'>Priority</div>
                                        <div className='truncate'>Module</div>
                                        <div className='truncate'>ReactJs</div>
                                        <div className='truncate'>NodeJs</div>
                                        <div className='truncate'>Type</div>
                                        <div className='truncate'>Assigned to</div>
                                        <div className='truncate'>connected Lead</div>
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
