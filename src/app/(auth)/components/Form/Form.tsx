"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { useLoginMutation } from '@/app/(auth)/services/authApi'
import Cookies from 'js-cookie'

// TODO: ORDERING THIS CODE BECAUSE I WANNA REUSE CODE
export default function Form() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const [login, { isLoading, data, error }] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ email, password });
    
  };

  if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error en poner tus datos</div>;

  if (data) {
    Cookies.set("token", data.token);
    router.push('/dash-admin/home');
  }
  return (
    <form onSubmit={handleLogin} className='relative flex flex-col gap-5 w-4/6'>
      <h1 className='font-bold text-2xl'>Iniciar sesión</h1>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Usuario</label>
          <input
            type="text"
            className='border border-gray-400 w-full px-3 rounded-sm p-2'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor="">Contraseña</label>
          <input
            type="password"
            className='border border-gray-400 w-full px-3 rounded-sm p-2'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='flex items-center gap-1'>
          <input type="checkbox" className='w-5 h-8 rounded-lg ' />
          <span className='text-lg '>Recuerdame</span>
        </div>
      </div>
      <button className='w-full bg-slate-950 shadow-xl p-3 rounded-sm text-white' type='submit'>Ingresar</button>
      {error && <p className='text-red-400'>Datos incorrectos</p>}
    </form>
  )
}
