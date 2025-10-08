import React from 'react'

const FAQ = () => {
return (
    <div className="flex flex-col gap-10">
      <h1 className="text-center text-5xl uppercase text-gradient">
        Frequently Asked Questions – [ElevateX]
      </h1>

      <ul className="flex flex-col gap-8">
        <li>
          <h2 className="text-2xl font-semibold">1. What is ElevateX?</h2>
          <p>
            ElevateX is an online learning platform that provides a wide range
            of courses, workshops, and skill development programs designed to
            help you grow personally and professionally — anytime, anywhere.
          </p>
        </li>

        <li>
          <h2 className="text-2xl font-semibold">
            2. How do I create an account?
          </h2>
          <p>
            Simply click on the “Sign Up” button on the top right corner, enter
            your basic details like name, email, and password, and verify your
            email address. Once done, you can start exploring courses right
            away!
          </p>
        </li>

        <li>
          <h2 className="text-2xl font-semibold">
            3. Are the courses free or paid?
          </h2>
          <p>
            We offer both free and paid courses. Free courses give you access to
            essential learning materials, while paid courses include advanced
            lessons, certificates, mentorship, and project-based learning.
          </p>
        </li>

        <li>
          <h2 className="text-2xl font-semibold">
            4. How can I pay for a course?
          </h2>
          <p>
            You can pay using secure payment methods such as credit/debit cards,
            UPI, PayPal, or net banking. All transactions are encrypted and
            completely safe.
          </p>
        </li>

        <li>
          <h2 className="text-2xl font-semibold">
            5. Will I get a certificate after completing a course?
          </h2>
          <p>
            Yes! Once you successfully complete a course and pass the required
            assessments, you’ll receive a verified digital certificate which you
            can download and share on LinkedIn or your resume.
          </p>
        </li>

        <li>
          <h2 className="text-2xl font-semibold">
            6. Can I access my courses anytime?
          </h2>
          <p>
            Absolutely. Once enrolled, you get lifetime access to your course
            content. You can learn at your own pace — 24/7, from any device.
          </p>
        </li>

        <li>
          <h2 className="text-2xl font-semibold">
            7. What if I’m not satisfied with a course?
          </h2>
          <p>
            We offer a <strong>7-day refund policy</strong> on most paid
            courses. If you’re not satisfied, you can request a refund within 7
            days of purchase — no questions asked.
          </p>
        </li>

        <li>
          <h2 className="text-2xl font-semibold">
            8. How can I contact support?
          </h2>
          <p>
            You can reach out to our support team anytime at{" "}
            <a
              href="mailto:support@elevatex.com"
              className="text-blue-500 underline"
            >
              support@elevatex.com
            </a>{" "}
            or use the live chat feature available on our website.
          </p>
        </li>

        <li>
          <h2 className="text-2xl font-semibold">
            9. Can I access ElevateX on mobile?
          </h2>
          <p>
            Yes! ElevateX is fully optimized for mobile and tablet devices, so
            you can continue learning even on the go.
          </p>
        </li>

        <li>
          <h2 className="text-2xl font-semibold">
            10. How often are new courses added?
          </h2>
          <p>
            We add new courses and learning paths every month based on trending
            skills and user feedback, so there’s always something new to learn!
          </p>
        </li>
      </ul>
    </div>
  );
}

export default FAQ