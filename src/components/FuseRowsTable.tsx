import React from 'react';

export interface FuseRow { position?: string; manufacturer?: string; catalogNo?: string; fuseClass?: string; amperage?: string; aic?: string; voltage?: string; }
export interface FuseRowsValue { rows?: FuseRow[] }
interface Props { value?: FuseRowsValue; onChange: (next: FuseRowsValue) => void }

const ensure = (v?: FuseRowsValue): Required<FuseRowsValue> => ({ rows: v?.rows && v.rows.length ? v.rows : Array.from({ length: 1 }, () => ({ })) });

export const FuseRowsTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);
  const setRow = (i: number, updates: Partial<FuseRow>) => {
    const next = ensure({ ...v });
    next.rows[i] = { ...next.rows[i], ...updates };
    onChange(next);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-2 border">Position / Identifier</th>
            <th className="px-2 py-2 border">Manufacturer</th>
            <th className="px-2 py-2 border">Catalog No.</th>
            <th className="px-2 py-2 border">Class</th>
            <th className="px-2 py-2 border">Amperage</th>
            <th className="px-2 py-2 border">AIC</th>
            <th className="px-2 py-2 border">Voltage</th>
          </tr>
        </thead>
        <tbody>
          {v.rows.map((r, idx) => (
            <tr key={idx}>
              <td className="px-2 py-1 border"><input className="w-full rounded-md border-gray-300 shadow-sm" value={r.position || ''} onChange={(e)=>setRow(idx,{ position: e.target.value })} /></td>
              <td className="px-2 py-1 border"><input className="w-full rounded-md border-gray-300 shadow-sm" value={r.manufacturer || ''} onChange={(e)=>setRow(idx,{ manufacturer: e.target.value })} /></td>
              <td className="px-2 py-1 border"><input className="w-full rounded-md border-gray-300 shadow-sm" value={r.catalogNo || ''} onChange={(e)=>setRow(idx,{ catalogNo: e.target.value })} /></td>
              <td className="px-2 py-1 border"><input className="w-full rounded-md border-gray-300 shadow-sm" value={r.fuseClass || ''} onChange={(e)=>setRow(idx,{ fuseClass: e.target.value })} /></td>
              <td className="px-2 py-1 border"><input className="w-full rounded-md border-gray-300 shadow-sm" value={r.amperage || ''} onChange={(e)=>setRow(idx,{ amperage: e.target.value })} /></td>
              <td className="px-2 py-1 border"><input className="w-full rounded-md border-gray-300 shadow-sm" value={r.aic || ''} onChange={(e)=>setRow(idx,{ aic: e.target.value })} /></td>
              <td className="px-2 py-1 border"><input className="w-full rounded-md border-gray-300 shadow-sm" value={r.voltage || ''} onChange={(e)=>setRow(idx,{ voltage: e.target.value })} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


