const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    isLoading: false,
    message: null,
    type: null,
    error: null,
    page: 0,
    totalPages: 0,
    list: [],
}

export const loadUsersList = createAsyncThunk(
    '@@users/load-users',
    async (page, {
        extra: {
            client,
            api
        }
    }) => {
        return client.get(api.getUsersList(page))
    }
    )

const usersSlice = createSlice({
    name: '@@users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadUsersList.pending, (state) => {
                state.message = null;
                state.type = null; 
                state.error = null;
                state.isLoading = true;
            })
            .addCase(loadUsersList.rejected, (state, action) => {
                state.error = action.error.message;
                state.message = action.error.message;
                state.isLoading = false;
                state.type = 'error'; 
            })
            .addCase(loadUsersList.fulfilled, (state, action) => {
                state.error = null;
                state.isLoading = false;
                state.list = action.payload.data.data;
                state.page = action.payload.data.page;
                localStorage.setItem('page', action.payload.data.page);
                state.totalPages= action.payload.data['total_pages'];
                state.message = null;
                state.type = null; 
                state.list.map((user)=> {
                    user.key = user.id
                 })
            })
    }
})

export const usersReducer = usersSlice.reducer;
