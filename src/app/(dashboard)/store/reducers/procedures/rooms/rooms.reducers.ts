import { 
    putRoomProcedureReducers,
    postRoomProcedureReducers,
    getRoomProcedureReducers,
    findbyIdRoomProcedureAvailableReducer
} from "@/app/(dashboard)/store"


export const proceduresRoomsReducers = {
    ...putRoomProcedureReducers,
    ...postRoomProcedureReducers,
    ...getRoomProcedureReducers,
    ...findbyIdRoomProcedureAvailableReducer
}