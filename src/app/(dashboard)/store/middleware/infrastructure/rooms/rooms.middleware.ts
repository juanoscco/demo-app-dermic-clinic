import {
    roomsListMiddleware,
    infrastructureRoomCreateMiddleware,
    infrastructureRoomUpdateMiddleware,
    infraRoomsDeleteMiddleware
} from "@/app/(dashboard)/store"

export const infrastructureRoomsMiddleware = [
    roomsListMiddleware,
    infrastructureRoomCreateMiddleware,
    infrastructureRoomUpdateMiddleware,
    infraRoomsDeleteMiddleware
]