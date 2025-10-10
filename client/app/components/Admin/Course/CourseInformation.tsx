import { styles } from "@/app/styles/styles";
import { useGetHerodataQuery } from "@/redux/feature/layout/layout";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {
  courseInfo: CourseInfo;
  setCourseInfo: (courseInfo: CourseInfo) => void;
  active: number;
  setActive: (active: number) => void;
};

export type CourseInfo = {
  _id?: string;
  name: string;
  description: string;
  price?: number | string;
  estimatedPrice?: number | string;
  tags: string;
  categories: string;
  level: string;
  demoUrl: string;
  thumbnail: string | null;
};

export type Category = {
  _id: string;
  title: string;
};

const CourseInformation: React.FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHerodataQuery("Categories", {});

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (data) {
      setCategories(data?.layout?.categories);
    }
  }, [data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState) {
          if (typeof reader.result === "string") {
            setCourseInfo({ ...courseInfo, thumbnail: reader.result });
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState) {
          if (typeof reader.result === "string") {
            setCourseInfo({ ...courseInfo, thumbnail: reader.result });
          }
        }
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="w-[80%] m-auto mt-24 ">
        <form onSubmit={handleSubmit} className={`${styles.label}`}>
          <div>
            <label htmlFor="">Course Name</label>
            <input
              type="name"
              name=""
              id="name"
              required
              value={courseInfo.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setCourseInfo({ ...courseInfo, name: e.target.value })
              }
              placeholder="MERN stack LMS platform with next 15"
              className={`${styles.input}`}
            />
          </div>
          <br />
          <div className="mb-5">
            <label htmlFor="" className={`${styles.label}`}>
              Course Description
            </label>
            <textarea
              name=""
              id=""
              cols={30}
              rows={8}
              placeholder="Write something amazing ......"
              className={`${styles.input} !h-min !py-2`}
              value={courseInfo.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setCourseInfo({ ...courseInfo, description: e.target.value })
              }
            ></textarea>
          </div>
          <br />
          <div className="w-full flex justify-between ">
            <div className="w-[45%]">
              <label htmlFor="" className={`${styles.label}`}>
                Course Price
              </label>
              <input
                type="number"
                name=""
                required
                value={courseInfo.price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCourseInfo({ ...courseInfo, price: e?.target?.value })
                }
                id="price"
                placeholder="29"
                className={`${styles.input}`}
              />
            </div>
            <div className="w-[45%]">
              <label htmlFor="" className={`${styles.label}`}>
                Estimated Price(optional)
              </label>
              <input
                type="number"
                name=""
                required
                value={courseInfo.estimatedPrice}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCourseInfo({
                    ...courseInfo,
                    estimatedPrice: e.target.value,
                  })
                }
                id="price"
                placeholder="79"
                className={`${styles.input}`}
              />
            </div>
          </div>
          <br />
          <div className="w-full flex justify-between">
            <div className="w-[45%]">
              <label htmlFor="" className={`${styles.label}`}>
                Course Tags
              </label>
              <input
                type="text"
                required
                name=""
                value={courseInfo.tags}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCourseInfo({ ...courseInfo, tags: e.target.value })
                }
                id="tags"
                placeholder="MERN,Next 14,Socket io,tailwind css,LMS"
                className={`${styles.input}`}
              />
            </div>
            <div className="w-[50%]">
              <label htmlFor="" className={`${styles.label}`}>
                Course Categories
              </label>
              <select
                name=""
                id=""
                className={`${styles.input}`}
                value={courseInfo.categories}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setCourseInfo({ ...courseInfo, categories: e.target.value })
                }
              >
                <option value="">Select Categories</option>
                {categories.map((item) => (
                  <option value={item._id} key={item._id}>
                    {item.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-full flex justify-between">
            <div className="w-[45%]">
              <label htmlFor="" className={`${styles.label}`}>
                Course Level
              </label>
              <input
                type="text"
                name=""
                value={courseInfo.level}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCourseInfo({ ...courseInfo, level: e.target.value })
                }
                id="level"
                placeholder="Beginner/Intermediate/Expert"
                className={`${styles.input}`}
              />
            </div>
            <div className="w-[50%]">
              <label htmlFor="" className={`${styles.label}`}>
                Demo Url
              </label>
              <input
                type="text"
                name=""
                required
                value={courseInfo.demoUrl}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setCourseInfo({ ...courseInfo, demoUrl: e.target.value })
                }
                id="demoUrl"
                placeholder="eer74fd"
                className={`${styles.input}`}
              />
            </div>
          </div>
          <br />
          <div className="w-full mb-5">
            <input
              type="file"
              accept="image/*"
              id="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file"
              className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${
                dragging ? "bg-blue-500" : "bg-transparent"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {courseInfo.thumbnail ? (
                <Image
                  src={courseInfo.thumbnail}
                  alt=""
                  className="max-h-full w-full object-cover"
                />
              ) : (
                <span className="text-black dark:text-white">
                  Drag and Drop your thumbnail here or click to browser
                </span>
              )}
            </label>
          </div>

          <br />
          <div className="w-full flex items-center justify-end">
            <input
              type="submit"
              value={"Next"}
              className="w-full md:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer "
            />
          </div>
          <br />
          <br />
        </form>
      </div>
    </>
  );
};

export default CourseInformation;
