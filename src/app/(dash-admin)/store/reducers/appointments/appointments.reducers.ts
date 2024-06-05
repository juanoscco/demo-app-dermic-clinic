import { appointmentCreateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/create/store/reducer";
import { findIdAppointmentDetailReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/find-by-id/store/reducer";
import { findDateAppointmentReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/find-date-appointment/store/reducer";
import { appointmentListReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/list/store/reducer";
import { appointmentUpdateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/update/store/reducer";
import { extraAppointmentCreateReducers } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/create/store/reducer";
import { extraAppointmentDetailReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/find-by-id/store/reducer";
import { extraAppointmentListReducers } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/list/store/reducer";
import { extraAppointmentUpdateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/update/store/reducer";

export const appointmentsReducer = {
    // 
    ...appointmentCreateReducer,
    ...appointmentUpdateReducer,
    ...appointmentListReducer,
    ...findDateAppointmentReducer,
    ...findIdAppointmentDetailReducer,
    // 
    ...extraAppointmentUpdateReducer,
    ...extraAppointmentDetailReducer,
    ...extraAppointmentListReducers,
    ...extraAppointmentCreateReducers
}