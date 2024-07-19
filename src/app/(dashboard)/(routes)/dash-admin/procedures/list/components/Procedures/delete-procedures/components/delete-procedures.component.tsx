import React from 'react'
import { PopupUpdate } from '@/components/popup/popup-update'

import { useDeleteProcedureMutation } from "@/app/(dashboard)/store"

interface Props {
    onClose?: any;
    id?: any;
    update?: any;
}

export function DeleteProceduresComponent({ onClose, id, update }: Props) {
    const [deleteProcedure, { isLoading, isSuccess, isError }] = useDeleteProcedureMutation();

    const handleDelete = async () => {
        try {
            await deleteProcedure({ deleteProcedureId: id }).unwrap();
            // Handle success (e.g., show success message, refetch list)
            update();
            onClose();

        } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Failed to delete Procedure', error);
        }

    };

    return (
        <PopupUpdate>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-2xl'>Eliminar Procedimiento</h1>
                <button onClick={onClose} className='text-2xl text-grayred-500 font-bold'>x</button>
            </div>
            <p className="text-lg font-medium my-4">¿Estás seguro de eliminar a este Procedimiento?</p>
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
            {isSuccess && <p className="text-green-500 mt-2">Procedimiento eliminado con éxito.</p>}
            {isError && <p className="text-red-500 mt-2">Error al eliminar al Procedimiento. Inténtalo de nuevo.</p>}
        </PopupUpdate>
    );

}
