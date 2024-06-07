import { getLocationProcedureReducer } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Location/store/get/reducer/get-location.reducers";
import { postlocationProcedureReducer } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Location/store/post/reducer";
import { putLocationProcedureReducer } from "@/app/(dash-admin)/(routes)/dash-admin/procedures/list/components/Location/store/put/reducer";

export const proceduresLocationReducer = {
    ...getLocationProcedureReducer,
    ...postlocationProcedureReducer,
    ...putLocationProcedureReducer
}