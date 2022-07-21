const expressAsyncHandler = require("express-async-handler");
const Income = require('../../models/Income');

//fetch all income
const fetchIncomeCtrl = expressAsyncHandler(async (req, res) => {
        const { page } = req.query;
        const id= req?.user?._id
        
    try {
      const income = await Income.paginate(
        {user:id},
        { limit: 10, page: Number(page)}
      );
      res.json(income);
    } catch (error) {
      res.json(error);
    }
  });
//create income

const createIncomeCtrl = expressAsyncHandler(async (req, res) => {
    const { title, amount, description } = req.body;
    
    try {
      const income = await Income.create({
        title,
        amount,
        description,
        user: req?.user?._id
        
      });
      
      res.json(income);
      
      
    } catch (error) {
      res.json(error);
    }
  });


//fetch single income

const fetchOneIncome= expressAsyncHandler(async (req, res) => {
    const { id } = req?.params;
    try {
        const income = await Income.findbyId({ id })
        res.json(income)
    } catch (error) {
        res.json(error)
    }
});

//updates

const updateIncomectrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const { title, description, amount, } = req.body
    try {
        const income = await Income.findByIdAndUpdate(id, { title, description, amount }, { new: true })
        res.json(income)
    } catch (error) {

        res.json(error)
    }
});

//delete transaction

const deleteIncomectrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const income = await Income.findByIdAndDelete (id)
        res.json(income)
    } catch (error) {

        res.json(error)
    }
})

module.exports = { createIncomeCtrl, fetchIncomeCtrl, fetchOneIncome, updateIncomectrl, deleteIncomectrl }