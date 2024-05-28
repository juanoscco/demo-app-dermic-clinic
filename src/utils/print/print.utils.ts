// src/utils/printUtils.js

export const handlePrint = (tableHTML: string) => {
    const printContent = document.createElement('div');
    const originalContent = document.body.innerHTML;
  
    printContent.innerHTML = tableHTML;
    document.body.innerHTML = printContent.innerHTML;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Recargar para restaurar el contenido original
  };
  