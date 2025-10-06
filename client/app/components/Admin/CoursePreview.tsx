/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import CoursePlayer from '../../utils/CoursePlayer'
import { styles } from '../../../app/styles/styles'
import Rating from '../../../app/utils/Rating'
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from 'react-icons/io5'


type Props = {
    active: number
    setActive: (active: number) => void
    courseData: any
    handleCourseCreate: any
    isEdit?:boolean
}

const CoursePreview: React.FC<Props> = ({ active, setActive, courseData, handleCourseCreate,isEdit }) => {
    const discountPrecentage = ((courseData?.estimatedPrice - courseData?.price) / courseData?.estimatedPrice) * 100

    const discountPrecentagePrice = discountPrecentage.toFixed(0)

    const prevButton = () => {
        setActive(active - 1)
    }

    const createCourse = () => {
        handleCourseCreate()
    }

    return (
        <div className='w-[90%] m-auto py-5 mb-5 '>
            <div className="w-full relative">
                <div className="w-full mt-10">
                    <CoursePlayer
                        videoUrl={courseData?.demoUrl}
                        title={courseData?.title}
                    />
                </div>
                <div className="flex items-center">
                    <h1 className="pt-5 text-[25px] ">
                        {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
                    </h1>
                    <h5 className="pt-3 text-[20px] mt-2 line-through opacity-80 ">
                        {courseData?.estimatedPrice}
                    </h5>

                    <h4 className="pl-5 pt-4 text-[22px]">
                        {discountPrecentagePrice}%
                    </h4>
                </div>

                <div className="flex items-center">
                    <div className={`${styles.button} !w-[180px] my-3 font-poppins !bg-[crimson] cursor-not-allowed `}>
                        Buy Now {courseData?.price}$
                    </div>
                </div>

                <div className="flex items-center">
                    <input type="text" name="" id="" placeholder='Discount code...' className={`${styles.input} !w-[50%] lg:w-[60%] ml-3 !mt-0 `} />
                    <div className={`${styles.button} !w-[120px] my-3 ml-4 font-poppins cursor-pointer `}>
                        Apply
                    </div>
                </div>

                <p className="pb-1">.Source code included</p>
                <p className="pb-1">.Full lifetime access</p>
                <p className="pb-1">.Certification of Completion</p>
                <p className="pb-1">.Premium Support</p>
            </div>

            <div className="w-full">
                <div className="w-full md:pr-5 ">
                    <h1 className="text-[25px] font-poppins font-[600] ">
                        {courseData?.name}
                    </h1>
                    <div className="flex items-center justify-between pt-3">
                        <div className="flex items-center">
                            <Rating rating={0} />
                            <h5>0 Reviews</h5>
                        </div>
                        <h5>0 Students</h5>
                    </div>
                    <br />
                    <h1 className="text-[25px] font-poppins font-[600] ">
                        What you will learn from this course?
                    </h1>
                </div>
                {
                    courseData?.benifits?.map((item: any, index: number) => (
                        <div className="w-full flex md:items-center py-2" key={index}>
                            <div className="w-[15px] mr-1">
                                <IoCheckmarkOutline size={20} />
                            </div>
                            <p className="pl-2">{item.title}</p>
                        </div>
                    ))
                }
                <br />
                <br />
                <h1 className="text-[25px] font-poppins font-[600]  ">
                    What are the prerequisites for starting this course?
                </h1>
                {
                    courseData?.prerequisites?.map((item: any, index: number) => (
                        <div className="w-full flex md:items-center py-2" key={index}>
                            <div className="w-[15px] mr-1 ">
                                <IoCheckmarkDoneOutline size={20} />
                            </div>
                            <p className="pl-2">{item.title}</p>
                        </div>
                    ))
                }
                <br />
                <br />
                <div className="w-full">
                    <h1 className="text-[25px] font-poppins font-[600] ">
                        Course Details
                    </h1>
                    <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden ">
                        {courseData?.description}
                    </p>
                </div>
                <br />
                <br />
            </div>
            <div className="w-full flex items-center justify-between">
                <div className="w-full md:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer " onClick={() => prevButton()}>Prev</div>
                <div className="w-full md:w-[180px] flex items-center justify-center h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer " onClick={() => createCourse()}>{
                    isEdit ? "Update" : "Create"
                }</div>

            </div>
        </div>
    )
}

export default CoursePreview