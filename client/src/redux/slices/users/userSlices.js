import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
//login action

export const loginUserAction = createAsyncThunk('user/login', async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        //http call
        const { data } = await axios.post(
            "http://localhost:4000/api/users/login",
            payload,
            config);

    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }


});


//slices

const usersSlices = createSlice({
    name: 'user',
    initialValues: {},
    extraReducers: (builder) => {

        // handle pending state
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userLoading = true;
            state.userAppErr = undefined;
            state.userLoading = undefined;
        });

        //hande success state
        builder.addCase(loginUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.userLoading = false;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });
        //hande rejected state

        builder.addCase(loginUserAction.rejected, (state, action) => {

            state.userLoading = false;
            state.userAppErr = action?.payload?.message;
            state.userAppErr = action?.error?.message;
        });

    }
});

export default usersSlices.reducer;