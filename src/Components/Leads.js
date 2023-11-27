// import React from 'react'
// import HomePageHeader from './HomePageHeader'

// const Leads = () => {
//     return (
//         <div className="bg-[#e5e7eb] bg-opacity-50 h-full min-h-screen">
//             <div>
//                 <HomePageHeader />
//             </div>
//             <div>
//                 <div className="flex py-5 h-full justify-center">
//                     <div className="container border bg-white rounded-lg p-5">
//                         <div className="flex justify-between items-center">
//                             <h1>Leads</h1>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default Leads

// Leads.js
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import HomePageHeader from "./HomePageHeader";
import LeadsHeader from "./LeadsHeader";
import { fetchLeads, selectLeads } from "./Redux/leadSlice";

const Leads = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(selectLeads);
    // console.log(data?.data)

    useEffect(() => {
        // Dispatch the fetchLeads action when the component mounts
        dispatch(fetchLeads());
    }, [dispatch]);

    return (
        <div className="bg-[#e5e7eb] bg-opacity-50 h-full min-h-screen">
            <div>
                <HomePageHeader />
            </div>
            <div className="mt-5">
                <LeadsHeader />
            </div>

            <div>
                <div className="flex py-5 h-full justify-center">
                    <div className="container border bg-white rounded-lg p-5">
                        <div className="flex justify-between items-center">
                            <h1>Leads</h1>
                        </div>

                        {loading && <p>Loading...</p>}
                        {error && <p>Error: {error}</p>}
                        {data && (
                            <ul>
                                {data?.data?.map((lead) => (
                                    <li key={lead.id}>{lead.title}</li>
                                ))}
                            </ul>
                        )}



                    </div>
                </div>
            </div>
        </div>
    );
};

export default Leads;
