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

  // useEffect(() => {
  //   if (data) {
  //     Cookies.set("token", data.jwt);
  //     router.push('/dash-admin/home');
  //   }
  // }, [data, router]);

  // useEffect(() => {
  //   if (data) {
  //     console.log('Data received:', data);
  //     if (data.jwt) {
  //       Cookies.set("jwt", data.jwt);
  //       router.push('/dash-admin/home');
  //     } else {
  //       console.error('No JWT token in data');
  //     }
  //   }
  // }, [data, router]);

  // console.log(Cookies.get("jwt"))

  // if (isLoading) {
  //   return (
  //     <div>Cargando....</div>
  //   );
  // }

  // useEffect(() => {
  //   if (data) {
  //     console.log('Data received:', data.jwt);
  //     if (data.jwt) {
  //       Cookies.set("jwt", String(data.jwt));
  //       console.log('JWT token set in cookie:', Cookies.get("jwt")); // Verificar si la cookie se ha establecido
  //       router.push('/dash-admin/home');
  //     } else {
  //       console.error('No JWT token in data');
  //     }
  //   }
  // }, [data, router]);

  // useEffect(() => {
  //   console.log('Current JWT cookie:', Cookies.get()); // Mover esto a otro useEffect para asegurarse de que se ejecuta después de que el token se establece
  // }, []);

  // if (isLoading) {
  //   return (
  //     <div>Cargando....</div>
  //   );
  // }

  useEffect(() => {
    if (data) {
      console.log('Data received:', data.jwt);
      if (data.jwt) {
        localStorage.setItem('token', data.jwt); // Guardar token en localStorage
        console.log('JWT token set in localStorage:', localStorage.getItem('token')); // Verificar si el token se ha establecido
        router.push('/dash-admin/home');
      } else {
        console.error('No JWT token in data');
      }
    }
  }, [data, router]);

  useEffect(() => {
    console.log('Current JWT token:', localStorage.getItem('token')); // Mover esto a otro useEffect para asegurarse de que se ejecuta después de que el token se establece
  }, []);

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
            // name="username"
            className='border border-gray-400 w-full px-3 rounded-sm p-2'
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // value={formik.values.username}
            {...formik.getFieldProps('username')}
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
            // name="password"
            className='border border-gray-400 w-full px-3 rounded-sm p-2'
            // onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            // value={formik.values.password}
            {...formik.getFieldProps('password')}
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
