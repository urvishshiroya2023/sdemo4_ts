import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "./Footer";
import HomePageHeader from "./HomePageHeader";
import LeadsData from "./LeadsData";
import LeadsHeader from "./LeadsHeader";
import Leadsform from "./Leadsform";
import Loader from "./Loader";
import { fetchLeadById, fetchLeads, selectLeads } from "./Redux/leadSlice";

const initialValues = {
    id: '',
    contactName: '',
    title: '',
    email: '',
    contactNumber: '',
    budget: '',
    notes: '',
    leadsNewCategory: '',
    leadCate2: '',
    leadsCategory: '',
    bhargav: '',
    skills: '',
};


const Leads = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector(selectLeads);
    const [currentPage, setCurrentPage] = useState(1);
    const [leadsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [showLeadForm, setShowLeadForm] = useState(false);
    const [formMode, setFormMode] = useState(null);
    const [formValues, setFormValues] = useState(initialValues);
    // console.log(data.data);

    // console.log(fetchLeads);
    // console.log(selectLeads);

    useEffect(() => {
        // Dispatch the fetchLeads action when the component mounts
        dispatch(fetchLeads());
    }, [dispatch]);

    const handleSearchChange = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
    };

    const handleCloseForm = (e) => {
        if (e.target.classList.contains("overlay")) {
            setShowLeadForm(false);
            setFormValues(initialValues); // Reset form values
            setFormMode(null);
        }
    };

    // const handleEdit = useCallback(async (leadId) => {
    //     try {
    //         await dispatch(fetchLeadById(leadId));
    //         setShowLeadForm(true);
    //         setFormMode("edit")
    //     } catch (error) {
    //         console.error("Error fetching lead details for editing:", error);
    //     }
    // }, [dispatch]);

    const handleEdit = useCallback(async (leadId) => {
        try {
            await dispatch(fetchLeadById(leadId));
            setShowLeadForm(true);
            setFormMode("edit");
            setFormValues(data.data.find(lead => lead.id === leadId));
        } catch (error) {
            console.error("Error fetching lead details for editing:", error);
        }
    }, [dispatch, data]);


    const filteredLeads = data?.data?.filter((lead) =>
        lead.title.toLowerCase().includes(searchTerm) ||
        (lead?.contactData?.firstName + " " + lead?.contactData?.lastName)
            .toLowerCase()
            .includes(searchTerm)
    );


    const totalLeads = filteredLeads?.length || 0;
    const totalPages = Math.ceil(totalLeads / leadsPerPage);
    // const presentLeads = data?.data.length;


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
                <LeadsHeader totalLeads={totalLeads} />
            </div>

            <div>
                <div className="flex py-5 h-full justify-center">
                    <div className="container border bg-white rounded-lg p-5">
                        <h1 className="font-semibold text-lg">Leads ({totalLeads})</h1>
                        <div className="mt-3">
                            <div className="flex justify-between">
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
                                        placeholder="Search by title or name"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <div className="">
                                    <button
                                        className="border py-2 text-[#6B7280] text-sm font-semibold px-3 rounded mt-2"
                                        onClick={() => setShowLeadForm(true)}
                                    >
                                        Add New
                                    </button>
                                </div>
                            </div>
                        </div>

                        {loading && <Loader />}
                        {error && <p>Error: {error}</p>}
                        {filteredLeads && filteredLeads.length > 0 ? (

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
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeads
                                        .slice((currentPage - 1) * leadsPerPage, currentPage * leadsPerPage)
                                        .map((lead) => (
                                            <LeadsData handleEdit={handleEdit} key={lead?.id} lead={lead} />
                                        ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>No Leads Found</div>
                        )}

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
                    </div>

                    {/* TaskForm overlay */}
                    {showLeadForm && (
                        <div
                            onClick={handleCloseForm}
                            className="fixed top-0 right-0 w-full h-full bg-black bg-opacity-80 overlay"
                        >
                            <div className="w-1/2 fixed bg-white h-full p-5  top-0 right-0">
                                <Leadsform
                                    formValues={formValues}
                                    formMode={formMode}
                                    setShowLeadForm={setShowLeadForm}
                                    onClose={() => setShowLeadForm(false)}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className=" ">
                <Footer />
            </div>
        </div>
    );
};

export default Leads;