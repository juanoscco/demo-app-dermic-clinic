import React from 'react'
import { useDeleteEmployeeMutation } from '../store/services';
import { PopupUpdate } from '@/components/popup/popup-update';
import { useRouter } from 'next/navigation';

interface Props {
  onClose?: any;
  id?: any;
  update?: any;
}

export function DeleteEmployeeComponent({ onClose, id, update }: Props) {
  const [deleteEmployee, { isLoading, isSuccess, isError }] = useDeleteEmployeeMutation();
  const router = useRouter()
  const handleDelete = async () => {
    try {
      await deleteEmployee({ deleteEmployeeId: id }).unwrap();
      update();
      onClose();
      router.push("./")
    } catch (error) {
      console.error('Failed to delete schedule', error);
    }
  };

  return (
    <PopupUpdate>
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-2xl'>Eliminar Empleado</h1>
        <button onClick={onClose} className='text-2xl text-gray-800 font-bold'>x</button>
      </div>
      <p className="text-lg font-medium my-4">¿Estás seguro de eliminar a este empleado?</p>
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
      {isSuccess && <p className="text-blue-500 mt-2">Empleado eliminado con éxito.</p>}
      {isError && <p className="text-red-500 mt-2">Error al eliminar el empleado. Inténtalo de nuevo.</p>}
    </PopupUpdate>
  );
}
