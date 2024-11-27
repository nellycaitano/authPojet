
const  {validationResult}= require('express-validator')
exports.validationError= (req,res)=>{
    const errors = validationResult(req,res);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    
}