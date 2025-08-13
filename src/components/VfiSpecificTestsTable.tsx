import React, { useMemo } from 'react';

type Units = 'mA' | 'µA';

export interface VfiRow {
  vfi?: string;
  serialNumber?: string;
  asFound?: string;
  asLeft?: string;
  a?: string;
  b?: string;
  c?: string;
  units?: Units;
}

export interface VfiSpecificValue {
  rows?: VfiRow[];
}

interface Props {
  value?: VfiSpecificValue;
  onChange: (next: VfiSpecificValue) => void;
}

const ensure = (v?: VfiSpecificValue): Required<VfiSpecificValue> => ({
  rows: v?.rows && Array.isArray(v.rows) && v.rows.length > 0
    ? v.rows
    : [{ vfi: '', serialNumber: '', asFound: '', asLeft: '', a: '', b: '', c: '', units: 'mA' }]
});

export const VfiSpecificTestsTable: React.FC<Props> = ({ value, onChange }) => {
  const v = useMemo(() => ensure(value), [value]);

  const updateRow = (index: number, updates: Partial<VfiRow>) => {
    const rows = [...v.rows];
    rows[index] = { ...rows[index], ...updates };
    onChange({ rows });
  };

  const addRow = () => {
    const rows = [...v.rows, { vfi: '', serialNumber: '', asFound: '', asLeft: '', a: '', b: '', c: '', units: 'mA' }];
    onChange({ rows });
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-600" style={{ tableLayout: 'fixed' }}>
        <colgroup>
          <col style={{ width: '80px' }} />
          <col style={{ width: '120px' }} />
          <col style={{ width: '90px' }} />
          <col style={{ width: '90px' }} />
          <col style={{ width: '80px' }} />
          <col style={{ width: '80px' }} />
          <col style={{ width: '80px' }} />
          <col style={{ width: '60px' }} />
        </colgroup>
        <thead>
          <tr>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700"></th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700"></th>
            <th colSpan={2} className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">Counter</th>
            <th colSpan={3} className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">Vacuum Integrity (VFI Open)</th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700"></th>
          </tr>
          <tr>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">VFI</th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">Serial Number</th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">As-Found</th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">As-Left</th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">A</th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">B</th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">C</th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">Units</th>
          </tr>
          <tr>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700"></th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700"></th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700"></th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700"></th>
            <th colSpan={3} className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700">Test Voltage: 30 KVAC</th>
            <th className="border border-gray-300 dark:border-gray-600 px-2 py-1 text-center text-sm font-medium bg-gray-100 dark:bg-gray-700"></th>
          </tr>
        </thead>
        <tbody>
          {v.rows.map((row, idx) => (
            <tr key={idx}>
              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1">
                <input defaultValue={row.vfi} onBlur={(e)=>updateRow(idx,{ vfi: e.target.value })} className="w-full h-6 text-center border-none bg-transparent focus:outline-none text-sm" />
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1">
                <input defaultValue={row.serialNumber} onBlur={(e)=>updateRow(idx,{ serialNumber: e.target.value })} className="w-full h-6 text-center border-none bg-transparent focus:outline-none text-sm" />
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1">
                <input defaultValue={row.asFound} onBlur={(e)=>updateRow(idx,{ asFound: e.target.value })} className="w-full h-6 text-center border-none bg-transparent focus:outline-none text-sm" />
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1">
                <input defaultValue={row.asLeft} onBlur={(e)=>updateRow(idx,{ asLeft: e.target.value })} className="w-full h-6 text-center border-none bg-transparent focus:outline-none text-sm" />
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1">
                <input defaultValue={row.a} onBlur={(e)=>updateRow(idx,{ a: e.target.value })} className="w-full h-6 text-center border-none bg-transparent focus:outline-none text-sm" />
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1">
                <input defaultValue={row.b} onBlur={(e)=>updateRow(idx,{ b: e.target.value })} className="w-full h-6 text-center border-none bg-transparent focus:outline-none text-sm" />
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1">
                <input defaultValue={row.c} onBlur={(e)=>updateRow(idx,{ c: e.target.value })} className="w-full h-6 text-center border-none bg-transparent focus:outline-none text-sm" />
              </td>
              <td className="border border-gray-300 dark:border-gray-600 px-1 py-1 text-center">
                <select defaultValue={row.units || 'mA'} onBlur={(e)=>updateRow(idx,{ units: e.target.value as Units })} className="w-full h-6 text-center border-none bg-transparent focus:outline-none text-sm">
                  <option value="mA">mA</option>
                  <option value="µA">µA</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={addRow} className="mt-2 px-3 py-1.5 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-md">
        Add VFI Test Entry
      </button>
    </div>
  );
};


