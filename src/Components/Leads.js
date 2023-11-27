import React from 'react'
import HomePageHeader from './HomePageHeader'

const Leads = () => {
    return (
        <div className="bg-[#e5e7eb] bg-opacity-50 h-full min-h-screen">
            <div>
                <HomePageHeader />
            </div>
            <div>
                <div className="flex py-5 h-full justify-center">
                    <div className="container border bg-white rounded-lg p-5">
                        <div className="flex justify-between items-center">
                            <h1>Leads</h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Leads