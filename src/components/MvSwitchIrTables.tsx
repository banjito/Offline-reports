import React, { useMemo } from 'react';
import { convertFahrenheitToCelsius, getTCF, applyTCF } from '../lib/tcf';

export interface MvSwitchIrRow {
  way: 'S1' | 'S2' | 'T1' | 'T2' | 'T3';
  ag?: string; bg?: string; cg?: string;
  ab?: string; bc?: string; ca?: string;
  a?: string; b?: string; c?: string;
  units?: 'kΩ' | 'MΩ' | 'GΩ';
}

export interface MvSwitchIrValue {
  testVoltage?: string;
  rows?: MvSwitchIrRow[];
}

interface Props {
  value?: MvSwitchIrValue;
  onChange: (next: MvSwitchIrValue) => void;
  temperatureF?: number;
}

const DEFAULT_ROWS: MvSwitchIrRow[] = [
  { way: 'S1', units: 'MΩ' },
  { way: 'S2', units: 'MΩ' },
  { way: 'T1', units: 'MΩ' },
  { way: 'T2', units: 'MΩ' },
  { way: 'T3', units: 'MΩ' },
];

const UNITS: Array<'kΩ'|'MΩ'|'GΩ'> = ['kΩ','MΩ','GΩ'];

export const MvSwitchIrTables: React.FC<Props> = ({ value, onChange, temperatureF }) => {
  const celsius = typeof temperatureF === 'number' ? convertFahrenheitToCelsius(temperatureF) : undefined;
  const tcf = typeof celsius === 'number' ? getTCF(celsius) : undefined;

  const v = useMemo<MvSwitchIrValue>(() => ({
    testVoltage: value?.testVoltage ?? '5000V',
    rows: value?.rows && value.rows.length ? value.rows : DEFAULT_ROWS,
  }), [value]);

  const set = (updates: Partial<MvSwitchIrValue>) => onChange({ ...v, ...updates });

  const updateRow = (index: number, updates: Partial<MvSwitchIrRow>) => {
    const rows = [...(v.rows || [])];
    rows[index] = { ...rows[index], ...updates };
    set({ rows });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center mb-2">
          <span className="text-sm font-medium text-gray-700 mr-2">INSULATION RESISTANCE TEST VOLTAGE:</span>
          <input
            type="text"
            value={v.testVoltage}
            onChange={(e)=>set({ testVoltage: e.target.value })}
            className="w-24 border border-gray-300 rounded px-2 py-1 text-sm"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '80px' }} />
              {Array.from({ length: 9 }).map((_,i)=>(<col key={i} style={{ width: 'auto' }} />))}
              <col style={{ width: '60px' }} />
            </colgroup>
            <thead>
              <tr>
                <th className="border px-2 py-1 bg-gray-100 text-xs">WAY SECTION</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">A-G</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">B-G</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">C-G</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">A-B</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">B-C</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">C-A</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">A</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">B</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">C</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">UNITS</th>
              </tr>
            </thead>
            <tbody>
              {v.rows!.map((row, idx) => (
                <tr key={row.way}>
                  <td className="border px-1 py-1 text-center text-xs font-medium">{row.way}</td>
                  {(['ag','bg','cg','ab','bc','ca','a','b','c'] as const).map((key) => (
                    <td key={key} className="border px-1 py-1">
                      <input defaultValue={row[key] || ''} onBlur={(e)=>updateRow(idx,{ [key]: e.target.value } as any)} className="w-full h-6 text-center border-none bg-transparent focus:outline-none text-sm" />
                    </td>
                  ))}
                  <td className="border px-1 py-1 text-center">
                    <select defaultValue={row.units || 'MΩ'} onBlur={(e)=>updateRow(idx,{ units: e.target.value as any })} className="w-full h-6 text-center border-none bg-transparent text-sm">
                      {UNITS.map(u => (<option key={u} value={u}>{u}</option>))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300" style={{ tableLayout: 'fixed' }}>
            <colgroup>
              <col style={{ width: '80px' }} />
              {Array.from({ length: 9 }).map((_,i)=>(<col key={i} style={{ width: 'auto' }} />))}
              <col style={{ width: '60px' }} />
            </colgroup>
            <thead>
              <tr>
                <th className="border px-2 py-1 bg-gray-100 text-xs">WAY SECTION</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">A-G</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">B-G</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">C-G</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">A-B</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">B-C</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">C-A</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">A</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">B</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">C</th>
                <th className="border px-2 py-1 bg-gray-100 text-xs">UNITS</th>
              </tr>
            </thead>
            <tbody>
              {v.rows!.map((row) => (
                <tr key={`c-${row.way}`}>
                  <td className="border px-1 py-1 text-center text-xs font-medium">{row.way}</td>
                  {(['ag','bg','cg','ab','bc','ca','a','b','c'] as const).map((key) => (
                    <td key={key} className="border px-1 py-1 text-center text-sm">
                      {(typeof tcf === 'number' && row[key]) ? applyTCF(row[key]!, tcf) : (row[key] || '')}
                    </td>
                  ))}
                  <td className="border px-1 py-1 text-center text-sm">{row.units || 'MΩ'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


