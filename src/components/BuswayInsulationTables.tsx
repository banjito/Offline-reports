import React, { useMemo } from 'react';
import { convertFahrenheitToCelsius, getTCF, applyTCF } from '../lib/tcf';

type Units = 'kΩ' | 'MΩ' | 'GΩ';

export interface BuswayIrValue {
  testVoltage?: string; // 250V, 500V, 1000V, 2500V, 5000V
  units?: Units;
  readings?: Record<string, string>; // keys: A-B, B-C, ... N-G
}

interface Props {
  value?: BuswayIrValue;
  onChange: (next: BuswayIrValue) => void;
  temperatureF?: number;
}

const TEST_VOLTAGES = ['250V', '500V', '1000V', '2500V', '5000V'];
const UNITS: Units[] = ['kΩ','MΩ','GΩ'];
const PAIRS = ['A-B','B-C','C-A','A-N','B-N','C-N','A-G','B-G','C-G','N-G'];

export const BuswayInsulationTables: React.FC<Props> = ({ value, onChange, temperatureF }) => {
  const v = useMemo<Required<BuswayIrValue>>(() => ({
    testVoltage: value?.testVoltage ?? '500V',
    units: (value?.units as Units) ?? 'MΩ',
    readings: value?.readings ?? {},
  }), [value]);

  const set = (u: Partial<BuswayIrValue>) => onChange({ ...v, ...u });

  const celsius = typeof temperatureF === 'number' ? convertFahrenheitToCelsius(temperatureF) : undefined;
  const tcf = typeof celsius === 'number' ? getTCF(celsius) : undefined;

  const setReading = (key: string, raw: string) => {
    const readings = { ...(v.readings || {}) };
    readings[key] = raw;
    set({ readings });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Test Voltage:</span>
          <select
            value={v.testVoltage}
            onChange={(e)=>set({ testVoltage: e.target.value })}
            className="h-8 rounded border border-gray-300 px-2 text-sm"
          >
            {TEST_VOLTAGES.map(tv => (<option key={tv} value={tv}>{tv}</option>))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Units:</span>
          <select
            value={v.units}
            onChange={(e)=>set({ units: e.target.value as Units })}
            className="h-8 rounded border border-gray-300 px-2 text-sm"
          >
            {UNITS.map(u => (<option key={u} value={u}>{u}</option>))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              {PAIRS.map(p => (<th key={p} className="border px-2 py-1 bg-gray-50 text-xs">{p}</th>))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {PAIRS.map(p => (
                <td key={p} className="border px-1 py-1">
                  <input
                    defaultValue={v.readings[p] || ''}
                    onBlur={(e)=>setReading(p, e.target.value)}
                    className="w-full h-7 border-none bg-transparent text-center text-sm focus:outline-none"
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300" style={{ tableLayout: 'fixed' }}>
          <thead>
            <tr>
              {PAIRS.map(p => (<th key={`c-${p}`} className="border px-2 py-1 bg-gray-50 text-xs">{p}</th>))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {PAIRS.map(p => (
                <td key={`c-${p}`} className="border px-1 py-1 text-center text-sm">
                  {typeof tcf === 'number' && v.readings[p] ? applyTCF(v.readings[p], tcf) : ''}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


