const express = require('express')
const DbConnection = require("./db/db")
const cors = require('cors')

const app = express();


DbConnection();


app.use(express.json());
app.use(cors())

const authRouter = require('./routes/AuthRoutes')
app.use('/auth',authRouter)

const instructorRouter = require('./routes/InstructorRoutes')
app.use('/instructor',instructorRouter)

const StudentRouter = require('./routes/StudentRoutes')
app.use('/student',StudentRouter)

const AdminRouter = require('./routes/AdminRoutes')
app.use('/admin',AdminRouter)

const CommonRouter = require('./routes/CommonRoutes')
app.use('/common',CommonRouter)

const PaymentRouter = require('./routes/paymentRoute')
app.use('/payment',PaymentRouter)



const PORT = process.env.PORTNo || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
