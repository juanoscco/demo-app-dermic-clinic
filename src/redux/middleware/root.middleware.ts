import { authMiddleware } from "@/app/(auth)/store/middleware";
import { dniSearchMiddleware } from "@/config/search-dni/middleware";
import { patientMiddlewares } from "@/app/(dash-admin)/store/middleware/patients"
import { personsMiddleware } from "@/app/(dash-admin)/store/middleware/persons";
import { infrastructureMiddleware } from "@/app/(dash-admin)/store/middleware/infrastructure";
import { proceduresMiddleware } from "@/app/(dash-admin)/store/middleware/procedures/";
import { infrastructureRoomsMiddleware } from "@/app/(dash-admin)/store/middleware/infrastructure-rooms";
import { personsSchedulesMiddleware } from "@/app/(dash-admin)/store/middleware/persons-schedules";
import { personsExceptionsMiddleware } from "@/app/(dash-admin)/store/middleware/persons-exception/";
import { personsAgendaOpeningMiddleware } from "@/app/(dash-admin)/store/middleware/persons-agenda-opening";
import { appointmentsMiddleware } from "@/app/(dash-admin)/store/middleware/appointments";
import { proceduresLocationMiddleware } from "@/app/(dash-admin)/store/middleware/procedures-location";
import { proceduresPersonalMiddleware } from "@/app/(dash-admin)/store/middleware/procedures-personal";
import { proceduresRoomsMiddleware } from "@/app/(dash-admin)/store/middleware/procedures-rooms";
import { findHeadboardMiddleware } from "@/config/search-headboard/middleware";

export const rootMiddlewares = (
    getDefaultMiddleware: any
) => getDefaultMiddleware().concat(
    dniSearchMiddleware,
    authMiddleware,
    findHeadboardMiddleware,
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