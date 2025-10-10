import React from "react";

const Policy = () => {
  return (
    <div className="flex flex-col gap-10">
      <h1 className="text-center text-5xl uppercase text-gradient">
        Privacy Policy – [ElevateX]
      </h1>
      <ul className="flex flex-col gap-5">
        <li>
          <h2>1. Information We Collect</h2>
          <ul>
            <li>
              Personal Information: Name, email, phone number, payment details,
              and profile picture.
            </li>
            <li>
              Account Data: Username, encrypted password, course enrollments,
              and certificates.
            </li>
            <li>
              Usage Data: IP address, browser type, device info, and
              interactions with our platform.
            </li>
            <li>
              Communication Data: Feedback, queries, and messages you send us.
            </li>
          </ul>
        </li>

        <li>
          <h2>2. How We Use Your Information</h2>
          <ul>
            <li>To create and manage your account.</li>
            <li>To deliver and personalize courses and learning materials.</li>
            <li>To process payments and send invoices.</li>
            <li>To communicate updates, offers, and support.</li>
            <li>To ensure security and prevent fraud.</li>
            <li>To improve the platform and user experience.</li>
          </ul>
        </li>

        <li>
          <h2>3. Sharing of Information</h2>
          <ul>
            <li>We do not sell your personal data.</li>
            <li>
              We may share data with trusted third parties (e.g., payment
              gateways, analytics providers).
            </li>
            <li>We may disclose data if required by law or legal processes.</li>
            <li>
              In case of a merger or acquisition, user data may be transferred
              securely.
            </li>
          </ul>
        </li>

        <li>
          <h2>4. Data Security</h2>
          <ul>
            <li>
              We use encryption, secure servers, and access controls to protect
              your data.
            </li>
            <li>
              No online system is 100% secure — use our services at your own
              risk.
            </li>
          </ul>
        </li>

        <li>
          <h2>5. Your Rights</h2>
          <ul>
            <li>Access, update, or delete your personal data.</li>
            <li>Withdraw consent at any time.</li>
            <li>Request a copy of the data we store about you.</li>
            <li>Opt-out of marketing emails and promotions.</li>
          </ul>
        </li>

        <li>
          <h2>6. Cookies & Tracking</h2>
          <ul>
            <li>We use cookies to remember login sessions and preferences.</li>
            <li>Cookies help analyze usage and improve our platform.</li>
            <li>You can manage or disable cookies in your browser settings.</li>
          </ul>
        </li>

        <li>
          <h2>7. Third-Party Links</h2>
          <ul>
            <li>Our site may include links to external websites.</li>
            <li>
              We are not responsible for their privacy practices or content.
            </li>
          </ul>
        </li>

        <li>
          <h2>8. Children’s Privacy</h2>
          <ul>
            <li>
              Our platform is not intended for users under 13 years of age.
            </li>
            <li>We do not knowingly collect personal data from minors.</li>
          </ul>
        </li>

        <li>
          <h2>9. Changes to This Policy</h2>
          <ul>
            <li>We may update this Privacy Policy from time to time.</li>
            <li>Changes will be posted here with a new “Last Updated” date.</li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Policy;
