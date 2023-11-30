import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteLead, fetchLeads } from './Redux/leadSlice';

const LeadsData = ({ lead }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();

    const statusStyles = {
        color: lead?.leadStatus?.colorCode,
        backgroundColor: `${lead?.leadStatus?.colorCode}1A`,
    };

    const handleDelete = async () => {
        try {
            // Dispatch the deleteLead action with the lead ID
            await dispatch(deleteLead(lead.id));
            dispatch(fetchLeads());
            toast.success('Lead deleted successfully');
            // Optionally, you can handle success or navigate to a different page after deletion
        } catch (error) {
            console.error("Error deleting lead:", error);
            toast.error('Error deleting lead');
        }
    };


    return (
        <tr className='text-[#6B7280] border-b'>

            <td className={`truncate p-3`}>
                <div class="flex text-base items-center">
                    <div>
                        <div class="dropdown">
                            <div class="dropdown-toggle" id="dropdown-toggle-157-JzjOVIXHuE">
                                <span class="tooltip-wrapper">
                                    <div></div>
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* edit */}
                    <button class="cursor-pointer circle items-center cursor-pointer hover:text-indigo-500">
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
                        </svg>
                    </button>

                    {/* delete */}
                    <span class="cursor-pointer hover:text-red-500 circle  mx-1 items-center" onClick={() => setIsModalOpen(true)} >
                        <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                    </span>

                    {isModalOpen && (
                        <div onClick={() => setIsModalOpen(false)} className="fixed inset-0 z-10 overflow-y-auto">
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                {/* Background overlay */}
                                <div
                                    className="fixed inset-0 transition-opacity"
                                    aria-hidden="true"
                                >
                                    <div className="absolute inset-0 bg-black opacity-60"></div>
                                </div>

                                {/* Modal panel */}
                                <div
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                >


                                    <div className="bg-white rounded-lg px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="">
                                            {/* ... Modal content */}
                                            <div onClick={() => setIsModalOpen(false)} className='cursor-pointer text-right text-xs'>X</div>
                                            <div >
                                                <h3 className='text-black text-xl font-semibold'>Delete Lead</h3>
                                                <div className="whitespace-normal mt-3  text-sm overflow-hidden line-clamp-3">
                                                    Are you sure you want to delete this Lead? All record related to this Lead will be deleted as well. This action cannot be undone.
                                                </div>
                                            </div>
                                            <div className='mt-3'>
                                                <div className='text-right '>
                                                    <div className=''>
                                                        <button
                                                            onClick={() => setIsModalOpen(false)}
                                                            className="cursor-pointer border rounded-md px-4 py-2 mt-3 w-full sm:mt-0  sm:w-auto sm:text-sm"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setIsModalOpen(false);
                                                                handleDelete()
                                                            }}
                                                            className="cursor-pointer inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ml-2  sm:w-auto sm:text-sm"
                                                        >
                                                            Confirm
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* view */}
                    <Link to={`/leaddetails/${lead.id}`} className='text-decoration-none'>
                        <span class="cursor-pointer  hover:text-green-500 circle items-center text-lg">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
                            </svg>
                        </span>
                    </Link>

                    <span class="tooltip-wrapper">
                        <button disabled="" class="cursor-pointer mx-1 circle items-center !cursor-not-allowed">
                            <svg stroke="currentColor" fill="none" stroke-width="2" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M10 20.777a8.942 8.942 0 0 1 -2.48 -.969"></path>
                                <path d="M14 3.223a9.003 9.003 0 0 1 0 17.554"></path>
                                <path d="M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592"></path>
                                <path d="M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305"></path>
                                <path d="M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356"></path>
                            </svg>
                        </button>
                    </span>

                    <span class="tooltip-wrapper">
                        <button class="cursor-pointer circle items-center cursor-pointer hover:text-emerald-500">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></path>
                            </svg>
                        </button>
                    </span>
                </div>

            </td>

            <td className='truncate p-3'>
                {lead?.contactData?.firstName && lead?.contactData?.lastName
                    ? `${lead?.contactData?.firstName} ${lead?.contactData?.lastName}`
                    : '-'}</td>
            <td className='truncate p-3'>{lead?.title ?? '-'}</td>


            <td className='truncate p-3'>

                {lead?.tags?.length > 0 && lead?.tags?.some(item => item.tagName.includes('cat')) ? (
                    lead?.tags.map((item) => (
                        <>
                            {item.tagName.includes('cat') && (
                                <span className='py-1 px-2 text-xs font-semibold rounded-md mr-2' style={{ color: item?.colorName, backgroundColor: `${item?.colorName}1A` }} key={item.id}>{item.tagName}</span>
                            )}
                        </>
                    ))
                ) : (
                    '-'
                )}
            </td>
            <td className='truncate p-3'>

                {lead?.tags?.length > 0 && lead?.tags?.some(item => !item.tagName.includes('cat')) ? (
                    lead?.tags?.map((item) => (
                        !item.tagName.includes('cat') && (
                            <>
                                <span className='py-1 px-2 text-xs font-semibold rounded-md mr-2' style={{ color: item?.colorName, backgroundColor: `${item?.colorName}1A` }} key={item.id}>{item.tagName}</span>
                            </>
                        )
                    ))
                ) : (
                    '-'
                )}
            </td>
            <td className='truncate p-3'>{lead?.budget}</td>

            <td className={`truncate p-3`}>
                <span className='py-1 px-2 text-xs font-semibold rounded-md' style={{ ...statusStyles }}>
                    {lead?.leadStatus?.statusName ?? '-'}
                </span>
            </td>

            <td className='truncate p-3'>{lead?.reason ?? 'NA'}</td>

        </tr>


    );
};

export default LeadsData;


