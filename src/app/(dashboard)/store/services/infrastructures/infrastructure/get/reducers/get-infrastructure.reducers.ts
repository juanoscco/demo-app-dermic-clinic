import { infrastructureListApi } from "../services";

export const infrastructureListReducer = {
    [infrastructureListApi.reducerPath]: infrastructureListApi.reducer
}