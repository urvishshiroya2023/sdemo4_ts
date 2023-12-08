// import { useCallback, useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Footer from "./Footer";
// import HomePageHeader from "./HomePageHeader";
// import LeadsData from "./LeadsData";
// import LeadsHeader from "./LeadsHeader";
// import Leadsform from "./Leadsform";
// import Loader from "./Loader";
// import { fetchLeadById, fetchLeads, selectLeads } from "./Redux/leadSlice";

// const initialValues = {
//     id: '',
//     contactName: '',
//     title: '',
//     email: '',
//     contactNumber: '',
//     budget: '',
//     notes: '',
//     leadsNewCategory: '',
//     leadCate2: '',
//     leadsCategory: '',
//     bhargav: '',
//     skills: '',
// };

// const Leads = () => {
//     const dispatch = useDispatch();
//     const { data, loading, error } = useSelector(selectLeads);
//     // console.log(data);
//     const [state, setState] = useState({
//         currentPage: 1,
//         leadsPerPage: 10,
//         searchTerm: "",
//         showLeadForm: false,
//         formMode: null,
//         formValues: initialValues,
//     });

//     useEffect(() => {
//         dispatch(fetchLeads());
//     }, [dispatch]);

//     const handleSearchChange = useCallback((event) => {
//         setState(prevState => ({ ...prevState, searchTerm: event.target.value.toLowerCase() }));
//     }, []);

//     const handleCloseForm = useCallback((e) => {
//         if (e.target.classList.contains("overlay")) {
//             setState(prevState => ({
//                 ...prevState,
//                 showLeadForm: false,
//                 formValues: initialValues,
//                 formMode: null,
//             }));
//         }
//     }, []);

//     const handleEdit = useCallback(async (leadId) => {
//         try {
//             await dispatch(fetchLeadById(leadId));
//             setState(prevState => ({
//                 ...prevState,
//                 showLeadForm: true,
//                 formMode: "edit",
//                 formValues: data.data.find(lead => lead.id === leadId) || initialValues,
//             }));
//         } catch (error) {
//             console.error("Error fetching lead details for editing:", error);
//         }
//     }, [dispatch, data]);

//     const filteredLeads = useMemo(() => {
//         return data?.filter((lead) =>
//             lead.title.toLowerCase().includes(state.searchTerm) ||
//             (lead?.contactData?.firstName + " " + lead?.contactData?.lastName)
//                 .toLowerCase()
//                 .includes(state.searchTerm)
//         );
//     }, [data, state.searchTerm]);

//     // console.log(filteredLeads);
//     const totalLeads = filteredLeads?.length || 0;
//     const totalPages = Math.ceil(totalLeads / state.leadsPerPage);

//     const calculateButtonRange = useCallback(() => {
//         const maxVisibleButtons = 10;
//         const leftOffset = Math.max(0, state.currentPage - Math.floor(maxVisibleButtons / 2));
//         const rightOffset = Math.min(totalPages - maxVisibleButtons, leftOffset > 0 ? state.currentPage - leftOffset : 0);
//         const startPage = 1 + leftOffset;
//         const endPage = Math.min(totalPages, maxVisibleButtons + startPage);
//         return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
//     }, [state.currentPage, totalPages]);

//     const buttonRange = useMemo(() => calculateButtonRange(), [calculateButtonRange]);

//     const changePage = useCallback((newPage) => {
//         if (newPage >= 1 && newPage <= totalPages) {
//             setState(prevState => ({ ...prevState, currentPage: newPage }));
//         }
//     }, [totalPages]);

