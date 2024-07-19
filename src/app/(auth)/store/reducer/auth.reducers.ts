import { authApi } from "../service";

export const authReducer = {
    [authApi.reducerPath]: authApi.reducer
}