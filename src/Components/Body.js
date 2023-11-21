import React from 'react'
import { Outlet } from 'react-router-dom'
import Side from './Side'

const Body = () => {
    return (
        <div className="  flex flex-auto flex-col h-[100vh]">
            <div className='grid lg:grid-cols-3 h-full'>
                <div className=''>
                    <Side />
                </div>
                <div className='col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Body