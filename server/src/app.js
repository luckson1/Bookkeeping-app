const express= require('express');
const dbConnect=require ('./config/dbConnect')
const {errorHandler, notFound} =require ('./middleware/errorMiddleware')
const dotenv=require ('dotenv')
const cors= require ('cors');


const userRoutes = require('./routes/users/users');
const salesRoutes=require ('./routes/sales/Sales');
const ExpensesRoutes = require('./routes/expenses/Expenses');
const app=express()





// env
dotenv.config()
// dbConnect
dbConnect();

// middlewear
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ msg: "Welcome Expenses tracker API" });
});



//Users routes
app.use("/api/users", userRoutes);

// Sales routes
app.use("/api/sales", salesRoutes);

// Expenses routes
app.use("/api/sales", ExpensesRoutes);

//errors

app.use(notFound);
app.use(errorHandler);

module.exports=app