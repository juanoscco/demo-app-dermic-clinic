"use client"

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/app/(auth)/service/authApi'
import Cookies from 'js-cookie'
import { useFormik } from 'formik';
import * as Yup from 'yup';

interface LoginFormValues {
  email: string;
  password: string;
}

// TODO: ORDERING THIS CODE BECAUSE I WANNA REUSE
export default function FormLogin() {
  const router = useRouter();
  const [login, { isLoading, data, error }] = useLoginMutation();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Correo inválido').required('Requerido'),
      password: Yup.string().min(6, 'Mínimo 6 caracteres').required('Requerido'),
    }),
    onSubmit: async (values) => {
      login(values);
    },
  });


  // if (data) {
  //   Cookies.set("token", data.token);
  //   router.push('/dash-admin/home');
  // }

  useEffect(() => {
    if (data) {
      Cookies.set("token", data.token);
      router.push('/dash-admin/home');
    }
  }, [data, router]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <form onSubmit={formik.handleSubmit} className='relative flex flex-col gap-5 w-4/6'>
      <h1 className='font-bold text-2xl'>Iniciar sesión</h1>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="email">Usuario</label>
          <input
            type="text"
            id="email"
            name="email"
            className='border border-gray-400 w-full px-3 rounded-sm p-2'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className='text-red-400'>{formik.errors.email}</div>
          ) : null}
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            className='border border-gray-400 w-full px-3 rounded-sm p-2'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='text-red-400'>{formik.errors.password}</div>
          ) : null}
        </div>
        <div className='flex items-center gap-1'>
          <input type="checkbox" className='w-5 h-8 rounded-lg ' />
          <span className='text-lg '>Recuérdame</span>
        </div>
      </div>
      <button className='w-full bg-slate-950 shadow-xl p-3 rounded-sm text-white' type='submit'>Ingresar</button>
      {error && <p className='text-red-400'>Datos incorrectos</p>}
    </form>
  );
}
