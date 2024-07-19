import { appointmentCreateApi } from "../services";

export const appointmentCreateReducer = {
    [appointmentCreateApi.reducerPath]: appointmentCreateApi.reducer
}