import { procedureCreateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/create/store/middleware";
import { listProceduresMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Procedures/store/middleware";

export const proceduresMiddleware = [
    procedureCreateMiddleware,
    listProceduresMiddleware
]