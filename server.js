const express = require('express')
require('dotenv').config()
const connectDatabase = require('./config/db')
const cookieParser =require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
connectDatabase()
const app = express()
const PORT  = process.env.PORT||5000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(helmet())


const authRoutes = require('./routes/authroute')
const UserRoutes = require('./routes/userRoutes')
const passwordRoutes = require('./routes/passwordRoutes')
const emailRoutes = require('./routes/emailRoutes')
const listingsRoutes= require('./routes/listings')
const reservationsRoutes = require('./routes/reservations')




app.use('/api/auth',authRoutes)
app.use('/api',passwordRoutes)
app.use('/api/users',UserRoutes)
app.use('/api/email',emailRoutes)
app.use("/listings", listingsRoutes);
app.use("/reservations", reservationsRoutes);




app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



module.exports=app;
