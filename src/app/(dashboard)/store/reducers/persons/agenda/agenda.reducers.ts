import { 
    agendaListReducer,
    agendaCreateReducer,
    agendaUpdateReducer,
    // agendaDetailReducer,
    employeeAgendaDeleteReducer
} from "@/app/(dashboard)/store"
export const personsAgendaOpeningReducer = {
    ...agendaListReducer,
    ...agendaCreateReducer,
    ...agendaUpdateReducer,
    // ...agendaDetailReducer,
    ...employeeAgendaDeleteReducer
}