import React, { useMemo } from 'react';

type IrRow = {
  bus: string;
  ag?: string; bg?: string; cg?: string;
  ab?: string; bc?: string; ca?: string;
  an?: string; bn?: string; cn?: string;
  unit?: 'kΩ'|'MΩ'|'GΩ';
};

export interface SwitchgearIrMeasuredValue {
  testVoltage?: string; // 1000V, etc
  rows?: IrRow[];
}

interface Props {
  value?: SwitchgearIrMeasuredValue;
  onChange: (next: SwitchgearIrMeasuredValue) => void;
}

const BUS_SECTIONS = ['Bus 1','Bus 2','Bus 3','Bus 4','Bus 5','Bus 6'];
const DEFAULT_ROWS: IrRow[] = BUS_SECTIONS.map((b) => ({ bus: b, unit: 'MΩ' }));

export const SwitchgearIrMeasuredTable: React.FC<Props> = ({ value, onChange }) => {
  const v = useMemo<SwitchgearIrMeasuredValue>(() => ({
    testVoltage: value?.testVoltage ?? '1000V',
    rows: value?.rows && value.rows.length ? value.rows : DEFAULT_ROWS,
  }), [value?.testVoltage, value?.rows]);

  const set = (u: Partial<SwitchgearIrMeasuredValue>) => onChange({ ...value, ...u });

  const setCell = (rowIdx: number, key: keyof IrRow, val: string) => {
    const rows = [...(v.rows || [])];
    const row = { ...(rows[rowIdx] || {}) } as IrRow;
    (row as any)[key] = val;
    rows[rowIdx] = row;
    set({ rows });
    // Broadcast for corrected table
    try {
      (window as any).__SWG_IR_MEASURED = rows;
      window.dispatchEvent(new CustomEvent('swg-ir-updated'));
    } catch {}
  };

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
              <th colSpan={9} className="border px-2 py-1 bg-gray-50 text-center">Insulation Resistance</th>
              <th className="border px-2 py-1 bg-gray-50">Units</th>
            </tr>
            <tr>
              <th className="border px-2 py-1 bg-gray-50"></th>
              {['A-G','B-G','C-G','A-B','B-C','C-A','A-N','B-N','C-N'].map(h => (
                <th key={h} className="border px-2 py-1 bg-gray-50">{h}</th>
              ))}
              <th className="border px-2 py-1 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody>
            {(v.rows || DEFAULT_ROWS).map((row, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1 text-sm">{row.bus}</td>
                {(['ag','bg','cg','ab','bc','ca','an','bn','cn'] as const).map((k) => (
                  <td key={k} className="border px-1 py-1">
                    <input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={(row as any)[k] || ''} onBlur={(e)=>setCell(idx, k, e.target.value)} />
                  </td>
                ))}
                <td className="border px-1 py-1">
                  <select className="w-full h-7 border-none bg-transparent text-center focus:outline-none" value={row.unit || 'MΩ'} onChange={(e)=>setCell(idx, 'unit', e.target.value)}>
                    {['kΩ','MΩ','GΩ'].map(u=> <option key={u} value={u}>{u}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


