import {
    patientCreateReducer, 
    patientListReducer, 
    patientDetailReducer, 
    patientUpdateReducer, 
    patientDeleteReducer
} from "@/app/(dashboard)/store"

export const patientReducers = {
    ...patientCreateReducer,
    ...patientListReducer,
    ...patientDetailReducer,
    ...patientUpdateReducer,
    ...patientDeleteReducer
    // ...patientReducer
};
