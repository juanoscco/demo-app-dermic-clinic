"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LoginFormValues, HooksProps } from "@/app/(auth)/models/login.interface"


export default function LoginHooks({ login, data }: HooksProps) {
    const router = useRouter();

    const formik = useFormik<LoginFormValues>({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            username: Yup.string().required('Requerido'),
            password: Yup.string().required('Requerido'),
        }),
        onSubmit: async (values) => {
            try {
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
            Cookies.set("token", data.jwt);
            router.push('/dash-admin/home');
        }
    }, [data, router]);

    
    return { formik }
}
