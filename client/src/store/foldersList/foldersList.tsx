import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import query from 'tools/query';

export const fetchFoldersList = createAsyncThunk<any, string>("fetchFoldersList", async (userId: string) => {
    const response = await query(`folder/${userId}`, 'GET');
    return await response.json();
})

const ALL_GOALS_FOLDER = {
    name: "All goals",
    _id: ""
}

const foldersList = createSlice({
    name: "foldersList",
    initialState: {
        loading: false,
        data: null,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchFoldersList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchFoldersList.fulfilled, (state, action) => {
            state.loading = false;

            state.data = [
                ALL_GOALS_FOLDER,
                ...action.payload];

        });
        builder.addCase(fetchFoldersList.rejected, (state, action: any) => {
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

export default foldersList.reducer;

