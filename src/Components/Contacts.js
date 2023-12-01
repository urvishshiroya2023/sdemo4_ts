// import React from 'react';
// import { useSelector } from 'react-redux';
// import ContactData from './ContactData';
// import HomePageHeader from './HomePageHeader';
// import { selectContacts } from './Redux/contactSlice';

// const Contacts = () => {
//     const { data: contacts, loading, error } = useSelector(selectContacts);
//     // const contactsData = useSelector(selectContacts);
//     console.log(contacts);
//     return (
//         <div>
//             <div>
//                 <HomePageHeader />
//             </div>
//             <div>
//                 <div className="flex py-5 h-full justify-center">
//                     <div className="container border bg-white rounded-lg p-5">
//                         <h1 className='font-semibold text-lg'>Contacts</h1>
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
//                                         className="ms-2 h-9 w-48 focus:outline-none"
//                                         type="text"
//                                         placeholder="Search by name or email"
//                                     />
//                                 </div>
//                                 <div className="">
//                                     <button
//                                         className="border py-2 text-[#6B7280] text-sm font-semibold px-3 rounded mt-2"
//                                     >
//                                         Add New
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                         {
//                             <table className="table-auto w-full mt-5 text-sm border-collapse">
//                                 <thead>
//                                     <tr className="text-[#6B7280] text-left uppercase border-b">
//                                         <th className="truncate p-3"><div className=""><label class="checkbox-label mb-0"><input className="checkbox text-indigo-600" type="checkbox" value="" /></label></div> </th>
//                                         <th className="truncate p-3">Actions </th>
//                                         <th className="truncate p-3">Name</th>
//                                         <th className="truncate p-3">Email</th>
//                                         <th className="truncate p-3 ">Number</th>
//                                         <th className="truncate p-3">Source</th>
//                                         <th className="truncate p-3">Designation</th>
//                                         <th className="truncate p-3">Haward education</th>
//                                         <th className="truncate p-3">Relation</th>
//                                         <th className="truncate p-3">Region</th>
//                                         <th className="truncate p-3">Company</th>
//                                         <th className="truncate p-3">Address</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <>
//                                         {contacts.map((contact) => (
//                                             <ContactData key={contact.id} contact={contact} />
//                                         ))}
//                                     </>
//                                 </tbody>
//                             </table>
//                         }
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default Contacts;

// import React, { useCallback, useMemo, useState } from 'react';
// import { useSelector } from 'react-redux';
// import ContactData from './ContactData';
// import HomePageHeader from './HomePageHeader';
// import Loader from './Loader';
// import { selectContacts } from './Redux/contactSlice';

// const pageSize = 10;

// const Contacts = () => {
//     const { data: allContacts, loading, error } = useSelector(selectContacts);
//     const [state, setState] = useState({
//         currentPage: 1,
//         searchTerm: '',
//     });




//     const handleSearchChange = useCallback((event) => {
//         setState((prevState) => ({ ...prevState, searchTerm: event.target.value.toLowerCase() }));
//     }, []);

//     const filteredContacts = useMemo(() => {
//         return allContacts?.filter(
//             (contact) =>
//                 (contact.firstName + ' ' + contact.lastName).toLowerCase().includes(state.searchTerm) ||
//                 contact.email.toLowerCase().includes(state.searchTerm)
//         );
//     }, [allContacts, state.searchTerm]);


//     const totalContacts = filteredContacts?.length || 0;
//     const totalPages = Math.ceil(totalContacts / pageSize);

//     const changePage = useCallback(
//         (newPage) => {
//             if (newPage >= 1 && newPage <= totalPages) {
//                 setState((prevState) => ({ ...prevState, currentPage: newPage }));
//             }
//         },
//         [totalPages]
//     );

//     return (
//         <div>
//             <div>
//                 <HomePageHeader />
//             </div>
//             <div>
//                 <div className="flex py-5 h-full justify-center">
//                     <div className="container border bg-white rounded-lg p-5">
//                         <h1 className="font-semibold text-lg">Contacts</h1>
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
//                                         className="ms-2 h-9 w-48 focus:outline-none"
//                                         type="text"
//                                         placeholder="Search by name or email"
//                                         value={state.searchTerm}
//                                         onChange={handleSearchChange}
//                                     />
//                                 </div>
//                                 <div className="">
//                                     <button className="border py-2 text-[#6B7280] text-sm font-semibold px-3 rounded mt-2">
//                                         Add New
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                         {loading && <Loader />}
//                         {error && <p>Error: {error}</p>}
//                         {filteredContacts && filteredContacts.length > 0 ? (
//                             <table className="table-auto w-full mt-5 text-sm border-collapse">
//                                 <thead>
//                                     <tr className="text-[#6B7280] text-left uppercase border-b">
//                                         <th className="truncate p-3">
//                                             <div className="">
//                                                 <label class="checkbox-label mb-0">
//                                                     <input className="checkbox text-indigo-600" type="checkbox" value="" />
//                                                 </label>
//                                             </div>
//                                         </th>
//                                         <th className="truncate p-3">Actions </th>
//                                         <th className="truncate p-3">Name</th>
//                                         <th className="truncate p-3">Email</th>
//                                         <th className="truncate p-3 ">Number</th>
//                                         <th className="truncate p-3">Source</th>
//                                         <th className="truncate p-3">Designation</th>
//                                         <th className="truncate p-3">Haward education</th>
//                                         <th className="truncate p-3">Relation</th>
//                                         <th className="truncate p-3">Region</th>
//                                         <th className="truncate p-3">Company</th>
//                                         <th className="truncate p-3">Address</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     <>
//                                         {filteredContacts
//                                             .slice((state.currentPage - 1) * pageSize, state.currentPage * pageSize)
//                                             .map((contact) => (
//                                                 <ContactData key={contact.id} contact={contact} />
//                                             ))}
//                                     </>
//                                 </tbody>
//                             </table>
//                         ) : (
//                             <div>No Contacts Found</div>
//                         )}
//                         <div className="pagination mt-5 text-[#6B7280]">
//                             <button
//                                 className="mx-2"
//                                 onClick={() => changePage(state.currentPage - 1)}
//                                 disabled={state.currentPage === 1}
//                             >
//                                 &lsaquo;
//                             </button>
//                             {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
//                                 <button
//                                     key={pageNumber}
//                                     onClick={() => changePage(pageNumber)}
//                                     className={`${pageNumber === state.currentPage
//                                         ? 'active text-indigo-600 bg-indigo-50 py-1 px-3 rounded'
//                                         : ''
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
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Contacts;


import React, { useCallback, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContactData from './ContactData';
import ContactForm from './ContactForm';
import Footer from './Footer';
import HomePageHeader from './HomePageHeader';
import Loader from './Loader';
import { fetchContactById, selectContacts } from './Redux/contactSlice';

const pageSize = 10;

const initialValues = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    notes: '',
    designation: ''
};

const Contacts = () => {
    const { data: allContacts, loading, error } = useSelector(selectContacts);
    const [state, setState] = useState({
        currentPage: 1,
        searchTerm: '',
    });
    const [showContactForm, setShowContactForm] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    const [formMode, setFormMode] = useState(null)
    const dispatch = useDispatch();

    const handleSearchChange = useCallback((event) => {
        setState((prevState) => ({ ...prevState, searchTerm: event.target.value.toLowerCase() }));
    }, []);



    // const handleEdit = useCallback(async (contactId) => {
    //     try {
    //         await dispatch(fetchContactById(contactId));
    //         setShowContactForm(true);
    //         setFormMode("edit");
    //         // const b = allContacts.find(contact => contact.id === contactId) || initialValues;
    //         const b = allContacts?.find((contact) => contact?.id === contactId);
    //         setFormValues(b);
    //         console.log(b);
    //     } catch (error) {
    //         console.error("Error fetching contact details for editing:", error);
    //     }
    // }, [dispatch]);

    const handleEdit = useCallback(async (contactId) => {
        try {
            await dispatch(fetchContactById(contactId));
            setShowContactForm(true);
            setFormMode("edit");
            const b = allContacts.find(contact => contact.id === contactId);
            setFormValues(b);
            console.log(); // Log the value if needed
        } catch (error) {
            console.error("Error fetching contact details for editing:", error);
        }
    }, [dispatch, allContacts]);


    const filteredContacts = useMemo(() => {
        return allContacts?.filter(
            (contact) =>
                (contact.firstName + ' ' + contact.lastName).toLowerCase().includes(state.searchTerm) ||
                contact.email.toLowerCase().includes(state.searchTerm)
        );
    }, [allContacts, state.searchTerm]);

    const totalContacts = filteredContacts?.length || 0;
    const totalPages = Math.ceil(totalContacts / pageSize);

    const calculateButtonRange = useCallback(() => {
        const maxVisibleButtons = 7;
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
        (newPage) => {
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
            <div>
                <div className="flex py-5 h-full justify-center">
                    <div className="container border bg-white rounded-lg p-5">
                        <h1 className="font-semibold text-lg">Contacts ({allContacts?.length})</h1>
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
                                        className="ms-2 h-9 w-48 focus:outline-none"
                                        type="text"
                                        placeholder="Search by name or email"
                                        value={state.searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                </div>
                                <div className="">
                                    <button onClick={() => setShowContactForm(true)} className="border py-2 text-[#6B7280] text-sm font-semibold px-3 rounded mt-2">
                                        Add New
                                    </button>
                                </div>
                            </div>
                        </div>
                        {loading && <Loader />}
                        {error && <p>Error: {error}</p>}
                        {filteredContacts && filteredContacts.length > 0 ? (
                            <table className="table-auto w-full mt-5 text-sm border-collapse">
                                <thead>
                                    <tr className="text-[#6B7280] text-left uppercase border-b">
                                        <th className="truncate p-3">
                                            <div className="">
                                                <label class="checkbox-label mb-0">
                                                    <input className="checkbox text-indigo-600" type="checkbox" value="" />
                                                </label>
                                            </div>
                                        </th>
                                        <th className="truncate p-3">Actions </th>
                                        <th className="truncate p-3">Name</th>
                                        <th className="truncate p-3">Email</th>
                                        <th className="truncate p-3 ">Number</th>
                                        <th className="truncate p-3">Source</th>
                                        <th className="truncate p-3">Designation</th>
                                        <th className="truncate p-3">Haward education</th>
                                        <th className="truncate p-3">Relation</th>
                                        <th className="truncate p-3">Region</th>
                                        <th className="truncate p-3">Company</th>
                                        <th className="truncate p-3">Address</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <>
                                        {filteredContacts
                                            .slice((state.currentPage - 1) * pageSize, state.currentPage * pageSize)
                                            .map((contact) => (
                                                <ContactData handleEdit={handleEdit} key={contact.id} contact={contact} />
                                            ))}
                                    </>
                                </tbody>
                            </table>
                        ) : (
                            <div>No Contacts Found</div>
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
                                        ? 'active text-indigo-600 bg-indigo-50 py-1 px-3 rounded'
                                        : ''
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
                    {showContactForm && (
                        <div
                            onClick={(event) => {
                                if (event.target.classList.contains('overlay')) {
                                    setShowContactForm(false);
                                }
                            }}
                            className="fixed top-0 right-0 w-full  h-full bg-black bg-opacity-80 overlay"
                        >
                            <div className="w-1/2 overflow-y-scroll fixed bg-white h-full p-5  top-0 right-0">
                                <ContactForm
                                    formValues={formValues}
                                    formMode={formMode}
                                    setShowContactForm={setShowContactForm}
                                // onClose={() => setState(prevState => ({ ...prevState, showLeadForm: false }))}
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

export default Contacts;

