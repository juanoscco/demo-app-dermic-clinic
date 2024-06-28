import { infrastructureCreateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/create/store/middleware";
import { infraDeleteMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/[id]/infra-delete/store/middleware";
import { infrastructureUpdateMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/[id]/infra-update/store/middleware/infra-update.middleware";
import { detailInfrastructureMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/[id]/store/middleware/detail-infrastructure.middleware";
import { infrastructureListMiddleware } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/store/middleware";

export const infrastructureMiddleware = [
    infrastructureCreateMiddleware,
    infrastructureListMiddleware,
    detailInfrastructureMiddleware,
    infrastructureUpdateMiddleware,
    infraDeleteMiddleware
]