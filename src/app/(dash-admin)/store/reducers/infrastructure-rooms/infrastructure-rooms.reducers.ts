import { infrastructureRoomCreateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/[id]/infra-rooms/create/store/reducer";
import { infraRoomsDeleteReducer } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/[id]/infra-rooms/delete/store/reducer";
import { roomsListReducer } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/[id]/infra-rooms/list/store/reducer";
import { infrastructureRoomUpdateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/[id]/infra-rooms/update/store/reducer";

export const infrastructureRoomsReducer = {
    ...roomsListReducer,
    ...infrastructureRoomCreateReducer,
    ...infrastructureRoomUpdateReducer,
    ...infraRoomsDeleteReducer
}