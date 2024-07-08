"use client"
import React from 'react';
import { useDeleteExceptionEmployeeMutation } from '@/app/(dash-admin)/(routes)/dash-admin/persons/exceptions/components/delete/store/services';
import { PopupUpdate } from '@/components/popup/popup-update';

interface Props {
    id: number;
    onClose: any;
    update: any;
}

export const DeleteExceptionComponent: React.FC<Props> = ({ id, onClose, update }) => {
    const [deleteExceptionEmployee, { isLoading, isSuccess, isError }] = useDeleteExceptionEmployeeMutation();

    const handleDelete = async () => {
        try {
            await deleteExceptionEmployee({ deleteExceptionEmployeeId: id }).unwrap();
            // Handle success (e.g., show success message, refetch list)
            onClose();
            update();

        } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Fallo en eliminar la excepcion', error);
        }
    };

    return (
        <PopupUpdate>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-2xl'>Eliminar Excepcion</h1>
                <button onClick={onClose} className='text-2xl text-gray-800 font-bold'>x</button>
            </div>
            <p className="text-lg font-medium my-4">¿Estás seguro de eliminar esta Excepcion?</p>
            <div className='flex justify-between items-center'>
                <button
                    onClick={onClose}
                    className='px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300'
                >
                    Cancelar
                </button>
                <button
                    onClick={handleDelete}
                    disabled={isLoading}
                    className={`px-4 py-2 rounded ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-700'}`}
                >
                    {isLoading ? 'Eliminando...' : 'Eliminar'}
                </button>
            </div>
            {isSuccess && <p className="text-green-500 mt-2">Excepcion eliminada con éxito.</p>}
            {isError && <p className="text-red-500 mt-2">Error al eliminar la excepcion. Inténtalo de nuevo.</p>}
        </PopupUpdate>
    );
};

