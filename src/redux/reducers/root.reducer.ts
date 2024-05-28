import { authReducer } from "@/app/(auth)/store/reducer/"
import { dniSearchReducer } from "@/config/search-dni/reducer"
import { patientReducers } from "@/app/(dash-admin)/store/reducers/patients"
import { personsReducers } from "@/app/(dash-admin)/store/reducers/persons"
import { infrastructureReducers } from "@/app/(dash-admin)/store/reducers/infrastructure"
import { proceduresReducers } from "@/app/(dash-admin)/store/reducers/procedures/procedures.reducers"


export const rootReducer = {
    ...authReducer,
    ...dniSearchReducer,
    // 
    ...patientReducers,
    ...personsReducers,
    ...infrastructureReducers,
    ...proceduresReducers
}