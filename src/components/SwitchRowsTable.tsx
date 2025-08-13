import React from 'react';

export interface SwitchRow { position?: string; manufacturer?: string; catalogNo?: string; serialNo?: string; type?: string; ratedAmperage?: string; ratedVoltage?: string; }
export interface SwitchRowsValue { rows?: SwitchRow[] }

interface Props { value?: SwitchRowsValue; onChange: (next: SwitchRowsValue) => void }

const ensure = (v?: SwitchRowsValue): Required<SwitchRowsValue> => ({ rows: v?.rows && v.rows.length ? v.rows : Array.from({ length: 1 }, () => ({ })) });

export const SwitchRowsTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);
  const setRow = (i: number, updates: Partial<SwitchRow>) => {
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
            <th className="px-2 py-2 border">Serial No.</th>
            <th className="px-2 py-2 border">Type</th>
            <th className="px-2 py-2 border text-center" colSpan={2}>
              <div>Rated</div>
              <div className="grid grid-cols-2">
                <div className="border-t border-r border-gray-300 p-1">Amperage</div>
                <div className="border-t border-gray-300 p-1">Voltage</div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {v.rows.map((r, idx) => (
            <tr key={idx}>
              <td className="px-2 py-1 border"><input className="w-full rounded-md border-gray-300 shadow-sm" value={r.position || ''} onChange={(e)=>setRow(idx,{ position: e.target.value })} /></td>
              <td className="px-2 py-1 border"><input className="w-full rounded-md border-gray-300 shadow-sm" value={r.manufacturer || ''} onChange={(e)=>setRow(idx,{ manufacturer: e.target.value })} /></td>
              <td className="px-2 py-1 border"><input className="w-full rounded-md border-gray-300 shadow-sm" value={r.catalogNo || ''} onChange={(e)=>setRow(idx,{ catalogNo: e.target.value })} /></td>
              <td className="px-2 py-1 border"><input className="w-full rounded-md border-gray-300 shadow-sm" value={r.serialNo || ''} onChange={(e)=>setRow(idx,{ serialNo: e.target.value })} /></td>
              <td className="px-2 py-1 border"><input className="w-full rounded-md border-gray-300 shadow-sm" value={r.type || ''} onChange={(e)=>setRow(idx,{ type: e.target.value })} /></td>
              <td className="px-2 py-1 border"><input className="w-full rounded-md border-gray-300 shadow-sm" value={r.ratedAmperage || ''} onChange={(e)=>setRow(idx,{ ratedAmperage: e.target.value })} /></td>
              <td className="px-2 py-1 border"><input className="w-full rounded-md border-gray-300 shadow-sm" value={r.ratedVoltage || ''} onChange={(e)=>setRow(idx,{ ratedVoltage: e.target.value })} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


