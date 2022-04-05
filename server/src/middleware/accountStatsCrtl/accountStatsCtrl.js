const expressAsyncHandler = require('express-async-handler')
const Expenses= require("../../models/Expenses")
const Sales= require("../../models/Sales")


const accountStatsCtrl= expressAsyncHandler(async (req, res) => {
    // Expenses stats

try {
    //expenses stats
    const expenseStats= await Expenses.aggregate([
        //filter
        {$match: {amount: {$gte:0}}},
        {
            $group: {
                _id: null,
                averageExpense: {$avg: "$amount"},
                totalExpenses: {$sum: "$amount"},
                minExpense: {$min: "$amount"},
                maxExpense: {$max: "$amount"},
                totalRecordsExpenses: {$sum: 1}
            }
        }
    ])

    // sales stats
    const salesStats= await Sales.aggregate([
        //filter
        {$match: {amount: {$gte:0}}},
        {
            $group: {
                _id: null,
                averageSale: {$avg: "$amount"},
                totalSales: {$sum: "$amount"},
                minSale: {$min: "$amount"},
                maxSale: {$max: "$amount"},
                totalRecordsSales: {$sum: 1}
            }
        }
    ])
    res.json(salesStats, expenseStats)
} catch (error) {
   res.json(error) 
}
})

module.exports = accountStatsCtrl