import { useGetHerodataQuery } from "@/redux/feature/layout/layout";
import Image from "next/image";
import Link from "next/link";
import React, { FC, useState } from "react";
import { BiSearch } from "react-icons/bi";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

type Props = {};

const Hero: FC<Props> = (props) => {
  const { data, isLoading } = useGetHerodataQuery("Banner", {});
  const [search,setSearch] = useState("")
  const router = useRouter()

  const handleSearch = () =>{
    if(search === "") {
      return
    }else{
      router.push(`/courses?title=${search}`)
    }
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full md:flex items-center ">
          <div className="absolute top-[100px] left-[50%] -translate-x-[50%]  lg:top-[82px] 2xl:top-[100px] lg:left-0 lg:-translate-x-0 2xl:h-[550px] 2xl:w-[550px] lg:h-[500px] lg:w-[500px] h-[45vh] w-[65vw] hero_animation rounded-full flex  items-center lg:ml-15 lg:mt-5 scale-[1.1] 2xl:scale-[1.02]"></div>
          <div className="lg:w-[50%] flex lg:min-h-screen items-center justify-center pt-[100px] lg:pt-[0] z-10 xl:ml-15">
            <Image
              src={data?.layout?.banner?.image?.url || require('../../../public/image1.png')}
              width={400}
              height={400}
              alt="hello"
              className="object-contain lg:max-w-[90%] w-[90%] 2xl:max-w-[85%] h-[auto] scale-[0.8] z-[10] 2xl:scale-[1.1]"
            />
          </div>

          <div className="xl:w-[60%] flex flex-col items-center lg:mt-[0px] text-center lg:text-left mt-[80px] 2xl:w-[90%] ">
            <h2 className="dark:text-white text-[#000000c7] text-[15px] px-3 w-full lg:text-[70px] font-[600] font-yatra py-2 lg:leading-none lg:!w-[78%] 2xl:!w-[70%] 2xl:ml-30 ">
              {data?.layout?.banner?.title}
            </h2>
            <br />
            <p className="dark:text-[#edfff4] text-[#000000c7] font-yatra font-[600] text-[18px] 2xl:!w-[55%] lg:!w-[78%]  ">
              {data?.layout?.banner?.subTitle}
            </p>
            <br />
            <br />
            <div className="xl:w-[55%] lg:w-[70%] w-[90%] h-[50px] bg-transparent relative ">
              <input
                type="search"
                placeholder="Search Courses....."
                value={search}
                onChange={(e)=>setSearch(e.target.value)}
                className="bg-transparent border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] rounded-[5px] p-2 w-full h-full outline-none text-[#0000004e] dark:text-[#ffffffe6] text-[20px] font-[500] font-poppins "
              />
              <div className="absolute flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px] "
                onClick={handleSearch}
              >
                <BiSearch size={20} className="cursor-pointer" />
              </div>
            </div>

            <br />
            <br />
            <div className="2xl:w-[55%] lg:w-[85%] w-[90%] flex items-center ">
              <Image
                src={require("@/public/user.png")}
                alt="hello"
                className="h-[30px] w-[30px] rounded-full  "
              />
              <Image
                src={require("@/public/user.png")}
                alt="hello"
                className="h-[30px] w-[30px] rounded-full ml-[-15px] "
              />
              <Image
                src={require("@/public/user.png")}
                alt="hello"
                className="h-[30px] w-[30px] rounded-full ml-[-15px] "
              />
              <p className="font-yatra dark:text-[#edfff4] text-[#000000b3] lg:pl-2 text-[18px] font-[600]  ">
                500K+ People already trusted us.{" "}
                <Link
                  href={"/courses"}
                  className="dark:text-[#46e254] text-[crimson] "
                >
                  View Courses
                </Link>{" "}
              </p>
            </div>
            <br />
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
