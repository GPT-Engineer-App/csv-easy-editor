import React from 'react';
import Papa from 'papaparse';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CSVUploader = ({ onUpload }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (results) => {
          onUpload(results.data);
        },
        header: true,
      });
    }
  };

  return (
    <div className="mb-4">
      <Input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-2"
      />
      <Button onClick={() => document.querySelector('input[type="file"]').click()}>
        Upload CSV
      </Button>
    </div>
  );
};

export default CSVUploader;