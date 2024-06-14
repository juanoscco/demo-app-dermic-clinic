import { findbyIdHeadBoardProcedureAvailableReducer } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Personal/store/find-by-id/reducer";
import { getPersonalProcedureReducer } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Personal/store/get/reducer";
import { postPersonalProcedureReducer } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Personal/store/post/reducer";
import { putPersonalProcedureReducer } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Personal/store/put/reducer";

export const proceduresPersonalReducer = {
    ...getPersonalProcedureReducer,
    ...postPersonalProcedureReducer,
    ...putPersonalProcedureReducer,
    ...findbyIdHeadBoardProcedureAvailableReducer

}