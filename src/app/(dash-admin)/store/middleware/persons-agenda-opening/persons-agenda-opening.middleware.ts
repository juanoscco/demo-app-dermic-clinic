import { agendaCreateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/create/store/middleware/create-agenda.middleware";
import { agendaDetailMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/find-by-id/store/middleware/detail-agenda.middleware";
import { agendaListMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/list/store/middleware";
import { agendaUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/update/store/middleware";

export const personsAgendaOpeningMiddleware = [
    agendaListMiddleware,
    agendaCreateMiddleware,
    agendaUpdateMiddleware,
    agendaDetailMiddleware
]