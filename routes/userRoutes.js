const router = require('express').Router()
const { authenticateToken } = require('../controllers/authcontroller');
const {getProfil, getAllUsers,updateProfile,deleteAccount} = require('../controllers/userController');


router.get('/all',[authenticateToken],getAllUsers)
router.get('/me', authenticateToken, getProfil);
router.put('/update', authenticateToken, updateProfile);
router.delete('/delete', authenticateToken, deleteAccount);



module.exports=router;