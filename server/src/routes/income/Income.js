const express= require ('express')
const {createIncomeCtrl, fetchIncomeCtrl, fetchOneIncome, updateIncomectrl, deleteIncomectrl}=require("../../controllers/income/Income");
const auth = require('../../middleware/auth');


const incomeRoutes=express.Router();


incomeRoutes.post('/', auth,  createIncomeCtrl);
incomeRoutes.get('/',  auth,  fetchIncomeCtrl);
incomeRoutes.get('/:id', auth,  fetchOneIncome);
incomeRoutes.put('/:id', auth, updateIncomectrl);
incomeRoutes.delete('/:id', auth,  deleteIncomectrl);




module.exports=incomeRoutes;