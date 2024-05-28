import { employeeCreateApi } from "../services";

export const employeeCreateReducer = {
    [employeeCreateApi.reducerPath]: employeeCreateApi.reducer
}