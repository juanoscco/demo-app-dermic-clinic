"use client"
import React from 'react';
import FormLogin from './Form/Form';
// import { useLoginMutation } from '@/app/(auth)/store/service/';

export default function Auth() {
  // const [login, { isLoading, data, error }] = useLoginMutation();


  return (
    <main className='min-h-screen flex justify-between w-full bg-doctor'>
      {/* {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
          <p className="text-white ml-4">Loading...</p>
        </div>
      )} */}
      <section className='md:flex flex-col p-3 hidden '>
        <div className='rounded-lg shadow-xl bg-white flex items-end justify-center gap-1 p-2'>
          <h1 className='text-2xl'>Clínica de la Piel</h1>
        </div>
      </section>
      <section className='flex flex-col items-center md:items-start justify-center bg-white shadow-2xl w-full md:w-3/6 xl:w-2/6 md:p-8 md:rounded-s-2xl'>
        {/* <FormLogin login={login} data={data} error={error} isLoading={isLoading} /> */}
        <FormLogin />
      </section>
    </main>
  );
}
