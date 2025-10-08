"use client";
import { useGetUserAllCourseQuery } from "@/redux/feature/courses/courseApi";
import { useGetHerodataQuery } from "@/redux/feature/layout/layout";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { styles } from "../styles/styles";
import CourseCard from "../components/Course/CourseCard";

type Props = {};

const page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const { data, isLoading } = useGetUserAllCourseQuery(undefined, {});
  const { data: categoriesData } = useGetHerodataQuery("Categories", {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    if (category === "All") {
      setCourses(data?.course);
    }
    if (category !== "All") {
      setCourses(
        data?.course.filter((item: any) => item.categories === category)
      );
    }

    if (search) {
      setCourses(
        data?.course.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoriesData?.layout.categories;

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
            setActiveItem={() => {}}
          />
          <div className="w-[95%] md:w-[85%] m-auto min-h-[70vh] ">
            <Heading
              title="All courses --- ElevateX"
              description="ElevateX is a programming community"
              keyword={
                "programming community, coding skills, expert insights, collabrations, growth"
              }
            />
            <br />
            <div className="w-full flex items-center flex-wrap">
              <div
                className={`h-[35px] ${
                  category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-poppins cursor-pointer `}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories &&
                categories.map((item: any, index: number) => {
                  <div key={index} className={``}>
                    <div
                      className={`h-[35px] ${
                        category === item.title
                          ? "bg-[crimson] "
                          : "bg-[#5050cb] "
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-poppins cursor-pointer `}
                      onClick={() => setCategory(item.title)}
                    >
                      {item.title}
                    </div>
                  </div>;
                })}
            </div>
            {
                courses && courses.length === 0 && (
                    <p className={`${styles.label} justify-center min-h-[50vh] flex items-center`}>
                        {search ? "No Courses found!":"No courses found in this category. Please try another one!"}
                    </p>
                )
            }
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 2xl:grid-cols-4 2xl:gap-[35px] ">
                {
                    courses && 
                    courses.map((item:any,index:number)=>(
                        <CourseCard item={item} key={index} />
                    ))
                }
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default page;
