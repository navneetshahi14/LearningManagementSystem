/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useEffect, useState } from "react";
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from "@/redux/feature/auth/authApi";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";
import CourseCard, { courseDataItem, userItem } from "../Course/CourseCard";
import { useGetUserAllCourseQuery } from "@/redux/feature/courses/courseApi";

type Props = {
  user: userItem;
};

const Profile: FC<Props> = ({ user }) => {
  const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [logout, setLogout] = useState(false);
  const [course, setCourse] = useState<courseDataItem[]>([]);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });
  const [active, setActive] = useState(1);

  const { data, isLoading } = useGetUserAllCourseQuery(undefined, {});

  const logoutHandler = async () => {
    setLogout(true);
    await signOut();
  };

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setScroll(false);
      } else {
        setScroll(true);
      }
    });
  }

  useEffect(() => {
    if (data) {
      const filteredCourses:courseDataItem[] = user.courses
        .map((userCourse) =>
          data.course.find((courses: courseDataItem) => courses._id === userCourse.courseId)
        )
        .filter((courses: courseDataItem) => courses !== undefined);
      setCourse(filteredCourses);
    }
  }, [data]);

  return (
    <div className="w-[85%] flex mx-auto  ">
      <div
        className={`w-[60px] md:w-[310px] h-[450px] dark:bg-slate-900 bg-white border dark:border-[#ffffff1d] border-[#00000014] overflow-hidden rounded-[5px] shadow-xl dark:shadow-sm mt-[100px] mb-[80px] sticky ${
          scroll ? "top-[120px]" : "top-[30px]"
        } left-[30px] `}
      >
        <SideBarProfile
          user={user}
          active={active}
          avatar={avatar}
          setActive={setActive}
          logoutHandler={logoutHandler}
        />
      </div>
      {active === 1 && (
        <div className="w-full h-full bg-transparent  mt-[100px]">
          <ProfileInfo avatar={avatar} user={user} />
        </div>
      )}
      {active === 2 && (
        <div className="w-full h-full bg-transparent  mt-[100px]">
          <ChangePassword />
        </div>
      )}
      {active === 3 && (
        <div className="w-full pl-7 px-2 md:px-10 md:pl-8">
          <div className="grid grid-cols-1 mt-24 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-3 xl:gap-[35px] ">
            {course &&
              course.map((item: any, index: number) => (
                <CourseCard
                  item={item}
                  key={index}
                  user={user}
                  isProfile={true}
                />
              ))}
          </div>
          {course.length === 0 && (
            <h1 className="text-center font-poppins text-[18px]">
              You don&apos;t have any purchased courses
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default Profile;
