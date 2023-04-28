import { configureStore } from '@reduxjs/toolkit';
import foldersListReducer from './foldersList/foldersList';
import nextStepsReducer from './nextSteps/nextSteps';

export const store = configureStore({
    reducer: {
        foldersList: foldersListReducer,
        nextSteps: nextStepsReducer
    }
})