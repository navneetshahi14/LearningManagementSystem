'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginUser } from '@/Redux/Slice/AuthSlice'
import { AppDispatch, RootState } from '@/Redux/store'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface User {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const { user, loading, error } = useSelector((state: RootState) => state.auth)
  const [users, setUser] = useState<User>({ email: "", password: "" })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const storedUser = localStorage.getItem("user") || ""
      let role = ""
      try {
        role = JSON.parse(storedUser)?.role || ""
      } catch (error) {
        console.error("Failed to parse user data from localStorage:", error)
      }
      if (user !== null || storedUser) {
        if (role === "instructor") {
          router.replace('/instructor')
        } else if (role === "") {
          router.replace('/auth/login')
        } else {
          router.replace('/course')
        }
      }
    }
  }, [user, router, mounted])

  const getUserDetails = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!users.email || !users.password) {
      alert("Please fill all fields")
      return
    }
    dispatch(loginUser(users))
  }

  if (!mounted) {
    return null // Return null or a loading spinner during SSR
  }
    return (
      <div className="h-screen w-full p-5 overflow-hidden flex justify-center items-center">
        <div className="w-[30vw] border-r-2 mr-2 border-[#999] h-[100%] flex flex-col justify-center rounded gap-5">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold uppercase">ElevateX</h1>
            <h1 className="text-xl uppercase">SignIn</h1>
          </div>
          <div className="mt-10 flex justify-center items-center">
            <Button variant={'outline'} className='rounded'>
              <Image src={'/google.svg'} alt='google' height={30} width={30} /> Sign In with Google
            </Button>
          </div>
          <div className="text-sm text-[#999] my-4 text-center flex justify-center items-center relative">
            <h1 className="bg-white z-[10] w-[50%]">Or signIn using Email</h1>
            <div className="absolute w-[80%] bg-[#999] z-[1] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] h-[1px]"></div>
          </div>
          <form onSubmit={handleSubmit} className='w-full h-auto p-2 flex flex-col justify-center items-center gap-3'>
            <div className="grid w-[80%] max-w-sm items-center gap-1.5">
              <Label className='text-sm pl-5' htmlFor='email'>Email</Label>
              <Input name='email' onChange={getUserDetails} type="email" id='email' placeholder='Type......' className='rounded' disabled={loading} />
            </div>
            <div className="grid w-[80%] max-w-sm items-center gap-1.5">
              <Label className='text-sm pl-5' htmlFor='password'>Password</Label>
              <Input name='password' onChange={getUserDetails} type="password" id='password' placeholder='Type......' className='rounded' disabled={loading} />
            </div>
            <Button type="submit" className='bg-blue-700 text-white text-xl rounded w-[70%] mt-3 hover:bg-blue-900 uppercase' disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <h2 className="text-start w-[80%]">
              Don{"'"}t have account <span onClick={() => router.replace('/auth/register')} className="text-blue-600 cursor-pointer">Register</span>
            </h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </div>
        <div className="w-[50vw] h-[100%] flex justify-end items-center overflow-hidden">
          <Image src={'/login.png'} alt='ElevateX' width={800} height={1000} />
        </div>
      </div>
    )
}

export default Login