import { configureStore } from '@reduxjs/toolkit';
import foldersListReduces from './foldersList/foldersList';

export const store = configureStore({
    reducer: {
        foldersList: foldersListReduces
    }
})