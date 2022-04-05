import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { baseURL } from "../../../utils/baseURL";
//create sale action

export const createsaleAction = createAsyncThunk(
    "sale/create",
    async (payload, { rejectWithValue, getState, dispatch }) => {
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

        const { data } = await axios.post(`${baseURL}/sales`, payload, config);
        
        return data;
        
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});

// fetching all salesSlices
export const FetchSalesAction = createAsyncThunk('sale/fetch', async (payload, { rejectWithValue, getState, dispatch }) => {
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

        const { data } = await axios.get(`${baseURL}/sales?pages=${payload}`,  config);
        
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});

// update sales
export const UpdateSaleAction = createAsyncThunk('sale/update', async (payload, { rejectWithValue, getState, dispatch }) => {
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

        const { data } = await axios.put(`${baseURL}/sales/${payload?.id}`, payload, config);
        
        return data;
    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }



});
const salesSlices = createSlice({
    name: 'sale',
    initialState: {

    },
    extraReducers: (builder) => {
        // create sale
        // handle pending state
        builder.addCase(createsaleAction.pending, (state, action) => {
            state.saleLoading = true;

        });

        //hande success state
        builder.addCase(createsaleAction.fulfilled, (state, action) => {
            state.saleCreated = action?.payload;
            state.saleLoading = false;
            state.saleAppErr = undefined;
            state.saleServerErr = undefined;
        });
        //hande rejected state

        builder.addCase(createsaleAction.rejected, (state, action) => {
            state.saleLoading = false;
            state.saleAppErr = action?.payload?.msg;
            state.saleServerErr = action?.error?.msg;
        })

        //fetchAll
        // handle pending state
        builder.addCase(FetchSalesAction.pending, (state, action) => {
            state.saleLoading = true;

        });

        //hande success state
        builder.addCase(FetchSalesAction.fulfilled, (state, action) => {
            state.saleList = action?.payload;
            state.saleLoading = false;
            state.saleAppErr = undefined;
            state.saleServerErr = undefined;
        });
        //hande rejected state

        builder.addCase(FetchSalesAction.rejected, (state, action) => {
            state.saleLoading = false;
            state.saleAppErr = action?.payload?.msg;
            state.saleServerErr = action?.error?.msg;
        });

           //update sale
        // handle pending state
        builder.addCase(UpdateSaleAction.pending, (state, action) => {
            state.saleLoading = true;

        });

        //hande success state
        builder.addCase(UpdateSaleAction.fulfilled, (state, action) => {
            state.UpdatedSale = action?.payload;
            state.saleLoading = false;
            state.saleAppErr = undefined;
            state.saleServerErr = undefined;
        });
        //hande rejected state

        builder.addCase(UpdateSaleAction.rejected, (state, action) => {
            state.saleLoading = false;
            state.saleAppErr = action?.payload?.msg;
            state.saleServerErr = action?.error?.msg;
        })

    }
});


export default salesSlices.reducer;