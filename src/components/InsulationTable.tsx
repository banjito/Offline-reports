import React from 'react';
import { convertFahrenheitToCelsius, getTCF, applyTCF } from '../lib/tcf';

const VOLTAGE_OPTS = ['250V', '500V', '1000V', '2500V', '5000V'];
const UNIT_OPTS = ['kΩ', 'MΩ', 'GΩ'];

export interface InsulationValue {
  testVoltage?: string;
  units?: string;
  readingPhase1?: string;
  readingPhase2?: string;
  readingPhase3?: string;
  readingNeutral?: string;
  tempCorrection20CPhase1?: string;
  tempCorrection20CPhase2?: string;
  tempCorrection20CPhase3?: string;
  tempCorrection20CNeutral?: string;
}

interface Props {
  label: string;
  value: InsulationValue;
  onChange: (next: InsulationValue) => void;
  temperatureF?: number;
}

export const InsulationTable: React.FC<Props> = ({ label, value, onChange, temperatureF }) => {
  const celsius = typeof temperatureF === 'number' ? convertFahrenheitToCelsius(temperatureF) : undefined;
  const tcf = typeof celsius === 'number' ? getTCF(celsius) : undefined;

  const update = (patch: Partial<InsulationValue>) => onChange({ ...value, ...patch });

  const handleReading = (key: keyof InsulationValue, corrKey: keyof InsulationValue) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const corrected = tcf ? applyTCF(val, tcf) : '';
    update({ [key]: val, [corrKey]: corrected } as any);
  };

  const onKey = (e: React.KeyboardEvent<HTMLElement>, r: number, c: number) => {
    const key = e.key; if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Enter'].includes(key)) return; e.preventDefault();
    const cols = 6; // 0: voltage, 1..4 phases, 5 units
    const rows = 2; // reading row (0), correction row (1)
    let nr = r, nc = c;
    if (key === 'ArrowLeft') nc = Math.max(0, c - 1);
    if (key === 'ArrowRight' || key === 'Enter') nc = Math.min(cols - 1, c + 1);
    if (key === 'ArrowUp') nr = Math.max(0, r - 1);
    if (key === 'ArrowDown') nr = Math.min(rows - 1, r + 1);
    // skip to reading row for non-editable correction row
    if (nr === 1 && nc >= 1 && nc <= 4) nr = 0;
    const el = document.querySelector<HTMLElement>(`[data-ins-pos="${label}-${nr}-${nc}"]`);
    el?.focus();
  };

  return (
    <div className="mt-3 overflow-x-auto">
      <h3 className="text-lg font-medium mb-2 text-gray-800">{label}</h3>
      <table className="min-w-full border border-gray-300 text-xs">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-1 text-left border">Test Voltage</th>
            {['PHASE 1','PHASE 2','PHASE 3','NEUTRAL'].map(h => <th key={h} className="px-2 py-1 text-center border">{h}</th>)}
            <th className="px-2 py-1 text-left border">Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-1 py-1">
              <select data-ins-pos={`${label}-0-0`} value={value.testVoltage || '1000V'} onChange={(e)=>update({ testVoltage: e.target.value })} onKeyDown={(e)=>onKey(e,0,0)} className="h-6 text-xs border rounded bg-white">
                {VOLTAGE_OPTS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </td>
            <td className="border px-1 py-1 text-center"><input data-ins-pos={`${label}-0-1`} value={value.readingPhase1 || ''} onChange={handleReading('readingPhase1','tempCorrection20CPhase1')} onKeyDown={(e)=>onKey(e,0,1)} className="w-full h-6 text-center border-none bg-transparent focus:outline-none" /></td>
            <td className="border px-1 py-1 text-center"><input data-ins-pos={`${label}-0-2`} value={value.readingPhase2 || ''} onChange={handleReading('readingPhase2','tempCorrection20CPhase2')} onKeyDown={(e)=>onKey(e,0,2)} className="w-full h-6 text-center border-none bg-transparent focus:outline-none" /></td>
            <td className="border px-1 py-1 text-center"><input data-ins-pos={`${label}-0-3`} value={value.readingPhase3 || ''} onChange={handleReading('readingPhase3','tempCorrection20CPhase3')} onKeyDown={(e)=>onKey(e,0,3)} className="w-full h-6 text-center border-none bg-transparent focus:outline-none" /></td>
            <td className="border px-1 py-1 text-center"><input data-ins-pos={`${label}-0-4`} value={value.readingNeutral || ''} onChange={handleReading('readingNeutral','tempCorrection20CNeutral')} onKeyDown={(e)=>onKey(e,0,4)} className="w-full h-6 text-center border-none bg-transparent focus:outline-none" /></td>
            <td className="border px-1 py-1">
              <select data-ins-pos={`${label}-0-5`} value={value.units || 'MΩ'} onChange={(e)=>update({ units: e.target.value })} onKeyDown={(e)=>onKey(e,0,5)} className="h-6 text-xs border rounded bg-white">
                {UNIT_OPTS.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
            </td>
          </tr>
          <tr>
            <td className="border px-2 py-1 text-left">Temp. Correction 20°C</td>
            <td className="border px-1 py-1 text-center">{value.tempCorrection20CPhase1 || ''}</td>
            <td className="border px-1 py-1 text-center">{value.tempCorrection20CPhase2 || ''}</td>
            <td className="border px-1 py-1 text-center">{value.tempCorrection20CPhase3 || ''}</td>
            <td className="border px-1 py-1 text-center">{value.tempCorrection20CNeutral || ''}</td>
            <td className="border px-1 py-1 text-center">{value.units || 'MΩ'}</td>
          </tr>
        </tbody>
      </table>
      {typeof celsius === 'number' && (
        <div className="text-[10px] text-gray-500 mt-1">Temp: {Math.round(celsius)}°C • TCF: {tcf?.toFixed(2) || '1'}</div>
      )}
    </div>
  );
};


