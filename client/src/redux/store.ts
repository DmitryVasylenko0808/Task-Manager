import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../api/auth/authApi";
import authSlice from "./slices/authSlice";
import { boardsApi } from "../api/boards/boardsApi";
import { tasksApi } from "../api/tasks/tasksApi";
import { prioritiesApi } from "../api/priorities/prioritiesApi";


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [boardsApi.reducerPath]: boardsApi.reducer,
        [tasksApi.reducerPath]: tasksApi.reducer,
        [prioritiesApi.reducerPath]: prioritiesApi.reducer,
        auth: authSlice
    },
    middleware: (getDefaultMiddeware) => getDefaultMiddeware()
        .concat(authApi.middleware)
        .concat(boardsApi.middleware)
        .concat(tasksApi.middleware)
        .concat(prioritiesApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;