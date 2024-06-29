import React from 'react'
import { useDeleteAppointmentExtraMutation } from '../store/service';
import { PopupUpdate } from '@/components/popup/popup-update';

interface Props {
    onClose?: any;
    id?: any;
    update?: any;
  }
export function DeleteAppointmentsExtraComponents({onClose, id, update}: Props) {
    const [deleteAppointmentExtra, { isLoading, isSuccess, isError }] = useDeleteAppointmentExtraMutation();
    const handleDelete = async () => {
      try {
        await deleteAppointmentExtra({ deleteAppointmentExtraId: id }).unwrap();
        update();
        onClose();
      } catch (error) {
        console.error('Failed to delete schedule', error);
      }
    };
  
    return (
      <PopupUpdate>
        <div className='flex justify-between items-center'>
          <h1 className='font-bold text-2xl'>Eliminar cita extra</h1>
          <button onClick={onClose} className='text-2xl text-gray-800 font-bold'>x</button>
        </div>
        <p className="text-lg font-medium my-4">¿Estás seguro de eliminar a esta cita extra?</p>
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
        {isSuccess && <p className="text-blue-500 mt-2">Cita extra eliminada con éxito.</p>}
        {isError && <p className="text-red-500 mt-2">Error al eliminar la cita extra. Inténtalo de nuevo.</p>}
      </PopupUpdate>
    );
}
