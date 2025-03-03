'use client'

import Header from "@/app/_components/Header";

import FirstContainer from "./_components/FirstContainer";
import SecondContainer from "./_components/SecondContainer";
import ThirdContainer from "./_components/ThirdContainer";


export default function Home() {


  return (
    <>
      <div className="h-screen w-full bg-[#444]">
        <Header />
        <FirstContainer/>
        <SecondContainer />
        <ThirdContainer />
      </div>
    </>
  );
}
