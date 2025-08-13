import React from 'react';
import { convertFahrenheitToCelsius, getTCF, applyTCF } from '../lib/tcf';

type Row = {
  id: string;
  p1?: string; p1c?: string;
  p2?: string; p2c?: string;
  p3?: string; p3c?: string;
  neutral?: string; neutralc?: string;
  units?: string;
};

interface Value {
  testVoltage?: string;
  rows?: Row[];
}

interface Props {
  value?: Value;
  onChange: (next: Value) => void;
  temperatureF?: number;
}

const TEST_VOLTAGES = ['250V','500V','1000V','2500V','5000V'];
const UNITS = ['kΩ','MΩ','GΩ'];

const DEFAULT_ROWS: Row[] = [
  { id: 'Pole to Pole (Normal Closed)', units: 'MΩ' },
  { id: 'Pole to Pole (Emergency Closed)', units: 'MΩ' },
  { id: 'Pole to Neutral (Normal Closed)', units: 'MΩ' },
  { id: 'Pole to Neutral (Emergency Closed)', units: 'MΩ' },
  { id: 'Pole to Ground (Normal Closed)', units: 'MΩ' },
  { id: 'Pole to Ground (Emergency Closed)', units: 'MΩ' },
  { id: 'Line to Load (Normal Open)', units: 'MΩ' },
  { id: 'Line to Load (Emergency Open)', units: 'MΩ' },
];

export const AtsInsulationTable: React.FC<Props> = ({ value, onChange, temperatureF }) => {
  const rows = value?.rows?.length ? value!.rows! : DEFAULT_ROWS;
  const testVoltage = value?.testVoltage || '1000V';

  const celsius = typeof temperatureF === 'number' ? convertFahrenheitToCelsius(temperatureF) : undefined;
  const tcf = typeof celsius === 'number' ? getTCF(celsius) : undefined;

  const set = (idx: number, updates: Partial<Row>) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, ...updates } : r));
    onChange({ testVoltage, rows: next });
  };

  const handle = (idx: number, field: keyof Row, cfield: keyof Row) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (typeof tcf === 'number') {
      set(idx, { [field]: v, [cfield]: applyTCF(v, tcf) } as any);
    } else {
      set(idx, { [field]: v } as any);
    }
  };

  const onArrow = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>, r: number, c: number) => {
    const key = e.key;
    if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key)) return;
    e.preventDefault();
    const delta = key === 'ArrowLeft' ? [0,-1] : key === 'ArrowRight' ? [0,1] : key === 'ArrowUp' ? [-1,0] : [1,0];
    const nr = Math.max(0, Math.min(rows.length - 1, r + delta[0]));
    const nc = Math.max(0, Math.min(9, c + delta[1]));
    document.querySelector<HTMLElement>(`[data-atsir-pos="${nr}-${nc}"]`)?.focus();
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-2">
        <label className="form-label mr-2">Test Voltage:</label>
        <select value={testVoltage} onChange={(e)=>onChange({ testVoltage: e.target.value, rows })} className="form-select inline-block w-auto">
          {TEST_VOLTAGES.map(v => <option key={v} value={v}>{v}</option>)}
        </select>
      </div>
      <table className="min-w-full border-collapse text-xs">
        <thead>
          <tr className="bg-gray-50">
            <th rowSpan={2} className="px-2 py-2 border text-center">Test Points</th>
            <th colSpan={2} className="px-2 py-2 border text-center">P1</th>
            <th colSpan={2} className="px-2 py-2 border text-center">P2</th>
            <th colSpan={2} className="px-2 py-2 border text-center">P3</th>
            <th colSpan={2} className="px-2 py-2 border text-center">Neutral</th>
            <th rowSpan={2} className="px-2 py-2 border text-center">Units</th>
          </tr>
          <tr className="bg-gray-50">
            {['Reading','@20°C','Reading','@20°C','Reading','@20°C','Reading','@20°C'].map((h, i)=> (
              <th key={i} className="px-2 py-2 border text-center">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, idx) => (
            <tr key={r.id}>
              <td className="border px-2 py-1 whitespace-nowrap">{r.id}</td>
              <td className="border px-1 py-1"><input data-atsir-pos={`${idx}-0`} value={r.p1 || ''} onChange={handle(idx,'p1','p1c')} onKeyDown={(e)=>onArrow(e,idx,0)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
              <td className="border px-1 py-1"><input data-atsir-pos={`${idx}-1`} value={r.p1c || ''} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
              <td className="border px-1 py-1"><input data-atsir-pos={`${idx}-2`} value={r.p2 || ''} onChange={handle(idx,'p2','p2c')} onKeyDown={(e)=>onArrow(e,idx,2)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
              <td className="border px-1 py-1"><input data-atsir-pos={`${idx}-3`} value={r.p2c || ''} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
              <td className="border px-1 py-1"><input data-atsir-pos={`${idx}-4`} value={r.p3 || ''} onChange={handle(idx,'p3','p3c')} onKeyDown={(e)=>onArrow(e,idx,4)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
              <td className="border px-1 py-1"><input data-atsir-pos={`${idx}-5`} value={r.p3c || ''} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
              <td className="border px-1 py-1"><input data-atsir-pos={`${idx}-6`} value={r.neutral || ''} onChange={handle(idx,'neutral','neutralc')} onKeyDown={(e)=>onArrow(e,idx,6)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
              <td className="border px-1 py-1"><input data-atsir-pos={`${idx}-7`} value={r.neutralc || ''} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
              <td className="border px-1 py-1">
                <select data-atsir-pos={`${idx}-8`} value={r.units || 'MΩ'} onChange={(e)=>set(idx,{ units: e.target.value })} onKeyDown={(e)=>onArrow(e,idx,8)} className="h-7 text-xs border rounded bg-white">
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


