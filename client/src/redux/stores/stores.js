import {configureStore} from "@reduxjs/toolkit";
import usersReducer from '../slices/users/userSlices'

const store=configureStore( {
    reducer: {
        user: usersReducer
    }
});



export default store;