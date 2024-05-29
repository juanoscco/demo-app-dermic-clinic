import { procedureCreateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/create/store/middleware";
import { listProceduresMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Procedures/store/middleware";
import { procedureUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Procedures/update-procedures/store/middleware/update-procedure.middleware";

export const proceduresMiddleware = [
    procedureCreateMiddleware,
    listProceduresMiddleware,
    procedureUpdateMiddleware
]