import React from 'react'
import { PopupUpdate } from '@/components/popup/popup-update';


import { useDeleteInfraRoomsMutation } from "@/app/(dashboard)/store"


interface Props {
    onClose?: any;
    id?: any;
    update?: any;
}
export default function DeleteInfraRoomsComponent({ onClose, id, update }: Props) {
    const [deleteInfraRooms, { isLoading, isSuccess, isError }] = useDeleteInfraRoomsMutation();

    const handleDelete = async () => {
        try {
            await deleteInfraRooms({ deleteInfraRoomsId: id }).unwrap();
            update();
            onClose();

        } catch (error) {
            console.error('Failed to delete Infra rooms', error);
        }

    };

    return (
        <PopupUpdate>
            <div className='flex justify-between items-center'>
                <h1 className='font-bold text-2xl'>Eliminar Cuarto</h1>
                <button onClick={onClose} className='text-2xl text-grayred-500 font-bold'>x</button>
            </div>
            {/* <p>{id}</p> */}
            <p className="text-lg font-medium my-4">¿Estás seguro de eliminar a este Cuarto?</p>
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
            {isSuccess && <p className="text-green-700 mt-2">Cuarto eliminado con éxito.</p>}
            {isError && <p className="text-red-500 mt-2">Error al eliminar el cuarto. Inténtalo de nuevo.</p>}
        </PopupUpdate>
    );
}
