import { authMiddleware } from "@/app/(auth)/store/middleware";
import { dniSearchMiddleware } from "@/config/search-dni/middleware";
import { patientMiddlewares } from "@/app/(dash-admin)/store/middleware/patients"
import { personsMiddleware } from "@/app/(dash-admin)/store/middleware/persons";
import { infrastructureMiddleware } from "@/app/(dash-admin)/store/middleware/infrastructure";
import { proceduresMiddleware } from "@/app/(dash-admin)/store/middleware/procedures/procedures.middleware";
import { infrastructureRoomsMiddleware } from "@/app/(dash-admin)/store/middleware/infrastructure-rooms";

export const rootMiddlewares = (
    getDefaultMiddleware: any
) => getDefaultMiddleware().concat(
    dniSearchMiddleware,
    authMiddleware,
    ...patientMiddlewares,
    ...personsMiddleware,
    ...infrastructureMiddleware,
    ...proceduresMiddleware,
    ...infrastructureRoomsMiddleware
)