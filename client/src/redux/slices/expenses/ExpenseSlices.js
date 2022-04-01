import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { baseURL } from "../../../utils/baseURL";
//create expense action

export const createExpenseAction = createAsyncThunk(
    "expense/create",
    async (payload, { rejectWithValue, getState, dispatch }) => {
      //get user token from store
      const userToken = getState()?.users?.userAuth?.token;
      console.log(userToken)
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },

    };


    try {
        //make http call here

        const { data } = await axios.post(`${baseURL}/expenses`, payload, config);
        console.log(data)
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});

// fetching all expensesSlices
export const FetchExpensesAction = createAsyncThunk('expense/fetch', async (payload, { rejectWithValue, getState, dispatch }) => {
    //get user token from store

    const userToken = getState()?.users?.userAuth?.token;
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
        },

    };


    try {
        //make http call here

        const { data } = await axios.get(`${baseURL}/expenses?pages=${payload}`,  config);
        console.log(data)
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});
const expensesSlices = createSlice({
    name: 'expense',
    initialState: {

    },
    extraReducers: (builder) => {
        // create expense
        // handle pending state
        builder.addCase(createExpenseAction.pending, (state, action) => {
            state.expenseLoading = true;

        });

        //hande success state
        builder.addCase(createExpenseAction.fulfilled, (state, action) => {
            state.expenseCreated = action?.payload;
            state.expenseLoading = false;
            state.expenseAppErr = undefined;
            state.expenseServerErr = undefined;
        });
        //hande rejected state

        builder.addCase(createExpenseAction.rejected, (state, action) => {
            state.expenseLoading = false;
            state.expenseAppErr = action?.payload?.msg;
            state.expenseServerErr = action?.error?.msg;
        })

        //fetchAll
        // handle pending state
        builder.addCase(FetchExpensesAction.pending, (state, action) => {
            state.expenseLoading = true;

        });

        //hande success state
        builder.addCase(FetchExpensesAction.fulfilled, (state, action) => {
            state.expenseList = action?.payload;
            state.expenseLoading = false;
            state.expenseAppErr = undefined;
            state.expenseServerErr = undefined;
        });
        //hande rejected state

        builder.addCase(FetchExpensesAction.rejected, (state, action) => {
            state.expenseLoading = false;
            state.expenseAppErr = action?.payload?.msg;
            state.expenseServerErr = action?.error?.msg;
        })

    }
});


export default expensesSlices.reducer;