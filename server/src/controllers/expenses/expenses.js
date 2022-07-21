const expressAsyncHandler = require("express-async-handler");
const Expenses = require("../../models/Expenses");


//fetch all expenses
const fetchExpensesCtrl = expressAsyncHandler(async (req, res) => {
  const id=req?.user?._id
  const { page } = req?.query;
  try {
    const expenses = await Expenses.paginate({user:id},
      
      { limit: 10, page: Number(page)}
    );

    
    res.json(expenses);
  } catch (error) {
    res.json(error);
  }
});

//create expenses

const createExpensesCtrl =  expressAsyncHandler(async (req, res) => {
    
    const { title, amount, description } = req.body;
    try {
      const expense = await Expenses.create({
        title,
        amount,
        description,
        user: req?.user?._id
        
      });
      
      res.json(expense);
      
      
    } catch (error) {
      res.json(error);
    }
  });

//fetch single expenses

const fetchOneExpense = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params;
    try {
        const expense = await Expenses.findbyId({ id })
        res.json(expense)
    } catch (error) {
        res.json(error)
    }
});

//updates

const updateExpensesctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req?.params;
    const { title, amount, description } = req.body;
    try {
      const expense = await Expenses.findByIdAndUpdate(
        id,
        {
          title,
          description,
          amount,
        },
        { new: true }
      );
      res.json(expense);
    } catch (error) {
      res.json(error);
    }
  });


//delete transaction

const deleteExpensesctrl = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    try {
        const expense = await Expenses.findByIdAndDelete (id)
        res.json(expense)
    } catch (error) {

        res.json(error)
    }
})

module.exports = { createExpensesCtrl, fetchOneExpense, fetchExpensesCtrl, updateExpensesctrl, deleteExpensesctrl }