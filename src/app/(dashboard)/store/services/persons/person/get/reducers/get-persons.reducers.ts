import { listEmployeesApi } from "../services";

export const listEmployeesReducer = {
    [listEmployeesApi.reducerPath]: listEmployeesApi.reducer
}