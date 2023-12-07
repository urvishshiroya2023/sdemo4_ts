import { Link, useLocation } from 'react-router-dom'
import logo from "../Images/logo-light-full.png"
import Logout from "./Logout"

const HomePageHeader = () => {
    const location = useLocation();

    return (
        <div className='bg-white flex justify-center shadow-sm'>
            <div className='container' >
                <div className='flex justify-between items-center'>
                    <div>
                        <Link to={"/homepage"}>
                            <img src={logo} alt='logo' /></Link>
                    </div>
                    <div className=''>
                        {/* <ul className='text-[#6B7280] font-medium flex justify-between'>
                            <li className='mx-2 active:bg-violet-700'><Link to={"/homepage"}>Dashboard</Link></li>
                            <li className='mx-2'>Contacts</li>
                            <li className='mx-2'>Leads</li>
                            <li className='mx-2 active:bg-violet-700'>
                                <Link to={"/taskdetail"}>Task</Link>
                            </li>
                            <li className='mx-2'>Deal</li>
                        </ul> */}
                        <ul className='text-[#6B7280] font-medium flex justify-between items-center'>
                            <li className={`mx-2 ${location.pathname === '/homepage' ? 'bg-[#e5e7eb] text-black rounded-lg bg-opacity-80 px-3 py-2 ' : ''}`}>
                                <Link to={"/homepage"}>Dashboard</Link>
                            </li>
                            <li className={`mx-2 ${location.pathname === '/contacts' ? 'bg-[#e5e7eb] text-black rounded-lg bg-opacity-80 px-3 py-2 ' : ''}`}>
                                <Link to={"/contacts"}>Contacts</Link>
                            </li>
                            <li className={`mx-2 ${location.pathname === '/leads' ? 'bg-[#e5e7eb] text-black rounded-lg bg-opacity-80 px-3 py-2 ' : ''}`}>
                                <Link to={"/leads"}>Leads</Link>
                            </li>
                            <li className={`mx-2 ${location.pathname === '/taskdetail' ? 'bg-[#e5e7eb] text-black rounded-lg bg-opacity-80 px-3 py-2 ' : ''}`}>
                                <Link to={"/taskdetail"}>Tasks</Link>
                            </li>
                            <li className={`mx-2 ${location.pathname === '/deal' ? 'bg-[#e5e7eb] text-black rounded-lg bg-opacity-80 px-3 py-2 ' : ''}`}>
                                <Link to={"/deal"}>Deal</Link>
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