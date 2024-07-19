import { patientUpdateApi } from "../services";

export const patientUpdateReducer = {
    [patientUpdateApi.reducerPath]: patientUpdateApi.reducer
}