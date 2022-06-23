import {configureStore} from "@reduxjs/toolkit";
import usersReducer from '../slices/users/userSlices'
import expensesReducer from '../slices/expenses/ExpenseSlices'
import salesReducer from '../slices/sales/SaleSlices'
import accountsStatsReducer from '../slices/accountStats/accountStatsSlices'

const store=configureStore( {
    reducer: {
        users: usersReducer,
        expenses: expensesReducer,
        sales: salesReducer,
        accountsStats: accountsStatsReducer
    }
});



export default store;