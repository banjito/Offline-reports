import React from 'react';

export interface MvShieldContinuityValue {
  unit?: string; // Ω | mΩ | µΩ
  a?: string;
  b?: string;
  c?: string;
}

interface Props {
  value?: MvShieldContinuityValue;
  onChange: (next: MvShieldContinuityValue) => void;
}

const ensure = (v?: MvShieldContinuityValue): Required<MvShieldContinuityValue> => ({
  unit: v?.unit || 'Ω',
  a: v?.a || '',
  b: v?.b || '',
  c: v?.c || ''
});

const UNITS = ['Ω', 'mΩ', 'µΩ'];

export const MvShieldContinuityTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);

  const setField = (updates: Partial<MvShieldContinuityValue>) => {
    onChange({ ...v, ...updates });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-2 py-2">A Phase</th>
            <th className="border px-2 py-2">B Phase</th>
            <th className="border px-2 py-2">C Phase</th>
            <th className="border px-2 py-2">Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1">
              <input className="w-full rounded-md border-gray-300 shadow-sm" value={v.a} onChange={(e)=>setField({ a: e.target.value })} />
            </td>
            <td className="border px-2 py-1">
              <input className="w-full rounded-md border-gray-300 shadow-sm" value={v.b} onChange={(e)=>setField({ b: e.target.value })} />
            </td>
            <td className="border px-2 py-1">
              <input className="w-full rounded-md border-gray-300 shadow-sm" value={v.c} onChange={(e)=>setField({ c: e.target.value })} />
            </td>
            <td className="border px-2 py-1">
              <select className="w-full rounded-md border-gray-300 shadow-sm" value={v.unit} onChange={(e)=>setField({ unit: e.target.value })}>
                {UNITS.map(u => (<option key={u} value={u}>{u}</option>))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


