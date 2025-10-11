/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/feature/courses/courseApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/styles";
import toast from "react-hot-toast";
import Link from "next/link";

type Props = unknown;

interface RowInter {
  id: string;
  title: string;
  ratings: number;
  purchased: number;
  created_at: string;
}

const AllCourses: FC<Props> = () => {
  const { theme } = useTheme();

  const { isLoading, data, refetch } = useGetAllCoursesQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  console.log(data)
  const [courseId, setCourseId] = useState();
  const [open, setOpen] = useState(false);
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.5 },
    { field: "purchased", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setCourseId(params.rows.id);
              }}
            >
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
          <div className="h-full w-full flex items-center justify-center">
            <Link className="" href={`/admin/edit-course/${params.row.id}`}>
              <FiEdit2 className="dark:text-white text-black m-auto" size={18} />
            </Link>            
          </div>
          </>
        );
      },
    },
  ];

  const rows: RowInter[] = [];

  {
    // console.log(data)
    data &&
      data.course.forEach((item: any) => {
        rows.push({
          id: item._id,
          title: item.name,
          ratings: item.ratings,
          purchased: item.purchased,
          created_at: format(item.createdAt),
        });
      });
  }

  useEffect(() => {
    if (isSuccess) {
      refetch();
      setOpen(!open);
      toast.success("Course Deleted Successfully");
    }
    if (error) {
      const errorMessage = error as any;
      toast.error(errorMessage.data.message);
    }
  }, [isSuccess, error]);

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  return (
    <div className=" z-[1]">
      <Box m="20px" paddingLeft={10}>
        {isLoading ? (
          <Loader />
        ) : (
          <Box
            m={"40px 0 0 0"}
            height={"80vh"}
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
                  backgroundColor: theme === "dark" ? "#3E4396 !important" : "#A4A9FC !important",
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
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
        )}
        {open && (
          <Modal
            open={open}
            onClose={() => setOpen(!open)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-[#1e293b] flex flex-col justify-center items-center rounded-xl p-2 ">
              <h1 className={`${styles.title}`}>
                Are you sure you want to delete this course?
              </h1>
              <div className="flex w-full items-center justify-between mb-6 mt-2 px-10">
                <div
                  className={`${styles.button} !w-[120px] h-[30px] bg-[#57c7a3]`}
                  onClick={() => setOpen(!open)}
                >
                  Cancel
                </div>
                <div
                  className={`${styles.button} !w-[120px] h-[30px] bg-[red]`}
                  onClick={handleDelete}
                >
                  Delete
                </div>
              </div>
            </Box>
          </Modal>
        )}
      </Box>
    </div>
  );
};

export default AllCourses;
