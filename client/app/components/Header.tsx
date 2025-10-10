/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import React, { FC, useEffect, useState } from "react";
import NavItems from "../utils/NavItems";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModel from "../utils/CustomModel";
import Login from "../../app/components/auth/Login";
import SignUp from "./auth/SignUp";
import Verification from "./auth/Verification";
import Image from "next/image";
import avatar from "../../../client/public/user.png";
import { useSession } from "next-auth/react";
import {
  useLogOutQuery,
  useSocialAuthMutation,
} from "@/redux/feature/auth/authApi";
import toast from "react-hot-toast";
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeItem: number;
  setRoute: (route: string) => void;
  route: string;
  setActiveItem: (activeItem: number) => void;
};

const Header: FC<Props> = ({
  activeItem,
  setOpen,
  route,
  open,
  setRoute,
  setActiveItem,
}) => {
  const [active, setActive] = useState(true);
  const [openSidebar, setOpenSidebar] = useState(false);
  const {
    data: userData,
    isLoading,
    refetch,
  } = useLoadUserQuery(undefined, {});
  const { data } = useSession();
  const [socialAuth, { isSuccess }] = useSocialAuthMutation();
  const [logout, setLogout] = useState(false);
  const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false,
  });

  useEffect(() => {
    if(!isLoading){
        if (!userData) {
          if (data) {
            socialAuth({
              email: data?.user?.email,
              name: data?.user?.name,
              avatar: data?.user?.image,
            });
          }
        }
        if (data === null) {
          if (isSuccess) {
            toast.success("Login successful");
          }
        }
        if (data === null && !isLoading && !userData) {
          setLogout(true);
        }

    }
  }, [data, userData, isLoading]);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 80) {
        setActive(true);
      } else {
        setActive(true);
      }
    });
  }

  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };

  return (
    <div className="w-full relative">
      <div
        className={` transition-all ${
          active
            ? "dark:bg-opacity-50  dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-gray-200 fixed top-0 left-0 w-full h-[80px] z-[80] border-b dark:border-[#ffffff1c] shadow-xl transition duration-500 "
            : "w-full border-b dark:border-[#ffffff1c] h-[80px] z-[80] dark:shadow  "
        }`}
      >
        <div className="w-[95%] 800px:w-[92%] m-auto py-2 h-full ">
          <div className="w-full h-[80px] flex items-center justify-between p-3 ">
            <div>
              <Link
                href={"/"}
                className="text-[25px] font-[500] text-black dark:text-white "
              >
                ElevateX
              </Link>
            </div>
            <div className="flex items-center">
              <NavItems activeItem={activeItem} isMobile={false} />
              <ThemeSwitcher />
              <div className="md:hidden pr-2">
                <HiOutlineMenuAlt3
                  size={25}
                  className="cursor-pointer dark:text-white text-black"
                  onClick={() => setOpenSidebar(true)}
                />
              </div>
              <div className="md:flex hidden">
                {userData ? (
                  <>
                    <Link href={"/profile"}>
                      <Image
                        src={userData.user.avatar ? userData.user.avatar.url : avatar}
                        alt="hello"
                        height={30}
                        width={30}
                        className={` ${
                          activeItem === 6
                            ? " border-[2px] border-[#37a39a]"
                            : "border-0"
                        } cursor-pointer rounded-full`}
                        onClick={() => setActiveItem(6)}
                      />
                    </Link>
                  </>
                ) : (
                  <HiOutlineUserCircle
                    size={25}
                    className="cursor-pointer dark:text-white text-black"
                    onClick={() => setOpen(true)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {openSidebar && (
          <div
            className="fixed md:hidden w-full h-screen top-0 left-0 z-[999999] dark:bg-[unset] bg-[#00000024]"
            onClick={handleClose}
            id={"screen"}
          >
            <div className="w-[70%] fixed z-[99999999999] h-screen bg-white dark:bg-[#0f172bcc] dark:bg-opacity-90 top-0 right-0 ">
              <NavItems activeItem={activeItem} isMobile={true} />
              <HiOutlineUserCircle
                size={25}
                className="cursor-pointer ml-5 my-2 dark:text-white text-black"
                onClick={() => setOpen(true)}
              />
              <br />
              <br />
              <p className="text-[16px] px-2 pl-5 text-black dark:text-white ">
                Copyright 2025 ElevateX
              </p>
            </div>
          </div>
        )}
      </div>
      {route === "Login" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Login}
              refetch={refetch}
            />
          )}
        </>
      )}
      {route === "SignUp" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={SignUp}
            />
          )}
        </>
      )}
      {route === "Verification" && (
        <>
          {open && (
            <CustomModel
              open={open}
              setOpen={setOpen}
              setRoute={setRoute}
              activeItem={activeItem}
              component={Verification}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Header;
