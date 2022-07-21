const expressAsyncHandler = require('express-async-handler')
const Expenses= require("../../models/Expenses")
const Income= require("../../models/Income")


const accountStatsCtrl= expressAsyncHandler(async (req, res) => {
    // Expenses stats

try {
    //expenses stats
    const expenseStats= await Expenses.aggregate([
        //filter
        {$match: {amount: {$gte:0}}},
        {
            $group: {
                _id: "$user",
                averageExpense: {$avg: "$amount"},
                totalExpenses: {$sum: "$amount"},
                minExpense: {$min: "$amount"},
                maxExpense: {$max: "$amount"},
                totalRecordsExpenses: {$sum: 1}
            }
        }
    ])

    // Income stats
    const incomeStats= await Income.aggregate([
        //filter
        {$match: {amount: {$gte:0}}},
        {
            $group: {
                _id: "$user",
                averageIncome: {$avg: "$amount"},
                totalIncome: {$sum: "$amount"},
                minIncome: {$min: "$amount"},
                maxIncome: {$max: "$amount"},
                totalRecordsIncome: {$sum: 1}
            }
        }
    ])
    res.json({incomeStats, expenseStats})
} catch (error) {
   res.json({error}) 
}
})

module.exports = accountStatsCtrl