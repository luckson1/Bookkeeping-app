const express= require ('express')
const {createExpensesCtrl, fetchOneExpense, fetchExpensesCtrl, updateExpensesctrl, deleteExpensesctrl}=require("../../controllers/expenses/expenses");
const auth = require('../../middleware/auth');


const ExpensesRoutes=express.Router();

ExpensesRoutes.post('/', auth, createExpensesCtrl);
ExpensesRoutes.get('/', auth,fetchExpensesCtrl);
ExpensesRoutes.get('/:id', auth,fetchOneExpense);
ExpensesRoutes.put('/:id',auth, updateExpensesctrl);
ExpensesRoutes.delete('/:id', auth.apply, deleteExpensesctrl);




module.exports=ExpensesRoutes;