//     return (
//         <div className="bg-[#e5e7eb] bg-opacity-50 h-full min-h-screen">
//             <div>
//                 <HomePageHeader />
//             </div>
//             <div className="mt-5">
//                 <LeadsHeader totalLeads={totalLeads} />
//             </div>
//             <div>
//                 <div className="flex py-5 h-full justify-center">
//                     <div className="container border bg-white rounded-lg p-5">
//                         <h1 className="font-semibold text-lg">Leads ({totalLeads})</h1>
//                         <div className="mt-3">
//                             <div className="flex justify-between">
//                                 <div className="flex items-center border border-gray-300 focus-within:border-indigo-600 focus-within:border-2 px-3 rounded-lg">
//                                     <div className="w-6 contents h-6">
//                                         <svg
//                                             stroke="currentColor"
//                                             fill="none"
//                                             viewBox="0 0 24 24"
//                                             aria-hidden="true"
//                                             className="text-lg"
//                                             height="1em"
//                                             width="1em"
//                                             xmlns="http://www.w3.org/2000/svg"
//                                         >
//                                             <path
//                                                 strokeLinecap="round"
//                                                 strokeLinejoin="round"
//                                                 d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//                                             ></path>
//                                         </svg>
//                                     </div>
//                                     <input
//                                         className="ms-2 h-9 focus:outline-none"
//                                         type="text"
//                                         placeholder="Search by title or name"
//                                         value={state.searchTerm}
//                                         onChange={handleSearchChange}
//                                     />
//                                 </div>
//                                 <div className="">
//                                     <button
//                                         className="border py-2 text-[#6B7280] text-sm font-semibold px-3 rounded mt-2"
//                                         onClick={() => setState(prevState => ({ ...prevState, showLeadForm: true }))}
//                                     >
//                                         Add New
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>

//                         {loading && <Loader />}
//                         {error && <p>Error: {error}</p>}
//                         {filteredLeads && filteredLeads.length > 0 ? (
//                             <table className="table-auto w-full mt-5 text-sm border-collapse">
//                                 <thead>
//                                     <tr className="text-[#6B7280] text-left uppercase border-b">
//                                         <th className="truncate p-3">Actions </th>
//                                         <th className="truncate p-3">Contact Name</th>
//                                         <th className="truncate p-3">title</th>
//                                         <th className="truncate p-3 ">lead cate 2</th>
//                                         <th className="truncate p-3">leads category</th>
//                                         <th className="truncate p-3">budget</th>
//                                         <th className="truncate p-3">status</th>
//                                         <th className="truncate p-3">Reason</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {filteredLeads?.slice((state.currentPage - 1) * state.leadsPerPage, state.currentPage * state.leadsPerPage)
//                                         .map((lead) => (
//                                             <LeadsData handleEdit={handleEdit} key={lead?.id} lead={lead} />
//                                         ))}
//                                 </tbody>
//                             </table>
//                         ) : (
//                             <div>No Leads Found</div>
//                         )}

//                         <div className="pagination mt-5 text-[#6B7280]">
//                             <button
//                                 className="mx-2"
//                                 onClick={() => changePage(state.currentPage - 1)}
//                                 disabled={state.currentPage === 1}
//                             >
//                                 &lsaquo;
//                             </button>
//                             {buttonRange.map((pageNumber) => (
//                                 <button
//                                     key={pageNumber}
//                                     onClick={() => changePage(pageNumber)}
//                                     className={`${pageNumber === state.currentPage
//                                         ? "active text-indigo-600 bg-indigo-50 py-1 px-3 rounded"
//                                         : ""
//                                         } mx-3`}
//                                 >
//                                     {pageNumber}
//                                 </button>
//                             ))}
//                             <button
//                                 className="mx-2"
//                                 onClick={() => changePage(state.currentPage + 1)}
//                                 disabled={state.currentPage === totalPages}
//                             >
//                                 &rsaquo;
//                             </button>
//                         </div>
//                     </div>

//                     {/* TaskForm overlay */}
//                     {state.showLeadForm && (
//                         <div
//                             onClick={handleCloseForm}
//                             className="fixed top-0 right-0 w-full  h-full bg-black bg-opacity-80 overlay"
//                         >
//                             <div className="w-1/2 overflow-y-scroll fixed bg-white h-full p-5  top-0 right-0">
//                                 <Leadsform
//                                     formValues={state.formValues}
//                                     formMode={state.formMode}
//                                     setShowLeadForm={(value) => setState(prevState => ({ ...prevState, showLeadForm: value }))}
//                                     onClose={() => setState(prevState => ({ ...prevState, showLeadForm: false }))}
//                                 />
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//             <div className=" ">
//                 <Footer />
//             </div>
//         </div>
//     );
// };

