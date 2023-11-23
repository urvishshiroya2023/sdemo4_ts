// import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
// import Side from './Side';

const Body = () => {

    // const [isLoading, setIsLoading] = useState(true);

    // useEffect(() => {
    //     const delay = setTimeout(() => {
    //         setIsLoading(false);
    //     }, 1000);

    //     return () => clearTimeout(delay);
    // }, []);

    return (
        // <div className="flex flex-auto flex-col h-[100vh]">
        //     <div className='grid lg:grid-cols-3 h-full'>
        //         <div className='hidden lg:block'>
        //             <Side />
        //         </div>
        //         <div className='col-span-2 flex flex-col justify-center items-center bg-white dark:bg-gray-800'>
        //             {/* <Outlet /> */}
        //             {isLoading ? (
        //                 <div className="loader">Loading...</div>
        //             ) : (
        //                 <Outlet />
        //             )}
        //         </div>
        //     </div>
        // </div>
        <div className="">
            <Outlet />
        </div>
    )
}

export default Body