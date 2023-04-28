import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import query from 'tools/query';

export const fetchNextSteps = createAsyncThunk<any, string>("fetchNextSteps", async (userId: string) => {
    const response = await  query(`goals/nextSteps/${userId}`, "get");
    return await response.json();
})

const nextSteps = createSlice({
    name: "nextSteps",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNextSteps.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchNextSteps.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchNextSteps.rejected, (state, action: any) => {
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

export default nextSteps.reducer;

