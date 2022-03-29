const express=require ('express')
const { registerUser, fetchAllCtrl, loginUserCtrl} =require('../../controllers/users/user')


const userRoutes=express.Router();

userRoutes.post('/register', registerUser);
userRoutes.get('/', fetchAllCtrl);
userRoutes.post("/login", loginUserCtrl);



module.exports=userRoutes;

