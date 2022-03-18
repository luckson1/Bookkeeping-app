const express= require('express');
const dbConnect=require ('./config/dbConnect')
const {errorHandler, notFound} =require ('./middleware/errorMiddleware')
const dotenv=require ('dotenv')


const userRoutes = require('./routes/users/users');
const salesRoutes=require ('./routes/sales/Sales');
const ExpensesRoutes = require('./routes/expenses/Expenses');
const app=express()





// env
dotenv.config()
// dbConnect
dbConnect()

// middlewear
app.use(express.json());
// app.use(notFound);
app.use(errorHandler);


//Users routes
app.use("/api/users", userRoutes)

// Sales routes
app.use("/api/sales", salesRoutes)

// Expenses routes
app.use("/api/sales", ExpensesRoutes)

module.exports=app