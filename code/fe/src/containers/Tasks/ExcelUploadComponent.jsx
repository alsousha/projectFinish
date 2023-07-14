import React, { useState } from 'react';
import { read, utils } from 'xlsx';
const { sheet_to_json } = utils;

const ExcelUploadComponent = ({ handleStudentsArray }) => {
  const [inputKey, setInputKey] = useState(0);

  const handleFileUpload = (e) => {
    console.log("eeee");
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);

      const workbook = read(data, { type: 'array' });

      // Access the parsed data from the Excel file
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const dataArray = sheet_to_json(worksheet, { header: 1 });

      console.log('Parsed data:', dataArray);
      handleStudentsArray(dataArray); // Send array to parent component

      // Reset the input field to allow selecting the same file again
      setInputKey(inputKey + 1);
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input
        key={inputKey}
        type="file"
        accept=".xls, .xlsx"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default ExcelUploadComponent;