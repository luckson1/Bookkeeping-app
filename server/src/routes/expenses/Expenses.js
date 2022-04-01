const express= require ('express')
const {createExpensesCtrl, fetchOneExpense, fetchExpensesCtrl, updateExpensesctrl, deleteExpensesctrl}=require("../../controllers/expenses/expenses");
const auth = require('../../middleware/auth');


const ExpensesRoutes=express.Router();

ExpensesRoutes.post('/', auth, createExpensesCtrl);
ExpensesRoutes.get('/', auth,fetchExpensesCtrl);
ExpensesRoutes.get('/:id', auth,async (req, res)=> {fetchOneExpense});
ExpensesRoutes.put('/:id',auth, async (req, res)=> {updateExpensesctrl});
ExpensesRoutes.delete('/:id', auth,async (req, res)=> {deleteExpensesctrl});




module.exports=ExpensesRoutes;