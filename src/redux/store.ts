import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import { rootReducer } from "./reducers"
import { rootMiddlewares } from "./middleware"


export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => rootMiddlewares(getDefaultMiddleware)
});

setupListeners(store.dispatch);
