import React from 'react'

const Footer = () => {
    return (
        <div className='text-sm text-[#6B7280]'>
            <footer class="footer flex flex-auto items-center h-16 px-4 sm:px-6 md:px-8">
                <div class="container mx-auto">
                    <div class="flex items-center justify-between flex-auto w-full">
                        <span>Copyright © 2023 <span class="font-semibold">Sarvadhi</span> All rights reserved.</span>
                        <div class=""><a class="text-gray" href="/#">Term &amp; Conditions</a><span class="mx-2 text-muted"> | </span><a class="text-gray" href="/#">Privacy &amp; Policy</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer