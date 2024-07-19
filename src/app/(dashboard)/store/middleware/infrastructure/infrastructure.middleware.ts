
import {
    infrastructureCreateMiddleware,
    infrastructureListMiddleware,
    detailInfrastructureMiddleware,
    infrastructureUpdateMiddleware,
    infraDeleteMiddleware
} from "@/app/(dashboard)/store"

export const infrastructureMiddleware = [
    infrastructureCreateMiddleware,
    infrastructureListMiddleware,
    detailInfrastructureMiddleware,
    infrastructureUpdateMiddleware,
    infraDeleteMiddleware
]