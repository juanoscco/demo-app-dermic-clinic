import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';
import { Employee, EmployeeReponse } from "../../interface/create-employee.interface"

const baseUrl = `${process.env.API_DOCKER_JAVA_REST}/empleado`;

export const employeeCreateApi = createApi({
    reducerPath: 'employeeApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers) => {
            const token = Cookies.get('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        addEmployee: builder.mutation<EmployeeReponse, Employee>({
            query: (newEmployee) => ({
                url: '',
                method: 'POST',
                body: newEmployee,
            }),
        }),
    }),
});

export const { useAddEmployeeMutation } = employeeCreateApi;
// export default pacienteApi;
