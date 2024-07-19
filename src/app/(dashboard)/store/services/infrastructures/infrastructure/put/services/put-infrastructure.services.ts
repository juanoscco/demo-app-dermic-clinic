import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}`;

export const infrastructureUpdateApi = createApi({
    reducerPath: 'infrastructureUpdateApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        infrastructureUpdate: builder.mutation({
            query: ({ infrastructureId, infrastructureData }) => ({
                url: `sede/${infrastructureId}`,
                method: 'PUT',
                body: infrastructureData,
            }),
        }),
    }),
});

export const { useInfrastructureUpdateMutation } = infrastructureUpdateApi;