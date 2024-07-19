import { appointmentListApi } from "../services";

export const appointmentListReducer = {
    [appointmentListApi.reducerPath]: appointmentListApi.reducer
}