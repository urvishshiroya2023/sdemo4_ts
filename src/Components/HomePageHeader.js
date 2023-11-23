import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../Images/logo-dark-full.png"
import Logout from "./Logout"
const HomePageHeader = () => {
    return (
        <div className='bg-indigo-600 flex justify-center'>
            <div className='container' >
                <div className='flex justify-between items-center'>
                    <div>
                        <img src={logo} alt='logo' />
                    </div>
                    <div className=''>
                        <ul className='text-white flex justify-between'>
                            <li className='mx-2'>Dashboard</li>
                            <li className='mx-2'>Contact</li>
                            <li className='mx-2'>
                                <Link to={"/taskdetail"}>Task</Link>
                            </li>
                        </ul>
                    </div>
                    <div><Logout /></div>
                </div>
            </div>
        </div>
    )
}

export default HomePageHeader