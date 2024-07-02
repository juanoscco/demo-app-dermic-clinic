interface PrintButtonProps {
  data: any[];
  columns: any;
  nametitle: string;
}

export function PrintButton({ data, columns, nametitle = 'data' }: PrintButtonProps) {
    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            const formattedData = data.map((item: any) => {
                const formattedItem: any = {};
                Object.keys(columns).forEach((key) => {
                    // Handle nested properties
                    const value = getNestedValue(item, key);
                    formattedItem[columns[key]] = value !== undefined ? value : '';
                });
                return formattedItem;
            });

            printWindow.document.write(`
                <html>
                <head>
                    <title>${nametitle}</title>
                    <style>
                        table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        th, td {
                            border: 1px solid black;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <table>
                        <thead>
                            <tr>
                                ${Object.values(columns).map((col: any) => `<th>${col}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${formattedData.map((item: any) => `
                                <tr>
                                    ${Object.keys(columns).map((key) => `<td>${item[columns[key]]}</td>`).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    };

    // Helper function to get nested values safely
    const getNestedValue = (obj: any, path: string) => {
        const keys = path.split('.');
        return keys.reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
    };
  return handlePrint
};
