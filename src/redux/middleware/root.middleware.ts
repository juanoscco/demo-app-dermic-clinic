import type { ThunkMiddleware } from "@reduxjs/toolkit";

// 
import { authMiddleware } from "@/app/(auth)/store";

// 
import {
    findHeadboardMiddleware,
    dniSearchMiddleware,
    searchClientsRecurrentsInOptiabiMiddleware
} from "@/config/";


// Patients
import { patientMiddlewares } from "@/app/(dashboard)/store/middleware/patients"

// Infrastructure
import { infrastructureMiddleware } from "@/app/(dashboard)/store/middleware/infrastructure";
import { infrastructureRoomsMiddleware } from "@/app/(dashboard)/store/middleware/infrastructure/";

// Employees
import { personsMiddleware } from "@/app/(dashboard)/store/middleware/persons";
import { personsSchedulesMiddleware } from "@/app/(dashboard)/store/middleware/persons";
import { personsExceptionsMiddleware } from "@/app/(dashboard)/store/middleware/persons/";
import { personsAgendaOpeningMiddleware } from "@/app/(dashboard)/store/middleware/persons";

// Appointments
import { appointmentsMiddleware } from "@/app/(dashboard)/store/middleware/appointments";

// Procedures
import { proceduresMiddleware } from "@/app/(dashboard)/store/middleware/procedures/";
import { proceduresLocationMiddleware } from "@/app/(dashboard)/store/middleware/procedures";
import { proceduresPersonalMiddleware } from "@/app/(dashboard)/store/middleware/procedures";
import { proceduresRoomsMiddleware } from "@/app/(dashboard)/store/middleware/procedures";

// 

export const rootMiddlewares = (
    getDefaultMiddleware: any
) => getDefaultMiddleware().concat(
    dniSearchMiddleware,
    authMiddleware,
    findHeadboardMiddleware,
    searchClientsRecurrentsInOptiabiMiddleware,
    ...patientMiddlewares,
    ...personsMiddleware,
    ...infrastructureMiddleware,
    ...proceduresMiddleware,
    ...infrastructureRoomsMiddleware,
    ...personsSchedulesMiddleware,
    ...personsExceptionsMiddleware,
    ...personsAgendaOpeningMiddleware,
    ...appointmentsMiddleware,
    ...proceduresLocationMiddleware,
    ...proceduresPersonalMiddleware,
    ...proceduresRoomsMiddleware
)