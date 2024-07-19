import { agendaCreateApi } from "../services";

export const agendaCreateReducer = {
    [agendaCreateApi.reducerPath]: agendaCreateApi.reducer
}