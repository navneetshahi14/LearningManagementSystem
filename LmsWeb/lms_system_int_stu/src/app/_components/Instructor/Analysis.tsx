import React from 'react'
import Boxs from '../main/molecule/Boxs'

const Analysis = () => {
  return (
    <>
      <div className="h-full w-full p-1 ">
        <div className="p-2 w-full h-[20vh] flex gap-10">
          <Boxs heading='Total Income' content='$20' width='30%' height='95%' />
          <Boxs heading='Total sales' content='$20' width='30%' height='95%' />
          <Boxs heading='Total Enrollment' content='$20' width='30%' height='95%' />
        </div>
        <div className="w-full h-[40vh] p-2">
          <Boxs heading='' content='' width='100%' height='100%' />
        </div>
        <div className="w-full h-[40vh] p-2 ">
          {/* net sales */}
          <div className="w-[100%] h-[100%] border-[1px] border-[#666] shadow rounded-xl flex flex-col justify-center items-center p-1 overflow-hidden">
            <div className="h-[10%] w-[100%] flex justify-around ">
              <span className="">Customer</span>
              <span className="">Date</span>
              <span className="">Status</span>
              <span className="">Amount</span>
            </div>
            <div className="h-[85%] w-[100%] overflow-y-auto  ">
              <div className='w-full border-y-[1px] bg-gray-50 shadow flex justify-around px-5'>
                <span className="">Navneet</span>
                <span className="">22/12/12</span>
                <span className="pr-4">success</span>
                <span className="">$100</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Analysis