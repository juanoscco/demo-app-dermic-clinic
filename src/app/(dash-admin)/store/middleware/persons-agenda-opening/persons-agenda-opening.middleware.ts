import { agendaCreateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/create/store/middleware/";
import { employeeAgendaDeleteMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/delete/store/middleware";
import { agendaDetailMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/find-by-id/store/middleware/";
import { agendaListMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/list/store/middleware";
import { agendaUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/update/store/middleware";

export const personsAgendaOpeningMiddleware = [
    agendaListMiddleware,
    agendaCreateMiddleware,
    agendaUpdateMiddleware,
    agendaDetailMiddleware,
    employeeAgendaDeleteMiddleware
]