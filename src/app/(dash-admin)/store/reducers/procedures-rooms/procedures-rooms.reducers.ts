import { findbyIdRoomProcedureAvailableReducer } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Rooms/store/get-find-id/reducer";
import { getRoomProcedureReducers } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Rooms/store/get/reducer";
import { postRoomProcedureReducers } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Rooms/store/post/reducer";
import { putRoomProcedureReducers } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Rooms/store/put/reducer/put-rooms.reducers";

export const proceduresRoomsReducers = {
    ...putRoomProcedureReducers,
    ...postRoomProcedureReducers,
    ...getRoomProcedureReducers,
    ...findbyIdRoomProcedureAvailableReducer
}