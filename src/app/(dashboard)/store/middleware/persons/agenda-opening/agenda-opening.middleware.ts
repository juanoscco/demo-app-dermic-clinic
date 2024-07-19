
import {
    agendaListMiddleware,
    agendaCreateMiddleware,
    agendaUpdateMiddleware,
    employeeAgendaDeleteMiddleware
 } from "@/app/(dashboard)/store"

export const personsAgendaOpeningMiddleware = [
    agendaListMiddleware,
    agendaCreateMiddleware,
    agendaUpdateMiddleware,
    employeeAgendaDeleteMiddleware
]