import Link from 'next/link'
import React, { FC } from 'react'

export const navItemData = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Courses",
        url: "/courses"
    },
    {
        name: "About",
        url: "/about"
    },
    {
        name: "Policy",
        url: "/policy"
    },
    {
        name: "FAQ",
        url: "/faq"
    }
]

type Props = {
    activeItem: number
    isMobile: boolean
}

const NavItems: FC<Props> = ({ activeItem, isMobile }) => {
    return (
        <>
            <div className="container">
            <div className='md:flex hidden  '>
                {
                    navItemData && navItemData.map((items, index) => (
                        <Link key={index} href={`${items.url}`} passHref >
                            <span className={`
                            ${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} text-[18px] px-6 font-poppins font-[400]
                            `}>

                                {items.name}
                            </span>
                        </Link>
                    ))
                }

            </div>
            </div>
            {
                isMobile && (
                    <div className="md:hidden mt-5 ">

                        {
                            navItemData && navItemData.map((items, index) => (
                                <Link key={index} href={'/'} passHref >
                                    <span className={`
                                        ${activeItem === index ? "dark:text-[#37a39a] text-[crimson]" : "dark:text-white text-black"} block py-5 text-[18px] px-6 font-poppins font-[400]
                            `}>
                                        {items.name}
                                    </span>
                                </Link>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}

export default NavItems