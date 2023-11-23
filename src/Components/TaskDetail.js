// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import HomePageHeader from './HomePageHeader';
// import TaskForm from './TaskForm';

// const TaskDetail = () => {
//     const [tasks, setTasks] = useState([]);
//     const authToken = localStorage.getItem('authToken');

//     const fetchData = async () => {
//         try {
//             const response = await axios.get('http://192.168.2.129:9500/api/v1/crm/tasks', {
//                 headers: {
//                     Authorization: `Bearer ${authToken}`,
//                 },
//             });
//             setTasks(response?.data);
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
//         <div>
//             <div>
//                 <HomePageHeader />
//             </div>
//             <div>
//                 <TaskForm />
//             </div>
//             <div>Task Detail</div>
//             <div>
//                 <div>
//                     {console.log(tasks?.data)}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default TaskDetail;


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import HomePageHeader from './HomePageHeader';
import TaskForm from './TaskForm';

const TaskDetail = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
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

    return (
        <div>
            <div>
                <HomePageHeader />
            </div>
            <div>
                <TaskForm />
            </div>
            <div>Task Detail</div>
            <div>
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <div>
                        {tasks.data ? (
                            <div>
                                <ul>
                                    {tasks.data.map((item) => (
                                        <li key={item.id}>{item.title}</li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div>No data available</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskDetail;
