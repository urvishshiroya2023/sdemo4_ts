import React from 'react';

const TaskData = ({ item }) => {

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <div className='grid grid-cols-12 text-sm gap-x-2 border-b text-[#6B7280]'>
            <div className='truncate p-3 '>Actions</div>
            <div className='truncate p-3 '>{item.title}</div>
            <div className='truncate p-3 '>{formatDate(item.dueDate)}</div>
            <div className='truncate p-3 '>{item.priority}</div>
            <div className='truncate p-3 '>{item?.module}</div>
            <div className='truncate p-3 '>-</div>
            <div className='truncate p-3 '>-</div>
            <div className='truncate p-3 '>{item?.type}</div>
            <div className='truncate p-3 '>{item?.assignedToData?.firstName + " " + item?.assignedToData?.lastName}</div>
            <div className='truncate p-3 '>{item?.leadModel?.title}</div>
            <div className='truncate p-3 '>{item?.taskStatus?.statusName}</div>
        </div>
    );
};

export default TaskData;









