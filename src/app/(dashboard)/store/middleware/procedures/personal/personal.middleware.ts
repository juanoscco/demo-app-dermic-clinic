// import { findbyIdHeadBoardProcedureAvailableMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Personal/store/find-by-id/middleware";
// import { getPersonalProcedureMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Personal/store/get/middleware";
// import { postPersonalProcedureMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Personal/store/post/middleware";
// import { putPersonalProcedureMiddleware } from "@/app/(dashboard)/(routes)/dash-admin/procedures/list/components/Personal/store/put/middleware";


import {
    getPersonalProcedureMiddleware,
    postPersonalProcedureMiddleware,
    putPersonalProcedureMiddleware,
    findbyIdHeadBoardProcedureAvailableMiddleware
} from "@/app/(dashboard)/store"


export const proceduresPersonalMiddleware = [
    getPersonalProcedureMiddleware,
    postPersonalProcedureMiddleware,
    putPersonalProcedureMiddleware,
    findbyIdHeadBoardProcedureAvailableMiddleware
]