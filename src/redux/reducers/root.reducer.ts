import { authReducer } from "@/app/(auth)/store/reducer/"
import { dniSearchReducer } from "@/config/search-dni/reducer"
import { patientReducers } from "@/app/(dash-admin)/store/reducers/patients"
import { personsReducers } from "@/app/(dash-admin)/store/reducers/persons"
import { infrastructureReducers } from "@/app/(dash-admin)/store/reducers/infrastructure"
import { proceduresReducers } from "@/app/(dash-admin)/store/reducers/procedures/procedures.reducers"
import { infrastructureRoomsReducer } from "@/app/(dash-admin)/store/reducers/infrastructure-rooms"
import { personsSchedulesReducer } from "@/app/(dash-admin)/store/reducers/persons-schedules"
import { personsExceptionsReducers } from "@/app/(dash-admin)/store/reducers/persons-exception"
import { personsAgendaOpeningReducer } from "@/app/(dash-admin)/store/reducers/persons-agenda-opening"
import { appointmentsReducer } from "@/app/(dash-admin)/store/reducers/appointments"


export const rootReducer = {
    ...authReducer,
    ...dniSearchReducer,
    // 
    ...patientReducers,
    ...personsReducers,
    ...infrastructureReducers,
    ...proceduresReducers,
    ...infrastructureRoomsReducer,
    ...personsSchedulesReducer,
    ...personsExceptionsReducers,
    ...personsAgendaOpeningReducer,
    ...appointmentsReducer
}