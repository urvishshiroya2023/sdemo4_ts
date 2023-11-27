// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import HomePageHeader from "./HomePageHeader";
// import LeadsHeader from "./LeadsHeader";
// import { fetchLeads, selectLeads } from "./Redux/leadSlice";

// const Leads = () => {
//     const dispatch = useDispatch();
//     const { data, loading, error } = useSelector(selectLeads);
//     // console.log(data?.data)

//     useEffect(() => {
//         // Dispatch the fetchLeads action when the component mounts
//         dispatch(fetchLeads());
//     }, [dispatch]);

//     return (
//         <div className="bg-[#e5e7eb] bg-opacity-50 h-full min-h-screen">
//             <div>
//                 <HomePageHeader />
//             </div>
//             <div className="mt-5">
//                 <LeadsHeader />
//             </div>

//             <div>
//                 <div className="flex py-5 h-full justify-center">
//                     <div className="container border bg-white rounded-lg p-5">
//                         <div className="flex justify-between items-center">
//                             <h1>Leads</h1>
//                         </div>

//                         {loading && <p>Loading...</p>}
//                         {error && <p>Error: {error}</p>}
//                         {data && (
//                             <ul>
//                                 {data?.data?.map((lead) => (
//                                     <li key={lead.id}>{lead.title}</li>
//                                 ))}
//                             </ul>
//                         )}



//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Leads;

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import HomePageHeader from "./HomePageHeader";
import LeadsData from "./LeadsData";
import LeadsHeader from "./LeadsHeader";
import Loader from "./Loader";
import { fetchLeads, selectLeads } from "./Redux/leadSlice";

const Leads = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(selectLeads);
    const [currentPage, setCurrentPage] = useState(1);
    const [leadsPerPage] = useState(10);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        // Dispatch the fetchLeads action when the component mounts
        dispatch(fetchLeads());
    }, [dispatch]);

    const handleSearchChange = (event) => {
        setSearchTitle(event.target.value);
    };

    const filteredLeads = data?.data?.filter((lead) =>
        lead.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
    // console.log(filteredLeads)

    const totalLeads = filteredLeads?.length || 0;
    const totalPages = Math.ceil(totalLeads / leadsPerPage);

    const calculateButtonRange = () => {
        const maxVisibleButtons = 10;
        const leftOffset = Math.max(0, currentPage - Math.floor(maxVisibleButtons / 2));
        const rightOffset = Math.min(totalPages - maxVisibleButtons, leftOffset > 0 ? currentPage - leftOffset : 0);
        const startPage = 1 + leftOffset;
        const endPage = Math.min(totalPages, maxVisibleButtons + startPage);

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
    };

    const buttonRange = calculateButtonRange();

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

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
                            {/* <h1>Leads</h1> */}
                            <div className="flex items-center border border-gray-300 focus-within:border-indigo-600 focus-within:border-2 px-3 rounded-lg">
                                <div className="w-6 contents h-6">
                                    <svg
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        className="text-lg"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        ></path>
                                    </svg>
                                </div>
                                <input
                                    className="ms-2 h-9 focus:outline-none"
                                    type="text"
                                    placeholder="Search by title"
                                    value={searchTitle}
                                    onChange={handleSearchChange}
                                />
                            </div>
                        </div>

                        {loading && <Loader />}
                        {error && <p>Error: {error}</p>}
                        {filteredLeads && filteredLeads.length > 0 ? (
                            <>
                                {/* <ul>
                                    {filteredLeads
                                        .slice((currentPage - 1) * leadsPerPage, currentPage * leadsPerPage)
                                        .map((lead) => (
                                            <LeadsData key={lead?.id} lead={lead} />
                                            // console.log(lead)
                                        ))}
                                </ul> */}
                                <table className="table-auto w-full mt-5 text-sm border-collapse">
                                    <thead>
                                        <tr className="text-[#6B7280] text-left uppercase border-b">
                                            <th className="truncate p-3">Actions </th>
                                            <th className="truncate p-3">Contact Name</th>
                                            <th className="truncate p-3">title</th>
                                            <th className="truncate p-3 ">lead cate 2</th>
                                            <th className="truncate p-3">leads category</th>
                                            <th className="truncate p-3">budget</th>
                                            <th className="truncate p-3">status</th>
                                            <th className="truncate p-3">Reason</th>
                                            {/* <th className="truncate p-3">Assigned to</th>
                                            <th className="truncate p-3">Connected Lead</th>
                                            <th className="truncate p-3">Status</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredLeads
                                            .slice((currentPage - 1) * leadsPerPage, currentPage * leadsPerPage)
                                            .map((lead) => (
                                                <LeadsData key={lead?.id} lead={lead} />
                                                // console.log(lead)
                                            ))}
                                    </tbody>
                                </table>

                                <div className="pagination mt-5 text-[#6B7280]">
                                    <button
                                        className="mx-2"
                                        onClick={() => changePage(currentPage - 1)}
                                        disabled={currentPage === 1}
                                    >
                                        &lsaquo;
                                    </button>
                                    {buttonRange.map((pageNumber) => (
                                        <button
                                            key={pageNumber}
                                            onClick={() => changePage(pageNumber)}
                                            className={`${pageNumber === currentPage
                                                ? "active text-indigo-600 bg-indigo-50 py-1 px-3 rounded"
                                                : ""
                                                } mx-3`}
                                        >
                                            {pageNumber}
                                        </button>
                                    ))}
                                    <button
                                        className="mx-2"
                                        onClick={() => changePage(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                    >
                                        &rsaquo;
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div>No Leads Found</div>
                        )}
                    </div>
                </div>
            </div>

            <div className=" ">
                <Footer />
            </div>
        </div>
    );
};

export default Leads;
