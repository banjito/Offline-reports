import React from 'react';

export interface VmMatrixRow {
  identifier?: string;
  values?: Record<string, string>; // keys '1'..'12' (8.1 handled via label only)
}

export interface VmMatrixValue {
  rows?: VmMatrixRow[]; // expect 5 rows with last row label 'P1-'
}

interface Props {
  value?: VmMatrixValue;
  onChange: (next: VmMatrixValue) => void;
}

const ensure = (v?: VmMatrixValue): Required<VmMatrixValue> => ({
  rows: (v?.rows && v.rows.length ? v.rows : Array.from({ length: 5 }, () => ({ identifier: '', values: {} })))
});

const OPTIONS = ['', 'Y', 'N', 'N/A'];

export const VisualMechanicalMatrixTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);

  const setIdentifier = (rowIdx: number, identifier: string) => {
    const next = ensure({ ...v });
    next.rows[rowIdx] = { ...next.rows[rowIdx], identifier };
    onChange(next);
  };
  const setCell = (rowIdx: number, colKey: string, val: string) => {
    const next = ensure({ ...v });
    const row = next.rows[rowIdx] || { identifier: '', values: {} };
    next.rows[rowIdx] = { ...row, values: { ...(row.values || {}), [colKey]: val } };
    onChange(next);
  };

  return (
    <div className="overflow-x-auto">
      <div className="flex">
        <div className="flex-grow">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th colSpan={13} className="border p-2 text-center bg-gray-50">Visual and Mechanical Tests for NETA ATS Section 7.5.1.1.A</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left w-[25%]">Position / Identifier</th>
                {Array.from({ length: 12 }).map((_, i) => (
                  <th key={i} className="border p-2 text-center w-[6.25%]">{i === 7 ? '8.1' : i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  <td className="border p-2">
                    {rowIdx === 4 ? 'P1-' : (
                      <input
                        type="text"
                        value={v.rows[rowIdx]?.identifier || ''}
                        onChange={(e) => setIdentifier(rowIdx, e.target.value)}
                        className="w-full bg-transparent border-none focus:ring-0"
                      />
                    )}
                  </td>
                  {Array.from({ length: 12 }).map((_, colIdx) => (
                    <td key={colIdx} className="border p-2">
                      <select
                        value={v.rows[rowIdx]?.values?.[String(colIdx + 1)] || ''}
                        onChange={(e)=> setCell(rowIdx, String(colIdx + 1), e.target.value)}
                        className="w-full bg-transparent border-none focus:ring-0 text-center"
                      >
                        {OPTIONS.map((opt)=>(<option key={opt} value={opt}>{opt}</option>))}
                      </select>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="ml-4 flex-shrink-0">
          <table className="border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th colSpan={3} className="border p-2 text-center">Satisfactory?</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Yes</td>
                <td className="border p-2">=</td>
                <td className="border p-2">Y</td>
              </tr>
              <tr>
                <td className="border p-2">No</td>
                <td className="border p-2">=</td>
                <td className="border p-2">N</td>
              </tr>
              <tr>
                <td className="border p-2">Not</td>
                <td className="border p-2">=</td>
                <td className="border p-2">N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


