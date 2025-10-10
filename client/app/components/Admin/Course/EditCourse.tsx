"use client";
import React, { FC, useEffect, useState } from "react";
import CourseInformation, { CourseInfo } from "../../../../app/components/Admin/Course/CourseInformation";
import CourseOptions from "../../../../app/components/Admin/Course/CourseOptions";
import CourseData from "../CourseData";
import CourseContent from "../CourseContent";
import CoursePreview from "../CoursePreview";
import { useEditCourseMutation, useGetAllCoursesQuery } from "@/redux/feature/courses/courseApi";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import DashboardHero from "../DashboardHero";

type Props = {
    id:string;
};

const EditCourse:FC<Props> = ({id}) => {

  const { data } = useGetAllCoursesQuery({},{refetchOnMountOrArgChange:true})
  const [editCourse,{isSuccess,error}] = useEditCourseMutation({})
  const editCourseData = data && data.course.find((i:CourseInfo) => i._id === id)


  useEffect(()=>{
    if(isSuccess){
      toast.success("Course create successfully")
      redirect('/admin/courses')
    }
    if(error){
      if("data" in error){
        const errormessage = error as {data:{message:string}}
  
        toast.error(errormessage.data.message)
  
      }
    }


  },[isSuccess,error])

useEffect(()=>{
    if(editCourseData){
        setCourseInfo({
            name: editCourseData.name,
            description: editCourseData.description,
            price: editCourseData.price,
            estimatedPrice: editCourseData.estimatedPrice,
            tags: editCourseData.tags,
            level: editCourseData.level,
            demoUrl: editCourseData.demoUrl,
            thumbnail: editCourseData?.thumbnail?.url,
            categories: editCourseData?.categories
        })
        setbenifits(editCourseData.benifits)
        setPrerequisites(editCourseData.prerequisites)
        setCourseContentData(editCourseData.courseData)
    }
},[editCourseData])

  const [active, setActive] = useState(0);
  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    name: "",
    description: "",
    price: "",
    estimatedPrice: "",
    tags: "",
    level: "",
    demoUrl: "",
    thumbnail: "",
    categories: ""
  });

  const [benifits, setbenifits] = useState([{ title: "" }]);
  const [prerequisites, setPrerequisites] = useState([{ title: "" }]);
  const [courseContentData, setCourseContentData] = useState([
    {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: "Untitled Section",
      links: [
        {
          title: "",
          url: "",
        },
      ],
      suggestion: "",
    },
  ]);
  const [courseData, setCourseData] = useState({});

  const handleSubmit = async () => {
    // format benifits array
    const formattedbenifits = benifits.map((benefit) => ({
      title: benefit.title,
    }));

    const formattedPrerequisites = prerequisites.map((prerequisite) => ({
      title: prerequisite.title,
    }));

    const formattedCourseContentData = courseContentData.map(
      (courseContent) => ({
        videoUrl: courseContent.videoUrl,
        title: courseContent.title,
        description: courseContent.description,
        videoSection: courseContent.videoSection,
        links: courseContent.links.map((link) => ({
          title: link.title,
          url: link.url,
        })),
        suggestion: courseContent.suggestion,
      })
    );

    const data = {
      name: courseInfo.name,
      description: courseInfo.description,
      price: courseInfo.price,
      estimatedPrice: courseInfo.estimatedPrice,
      tags: courseInfo.tags,
      thumbnail: courseInfo.thumbnail,
      level: courseInfo.level,
      demoUrl: courseInfo.demoUrl,
      totalVideos: courseContentData.length,
      benifits: formattedbenifits,
      prerequisites: formattedPrerequisites,
      courseData: formattedCourseContentData,
    };

    setCourseData(data);
  };

  const handleCourseCreate = async () =>{
    const data = courseData
    await editCourse({id:editCourseData._id,data})
  }

  return (
    <div className="w-full flex min-h-screen">
      <DashboardHero />
      <div className="w-[80%]">
        {active === 0 && (
          <CourseInformation
            courseInfo={courseInfo}
            setCourseInfo={setCourseInfo}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 1 && (
          <CourseData
            benifits={benifits}
            setbenifits={setbenifits}
            prerequisites={prerequisites}
            setPrerequisites={setPrerequisites}
            active={active}
            setActive={setActive}
          />
        )}
        {active === 2 && (
          <CourseContent
            active={active}
            setActive={setActive}
            courseContentData={courseContentData}
            setCourseContentData={setCourseContentData}
            handleSubmit={handleSubmit}
          />
        )}
        {active === 3 && <CoursePreview 
            active={active}
            setActive={setActive}
            courseData={courseData}
            handleCourseCreate={handleCourseCreate}
            isEdit = {true}
        />}
      </div>
      <div className="w-[20%] mt-[100px] h-screen fixed z-[1] top-18 right-0 ">
        <CourseOptions active={active} setActive={setActive} />
      </div>
    </div>
  );
};

export default EditCourse;
