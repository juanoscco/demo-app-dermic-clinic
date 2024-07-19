import { patientCreateApi } from "../services/";

export const patientCreateReducer = {
    [patientCreateApi.reducerPath]: patientCreateApi.reducer
}