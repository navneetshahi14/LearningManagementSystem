import React from 'react'
import Animation from '../../../../client/public/animation/loading.json'
import Lottie from 'lottie-react'


const Loader = () => {
  return (
    <>
        <div className="flex justify-center items-center h-screen dark:bg-black bg-white">
            {/* <Lottie animationData={Animation} loop={true} /> */}
            <h1 className={`text-5xl dark:text-white text-black`}>Loading.......</h1>
        </div>
    </>
  )
}

export default Loader