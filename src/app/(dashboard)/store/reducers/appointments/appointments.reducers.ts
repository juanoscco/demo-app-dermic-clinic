// import { appointmentCreateReducer } from "@/app/(dashboard)/(routes)/dash-admin/appointments/components/citas/create/store/reducer";
// import { appointmentDeleteReducer } from "@/app/(dashboard)/(routes)/dash-admin/appointments/components/citas/delete/store/reducer";
// import { findIdAppointmentDetailReducer } from "@/app/(dashboard)/(routes)/dash-admin/appointments/components/citas/find-by-id/store/reducer";

// import { appointmentListReducer } from "@/app/(dashboard)/(routes)/dash-admin/appointments/components/citas/list/store/reducer";
// import { appointmentInfoUpdateReducer } from "@/app/(dashboard)/(routes)/dash-admin/appointments/components/citas/update-info-appointment/store/reducers";
// import { appointmentScheduleUpdateReducers } from "@/app/(dashboard)/(routes)/dash-admin/appointments/components/citas/update-schedule-appointment/store/reducers";
// import { appointmentUpdateReducer } from "@/app/(dashboard)/(routes)/dash-admin/appointments/components/citas/update/store/reducer";
// import { extraAppointmentCreateReducers } from "@/app/(dashboard)/(routes)/dash-admin/appointments/components/extras/create/store/reducer";
// import { appointmentExtraDeleteReducer } from "@/app/(dashboard)/(routes)/dash-admin/appointments/components/extras/delete/store/reducer";
// import { extraAppointmentDetailReducer } from "@/app/(dashboard)/(routes)/dash-admin/appointments/components/extras/find-by-id/store/reducer";
// import { extraAppointmentListReducers } from "@/app/(dashboard)/(routes)/dash-admin/appointments/components/extras/list/store/reducer";
// import { appointmentExtraInfoUpdateReducers } from "@/app/(dashboard)/(routes)/dash-admin/appointments/components/extras/update-info-extras-appointment/store/reducers";
// import { appointmentExtraScheduleUpdateReducer } from "@/app/(dashboard)/(routes)/dash-admin/appointments/components/extras/update-schedule-extra-appointment/store/reducers";
// import { extraAppointmentUpdateReducer } from "@/app/(dashboard)/(routes)/dash-admin/appointments/components/extras/update/store/reducer";



import {
    appointmentCreateReducer,
    appointmentUpdateReducer,
    appointmentListReducer,
    appointmentDeleteReducer,
    findIdAppointmentDetailReducer,
    appointmentInfoUpdateReducer,
    extraAppointmentUpdateReducer,
    extraAppointmentDetailReducer,
    extraAppointmentListReducers,
    extraAppointmentCreateReducers,
    appointmentExtraDeleteReducer,
    appointmentScheduleUpdateReducers,
    appointmentExtraScheduleUpdateReducer,
    appointmentExtraInfoUpdateReducers
} from "@/app/(dashboard)/store"

export const appointmentsReducer = {
    // 
    ...appointmentCreateReducer,
    ...appointmentUpdateReducer,
    ...appointmentListReducer,
    ...appointmentDeleteReducer,
    ...findIdAppointmentDetailReducer,
    ...appointmentInfoUpdateReducer,
    // Extras
    ...extraAppointmentUpdateReducer,
    ...extraAppointmentDetailReducer,
    ...extraAppointmentListReducers,
    ...extraAppointmentCreateReducers,
    ...appointmentExtraDeleteReducer,

    ...appointmentScheduleUpdateReducers,
    // 
    ...appointmentExtraScheduleUpdateReducer,
    ...appointmentExtraInfoUpdateReducers
}