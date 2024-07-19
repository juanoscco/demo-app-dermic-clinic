import { patientDeleteApi } from "../services";

export const patientDeleteReducer = {
    [patientDeleteApi.reducerPath]: patientDeleteApi.reducer
}