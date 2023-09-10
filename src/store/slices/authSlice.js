import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    jwt: localStorage.getItem('jwt'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action){
            state.jwt = action.payload.jwt;
        },
        removeToken(state){
            state.jwt = null;
        },
    },
})

export const {setToken, removeToken} = authSlice.actions;
export default authSlice.reducer;
