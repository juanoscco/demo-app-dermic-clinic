// import { employeeCreateReducer } from "@/app/(dashboard)/(routes)/dash-admin/persons/create/store/reducers";
// import { employeeDeleteReducer } from "@/app/(dashboard)/(routes)/dash-admin/persons/list/[id]/components/employee-component/components/employee-delete/store/reducer";
// import { employeeUpdateReducer } from "@/app/(dashboard)/(routes)/dash-admin/persons/list/[id]/components/employee-component/components/employee-update/store/reducer";
// import { employeeDetailReducer } from "@/app/(dashboard)/(routes)/dash-admin/persons/list/[id]/store/reducer";
// import { listEmployeesReducer } from "@/app/(dashboard)/(routes)/dash-admin/persons/list/store/reducer";

import {
    employeeCreateReducer,
    listEmployeesReducer,
    employeeDetailReducer,
    employeeUpdateReducer,
    employeeDeleteReducer
} from "@/app/(dashboard)/store"

export const personsReducers = {
    ...employeeCreateReducer,
    ...listEmployeesReducer,
    ...employeeDetailReducer,
    ...employeeUpdateReducer,
    ...employeeDeleteReducer
}