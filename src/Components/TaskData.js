// import React from 'react';

// const TaskData = ({ item }) => {
//     const formatDate = (dateString) => {
//         const options = { year: 'numeric', month: 'long', day: 'numeric' };
//         return new Date(dateString).toLocaleDateString(undefined, options);
//     };

//     return (
//         <div className='grid grid-cols-12 text-sm gap-x-2 border-b text-[#6B7280]'>
//             <div className='truncate p-3 '>Actions</div>
//             <div className='truncate p-3 '>{item.title ?? '-'}</div>
//             <div className='truncate p-3 '>{formatDate(item.dueDate) ?? '-'}</div>
//             <div className='truncate p-3 '>{item.priority ?? '-'}</div>
//             <div className='truncate p-3 '>{item?.module ?? '-'}</div>
//             <div className='truncate p-3 '>-</div>
//             <div className='truncate p-3 '>-</div>
//             <div className='truncate p-3 '>{item?.type ?? '-'}</div>
//             <div className='truncate p-3 '>
//                 {item?.assignedToData?.firstName && item?.assignedToData?.lastName
//                     ? `${item.assignedToData.firstName} ${item.assignedToData.lastName}`
//                     : '-'}
//             </div>


//             <div className='truncate p-3 '>{item?.leadModel?.title ?? '-'}</div>
//             <div className='truncate p-3 '>{item?.taskStatus?.statusName ?? '-'}</div>
//         </div>
//     );
// };

// export default TaskData;

import React from 'react';

const TaskData = ({ item }) => {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'low':
                return 'bg-green-100 text-green-600';
            case 'medium':
                return 'bg-orange-100 text-orange-600';
            case 'high':
                return 'bg-red-100 text-red-600';
            case 'none':
                return 'bg-gray-100 text-gray-600';
            default:
                return '';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-600';
            case 'task added dones':
                return 'bg-blue-100 text-blue-600';
            case 'completed':
                return 'bg-green-100 text-green-600';
            case 'Test Case Resolved':
                return 'bg-pink-100 text-pink-600';
            default:
                return '';
        }
    };


    const priorityColor = getPriorityColor(item.priority);
    const statusColor = getStatusColor(item?.taskStatus?.statusName);

    return (
        <div className='grid grid-cols-12 text-sm gap-x-2 border-b text-[#6B7280]'>
            <div className={`truncate p-3`}>Actions</div>
            <div className='truncate p-3 '>{item.title ?? '-'}</div>
            <div className='truncate p-3 '>{formatDate(item.dueDate) ?? '-'}</div>
            <div className='truncate p-3 capitalize'><span className={`${priorityColor} py-1 px-2 rounded-md text-xs font-semibold`}>{item.priority ?? '-'}</span></div>
            <div className='truncate p-3 '>{item?.module ?? '-'}</div>
            <div className='truncate p-3 '>-</div>
            <div className='truncate p-3 '>-</div>
            <div className='truncate p-3 '>{item?.type ?? '-'}</div>
            <div className='truncate p-3 '>
                {item?.assignedToData?.firstName && item?.assignedToData?.lastName
                    ? `${item.assignedToData.firstName} ${item.assignedToData.lastName}`
                    : '-'}
            </div>

            <div className='truncate p-3 '>{item?.leadModel?.title ?? '-'}</div>
            <div className='truncate p-3 '><span className={`${statusColor} py-1 px-2 rounded-md text-xs `}>{item?.taskStatus?.statusName ?? '-'}</span></div>
        </div>
    );
};

export default TaskData;









