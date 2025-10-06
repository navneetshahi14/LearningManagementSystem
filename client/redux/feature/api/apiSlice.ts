/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { userLoggedIn } from '../auth/authSlice'

export const apiSlice = createApi({
    reducerPath:"api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    }),
    endpoints:(builder) =>({
        refreshToken:builder.query({
            query:(data)=>({
                url:"refresh",
                method:"GET",
                credentials:"include" as const
            })
        }),
        loadUser:builder.query({
            query:(data)=>({
                url:"me",
                method:"GET",
                credentials:"include" as const
            }),
            async onQueryStarted(arg,{ queryFulfilled,dispatch}){
                try{
                    const result = await queryFulfilled
                    dispatch(
                        userLoggedIn({
                            accessToken:result.data.accessToken,
                            user:result.data.user
                        })
                    )

                }catch(err:any){
                    console.log(err)
                }
            }
        })
    }),
})



export const {useRefreshTokenQuery,useLoadUserQuery} = apiSlice;