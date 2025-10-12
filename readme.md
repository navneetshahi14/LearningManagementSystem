```markdown
# 🎓 ElevateX — Full Stack Learning Management System

A modern, full-featured **Learning Management System (LMS)** built using the **MERN + Next.js stack**, designed for both students and instructors.  
This platform enables seamless **course creation, enrollment, payments, progress tracking, and video streaming** — all powered by modern web technologies.

---

## 🚀 Tech Stack

**Frontend:**  
- ⚛️ [Next.js 14](https://nextjs.org/) — React Framework for SSR & routing  
- 🎨 Tailwind CSS — for fast, responsive UI  
- 🔒 Clerk/Auth.js — authentication & user management  
- 📹 React Player / Mux — video playback & hosting  

**Backend:**  
- 🟢 [Express.js](https://expressjs.com/) — backend framework  
- 🧠 Node.js — runtime environment  
- 🍃 [MongoDB + Mongoose](https://mongoosejs.com/) — database & ORM  
- 💳 [Stripe](https://stripe.com/) — payment gateway integration  
- 🪶 [Cloudinary](https://cloudinary.com/) — for media uploads (images, thumbnails)  

---

## 📚 Features

### 👩‍🏫 For Instructors
- Create, edit, and manage courses with videos, lessons & quizzes  
- Upload course thumbnails, trailers, and downloadable materials  
- Track student enrollments and revenue reports  

### 🎓 For Students
- Browse and purchase courses using Stripe  
- Watch lessons and track progress  
- Earn certificates upon completion  

### ⚙️ Platform Features
- Secure authentication (JWT or NextAuth)  
- Role-based access control (Admin / Student)  
- Global search & filtering  
- Real-time course progress tracking  
- Dark / Light theme support  

---



## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/navneetshahi14/LearningManagementSystem.git
cd LearningManagementSystem
````

### 2. Install dependencies

```bash

cd client && npm install
cd ../server && npm install
```

### 3. Configure environment variables

Create a `.env` file in both `/client` and `/server` directories.

#### Example (Server)

```env
PORT=8000
NODE_ENV=development
DB_URI=your_mongodb_uri
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_SECRET_KEY=your_cloud_sercet_key
REDIS_URL=your_redis_uri
ACTIVATION_SECRET=your_activation_secret
ACCESS_TOKEN=your-access-token
REFRESH_TOKEN=your-refresh-token
ACCESS_TOKEN_EXPIRE=5
REFRESH_TOKEN_EXPIRE=3
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_SERVICE=gmail
SMTP_MAIL=your-email
SMTP_PASSWORD=your-password
VIDEOCIPHER_API_SECRET=your-videocipher-api-secret
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
STRIPE_SECRET_KEY=your-stripe-secret-key
API_URL=http://localhost:8000
```

#### Example (Client)

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SOCKET_SERVER_URI=http://localhost:8000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
SECRET=your-secret
```

### 4. Run the development servers

```bash
# start backend
cd server
npm run dev

# start frontend
cd ../client
npm run dev
```

The app will be live at:
**Frontend:** `http://localhost:3000`
**Backend:** `http://localhost:8000`

---

## 💳 Stripe Integration

* Integrated with **Stripe Checkout** for secure payments
* Webhook support for payment confirmation
* Course access is granted automatically after successful payment

---

## 🧠 Future Enhancements

* AI-based course recommendations
* ChatGPT-powered Q&A Assistant
* Gamification (XP, badges, streaks)
* Admin analytics dashboard

---

## 📸 Screenshots

> *(Add screenshots or demo GIFs here)*

---

## 🧑‍💻 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a new branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Added new feature"`
4. Push to your branch: `git push origin feature/your-feature`
5. Create a Pull Request 🎉

---

## 🪪 License

This project is licensed under the **MIT License**.
Feel free to use and modify it for personal or commercial purposes.

---

## 📬 Contact

**Developer:** [Navneet Shahi](https://github.com/navneetshahi14)
**Email:** [navneet.shahi2004@gmail.com](mailto:navneet.shahi2004@gmail.com)
**LinkedIn:** [linkedin.com/in/navneet-shahi-a8762824b](https://linkedin.com/in/navneet-shahi-a8762824b)

---

⭐ **Star this repo** if you found it helpful!

