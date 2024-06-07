import { postPersonalProcedureApi } from "../service/post-personal.services";

export const postPersonalProcedureReducer = {
    [postPersonalProcedureApi.reducerPath]: postPersonalProcedureApi.reducer
}