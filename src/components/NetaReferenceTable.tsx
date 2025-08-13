import React from 'react';

export interface NetaRow { id: string; description: string }
export interface NetaReferenceValue { rows?: NetaRow[] }

interface Props { value?: NetaReferenceValue; onChange?: (next: NetaReferenceValue) => void }

export const NetaReferenceTable: React.FC<Props> = ({ value }) => {
  const rows: NetaRow[] = value?.rows || [];
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-2 py-2">Section</th>
            <th className="border px-2 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.id}>
              <td className="border px-2 py-1 text-sm">{r.id}</td>
              <td className="border px-2 py-1 text-sm">{r.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


