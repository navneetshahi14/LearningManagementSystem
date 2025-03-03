'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
// import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

interface User {
  profilePic: string;
  name:string;
}

const Navbar = () => {
  const router = useRouter();
  const [userProfile, setUserProfile] = useState<User | null>(null);

  
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    
    if (storedUser) {
      setUserProfile(JSON.parse(storedUser)); 
      console.log(JSON.parse(storedUser).name)
    }
  }, []);

  

  return (
    <>
      <nav className="h-[10vh] w-full shadow-xl flex justify-center items-center gap-10">
        <h1 className='text-2xl font-bold uppercase'>ElevateX</h1>
        <div className="flex border-[1px] rounded-full py-1 px-5 cursor-pointer w-[30%] mx-16 justify-center items-center">
          <Search />
          <Input className='outline-none border-0' type='text' id='search' placeholder='Search Here......' />
        </div>
        {!userProfile ? (
          <div className="gap-10 flex">
            <Button
              onClick={() => router.replace('/auth/login')}
              className='border border-blue-700 rounded text-blue-700 text-lg font-semibold hover:bg-gray-200 shadow-md'
            >
              Log in
            </Button>
            <Button
              onClick={() => router.replace('/auth/register')}
              className='rounded text-white bg-blue-700 text-lg font-semibold hover:bg-blue-800 shadow-md'
            >
              Sign up
            </Button>
          </div>
        ) : (
          <div className='bg-purple-500 rounded-full h-[40px] w-[40px] flex justify-center items-center text-white font-extrabold overflow-hidden shadow cursor-pointer'>
            {userProfile?.name.substring(0,1)}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;