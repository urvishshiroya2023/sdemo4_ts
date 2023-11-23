import React from 'react';

const TaskData = ({ item }) => {

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };


    return (
        <div className='grid grid-cols-4 gap-4 my-2'>
            {/* <div className='truncate'>Actions</div>
            <div className='truncate'>{item.module}</div> */}
            <div className='truncate'>{item.title}</div>
            <div className='truncate'>{formatDate(item.dueDate)}</div>
            <div className='truncate'>{item.priority}</div>
            <div className='truncate'>{item?.taskStatus?.statusName}</div>
        </div>
    );
};

export default TaskData;
