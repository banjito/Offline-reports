import React from 'react';

interface Value {
  testVoltage?: string;
  testDuration?: string; // default "1 Min."
  p1?: string;
  p2?: string;
  p3?: string;
  units?: string;
}

interface Props {
  value?: Value;
  onChange: (next: Value) => void;
}

const UNIT_OPTS = ['kV','mA'];

export const VacuumBottleIntegrityTable: React.FC<Props> = ({ value, onChange }) => {
  const v = value || { testDuration: '1 Min.' };
  const set = (updates: Partial<Value>) => onChange({ ...v, ...updates });
  const onArrow = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>, c: number) => {
    const key = e.key;
    if (!['ArrowLeft','ArrowRight'].includes(key)) return;
    e.preventDefault();
    const delta = key === 'ArrowLeft' ? -1 : 1;
    const nc = Math.max(0, Math.min(5, c + delta));
    document.querySelector<HTMLElement>(`[data-vb-pos="${nc}"]`)?.focus();
  };

  return (
    <div className="overflow-x-auto">
      <h3 className="text-md font-semibold mb-2">Vacuum Bottle Integrity (Breaker In Open Position)</h3>
      <table className="min-w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-2 py-2 border">Test Voltage</th>
            <th className="px-2 py-2 border">Test Duration</th>
            <th className="px-2 py-2 border">P1</th>
            <th className="px-2 py-2 border">P2</th>
            <th className="px-2 py-2 border">P3</th>
            <th className="px-2 py-2 border">Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-2 py-1"><input data-vb-pos="0" value={v.testVoltage || ''} onChange={(e)=>set({ testVoltage: e.target.value })} onKeyDown={(e)=>onArrow(e,0)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
            <td className="border px-2 py-1"><input data-vb-pos="1" value={v.testDuration || '1 Min.'} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
            <td className="border px-2 py-1"><input data-vb-pos="2" value={v.p1 || ''} onChange={(e)=>set({ p1: e.target.value })} onKeyDown={(e)=>onArrow(e,2)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
            <td className="border px-2 py-1"><input data-vb-pos="3" value={v.p2 || ''} onChange={(e)=>set({ p2: e.target.value })} onKeyDown={(e)=>onArrow(e,3)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
            <td className="border px-2 py-1"><input data-vb-pos="4" value={v.p3 || ''} onChange={(e)=>set({ p3: e.target.value })} onKeyDown={(e)=>onArrow(e,4)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
            <td className="border px-2 py-1">
              <select data-vb-pos="5" value={v.units || ''} onChange={(e)=>set({ units: e.target.value })} onKeyDown={(e)=>onArrow(e as any,5)} className="h-7 text-xs border rounded bg-white">
                <option value="">Select</option>
                {UNIT_OPTS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


