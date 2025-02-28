'use client'

import { Button } from '@/components/ui/button'
import { Equal, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const Header = () => {

  const router = useRouter()

  return (
    <nav className='h-[10vh] w-full bg-white flex justify-between items-center px-10 '>
        <div className="text-xl cursor-pointer uppercase ">ElevateX</div>
        <Equal  size={'2.5rem'} strokeWidth={1.5}/>
        <Button onClick={()=>router.replace('/auth/login')} className='bg-blue-600 text-lg rounded text-white hover:bg-blue-800
        ' variant={'secondary'} >
          <LogIn size={'1.5rem'} /> Join Now
        </Button>
    </nav>
  )
}

export default Header