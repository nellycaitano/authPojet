const isAuthenticated  =  (req,res,next) => {
    if(req.user) return next();
    res.status(403).json({message:"Non authentifié"})
  
    
}
const isOwner =  (req,res,next) => {
    if(req.user && req.user.role ==="owner") return next();
    res.status(403).json({message:"Accès interdit "})
    
}

module.exports={isAuthenticated,isOwner}