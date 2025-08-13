import React from 'react';

export interface DielectricClosedValue {
  p1Ground?: string;
  p2Ground?: string;
  p3Ground?: string;
  units?: 'µA' | 'mA';
}

interface Props {
  value?: DielectricClosedValue;
  onChange: (next: DielectricClosedValue) => void;
}

const ensure = (v?: DielectricClosedValue): Required<DielectricClosedValue> => ({
  p1Ground: v?.p1Ground || '',
  p2Ground: v?.p2Ground || '',
  p3Ground: v?.p3Ground || '',
  units: (v?.units as any) || 'µA',
});

const UNITS: Array<'µA'|'mA'> = ['µA','mA'];

export const DielectricWithstandClosedTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);
  const setField = (updates: Partial<DielectricClosedValue>) => onChange({ ...v, ...updates });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th colSpan={4} className="border px-2 py-2 text-center">Dielectric Withstand (Breaker In Closed Position)</th>
          </tr>
          <tr>
            <th className="border px-2 py-2">P1 - Ground</th>
            <th className="border px-2 py-2">P2 - Ground</th>
            <th className="border px-2 py-2">P3 - Ground</th>
            <th className="border px-2 py-2">Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1"><input className="w-full rounded-md border-gray-300 shadow-sm" value={v.p1Ground} onChange={(e)=>setField({ p1Ground: e.target.value })} /></td>
            <td className="border px-2 py-1"><input className="w-full rounded-md border-gray-300 shadow-sm" value={v.p2Ground} onChange={(e)=>setField({ p2Ground: e.target.value })} /></td>
            <td className="border px-2 py-1"><input className="w-full rounded-md border-gray-300 shadow-sm" value={v.p3Ground} onChange={(e)=>setField({ p3Ground: e.target.value })} /></td>
            <td className="border px-2 py-1">
              <select className="w-full rounded-md border-gray-300 shadow-sm" value={v.units} onChange={(e)=>setField({ units: e.target.value as any })}>
                {UNITS.map(u => (<option key={u} value={u}>{u}</option>))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


