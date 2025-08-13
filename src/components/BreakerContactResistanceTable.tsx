import React from 'react';

interface Value {
  p1?: string;
  p2?: string;
  p3?: string;
  unit?: string; // µΩ, mΩ, Ω
}

interface Props {
  value?: Value;
  onChange: (next: Value) => void;
}

const UNITS = ['µΩ', 'mΩ', 'Ω'];

export const BreakerContactResistanceTable: React.FC<Props> = ({ value, onChange }) => {
  const v = value || {};
  const set = (updates: Partial<Value>) => onChange({ ...v, ...updates });

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-2 py-2 text-center text-sm font-medium" colSpan={3}>Contact Resistance</th>
            <th className="border px-2 py-2 text-center text-sm font-medium">Units</th>
          </tr>
          <tr>
            <th className="border px-2 py-2 text-center text-sm font-medium">P1</th>
            <th className="border px-2 py-2 text-center text-sm font-medium">P2</th>
            <th className="border px-2 py-2 text-center text-sm font-medium">P3</th>
            <th className="border px-2 py-2"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-2 text-center">
              <input className="w-full p-1 border rounded" value={v.p1 || ''} onChange={(e)=>set({ p1: e.target.value })} />
            </td>
            <td className="border px-2 py-2 text-center">
              <input className="w-full p-1 border rounded" value={v.p2 || ''} onChange={(e)=>set({ p2: e.target.value })} />
            </td>
            <td className="border px-2 py-2 text-center">
              <input className="w-full p-1 border rounded" value={v.p3 || ''} onChange={(e)=>set({ p3: e.target.value })} />
            </td>
            <td className="border px-2 py-2 text-center">
              <select className="w-full p-1 border rounded" value={v.unit || 'µΩ'} onChange={(e)=>set({ unit: e.target.value })}>
                {UNITS.map((u) => (
                  <option key={u} value={u}>{u}</option>
                ))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


