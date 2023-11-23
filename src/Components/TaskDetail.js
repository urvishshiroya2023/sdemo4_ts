// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import HomePageHeader from './HomePageHeader';
// import TaskData from './TaskData';
// import TaskForm from './TaskForm';

// const TaskDetail = () => {
//     const [tasks, setTasks] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const authToken = localStorage.getItem('authToken');

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://192.168.2.129:9500/api/v1/crm/tasks', {
//                 headers: {
//                     Authorization: `Bearer ${authToken}`,
//                 },
//             });
//             setTasks(response?.data);
//             console.log(response?.data);
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

//     return (
//         <div >
//             <div >
//                 <div>
//                     <HomePageHeader />
//                 </div>

//                 <div className='flex justify-center'>
//                     <div className='container'>
//                         <div >
//                             <TaskForm />
//                         </div>
//                         <div className='mt-3'>Task Details</div>
//                         <div className='mt-3'>
//                             {loading ? (
//                                 <div>Loading...</div>
//                             ) : (
//                                 <div>
//                                     {tasks.data ? (
//                                         <div>
//                                             <div>
//                                                 {tasks.data.map((item) => (
//                                                     // <li key={item.id}>{item.title}</li>
//                                                     <TaskData key={item.id} item={item} />
//                                                 ))}
//                                             </div>
//                                         </div>
//                                     ) : (
//                                         <div>No data available</div>
//                                     )}
//                                 </div>
//                             )}
//                         </div>
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

    // Calculate current tasks based on pagination
    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = tasks.data?.slice(indexOfFirstTask, indexOfLastTask);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                                {currentTasks && currentTasks.length > 0 ? (
                                    <div>
                                        <div>
                                            {currentTasks.map((item) => (
                                                <TaskData key={item.id} item={item} />
                                            ))}
                                        </div>
                                        <div className='pagination'>
                                            {Array.from({ length: Math.ceil(tasks.data.length / tasksPerPage) }, (_, i) => (
                                                <button key={i + 1} onClick={() => paginate(i + 1)}>
                                                    {i + 1}
                                                </button>
                                            ))}
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
