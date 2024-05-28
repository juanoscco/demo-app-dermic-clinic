import React, { useState } from 'react'
import { useGetDniDataMutation } from '@/config/search-dni/service'


export function GetDniApiHook() {
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
