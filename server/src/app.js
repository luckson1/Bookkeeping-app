const express= require('express');
const dbConnect=require ('./config/dbConnect')
const {errorHandler, notFound} =require ('./middleware/errorMiddleware')
const dotenv=require ('dotenv')


const {userRoute}=require ('./routes/users/users')
const app=express()





// env
dotenv.config()
// dbConnect
dbConnect()

// middlewear
app.use(express.json());
app.use(notFound);
app.use(errorHandler);


//routes
app.use("/api/users", (req, res) => {userRoute})

module.exports=app