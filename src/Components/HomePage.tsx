// import React from 'react'
// import HomePageHeader from './HomePageHeader'

// const HomePage = () => {
//     return (
//         <div>
//             <div>
//                 <HomePageHeader />
//             </div>
//             <div>
//                 <h1>Dashboard</h1>
//             </div>
//         </div>
//     )
// }

// export default HomePage

import React from 'react';
import HomePageHeader from './HomePageHeader';


const HomePage: React.FC = () => {
    return (
        <>
            <div>
                <HomePageHeader />
            </div>
            <div>
                <h1>Dashboard</h1>
            </div>
        </>
    );
};

export default HomePage;