"use client";
import Rating from "@/app/utils/Rating";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { Category } from "../Admin/Course/CourseInformation";

type Props = {
  item: CourseItem;
  isProfile?: boolean;
  user?: userItem;
};

// type Item = {
//   _id?: string;
//   name?: string;
//   rating: number;
//   thumbnail: thumbnailItem;
//   purchased?: number;
//   price?: number;
//   estimatedPrice?: number;
//   courseData?: [];
// };

export type CourseItem = {
  _id?: string;
  name: string;
  description?: string;
  categories?: Category;
  price?: number;
  estimatedPrice?: number;
  thumbnail?: thumbnailItem;
  tags?: string;
  level?: string;
  demoUrl?: string;
  benifits?: {title:string}[];
  prerequisites?: {title:string}[];
  reviews: reviewsItem[];
  courseData?: courseDataItem[];
  ratings?: number;
  purchased?: number;
  createdAt?: Date;
};

export type courseDataItem = {
  _id?: string;
  title: string;
  description: string;
  videoUrl: string;
  // videoThumbnail: {};
  videoSection: string;
  videoLength: number;
  videoPlayer: string;
  links: [
    {
      title: string;
      url: string;
    }
  ];
  suggestion: string;
  question: commentItem[];
};

type commentItem = {
  user: userItem;
  question: string;
  questionReplies: commentItem[];
};

type thumbnailItem = {
  url: string;
};

export type reviewsItem = {
  _id: string;
  user: userItem;
  rating: number;
  comment: string;
  commentReplies: CommentReplyItem[];
  createdAt: Date;
};

export type CommentReplyItem = {
  user:userItem
  comment:string
  createdAt:Date
}

export type userItem = {
  _id: string;
  name: string;
  email: string;
  password?: string;
  avatar: thumbnailItem;
  role: string;
  isVerified: boolean;
  courses: { courseId: string }[];
};

const CourseCard: FC<Props> = ({ item, isProfile }) => {
  return (
    <Link
      href={!isProfile ? `/course/${item._id}` : `course-access/${item._id}`}
    >
      <div className="w-full min-h-[35vh] overflow-hidden dark:bg-slate-700 dark:bg-opacity-20 backdrop-blur border dark:border-[#ffffff1d] border-[#00000015] rounded-lg p-3 shadow-sm dark:shadow-inner ">
        <Image
          src={item?.thumbnail?.url || ""}
          width={500}
          height={300}
          objectFit="contain"
          className="rounded-lg "
          alt=""
        />
        <br />
        <h1 className="font-poppins text-[16px] text-black dark:text-[#fff] ">
          {item.name}
        </h1>
        <div className="flex w-full items-center justify-between pt-2">
          <Rating rating={item.ratings || 0} />
          <h5
            className={`text-black dark:text-[#fff] ${
              isProfile && "hidden md:inline"
            } `}
          >
            {item.purchased} Students
          </h5>
        </div>
        <div className="w-full flex items-center justify-between pt-3">
          <div className="flex">
            <h3 className="text-black dark:text-white">
              {item.price === 0 ? "Free" : item.price + "$"}
            </h3>
            <h5 className="pl-3 text-[14px] mt-[-5px] line-through opacity-80 text-black dark:text-[#fff] ">
              {item.estimatedPrice}$
            </h5>
          </div>
          <div className="flex items-center p-3">
            <AiOutlineUnorderedList size={20} fill="#fff" />
            <h5 className="pl-2 text-black dark:text-[#fff]">
              {item.courseData?.length} Lecture
            </h5>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
