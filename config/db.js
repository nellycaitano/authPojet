const mongoose = require('mongoose')
require('dotenv').config()


const connectToDB = async () => {
    let isCOnnected = false;
    if(isCOnnected){
        console.log("Utilisation de la connexion existante")
        return ;
    }

    mongoose.connect(process.env.MONGO_URL)
            .then(()=>isCOnnected=true)
            .catch((error)=>{
                console.error('MongoDB connection error:', error);
                process.exit(1);
            })
    mongoose.connection.on('connected', () => console.log('connected'));

    mongoose.connection.on('disconnected', () => {
                  isCOnnected=false;
                 console.log('disconnected')});


    process.on("SIGINT",async () => {
        await mongoose.connection.close;
        console.log("Connection a mongodb fermée suite à l'arrêt de l'app");
        process.exit(0)
        
    })
    
}





module.exports= connectToDB;