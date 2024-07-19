import {
    infrastructureCreateReducer,
    infrastructureListReducer,
    detailInfrastructureReducer,
    infrastructureUpdateReducer,
    infraDeleteReducer
} from "@/app/(dashboard)/store"

export const infrastructureReducers = {
    ...infrastructureCreateReducer,
    ...infrastructureListReducer,
    ...detailInfrastructureReducer,
    ...infrastructureUpdateReducer,
    ...infraDeleteReducer
}