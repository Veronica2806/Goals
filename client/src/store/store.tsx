import { configureStore } from '@reduxjs/toolkit';
import foldersListReducer from './foldersList/foldersList';
import nextStepsReducer from './nextSteps/nextSteps';
import userInfoReducer from './userInfo/userInfoGet';

export const store = configureStore({
    reducer: {
        foldersList: foldersListReducer,
        nextSteps: nextStepsReducer,
        userInfo: userInfoReducer
    }
})