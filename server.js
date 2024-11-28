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
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", "https://cdn.ngrok.com","https://0f5a-137-255-49-163.ngrok-free.app"],
    styleSrc: ["'self'", "https://fonts.googleapis.com", "https://0f5a-137-255-49-163.ngrok-free.app"],
    fontSrc: ["'self'", "https://fonts.gstatic.com"],
    scriptSrc: ["'self'", "https://cdn.ngrok.com", "https://0f5a-137-255-49-163.ngrok-free.app"],
    connectSrc: ["'self'", "https://0f5a-137-255-49-163.ngrok-free.app"],
    styleSrcElem: ["'self'", "https://fonts.googleapis.com"],    // Permet Google Fonts
        // Permet les polices de Google Fonts
    // Autres directives si nécessaire
  }
}));
// Ajouter Google Fonts à la politique CSP



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
app.use("/api/reservations", reservationsRoutes);



app.get('/', (req, res) => {

  res.send('Hello World!')})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


module.exports=app;

