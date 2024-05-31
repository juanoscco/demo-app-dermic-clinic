import { exceptionCreateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/exceptions/components/create/store/middleware";
import { exceptionDetailMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/exceptions/components/find-by-id/store/middleware";
import { listExceptionsMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/exceptions/components/list/store/middleware";
import { exceptionUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/exceptions/components/update/store/middleware";

export const personsExceptionsMiddleware = [
    listExceptionsMiddleware,
    exceptionCreateMiddleware,
    exceptionUpdateMiddleware,
    exceptionDetailMiddleware
]