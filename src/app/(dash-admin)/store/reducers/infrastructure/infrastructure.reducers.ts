import { infrastructureCreateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/create/store/reducer";
import { infraDeleteReducer } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/[id]/infra-delete/store/reducers";
import { infrastructureUpdateReducer } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/[id]/infra-update/store/reducer";
import { detailInfrastructureReducer } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/[id]/store/reducer/detail-infrastructure.reducers";
import { infrastructureListReducer } from "@/app/(dash-admin)/(routes)/dash-admin/infrastructure/list/store/reducer";

export const infrastructureReducers = {
    ...infrastructureCreateReducer,
    ...infrastructureListReducer,
    ...detailInfrastructureReducer,
    ...infrastructureUpdateReducer,
    ...infraDeleteReducer
}