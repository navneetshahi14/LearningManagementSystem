/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../api/apiSlice";
import { userRegistration,userLoggedIn, userLoggedOut } from "./authSlice";

type RegistrationResponse = {
    message: string;
    token: string;
};

type RegistrationData = {
    name: string;
    email: string;
    password: string;
    // Add other required fields here
};

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "registration",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    
                    dispatch(
                        userRegistration({
                            token: result.data.token,
                        })
                    );
                } catch (err: any) {
                    console.error("Registration error:", err);
                }
            },
        }),
        activation: builder.mutation({
            query: ({ activation_token, activation_code }: { activation_token: string; activation_code: string }) => ({
                url: "activate-user",
                method: "POST",
                body: {
                    activation_token,
                    activation_code,
                },
            }),
        }),
        login: builder.mutation({
            query:({email,password})=>({
                url:"login",
                method:"POST",
                body:{
                    email,password
                },
                credentials:"include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user:result.data.user
                        })
                    );
                } catch (err: any) {
                    console.error("Registration error:", err);
                }
            },
        }),
        socialAuth: builder.mutation({
            query:({email,name,avatar})=>({
                url:"social-auth",
                method:"POST",
                body:{
                    email,name,avatar
                },
                credentials:"include" as const
            }),
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    
                    dispatch(
                        userLoggedIn({
                            accessToken: result.data.accessToken,
                            user:result.data.user
                        })
                    );
                } catch (err: any) {
                    console.error("Registration error:", err);
                }
            },
        }),
        logOut:builder.query({
            query:()=>({
                url:"logout",
                method:"GET",
                credentials:"include" as const,
            }),
            async onQueryStarted(arg,{ dispatch}){
                try{
                    
                    dispatch(
                        userLoggedOut()
                    );
                }catch(err:any){
                    console.log(err)
                }
            }
        })
    }),
});

export const { useRegisterMutation, useActivationMutation,useLoginMutation ,useSocialAuthMutation, useLogOutQuery } = authApi;
