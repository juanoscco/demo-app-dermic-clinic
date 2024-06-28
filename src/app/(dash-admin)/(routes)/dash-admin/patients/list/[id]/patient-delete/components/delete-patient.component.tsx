import React from 'react'
import { useDeletePatientMutation } from '../store/service';
import { useRouter } from 'next/navigation';
import { PopupUpdate } from '@/components/popup/popup-update';


interface Props {
    onClose?: any;
    id?: any;
    update?: any;
}


export function DeletePatientComponent({ onClose, id, update }: Props) {
    const [deletePatient, { isLoading, isSuccess, isError }] = useDeletePatientMutation();
    const router = useRouter()

    const handleDelete = async () => {
        try {
            await deletePatient({ deletePatientId: id }).unwrap();
            // Handle success (e.g., show success message, refetch list)
            update();
            onClose();
            router.push("./")

        } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Failed to delete schedule', error);
        }

    };

    return (
        <PopupUpdate>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-2xl'>Eliminar Paciente</h1>
                <button onClick={onClose} className='text-2xl text-grayred-500 font-bold'>x</button>
            </div>
            <p className="text-lg font-medium my-4">¿Estás seguro de eliminar a este Paciente?</p>
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
            {isSuccess && <p className="text-green-500 mt-2">Paciente eliminado con éxito.</p>}
            {isError && <p className="text-red-500 mt-2">Error al eliminar al Paciente. Inténtalo de nuevo.</p>}
        </PopupUpdate>
    );
}
