import { getPersonalProcedureMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Personal/store/get/middleware";
import { postPersonalProcedureMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Personal/store/post/middleware";
import { putPersonalProcedureMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Personal/store/put/middleware";

export const proceduresPersonalMiddleware = [
    getPersonalProcedureMiddleware,
    postPersonalProcedureMiddleware,
    putPersonalProcedureMiddleware
]