import { procedureCreateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/create/store/reducer"
import { procedureDeleteReducer } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Procedures/delete-procedures/store/reducers"
import { listProceduresReducers } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Procedures/store/reducer"
import { procedureUpdateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Procedures/update-procedures/store/reducer/update-procedure.reducers"

export const proceduresReducers = {
    ...procedureCreateReducer,
    ...listProceduresReducers,
    ...procedureUpdateReducer,
    ...procedureDeleteReducer
}