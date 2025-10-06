'use client'
import { useGetOrderAnalyticsQuery } from "@/redux/feature/analytics/analyticsApi";
import React, { useEffect } from "react";
import Loader from "../../Loader/Loader";
import { styles } from "@/app/styles/styles";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// const analyticsData = [
//   {
//     name: "Page A",
//     Count: 4000,
//   },
//   {
//     name: "Page B",
//     Count: 3000,
//   },
//   {
//     name: "Page C",
//     Count: 5000,
//   },
//   {
//     name: "Page D",
//     Count: 1000,
//   },
//   {
//     name: "Page E",
//     Count: 4000,
//   },
//   {
//     name: "Page F",
//     Count: 800,
//   },
//   {
//     name: "Page G",
//     Count: 200,
//   },
// ];

type Props = {
  isDashboard?: boolean;
};

const OrderAnalytics = ({ isDashboard }: Props) => {
  const { data,isLoading } = useGetOrderAnalyticsQuery({});

  useEffect(() => {}, []);

  const analyticsData: any = [];

  console.log(data)
  data &&
    data.order.last12Months.forEach((item: any) => {
      analyticsData.push({ name: item.name, Count: item.Count });
    });
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={isDashboard ? "h-[30vh] ml-[50px]" : "h-screen ml-[50px] "}>
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
          <div className={`w-full ${!isDashboard ? "h-[90vh]": "h-full"} flex items-center justify-center`}>
            <ResponsiveContainer 
                width={isDashboard ? "100%" : "90%"}
                height={isDashboard ? "100%" : "50%"}
            >
                <LineChart
                    width={500}
                    height={300}
                    data={analyticsData}
                    margin={{
                        top:5,
                        right:30,
                        left:20,
                        bottom:5
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
