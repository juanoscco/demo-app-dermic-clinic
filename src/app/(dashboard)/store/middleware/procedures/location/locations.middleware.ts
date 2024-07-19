// import { findbyIdLocationProcedureAvailableMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Location/store/get-find-id/middleware";
// import { getLocationProcedureMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Location/store/get/middleware/get-location.middleware";
// import { postlocationProcedureMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Location/store/post/middleware";
// import { putLocationProcedureMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Location/store/put/middleware";

import {
    getLocationProcedureMiddleware,
    postlocationProcedureMiddleware,
    putLocationProcedureMiddleware,
    findbyIdLocationProcedureAvailableMiddleware
} from "@/app/(dashboard)/store"


export const proceduresLocationMiddleware = [
    getLocationProcedureMiddleware,
    postlocationProcedureMiddleware,
    putLocationProcedureMiddleware,
    findbyIdLocationProcedureAvailableMiddleware
]