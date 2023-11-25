import React from 'react';
import { Link, useParams } from 'react-router-dom';
import HomePageHeader from './HomePageHeader';

const TaskInfo = () => {

    const { id } = useParams();

    console.log(id);
    return (
        <div>
            <div>
                <HomePageHeader />
            </div>
            <div className='flex mt-5 items-center justify-center'>
                <div className='container'>
                    <Link to={"/taskdetail"}>
                        <h6> &larr; Task Details</h6>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default TaskInfo