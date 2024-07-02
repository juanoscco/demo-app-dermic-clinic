// import * as XLSX from 'xlsx';

// interface ExcelExportProps {
//     data: any[];
//     columns: { [key: string]: string };
//     filename?: string; 
// }

// export function ExcelExport({ data, columns, filename = 'data' }: ExcelExportProps) {
//     const handleExportExcel = () => {
//         const formattedData = data?.map((item: any) => {
//             const formattedItem: any = {};
//             Object.keys(columns).forEach((key) => {
//                 // Handle nested properties
//                 const keys = key.split('.');
//                 let value = item;
//                 keys.forEach(k => {
//                     value = value?.[k];
//                 });
//                 formattedItem[columns[key]] = value;
//             });
//             return formattedItem;
//         });

//         const worksheet = XLSX.utils.json_to_sheet(formattedData);

//         // Customizing the header
//         const header = Object.values(columns);

//         // Apply header
//         XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });

//         // Auto width for columns
//         const colWidths = header.map((_, i) => ({
//             wch: Math.max(...formattedData.map(row => `${row[header[i]]}`.length + 2), header[i].length + 2)
//         }));
//         worksheet['!cols'] = colWidths;

//         const workbook = XLSX.utils.book_new();
//         XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
//         XLSX.writeFile(workbook, `${filename}.xlsx`);
//     };

//     return handleExportExcel
// };
import * as XLSX from 'xlsx';

interface ExcelExportProps {
    data: any[];
    columns: any; // Utilizando any para evitar errores de tipo
    filename: string;
}

export function ExcelExport({ data, columns, filename }: ExcelExportProps) {
    const handleExportExcel = () => {
        const formattedData = data?.map((item: any) => {
            const formattedItem: any = {};
            Object.keys(columns).forEach((key) => {
                const columnConfig = columns[key];
                if (typeof columnConfig === 'string') {
                    formattedItem[columnConfig] = getNestedValue(item, key);
                } else if (columnConfig.type === 'list') {
                    const listData = item[key] || [];
                    const listColumns = columnConfig.columns;
                    listData.forEach((listItem: any, index: number) => {
                        Object.keys(listColumns).forEach((listKey) => {
                            const columnName = `${listColumns[listKey]} ${index + 1}`;
                            const nestedValue = getNestedValue(listItem, listKey);
                            formattedItem[columnName] = nestedValue;
                        });
                    });
                }
            });
            return formattedItem;
        });

        const worksheet = XLSX.utils.json_to_sheet(formattedData);

        // Customizing the header
        const header = Object.values(columns).reduce((acc: string[], column: any) => {
            if (typeof column === 'string') {
                acc.push(column);
            } else if (column.type === 'list') {
                const listColumns = column.columns;
                Object.keys(listColumns).forEach(() => {
                    Object.keys(listColumns).forEach((listKey) => {
                        acc.push(listColumns[listKey]);
                    });
                });
            }
            return acc;
        }, []);

        // Apply header
        XLSX.utils.sheet_add_aoa(worksheet, [header], { origin: 'A1' });

        // Auto width for columns
        const colWidths = header.map((_, i) => ({
            wch: Math.max(...formattedData.map(row => `${row[header[i]]}`.length + 2), header[i].length + 2)
        }));
        worksheet['!cols'] = colWidths;

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
        XLSX.writeFile(workbook, `${filename}.xlsx`);
    };

    // Helper function to get nested values safely
    const getNestedValue = (obj: any, path: string) => {
        const keys = path.split('.');
        return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ''), obj);
    };

    return handleExportExcel;
}
