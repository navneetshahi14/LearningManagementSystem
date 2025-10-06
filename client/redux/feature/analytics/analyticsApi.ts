import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCoursesAnalytics: builder.query({
            query: () =>({
                url: 'get-course-analytics',
                method: 'GET',
                credentials:'include' as const
            })
        }),
        getOrderAnalytics: builder.query({
            query: () =>({
                url: 'get-order-analytics',
                method: 'GET',
                credentials:'include' as const
            })
        }),
        getUserAnalytics: builder.query({
            query: () =>({
                url: 'get-user-analytics',
                method: 'GET',
                credentials:'include' as const
            })
        }),
    })
})


export const { useGetCoursesAnalyticsQuery,useGetUserAnalyticsQuery,useGetOrderAnalyticsQuery } = analyticsApi