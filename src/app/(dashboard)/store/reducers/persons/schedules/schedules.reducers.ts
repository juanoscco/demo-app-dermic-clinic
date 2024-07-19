
import {
    listScheludesReducer,
    scheduleCreateReducer,
    scheduleUpdateReducer,
}
    from "@/app/(dashboard)/store"

export const personsSchedulesReducer = {
    ...listScheludesReducer,
    ...scheduleCreateReducer,
    ...scheduleUpdateReducer,
}