import { 
    procedureCreateReducer,
    listProceduresReducers,
    procedureUpdateReducer,
    procedureDeleteReducer
} from "@/app/(dashboard)/store"

export const proceduresReducers = {
    ...procedureCreateReducer,
    ...listProceduresReducers,
    ...procedureUpdateReducer,
    ...procedureDeleteReducer
}