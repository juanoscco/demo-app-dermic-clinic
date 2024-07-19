import { 
    patientCreateMiddleware,
    patientUpdateMiddleware,
    patientDetailMiddleware,
    patientListMiddleware,
    patientDeleteMiddleware
} from "@/app/(dashboard)/store"

export const patientMiddlewares = [
    patientCreateMiddleware,
    patientUpdateMiddleware,
    patientDetailMiddleware,
    patientListMiddleware,
    // patientMiddleware
    patientDeleteMiddleware
];
