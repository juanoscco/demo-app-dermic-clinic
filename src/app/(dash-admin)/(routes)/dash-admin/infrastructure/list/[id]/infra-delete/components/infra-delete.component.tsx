import React from 'react'
import { useDeleteInfraMutation } from '../store/services';
import { useRouter } from 'next/navigation';
import { PopupUpdate } from '@/components/popup/popup-update';

interface Props {
    id: number;
    onClose: () => void;
    update: () => void;
}

export function InfraDeleteComponent({ id, onClose, update }: Props) {
    const [deleteInfrastructure, { isLoading, isSuccess, isError }] = useDeleteInfraMutation();
    const router = useRouter();
    const handleDelete = async () => {
        try {
            await deleteInfrastructure({ deleteInfraId: id }).unwrap();
            // Handle success (e.g., show success message, refetch list)
            update();
            onClose();
            router.push('./');
        } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Failed to delete Infrastructure', error);
        }

    };

    return (
        <PopupUpdate>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-2xl'>Eliminar Infrastructura</h1>
                <button onClick={onClose} className='text-2xl text-gra-900 font-bold'>x</button>
            </div>
            <p className="text-lg font-medium my-4">¿Estás seguro de eliminar esta Infrastructura?</p>
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
            {isSuccess && <p className="text-green-500 mt-2">Infrastructura eliminada con éxito.</p>}
            {isError && <p className="text-red-500 mt-2">Error al eliminar Infrastructura. Inténtalo de nuevo.</p>}
        </PopupUpdate>
    );
}
