const mongoose = require('mongoose');
const User = require('../models/User');
const BlacklistedToken = require('../models/BlackListedToken')
const app = require('../server'); 
const connectToDB = require('../config/db');
let server;


function startServer() {
    server = app.listen(0, () => console.log(`Server is running `));
}

function stopServer() {
    if (server) server.close();
}

beforeAll(async () => {
 
    startServer()
    await mongoose.connect(process.env.MONGO_URL , {
       
   });
});
afterAll(async () => {
    await mongoose.connection.close();
    stopServer()
   
});