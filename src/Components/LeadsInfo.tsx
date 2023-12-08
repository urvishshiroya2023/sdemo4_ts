// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useParams } from 'react-router-dom';
// import HomePageHeader from './HomePageHeader';
// import Loader from './Loader';
// import { fetchLeadById, selectLeads } from './Redux/leadSlice';


// const TimeAgo = ({ createdDate }) => {
//     const [timeAgo, setTimeAgo] = useState('');

//     useEffect(() => {
//         const calculateTimeAgo = () => {
//             const currentDate = new Date();
//             const activityDate = new Date(createdDate);
//             const timeDifference = currentDate - activityDate;
//             const seconds = Math.floor(timeDifference / 1000);
//             const minutes = Math.floor(seconds / 60);
//             const hours = Math.floor(minutes / 60);

//             if (seconds < 60) {
//                 setTimeAgo(`${seconds} seconds ago`);
//             } else if (minutes < 60) {
//                 setTimeAgo(`${minutes} minutes ago`);
//             } else if (hours < 24) {
//                 setTimeAgo(`${hours} hours ago`);
//             } else {
//                 const days = Math.floor(hours / 24);
//                 setTimeAgo(`${days} days ago`);
//             }
//         };
//         calculateTimeAgo();
//     }, [createdDate]);

//     return <div className='text-xs font-light text-[#6B7280]'>{timeAgo}</div>;
// };

// const LeadsInfo = () => {
//     const { id } = useParams();
//     const dispatch = useDispatch();
//     const selectedLead = useSelector(selectLeads).selectLeads;
//     // console.log(selectedLead)

//     useEffect(() => {
//         dispatch(fetchLeadById(id));
//     }, [dispatch, id]);

//     return (
//         <div className="bg-[#e5e7eb] bg-opacity-50 h-full min-h-screen">
//             <div>
//                 <HomePageHeader />
//             </div>
//             <div className="flex mt-5 items-center justify-center">
//                 <div className="container">
//                     <div>
//                         <h3 className="text-2xl">
//                             <Link to="/leads">
//                                 <span> &larr;</span>
//                             </Link>
//                             Lead Details
//                         </h3>
//                     </div>
//                     <div className='mt-5'>
//                         {selectedLead ? (
//                             <>
//                                 <div className='flex gap-x-3 justify-between'>
//                                     <div className="grid grid-cols-4 gap-y-3 text-[#6B7280] text-sm font-semibold  bg-white w-3/4 p-5 border rounded-md">

//                                         {selectedLead?.title && (
//                                             <div >
//                                                 <div>Title:</div>
//                                                 <span className='text-black'>{selectedLead.title}</span>
//                                             </div>
//                                         )
//                                         }

//                                         {selectedLead?.budget && (
//                                             <div >
//                                                 <div>Budget:</div>
//                                                 <span className='text-black'>{selectedLead.budget}</span>
//                                             </div>
//                                         )
//                                         }

//                                         {selectedLead?.email && (
//                                             <div >
//                                                 <div>Email:</div>
//                                                 <span className='text-black'>{selectedLead.email}</span>
//                                             </div>
//                                         )
//                                         }

//                                         {selectedLead?.contactNumber && (
//                                             <div >
//                                                 <div>Contact Number:</div>
//                                                 <span className='text-black'>{selectedLead.contactNumber}</span>
//                                             </div>
//                                         )
//                                         }

//                                         {selectedLead?.leadStatus?.statusName && (
//                                             <div >
//                                                 <div>Status:</div>
//                                                 <span className='text-black'>{selectedLead?.leadStatus?.statusName}</span>
//                                             </div>
//                                         )
//                                         }

//                                     </div>
//                                     <div className='bg-white border w-1/4 p-5 rounded-md'>
//                                         <h1 className='font-semibold text-xl'>Lead Activity</h1>
//                                         {
//                                             selectedLead?.leadsActivity?.length > 0 ? (
//                                                 <div className='mt-2'>
//                                                     {selectedLead?.leadsActivity.map((activity) => (
//                                                         <div key={activity.index}>
//                                                             <div className='font-semibold text-md'>{activity.createdBy}</div>
//                                                             <div className='text-sm font-light text-[#6B7280]'>has change to Status to<span className='ml-2 py-1 px-2 bg-yellow-50 rounded-md font-semibold ' style={{ color: selectedLead.leadStatus.colorCode }}>{activity.status}</span> </div>
//                                                             <div className='text-sm font-light text-[#6B7280]'> <TimeAgo createdDate={activity.createdDate} /></div>
//                                                         </div>
//                                                     ))}
//                                                 </div>
//                                             ) : (<h3>No Activity Found</h3>)
//                                         }
//                                     </div>
//                                 </div>

