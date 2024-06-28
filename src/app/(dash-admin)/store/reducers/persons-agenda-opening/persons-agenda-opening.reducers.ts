import { agendaCreateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/create/store/reducer";
import { employeeAgendaDeleteReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/delete/store/reducer";
import { agendaDetailReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/find-by-id/store/reducer";
import { agendaListReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/list/store/reducer";
import { agendaUpdateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/update/store/reducer";

export const personsAgendaOpeningReducer = {
    ...agendaListReducer,
    ...agendaCreateReducer,
    ...agendaUpdateReducer,
    ...agendaDetailReducer,
    ...employeeAgendaDeleteReducer
}