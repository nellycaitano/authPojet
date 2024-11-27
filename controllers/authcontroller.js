const User = require('../models/User');
const BlacklistedToken = require('../models/BlackListedToken')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {validationError } = require('../middlewares/errorHandler');
const { sendVerificationEmail } = require('./emailController');
require('dotenv').config()






exports.register = async (req,res) => {
   
    try {
        validationError(req,res)
        
        const {username,email,password} = req.body;
        const existingUser = await User.findOne({email});

        if(existingUser)  return res.status(403).json({message:'Cet email est déja utilisé'});
        //sendVerificationEmail(req,res,email)
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser =  await User.create({ username, email, password:hashedPassword});
        
        res.status(201).json({ sucess: true, msg: "Utilisateur créé avec succès" ,user:{id:newUser._id,name:newUser.username}});
      
        
    } catch (error) {
   
        res.status(400).json({ sucess: false, error: error.message })

    }


    
}

exports.login = async (req,res) => {
   
   validationError(req,res)
     try {
        const {email,password} =req.body;
        //recherche de l'utilisateur

        const user = await User.findOne({ email });
       
     
        if(!user)
            return res.status(404).json({ sucess: true ,msg:"Utilisateur inexistant"});
        
        let token;

        //comparaison des mot de passe

        const isMatch  = await bcrypt.compare(password,user.password)
        if (!isMatch) 
            res.status(401).json({ sucess: true ,msg:"Password incorect"});
          
            //Creating jwt token
        token = jwt.sign(
                {
                    userId: user.id,
                    email: user.email,
                    role:user.role
                },
                "secretkeyappearshere",
                { expiresIn: "1h" }
            );
        req.user = user;
      
        //res.cookie('auth-token',token,{httpOnly:true,secure:true,sameSite:'strict',maxAge:3600000})      
        return res.status(200).json({ sucess: true ,msg:"Connexion réussie",user:{id:user._id,name:user.username},token: token,});
        
     }catch (error) {
        res.status(400).json({ sucess: false, error: error.message })
        
    }


    
}
exports.logout = async (req,res) => {

// Route pour déconnecter l'utilisateur
const authHeader = req.headers['authorization'];
const token = authHeader.split(' ')[1]; 

if (!token) return res.status(400).json({ message: 'Token manquant' });

try {
    // Décoder le token pour récupérer sa date d'expiration
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ajouter le token à la liste noire
    const blacklistedToken = new BlacklistedToken({
        token: token,
        expiresAt: new Date(decoded.exp * 1000), // Convertir UNIX timestamp en Date
    });

    await blacklistedToken.save();
    res.status(200).json({ message: 'Déconnexion réussie. Token invalidé.' });
} catch (err) {
    
    return res.status(400).json({ message: 'Token invalide ou expiré' });
}

    
}






exports.authenticateToken = async (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Token manquant' });

    try {
        // Vérifier si le token est dans la liste noire
        const blacklisted = await BlacklistedToken.findOne({ token });
        if (blacklisted) return res.status(401).json({ message: 'Token invalide (blacklisté)' });

        // Vérifier la validité du token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(decoded)   req.user = decoded;
      
        // Ajout des informations utilisateur pour les autres middlewares
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token invalide ou expiré' });
    }
}

