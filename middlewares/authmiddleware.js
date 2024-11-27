const jwt = require('jsonwebtoken')
const User = require('../models/User')




exports.authenticate = async (req,res,next) => {

   /* const mytoken = req.cookies.auth_token;
        console.log(mytoken)
        if(!mytoken) return  res.status(401).json({msg:"Non authorisé"});*/

//verification de la validité du  token si il existe

    try {
        
        const token = req.header('Authorization').replace('Bearer ','');
       
        const decoded = jwt.verify(token, 'secretkeyappearshere' );
        const user = await User.findOne({_id:decoded.userId})
        if(!user) {
            res.status(404).json({msg:"Utilisateur non trouvé"})
        }
        req.user = user;
        req.token=token;
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({msg:" Authorisation requise",err:error})
        
    }
    
}