import React from 'react';
import * as XLSX from 'xlsx';

const ImportFile = ({ selectedData, manualInputs }) => {
  
  const handleDownload = () => {
    console.log('Manual input in importfile is:', manualInputs)
    console.log('Datacard selections made in importfile are:', selectedData)
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    
    // Format the selectedData and manualInputs into the appropriate format (array of arrays)
    const sheetData = selectedData.map(({ item, name, manualInput }) => [
      name,
      item ? item[0] : manualInput?.SAP || '',
      item ? item[1] : manualInput?.ProductDescription || '',
      manualInputs[name]?.AlternateSAP || '',  // Use "AlternateSAP"
      manualInputs[name]?.AlternateProductDescription || '',  // Use "AlternateProductDescription"
    ]);

    // Create a new worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([['End User Description', 'SAP Item Number', 'Product Description', 'Alternate SAP', 'Alternate Product Description'], ...sheetData]);
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SelectedData');
    // Convert the workbook to a binary string
    const excelFile = XLSX.write(workbook, { type: 'binary' });

    // Create a blob with the binary data and create a download link
    const blob = new Blob([s2ab(excelFile)], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);

    // Trigger the download
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected_data.xlsx';
    a.click();
    // Cleanup
    URL.revokeObjectURL(url);
  };

  // Convert a string to an array buffer
  const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  };

  return (
    <div className="button-container">
    <button onClick={handleDownload}>Download Excel</button>
    </div>
  );
};

export default ImportFile;