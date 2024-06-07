import { getLocationProcedureMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Location/store/get/middleware/get-location.middleware";
import { postlocationProcedureMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Location/store/post/middleware";
import { putLocationProcedureMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Location/store/put/middleware";

export const proceduresLocationMiddleware = [
    getLocationProcedureMiddleware,
    postlocationProcedureMiddleware,
    putLocationProcedureMiddleware
]