import { scheduleCreateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/schedules/components/create/store/middleware";
import { employeeScheduleDeleteMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/schedules/components/delete/store/middleware/";
import { scheduleDetailMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/schedules/components/find-by-id/store/middleware";
import { listScheludesMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/schedules/components/list/store/middleware";
import { scheduleUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/schedules/components/update/store/middleware";

export const personsSchedulesMiddleware = [
    listScheludesMiddleware,
    scheduleCreateMiddleware,
    scheduleUpdateMiddleware,
    scheduleDetailMiddleware,
    employeeScheduleDeleteMiddleware
]