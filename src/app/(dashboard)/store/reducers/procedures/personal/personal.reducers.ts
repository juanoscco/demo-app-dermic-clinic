import {
    getPersonalProcedureReducer,
    postPersonalProcedureReducer,
    putPersonalProcedureReducer,
    findbyIdHeadBoardProcedureAvailableReducer
 } from "@/app/(dashboard)/store"


export const proceduresPersonalReducer = {
    ...getPersonalProcedureReducer,
    ...postPersonalProcedureReducer,
    ...putPersonalProcedureReducer,
    ...findbyIdHeadBoardProcedureAvailableReducer

}