import {CronJob} from 'cron';
import https from "https";

const job = new CronJob("*/14 * * * *", () => {
    https
        .get(process.env.API_URL!,(res)=>{
            if(res.statusCode === 200)console.log("Get Request sent successfully");
            else console.log("Get request failed",res.statusCode);
        })
        .on("error",(e)=>console.error("Error while sending request",e));
})

export default job;