
import {
    listExceptionsMiddleware,
    exceptionCreateMiddleware,
    exceptionUpdateMiddleware,
    // exceptionDetailMiddleware,
    employeeExceptionsDeleteMiddeware
} from "@/app/(dashboard)/store"

export const personsExceptionsMiddleware = [
    listExceptionsMiddleware,
    exceptionCreateMiddleware,
    exceptionUpdateMiddleware,
    // exceptionDetailMiddleware,
    employeeExceptionsDeleteMiddeware
]