import React from 'react';

interface Value {
  testVoltage?: string;
  testDuration?: string; // default "1 Min."
  p1?: string;
  p2?: string;
  p3?: string;
  units?: string;
}

interface Props {
  value?: Value;
  onChange: (next: Value) => void;
}

const UNIT_OPTS = ['µA','mA'];

export const VacuumBottleIntegrityTable: React.FC<Props> = ({ value, onChange }) => {
  const v = value || { testDuration: '1 Min.' };
  const set = (updates: Partial<Value>) => onChange({ ...v, ...updates });

  return (
    <div className="flex gap-4">
      {/* Left Column - Test Parameters */}
      <div className="w-32 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Test Voltage</label>
          <input 
            type="text" 
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            value={v.testVoltage || ''}
            onChange={(e) => set({ testVoltage: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Test Duration</label>
          <input 
            type="text" 
            className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
            value={v.testDuration || '1 Min.'}
            onChange={(e) => set({ testDuration: e.target.value })}
          />
        </div>
      </div>

      {/* Right Column - Test Results Table */}
      <div className="flex-1">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th colSpan={4} className="border px-2 py-2 text-center">Vacuum Bottle Integrity (Breaker In Open Position)</th>
            </tr>
            <tr>
              <th className="border px-2 py-2">P1</th>
              <th className="border px-2 py-2">P2</th>
              <th className="border px-2 py-2">P3</th>
              <th className="border px-2 py-2">Units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1"><input className="w-full rounded-md border-gray-300 shadow-sm" value={v.p1 || ''} onChange={(e)=>set({ p1: e.target.value })} /></td>
              <td className="border px-2 py-1"><input className="w-full rounded-md border-gray-300 shadow-sm" value={v.p2 || ''} onChange={(e)=>set({ p2: e.target.value })} /></td>
              <td className="border px-2 py-1"><input className="w-full rounded-md border-gray-300 shadow-sm" value={v.p3 || ''} onChange={(e)=>set({ p3: e.target.value })} /></td>
              <td className="border px-2 py-1">
                <select className="w-full rounded-md border-gray-300 shadow-sm" value={v.units || 'µA'} onChange={(e)=>set({ units: e.target.value })}>
                  {UNIT_OPTS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


