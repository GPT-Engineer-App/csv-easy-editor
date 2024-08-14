import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import CSVUploader from './CSVUploader';
import CSVTable from './CSVTable';
import CSVDownloader from './CSVDownloader';

const CSVManager = () => {
  const [csvData, setCsvData] = useState([]);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['csvData'],
    queryFn: () => csvData,
    enabled: csvData.length > 0,
  });

  const updateRowMutation = useMutation({
    mutationFn: (updatedRow) => {
      setCsvData((prevData) =>
        prevData.map((row) => (row.id === updatedRow.id ? updatedRow : row))
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['csvData']);
    },
  });

  const addRowMutation = useMutation({
    mutationFn: (newRow) => {
      setCsvData((prevData) => [...prevData, { id: Date.now(), ...newRow }]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['csvData']);
    },
  });

  const deleteRowMutation = useMutation({
    mutationFn: (id) => {
      setCsvData((prevData) => prevData.filter((row) => row.id !== id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['csvData']);
    },
  });

  const handleFileUpload = (data) => {
    const dataWithIds = data.map((row, index) => ({ id: index, ...row }));
    setCsvData(dataWithIds);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">CSV Manager</h1>
      <CSVUploader onUpload={handleFileUpload} />
      {data && data.length > 0 && (
        <>
          <CSVTable
            data={data}
            updateRow={updateRowMutation.mutate}
            addRow={addRowMutation.mutate}
            deleteRow={deleteRowMutation.mutate}
          />
          <CSVDownloader data={data} />
        </>
      )}
    </div>
  );
};

export default CSVManager;