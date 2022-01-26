import { createSlice } from "@reduxjs/toolkit";

const errorSlice = createSlice({
    name:'error',
    initialState:{
        loginError : null,
    },
    reducers:{
        loginFailure:(state, action)=>{
            state.loginError= action.payload
        },
    }
})

export const {loginFailure} = errorSlice.actions
export default errorSlice.reducer