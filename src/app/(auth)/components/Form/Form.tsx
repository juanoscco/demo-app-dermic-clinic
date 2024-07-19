"use client";
import React, { useEffect } from 'react'
// import { FormLoginProps } from "../../models/login.interface"
// import LoginHooks from "../../hooks/login.hooks"

import { useLoginMutation } from '@/app/(auth)/store/service/';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginFormValues } from "@/app/(auth)/models/login.interface"

import { jwtDecode } from 'jwt-decode';


// TODO: ORDERING THIS CODE BECAUSE I WANNA REUSE
export default function FormLogin() {

  const [login, { isLoading, data, error }] = useLoginMutation();
  const router = useRouter();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      username: 'administrador',
      password: 'clave123',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Requerido'),
      password: Yup.string().required('Requerido'),
    }),
    onSubmit: async (values) => {
      try {
        // const result = await login(values);
        // console.log('Login result:', result);
        await login(values);
        // setSubmitting(false);

      } catch (err) {
        console.error('Failed to login', err);
        // setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    if (data) {
      if (data.jwt) {
        window.localStorage.setItem('token', data.jwt);

        const shortToken = data.jwt.slice(0, 10);
        Cookies.set('logged', shortToken, { path: '/' });

        const decoded: any = jwtDecode(data.jwt);

        if (decoded?.role === 'EMPLOYEE') {
          router.push('/dash-employee/home');
        }
        else if (decoded?.role === 'VISUALIZER') {
          router.push('/dash-visualizer/home');
        }
        else if (decoded?.role === 'DOCTOR') {
          router.push('/dash-doctor/home');
        }
        else {
          router.push('/dash-admin/home');
        }
      } else {
        console.error('No JWT token in data');
        Cookies.set('logged', 'false', { path: '/' });
        console.log('Cookie set:', Cookies.get('logged'));
      }
    }
  }, [data, router]);

  if (isLoading) {
    return (
      <div>Cargando....</div>
    );
  }

  return (
    <form onSubmit={formik.handleSubmit} className='relative flex flex-col gap-5 w-4/6'>
      <h1 className='font-bold text-2xl'>Iniciar sesión</h1>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            className='border border-gray-400 w-full px-3 rounded-sm p-2'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
          // {...formik.getFieldProps('username')}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className='text-red-400'>{formik.errors.username}</div>
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
          // {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className='text-red-400'>{formik.errors.password}</div>
          ) : null}
        </div>
        <div className='flex items-center gap-1'>
          <input
            type="checkbox"
            // id="rememberMe"
            // name="rememberMe"
            className='w-5 h-8 rounded-lg'
          // onChange={formik.handleChange}
          // checked={formik.values.rememberMe}
          />
          <label htmlFor="rememberMe" className='text-lg'>Recuérdame</label>
        </div>
      </div>
      <button
        className='w-full bg-slate-950 shadow-xl p-3 rounded-sm text-white'
        type='submit'
        disabled={isLoading || formik.isSubmitting}
      >Ingresar</button>
      {error && <p className='text-red-400'>Datos incorrectos</p>}
    </form>
  );
}
