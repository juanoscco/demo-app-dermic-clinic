"use client"
import { useDeleteAgendaEmployeeMutation } from '@/app/(dash-admin)/(routes)/dash-admin/persons/agenda-opening/components/delete/store/services';
import { PopupUpdate } from '@/components/popup/popup-update';
import React from 'react';

interface Props {
    id: number;
    onClose: () => void;
    update: () => void;
}

export const DeleteAgendaComponent: React.FC<Props> = ({ id, onClose, update }) => {
    const [deleteAgendaEmployee, { isLoading, isSuccess, isError }] = useDeleteAgendaEmployeeMutation();

    const handleDelete = async () => {
        try {
            await deleteAgendaEmployee({ deleteAgendaEmployeeId: id }).unwrap();
            // Handle success (e.g., show success message, refetch list)
            update();
            onClose();
        } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Failed to delete schedule', error);

        }
    };

    return (
        <PopupUpdate>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-2xl'>Eliminar Agenda</h1>
                <button onClick={onClose} className='text-2xl text-red-500 font-bold'>x</button>
            </div>
            <p className="text-lg font-medium my-4">¿Estás seguro de eliminar esta Agenda?</p>
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
            {isSuccess && <p className="text-green-500 mt-2">Agenda eliminada con éxito.</p>}
            {isError && <p className="text-red-500 mt-2">Error al eliminar la agenda. Inténtalo de nuevo.</p>}
        </PopupUpdate>
    );
};

