import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';
import authApi from '../app/(auth)/service/authApi';
import DniApi from '@/app/(dash-admin)/services/ServicesDNI/dni.services';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [DniApi.reducerPath]: DniApi.reducer,
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(authApi.middleware)
            .concat(DniApi.middleware)
});

setupListeners(store.dispatch);
