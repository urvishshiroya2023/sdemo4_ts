import React from 'react';

const TaskData = ({ item }) => {
    return (
        <div className='grid grid-cols-4 gap-4 my-2'>
            <div className='truncate'>{item.title}</div>
            <div className='truncate'>{item.dueDate}</div>
            <div className='truncate'>{item.priority}</div>
            <div className='truncate'>{item?.taskStatus?.statusName}</div>
        </div>
    );
};

export default TaskData;
