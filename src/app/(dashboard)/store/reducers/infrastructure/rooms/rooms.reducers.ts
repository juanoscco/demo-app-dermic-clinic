import {
    roomsListReducer,
    infrastructureRoomCreateReducer,
    infrastructureRoomUpdateReducer,
    infraRoomsDeleteReducer
} from "@/app/(dashboard)/store"

export const infrastructureRoomsReducer = {
    ...roomsListReducer,
    ...infrastructureRoomCreateReducer,
    ...infrastructureRoomUpdateReducer,
    ...infraRoomsDeleteReducer
}