//                                 <div>
//                                     <div></div>
//                                     <div></div>
//                                 </div>
//                             </>
//                         ) : (
//                             <div>
//                                 <Loader />
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LeadsInfo;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import HomePageHeader from './HomePageHeader';
import Loader from './Loader';
import { fetchLeadById, selectLeads } from './Redux/leadSlice';
import { useAppDispatch } from './Redux/store';

interface TimeAgoProps {
    createdDate: string;
}

const TimeAgo: React.FC<TimeAgoProps> = ({ createdDate }) => {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        const calculateTimeAgo = () => {
            const currentDate = new Date();
            const activityDate = new Date(createdDate);
            const timeDifference = currentDate.getTime() - activityDate.getTime();
            const seconds = Math.floor(timeDifference / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);

            if (seconds < 60) {
                setTimeAgo(`${seconds} seconds ago`);
            } else if (minutes < 60) {
                setTimeAgo(`${minutes} minutes ago`);
            } else if (hours < 24) {
                setTimeAgo(`${hours} hours ago`);
            } else {
                const days = Math.floor(hours / 24);
                setTimeAgo(`${days} days ago`);
            }
        };
        calculateTimeAgo();
    }, [createdDate]);

    return <div className='text-xs font-light text-[#6B7280]'>{timeAgo}</div>;
};

const LeadsInfo: React.FC = () => {
    const { id } = useParams < { id: string   } > ();
    // const dispatch = useDispatch();
    const dispatch = useAppDispatch();
    const selectedLead = useSelector(selectLeads).selectLeads;

    useEffect(() => {
        dispatch(fetchLeadById(id as string));
    }, [dispatch, id]);

    return (
        <div className="bg-[#e5e7eb] bg-opacity-50 h-full min-h-screen">
            <div>
                <HomePageHeader />
            </div>
            <div className="flex mt-5 items-center justify-center">
                <div className="container">
                    <div>
                        <h3 className="text-2xl">
                            <Link to="/leads">
                                <span> &larr;</span>
                            </Link>
                            Lead Details
                        </h3>
                    </div>
                    <div className='mt-5'>
                        {selectedLead ? (
                            <>
                                <div className='flex gap-x-3 justify-between'>
                                    <div className="grid grid-cols-4 gap-y-3 text-[#6B7280] text-sm font-semibold  bg-white w-3/4 p-5 border rounded-md">
                                        {selectedLead?.title && (
                                            <div>
                                                <div>Title:</div>
                                                <span className='text-black'>{selectedLead.title}</span>
                                            </div>
                                        )}
                                        {selectedLead?.budget && (
                                            <div>
                                                <div>Budget:</div>
                                                <span className='text-black'>{selectedLead.budget}</span>
                                            </div>
                                        )}
                                        {selectedLead?.email && (
                                            <div>
                                                <div>Email:</div>
                                                <span className='text-black'>{selectedLead.email}</span>
                                            </div>
                                        )}
                                        {selectedLead?.contactNumber && (
                                            <div>
                                                <div>Contact Number:</div>
                                                <span className='text-black'>{selectedLead.contactNumber}</span>
                                            </div>
                                        )}
                                        {selectedLead?.leadStatus?.statusName && (
                                            <div>
                                                <div>Status:</div>
                                                <span className='text-black'>{selectedLead?.leadStatus?.statusName}</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className='bg-white border w-1/4 p-5 rounded-md'>
                                        <h1 className='font-semibold text-xl'>Lead Activity</h1>
                                        {selectedLead?.leadsActivity?.length > 0 ? (
                                            <div className='mt-2'>
                                                {selectedLead?.leadsActivity.map((activity) => (
                                                    <div key={activity.index}>
                                                        <div className='font-semibold text-md'>{activity.createdBy}</div>
                                                        <div className='text-sm font-light text-[#6B7280]'>has change to Status to<span className='ml-2 py-1 px-2 bg-yellow-50 rounded-md font-semibold ' style={{ color: selectedLead.leadStatus.colorCode }}>{activity.status}</span> </div>
                                                        <div className='text-sm font-light text-[#6B7280]'> <TimeAgo createdDate={activity.createdDate} /></div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (<h3>No Activity Found</h3>)}
                                    </div>
                                </div>
                                <div>
                                    <div></div>
                                    <div></div>
                                </div>
                            </>
                        ) : (
                            <div>
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeadsInfo;
