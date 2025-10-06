/* eslint-disable @typescript-eslint/no-explicit-any */
import { styles } from "@/app/styles/styles";
import {
  useEditLayoutMutation,
  useGetHerodataQuery,
} from "@/redux/feature/layout/layout";
import React, { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { HiMinus, HiPlus } from "react-icons/hi";
import { IoMdAddCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";
import Loader from "../../Loader/Loader";

type Props = unknown;

const EditFaq = (props: Props) => {
  const { data, isLoading } = useGetHerodataQuery("FAQ", {
    refetchOnMountOrArgChange: true,
  });
  const [editLayout, { isSuccess, error }] = useEditLayoutMutation();

  const [question, setQuestion] = useState<any[]>([]);

  useEffect(() => {
    if (data) {
      setQuestion(data?.layout?.faq);
    }
    if (isSuccess) {
      toast.success("FAQ updated successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess, error]);

  const toggleQuesion = (id: any) => {
    setQuestion((prevQuestion) =>
      prevQuestion.map((q) => (q._id === id ? { ...q, active: !q.active } : q))
    );
  };

  const handleQuestionChange = (id: any, value: string) => {
    setQuestion((prevQuestion) =>
      prevQuestion.map((q) => (q._id === id ? { ...q, question: value } : q))
    );
  };

  const handleAnswerChange = (id: any, value: string) => {
    setQuestion((prevQuestion) =>
      prevQuestion.map((q) => (q._id === id ? { ...q, answer: value } : q))
    );
  };

  const newFaqHandler = () => {
    setQuestion([
      ...question,
      {
        question: "",
        answer: "",
      },
    ]);
  };

  const areQuestionsUnchanged = (
    originalQuestion: any[],
    newQuestion: any[]
  ) => {
    return JSON.stringify(originalQuestion) === JSON.stringify(newQuestion);
  };

  const isAnyQuestionEmpty = (questions: any[]) => {
    return question.some((q) => q.question === "" || q.answer === "");
  };

  const handleEdit = async () => {
    // console.log("hhghskjdhflkajshdflkjdshflkjadsflkh")
    if (
      !areQuestionsUnchanged(data.layout.faq, question) &&
      !isAnyQuestionEmpty(question)
    ) {
      await editLayout({
        type: "FAQ",
        faq: question,
      });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-[90%] md:w-[80%] m-auto mt-[120px] ">
          <div className="mt-12">
            <dl className="space-y-8">
              {question?.length > 0 ? (
                question.map((q: any) => (
                  <div
                    key={q._id}
                    className={`${
                      q._id !== question[0]?.id && "border-t"
                    } border-gray-200 p-6`}
                  >
                    <dt className="text-lg">
                      <button
                        className="flex items-start dark:text-white text-black justify-between w-full text-left focus:outline-none"
                        onClick={() => toggleQuesion(q._id)}
                      >
                        <input
                          type="text"
                          className={`${styles.input} border-none`}
                          value={q.question}
                          onChange={(e: any) =>
                            handleQuestionChange(q._id, e.target.value)
                          }
                          placeholder={"Add your questions...."}
                        />

                        <span className="ml-6 flex-shrink-0">
                          {q.active ? (
                            <HiMinus className="h-6 w-6" />
                          ) : (
                            <HiPlus className="h-6 w-6" />
                          )}
                        </span>
                      </button>
                    </dt>
                    {q.active && (
                      <dd className="mt-2 pr-12">
                        <input
                          className={`${styles.input} border-none`}
                          value={q.answer}
                          onChange={(e: any) =>
                            handleAnswerChange(q._id, e.target.value)
                          }
                          placeholder={"Add your answer..."}
                        />
                        <span className="ml-6 flex-shrink-0">
                          <AiOutlineDelete
                            className="dark:text-white text-black text-[18px] cursor-pointer "
                            onClick={() => {
                              setQuestion((prevQuestions) =>
                                prevQuestions.filter(
                                  (item) => item._id !== q._id
                                )
                              );
                            }}
                          />
                        </span>
                      </dd>
                    )}
                  </div>
                ))
              ) : (
                <div className="">No questions here</div>
              )}
            </dl>
            <br />
            <br />
            <IoMdAddCircleOutline
              className="dark:text-white text-black text-[25px] cursor-pointer "
              onClick={newFaqHandler}
            />
          </div>

          <div
            className={`${
              styles.button
            } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black bg-[#cccccc34] 
          ${
            areQuestionsUnchanged(data?.layout?.faq, question) ||
            isAnyQuestionEmpty(question)
              ? "!cursor-not-allowed"
              : "!cursor-pointer !bg-[#42d383]"
          }  
          !rounded absolute bottom-12 right-12
        `}
            onClick={
              areQuestionsUnchanged(data?.layout?.faq, question) ||
              isAnyQuestionEmpty(question)
                ? () => null
                : handleEdit
            }
          >
            Save
          </div>
        </div>
      )}
    </>
  );
};

export default EditFaq;
