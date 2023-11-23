import React from 'react'
import logo from "../Images/logo-dark-full.png"
import Logout from './Logout'

const HomePage = () => {
    return (
        <div>
            <div className='bg-indigo-600 flex justify-center'>
                <div className='container' >
                    <div className='flex justify-between items-center'>
                        <div>
                            <img src={logo} alt='logo' />
                        </div>
                        <div></div>
                        <div><Logout /></div>
                    </div>
                </div>
            </div>
            <div>
                <h1>Task List</h1>
            </div>
        </div>
    )
}

export default HomePage