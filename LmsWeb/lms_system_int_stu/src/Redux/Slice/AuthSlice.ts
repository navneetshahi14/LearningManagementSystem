'use client'
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";


interface User {
  email: string;
  password: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}


const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;

const API_URL = 'http://localhost:6969/auth'

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: User, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/login`, credentials);
      console.log(data)
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));

      return data.user;
    } catch (error: unknown) {
      let errorMessage = "An unexpected error occurred";

      if (error instanceof AxiosError) {
        errorMessage = error.response?.data || "Login failed";
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      return rejectWithValue(errorMessage);
    }
  }
);

export const registerUser = createAsyncThunk("auth/registerUser",async(credentials:User,{rejectWithValue})=>{
    try{
        
        const {data} = await axios.post(`${API_URL}/register`,credentials)
        
        console.log(data)
        localStorage.setItem("user",JSON.stringify(data.user))
        localStorage.setItem('token',JSON.stringify(data.token))

        return data

    }catch(error){
        let errorMessage = "An unexpected error occurred";

        if (error instanceof AxiosError) {
          errorMessage = error.response?.data || "Login failed";
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        return rejectWithValue(errorMessage);
    }
})

const initialState: AuthState = {
  user: user ? JSON.parse(user) : null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(registerUser.pending,(state)=>{
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled,(state,action)=>{
        state.loading = false
        state.user = action.payload
      })
      .addCase(registerUser.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload as string
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
