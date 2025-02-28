import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import React from 'react'

const Profiledash = () => {
  return (
    <>
      <div className="h-full w-full bg-gray-100 shadow rounded relative">
        <div className="h-[20vh] w-full bg-white overflow-hidden shadow flex justify-center items-center">
          <h2 className='text-9xl uppercase text-[#e6e6e6] drop-shadow-lg text-center'>ElevateX</h2>
        </div>
        <div className="h-[100px] w-[100px] rounded-full absolute shadow top-[15vh] left-2 bg-white"></div>
        <div className="h-[100%] w-[100%] flex  ">
            <div className="w-[15%] h-[100%] "></div>
            <div className="w-[85%] h-[100%] p-2">
              <div className='w-[100%] h-auto p-1 flex justify-between items-center'>
                <div className="">
                  <h1 className="text-3xl font-semibold  ">
                    Navneet Shahi
                  </h1>
                  <h1 className="text-lg font-medium text-[#333] px-5">
                    Instructor
                  </h1>
                </div>
                <Button className='text-xl bg-blue-500 hover:bg-blue-800 text-white rounded drop-shadow uppercase' ><Pencil /> Edit</Button>
              </div>
              <div className="w-full h-[50%] p-4 ">
                <h1 className="text-5xl uppercase font-semibold ">Ratings</h1>
                <h1 className="text-xl text-[#777]">(370 Ratings)</h1>
                <h1 className="">Average rating</h1>
              </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Profiledash