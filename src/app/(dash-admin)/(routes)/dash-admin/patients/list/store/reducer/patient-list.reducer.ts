import { patientApi } from "../service/";

export const patientListReducer = {
    [patientApi.reducerPath]: patientApi.reducer
}