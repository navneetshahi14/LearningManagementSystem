import React from 'react'

interface DashProp{
    heading:string,
    para:string,
    classes:string
}

const Dashshow: React.FC<DashProp> = ({ heading, para, classes='border-r-[1px]' }) => {
    return (
        <>
            <div className={`w-[30%] h-[100%] p-2 ${classes} flex items-center justify-center flex-col gap-4`}>
                <h1 className='text-xl uppercase font-semibold'>{heading}</h1>
                <p className="text-4xl font-bold text-[#666] ">
                    {para}
                </p>
            </div>
        </>
    )
}

export default Dashshow