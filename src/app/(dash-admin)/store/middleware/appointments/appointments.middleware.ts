import { appointmentExtraInfoUpdateMiddleware } from './../../../(routes)/dash-admin/appointments/components/extras/update-info-extras-appointment/store/middleware/update-info-extras-appointment.middleware';
import { appointmentCreateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/create/store/middleware";
import { appointmentDeleteMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/delete/store/middleware";
import { findIdAppointmentDetailMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/find-by-id/store/middleware";
import { findDateAppointmentMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/find-date-appointment/store/middleware";
import { appointmentRoomListMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/list-by-room-appointment/store/middleware";
import { appointmentListMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/list/store/middleware";
import { appointmentInfoUpdateMiddleware } from '@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/update-info-appointment/store/middleware';
import { appointmentScheduleUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/update-schedule-appointment/store/middleware";
import { appointmentUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/citas/update/store/middleware";
import { extraAppointmentCreateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/create/store/middleware";
import { appointmentExtraDeleteMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/delete/store/middleware";
import { extraAppointmentDetailMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/find-by-id/store/middleware";
import { extraAppointmentListMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/list/store/middleware";
import { appointmentExtraScheduleUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/update-schedule-extra-appointment/store/middleware";
import { extraAppointmentUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/appointments/components/extras/update/store/middleware";

export const appointmentsMiddleware = [
    //Normal Appointment
    findIdAppointmentDetailMiddleware,
    findDateAppointmentMiddleware,
    appointmentListMiddleware,
    appointmentCreateMiddleware,
    appointmentUpdateMiddleware,
    appointmentRoomListMiddleware,
    appointmentScheduleUpdateMiddleware,
    appointmentDeleteMiddleware,
    appointmentInfoUpdateMiddleware,
    //Extra Appointments
    extraAppointmentUpdateMiddleware,
    extraAppointmentDetailMiddleware,
    extraAppointmentListMiddleware,
    extraAppointmentCreateMiddleware,
    appointmentExtraDeleteMiddleware,
    appointmentExtraScheduleUpdateMiddleware,
    appointmentExtraInfoUpdateMiddleware
]