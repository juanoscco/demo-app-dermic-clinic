"use client"
import React, { useState } from 'react'
import dotenv from 'dotenv';
import { useGetDniDataMutation } from '@/app/(dash-admin)/services/ServicesDNI/dni.services'

dotenv.config();

export default function GetDniApiHook() {
    const [dni, setDni] = useState('');
    const token = process.env.TOKEN_API_DNI;
    

    const [getDniData, { data, error, isLoading }] = useGetDniDataMutation();


    const handleClick = async () => {
        try {
            await getDniData({ token, dni }).unwrap();
        } catch (err) {
            console.error('Failed to fetch the data: ', err);
        }
    };
    return {
        setDni, handleClick, data, isLoading, error
    }
}
