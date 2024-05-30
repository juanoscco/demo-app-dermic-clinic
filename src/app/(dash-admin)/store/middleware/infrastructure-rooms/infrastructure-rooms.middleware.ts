import { infrastructureRoomCreateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/[id]/infra-rooms/create/store/middleware";
import { roomsListMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/[id]/infra-rooms/list/store/middleware";
import { infrastructureRoomUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/[id]/infra-rooms/update/store/middleware";

export const infrastructureRoomsMiddleware = [
    roomsListMiddleware,
    infrastructureRoomCreateMiddleware,
    infrastructureRoomUpdateMiddleware
]