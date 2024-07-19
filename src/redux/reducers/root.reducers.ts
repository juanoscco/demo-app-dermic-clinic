import { authReducer } from "@/app/(auth)/store/";
import { combineReducers } from 'redux';

import {
    dniSearchReducer,
    findHeadboarReducer,
    searchClientsRecurrentsInOptiabiReducer
} from "@/config/";

import { patientReducers } from "@/app/(dashboard)/store/";

// 
import { infrastructureReducers } from "@/app/(dashboard)/store/reducers/infrastructure";
import { infrastructureRoomsReducer } from "@/app/(dashboard)/store/reducers/infrastructure";

// 
import { personsReducers } from "@/app/(dashboard)/store/reducers/persons";
import { personsSchedulesReducer } from "@/app/(dashboard)/store/reducers/persons";
import { personsExceptionsReducers } from "@/app/(dashboard)/store/reducers/persons";
import { personsAgendaOpeningReducer } from "@/app/(dashboard)/store/reducers/persons";
// 
import { appointmentsReducer } from "@/app/(dashboard)/store/reducers/appointments";

// 
import { proceduresReducers } from "@/app/(dashboard)/store/reducers/procedures/";
import { proceduresLocationReducer } from "@/app/(dashboard)/store/reducers/procedures";
import { proceduresPersonalReducer } from "@/app/(dashboard)/store/reducers/procedures"
import { proceduresRoomsReducers } from "@/app/(dashboard)/store/reducers/procedures";
// 

export const rootReducer = {
    ...authReducer,
    ...dniSearchReducer,
    ...findHeadboarReducer,
    ...searchClientsRecurrentsInOptiabiReducer,
    // 
    ...patientReducers,
    ...infrastructureReducers,
    ...infrastructureRoomsReducer,


    // 
    ...personsReducers,
    ...personsSchedulesReducer,
    ...personsExceptionsReducers,
    ...personsAgendaOpeningReducer,
    // 
    ...appointmentsReducer,

    // 
    ...proceduresReducers,
    ...proceduresLocationReducer,
    ...proceduresPersonalReducer,
    ...proceduresRoomsReducers
}

