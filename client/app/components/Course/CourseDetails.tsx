import { styles } from "@/app/styles/styles";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Rating from "@/app/utils/Rating";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice";
import Image from "next/image";
import CourseContentList from "./CourseContentList";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
  setOpen:any;
  setRoute:any;
};

const CourseDetails = ({ data, clientSecret, stripePromise, setOpen:openAuthModal, setRoute }: Props) => {
  const { data: userdata } = useLoadUserQuery(undefined, {});
  // const user = ;
  const [open, setOpen] = useState(false);
  const discountPercentage =
    ((data?.estimatedPrice - data.price) / data?.estimatedPrice) * 100;

  const [user,setUser] = useState<any>()
  useEffect(()=>{
    setUser(userdata?.user)
  },[userdata])
  const discountPercentagePrice = discountPercentage.toFixed(0);

  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data._id);

  const handleOrder = (e: any) => {
    if(user){
      setOpen(true);
    }else{
      setRoute("Login")
      openAuthModal(true)
    }
  };

  return (
    <div>
      <div className="w-[90%] md:w-[90%] m-auto py-5 ">
        <div className="w-full flex flex-col-reverse md:flex-row ">
          <div className="w-full md:w-[85%] md:pr-5 ">
            <h1 className="text-[25px] font-poppins font-[600] text-black dark:text-white ">
              {data.name}
            </h1>
            <div className="flex items-center justify-between pt-3 ">
              <div className="flex items-center ">
                <Rating rating={data.ratings} />
                <h5 className="text-black dark:text-white">
                  {data.reviews?.length}
                </h5>
              </div>
              <h5 className="text-black dark:text-white">
                {data.purchased} Students
              </h5>
            </div>

            <br />
            <h1 className="text-[25px] font-poppins font-[600] text-black dark:text-white ">
              What you will learn from this course?
            </h1>
            <div>
              {data.benefits?.map((item: any, index: number) => (
                <div className="w-full flex md:items-center py-2" key={index}>
                  <div className="w-[15px] mr-1">
                    <IoCheckmarkDoneOutline
                      size={20}
                      className="text-black dark:text-white"
                    />
                  </div>
                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>
                </div>
              ))}
              <br />
              <br />
            </div>
            <h1 className="text-[25px] font-poppins font-[600] text-black dark:text-white ">
              What are the Prerequisites for starting this course?
            </h1>
            {data.prerequisites?.map((item: any, index: number) => (
              <div className="w-full flex md:items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoCheckmarkDoneOutline
                    size={20}
                    className="text-black dark:text-white"
                  />
                </div>
                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <br />
            <div>
              <h1 className="text-[25px] font-poppins font-[600] text-black dark:text-white ">
                Course Overview
              </h1>
              {/* Course Content list */}
              <CourseContentList data={data?.courseData} isDemo={true}  />
            </div>
            <br />
            <br />
            <div className="w-full">
              <h1 className="text-[25px] font-poppins font-[600] text-black dark:text-white ">
                Course Details
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white ">
                {data.description}
              </p>
            </div>
            <br />
            <br />
            <div className="w-full">
              <div className="md:flex items-center">
                <Rating rating={data?.rating} />
                <div className="mb-2 md:mb-[unset]">
                  <h5 className="text-[25px] font-poppins text-black dark:text-white">
                    {Number.isInteger(data?.ratings)
                      ? data?.ratings.toFixed(1)
                      : data?.ratings.toFixed(2)}{" "}
                    Course Rating 🔹 {data?.reviews?.length} Reviews
                  </h5>
                </div>
                <br />
                {(data?.reviews && [...data.reviews].reverse()).map(
                  (item: any, index: number) => (
                    <div className="w-full pb-4" key={index}>
                      <div className="flex">
                        <div className="w-[50px] h-[50px] ">
                          <div>
                            <Image
                              src={
                                item.user.avatar
                                  ? item.user.avatar.url
                                  : "https://imgs.search.brave.com/gC4PemsyQfxAGl4nIbbzO3tCfYE0jlhJnRFYcrAbgJM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ny8xOC8yMy8yMy91/c2VyLTI1MTc0MzBf/NjQwLnBuZw"
                              }
                              width={50}
                              height={50}
                              alt=""
                              className="rounded-full w-[50px] h-[50px] object-contain"
                            />
                          </div>
                        </div>
                        <div className="hidden md:bolck pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[18px] pr-2 text-black dark:text-white ">
                              {item.user.name}
                            </h5>
                            <Rating rating={item.Rating} />
                          </div>
                          <p className="text-black dark:text-white ">
                            {item.comment}
                          </p>
                          <small className="text-[#000000d1] dark:text-[#ffffff83] ">
                            {format(item.createdAt)}
                          </small>
                        </div>
                        <div className="pl-2 flex md:hidden items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white ">
                            {item.user.name}
                          </h5>
                          <Rating rating={item.rating} />
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div className="w-full md:w-[35%] relative">
            <div className="sticky top-[100px] left-0 z-50 w-full ">
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
              <div className="flex items-center">
                <h1 className="pt-5 text-[25px] text-black dark:text-white">
                  {data.price === 0 ? "Free" : data.price + "$"}
                </h1>
                <h5 className="pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                  {data.estimatedPrice} $
                </h5>
                <h4 className="pl-5 pt-4 text-[22px] text-black dark:text-white">
                  {discountPercentagePrice}% Off
                </h4>
              </div>
              <div className="flex items-center">
                {isPurchased ? (
                  <Link
                    className={`${styles.button} !w-[180px] my-3 font-poppins cursor-pointer !bg-[crimson]  `}
                    href={`/course-access/${data._id}`}
                  >
                    Enter to Course
                  </Link>
                ) : (
                  <div
                    className={`${styles.button} !w-[180px] my-3 font-poppins cursor-pointer !bg-[crimson] `}
                    onClick={handleOrder}
                  >
                    Buy Now {data.price}$
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <>
        {open && (
          <div className="w-full h-screen bg-[#00000036] fixed top-0 left-0 z-50 flex items-center justify-center ">
            <div className="w-[500px] min-h-[500px] bg-white rounded-xl shadow p-3 ">
              <div className="w-full flex justify-end">
                <IoCloseOutline
                  size={40}
                  className="text-black dark:text-white"
                  onClick={() => setOpen(false)}
                />
              </div>
              <div className="w-full">
                {stripePromise && clientSecret && (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckOutForm user={user} setOpen={setOpen} data={data} />
                  </Elements>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
