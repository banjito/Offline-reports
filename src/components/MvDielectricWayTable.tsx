import React, { useMemo } from 'react';

type Units = 'mA' | 'µA';

export interface DielectricWayRow {
  way: 'S1-S2' | 'S1-T1' | 'S1-T2' | 'S1-T3';
  ag?: string;
  bg?: string;
  cg?: string;
  units?: Units;
}

export interface MvDielectricWayValue {
  testVoltage?: string; // e.g., 30 KVAC
  rows?: DielectricWayRow[];
}

interface Props {
  value?: MvDielectricWayValue;
  onChange: (next: MvDielectricWayValue) => void;
}

const DEFAULT_ROWS: DielectricWayRow[] = [
  { way: 'S1-S2', units: 'mA' },
  { way: 'S1-T1', units: 'mA' },
  { way: 'S1-T2', units: 'mA' },
  { way: 'S1-T3', units: 'mA' },
];

export const MvDielectricWayTable: React.FC<Props> = ({ value, onChange }) => {
  const v = useMemo<MvDielectricWayValue>(() => ({
    testVoltage: value?.testVoltage ?? '30 KVAC',
    rows: value?.rows && value.rows.length ? value.rows : DEFAULT_ROWS,
  }), [value]);

  const set = (updates: Partial<MvDielectricWayValue>) => onChange({ ...v, ...updates });

  const updateRow = (index: number, updates: Partial<DielectricWayRow>) => {
    const rows = [...(v.rows || [])];
    rows[index] = { ...rows[index], ...updates };
    set({ rows });
  };

  return (
    <div className="mb-2">
      <div className="flex items-center mb-2">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">DIELECTRIC WITHSTAND TEST VOLTAGE:</span>
        <input
          type="text"
          value={v.testVoltage}
          onChange={(e)=>set({ testVoltage: e.target.value })}
          className="w-24 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600" style={{ tableLayout: 'fixed' }}>
          <colgroup>
            <col style={{ width: '90px' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '60px' }} />
          </colgroup>
          <thead>
            <tr>
              <th className="border px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">WAY SECTION</th>
              <th className="border px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">A-G</th>
              <th className="border px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">B-G</th>
              <th className="border px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">C-G</th>
              <th className="border px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">UNITS</th>
            </tr>
          </thead>
          <tbody>
            {v.rows!.map((row, idx) => (
              <tr key={row.way}>
                <td className="border px-1 py-1 text-center text-xs font-medium">{row.way}</td>
                <td className="border px-1 py-1">
                  <input defaultValue={row.ag || ''} onBlur={(e)=>updateRow(idx,{ ag: e.target.value })} className="w-full h-6 text-center border-none bg-transparent focus:outline-none text-sm" />
                </td>
                <td className="border px-1 py-1">
                  <input defaultValue={row.bg || ''} onBlur={(e)=>updateRow(idx,{ bg: e.target.value })} className="w-full h-6 text-center border-none bg-transparent focus:outline-none text-sm" />
                </td>
                <td className="border px-1 py-1">
                  <input defaultValue={row.cg || ''} onBlur={(e)=>updateRow(idx,{ cg: e.target.value })} className="w-full h-6 text-center border-none bg-transparent focus:outline-none text-sm" />
                </td>
                <td className="border px-1 py-1 text-center">
                  <select defaultValue={row.units || 'mA'} onBlur={(e)=>updateRow(idx,{ units: e.target.value as Units })} className="w-full h-6 text-center border-none bg-transparent focus:outline-none text-sm">
                    <option value="mA">mA</option>
                    <option value="µA">µA</option>
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


