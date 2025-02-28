import React from 'react'

interface BoxProp{
    heading:string,
    content:string,
    width:string,
    height:string
}

const Boxs:React.FC<BoxProp> = ({heading,content,width,height}) => {
  return (
    <>
        <div className={`w-[${width}] h-[${height}] border-[1px] border-[#555] rounded-xl flex flex-col  justify-center shadow px-10 `}>
            <h1 className="text-lg font-bold text-[#666] ">{heading}</h1>
            <p className="text-4xl font-semibold ">{content}</p>
        </div>
    </>
  )
}

export default Boxs