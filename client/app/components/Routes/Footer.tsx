import Link from 'next/link'
import React from 'react'


const Footer = () => {
  return (
    <footer>
        <div className="border border-[#0000000e] dark:border-[#ffffff1e] " />
        <br />
        <div className="w-[95%] md:w-full md:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8 ">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 ">
                <div className="space-y-3">
                    <h3 className="text-[20px] font-[600] text-black dark:text-white ">
                        About
                    </h3>
                    <ul className="space-y-4">
                        <li>
                            <Link href={'/about'} className='text-base text-black dark:text-gray-300 dark:hover:text-white' >Our Story</Link>
                        </li>
                        <li>
                            <Link href={'/privacy-policy'} className='text-base text-black dark:text-gray-300 dark:hover:text-white' >Privacy Policy</Link>
                        </li>
                        <li>
                            <Link href={'/faq'} className='text-base text-black dark:text-gray-300 dark:hover:text-white' >FAQ</Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-3">
                    <h3 className="text-[20px] font-[600] text-black dark:text-white ">Quick Links</h3>
                    <ul className="space-y-4">
                        <li>
                            <Link
                                href={'/courses'}
                                className='text-base text-black dark:text-gray-300 dark:hover:text-white'
                            >
                                Courses
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'/profile'}
                                className='text-base text-black dark:text-gray-300 dark:hover:text-white'
                            >
                                My Account
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={'course-dashboard'}
                                className='text-base text-black dark:text-gray-300 dark:hover:text-white'
                            >
                                Course Dashboard
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="space-y-4">
                    <h3 className="text-[20px] font-[600] text-black dark:text-white ">
                        Social Links
                    </h3>
                    <ul className="space-y-4">
                        <li>
                            <Link 
                                href={`https://github.com/navneetshahi14`}
                                className='text-base text-black dark:text-gray-300 dark:hover:text-white'
                            >
                                Github
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={`https://www.linkedin.com/in/navneet-shahi-a8762824b/`}
                                className='text-base text-black dark:text-gray-300 dark:hover:text-white'
                            >
                                LinkedIn
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <br />
        <p className="text-center text-black dark:text-white">
            CopyRight 2025 ElevateX | All Rights Reserved
        </p>
        <br />
    </footer>
  )
}

export default Footer