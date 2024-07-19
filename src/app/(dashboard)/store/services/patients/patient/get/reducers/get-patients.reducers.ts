import { patientApi } from "../services/";

export const patientListReducer = {
    [patientApi.reducerPath]: patientApi.reducer
}