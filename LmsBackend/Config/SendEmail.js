const nodemailer = require("nodemailer");
const course = require("../model/CourseSchema");
const lesson = require("../model/LessonSchema");
const users = require("../model/UserSchema");
const dotenv = require("dotenv");

dotenv.config();

const updateOnNewLesson = async (lessonid) => {
  try {
    const lessons = await lesson.findById(lessonid);

    const studentEnrolled = await course
      .findById(lessons.course)
      .populate("studentEnrolled", "name email");

    const Transport = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.Email,
        pass: process.env.Email_passCode,
      },
    });

    studentEnrolled.forEach((stu) => {
      const mailOptions = {
        from: process.env.Email,
        to: stu.studentEnrolled.email,
        subject: `New Video added to ${stu.title}`,
        html: `
                <div style="width: 100%;height: 100vh;padding: 0;margin: 0;">
                    <div style="width: 100%;height: 20vh; background-color: blue; display: flex; align-items: center; justify-content: center; ">
                        <h1 style="color: white;font-style: italic; font-size: 3rem;">New Video</h1>
                    </div>
                    <div style="width: 100%;height: 70vh;background-color: white;display: flex;align-items: center;justify-content: center; flex-direction: column; gap: 10px;">
                        <h2 style="text-transform: uppercase;">${lessons.title}</h2>
                        <img style="width: 400px; height: 200px;" src="${stu.thumbnail}" alt="">

                        <button style="width: 30%;font-size: 2rem;background-color: blue;color: bisque;border: none;outline: none;border-radius: 64px;padding: 5px;text-transform: uppercase;">visit</button>
                    </div>
                </div>
            `,
      };

      Transport.sendMail(mailOptions,(err,info)=>{
        if(err){
            console.log(err)
        }else{
            console.log(`email has been send`)
        }
      })

    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
    updateOnNewLesson
}
