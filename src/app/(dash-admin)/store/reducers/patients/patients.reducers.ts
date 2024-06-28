import { patientCreateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/patients/create/store/reducer"
import { patientListReducer } from "@/app/(dash-admin)/(routes)/dash-admin/patients/list/store/reducer/"
import { patientDetailReducer } from "@/app/(dash-admin)/(routes)/dash-admin/patients/list/[id]/store/reducer"
import { patientUpdateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/patients/list/[id]/patient-update/store/reducer/"
import { patientDeleteReducer } from "@/app/(dash-admin)/(routes)/dash-admin/patients/list/[id]/patient-delete/store/reducer";
// import { patientReducer } from "@/app/(dash-admin)/(routes)/dash-admin/patients/store/reducer";

export const patientReducers = {
    ...patientCreateReducer,
    ...patientListReducer,
    ...patientDetailReducer,
    ...patientUpdateReducer,
    ...patientDeleteReducer
    // ...patientReducer
};
