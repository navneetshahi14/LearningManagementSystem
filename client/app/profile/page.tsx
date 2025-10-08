/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import React, { useState } from 'react'
import Protected from '../hooks/useProtected'
import Header from '../components/Header'
import Heading from '../utils/Heading'
import Profile from '../components/Profile/Profile'
import { useSelector } from 'react-redux'
import Footer from '../components/Routes/Footer'

type Props = {}

const page: React.FC<Props> = () => {

    const [open, setOpen] = useState(false)
    const [activeItem, setActiveItem] = useState(0)
    const [route, setRoute] = useState("Login")
    const {user} = useSelector((state:any)=>state.auth)

    return (
        <>
            <div className='h-screen w-full dark:bg-[#333] bg-white'>
                <Protected>
                    <Heading title={`${user.name}'s profile`} description='ElevateX is a platform for students to learn and get help from teacher' keyword='Programming,MERN,Redux,Machine Learning' />
                    <Header
                        open={open}
                        setOpen={setOpen}
                        activeItem={activeItem}
                        setRoute={setRoute}
                        route={route}
                        setActiveItem={setActiveItem}
                    />
                    <Profile user={user} />
                    <Footer />
                </Protected>
            </div>
        </>
    )
}

export default page