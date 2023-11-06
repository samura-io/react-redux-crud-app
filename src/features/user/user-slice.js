import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUserInfo = createAsyncThunk(
    '@@user/userInfo',
    async (id, {extra: {client, api}}) => {
        return client.get(api.user(id));
    });

export const deleteUser = createAsyncThunk(
    '@@user/deleteUser',
    async (id, {extra: {client, api}}) => {
        return client.delete(api.user(id));
    });
    
export const editUser = createAsyncThunk(
    '@@user/editUser',
    async ({id, userData}, {extra: {client, api}}) => {
        return client.patch(api.user(id), userData);
    });

const initialState = {
    isLoading: false,
    message: null,
    type: null,
    error: null,
    firstName: null,
    lastName: null,
    email: null,
    avatar: null,
}

const userSlice = createSlice({
    name: '@@user',
    initialState,
    reducers: {
        clearUserInfo: () => initialState,
        editUsersInfo: (state, action) => {
            state.firstName = action.payload['first_name'];
            state.lastName = action.payload['last_name'];
            state.email = action.payload.email;
        } 
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getUserInfo.fulfilled, (state, action)=>{
            state.isLoading = false;
            state.error = false;
            state.firstName = action.payload.data.data['first_name'];
            state.lastName = action.payload.data.data['last_name'];
            state.email = action.payload.data.data.email;
            state.avatar = action.payload.data.data.avatar;
        })
        .addCase(deleteUser.fulfilled, (state, action)=>{
            state.type = 'success'
            state.isLoading = false;
            state.error = false;
            state.message = "Пользователь успешно удален";
        })
        .addCase(editUser.fulfilled, (state, action)=>{
            console.log(action);
            state.type = 'success'
            state.isLoading = false;
            state.error = false;
            state.message = "Данные пользователя успешно изменены";
        })
        .addMatcher((action)=>
            action.type.endsWith('/pending'),
            (state) => {
                state.message = null;
                state.type = null;
                state.isLoading = true;
                state.error = null;
            }
        )
        .addMatcher((action)=>
            action.type.endsWith('/rejected'),
            (state, action) => {
                state.type = 'error';
                state.isLoading = false;
                state.message = action.error.message;
                state.error = action.error.message;
            }
        )
    }
});

export const { clearUserInfo, editUsersInfo } = userSlice.actions;
export const userReducer = userSlice.reducer