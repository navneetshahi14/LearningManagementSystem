'use client';
import BackButton from '@/app/_components/BackButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createCourse } from '@/Redux/Slice/CourseSlice';
import { AppDispatch, RootState } from '@/Redux/store';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface CourseInformation {
    title: string;
    description: string;
    price: number;
    category: string;
    tag: string;
    thumbnail: string;
}

const NewCourse = () => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const { course, loading, error } = useSelector((state: RootState) => state.course);

    const [image, setImages] = useState("https://imgs.search.brave.com/mA3HLGx6Ebkn8MDRvppihZijovSzMKEXq6f8rDm4zuw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA5LzQwLzk4Lzc2/LzM2MF9GXzk0MDk4/NzY5M19wMzI5TjJk/RkNXN2pHN1lxdDNr/NUg5ZHhLb1lxS1NJ/US5qcGc");
    const [courseInfo, setCourseInfo] = useState<CourseInformation>({
        title: "",
        description: "",
        price: 0,
        category: "",
        tag: "",
        thumbnail: "",
    });
    const [uploading, setUploading] = useState(false);

    const getInformation = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCourseInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        console.log(image)
        if (!courseInfo.title || !courseInfo.description || !courseInfo.price || !courseInfo.category || !courseInfo.tag || !courseInfo.thumbnail) {
            alert("Please fill all the fields");
            return; 
        }

        const data = await dispatch(createCourse(courseInfo));
        console.log(data);
        console.log(course)
        console.log(error)
        if (data.payload === "Course Created") {
            router.push('/instructor');
        }
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setUploading(true);
            try {
                const url = await uploadimage(e.target.files[0]);
                setCourseInfo((prev) => ({ ...prev, thumbnail: url }));
                setImages(url);
            } catch (error) {
                console.error("Image upload failed:", error);
                alert("Image upload failed. Please try again.");
            } finally {
                setUploading(false);
            }
        }
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

    return (
        <div className="h-screen w-full">
            <BackButton topic="new course" />

            <div className="flex w-[100%] h-[100%] overflow-x-hidden overflow-y-auto">
                <div className="w-[100%] flex flex-col items-center gap-y-5 pt-6">
                    <div className="w-[80%]">
                        <Label>Title</Label>
                        <Input name="title" onChange={getInformation} placeholder="Title here ...." />
                    </div>
                    <div className="w-[80%]">
                        <Label>Description</Label>
                        <Input name="description" onChange={getInformation} placeholder="Description here ...." />
                    </div>
                    <div className="w-[80%]">
                        <Label>Price</Label>
                        <Input type="number" name="price" onChange={getInformation} placeholder="Price here ...." />
                    </div>
                    <div className="w-[80%] flex flex-col gap-2">
                        <Label>Category</Label>
                        <select
                            name="category"
                            value={courseInfo.category}
                            onChange={getInformation}
                            className="outline-0 border p-2 rounded"
                        >
                            <option value="" disabled>
                                Select your Category
                            </option>
                            <option value="coding">Coding</option>
                            <option value="study">Study</option>
                            <option value="blockchain">Blockchain</option>
                        </select>
                    </div>
                    <div className="w-[80%]">
                        <Label>tags</Label>
                        <Input name="tag" onChange={getInformation} type="text" placeholder="tag" />
                    </div>
                    <div className="w-[80%]">
                        <Label>Thumbnail</Label>
                        <Input type="file" name="thumbnail" onChange={handleFileChange} />
                    </div>
                    <Button
                        onClick={handleSubmit}
                        disabled={loading || uploading}
                        className="bg-blue-500 hover:bg-blue-800 text-white rounded shadow w-[50%] text-lg"
                    >
                        {loading || uploading ? "Uploading..." : "Add New Course"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default NewCourse;