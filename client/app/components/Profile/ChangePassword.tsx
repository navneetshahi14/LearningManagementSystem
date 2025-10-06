import { styles } from '@/app/styles/styles'
import { useChangePasswordMutation } from '@/redux/feature/user/userApi'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Props = {}

const ChangePassword = (props: Props) => {

    const [oldPassword,setOldPassword] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [changePassword,{isSuccess,error}] = useChangePasswordMutation()

    useEffect(()=>{
        if(isSuccess){
            toast.success("Password changed successfully!!!")
        }
        if(error){
            toast.error("Something went wrong")
        }
    },[isSuccess,error])

    const passwordChangehandler = async(e:any)=>{
        e.preventDefault()
        if(newPassword === confirmPassword){
            await changePassword({
                oldPassword,newPassword
            })
        }else{
            toast.error("Confirm Password don't matched")
        }
    }

  return (
    <div className='w-full pl-7 px-2 md:px-5 md:pl-0'>
        <h1 className="block text-[25px] md:text-[30px] font-poppins text-center font-[500] dark:text-[#fff] text-black pb-2 ">
            Change Password
        </h1>
        <div className="w-full">
            <form 
                aria-required
                onSubmit={passwordChangehandler}
                className='flex flex-col items-center'
            >
                <div className="w-[100%] md:w-[60%] mt-5 ">
                    <label htmlFor="" className="block pb-2 dark:text-[#fff] text-black">Enter Your old password</label>
                    <input type="password"
                        className={`${styles.input} !w-[95%] mb-4 md:mb-0 dark:text-[#fff] text-black`}
                        required
                        value={oldPassword}
                        onChange={(e)=>setOldPassword(e.target.value)}
                    />
                </div>
                <div className="w-[100%] md:w-[60%] mt-5 ">
                    <label htmlFor="" className="block pb-2 dark:text-[#fff] text-black">Enter Your New password</label>
                    <input type="password"
                        className={`${styles.input} !w-[95%] mb-4 md:mb-0 dark:text-[#fff] text-black`}
                        required
                        value={newPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                    />
                </div>
                <div className="w-[100%] md:w-[60%] mt-5 ">
                    <label htmlFor="" className="block pb-2 dark:text-[#fff] text-black">Confirm password</label>
                    <input type="password"
                        className={`${styles.input} !w-[95%] mb-4 md:mb-0 dark:text-[#fff] text-black`}
                        required
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                    />
                    <input 
                        className={`w-[95%] h-[40px] border border-[#37a39a] text-center dark:text-[#fff] text-black rounded-[3px] mt-8 cursor-pointer `}
                        required
                        value={`Update`}
                        type={`submit`}
                    />
                </div>

            </form>
        </div>
    </div>
  )
}

export default ChangePassword