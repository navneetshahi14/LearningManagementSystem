/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Props = {
    videoUrl: string
    title: string
}

const CoursePlayer: React.FC<Props> = ({ title,videoUrl }) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: ""
    });

    useEffect(() => {
        const fetchOtp = async () => {
            try {
                const res = await axios.post(
                    'http://localhost:8000/api/v1/getVideoCipherOTP',
                    { videoId: videoUrl },
                    {
                        withCredentials: true,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }
                );
                setVideoData(res.data);
                console.log("OTP Response:", res.data);
            } catch (err: any) {
                console.error("Error fetching video OTP:", err.response?.data || err.message);
            }
        };

        if (videoUrl) {
            fetchOtp();
        }
    }, [videoUrl]);

    return (
        <div style={{ paddingTop: "56.25%", position: "relative", overflow:"hidden" }}>
            {videoData.otp && videoData.playbackInfo && (
                <iframe
                    src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=GWcjxBKufxFJoS6f`}
                    style={{
                        border: 0,
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}
                    allowFullScreen={true}
                    allow="encrypted-media"
                    title={title}
                ></iframe>
            )}
        </div>
    );
};

export default CoursePlayer;
