import { employeeCreateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/create/store/middleware"
import { employeeUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/list/[id]/employee-update/store/middleware"
import { employeeDetailMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/list/[id]/store/middleware"
import { listEmployeesMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/list/store/middleware"

export const personsMiddleware = [
    employeeCreateMiddleware,
    listEmployeesMiddleware,
    employeeDetailMiddleware,
    employeeUpdateMiddleware
]