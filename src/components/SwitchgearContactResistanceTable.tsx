import React, { useMemo } from 'react';

type CrRow = { bus: string; a?: string; b?: string; c?: string; neutral?: string; ground?: string; unit?: 'µΩ'|'mΩ'|'Ω' };
export interface SwitchgearContactValue { testVoltage?: string; rows?: CrRow[] }

interface Props { value?: SwitchgearContactValue; onChange: (v: SwitchgearContactValue)=>void }

const BUS = ['Bus 1','Bus 2','Bus 3','Bus 4','Bus 5','Bus 6'];
const DEFAULT: CrRow[] = BUS.map(b => ({ bus: b, unit: 'µΩ' }));

export const SwitchgearContactResistanceTable: React.FC<Props> = ({ value, onChange }) => {
  const v = useMemo<SwitchgearContactValue>(()=>({ testVoltage: value?.testVoltage ?? '1000V', rows: value?.rows?.length ? value.rows : DEFAULT }), [value?.testVoltage, value?.rows]);
  const set = (u: Partial<SwitchgearContactValue>) => onChange({ ...value, ...u });
  const setCell = (i: number, k: keyof CrRow, val: string) => { const rows=[...(v.rows||[])]; const r={...(rows[i]||{})} as CrRow; (r as any)[k]=val; rows[i]=r; set({ rows }); };
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 justify-end">
        <span className="text-sm">Test Voltage:</span>
        <select className="h-8 rounded border border-gray-300 px-2" value={v.testVoltage} onChange={(e)=>set({ testVoltage: e.target.value })}>
          {['250V','500V','1000V','2500V','5000V'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-1 bg-gray-50 w-32">Bus Section</th>
              <th colSpan={5} className="border px-2 py-1 bg-gray-50 text-center">Contact Resistance</th>
              <th className="border px-2 py-1 bg-gray-50">Units</th>
            </tr>
            <tr>
              <th className="border px-2 py-1 bg-gray-50"></th>
              {['A Phase','B Phase','C Phase','Neutral','Ground'].map(h => <th key={h} className="border px-2 py-1 bg-gray-50">{h}</th>)}
              <th className="border px-2 py-1 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody>
            {(v.rows||DEFAULT).map((row, i)=> (
              <tr key={i}>
                <td className="border px-2 py-1 text-sm">{row.bus}</td>
                {(['a','b','c','neutral','ground'] as const).map(k => (
                  <td key={k} className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={(row as any)[k]||''} onBlur={(e)=>setCell(i, k, e.target.value)} /></td>
                ))}
                <td className="border px-1 py-1"><select className="w-full h-7 border-none bg-transparent text-center focus:outline-none" value={row.unit||'µΩ'} onChange={(e)=>setCell(i,'unit',e.target.value)}>{['µΩ','mΩ','Ω'].map(u=> <option key={u} value={u}>{u}</option>)}</select></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


