import React from 'react';
import { convertFahrenheitToCelsius, getTCF, applyTCF } from '../lib/tcf';

interface Value {
  testVoltage?: string;
  windingToGround?: {
    aPhase?: string;
    bPhase?: string;
    cPhase?: string;
    units?: string;
  };
  corrected?: {
    aPhase?: string;
    bPhase?: string;
    cPhase?: string;
  };
}

interface Props {
  value?: Value;
  onChange: (next: Value) => void;
  temperatureF?: number;
}

const TEST_VOLTAGES = ['250V','500V','1000V','2500V','5000V'];
const UNITS = ['kΩ','MΩ','GΩ'];

export const ReactorInsulationTables: React.FC<Props> = ({ value, onChange, temperatureF }) => {
  const v: Value = value || { testVoltage: '1000V', windingToGround: { units: 'MΩ' } };
  const wtg = v.windingToGround || { units: 'MΩ' };

  const celsius = typeof temperatureF === 'number' ? convertFahrenheitToCelsius(temperatureF) : undefined;
  const tcf = typeof celsius === 'number' ? getTCF(celsius) : undefined;

  const setWtg = (updates: Partial<NonNullable<Value['windingToGround']>>) => {
    const next = { ...v, windingToGround: { ...wtg, ...updates } };
    if (typeof tcf === 'number') {
      next.corrected = {
        aPhase: applyTCF(next.windingToGround?.aPhase || '', tcf),
        bPhase: applyTCF(next.windingToGround?.bPhase || '', tcf),
        cPhase: applyTCF(next.windingToGround?.cPhase || '', tcf),
      };
    }
    onChange(next);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="overflow-x-auto">
        <h3 className="text-md font-semibold mb-2">Insulation Resistance Values</h3>
        <div className="mb-2">
          <label className="form-label mr-2">Test Voltage:</label>
          <select value={v.testVoltage || '1000V'} onChange={(e)=>onChange({ ...v, testVoltage: e.target.value })} className="form-select inline-block w-auto">
            {TEST_VOLTAGES.map(x => <option key={x} value={x}>{x}</option>)}
          </select>
        </div>
        <table className="min-w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-2 py-2 border">Winding to Ground</th>
              <th className="px-2 py-2 border">A-Phase</th>
              <th className="px-2 py-2 border">B-Phase</th>
              <th className="px-2 py-2 border">C-Phase</th>
              <th className="px-2 py-2 border">Units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Reading</td>
              <td className="border px-2 py-1"><input value={wtg.aPhase || ''} onChange={(e)=>setWtg({ aPhase: e.target.value })} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
              <td className="border px-2 py-1"><input value={wtg.bPhase || ''} onChange={(e)=>setWtg({ bPhase: e.target.value })} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
              <td className="border px-2 py-1"><input value={wtg.cPhase || ''} onChange={(e)=>setWtg({ cPhase: e.target.value })} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
              <td className="border px-2 py-1">
                <select value={wtg.units || 'MΩ'} onChange={(e)=>setWtg({ units: e.target.value })} className="h-7 text-xs border rounded bg-white">
                  {UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="overflow-x-auto">
        <h3 className="text-md font-semibold mb-2">Temperature Corrected Values</h3>
        <div className="mb-2">
          <label className="form-label mr-2">Test Voltage:</label>
          <input value={v.testVoltage || '1000V'} readOnly className="form-input inline-block w-auto bg-gray-100" />
        </div>
        <table className="min-w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-2 py-2 border">Winding to Ground</th>
              <th className="px-2 py-2 border">A-Phase</th>
              <th className="px-2 py-2 border">B-Phase</th>
              <th className="px-2 py-2 border">C-Phase</th>
              <th className="px-2 py-2 border">Units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Reading</td>
              <td className="border px-2 py-1"><input value={v.corrected?.aPhase || ''} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
              <td className="border px-2 py-1"><input value={v.corrected?.bPhase || ''} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
              <td className="border px-2 py-1"><input value={v.corrected?.cPhase || ''} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
              <td className="border px-2 py-1"><input value={wtg.units || 'MΩ'} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


