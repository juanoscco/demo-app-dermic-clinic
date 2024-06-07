import { getRoomProcedureMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Rooms/store/get/middleware";
import { postRoomProcedureMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Rooms/store/post/middleware";
import { putRoomProcedureMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Rooms/store/put/middleware/";

export const proceduresRoomsMiddleware = [
    getRoomProcedureMiddleware,
    postRoomProcedureMiddleware,
    putRoomProcedureMiddleware
]