import {configureStore} from "@reduxjs/toolkit";
import usersReducer from '../slices/users/userSlices'
import expensesReducer from '../slices/expenses/ExpenseSlices'
const store=configureStore( {
    reducer: {
        users: usersReducer,
        expenses: expensesReducer
    }
});



export default store;