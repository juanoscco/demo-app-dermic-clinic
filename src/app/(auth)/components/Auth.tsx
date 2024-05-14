import React from 'react'
import Image from 'next/image'
import Form from './Form/Form'
import { logo } from "@/assets/"

export default function Auth() {
    return (
        <main className='min-h-screen flex justify-between w-full bg-doctor'>
            <section className='md:flex flex-col p-3 hidden '>
                <div className=' rounded-lg shadow-xl bg-white flex items-end justify-center gap-1 p-2'>
                    {/* <Image src={logo} alt="Logo Clinica de la piel" className='h-10 w-10 rounded-full' /> */}
                    <h1 className='text-2xl'>Clínica de la Piel</h1>
                </div>
            </section>
            <section className='flex flex-col items-center md:items-start justify-center bg-white shadow-2xl w-full md:w-3/6 xl:w-2/6  md:p-8  md:rounded-s-2xl'>
                <Form />
            </section>
        </main>
    )
}
