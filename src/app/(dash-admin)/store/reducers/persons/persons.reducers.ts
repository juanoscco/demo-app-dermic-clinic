import { employeeCreateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/create/store/reducers";
import { employeeDeleteReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/list/[id]/employee-delete/store/reducer";
import { employeeUpdateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/list/[id]/employee-update/store/reducer";
import { employeeDetailReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/list/[id]/store/reducer";
import { listEmployeesReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/list/store/reducer";

export const personsReducers = {
    ...employeeCreateReducer,
    ...listEmployeesReducer,
    ...employeeDetailReducer,
    ...employeeUpdateReducer,
    ...employeeDeleteReducer
}