import React from 'react'

interface buttonprop{
    content:string
}

const Button:React.FC<buttonprop> = ({content}) => {
  return (
    <>
        <button className="w-[80%] p-2 bg-blue-500 hover:bg-blue-800 rounded-lg uppercase text-white font-semibold">
            {content}
        </button>
    </>
  )
}

export default Button