import { styles } from "@/app/styles/styles";
import { useLoadUserQuery } from "@/redux/feature/api/apiSlice";
import { useCreateOrderMutation } from "@/redux/feature/orders/ordersApi";
import {
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import socketIO from 'socket.io-client'
import { CourseItem, userItem } from "../Course/CourseCard";
const ENDPOINT = process.env.NEXT_PUBLIC_SERVER_URI || "";
const socketId = socketIO(ENDPOINT,{transports:['websocket']})


type Props = {
  setOpen: (open:boolean)=>void;
  data: CourseItem;
  user: userItem | null;
};

const CheckOutForm = ({ data, user }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<string>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    
    if (error) {
      setMessage(error.message || "");
      setIsLoading(false);
      console.log(error)
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsLoading(false);
      console.log(paymentIntent)
      createOrder({ courseId: data._id, payment_info: paymentIntent });
    }
  };

  useEffect(()=>{
    if(orderData){
        setLoadUser(true)
        socketId.emit("notification",{
          title:"New Order",
          message:`You have a new Order from ${data.name}`,
          userId:user?._id
        })
        redirect(`/course-access/${data._id}`)
    }
    if(error){
        if("data" in error){
            const errorMessage = error as {data:{message:string}};
            toast.error(errorMessage.data.message || "Something went wrong")
        }
    }
  },[orderData,error])

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement id="link-authentication-element" />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text" className={`${styles.button} mt-2 !h-[35px]`}>
          {isLoading ? "Paying..." : "Pay Now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className="text-[red] font-poppins pt-2 ">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckOutForm;
