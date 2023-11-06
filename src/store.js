import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";
import * as api from './utils/api';
import { usersReducer } from "features/users/users-slice";
import { userReducer } from "features/user/user-slice";
import { authReducer } from "features/auth/auth-slice";

const store = configureStore({
    reducer: {
        users: usersReducer,
        user: userReducer,
        auth: authReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        thunk: {
            extraArgument: {
                client: axios,
                api,
            }
        },
        serializableCheck: false,
    })
})

export default store;


