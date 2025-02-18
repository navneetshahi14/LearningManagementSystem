const express = require('express')
const DbConnection = require("./db/db")
const cors = require('cors')

const app = express();


DbConnection();


app.use(express.json());
app.use(cors())

const authRouter = require('./routes/AuthRoutes')
app.use('/auth',authRouter)



const PORT = process.env.PORTNo || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
