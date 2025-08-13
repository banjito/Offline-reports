import React from 'react';
import { applyTCF, convertFahrenheitToCelsius, getTCF } from '../lib/tcf';

interface Row {
  id: string; // identifier like 'Primary to Ground'
  testVoltage?: string;
  results?: string;
  units?: string; // default MΩ
  corrected?: string; // read-only
}

interface Value {
  rows?: Row[];
}

interface Props {
  value?: Value;
  onChange: (next: Value) => void;
  temperatureF?: number;
}

const TEST_VOLTAGES = ['Select One', '250V', '500V', '1000V', '2500V', '5000V'];
const UNITS = ['kΩ', 'MΩ', 'GΩ'];

const DEFAULT_ROWS: Row[] = [
  { id: 'Primary to Ground', units: 'MΩ' },
  { id: 'Secondary to Ground', units: 'MΩ' },
  { id: 'Primary to Secondary', units: 'MΩ' },
];

export const TransformerInsulationTable: React.FC<Props> = ({ value, onChange, temperatureF }) => {
  const rows = value?.rows?.length ? value!.rows! : DEFAULT_ROWS;

  const celsius = typeof temperatureF === 'number' ? convertFahrenheitToCelsius(temperatureF) : undefined;
  const tcf = typeof celsius === 'number' ? getTCF(celsius) : undefined;

  const setRow = (idx: number, updates: Partial<Row>) => {
    const next = rows.map((r, i) => (i === idx ? { ...r, ...updates } : r));
    onChange({ rows: next });
  };

  const onArrow = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>, r: number, c: number) => {
    const key = e.key;
    if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(key)) return;
    e.preventDefault();
    const delta = key === 'ArrowLeft' ? [0,-1] : key === 'ArrowRight' ? [0,1] : key === 'ArrowUp' ? [-1,0] : [1,0];
    const nr = Math.max(0, Math.min(rows.length - 1, r + delta[0]));
    const nc = Math.max(0, Math.min(2, c + delta[1]));
    const sel = document.querySelector<HTMLElement>(`[data-tri-pos="${nr}-${nc}"]`);
    sel?.focus();
  };

  const handleResult = (idx: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (typeof tcf === 'number') {
      const corrected = applyTCF(val, tcf);
      setRow(idx, { results: val, corrected });
    } else {
      setRow(idx, { results: val });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="overflow-x-auto">
        <h3 className="text-lg font-medium mb-2 text-gray-800">Insulation Resistance</h3>
        <table className="min-w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-2 py-2 border text-left">Winding Tested</th>
              <th className="px-2 py-2 border text-left">Test Voltage</th>
              <th className="px-2 py-2 border text-left">Results</th>
              <th className="px-2 py-2 border text-left">Units</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx) => (
              <tr key={r.id}>
                <td className="border px-2 py-1 whitespace-nowrap">{r.id}</td>
                <td className="border px-2 py-1">
                  <select
                    data-tri-pos={`${idx}-0`}
                    value={r.testVoltage || ''}
                    onChange={(e) => setRow(idx, { testVoltage: e.target.value })}
                    onKeyDown={(e) => onArrow(e, idx, 0)}
                    className="h-7 text-xs border rounded bg-white"
                  >
                    {TEST_VOLTAGES.map((v) => (
                      <option key={v} value={v}>{v}</option>
                    ))}
                  </select>
                </td>
                <td className="border px-2 py-1">
                  <input
                    data-tri-pos={`${idx}-1`}
                    value={r.results || ''}
                    onChange={handleResult(idx)}
                    onKeyDown={(e) => onArrow(e, idx, 1)}
                    className="w-full h-7 border-none bg-transparent focus:outline-none"
                  />
                </td>
                <td className="border px-2 py-1">
                  <select
                    data-tri-pos={`${idx}-2`}
                    value={r.units || 'MΩ'}
                    onChange={(e) => setRow(idx, { units: e.target.value })}
                    onKeyDown={(e) => onArrow(e, idx, 2)}
                    className="h-7 text-xs border rounded bg-white"
                  >
                    {UNITS.map((u) => (
                      <option key={u} value={u}>{u}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <h3 className="text-lg font-medium mb-2 text-gray-800">Temperature Corrected</h3>
        <table className="min-w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-2 py-2 border text-left">Winding Tested</th>
              <th className="px-2 py-2 border text-left">Test Voltage</th>
              <th className="px-2 py-2 border text-left">Results</th>
              <th className="px-2 py-2 border text-left">Units</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`c-${r.id}`}>
                <td className="border px-2 py-1 whitespace-nowrap">{r.id}</td>
                <td className="border px-2 py-1">
                  <input readOnly value={r.testVoltage || ''} className="w-full h-7 border-none bg-gray-100" />
                </td>
                <td className="border px-2 py-1">
                  <input readOnly value={(typeof tcf === 'number') ? applyTCF(r.results || '', tcf) : (r.corrected || '')} className="w-full h-7 border-none bg-gray-100" />
                </td>
                <td className="border px-2 py-1">
                  <input readOnly value={r.units || 'MΩ'} className="w-full h-7 border-none bg-gray-100" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