// export default Leads;


import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Footer from "./Footer";
import HomePageHeader from "./HomePageHeader";
import LeadsData from "./LeadsData";
import LeadsHeader from "./LeadsHeader";
import Leadsform from "./Leadsform";
import Loader from "./Loader";
import { contactData, fetchLeadById, fetchLeads, leadStatus, selectLeads, tags } from "./Redux/leadSlice";
import { useAppDispatch } from "./Redux/store";
import callApi from "./api";

interface leadsActivity{
    id: string;
    createdBy: string;
    status: string;
    createdDate: string;
    length:number
}
interface Lead {
    id: string;
    contactName: string;
    title: string;
    email: string;
    contactNumber: string;
    budget: string;
    notes: string;
    leadsNewCategory: string;
    leadCate2: string;
    leadsCategory: string;
    bhargav: string;
    skills: string;
    leadsActivity: leadsActivity[];
    reason: string
    tags: tags[];
    leadStatus: leadStatus;
    contactData: contactData;
}

export interface TagCategory{
    id: string;
    categoryName:string}

const initialValues: Lead = {
    id: "",
    contactName: "",
    title: "",
    email: "",
    contactNumber: "",
    budget: "",
    notes: "",
    leadsNewCategory: "",
    leadCate2: "",
    leadsCategory: "",
    bhargav: "",
    skills: "",
    leadsActivity: [],
    reason: "",
    tags: [],
    leadStatus: {
        statusName: "",
        colorCode: ""
    },
    contactData: {
        firstName: "",
        lastName: ""
    }
};

