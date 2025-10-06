/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { FC } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { AiOutlineDelete, AiOutlineMail } from 'react-icons/ai';
import { useTheme } from 'next-themes';
import Loader from '../../Loader/Loader';
import {format} from 'timeago.js';
import { useGetAllUsersQuery } from '@/redux/feature/user/userApi';

type Props = unknown

interface RowInter{
    id:string;
    name:string;
    email:string;
    role:string;
    courses:string;
    created_at:string;
}

const ManageTeams: FC<Props> = () => {
    const { theme } = useTheme()

    const { isLoading, data } = useGetAllUsersQuery({})

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "Name", flex: 0.5 },
        { field: "email", headerName: "Email", flex: .5 },
        { field: "role", headerName: "Role", flex: .5 },
        { field: "courses", headerName: "Purchased", flex: 0.5 },
        { field: "created_at", headerName: "Joined At", flex: 0.5 },
        {
            field: " ",
            headerName: "Delete",
            flex: 0.2,
            renderCell: () => {
                return (
                    <>
                        <Button>
                            <AiOutlineDelete
                                className='dark:text-white text-black'
                                size={20}
                            />
                        </Button>
                    </>
                )
            }
        },
        {
            field: " ",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params:any) => {
                return (
                    <>
                        <a
                            href={`mailto:${params.row.email}`}
                        >
                            <AiOutlineMail
                                className='dark:text-white text-black'
                                size={20}
                            />
                        </a>
                    </>
                )
            }
        },
    ]

    const rows:RowInter[] = []

    {
        data && data.course.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                created_at: format(item.createdAt)
            })
        })
    }


    return (
        <div className="mt-[120px]">
            <Box m="20px">
                {
                    isLoading ? (
                        <Loader />
                    ) : (
                        <Box
                            m={"40px 0 0 0"}
                            height={"80vh"}
                            sx={{
                                "& .MuiDataGrid-root": {
                                    border: "none",
                                },
                                "& .MuiDataGrid-cell": {
                                    borderBottom: "none",
                                    color: theme === "dark" ? "#ffffff" : "#000000",
                                },
                                "& .MuiDataGrid-columnHeader": {
                                    backgroundColor: theme === "dark" ? "#1f2937" : "#f0f0f0",
                                    borderBottom: "none",
                                },
                                "& .MuiDataGrid-columnHeaderTitle": {
                                    color: theme === "dark" ? "#ffffff" : "#000000",
                                    fontWeight: "bold",
                                },
                                "& .MuiDataGrid-virtualScroller": {
                                    backgroundColor: theme === "dark" ? "#111827" : "#ffffff",
                                },
                                "& .MuiDataGrid-footerContainer": {
                                    borderTop: "none",
                                    backgroundColor: theme === "dark" ? "#1f2937" : "#f0f0f0",
                                    color: theme === "dark" ? "#f0f0f0" : "#1f2937"
                                },
                                "& .MuiCheckbox-root": {
                                    color: `${theme === "dark" ? "#f0f0f0" : "#000"} !important`,
                                },
                                "& .MuiDataGrid-row": {
                                    color: theme === "dark" ? "#f0f0f0" : "#000",
                                    backgroundColor: theme === "dark" ? "#1e293b" : "#fff",
                                },
                                "& .MuiDataGrid-iconSeparator": {
                                    display: "none",
                                },
                                "& .MuiDataGrid-row:hover": {
                                    backgroundColor: theme === "dark" ? "#1e293b" : "#f0f0f0",
                                },
                                "& .MuiDataGrid-row:hover .MuiDataGrid-cell": {
                                    color: theme === "dark" ? "#ffffff" : "#1e293b",
                                },
                            }}

                        >
                            <DataGrid checkboxSelection rows={rows} columns={columns} />
                        </Box>
                    )
                }

            </Box>
        </div>
    )
}

export default ManageTeams;