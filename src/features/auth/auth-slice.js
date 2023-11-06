import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const registration = createAsyncThunk(
    '@@auth/registration',
    async ({email, password}, {extra:{client, api}}) => {
        return client.post(api.registration(), {email, password})
    }
)

export const login = createAsyncThunk(
    '@@auth/login',
    async ({email, password}, {extra:{client, api}}) => {
        return client.post(api.login(), {email, password})
    }
)

const initialState = {
    isLoggedIn: false,
    isLoading: false,
    error: false,
    type: null,
    message: null,
    token: null,
}

const authSlice = createSlice({
    name: '@@auth',
    initialState,
    reducers:{
        checkAuth: (state) => {
            // reqres.in не предоставляет API для проверки авторизации,
            // по-этому захардкодил это здесь
            console.log(localStorage.getItem('JWT'))
            if (localStorage.getItem('JWT') === 'QpwL5tke4Pnpja7X4'){
                state.isLoggedIn = true;
            } else {
                state.isLoggedIn = false;
            }
        },
        logout: (state) => {
            state.isLoggedIn = false;
            localStorage.removeItem('JWT');
            localStorage.removeItem('page');
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registration.fulfilled, (state, action)=>{
                state.isLoggedIn = true;
                state.isLoading = false;
                state.token = action.payload.data.token;
                localStorage.setItem('JWT', action.payload.data.token);
            })
            .addCase(login.fulfilled, (state, action)=>{
                state.isLoggedIn = true;
                state.isLoading = false;
                state.token = action.payload.data.token;
                localStorage.setItem('JWT', action.payload.data.token);
            })
            .addMatcher((action)=>
                action.type.endsWith('/pending'),
                (state) => {
                    state.isLoading = true;
                    state.error = null;
                    state.type = null;
                    state.message = null;
                }
            )         
            .addMatcher((action)=>
                action.type.endsWith('/rejected'),
                (state, action) => {
                    state.isLoading = false;
                    state.type = 'error';
                    state.error = action.error.message;
                    state.message = action.error.message;
                    console.log(action)
                }
            )                 
    }
})

export const authReducer = authSlice.reducer;
export const { checkAuth, logout } = authSlice.actions;
