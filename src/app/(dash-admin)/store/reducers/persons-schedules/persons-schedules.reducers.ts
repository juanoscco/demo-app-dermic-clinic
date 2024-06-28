import { scheduleCreateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/schedules/components/create/store/reducer";
import { employeeScheduleDeleteReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/schedules/components/delete/store/reducer";
import { scheduleDetailReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/schedules/components/find-by-id/store/reducer";
import { listScheludesReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/schedules/components/list/store/reducer";
import { scheduleUpdateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/schedules/components/update/store/reducer";

export const personsSchedulesReducer = {
    ...listScheludesReducer,
    ...scheduleCreateReducer,
    ...scheduleUpdateReducer,
    ...scheduleDetailReducer,
    ...employeeScheduleDeleteReducer
}