"use client"
import React, { useState, useMemo } from 'react';

interface DataTableProps {
    data: any[];
    columns: Array<{ key: string, label: string, render?: (item: any) => JSX.Element }>;
    actions?: React.ReactNode;
    filterPlaceholder?: string;
    itemsPerPageOptions?: number[];
}

export const DataTable: React.FC<DataTableProps> = ({ data, columns, actions, filterPlaceholder = 'Buscar...', itemsPerPageOptions = [10, 20, 30, 40, 50] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageOptions[0]);

    const filteredData = useMemo(() => {
        if (!searchTerm) return data;
        return data.filter(item =>
            columns.some(column => {
                const value = item[column.key];
                return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
            })
        );
    }, [data, searchTerm, columns]);

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filteredData.slice(startIndex, endIndex);
    }, [filteredData, currentPage, itemsPerPage]);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to first page when items per page change
    };

    return (
        <section className="flex flex-col gap-3">
            <section className='flex xl:justify-between flex-col xl:flex-row mt-5 bg-white rounded-md p-4'>
                <input
                    type="text"
                    placeholder={filterPlaceholder}
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="px-2 py-1 border border-gray-300 rounded-md mb-2 outline-none"
                />
                {actions && <div className='flex items-center gap-3 md:flex-row flex-col'>{actions}</div>}
            </section>

            <section className="bg-white p-2 rounded-md w-full h-full overflow-x-auto xl:h-[35rem]">
                <div className="min-w-full inline-block align-middle">
                    <table className="min-w-[1000px] w-full border-collapse">
                        <thead>
                            <tr className="border-b border-gray-200">
                                {columns.map(column => (
                                    <th key={column.key} className="px-2 py-1 text-left sm:px-4 sm:py-2">{column.label}</th>
                                ))}
                                {/* <th className="px-4 py-2 text-left">Acciones</th> */}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData
                                .filter((item: any) => item.estado)
                                .map((item, index) => (
                                    <tr key={index} className="border-b">
                                        {columns.map(column => (
                                            <td key={column.key} className="px-2 py-1 sm:px-4 sm:py-2">
                                                {column.render ? column.render(item) : item[column.key]}
                                            </td>
                                        ))}
                                        {/* <td className="px-4 py-2">
                                <button className="text-red-500">Eliminar</button>
                            </td> */}
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </section>



            <section className="bg-white p-3 flex flex-col md:flex-row justify-between  rounded-lg gap-3">
                <div className="flex flex-col sm:flex-row gap-3 ">
                    <div className="flex gap-2 items-center">
                        <label htmlFor="itemsPerPage" className="text-gray-700">Datos por página:</label>
                        <select
                            id="itemsPerPage"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                            className="border border-gray-300 rounded-md p-1"
                        >
                            {itemsPerPageOptions.map((option: any) => (
                                <option key={option} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                    <span className="text-gray-600">Total datos: {filteredData.length}</span>
                </div>
                <div className="flex gap-3 ">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-3 py-1 rounded-md ${currentPage === 1 ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'}`}
                    >
                        Atrás
                    </button>
                    <span className="text-gray-700">Página {currentPage} de {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-3 py-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300 text-gray-500' : 'bg-blue-500 text-white'}`}
                    >
                        Siguiente
                    </button>
                </div>
            </section>

        </section>
    );
};

