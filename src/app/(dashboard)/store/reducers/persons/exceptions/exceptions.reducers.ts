// import { exceptionCreateReducer } from "@/app/(dashboard)/(routes)/dash-admin/persons/exceptions/components/create/store/reducer";
// import { employeeExceptionsDeleteReducer } from "@/app/(dashboard)/(routes)/dash-admin/persons/exceptions/components/delete/store/reducer";
// import { exceptionDetailReducer } from "@/app/(dashboard)/(routes)/dash-admin/persons/exceptions/components/find-by-id/store/reducer";
// import { listExceptionsReducer } from "@/app/(dashboard)/(routes)/dash-admin/persons/exceptions/components/list/store/reducer";
// import { exceptionUpdateReducer } from "@/app/(dashboard)/(routes)/dash-admin/persons/exceptions/components/update/store/reducer";

import {
    listExceptionsReducer,
    exceptionCreateReducer,
    exceptionUpdateReducer,
    // exceptionDetailReducer,
    employeeExceptionsDeleteReducer } 
    from "@/app/(dashboard)/store"

export const personsExceptionsReducers = {
    ...listExceptionsReducer,
    ...exceptionCreateReducer,
    ...exceptionUpdateReducer,
    // ...exceptionDetailReducer,
    ...employeeExceptionsDeleteReducer
}