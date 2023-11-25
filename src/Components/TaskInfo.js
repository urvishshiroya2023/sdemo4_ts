import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPriorityColor } from './Constants';
import HomePageHeader from './HomePageHeader';

const TaskInfo = () => {
    const { id } = useParams();
    const [taskData, setTaskData] = useState(null);

    const priorityColor = getPriorityColor(taskData?.priority);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const authToken = localStorage.getItem('authToken');
                const headers = {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                };

                const response = await axios.get(`https://crmapi.sarvadhi.work/api/v1/crm/tasks/${id}`, { headers });

                setTaskData(response?.data?.data);
            } catch (error) {
                console.error('Error fetching task data:', error);
                // Handle error as needed
            }
        };

        fetchData();
    }, [id]);

    return (
        <div className='bg-[#e5e7eb] bg-opacity-50 h-full min-h-screen'>
            <div>
                <HomePageHeader />
            </div>
            <div className='flex mt-5 items-center justify-center'>
                <div className='container'>
                    <div>


                        <Link to="/taskdetail">
                            <h3 className='text-2xl'> &larr; Task Details</h3>
                        </Link>
                    </div>
                    <div className='mt-5 bg-white p-5 border rounded-md'>
                        {taskData ? (
                            <div className='grid grid-cols-5'>
                                <div className={`text-[#6B7280] text-sm font-semibold `}>Priority : <span className='font-light'> {taskData?.priority}</span></div>
                                <div className='text-[#6B7280] text-sm font-semibold'>Status : <span className='font-light'> {taskData?.taskStatus?.statusName}</span></div>
                                <div className='text-[#6B7280] text-sm font-semibold'>Due Date <span className='font-light'> : {taskData?.dueDate}</span></div>
                                <div className='text-[#6B7280] text-sm font-semibold'>Title : <span className='font-light'> {taskData?.title}</span></div>
                                <div className='text-[#6B7280] text-sm font-semibold'>Module : <span className='font-light'> {taskData?.module}</span></div>
                                <div className='text-[#6B7280] text-sm font-semibold'>Type : <span className='font-light'> {taskData?.type}</span></div>

                            </div>
                        ) : (
                            <p>Loading task details...</p>
                        )}
                    </div>

                </div>


            </div>



        </div>
    );
};

export default TaskInfo;
