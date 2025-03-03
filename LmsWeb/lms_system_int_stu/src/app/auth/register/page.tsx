'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { registerUser } from '@/Redux/Slice/AuthSlice';
import { AppDispatch, RootState } from '@/Redux/store';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface UserState {
    name: string;
    email: string;
    password: string;
    profilePic: string;
    role: string;
}

const Register = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { user, loading, error } = useSelector((state: RootState) => state.auth);
    const [image, setImages] = useState("https://imgs.search.brave.com/mA3HLGx6Ebkn8MDRvppihZijovSzMKEXq6f8rDm4zuw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzQwLzk4Lzc2/LzM2MF9GXzk0MDk4/NzY5M19wMzI5TjJk/RkNXN2pHN1lxdDNr/NUg5ZHhLb1lxS1NJ/US5qcGc");
    const [users, setUsers] = useState<UserState>({
        name: '',
        email: '',
        password: '',
        profilePic: '',
        role: '',
    });
    const [uploading, setUploading] = useState(false);

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
      setMounted(true)
    }, [])
  

    useEffect(() => {
        if (mounted) {
          const storedUser = localStorage.getItem("user") || ""
          let role = ""
          try {
            role = JSON.parse(storedUser)?.role || ""
          } catch (error) {
            console.error("Failed to parse user data from localStorage:", error)
          }
          if (user !== null || storedUser) {
            if (role === "instructor") {
              router.replace('/instructor')
            } else if (role === "") {
              router.replace('/auth/register')
            } else {
              router.replace('/course')
            }
          }
        }
      }, [user, router, mounted])
    

    const getUserDetails = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUsers((prevUser) => ({ ...prevUser, [name]: value }));
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(image)
        if (e.target.files && e.target.files[0]) {
            setUploading(true);
            try {
                const url = await uploadimage(e.target.files[0]);
                setUsers((prevUser) => ({ ...prevUser, profilePic: url }));
                setImages(url);
            } catch (error) {
                console.error("Image upload failed:", error);
                alert("Image upload failed. Please try again.");
            } finally {
                setUploading(false);
            }
        }
    };

    const handleSubmit = async () => {
        if (!users.email || !users.password || !users.name || !users.role) {
            alert("Please fill all fields");
            return;
        }

        dispatch(registerUser(users));
    };

    const uploadimage = async (pics: File): Promise<string> => {
        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', "Ecomapplication");
            data.append("cloud_name", "dfr6qnt6a");
            const res = await fetch("https://api.cloudinary.com/v1_1/dfr6qnt6a/image/upload", {
                method: "post",
                body: data,
            });

            const resdata = await res.json();
            return resdata.url.toString();
        } else {
            throw new Error("Invalid image format. Please upload a JPEG or PNG file.");
        }
    };

    const isFormValid = users.name && users.email && users.password && users.role && users.profilePic;

    if (!mounted) {
        return null // Return null or a loading spinner during SSR
    }

    return (
        <div className="h-screen w-full p-3 overflow-hidden flex justify-center items-center">
            <div className="w-[30vw] h-[100%] border-r-2 mr-2 border-[#999] flex flex-col justify-center rounded py-5">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold uppercase">ElevateX</h1>
                    <h1 className="text-xl uppercase">Sign up</h1>
                </div>
                <div className="mt-10 flex justify-center items-center">
                    <Button variant={'outline'} className="rounded">
                        <Image src={'/google.svg'} alt="google" height={30} width={30} /> Sign Up with Google
                    </Button>
                </div>
                <div className="text-sm text-[#999] my-4 text-center flex justify-center items-center relative">
                    <h1 className="bg-white z-[10] w-[50%]">Or signUp using Email</h1>
                    <div className="absolute w-[80%] bg-[#999] z-[1] top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] h-[1px]"></div>
                </div>
                <div className="w-full h-auto p-2 flex flex-col justify-center items-center gap-3">
                    <div className="grid w-[80%] max-w-sm items-center gap-1.5">
                        <Label className="text-sm pl-5 uppercase font-semibold" htmlFor="user">
                            UserName
                        </Label>
                        <Input
                            name="name"
                            type="text"
                            id="user"
                            placeholder="Type......"
                            className="rounded"
                            onChange={getUserDetails}
                        />
                    </div>
                    <div className="grid w-[80%] max-w-sm items-center gap-1.5">
                        <Label className="text-sm pl-5 uppercase font-semibold" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            name="email"
                            type="email"
                            id="email"
                            placeholder="Type......"
                            className="rounded"
                            onChange={getUserDetails}
                        />
                    </div>
                    <div className="grid w-[80%] max-w-sm items-center gap-1.5">
                        <Label className="text-sm pl-5 uppercase font-semibold" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            name="password"
                            type="password"
                            id="password"
                            placeholder="Type......"
                            className="rounded"
                            onChange={getUserDetails}
                        />
                    </div>
                    <div className="grid w-[80%] max-w-sm items-center gap-1.5">
                        <Label className="text-sm pl-5 uppercase font-semibold" htmlFor="profile">
                            Profile Photo
                        </Label>
                        <Input
                            name="profilePic"
                            type="file"
                            id="profile"
                            className="rounded"
                            onChange={handleFileChange}
                        />
                    </div>
                    <div className="grid w-[80%] max-w-sm items-center gap-1.5">
                        <Label className="text-sm pl-5 uppercase font-semibold" htmlFor="role">
                            Role
                        </Label>
                        <select
                            name="role"
                            id="role"
                            value={users.role}
                            onChange={getUserDetails}
                            className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="" disabled>
                                Select your role
                            </option>
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                        </select>
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || uploading || !isFormValid}
                        className="bg-blue-700 text-white text-xl rounded w-[70%] mt-3 hover:bg-blue-900 uppercase"
                    >
                        {loading || uploading ? "Registering....." : "Register"}
                    </Button>
                    <h2 className="text-start w-[80%]">
                        Already have Account{' '}
                        <span onClick={() => router.replace('/auth/login')} className="text-blue-600 cursor-pointer">
                            Login
                        </span>
                    </h2>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
            </div>
            <div className="w-[50vw] h-[100%] flex justify-end items-center overflow-hidden">
                <Image src={'/login.png'} alt="ElevateX" width={800} height={1000} />
            </div>
        </div>
    );
};

export default Register;