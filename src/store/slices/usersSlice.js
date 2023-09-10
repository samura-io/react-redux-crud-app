import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [],
};

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsersList(state, action){
            state.list = action.payload.list;
        }
    },
})

export const {setUsersList} = usersSlice.actions;
export default usersSlice.reducer;
