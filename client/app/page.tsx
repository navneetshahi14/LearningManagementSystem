/* eslint-disable @typescript-eslint/no-empty-object-type */
'use client'
import React, { FC, useState } from 'react'
import Heading from './utils/Heading'
import Header from './components/Header'
import Hero from './components/Routes/Hero'
import Courses from './components/Routes/Courses'
import Reviews from './components/Routes/Reviews'
import FAQ from './components/Routes/FAQ'
import Footer from './components/Routes/Footer'

interface Props { }

const Page: FC<Props> = () => {
  const [open,setOpen] = useState(false)
  const [activeItem,setActiveItem] = useState(0)
  const [route,setRoute] = useState("Login")

  return (
    <div className='dark:bg-[#333]'>
      <Heading title='ElevateX' description='ElevateX is a platform for students to learn and get help from teacher' keyword='Programming,MERN,Redux,Machine Learning' />
      <Header 
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute = {setRoute}
        route={route}
        setActiveItem={setActiveItem}
      />
      <Hero />
      <Courses />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  )
}

export default Page