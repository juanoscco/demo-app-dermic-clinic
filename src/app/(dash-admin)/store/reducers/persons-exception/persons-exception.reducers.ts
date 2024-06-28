import { exceptionCreateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/exceptions/components/create/store/reducer";
import { employeeExceptionsDeleteReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/exceptions/components/delete/store/reducer";
import { exceptionDetailReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/exceptions/components/find-by-id/store/reducer";
import { listExceptionsReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/exceptions/components/list/store/reducer";
import { exceptionUpdateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/exceptions/components/update/store/reducer";

export const personsExceptionsReducers = {
    ...listExceptionsReducer,
    ...exceptionCreateReducer,
    ...exceptionUpdateReducer,
    ...exceptionDetailReducer,
    ...employeeExceptionsDeleteReducer
}