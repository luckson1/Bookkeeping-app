const express= require('express');
const dbConnect=require ('./config/dbConnect')
const {errorHandler, notFound} =require ('./middleware/errorMiddleware')
const dotenv=require ('dotenv')
const cors= require ('cors');


const userRoutes = require('./routes/users/users');
const incomeRoutes=require ('./routes/income/Income');
const ExpensesRoutes = require('./routes/expenses/Expenses');
const accountStatsRoute = require('./routes/accountStats/accountStats');
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

// income routes
app.use("/api/income", incomeRoutes);

// Expenses routes
app.use("/api/expenses", ExpensesRoutes);

//accounts stats 
app.use('/api/accounts-statistics', accountStatsRoute)

//errors

app.use(notFound);
app.use(errorHandler);

module.exports=app