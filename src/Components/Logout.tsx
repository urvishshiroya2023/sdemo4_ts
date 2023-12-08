// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Logout = () => {
//     const navigate = useNavigate()


//     const handleOnClick = () => {
//         localStorage.removeItem("authToken");
//         navigate('/signin')
//     }

//     return (
//         <div className='bg-green-400 rounded'>
//             <button className='px-5 py-2 ' onClick={handleOnClick}>Logout</button>
//         </div>
//     )
// }

// export default Logout

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    const handleOnClick = (): void => {
        localStorage.removeItem("authToken");
        navigate('/signin');
    }
    return (
        <div className='bg-green-400 rounded'>
            <button className='px-5 py-2' onClick={handleOnClick}>Logout</button>
        </div>
    );
}

export default Logout;
