import {
    listScheludesMiddleware,
    scheduleCreateMiddleware,
    scheduleUpdateMiddleware,
} from "@/app/(dashboard)/store"
export const personsSchedulesMiddleware = [
    listScheludesMiddleware,
    scheduleCreateMiddleware,
    scheduleUpdateMiddleware,
]