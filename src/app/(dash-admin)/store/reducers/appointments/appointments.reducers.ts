import { appointmentCreateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/create/store/reducer";
import { appointmentDeleteReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/delete/store/reducer";
import { findIdAppointmentDetailReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/find-by-id/store/reducer";
import { findDateAppointmentReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/find-date-appointment/store/reducer";
import { appointmentRoomListReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/list-by-room-appointment/store/reducer";
import { appointmentListReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/list/store/reducer";
import { appointmentScheduleUpdateReducers } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/update-schedule-appointment/store/reducers";
import { appointmentUpdateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/update/store/reducer";
import { extraAppointmentCreateReducers } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/create/store/reducer";
import { appointmentExtraDeleteReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/delete/store/reducer";
import { extraAppointmentDetailReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/find-by-id/store/reducer";
import { extraAppointmentListReducers } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/list/store/reducer";
import { appointmentExtraScheduleUpdateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/update-schedule-extra-appointment/store/reducers";
import { extraAppointmentUpdateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/update/store/reducer";

export const appointmentsReducer = {
    // 
    ...appointmentCreateReducer,
    ...appointmentUpdateReducer,
    ...appointmentListReducer,
    ...appointmentRoomListReducer,
    ...appointmentDeleteReducer,
    ...findDateAppointmentReducer,
    ...findIdAppointmentDetailReducer,
    // 
    ...extraAppointmentUpdateReducer,
    ...extraAppointmentDetailReducer,
    ...extraAppointmentListReducers,
    ...extraAppointmentCreateReducers,
    ...appointmentExtraDeleteReducer,

    ...appointmentScheduleUpdateReducers,
    // 
    ...appointmentExtraScheduleUpdateReducer
}