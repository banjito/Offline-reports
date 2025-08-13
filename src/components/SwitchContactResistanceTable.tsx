import React from 'react';

export interface SwitchContactRow {
  label?: string; // Switch, Fuse, Switch + Fuse
  p1?: string;
  p2?: string;
  p3?: string;
  units?: string; // default µΩ
}

export interface SwitchContactValue { rows?: SwitchContactRow[] }

interface Props { value?: SwitchContactValue; onChange: (next: SwitchContactValue) => void }

const ensure = (v?: SwitchContactValue): Required<SwitchContactValue> => ({
  rows: v?.rows && v.rows.length ? v.rows : [
    { label: 'Switch', units: 'µΩ' },
    { label: 'Fuse', units: 'µΩ' },
    { label: 'Switch + Fuse', units: 'µΩ' },
  ]
});

export const SwitchContactResistanceTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);
  const setRow = (i: number, updates: Partial<SwitchContactRow>) => {
    const next = ensure({ ...v });
    next.rows[i] = { ...next.rows[i], ...updates };
    onChange(next);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-2 py-2"></th>
            <th className="border px-2 py-2 text-center">P1</th>
            <th className="border px-2 py-2 text-center">P2</th>
            <th className="border px-2 py-2 text-center">P3</th>
            <th className="border px-2 py-2">Units</th>
          </tr>
        </thead>
        <tbody>
          {v.rows.map((r, idx) => (
            <tr key={idx}>
              <td className="border px-2 py-1 w-40">{r.label || ''}</td>
              <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0 text-center" value={r.p1 || ''} onChange={(e)=>setRow(idx,{ p1: e.target.value })} /></td>
              <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0 text-center" value={r.p2 || ''} onChange={(e)=>setRow(idx,{ p2: e.target.value })} /></td>
              <td className="border px-2 py-1"><input className="w-full border-0 focus:ring-0 text-center" value={r.p3 || ''} onChange={(e)=>setRow(idx,{ p3: e.target.value })} /></td>
              <td className="border px-2 py-1 text-center">{r.units || 'µΩ'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


