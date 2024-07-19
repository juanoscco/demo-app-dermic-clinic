import {
    findIdAppointmentDetailMiddleware,
    appointmentListMiddleware,
    appointmentCreateMiddleware,
    appointmentUpdateMiddleware,
    appointmentScheduleUpdateMiddleware,
    appointmentDeleteMiddleware,
    appointmentInfoUpdateMiddleware,
    extraAppointmentUpdateMiddleware,
    extraAppointmentDetailMiddleware,
    extraAppointmentListMiddleware,
    extraAppointmentCreateMiddleware,
    appointmentExtraDeleteMiddleware,
    appointmentExtraScheduleUpdateMiddleware,
    appointmentExtraInfoUpdateMiddleware
} from "@/app/(dashboard)/store"

export const appointmentsMiddleware = [
    //Normal Appointment
    findIdAppointmentDetailMiddleware,
    appointmentListMiddleware,
    appointmentCreateMiddleware,
    appointmentUpdateMiddleware,
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