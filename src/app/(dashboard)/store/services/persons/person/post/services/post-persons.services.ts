import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
// import { Employee, EmployeeReponse } from "../../interface/create-employee.interface"
import { prepareHeaders } from '@/app/(dashboard)/utils/';

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/empleado`;

export const employeeCreateApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders
    }),
    endpoints: (builder) => ({
        addEmployee: builder.mutation({
            query: (newEmployee) => ({
                url: '',
                method: 'POST',
                body: newEmployee,
            }),
        }),
    }),
});

export const { useAddEmployeeMutation } = employeeCreateApi;