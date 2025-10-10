"use client";
import React, { useState } from "react";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import About from './About'
import Footer from "../components/Routes/Footer";


const Page = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<number>(2);
  const [route, setRoute] = useState<string>("Login");
  return (
    <div className="dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-gray-200 min-h-screen flex flex-col justify-between">
      <Heading
        title="About us - ElevateX"
        description="Elearning is a learning management system for helping programmers."
        keyword="programmers,about"
      />
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
        setActiveItem={setActiveItem}
      />
      <div className="pt-24 py-10 px-52  ">
        <About />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Page;
