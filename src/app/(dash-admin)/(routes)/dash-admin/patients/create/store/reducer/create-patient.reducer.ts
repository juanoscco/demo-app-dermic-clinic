import { patientCreateApi } from "../service";

export const patientCreateReducer = {
    [patientCreateApi.reducerPath]: patientCreateApi.reducer
}