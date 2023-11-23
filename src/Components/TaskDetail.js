// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import HomePageHeader from './HomePageHeader';
// import TaskData from './TaskData';
// import TaskForm from './TaskForm';

// const TaskDetail = () => {
//     const [tasks, setTasks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [tasksPerPage] = useState(10);
//     const authToken = localStorage.getItem('authToken');

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://192.168.2.129:9500/api/v1/crm/tasks', {
//                 headers: {
//                     Authorization: `Bearer ${authToken}`,
//                 },
//             });
//             setTasks(response?.data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching data:', error);
//         }
//     };

//     useEffect(() => {
//         if (authToken) {
//             fetchData();
//         } else {
//             console.error('User not authenticated');
//         }
//     }, [authToken]);

//     // Calculate current tasks based on pagination
//     const indexOfLastTask = currentPage * tasksPerPage;
//     const indexOfFirstTask = indexOfLastTask - tasksPerPage;
//     const currentTasks = tasks.data?.slice(indexOfFirstTask, indexOfLastTask);

//     // Change page
//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <div>
//             <div>
//                 <HomePageHeader />
//             </div>

//             <div className='flex justify-center'>
//                 <div className='container'>
//                     <div>
//                         <TaskForm />
//                     </div>
//                     <div className='mt-3'>Task Details</div>
//                     <div className='mt-3'>
//                         {loading ? (
//                             <div>Loading...</div>
//                         ) : (
//                             <div>
//                                 {currentTasks && currentTasks.length > 0 ? (
//                                     <div>
//                                         <div>
//                                             {currentTasks.map((item) => (
//                                                 <TaskData key={item.id} item={item} />
//                                             ))}
//                                         </div>
//                                         <div className='pagination'>
//                                             {Array.from({ length: Math.ceil(tasks.data.length / tasksPerPage) }, (_, i) => (
//                                                 <button key={i + 1} onClick={() => paginate(i + 1)}>
//                                                     {i + 1}
//                                                 </button>
//                                             ))}
//                                         </div>
//                                     </div>
//                                 ) : (
//                                     <div>No data available</div>
//                                 )}
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TaskDetail;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HomePageHeader from './HomePageHeader';
import TaskData from './TaskData';
import TaskForm from './TaskForm';

const TaskDetail = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [tasksPerPage] = useState(10);
    const authToken = localStorage.getItem('authToken');

    const fetchData = async () => {
        try {
            const response = await axios.get('http://192.168.2.129:9500/api/v1/crm/tasks', {
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

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalTasks / tasksPerPage);

    // Calculate the maximum number of visible page number buttons
    const maxVisibleButtons = 10;

    // Calculate the range of visible page number buttons
    // const buttonRange = Array.from(
    //     { length: Math.min(totalPages, maxVisibleButtons) },
    //     (_, i) => i + 1 + Math.max(0, currentPage - Math.floor(maxVisibleButtons / 2))
    // );

    const calculateButtonRange = () => {
        const leftOffset = Math.max(0, currentPage - Math.floor(maxVisibleButtons / 2));
        const rightOffset = Math.min(totalPages - maxVisibleButtons, leftOffset > 0 ? currentPage - leftOffset : 0);
        const startPage = 1 + leftOffset;
        const endPage = Math.min(totalPages, maxVisibleButtons + startPage);

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
    };



    const buttonRange = calculateButtonRange();

    // Change page
    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div>
            <div>
                <HomePageHeader />
            </div>

            <div className='flex justify-center'>
                <div className='container'>
                    <div>
                        <TaskForm />
                    </div>
                    <div className='mt-3'>Task Details</div>
                    <div className='mt-3'>
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div>
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
