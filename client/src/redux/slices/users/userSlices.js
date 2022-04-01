
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from 'axios'
import { baseURL } from "../../../utils/baseURL";
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
            `${baseURL}/users/login`,
            payload,
            config);

        //save user into localstorage
        localStorage.setItem('userInfo', JSON.stringify(data))
        return data;

    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }


});


//register

export const registerUserAction = createAsyncThunk('user/register', async (payload, { rejectWithValue, getState, dispatch }) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    try {
        //http call
        const { data } = await axios.post(
            `${baseURL}/users/register`,
            payload,
            config);
        return data;

    } catch (error) {
        if (!error?.response) {
            throw error;
        }
        return rejectWithValue(error?.response?.data);
    }


});

//Logout action
export const logout = createAsyncThunk(
    "user/logout",
    async (payload, { rejectWithValue, getState, dispatch }) => {
        try {
            //Save user into localstorage
            localStorage.removeItem("userInfo");
        } catch (error) {
            if (!error?.response) {
                throw error;
            }
            return rejectWithValue(error?.response?.data);
        }
    }
);
// login slices

//Get user from storage
const userLoginFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : undefined;
const usersSlices = createSlice({
    name: 'user',
    initialState: {
        userAuth: userLoginFromStorage
    },
    extraReducers: (builder) => {
        // login
        // handle pending state
        builder.addCase(loginUserAction.pending, (state, action) => {
            state.userLoading = true;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
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
            state.userAppErr = action?.payload?.msg;
            state.userServerErr = action?.error?.msg;
        });
        // register

        // handle pending state
        builder.addCase(registerUserAction.pending, (state, action) => {
            state.userLoading = true;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });

        //hande success state
        builder.addCase(registerUserAction.fulfilled, (state, action) => {
            state.userAuth = action?.payload;
            state.userLoading = false;
            state.userAppErr = undefined;
            state.userServerErr = undefined;
        });
        //hande rejected state

        builder.addCase(registerUserAction.rejected, (state, action) => {

            state.userLoading = false;
            state.userAppErr = action?.payload?.msg;
            state.userServerErr = action?.error?.msg;
        });

        // Logout
        builder.addCase(logout.fulfilled, (state, action) => {
            state.userAuth = undefined;
            state.userLoading = false;
        });


    }
});


export default usersSlices.reducer;