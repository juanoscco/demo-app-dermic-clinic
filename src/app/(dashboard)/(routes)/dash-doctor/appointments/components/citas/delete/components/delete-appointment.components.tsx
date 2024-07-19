import React from 'react'
import { useDeleteAppointmentMutation } from '@/app/(dashboard)/store';
import { useRouter } from 'next/navigation';
import { PopupUpdate } from '@/components/popup/popup-update';

interface Props {
    onClose?: any;
    id?: any;
    update?: any;
}
export function DeleteAppointmentComponents({ onClose, id, update }: Props) {
    const [deleteAppointment, { isLoading, isSuccess, isError }] = useDeleteAppointmentMutation();
    const router = useRouter()
    const handleDelete = async () => {
        try {
            await deleteAppointment({ deleteAppointmentId: id }).unwrap();
            update();
            onClose();
            router.push("./")
        } catch (error) {
            console.error('Failed to delete Appointment', error);
        }
    };

    return (
        <PopupUpdate>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-2xl'>Eliminar Cita</h1>
                <button onClick={onClose} className='text-2xl text-gray-800 font-bold'>x</button>
            </div>
            <p className="text-lg font-medium my-4">¿Estás seguro de eliminar a esta cita?</p>
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
            {isSuccess && <p className="text-blue-500 mt-2">Cita eliminada con éxito.</p>}
            {isError && <p className="text-red-500 mt-2">Error al eliminar la cita. Inténtalo de nuevo.</p>}
        </PopupUpdate>
    );
}
