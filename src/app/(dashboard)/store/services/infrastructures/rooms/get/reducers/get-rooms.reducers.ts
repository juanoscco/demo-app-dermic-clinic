import { roomsListApi } from "../services";

export const roomsListReducer = {
    [roomsListApi.reducerPath]: roomsListApi.reducer
}