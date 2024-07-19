
import {
    employeeCreateMiddleware,
    listEmployeesMiddleware,
    employeeDetailMiddleware,
    employeeUpdateMiddleware,
    employeeDeleteMiddleware
}
    from "@/app/(dashboard)/store"
export const personsMiddleware = [
    employeeCreateMiddleware,
    listEmployeesMiddleware,
    employeeDetailMiddleware,
    employeeUpdateMiddleware,
    employeeDeleteMiddleware
]