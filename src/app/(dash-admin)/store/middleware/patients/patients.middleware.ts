import { patientCreateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/patients/create/store/middleware";
import { patientUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/patients/list/[id]/patient-update/store/middleware";
import { patientDetailMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/patients/list/[id]/store/middleware";
import { patientListMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/patients/list/store/middleware";

export const patientMiddlewares = [
    patientCreateMiddleware,
    patientUpdateMiddleware,
    patientDetailMiddleware,
    patientListMiddleware,
];
