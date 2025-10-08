"use client";
import React, { FC, useEffect, useState } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrderAnalytics from "../Analytics/OrderAnalytics";
import AllInvoices from "../Orders/AllInvoices";
import {
  useGetOrderAnalyticsQuery,
  useGetUserAnalyticsQuery,
} from "@/redux/feature/analytics/analyticsApi";

type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />

      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidget: FC<Props> = ({ open, value }) => {
  const [orderComparePercentenge, setOrderComparePercentenge] = useState<any>();
  const [userComparePercentenge, setUserComparePercentenge] = useState<any>();

  const { data, isLoading } = useGetUserAnalyticsQuery({});

  const { data: orderData, isLoading: ordersLoading } =
    useGetOrderAnalyticsQuery({});

  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && orderData) {
        const last2Months = data.users.last12Months.slice(-2);
        console.log(orderData);
        const orderLast2Months = orderData.order.last12Months.slice(-2);

        if (last2Months.length === 2 && orderLast2Months.length === 2) {
          const UsercurrentMonth = last2Months[1].count;
          const userprevMonth = last2Months[0].count;
          const OrdercurrentMonth = orderLast2Months[1].count;
          const OrderPrevMonth = orderLast2Months[0].count;

          const userPercentChange =
            userprevMonth !== 0
              ? ((UsercurrentMonth - userprevMonth) / userprevMonth) * 100
              : 100;

          const OrderPercentChange =
            OrderPrevMonth !== 0
              ? ((OrdercurrentMonth - OrderPrevMonth) / OrderPrevMonth) * 100
              : 100;

          setUserComparePercentenge({
            currentMonth: UsercurrentMonth,
            previousMonth: userprevMonth,
            percentChange: userPercentChange,
          });

          setOrderComparePercentenge({
            currentMonth: OrdercurrentMonth,
            previousMonth: OrderPrevMonth,
            percentChange: OrderPercentChange,
          });
        }
      }
    }
  }, [isLoading, ordersLoading, data, orderData]);

  return (
    // <div className="mt-[30px] min-h-screen ">
    //   <div className="grid grid-cols-[75%,25%]">
    //     <div className="p-8">
    //       <UserAnalytics isDashboard={true} />
    //     </div>

    //     <div className="pt-[80px] pr-8">
    //       <div className="w-full dark:bg-[#111C43] rounded-sm shadow ">
    //         <div className="flex items-center justify-between p-5">
    //           <div className="">
    //             <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px] " />
    //             <h5 className="pt-2 font-poppins dark:text-[#fff] text-black text-[20px] ">
    //               {orderComparePercentenge?.currentMonth}
    //             </h5>
    //             <h5 className="py-2 font-poppins dark:text-[#45CBA0] text-black text-[20px] font-[400] ">
    //               Sales Obtained
    //             </h5>
    //           </div>
    //           <div>
    //             <CircularProgressWithLabel
    //               value={orderComparePercentenge?.percentChange > 0 ? 100 : 0}
    //               open={open}
    //             />
    //             <h5 className="text-center pt-4">
    //               {orderComparePercentenge?.percentChange > 0
    //                 ? "+" + orderComparePercentenge?.percentChange.toFixed(2)
    //                 : "-" + orderComparePercentenge?.percentChange.toFixed(2)}
    //               %
    //             </h5>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="w-full dark:bg-[#111C43] rounded-sm shadow my-8 ">
    //         <div className="flex items-center justify-between p-5">
    //           <div className="">
    //             <PiUsersFourLight className="dark:text-[#45CBA0] text-[#000] text-[30px] " />
    //             <h5 className="pt-2 font-poppins dark:text-[#fff] text-black text-[20px] ">
    //               {userComparePercentenge?.currentMonth}
    //             </h5>
    //             <h5 className="py-2 font-poppins dark:text-[#45CBA0] text-black text-[20px] font-[400] ">
    //               New Users
    //             </h5>
    //           </div>

    //           <div>
    //             <CircularProgressWithLabel
    //               value={userComparePercentenge?.percentChange > 0 ? 100 : 0}
    //               open={open}
    //             />
    //             <h5 className="text-center pt-4">
    //               {userComparePercentenge?.percentChange > 0
    //                 ? "+" + userComparePercentenge?.percentChange.toFixed(2)
    //                 : "-" + userComparePercentenge?.percentChange.toFixed(2)}
    //               %
    //             </h5>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   <div className="grid grid-cols-[65%,35%] mt-[-20px] ">
    //     <div className="dark:bg-[#111c43] w-[94%] mt-[30px] h-[40vh] shadow-sm m-auto  ">
    //       <OrderAnalytics isDashboard={true} />
    //     </div>
    //     <div className="p-5">
    //       <h5 className="dark:text-[#fff] text-black text-[20px] font-[400] font-poppins pb-3 ">
    //         Recent Transactions
    //       </h5>

    //       <AllInvoices isDashboard={true} />
    //     </div>
    //   </div>
    // </div>


    <div className="mt-[30px] min-h-screen w-full px-6">
      {/* ---------- Top Section: User Analytics + Cards ---------- */}
      <div className="grid grid-cols-2 lg:grid-cols-[75%,25%] gap-6 items-start">
        {/* Left: User Analytics */}
        <div className="p-4 bg-[#111C43] rounded-lg shadow-sm">
          <UserAnalytics isDashboard={true} />
        </div>

        {/* Right: Stats Cards */}
        <div className="flex flex-col gap-6">
          {/* Sales Obtained */}
          <div className="w-full bg-[#111C43] rounded-lg shadow p-5 flex items-center justify-between">
            <div>
              <BiBorderLeft className="text-[#45CBA0] text-[30px]" />
              <h5 className="pt-2 font-poppins text-white text-[22px] font-semibold">
                {orderComparePercentenge?.currentMonth ?? 0}
              </h5>
              <p className="py-2 font-poppins text-[#45CBA0] text-[18px] font-medium">
                Sales Obtained
              </p>
            </div>
            <div className="text-center">
              <CircularProgressWithLabel
                value={orderComparePercentenge?.percentChange > 0 ? 100 : 0}
                open={open}
              />
              <h5 className="pt-4 text-[16px] text-white">
                {orderComparePercentenge
                  ? `${orderComparePercentenge?.percentChange > 0 ? "+" : ""}${orderComparePercentenge?.percentChange.toFixed(
                      2
                    )}%`
                  : "0%"}
              </h5>
            </div>
          </div>

          {/* New Users */}
          <div className="w-full bg-[#111C43] rounded-lg shadow p-5 flex items-center justify-between">
            <div>
              <PiUsersFourLight className="text-[#45CBA0] text-[30px]" />
              <h5 className="pt-2 font-poppins text-white text-[22px] font-semibold">
                {userComparePercentenge?.currentMonth ?? 0}
              </h5>
              <p className="py-2 font-poppins text-[#45CBA0] text-[18px] font-medium">
                New Users
              </p>
            </div>
            <div className="text-center">
              <CircularProgressWithLabel
                value={userComparePercentenge?.percentChange > 0 ? 100 : 0}
                open={open}
              />
              <h5 className="pt-4 text-[16px] text-white">
                {userComparePercentenge
                  ? `${userComparePercentenge?.percentChange > 0 ? "+" : ""}${userComparePercentenge?.percentChange.toFixed(
                      2
                    )}%`
                  : "0%"}
              </h5>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Bottom Section: Orders Analytics + Transactions ---------- */}
      <div className="grid grid-cols-2 lg:grid-cols-[65%,35%] gap-6 mt-10">
        {/* Orders Analytics */}
        <div className="bg-[#111C43] rounded-lg shadow-sm p-5 h-[45vh]">
          <OrderAnalytics isDashboard={true} />
        </div>

        {/* Recent Transactions */}
        <div className="bg-[#111C43] rounded-lg shadow-sm p-5">
          <h5 className="text-white text-[20px] font-poppins font-semibold mb-4">
            Recent Transactions
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidget;
