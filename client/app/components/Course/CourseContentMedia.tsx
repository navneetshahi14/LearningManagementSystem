import { styles } from "@/app/styles/styles";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Rating from "@/app/utils/Rating";
import {
  useAddAnswerInQuestionMutation,
  useAddNewQuestionMutation,
  useAddReplyInReviewMutation,
  useAddReviewInCourseMutation,
  useGetCourseDetailQuery,
} from "@/redux/feature/courses/courseApi";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  AiFillStar,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineStar,
} from "react-icons/ai";
import { BiMessage } from "react-icons/bi";
import { VscVerifiedFilled } from "react-icons/vsc";
import { format } from "timeago.js";
import socketIO from 'socket.io-client'
const ENDPOINT = process.env.NEXT_PUBLIC_SERVER_URI || "";
const socketId = socketIO(ENDPOINT,{transports:['websocket']})



type Props = {
  data: any;
  id: string;
  activeVideo: number;
  setActiveVideo: (activeVideo: number) => void;
  user: any;
  refetch: any;
};

const CourseContentMedia = ({
  data,
  id,
  activeVideo,
  setActiveVideo,
  refetch,
  user,
}: Props) => {
  const [activeBar, setactiveBar] = useState(0);
  const [question, setQuestion] = useState("");
  const [reviews, setReviews] = useState("");
  const [rating, setRating] = useState(1);
  const [isReviewReply, setIsReviewReply] = useState(false);
  const [reply, setReply] = useState("");

  const [reviewId, setReviewId] = useState("");

  const [
    addNewQuestion,
    { isSuccess, error, isLoading: questionCreationLoading },
  ] = useAddNewQuestionMutation({});

  const [answer, setAnswer] = useState("");
  const [questionId, setQuestionId] = useState("");

  const [
    addAnswerInQuestion,
    {
      isSuccess: answerSuccess,
      error: answerError,
      isLoading: answerCreationLoading,
    },
  ] = useAddAnswerInQuestionMutation();

  const [
    addReviewInCourse,
    {
      isSuccess: reviewSuccess,
      error: reviewError,
      isLoading: reviewCreationLoading,
    },
  ] = useAddReviewInCourseMutation();

  const { data: courseData, refetch: courseRefetch } = useGetCourseDetailQuery(
    id,
    { refetchOnMountOrArgChange: true }
  );
  const course = courseData?.course;

  const [
    addReplyInReview,
    {
      isSuccess: replySuccess,
      error: replyError,
      isLoading: replyCreationLoading,
    },
  ] = useAddReplyInReviewMutation();

  const isReviewExists = course?.reviews?.find(
    (item: any) => item.user._id === user._id
  );

  const handleQuestion = () => {
    if (question.length === 0) {
      toast.error("Question can't be empty");
    } else {
      addNewQuestion({
        question,
        courseId: id,
        contentId: data[activeVideo]._id,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setQuestion("");
      refetch();
      toast.success("Question added successfully");
      socketId.emit("notification",{
        title:"New Question Received",
        message:`You have a new question in ${data[activeVideo].title}`,
        userId:user._id
      })
    }
    if (answerSuccess) {
      setAnswer("");
      refetch();
      toast.success("Answer added successfully");
      if(user.role !== "admin"){
        socketId.emit("notification",{
        title:"New Reply Received",
        message:`You have a new question reply in ${data[activeVideo].title}`,
        userId:user._id
      })
      }
    }
    if (answerError) {
      if ("data" in answerError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (reviewSuccess) {
      setReviews("");
      setRating(1);
      courseRefetch();
      toast.success("Review added successfully");
      socketId.emit("notification",{
        title:"New Question",
        message:`You have a new question in ${data[activeVideo].title}`,
        userId:user._id
      })
    }

    if (reviewError) {
      if ("data" in reviewError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (replyError) {
      if ("data" in replyError) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (replySuccess) {
      setReply("");
      courseRefetch();
      toast.success("Reply added successfully");
      socketId.emit("notification",{
        title:"New Question",
        message:`You have a new question in ${data[activeVideo].title}`,
        userId:user._id
      })
    }
  }, [
    isSuccess,
    error,
    answerSuccess,
    answerError,
    reviewSuccess,
    reviewError,
  ]);

  const handleAnswerSubmit = () => {
    addAnswerInQuestion({
      answer,
      courseId: id,
      contentId: data[activeVideo]._id,
    });
  };

  const handleReviewsSubmit = async () => {
    if (reviews.length === 0) {
      toast.error("Review can't be empty");
    } else {
      addReviewInCourse({ review: reviews, rating, courseId: id });
    }
  };

  const handleReviewReplySubmit = () => {
    if (!replyCreationLoading) {
      if (reply === "") {
        toast.error("Reply can't be empty");
      } else {
        addReplyInReview({ comment: reply, courseId: id, reviewId });
      }
    }
  };

  return (
    <div className="w-[95%] md:w-[86%] py-4 m-auto ">
      <CoursePlayer
        title={data[activeVideo]?.title}
        videoUrl={data[activeVideo]?.videoUrl}
      />
      <div className="w-full flex items-center justify-between my-3">
        <div
          className={`${
            styles.button
          } text-white  !w-[unset] !min-h-[40px] !py-[unset] ${
            activeVideo === 0 && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(activeVideo === 0 ? 0 : activeVideo - 1)
          }
        >
          <AiOutlineArrowLeft className="mr-2" />
          Prev Lesson
        </div>
        <div
          className={`${
            styles.button
          } text-white  !w-[unset] !min-h-[40px] !py-[unset] ${
            data.length - 1 === activeVideo && "!cursor-no-drop opacity-[.8]"
          }`}
          onClick={() =>
            setActiveVideo(
              data && data.length - 1 === activeVideo
                ? activeVideo
                : activeVideo + 1
            )
          }
        >
          Next Lesson
          <AiOutlineArrowRight className="mr-2" />
        </div>
      </div>
      <h1 className="pt-2 text-[25px] font-[600]">{data[activeVideo].title}</h1>
      <br />
      <div className="w-full p-4 flex items-center justify-between bg-slate-500 bg-opacity-20 backdrop-blur shadow-inner shadow-slate-700 rounded ">
        {["Overview", "Resources", "Q&A", "Reviews"].map((text, index) => (
          <h5
            className={`md:text-[20px] cursor-pointer dark:text-white text-black ${
              activeBar === index
                ? "text-red-500"
                : "dark:text-white text-black"
            }`}
            onClick={() => setactiveBar(index)}
            key={index}
          >
            {text}
          </h5>
        ))}
      </div>
      <br />
      {activeBar === 0 && (
        <p className="text-[18px] whitespace-pre-line mb-3 dark:text-white text-black ">
          {data[activeVideo]?.description}
        </p>
      )}

      {activeBar === 1 && (
        <div>
          {data[activeVideo]?.links.map((item: any, index: number) => (
            <div className="mb-5" key={index}>
              <h2 className="md:text-[20px] md:inline-block dark:text-white text-black">
                {item.title && item.title + " :"}
              </h2>
              <a
                href={item.url}
                className="inline-block text-[#4395c4] md:text-[20px] md:pl-2 "
              >
                {item.url}
              </a>
            </div>
          ))}
        </div>
      )}

      {activeBar === 2 && (
        <>
          <div className="flex w-full">
            <Image
              src={
                user.avatar
                  ? user.avatar.url
                  : "https://imgs.search.brave.com/gC4PemsyQfxAGl4nIbbzO3tCfYE0jlhJnRFYcrAbgJM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ny8xOC8yMy8yMy91/c2VyLTI1MTc0MzBf/NjQwLnBuZw"
              }
              width={50}
              height={50}
              alt=""
              className="rounded-full w-[50px] h-[50px] object-contain"
            />
            <textarea
              name=""
              id=""
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              cols={40}
              rows={5}
              placeholder="Write your question"
              className="outline-none bg-transparent ml-3 border border-[#ffffff57] md:w-full p-2 rounded w-[90%] md:text-[18px] font-poppins "
            ></textarea>
          </div>
          <div className="w-full flex justify-end">
            <div
              className={`${
                styles.button
              } !w-[120px] !h-[40px] text-[18px] mt-5 ${
                questionCreationLoading && "cursor-no-drop"
              }`}
              onClick={questionCreationLoading ? () => {} : handleQuestion}
            >
              Submit
            </div>
          </div>
          <br />
          <br />
          <div className="w-full h-[1px] bg-[#ffffff3b]"></div>
          <div>
            <CommentReply
              data={data}
              activeVideo={activeVideo}
              answer={answer}
              setAnswer={setAnswer}
              handleAnswerSubmit={handleAnswerSubmit}
              user={user}
              setQuestionId={setQuestionId}
              answerCreationLoading={answerCreationLoading}
            />
          </div>
        </>
      )}

      {activeBar === 3 && (
        <div className="w-full">
          <>
            {!isReviewExists && (
              <>
                <div className="flex w-full">
                  <Image
                    src={
                      user.avatar
                        ? user.avatar.url
                        : "https://imgs.search.brave.com/gC4PemsyQfxAGl4nIbbzO3tCfYE0jlhJnRFYcrAbgJM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ny8xOC8yMy8yMy91/c2VyLTI1MTc0MzBf/NjQwLnBuZw"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="rounded-full w-[50px] h-[50px] object-contain"
                  />
                  <div className="w-full">
                    <h5 className="pl-3 text-[20px] font-[500] dark:text-white text-black ">
                      Give a Rating <span className="text-red-500">*</span>
                    </h5>
                    <div className="flex w-full ml-2 pb-3">
                      {[1, 2, 3, 4, 5].map((i) =>
                        rating >= i ? (
                          <AiFillStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rbg(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        ) : (
                          <AiOutlineStar
                            key={i}
                            className="mr-1 cursor-pointer"
                            color="rgb(246,186,0)"
                            size={25}
                            onClick={() => setRating(i)}
                          />
                        )
                      )}
                    </div>
                    <textarea
                      name=""
                      value={reviews}
                      onChange={(e) => setReviews(e.target.value)}
                      id=""
                      cols={40}
                      rows={5}
                      placeholder="Write your comment"
                      className="outline-none bg-transparent md:ml-3 border border-[#ffffff57] w-[95%] md:w-full p-2 rounded text-[18px] font-poppins "
                    ></textarea>
                  </div>
                </div>
                <div className="w-full flex justify-end">
                  <div
                    className={`${
                      styles.button
                    } !w-[120px] !h-[40px] text-[18px] mt-5 md:mr-0 mr-2 ${
                      reviewCreationLoading && "cursor-no-drop"
                    }`}
                    onClick={
                      reviewCreationLoading ? () => {} : handleReviewsSubmit
                    }
                  >
                    Submit
                  </div>
                </div>
              </>
            )}
            <br />
            <div className="w-full h-[1px] bg-[#ffffff3b]  "></div>
            <div className="w-full">
              {(course?.reviews && [...course.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full my-5 dark:text-white text-black">
                    <div className="w-full flex">
                      <div>
                        <Image
                          src={
                            item.user.avatar
                              ? item.user.avatar.url
                              : "https://imgs.search.brave.com/gC4PemsyQfxAGl4nIbbzO3tCfYE0jlhJnRFYcrAbgJM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ny8xOC8yMy8yMy91/c2VyLTI1MTc0MzBf/NjQwLnBuZw"
                          }
                          width={50}
                          height={50}
                          alt=""
                          className="rounded-full w-[50px] h-[50px] object-contain"
                        />
                      </div>
                      <div className="ml-2">
                        <h1 className="text-[18px]">{item?.user.name}</h1>
                        <Rating rating={item.rating} />
                        <p>{item.comment}</p>
                        <small className="text-[#0000009e] dark:text-[#ffffff83]">
                          {format(item.createdAt)}
                        </small>
                      </div>
                    </div>
                    {user.role === "admin" && item.commentReplies && (
                      <span
                        className={`${styles.label} !ml-10 cursor-pointer`}
                        onClick={() => {
                          setIsReviewReply(true);
                          setReviewId(item._id);
                        }}
                      >
                        Add Reply
                      </span>
                    )}
                    {isReviewReply && reviewId === item._id && (
                      <div className="w-full flex relative">
                        <input
                          type="text"
                          name=""
                          id=""
                          value={reply}
                          onChange={(e: any) => setReply(e.target.value)}
                          placeholder="Enter your reply..."
                          className={`${styles.input} !border-[0px] rounded-none w-[90%] ml-[3%] !border-b border-[#000] dark:border-[#fff] `}
                        />
                        <button
                          className="absolute right-0 bottom-1"
                          type="submit"
                          onClick={handleReviewReplySubmit}
                        >
                          Submit
                        </button>
                      </div>
                    )}

                    {item.commentReplies.map((i: any, index: number) => (
                      <div className="w-full flex md:ml-16 my-5">
                        <div className="w-[50px] h-[50px] ">
                          <div>
                            <Image
                              src={
                                item.user.avatar
                                  ? item.user.avatar.url
                                  : "https://imgs.search.brave.com/gC4PemsyQfxAGl4nIbbzO3tCfYE0jlhJnRFYcrAbgJM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ny8xOC8yMy8yMy91/c2VyLTI1MTc0MzBf/NjQwLnBuZw"
                              }
                              width={50}
                              height={50}
                              alt=""
                              className="rounded-full w-[50px] h-[50px] object-contain"
                            />
                          </div>
                        </div>
                        <div className="pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[20px]">{i.user.name}</h5>
                            {item.user.role === "admin" && (
                              <VscVerifiedFilled className="text-[#3d4bcc] ml-2 font-[20px]" />
                            )}
                          </div>
                          <p className="">{i.comment}</p>
                          <small className="dark:text-[#ffffff83] text-black">
                            {format(i.createdAt)}
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              )}
            </div>
          </>
        </div>
      )}
    </div>
  );
};

const CommentReply = ({
  data,
  activeVideo,
  answer,
  setAnswer,
  handleAnswerSubmit,
  user,
  setQuestionId,
  answerCreationLoading,
}: any) => {
  return (
    <>
      <div className="w-full my-3">
        {data[activeVideo].questions.map((item: any, index: any) => (
          <CommentItem
            key={index}
            data={data}
            activeVideo={activeVideo}
            item={item}
            index={index}
            answer={answer}
            setAnswer={setAnswer}
            setQuestionId={setQuestionId}
            handleAnswerSubmit={handleAnswerSubmit}
            answerCreationLoading={answerCreationLoading}
          />
        ))}
      </div>
    </>
  );
};

const CommentItem = ({
  data,
  activeVideo,
  item,
  answer,
  setAnswer,
  questionId,
  setQuestionId,
  handleAnswerSubmit,
  answerCreationLoading,
}: any) => {
  const [replyActive, setReplyActive] = useState(false);
  return (
    <>
      <div className="my-4">
        <div className="flex mb-2">
          {/* <div className="w-[50px] h-[50px]">
            <div className="w-[50px] h-[50px] bg-slate-600 rounded-[50px] flex items-center justify-center cursor-pointer ">
              <h1 className="uppercase text-[18px]">
                {item?.user.name.slice(0,2)}
              </h1>
            </div>
          </div> */}
          <div>
            <Image
              src={
                item.user.avatar
                  ? item.user.avatar.url
                  : "https://imgs.search.brave.com/gC4PemsyQfxAGl4nIbbzO3tCfYE0jlhJnRFYcrAbgJM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ny8xOC8yMy8yMy91/c2VyLTI1MTc0MzBf/NjQwLnBuZw"
              }
              width={50}
              height={50}
              alt=""
              className="rounded-full w-[50px] h-[50px] object-contain"
            />
          </div>
          <div className="pl-3 dark:text-white text-black">
            <h5 className="text-[20px]">{item?.user.name}</h5>
            <p className="">{item?.question}</p>
            <small className="text-[#000000b8] dark:text-[#ffffff83]">
              {!item.createdAt ? "" : format(item?.createdAt)}
            </small>
          </div>
        </div>

        <div className="w-full flex">
          <span
            className="md:pl-6 text-[#000000b8] dark:text-[#ffffff83] cursor-pointer mr-2"
            onClick={() => {
              setReplyActive(!replyActive);
              setQuestionId(item._id);
            }}
          >
            {!replyActive
              ? item.questionReplies.length !== 0
                ? "All Replies"
                : "Add Replies"
              : "Hide Replies"}
          </span>
          <BiMessage
            size={20}
            className="cursor-pointer dark:text-[#ffffff83] text-[#000000b8] "
          />
          <span className="pl-1 mt-[-4px] cursor-pointer dark:text-[#ffffff83] text-[#000000b8] ">
            {item.questionReplies.length}
          </span>
        </div>
        {replyActive && questionId === item._id && (
          <>
            {item.questionReplies.map((item: any, index: any) => (
              <div className="w-full flex md:ml-16 my-5 text-black dark:text-white">
                <div>
                  <Image
                    src={
                      item.user.avatar
                        ? item.user.avatar.url
                        : "https://imgs.search.brave.com/gC4PemsyQfxAGl4nIbbzO3tCfYE0jlhJnRFYcrAbgJM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxNy8w/Ny8xOC8yMy8yMy91/c2VyLTI1MTc0MzBf/NjQwLnBuZw"
                    }
                    width={50}
                    height={50}
                    alt=""
                    className="rounded-full w-[50px] h-[50px] object-contain"
                  />
                </div>
                <div className="pl-3">
                  <div className="flex items-center">
                    <h5 className="text-[20px]">{item.user.name}</h5>
                    {item.user.role === "admin" && (
                      <VscVerifiedFilled className="text-[#3d4bcc] ml-2 font-[20px]" />
                    )}
                  </div>
                  <p className="">{item.answer}</p>
                  <small className="text-[#ffffff83]">
                    {format(item.createdAt)}
                  </small>
                </div>
              </div>
            ))}
            <>
              <div className="w-full flex relative text-black dark:text-white">
                <input
                  type="text"
                  placeholder="Enter your answer..."
                  value={answer}
                  onChange={(e: any) => setAnswer(e.target.value)}
                  className={`block md:ml-12 mt-2 outline-none bg-transparent border-b border-[#00000027] dark:text-white text-black dark:border-[#fff] p-[5px] w-[95%] ${
                    answer === "" || (answerCreationLoading && "cursor-no-drop")
                  }`}
                />
                <button
                  className="absolute right-0 bottom-1"
                  type="submit"
                  onClick={handleAnswerSubmit}
                  disabled={answer === "" || answerCreationLoading}
                ></button>
              </div>
            </>
          </>
        )}
      </div>
    </>
  );
};

export default CourseContentMedia;
