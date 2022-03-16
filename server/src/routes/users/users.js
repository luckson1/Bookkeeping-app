const express=require ('express')
const { registerUser, fetchAllCtrl} =require('../../controllers/users/user')


const userRoute=express.Router();

userRoute.post('/register', (res, req) => {registerUser});
userRoute.get('/', (res, req) => {fetchAllCtrl});



module.exports=userRoute;

