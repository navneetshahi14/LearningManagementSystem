"use client";
import { useGetOrderAnalyticsQuery } from "@/redux/feature/analytics/analyticsApi";
import React, { useEffect, useState } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/styles";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetAllCoursesQuery } from "@/redux/feature/courses/courseApi";
import { useGetAllUsersQuery } from "@/redux/feature/user/userApi";

type Props = {
  isDashboard?: boolean;
};

type OrderAnalyticsItem = {
  name?: string;
  Count?: number;
};

type RawOrderItem = {
  month: string;
  count: number;
  userId: string;
  courseId: string;
};

type User = {
  _id: string;
  name: string;
  email: string;
};

type Course = {
  _id: string;
  name: string;
  price: number;
};

type EnrichedOrderItem = RawOrderItem & {
  userName?: string;
  userEmail?: string;
  title?: string;
  price?: string;
};

const OrderAnalytics = ({ isDashboard }: Props) => {
  const { data, isLoading } = useGetOrderAnalyticsQuery({});
  const { data: userData } = useGetAllUsersQuery({});
  const { data: courseData } = useGetAllCoursesQuery({});

  const [, setOrderData] = useState<EnrichedOrderItem[]>([]);

console.log(data)

  useEffect(() => {
    if (data) {
      const temp = data.order.last12Months.map((item: RawOrderItem) => {
        const user = userData?.users.find(
          (user: User) => user._id === item.userId
        );

        const course = courseData?.course.find(
          (course: Course) => course._id === item.courseId
        );
        return {
          ...item,
          userName: user?.name,
          userEmail: user?.email,
          title: course?.name,
          price: "$" + course?.price,
        };
      });
      setOrderData(temp);
    }
  }, [data, userData, courseData]);

  const analyticsData: OrderAnalyticsItem[] = [];

  if (data?.order?.last12Months) {
    data.order.last12Months.forEach((item: RawOrderItem) => {
      analyticsData.push({ name: item.month, Count: item.count });
    });
  }

  console.log(analyticsData)

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div
          className={isDashboard ? "h-[30vh] ml-[50px]" : "h-screen ml-[50px] "}
        >
          <div
            className={isDashboard ? "mt-[0px] pl-[40px] mb-2 " : " mt-[50px] "}
          >
            <h1
              className={`${styles.title} ${
                isDashboard && "!text-[20px]"
              } px-5 !text-start `}
            >
              Orders Analytics
            </h1>
            {!isDashboard && (
              <p className={`${styles.label} px-5`}>
                Last 12 months analytics data{" "}
              </p>
            )}
          </div>
          <div
            className={`w-full ${
              !isDashboard ? "h-[90vh]" : "h-full"
            } flex items-center justify-center`}
          >
            <ResponsiveContainer
              width={isDashboard ? "100%" : "90%"}
              height={isDashboard ? "100%" : "50%"}
            >
              <LineChart
                width={500}
                height={300}
                data={analyticsData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey={"name"} />
                <YAxis />
                <Tooltip />
                {!isDashboard && <Legend />}
                <Line type={"monotone"} dataKey={"Count"} stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderAnalytics;
