import { styles } from '@/app/styles/styles';
import { useEditLayoutMutation, useGetHerodataQuery } from '@/redux/feature/layout/layout';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineCamera } from 'react-icons/ai';

const EditHero = () => {
    const [image, setImages] = useState("");
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");

    const [editLayout, { isSuccess, error }] = useEditLayoutMutation()

    const { data,refetch } = useGetHerodataQuery("Banner", { refetchOnMountOrArgChange: true })

    useEffect(() => {
        if (data) {
            setTitle(data?.layout?.banner.title);
            setSubTitle(data?.layout?.banner.subTitle);
            setImages(data?.layout?.banner?.image?.url);
        }
        if (isSuccess) {
            refetch();
            toast.success("Hero updated successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as {data:{message:string}};
                toast.error(errorMessage?.data?.message);
            }
        }

    }, [data, isSuccess, error])

    const handleUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                if (reader.readyState === 2) {
                    if(typeof e.target?.result === "string"){
                        setImages((e.target.result as string));
                    }
                }
            }
            reader.readAsDataURL(file);
        }

    }

    const handleEdit = async () => {
        await editLayout({
            type: "Banner",
            image,
            title,
            subTitle,
        })
    }


    return (
        <>
            <div className="w-full relative lg:flex items-center">
                <div className="absolute top-[100px] lg:top-[82px] 2xl:top-[165px] 2xl:h-[400px] 2xl:w-[400px] lg:h-[500px] lg:w-[500px] h-[40vh] w-[40vw] hero_animation rounded-full flex items-center lg:ml-15 lg:mt-5 2xl:ml-20 "></div>
                <div className="lg:w-[40%] flex lg:min-h-screen items-center justify-end pt-[70px] lg:pt-0 z-10">
                    <div className="relative flex items-center justify-end">
                        <img src={image || "/image.png"} alt="" className='object-contain lg: mx-w-[90%] w-[90%] 2xl:max-w-[85%] h-auto z-[11] ' />
                        <input type="file" name="" id="banner" accept='image/*' onChange={handleUpdate} className='hidden' />
                        <label htmlFor="banner" className='absolute bottom-0 right-8 z-20'>
                            <AiOutlineCamera className='dark:text-white text-black text-[18px] cursor-pointer ' />
                        </label>
                    </div>
                </div>
                <div className="lg:w-[60%] flex flex-col items-center lg:mt-[0px] text-center lg:text-left mt-[150px]">
                    <textarea
                        className='dark:text-white resize-none text-[#000000c7] text-[30px] px-3 w-full lg:text-[60px] 2xl:text-[70px] font-[600] bg-transparent 2xl:!w-[75%] lg:!w-[74%]  '
                        placeholder="Improve Your Online Learning Experince Better Instanlty"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        rows={3}
                    />
                    <textarea
                        className='dark:text-white resize-none text-[#000000c7] text-[18px] px-3 w-full lg:text-[20px] 2xl:!w-[55%] lg:!w-[74%] bg-transparent font-[400] '
                        placeholder="Improve Your Online Learning Experince Better Instanlty"
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        rows={4}
                    />
                    <br />
                    <br />
                    <br />
                    <div className={`${styles.button} !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] ${data?.layout?.banner?.title !== title || data?.layout?.banner?.subTitle !== subTitle || data?.layout?.banner?.image?.url !== image ? "!cursor-pointer !bg-[#42d383]" : "!cursor-not-allowed"
                        } !rounded absolute bottom-12 right-12 `}
                        onClick={
                            data?.layout?.banner?.title !== title || data?.layout?.banner?.subTitle !== subTitle || data?.layout?.banner?.image?.url !== image ? handleEdit : () => null
                        }
                    >
                        Save
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditHero