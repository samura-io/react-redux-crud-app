import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import usersReducer from './slices/usersSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: usersReducer,
        user: userReducer,
    }
})