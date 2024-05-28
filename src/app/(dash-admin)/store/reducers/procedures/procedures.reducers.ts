import { procedureCreateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/create/store/reducer"
import { listProceduresReducers } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Procedures/store/reducer"

export const proceduresReducers = {
    ...procedureCreateReducer,
    ...listProceduresReducers
}