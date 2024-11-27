const router = require('express').Router()
const {register,login,logout, authenticateToken} = require('../controllers/authcontroller');

const  {body}= require('express-validator');


router.post('/register',[body('name').isEmpty().withMessage("Nom requis"),
body('email').isEmail()
.withMessage("Email invalid"),
body('password').isLength({min:6})
.withMessage("Le mot de  passe doit contenir au moins 6 caracteres")],register)


router.post('/login',[body('email').isEmail()
.withMessage("Email invalid"),
body('password').notEmpty()
.withMessage("Le mot de  passe est obligatoire")],login)



router.post('/logout',[authenticateToken],logout)
    
    

module.exports = router;
