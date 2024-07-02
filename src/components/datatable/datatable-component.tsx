"use client"
import React from 'react';

interface Column {
  title: string;
  displayName?: string;
  field: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface PaginationControl {
  perPageOptions: number[];
  perPage: number;
  setPerPage: (perPage: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
}

interface Props {
  data: any;
  isLoading: boolean;
  error: any;
  columns: Column[];
  paginationControls?: PaginationControl | any;
  filter?: any;
  setFilter?: any;
  headers?: React.ReactNode;
}

export function DatatableComponent(
  { data, isLoading, error, columns, paginationControls, filter, setFilter, headers }: Props
) {

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const { perPageOptions, perPage, setPerPage, currentPage, setCurrentPage } = paginationControls;

  const handlePerPageChange = (e: any) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const totalPages = Math.ceil(data?.totalElements / perPage);
  const itemsTotal = data?.totalElements;

  return (
    <React.Fragment>
      <section className='flex xl:justify-between flex-col xl:flex-row mt-5 bg-white rounded-md p-4'>
        <input
          type="text"
          placeholder="Buscar"
          className="px-2 py-1 border border-gray-300 rounded-md mb-2 outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {headers}
      </section>
      <section className='bg-white p-2 rounded-md w-full xl:h-[30rem] h-full overflow-auto'>
        {data?.content?.length > 0 ? (
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th key={column.title} className="px-4 py-2 text-left cursor-pointer">{column.displayName || column.title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.content
                .filter((item: any) => item.estado)
                .map((item: any, rowIndex: number) => (
                  <tr key={rowIndex} className='border-t border-gray-200'>
                    {columns.map((column, colIndex) => (
                      <td key={colIndex} className='px-4 py-2 capitalize'>
                        {column.render ? column.render(item[column.field], item) : item[column.field]}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div className='flex items-center justify-center h-5/6'>
            <p>No hay datos</p>
          </div>
        )}
      </section>

      <section className="bg-white  flex justify-between items-center px-3 py-2 mt-2">
        <div className='flex items-center gap-3'>
          <div className='flex items-center gap-3'>
            <label htmlFor="perPage" className="text-gray-700" >Datos por página </label>
            <select
              id="perPage"
              value={perPage}
              onChange={handlePerPageChange}
              className="border border-gray-300 rounded-md p-1 outline-none"
            >
              {perPageOptions.map((option: any) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <span className="text-gray-700">Total de datos: {itemsTotal}</span>
        </div>

        <div className="flex items-center">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 mr-2 border rounded-sm bg-[#82b440] text-white disabled:opacity-50"
          >
            Atrás
          </button>
          <span className="mr-2 text-gray-600" >Página {currentPage} de {totalPages}</span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mr-2 border rounded-sm bg-[#82b440] text-white disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </section>
    </React.Fragment>
  );
}
