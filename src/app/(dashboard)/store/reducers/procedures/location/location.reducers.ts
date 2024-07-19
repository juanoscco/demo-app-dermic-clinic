import {
    getLocationProcedureReducer,
    postlocationProcedureReducer,
    putLocationProcedureReducer,
    findbyIdLocationProcedureAvailableReducer
} from "@/app/(dashboard)/store"


export const proceduresLocationReducer = {
    ...getLocationProcedureReducer,
    ...postlocationProcedureReducer,
    ...putLocationProcedureReducer,
    ...findbyIdLocationProcedureAvailableReducer
}