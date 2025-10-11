'use client'
import React, { FC, JSX, useEffect, useState } from 'react'
import avatarDefault from '../../../../public/user.png'
import Image from 'next/image'
import { BiHome, BiSolidBookContent, BiSolidCategory } from 'react-icons/bi'
import { FaFileInvoice, FaQuestionCircle, FaTv, FaUsers, FaVideo } from 'react-icons/fa'
import { Typography, IconButton, Box } from '@mui/material'
import { MenuItem, Menu, ProSidebar } from 'react-pro-sidebar'
import "react-pro-sidebar/dist/css/styles.css"
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useTheme } from 'next-themes'
import { MdAnalytics, MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { signOut } from 'next-auth/react'
import { AuthState } from '@/app/hooks/useUserAuth'

interface itemProp {
    title: string
    to: string
    icon: JSX.Element
    selected: string
    setSelected: (selection:string) =>void
}

interface item2Prop {
    title: string
    to: string
    icon: JSX.Element
    selected: string
    logoutHandler:()=>void
}

const Item: FC<itemProp> = ({ title, to, icon, selected, setSelected }) => {
    return (
        <MenuItem
            active={selected === title}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography className='!text-[16px] !font-poppins ' >{title}</Typography>
            <Link href={to}  ></Link>
        </MenuItem>
    )
}

const Item2: FC<item2Prop> = ({ title, to, icon, selected,logoutHandler }) => {
    return (
        <MenuItem
            active={selected === title}
            onClick={() => logoutHandler}
            icon={icon}
        >
            <Typography className='!text-[16px] !font-poppins ' >{title}</Typography>
            <Link href={to}  ></Link>
        </MenuItem>
    )
}

const AdminSidebar = () => {

    const { user } = useSelector((state: AuthState) => state.auth)
    const [, setLogout] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [selected, setSelected] = useState("Dashboard")
    const [mounted, setMounted] = useState(false)
    const { theme } = useTheme()

    useEffect(() => setMounted(true), [])

    if (!mounted) {
        return null
    }

    const logoutHandler = async () => {
        setLogout(true)
        await signOut()

    }




    return (
        <>
            <Box
                sx={{
                    "& .pro-sidebar-inner": {
                        background: `${theme === 'dark' ? "#111C43 !important" : "#fff !important"
                            }`
                    },
                    "& .pro-icon-wrapper": {
                        backgroundColor: "transparent !important"
                    },
                    "& .pro-inner-item:hover": {
                        color: "#868dfb !important"
                    },
                    "& .pro-menu-item.active": {
                        color: "#6870fa !important"
                    },
                    "& .pro-inner-item": {
                        padding: "5px 35px 5px 20px !important",
                        opacity: 1
                    },
                    "& .pro-menu.item": {
                        color: `${theme !== "dark" && "#000"}`
                    }
                }}
                className={`!bg-white dark:bg-[#111C43] w-full`}
            >
                <ProSidebar
                    collapsed={isCollapsed}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        height: "100vh",
                        width: isCollapsed ? "0%" : "16%"
                    }}
                >
                    <Menu iconShape='square'>
                        <MenuItem
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            icon={isCollapsed ? <MdArrowForwardIos className='text-black dark:text-[#ffffffc1]' /> : undefined}
                            style={{
                                margin: "10px 0 20px 0"
                            }}
                        >
                            {
                                !isCollapsed && (
                                    <Box
                                        display={`flex`}
                                        justifyContent={`space-between`}
                                        alignItems={`center`}
                                        ml={`15px`}
                                    >
                                        <Link href={`/`}>
                                            <h3 className="text-[25px] font-poppins uppercase dark:text-white text-black ">ElevateX</h3>
                                        </Link>
                                        <IconButton
                                            onClick={() => setIsCollapsed(!isCollapsed)}
                                            className='inline-block'
                                        >
                                            <MdArrowBackIos className='text-black dark:text-[#ffffffc1]' />
                                        </IconButton>
                                    </Box>
                                )
                            }
                        </MenuItem>

                        {
                            !isCollapsed && (
                                <Box mb={`25px`}>
                                    <Box display={`flex`} justifyContent={`center`} alignItems={`center`} >
                                        <Image
                                            src={user?.avatar ? user.avatar.url : avatarDefault}
                                            alt='profile-user'
                                            width={100}
                                            height={100}
                                            style={{
                                                cursor: "pointer",
                                                borderRadius: "50%",
                                                border: "3px solid #5b6fe6",
                                            }}
                                        />
                                    </Box>
                                    <Box textAlign={`center`}>
                                        <Typography
                                            variant={`h4`}
                                            className={`!text-[20px] text-black dark:text-[#ffffffc1]`}
                                            sx={{ m: "10px 0 0 0" }}
                                        >
                                            {user?.name}
                                        </Typography>
                                        <Typography
                                            variant={`h6`}
                                            className={`!text-[20px] text-black dark:text-[#ffffffc1] capitalize`}
                                            sx={{ m: "10px 0 0 0" }}
                                        >
                                            -{user?.role}
                                        </Typography>

                                    </Box>
                                </Box>
                            )
                        }

                        <Box paddingLeft={isCollapsed ? undefined : "10%"}>
                            <Item
                                title={`Dashboard`}
                                to={`/admin`}
                                icon={<BiHome />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Typography
                                variant="h5"
                                sx={{ m: "15px 0 5px 25px" }}
                                className='!text-[18px] text-black dark:text-[#ffffff1c] capitalize !font-[400] '
                            >{!isCollapsed && "Data"}</Typography>
                            <Item
                                title={`Users`}
                                to='/admin/users'
                                icon={<FaUsers />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title={`Invoices`}
                                to='/admin/invoices'
                                icon={<FaFileInvoice />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Typography
                                variant="h5"
                                sx={{ m: "15px 0 5px 25px" }}
                                className='!text-[18px] text-black dark:text-[#ffffff1c] capitalize !font-[400] '
                            >{!isCollapsed && "Content"}</Typography>
                            <Item
                                title={`Create Course`}
                                to='/admin/create-course'
                                icon={<FaVideo />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title={`Live Courses`}
                                to='/admin/courses'
                                icon={<FaTv />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Typography
                                variant="h5"
                                sx={{ m: "15px 0 5px 25px" }}
                                className='!text-[18px] text-black dark:text-[#ffffff1c] capitalize !font-[400] '
                            >{!isCollapsed && "Customization"}</Typography>
                            <Item
                                title={`Hero`}
                                to='/admin/hero'
                                icon={<BiSolidBookContent />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title={`FAQ`}
                                to='/admin/faq'
                                icon={<FaQuestionCircle />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title={`Categories`}
                                to='/admin/categories'
                                icon={<BiSolidCategory />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Typography
                                variant="h5"
                                sx={{ m: "15px 0 5px 25px" }}
                                className='!text-[18px] text-black dark:text-[#ffffff1c] capitalize !font-[400] '
                            >{!isCollapsed && "Manage Team"}</Typography>

                            <Item
                                title={`Manage Team`}
                                to='/admin/manage-team'
                                icon={<FaUsers />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Typography
                                variant="h5"
                                sx={{ m: "15px 0 5px 25px" }}
                                className='!text-[18px] text-black dark:text-[#ffffff1c] capitalize !font-[400] '
                            >{!isCollapsed && "Analytics"}</Typography>

                            <Item
                                title={`Course Analytics`}
                                to='/admin/course-analytics'
                                icon={<MdAnalytics />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title={`Order Analytics`}
                                to='/admin/order-analytics'
                                icon={<MdAnalytics />}
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                title={`Users Analytics`}
                                to='/admin/users-analytics'
                                icon={<MdAnalytics />}
                                selected={selected}
                                setSelected={setSelected}
                            />

                            <Typography
                                variant="h5"
                                sx={{ m: "15px 0 5px 25px" }}
                                className='!text-[18px] text-black dark:text-[#ffffff1c] capitalize !font-[400] '
                            >{!isCollapsed && "Extras"}</Typography>

                            {/* <Item
                                title={`Logout`}
                                to='/admin/logout'
                                icon={<RiLogoutBoxRLine />}
                                selected={selected}
                                setSelected={setSelected}
                                
                            /> */}
                            <Item2 
                                title='Logout'
                                to='/'
                                icon={<RiLogoutBoxRLine />}
                                selected={selected}
                                logoutHandler={logoutHandler}
                            />

                        </Box>
                    </Menu>
                </ProSidebar>
            </Box>
        </>
    )
}

export default AdminSidebar