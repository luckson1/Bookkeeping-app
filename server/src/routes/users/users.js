const express=require ('express')
const { registerUser, fetchAllCtrl, loginUserCtrl, userProfileCtrl, updateProfileCtrl} =require('../../controllers/users/user');
const auth = require('../../middleware/auth');


const userRoutes=express.Router();

userRoutes.post('/register', registerUser);
userRoutes.get('/', auth, fetchAllCtrl);
userRoutes.post("/login", loginUserCtrl);
userRoutes.get("/profile",  auth, userProfileCtrl);
userRoutes.put("/update", auth, updateProfileCtrl);



module.exports=userRoutes;