const Leads: React.FC = () => {
    // const dispatch = useDispatch();
    const dispatch = useAppDispatch();
    const { data, loading, error } = useSelector(selectLeads);

    const [state, setState] = useState({
        currentPage: 1,
        leadsPerPage: 10,
        searchTerm: "",
        showLeadForm: false,
        formMode: null as null | "edit",
        formValues: initialValues,
    });
    const [tagsCategories, setTagsCategories] = useState < TagCategory[] > ([]);

    console.log(tagsCategories);

    useEffect(() => {
        dispatch(fetchLeads());
    }, [dispatch]);

    useEffect(() => {
            const tagData = async () => {
                try {
                    //  Get masterId from crm/module
                    const moduleResponse = await callApi("GET", "crm/module", {
                        moduleName: "leads",
                    });

                    const contactItem = moduleResponse?.data?.find(
                        (item: { moduleName: string; }) => item.moduleName === "leads"
                    );
                    const leadId = contactItem ? contactItem.id : null;
                    // console.log("Contact ID:", leadId);
                    // console.log(moduleResponse.data);
                    const tagCategoryResponse = await callApi(
                        "GET",
                        `crm/tag-category/?masterId=${leadId}`
                    );
                    const tagCategories = tagCategoryResponse?.data;
                    setTagsCategories(tagCategories);
                    // console.log(tagCategories);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };

            tagData();
        }, []);

    const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setState((prevState) => ({ ...prevState, searchTerm: event.target.value.toLowerCase() }));
    }, []);

    const handleCloseForm = useCallback(
        (e: React.MouseEvent) => {
            if ((e.target as HTMLElement).classList.contains("overlay")) {
                setState((prevState) => ({
                    ...prevState,
                    showLeadForm: false,
                    formValues: initialValues,
                    formMode: null,
                }));
            }
        },
        []
    );

    const handleEdit = useCallback(
        async (leadId: string) => {
            try {
                await dispatch(fetchLeadById(leadId ));
                setState((prevState) => ({
                    ...prevState,
                    showLeadForm: true,
                    formMode: "edit",
                    // formValues: data.data.find((lead) => lead.id === leadId) || initialValues,
                    formValues: data?.find((lead: { id: string; }) => lead.id === leadId) || initialValues,
                    
                }));
               
            } catch (error) {
                console.error("Error fetching lead details for editing:", error);
            }
        },
        [dispatch, data]
    );

    const filteredLeads = useMemo(() => {
        return data?.filter(
            (lead) =>
                lead.title.toLowerCase().includes(state.searchTerm) ||
                (lead?.contactData?.firstName + " " + lead?.contactData?.lastName).toLowerCase().includes(state.searchTerm)
        );
    }, [data, state.searchTerm]);

    const totalLeads = filteredLeads?.length || 0;
    const totalPages = Math.ceil(totalLeads / state.leadsPerPage);

    const calculateButtonRange = useCallback(() => {
        const maxVisibleButtons = 10;
        const leftOffset = Math.max(0, state.currentPage - Math.floor(maxVisibleButtons / 2));
        const rightOffset = Math.min(
            totalPages - maxVisibleButtons,
            leftOffset > 0 ? state.currentPage - leftOffset : 0
        );
        const startPage = 1 + leftOffset;
        const endPage = Math.min(totalPages, maxVisibleButtons + startPage);
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage);
    }, [state.currentPage, totalPages]);

    const buttonRange = useMemo(() => calculateButtonRange(), [calculateButtonRange]);

    const changePage = useCallback(
        (newPage: number) => {
            if (newPage >= 1 && newPage <= totalPages) {
                setState((prevState) => ({ ...prevState, currentPage: newPage }));
            }
        },
        [totalPages]
    );

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
                                        value={state.searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <div className="">
                                    <button
                                        className="border py-2 text-[#6B7280] text-sm font-semibold px-3 rounded mt-2"
                                        onClick={() => setState(prevState => ({ ...prevState, showLeadForm: true }))}
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
                                        {
                                            tagsCategories.map((item) => (
                                                <th className="truncate p-3">{ item?.categoryName}</th>
                                            ))
                                        }
                                        {/* <th className="truncate p-3">hot</th>
                                        <th className="truncate p-3">leads new  category</th>
                                        <th className="truncate p-3 ">lead cate 2</th>
                                        <th className="truncate p-3 ">leads category</th> */}
                                        <th className="truncate p-3">budget</th>
                                        <th className="truncate p-3">status</th>
                                        <th className="truncate p-3">Reason</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeads?.slice((state.currentPage - 1) * state.leadsPerPage, state.currentPage * state.leadsPerPage)
                                        .map((lead) => (
                                            <LeadsData tagsCategories={tagsCategories} handleEdit={handleEdit} key={lead?.id} lead={lead} />
                                        ))}
                                </tbody>
                            </table>
                        ) : (
                            <div>No Leads Found</div>
                        )}

                        <div className="pagination mt-5 text-[#6B7280]">
                            <button
                                className="mx-2"
                                onClick={() => changePage(state.currentPage - 1)}
                                disabled={state.currentPage === 1}
                            >
                                &lsaquo;
                            </button>
                            {buttonRange.map((pageNumber) => (
                                <button
                                    key={pageNumber}
                                    onClick={() => changePage(pageNumber)}
                                    className={`${pageNumber === state.currentPage
                                        ? "active text-indigo-600 bg-indigo-50 py-1 px-3 rounded"
                                        : ""
                                        } mx-3`}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                            <button
                                className="mx-2"
                                onClick={() => changePage(state.currentPage + 1)}
                                disabled={state.currentPage === totalPages}
                            >
                                &rsaquo;
                            </button>
                        </div>
                    </div>

                    {/* TaskForm overlay */}
                    {state.showLeadForm && (
                        <div
                            onClick={handleCloseForm}
                            className="fixed top-0 right-0 w-full  h-full bg-black bg-opacity-80 overlay"
                        >
                            <div className="w-1/2 overflow-y-scroll fixed bg-white h-full p-5  top-0 right-0">
                                <Leadsform
                                    formValues={state.formValues}
                                    formMode={state.formMode}
                                    setShowLeadForm={(value:boolean) => setState(prevState => ({ ...prevState, showLeadForm: value }))}
                                    onClose={() => setState(prevState => ({ ...prevState, showLeadForm: false }))}
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
