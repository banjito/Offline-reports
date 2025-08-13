import React from 'react';
import { convertFahrenheitToCelsius, getTCF, applyTCF } from '../lib/tcf';

type Row = {
  id: 'Pole to Pole' | 'Pole to Frame' | 'Line to Load';
  state: 'Closed' | 'Open';
  p1?: string;
  p2?: string;
  p3?: string;
  p1c?: string; // corrected
  p2c?: string;
  p3c?: string;
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

const DEFAULT_ROWS: Row[] = [
  { id: 'Pole to Pole', state: 'Closed' },
  { id: 'Pole to Frame', state: 'Closed' },
  { id: 'Line to Load', state: 'Open' },
];

export const ContactorInsulationTable: React.FC<Props> = ({ value, onChange, temperatureF }) => {
  const rows = value?.rows?.length ? value!.rows! : DEFAULT_ROWS;
  const testVoltage = value?.testVoltage || '1000V';

  const celsius = typeof temperatureF === 'number' ? convertFahrenheitToCelsius(temperatureF) : undefined;
  const tcf = typeof celsius === 'number' ? getTCF(celsius) : undefined;

  const set = (idx: number, updates: Partial<Row>) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, ...updates } : r));
    onChange({ testVoltage, rows: next });
  };

  const onArrow = (e: React.KeyboardEvent<HTMLInputElement>, r: number, c: number, corrected = false) => {
    const key = e.key;
    if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key)) return;
    e.preventDefault();
    const delta = key === 'ArrowLeft' ? [0,-1] : key === 'ArrowRight' ? [0,1] : key === 'ArrowUp' ? [-1,0] : [1,0];
    const cols = corrected ? 4 : 4;
    const nr = Math.max(0, Math.min(rows.length - 1, r + delta[0]));
    const nc = Math.max(0, Math.min(cols - 1, c + delta[1]));
    const sel = document.querySelector<HTMLElement>(`[data-ci-pos="${corrected ? 'c' : 'r'}-${nr}-${nc}"]`);
    sel?.focus();
  };

  const handleReading = (idx: number, field: 'p1'|'p2'|'p3', cf: 'p1c'|'p2c'|'p3c') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (typeof tcf === 'number') {
      const corrected = applyTCF(val, tcf);
      set(idx, { [field]: val, [cf]: corrected } as any);
    } else {
      set(idx, { [field]: val } as any);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="overflow-x-auto">
        <h3 className="text-md font-semibold mb-2">Insulation Resistance</h3>
        <div className="mb-2">
          <label className="form-label mr-2">Test Voltage:</label>
          <select value={testVoltage} onChange={(e)=>onChange({ testVoltage: e.target.value, rows })} className="form-select inline-block w-auto">
            {TEST_VOLTAGES.map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>
        <table className="min-w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-2 py-2 border">Test Voltage</th>
              <th className="px-2 py-2 border" />
              <th className="px-2 py-2 border">P1 MΩ Reading</th>
              <th className="px-2 py-2 border">P2 MΩ Reading</th>
              <th className="px-2 py-2 border">P3 MΩ Reading</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={r.id}>
                <td className="border px-2 py-1">{r.id}</td>
                <td className="border px-2 py-1 text-center">{r.state}</td>
                <td className="border px-2 py-1"><input data-ci-pos={`r-${idx}-1`} value={r.p1 || ''} onChange={handleReading(idx,'p1','p1c')} onKeyDown={(e)=>onArrow(e,idx,1)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
                <td className="border px-2 py-1"><input data-ci-pos={`r-${idx}-2`} value={r.p2 || ''} onChange={handleReading(idx,'p2','p2c')} onKeyDown={(e)=>onArrow(e,idx,2)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
                <td className="border px-2 py-1"><input data-ci-pos={`r-${idx}-3`} value={r.p3 || ''} onChange={handleReading(idx,'p3','p3c')} onKeyDown={(e)=>onArrow(e,idx,3)} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <h3 className="text-md font-semibold mb-2">Temperature Corrected</h3>
        <div className="mb-2">
          <label className="form-label mr-2">Test Voltage:</label>
          <input value={testVoltage} readOnly className="form-input inline-block w-auto bg-gray-100" />
        </div>
        <table className="min-w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-2 py-2 border">Test Voltage</th>
              <th className="px-2 py-2 border" />
              <th className="px-2 py-2 border">P1 MΩ Reading</th>
              <th className="px-2 py-2 border">P2 MΩ Reading</th>
              <th className="px-2 py-2 border">P3 MΩ Reading</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={`c-${r.id}`}>
                <td className="border px-2 py-1">{r.id}</td>
                <td className="border px-2 py-1 text-center">{r.state}</td>
                <td className="border px-2 py-1"><input data-ci-pos={`c-${idx}-1`} value={r.p1c || ''} onKeyDown={(e)=>onArrow(e,idx,1,true)} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
                <td className="border px-2 py-1"><input data-ci-pos={`c-${idx}-2`} value={r.p2c || ''} onKeyDown={(e)=>onArrow(e,idx,2,true)} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
                <td className="border px-2 py-1"><input data-ci-pos={`c-${idx}-3`} value={r.p3c || ''} onKeyDown={(e)=>onArrow(e,idx,3,true)} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


