
import { useSelector } from "react-redux";
import { userItem } from "../components/Course/CourseCard";

type AuthState = {
  auth: {
    user: userItem | null;
  };
};


export default function useUserAuth(){
    const {user} = useSelector((state:AuthState)=>state.auth)

    if(user){
        return true;
    }
    else{
        return false;
    }

}

