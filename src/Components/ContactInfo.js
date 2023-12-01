import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import HomePageHeader from './HomePageHeader';
import Loader from './Loader';
import { fetchContactById, selectContacts } from './Redux/contactSlice';

const ContactInfo = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const selectedContact = useSelector(selectContacts).selectedContact;

    useEffect(() => {
        dispatch(fetchContactById(id));
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
                            <Link to="/contacts">
                                <span> &larr;</span>
                            </Link>
                            Contact Details
                        </h3>
                    </div>
                    <div className="mt-5">
                        {selectedContact ? (
                            <div className="">
                                <div className="grid grid-cols-5 bg-white p-5 border rounded-md">
                                    {selectedContact?.firstName && (
                                        <div className="text-[#6B7280] text-sm font-semibold">
                                            First Name:
                                            <span className="font-light">{selectedContact.firstName}</span>
                                        </div>
                                    )}

                                    {selectedContact?.lastName && (
                                        <div className="text-[#6B7280] text-sm font-semibold">
                                            Last Name:
                                            <span className="font-light">{selectedContact.lastName}</span>
                                        </div>
                                    )}

                                    {selectedContact?.title && (
                                        <div className="text-[#6B7280] text-sm font-semibold">
                                            Designation:
                                            <span className="font-light">{selectedContact.title}</span>
                                        </div>
                                    )}

                                    {selectedContact?.email && (
                                        <div className="text-[#6B7280] text-sm font-semibold">
                                            Email:
                                            <span className="font-light">{selectedContact.email}</span>
                                        </div>
                                    )}

                                    {selectedContact?.contactNumber && (
                                        <div className="text-[#6B7280] text-sm font-semibold">
                                            Phone :
                                            <span className="font-light">{selectedContact.contactNumber}</span>
                                        </div>
                                    )}

                                    {selectedContact?.description && (
                                        <div className="text-[#6B7280] text-sm font-semibold">
                                            Description :
                                            <span className="font-light">{selectedContact.description}</span>
                                        </div>
                                    )}
                                </div>

                                {selectedContact?.leadModels && (
                                    <div className="text-[#6B7280] text-sm font-semibold mt-5">
                                        Connected Leads:
                                        <ul className="mt-3 font-light">
                                            {selectedContact.leadModels.map((lead) => (
                                                <li key={lead.id}>
                                                    Title: {lead.title}, Budget: {lead.budget}, Status: {lead.leadStatus.statusName}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="h-full min-h-screen">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactInfo;
