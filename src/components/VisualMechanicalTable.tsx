import React from 'react';

export interface VmRow { id: string; description: string; result?: string }
interface Props {
  rows: VmRow[];
  onChange: (rows: VmRow[]) => void;
}

const RESULTS = ['Satisfactory', 'Unsatisfactory', 'Cleaned', 'See Comments', 'Not Applicable'];

export const VisualMechanicalTable: React.FC<Props> = ({ rows, onChange }) => {
  const update = (idx: number, result: string) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, result } : r));
    onChange(next);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border">NETA Section</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border">Description</th>
            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 border">Results</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.id} className="hover:bg-gray-50">
              <td className="border px-3 py-2 font-mono text-xs">{r.id}</td>
              <td className="border px-3 py-2">{r.description}</td>
              <td className="border px-3 py-2">
                <select
                  value={r.result ?? ''}
                  onChange={(e) => update(i, e.target.value)}
                  className="w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm bg-white"
                >
                  <option value=""></option>
                  {RESULTS.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


