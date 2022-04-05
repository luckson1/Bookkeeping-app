import {configureStore} from "@reduxjs/toolkit";
import usersReducer from '../slices/users/userSlices'
import expensesReducer from '../slices/expenses/ExpenseSlices'
import salesReducer from '../slices/sales/SaleSlices'

const store=configureStore( {
    reducer: {
        users: usersReducer,
        expenses: expensesReducer,
        sales: salesReducer,
    }
});



export default store;