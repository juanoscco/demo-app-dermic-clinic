// import { procedureCreateMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/create/store/middleware";
// import { procedureDeleteMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Procedures/delete-procedures/store/middleware";
// import { listProceduresMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Procedures/store/middleware";
// import { procedureUpdateMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Procedures/update-procedures/store/middleware/update-procedure.middleware";


import {
    procedureCreateMiddleware,
    listProceduresMiddleware,
    procedureUpdateMiddleware,
    procedureDeleteMiddleware
 } from "@/app/(dashboard)/store"


export const proceduresMiddleware = [
    procedureCreateMiddleware,
    listProceduresMiddleware,
    procedureUpdateMiddleware,
    procedureDeleteMiddleware
]