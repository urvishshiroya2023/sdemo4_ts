import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../Images/logo-light-full.png"
import Logout from "./Logout"

const HomePageHeader = () => {
    return (
        <div className='bg-white flex justify-center shadow-lg'>
            <div className='container' >
                <div className='flex justify-between items-center'>
                    <div>
                        <img src={logo} alt='logo' />
                    </div>
                    <div className=''>
                        <ul className='text-[#6B7280] font-medium flex justify-between'>
                            <li className='mx-2'><Link to={"/homepage"}>Dashboard</Link></li>
                            <li className='mx-2'>Contacts</li>
                            <li className='mx-2'>Leads</li>
                            <li className='mx-2'>
                                <Link to={"/taskdetail"}>Task</Link>
                            </li>
                            <li className='mx-2'>Deal</li>
                        </ul>
                    </div>
                    <div><Logout /></div>
                </div>
            </div>
        </div>
    )
}

export default HomePageHeader