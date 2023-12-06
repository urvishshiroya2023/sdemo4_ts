// import sidebg from "../Images/auth-side-bg.jpeg"
// import avatar from "../Images/avatar.jpeg"
// import logo from "../Images/logo-dark-full.png"

// const Side = () => {
//     return (
//         <div className='bg-no-repeat bg-cover py-6 px-16 flex-col justify-between h-full lg:flex' style={{ backgroundImage: `url(${sidebg})` }}>
//             <div>
//                 <img src={logo} alt="sarvadhi logo" />
//             </div>
//             <div>
//                 <div class="mb-6 flex items-center gap-4">
//                     <span class=" rounded-full bg-[#6B7280]   border-2 border-white "><img class="w-[36px]   rounded-full" src={avatar} alt='avatarimg' /></span>
//                     <div class="text-white">
//                         <div class="font-semibold text-base tracking-wide">Mayur Solanki</div>
//                         <span class="opacity-80 text-sm font-light tracking-wide">DOT, Sarvadhi Solutions pvt ltd.</span>
//                     </div>
//                 </div>
//                 <p className='text-white opacity-80 text-lg font-light tracking-wide'>Digital Transformations For the People, By the People!</p>
//             </div>
//             <div>
//                 <span className='text-white text-sm opacity-80'>Copyright © 2023 <span className='font-semibold opacity-100'>Sarvadhi</span> </span>
//             </div>
//         </div>
//     )
// }

// export default Side

import React from 'react';
import sidebg from '../Images/auth-side-bg.jpeg';
import avatar from '../Images/avatar.jpeg';
import logo from '../Images/logo-dark-full.png';

interface SideProps {}

const Side: React.FC<SideProps> = () => {
  return (
    <div className='bg-no-repeat bg-cover py-6 px-16 flex-col justify-between h-full lg:flex' style={{ backgroundImage: `url(${sidebg})` }}>
      <div>
        <img src={logo} alt="sarvadhi logo" />
      </div>
      <div>
        <div className="mb-6 flex items-center gap-4">
          <span className="rounded-full bg-[#6B7280] border-2 border-white">
            <img className="w-[36px] rounded-full" src={avatar} alt='avatarimg' />
          </span>
          <div className="text-white">
            <div className="font-semibold text-base tracking-wide">Mayur Solanki</div>
            <span className="opacity-80 text-sm font-light tracking-wide">DOT, Sarvadhi Solutions pvt ltd.</span>
          </div>
        </div>
        <p className='text-white opacity-80 text-lg font-light tracking-wide'>Digital Transformations For the People, By the People!</p>
      </div>
      <div>
        <span className='text-white text-sm opacity-80'>Copyright © 2023 <span className='font-semibold opacity-100'>Sarvadhi</span> </span>
      </div>
    </div>
  );
};

export default Side;
