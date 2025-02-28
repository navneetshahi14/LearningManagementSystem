'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Register = () => {

  const router = useRouter()

  return (
    <>
    <div className="h-screen w-full p-3 overflow-hidden flex justify-center items-center">
            <div className="w-[30vw] h-[100%] border-r-2 mr-2 border-[#999] flex flex-col justify-center rounded  gap-3">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold uppercase">ElevateX</h1>
                    <h1 className="text-xl uppercase">Sign up</h1>
                </div>
                <div className="mt-10 flex justify-center items-center ">
                    <Button variant={'outline'} className='rounded' > <Image src={'/google.svg'} alt='google' height={30} width={30} /> Sign Up with Google</Button>
                </div>
                <div className="text-sm text-[#999] my-4 text-center flex justify-center items-center relative ">
                    <h1 className="bg-white z-[10] w-[50%]">Or signUp using Email</h1>
                    <div className="absolute w-[80%] bg-[#999] z-[1] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] h-[1px]"></div>
                </div>
                <div className='w-full h-auto p-2 flex flex-col justify-center items-center gap-3'>
                    <div className="grid w-[80%] max-w-sm items-center gap-1.5">
                        <Label className='text-sm pl-5 uppercase font-semibold' htmlFor='user'>UserName</Label>
                        <Input type="text" id='user' placeholder='Type......' className='rounded' />
                    </div>
                    <div className="grid w-[80%] max-w-sm items-center gap-1.5">
                        <Label className='text-sm pl-5 uppercase font-semibold' htmlFor='email'>Email</Label>
                        <Input type="email" id='email' placeholder='Type......' className='rounded' />
                    </div>
                    <div className="grid w-[80%] max-w-sm items-center gap-1.5">
                        <Label className='text-sm pl-5 uppercase font-semibold' htmlFor='password'>Password</Label>
                        <Input type="password" id='password' placeholder='Type......' className='rounded' />
                    </div>
                    <Button className='bg-blue-700 text-white text-xl rounded w-[70%] mt-3 hover:bg-blue-900 uppercase'>Register</Button>
                    <h2 className="text-start w-[80%] ">
                        Already have Account <span onClick={()=>router.replace('/auth/login')} className="text-blue-600 cursor-pointer">Login</span>
                    </h2>
                </div>

            </div>
            <div className="w-[50vw] h-[100%] flex justify-end items-center overflow-hidden">
                <Image src={'/login.png'} alt='ElevateX' width={800} height={1000} />
            </div>
        </div>
    </>
  )
}

export default Register