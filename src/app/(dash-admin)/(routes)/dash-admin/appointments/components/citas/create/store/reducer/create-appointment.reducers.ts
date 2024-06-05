import { appointmentCreateApi } from "../service";

export const appointmentCreateReducer = {
    [appointmentCreateApi.reducerPath]: appointmentCreateApi.reducer
}