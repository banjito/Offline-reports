import React, { useMemo } from 'react';

type DwRow = { bus: string; ag?: string; bg?: string; cg?: string; unit?: 'µA'|'mA' };
export interface SwitchgearDielectricValue { testVoltage?: string; rows?: DwRow[] }

interface Props { value?: SwitchgearDielectricValue; onChange: (v: SwitchgearDielectricValue)=>void }

const BUS = ['Bus 1','Bus 2','Bus 3','Bus 4','Bus 5','Bus 6'];
const DEFAULT: DwRow[] = BUS.map(b => ({ bus: b, unit: 'µA' }));

export const SwitchgearDielectricTable: React.FC<Props> = ({ value, onChange }) => {
  const v = useMemo<SwitchgearDielectricValue>(()=>({ testVoltage: value?.testVoltage ?? '2.2 kVAC', rows: value?.rows?.length ? value.rows : DEFAULT }), [value?.testVoltage, value?.rows]);
  const set = (u: Partial<SwitchgearDielectricValue>) => onChange({ ...value, ...u });
  const setCell = (i: number, k: keyof DwRow, val: string) => { const rows=[...(v.rows||[])]; const r={...(rows[i]||{})} as DwRow; (r as any)[k]=val; rows[i]=r; set({ rows }); };
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 justify-end">
        <span className="text-sm">Test Voltage:</span>
        <select className="h-8 rounded border border-gray-300 px-2" value={v.testVoltage} onChange={(e)=>set({ testVoltage: e.target.value })}>
          {['1.6 kVAC','2.2 kVAC','14 kVAC','27 kVAC','37 kVAC','45 kVAC','60 kVAC','120 kVAC','2.3 kVDC','3.1 kVDC','20 kVDC','37.5 kVDC'].map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-1 bg-gray-50 w-32">Bus Section</th>
              <th colSpan={3} className="border px-2 py-1 bg-gray-50 text-center">Dielectric Withstand</th>
              <th className="border px-2 py-1 bg-gray-50">Units</th>
            </tr>
            <tr>
              <th className="border px-2 py-1 bg-gray-50"></th>
              {['A-G','B-G','C-G'].map(h => <th key={h} className="border px-2 py-1 bg-gray-50">{h}</th>)}
              <th className="border px-2 py-1 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody>
            {(v.rows||DEFAULT).map((row, i)=> (
              <tr key={i}>
                <td className="border px-2 py-1 text-sm">{row.bus}</td>
                {(['ag','bg','cg'] as const).map(k => (
                  <td key={k} className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={(row as any)[k]||''} onBlur={(e)=>setCell(i, k, e.target.value)} /></td>
                ))}
                <td className="border px-1 py-1"><select className="w-full h-7 border-none bg-transparent text-center focus:outline-none" value={row.unit||'µA'} onChange={(e)=>setCell(i,'unit',e.target.value)}>{['µA','mA'].map(u=> <option key={u} value={u}>{u}</option>)}</select></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


