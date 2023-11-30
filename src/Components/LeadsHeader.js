import React from 'react'

const LeadsHeader = ({ totalLeads }) => {
    return (
        <div className='flex justify-center'>
            <div className='container'>
                <div className=''>
                    <div className='grid grid-cols-3 gap-4'>
                        <div class="" role="presentation">
                            <div class="bg-white rounded-md border">
                                <div class="flex p-5 justify-between items-center">
                                    <div class="flex items-center gap-4 ">
                                        <span class=" !bg-indigo-600 flex justify-center items-center rounded-md  w-[55px] h-[55px]" >
                                            <span class="avatar-icon   avatar-icon-55 ">
                                                <svg stroke="#ffffff" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                                </svg>
                                            </span>
                                        </span>
                                        <div className='text-sm '>
                                            <span className='text-[#6B7280] text-base'> Total Leads</span>
                                            <h3><span className='text-2xl font-semibold'>{totalLeads}</span></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="" role="presentation">
                            <div class="bg-white rounded-md border">
                                <div class="flex p-5 justify-between items-center">
                                    <div class="flex items-center gap-4 ">
                                        <span class=" !bg-indigo-600 flex justify-center items-center rounded-md  w-[55px] h-[55px]" >
                                            <span class="avatar-icon   avatar-icon-55 ">
                                                <svg stroke="#ffffff" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                                </svg>
                                            </span>
                                        </span>
                                        <div className='text-sm '>
                                            <span className='text-[#6B7280] text-base'> Open Leads</span>
                                            <h3><span>10</span></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="" role="presentation">
                            <div class="bg-white rounded-md border">
                                <div class="flex p-5 justify-between items-center">
                                    <div class="flex items-center gap-4 ">
                                        <span class=" !bg-indigo-600 flex justify-center items-center rounded-md  w-[55px] h-[55px]" >
                                            <span class="avatar-icon   avatar-icon-55 ">
                                                <svg stroke="#ffffff" fill="none" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                                                </svg>
                                            </span>
                                        </span>
                                        <div className='text-sm '>
                                            <span className='text-[#6B7280] text-base'> This Week's New Leads</span>
                                            <h3><span>10</span></h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeadsHeader