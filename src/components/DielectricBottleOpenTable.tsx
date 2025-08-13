import React from 'react';

export interface DielectricOpenValue {
  p1?: string;
  p2?: string;
  p3?: string;
  units?: 'µA' | 'mA';
}

interface Props { value?: DielectricOpenValue; onChange: (next: DielectricOpenValue) => void }

const ensure = (v?: DielectricOpenValue): Required<DielectricOpenValue> => ({
  p1: v?.p1 || '',
  p2: v?.p2 || '',
  p3: v?.p3 || '',
  units: (v?.units as any) || 'µA'
});

const UNITS: Array<'µA'|'mA'> = ['µA','mA'];

export const DielectricBottleOpenTable: React.FC<Props> = ({ value, onChange }) => {
  const v = ensure(value);
  const set = (u: Partial<DielectricOpenValue>) => onChange({ ...v, ...u });

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th colSpan={4} className="border px-2 py-2 text-center">Vacuum Bottle Integrity (Breaker In Open Position)</th>
          </tr>
          <tr>
            <th className="border px-2 py-2">P1</th>
            <th className="border px-2 py-2">P2</th>
            <th className="border px-2 py-2">P3</th>
            <th className="border px-2 py-2">Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1"><input className="w-full rounded-md border-gray-300 shadow-sm" value={v.p1} onChange={(e)=>set({ p1: e.target.value })} /></td>
            <td className="border px-2 py-1"><input className="w-full rounded-md border-gray-300 shadow-sm" value={v.p2} onChange={(e)=>set({ p2: e.target.value })} /></td>
            <td className="border px-2 py-1"><input className="w-full rounded-md border-gray-300 shadow-sm" value={v.p3} onChange={(e)=>set({ p3: e.target.value })} /></td>
            <td className="border px-2 py-1">
              <select className="w-full rounded-md border-gray-300 shadow-sm" value={v.units} onChange={(e)=>set({ units: e.target.value as any })}>
                {UNITS.map(u => (<option key={u} value={u}>{u}</option>))}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


