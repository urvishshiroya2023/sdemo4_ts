// import React from 'react'

// const Footer = () => {
//     return (
//         <div className='text-sm text-[#6B7280]'>
//             <footer className="footer flex flex-auto items-center h-16 px-4 sm:px-6 md:px-8">
//                 <div className="container mx-auto">
//                     <div className="flex items-center justify-between flex-auto w-full">
//                         <span>Copyright © 2023 <span className="font-semibold">Sarvadhi</span> All rights reserved.</span>
//                         <div className=""><a className="text-gray" href="/#">Term &amp; Conditions</a><span className="mx-2 text-muted"> | </span><a className="text-gray" href="/#">Privacy &amp; Policy</a>
//                         </div>
//                     </div>
//                 </div>
//             </footer>
//         </div>
//     )
// }

// export default Footer

import React from 'react';

const Footer: React.FC = () => {
    return (
        <div className='text-sm text-[#6B7280]'>
            <footer className="footer flex flex-auto items-center h-16 px-4 sm:px-6 md:px-8">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between flex-auto w-full">
                        <span>Copyright © 2023 <span className="font-semibold">Sarvadhi</span> All rights reserved.</span>
                        <div className="">
                            <a className="text-gray" href="/#">Term &amp; Conditions</a>
                            <span className="mx-2 text-muted"> | </span>
                            <a className="text-gray" href="/#">Privacy &amp; Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
