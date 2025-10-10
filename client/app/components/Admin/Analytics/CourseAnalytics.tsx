"use client";
import { useGetCoursesAnalyticsQuery } from "@/redux/feature/analytics/analyticsApi";
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  LabelList,
} from "recharts";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/styles";

type AnalyticsItem = {
  name?: string;
  uv?: number;
};

type CourseMonthAnalytics = {
  month: string;
  count: number;
};


const CourseAnalytics = () => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});

  const analyticsData: AnalyticsItem[] = [];

  if (data && data?.course?.last12Months) {
    data.course?.last12Months.forEach((item: CourseMonthAnalytics) => {
      analyticsData.push({ name: item.month, uv: item.count });
    });
  }

  const minValue: number = 0;
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen z-[1]">
          <div className="mt-[50px] ml-[50px]">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Courses Analytics
            </h1>
            <p className={`${styles.label} px-5`}>
              Last 12 months analytics data{" "}
            </p>
          </div>

          <div className="w-full h-[90%] flex items-center justify-center ">
            <ResponsiveContainer width={"90%"} height={"50%"}>
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position={"insideBottom"} />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey={"uv"} fill="#3faf82">
                  <LabelList dataKey={"uv"} position={"top"} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAnalytics;
