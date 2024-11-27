const mongoose = require('mongoose')

const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    password: {
        type: String,
        required: true,
        minlength:6


    },
    role: {
        type: String,
        enum: ["user", "owner"],
        default: "user" // Par défaut, l'utilisateur est un locataire
      },
    isVerified: {
        type: Boolean,
        default: false, // Par défaut, l'utilisateur n'est pas vérifié
        required: false, // Champ non obligatoire
      }},
      {
        timestamps: true, // Ajoute les champs createdAt et updatedAt
      }
);

userShema.methods.matchpassword=async function (enteredpassword) {
    return await bcrypt.compare(enteredpassword, this.password);

}
module.exports = mongoose.model('User',userShema)