import { appointmentCreateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/create/store/middleware";
import { findIdAppointmentDetailMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/find-by-id/store/middleware";
import { findDateAppointmentMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/find-date-appointment/store/middleware";
import { appointmentListMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/list/store/middleware";
import { appointmentUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/update/store/middleware";
import { extraAppointmentCreateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/create/store/middleware";
import { extraAppointmentDetailMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/find-by-id/store/middleware";
import { extraAppointmentListMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/list/store/middleware";
import { extraAppointmentUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/update/store/middleware";

export const appointmentsMiddleware = [
    //Normal Appointment
    findIdAppointmentDetailMiddleware,
    findDateAppointmentMiddleware,
    appointmentListMiddleware,
    appointmentCreateMiddleware,
    appointmentUpdateMiddleware,
    //Extra Appointments
    extraAppointmentUpdateMiddleware,
    extraAppointmentDetailMiddleware,
    extraAppointmentListMiddleware,
    extraAppointmentCreateMiddleware
]