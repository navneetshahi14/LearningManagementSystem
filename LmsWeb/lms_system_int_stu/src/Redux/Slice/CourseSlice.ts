'use client'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


interface CourseInter {
    title:string
    description:string
    price:number
    category:string
    tag:string
    thumbnail:string
    lesson:[]

}

interface CourseState {
    course:CourseInter | null
    loading:boolean
    error:string | null
}

const token = localStorage.getItem('token')

const API_URL = 'http://localhost:6969/instructor'


export const createCourse = createAsyncThunk('course/create',async(datareq:CourseInter,{rejectWithValue})=>{
    try{

        console.log(token)
        const config = {
            headers:{
                "Content-Type":"application/json",
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }
        

        const {data} = await axios.post(`${API_URL}/createCourse`,datareq,config)

        return data.msg

    }catch(err){
        let errorMessage = "An unexpected error occurred"

        if(err instanceof AxiosError){
            errorMessage = err.response?.data || "Something went wrong"
        }else if(err instanceof Error){
            errorMessage = err.message
        }

        return rejectWithValue(errorMessage)
    }
})

export const AllCourse = createAsyncThunk(
    'course/InstructorCourse',
    async (_, { rejectWithValue }) => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
  
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const userId = user._id;
        if (!userId) {
          throw new Error('User ID not found');
        }
  
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        };
  
        const { data } = await axios.get(`${API_URL}/allCourse/${userId}`, config);
        console.log(data)
        return data;
      } catch (err) {
        let errorMessage = 'An unexpected error occurred';
  
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message || 'Something went wrong';
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }
  
        return rejectWithValue(errorMessage);
      }
    }
  );

const initialState : CourseState = {
    course:null,
    loading:false,
    error:null
}



const CourseSlice = createSlice({
    name:"course",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(createCourse.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(createCourse.fulfilled,(state,action)=>{
            state.loading = false
            state.course = action.payload
        })
        .addCase(createCourse.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload as string
        })
        .addCase(AllCourse.pending,(state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(AllCourse.fulfilled,(state,action)=>{
            state.loading = false
            state.course = action.payload
        })
        .addCase(AllCourse.rejected,(state,action)=>{
            state.loading = false
            state.error = action.payload as string
        })
    }
})


export default CourseSlice.reducer
