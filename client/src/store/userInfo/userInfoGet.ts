import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import query from 'tools/query';

export const fetchUserInfo = createAsyncThunk<any, string>("fetchUserInfo", async (userId: string) => {
    const response = await  query(`user/${userId}`, "get");
    return await response.json();
})

const userInfo = createSlice({
    name: "userInfo",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchUserInfo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUserInfo.rejected, (state, action: any) => {
            state.loading = false;
            state.data = {};
            if (action.payload) {
                state.error = action.payload.errorMessage
            } else {
                state.error = action.error.message
            }
        })
    }
});

export default userInfo.reducer;

