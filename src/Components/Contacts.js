import React from 'react';
import { useSelector } from 'react-redux';
import ContactData from './ContactData';
import HomePageHeader from './HomePageHeader';
import { selectContacts } from './Redux/contactSlice';

const Contacts = () => {
    const { data: contacts, loading, error } = useSelector(selectContacts);
    // const contactsData = useSelector(selectContacts);
    console.log(contacts);
    return (
        <div>
            <div>
                <HomePageHeader />
            </div>
            <div>
                <div className="flex py-5 h-full justify-center">
                    <div className="container border bg-white rounded-lg p-5">
                        <h1 className='font-semibold text-lg'>Contacts</h1>
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
                                    />
                                </div>
                                <div className="">
                                    <button
                                        className="border py-2 text-[#6B7280] text-sm font-semibold px-3 rounded mt-2"
                                    >
                                        Add New
                                    </button>
                                </div>
                            </div>
                        </div>
                        {
                            <table className="table-auto w-full mt-5 text-sm border-collapse">
                                <thead>
                                    <tr className="text-[#6B7280] text-left uppercase border-b">
                                        <th className="truncate p-3"><div className=""><label class="checkbox-label mb-0"><input className="checkbox text-indigo-600" type="checkbox" value="" /></label></div> </th>
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
                                        {contacts.map((contact) => (
                                            <ContactData key={contact.id} contact={contact} />
                                        ))}
                                    </>
                                </tbody>
                            </table>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contacts;