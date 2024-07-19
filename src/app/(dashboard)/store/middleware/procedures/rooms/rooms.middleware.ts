// import { findbyIdRoomProcedureAvailableMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Rooms/store/get-find-id/middleware";
// import { getRoomProcedureMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Rooms/store/get/middleware";
// import { postRoomProcedureMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Rooms/store/post/middleware";
// import { putRoomProcedureMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Rooms/store/put/middleware/";

import {
    getRoomProcedureMiddleware,
    postRoomProcedureMiddleware,
    putRoomProcedureMiddleware,
    findbyIdRoomProcedureAvailableMiddleware
 } from "@/app/(dashboard)/store"


export const proceduresRoomsMiddleware = [
    getRoomProcedureMiddleware,
    postRoomProcedureMiddleware,
    putRoomProcedureMiddleware,
    findbyIdRoomProcedureAvailableMiddleware
]