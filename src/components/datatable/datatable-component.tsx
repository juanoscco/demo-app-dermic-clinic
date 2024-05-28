"use client"
import React from 'react'
interface Column {
  title: string;
  displayName?: string;
  field: string;
  render?: (value: any, item: any) => React.ReactNode;
}

interface Props {
  data: any;
  isLoading: boolean;
  error: any;
  columns: Column[];
  perPage: number;
  setPerPage: (perPage: number) => void;
  currentPage: number;
  setCurrentPage: (currentPage: number) => void;
  filter?: any;
  setFilter?: any;
}

export function DatatableComponent(
  { data, isLoading, error, columns, perPage, setPerPage, currentPage, setCurrentPage, filter, setFilter }: Props
) {

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Función para manejar el cambio en el número de elementos por página
  const handlePerPageChange = (e: any) => {
    setPerPage(parseInt(e.target.value));
    setCurrentPage(1); // Reinicia a la primera página cuando cambia el número de elementos por página
  };

  // Función para manejar el avance de página
  const goToNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Función para manejar el retroceso de página
  const goToPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };


  // Calcular el número total de páginas
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
        <div className='flex items-center gap-3'>
          <button
            className='p-2 bg-green-500 rounded-md text-white'
          >
            Excel
          </button>
          <button
            className='bg-gray-500 p-2 text-white rounded-md'
          >
            Imprimir
          </button>

          {/* {renderInput && (
            <React.Fragment>
              {renderInput()}
            </React.Fragment>
          )} */}
        </div>
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
              {data.content.map((item: any, rowIndex: number) => (
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

      <section className='flex justify-between pr-4 mt-4'>
        <div className='flex items-center gap-3'>
          <label htmlFor="perPage">Items por pagina </label>
          <select
            id="perPage"
            value={perPage}
            onChange={handlePerPageChange}
            className="px-2 py-1 border rounded-md"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="40">40</option>
          </select>
        </div>

        <div className="flex items-center ">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="px-3 py-1 mr-2 border bg-[#82b440] text-white disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="mr-2">Página {currentPage} de {totalPages}</span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mr-2 border bg-[#82b440] text-white disabled:opacity-50"
          >
            Siguiente
          </button>
          <span>{itemsTotal} items</span>
        </div>
      </section>
    </React.Fragment>
  );
}
