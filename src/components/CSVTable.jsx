import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CSVTable = ({ data, updateRow, addRow, deleteRow }) => {
  const [editingId, setEditingId] = useState(null);
  const [newRow, setNewRow] = useState({});

  const handleEdit = (id) => {
    setEditingId(id);
  };

  const handleSave = (id) => {
    updateRow(data.find((row) => row.id === id));
    setEditingId(null);
  };

  const handleChange = (id, field, value) => {
    updateRow({ ...data.find((row) => row.id === id), [field]: value });
  };

  const handleAddRow = () => {
    addRow(newRow);
    setNewRow({});
  };

  const handleNewRowChange = (field, value) => {
    setNewRow((prev) => ({ ...prev, [field]: value }));
  };

  if (!data || data.length === 0) return null;

  const headers = Object.keys(data[0]).filter((key) => key !== 'id');

  return (
    <div className="mb-4">
      <Table>
        <TableHeader>
          <TableRow>
            {headers.map((header) => (
              <TableHead key={header}>{header}</TableHead>
            ))}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              {headers.map((header) => (
                <TableCell key={`${row.id}-${header}`}>
                  {editingId === row.id ? (
                    <Input
                      value={row[header]}
                      onChange={(e) => handleChange(row.id, header, e.target.value)}
                    />
                  ) : (
                    row[header]
                  )}
                </TableCell>
              ))}
              <TableCell>
                {editingId === row.id ? (
                  <Button onClick={() => handleSave(row.id)}>Save</Button>
                ) : (
                  <Button onClick={() => handleEdit(row.id)}>Edit</Button>
                )}
                <Button onClick={() => deleteRow(row.id)} variant="destructive" className="ml-2">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          <TableRow>
            {headers.map((header) => (
              <TableCell key={`new-${header}`}>
                <Input
                  placeholder={`New ${header}`}
                  value={newRow[header] || ''}
                  onChange={(e) => handleNewRowChange(header, e.target.value)}
                />
              </TableCell>
            ))}
            <TableCell>
              <Button onClick={handleAddRow}>Add Row</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default CSVTable;