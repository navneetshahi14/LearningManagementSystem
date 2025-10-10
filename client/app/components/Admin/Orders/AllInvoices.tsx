import { useGetAllCoursesQuery } from "@/redux/feature/courses/courseApi";
import { useGetAllOrdersQuery } from "@/redux/feature/orders/ordersApi";
import { useGetAllUsersQuery } from "@/redux/feature/user/userApi";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { format } from "timeago.js";
import Loader from "../../Loader/Loader";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

type Props = {
  isDashboard?: boolean;
};

type Order = {
  _id: string;
  userId: string;
  courseId: string;
  createdAt: string;
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

type InvoiceRow = {
  id:string
  _id: string;
  userName?: string;
  userEmail?: string;
  title?: string;
  price?: string;
  createdAt: string;
};

const AllInvoices = ({ isDashboard }: Props) => {
  const { theme } = useTheme();
  const { isLoading, data } = useGetAllOrdersQuery({});
  const { data: userData } = useGetAllUsersQuery({});
  const { data: courseData } = useGetAllCoursesQuery({});

  const [orderData, setOrderData] = useState<InvoiceRow[]>([]);

  useEffect(() => {
    if (data) {
      const temp: InvoiceRow[] = data.order.map((item: Order) => {
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

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "created_at", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: { row: InvoiceRow }) => {
              return (
                <a
                  className="h-full py-auto flex items-center justify-center"
                  href={`mailto:${params.row.userEmail}`}
                >
                  <AiOutlineMail
                    className="dark:text-white text-black"
                    size={20}
                  />
                </a>
              );
            },
          },
        ]),
  ];

  const rows: InvoiceRow[] = [];

  if (orderData) {
    orderData.forEach((item) => {
      rows.push({
        id: item._id,
        _id: item._id,
        userName: item.userName,
        userEmail: item.userEmail,
        title: item.title,
        price: item.price,
        createdAt: format(item?.createdAt),
      });
    });
  }
  return (
    <div className={!isDashboard ? "mt-[0px]" : "mt-[10px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "90vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30 !important"
                    : "1px solid #ccc !important",
              },
              "& .MuiDataGrid-row.Mui-hovered, & .MuiDataGrid-row:hover, & .MuiDataGrid-row.Mui-selected, & .MuiDataGrid-row.Mui-selected:hover, & .MuiDataGrid-row.Mui-hovered.Mui-selected, & .MuiDataGrid-row--selected":
                {
                  backgroundColor: "transparent !important",
                },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeader": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom: "none",
                backgroundColor:
                  theme === "dark"
                    ? "#3E4396 !important"
                    : "#A4A9FC !important",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3E4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid
              checkboxSelection={isDashboard ? false : true}
              rows={rows}
              columns={columns}
              // components = {isDashboard ? {} : { Toolbar:GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
