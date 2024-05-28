import { listEmployeesApi } from "../service";

export const listEmployeesReducer = {
    [listEmployeesApi.reducerPath]: listEmployeesApi.reducer
}