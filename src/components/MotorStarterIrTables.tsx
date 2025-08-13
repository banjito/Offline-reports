import React, { useMemo } from 'react';
import { convertFahrenheitToCelsius, getTCF, applyTCF } from '../lib/tcf';

type Trio = { p1?: string; p2?: string; p3?: string };

export interface MotorStarterIrValue {
  testVoltage?: string; // e.g., 1000V
  poleToPole?: Trio;
  poleToFrame?: Trio;
  lineToLoad?: Trio;
}

interface Props {
  value?: MotorStarterIrValue;
  onChange: (next: MotorStarterIrValue) => void;
  temperatureF?: number;
}

const TEST_VOLTAGES = ['250V','500V','1000V','2500V','5000V'];

const ensure = (v?: MotorStarterIrValue): Required<MotorStarterIrValue> => ({
  testVoltage: v?.testVoltage || '1000V',
  poleToPole: v?.poleToPole || {},
  poleToFrame: v?.poleToFrame || {},
  lineToLoad: v?.lineToLoad || {},
});

export const MotorStarterIrTables: React.FC<Props> = ({ value, onChange, temperatureF }) => {
  const v = ensure(value);

  const tcf = useMemo(() => {
    const f = typeof temperatureF === 'number' ? temperatureF : (window as any).__REPORT_TEMP_F;
    if (typeof f !== 'number') return undefined;
    const c = convertFahrenheitToCelsius(f);
    return getTCF(c);
  }, [temperatureF, (window as any)?.__REPORT_TEMP_F]);

  const setMeta = (updates: Partial<MotorStarterIrValue>) => onChange({ ...v, ...updates });
  const setRow = (key: keyof MotorStarterIrValue, updates: Partial<Trio>) => {
    onChange({ ...v, [key]: { ...(v[key] as Trio), ...updates } as any });
  };

  const rows: Array<{ key: keyof MotorStarterIrValue; label: string }> = [
    { key: 'poleToPole', label: 'Pole to Pole' },
    { key: 'poleToFrame', label: 'Pole to Frame' },
    { key: 'lineToLoad', label: 'Line to Load' },
  ];

  const corrected = (x?: string) => (typeof tcf === 'number' ? applyTCF(x || '', tcf) : '');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Measured */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Insulation Resistance</h3>
          <div className="flex items-center gap-2 text-sm">
            <span>Test Voltage:</span>
            <select value={v.testVoltage} onChange={(e)=>setMeta({ testVoltage: e.target.value })} className="border rounded px-2 py-1 text-sm">
              {TEST_VOLTAGES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-2 py-2">Test Voltage</th>
                <th className="border px-2 py-2 text-center">P1 MΩ Reading</th>
                <th className="border px-2 py-2 text-center">P2 MΩ Reading</th>
                <th className="border px-2 py-2 text-center">P3 MΩ Reading</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ key, label }) => {
                const r = v[key] as Trio;
                return (
                  <tr key={key as string}>
                    <td className="border px-2 py-1">
                      <div className="flex items-center justify-between">
                        <span>{label}</span>
                      </div>
                    </td>
                    <td className="border px-2 py-1"><input className="w-full text-center border-0 focus:ring-0" value={r.p1 || ''} onChange={(e)=>setRow(key, { p1: e.target.value })} /></td>
                    <td className="border px-2 py-1"><input className="w-full text-center border-0 focus:ring-0" value={r.p2 || ''} onChange={(e)=>setRow(key, { p2: e.target.value })} /></td>
                    <td className="border px-2 py-1"><input className="w-full text-center border-0 focus:ring-0" value={r.p3 || ''} onChange={(e)=>setRow(key, { p3: e.target.value })} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Temperature Corrected */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">Temperature Corrected</h3>
          <div className="text-sm">Test Voltage: {v.testVoltage}</div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="border px-2 py-2">Test Voltage</th>
                <th className="border px-2 py-2 text-center">P1 MΩ Reading</th>
                <th className="border px-2 py-2 text-center">P2 MΩ Reading</th>
                <th className="border px-2 py-2 text-center">P3 MΩ Reading</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ key, label }) => {
                const r = v[key] as Trio;
                return (
                  <tr key={`c-${key as string}`}>
                    <td className="border px-2 py-1">{label}</td>
                    <td className="border px-2 py-1 text-center"><input readOnly className="w-full text-center border-0 bg-gray-100" value={corrected(r.p1)} /></td>
                    <td className="border px-2 py-1 text-center"><input readOnly className="w-full text-center border-0 bg-gray-100" value={corrected(r.p2)} /></td>
                    <td className="border px-2 py-1 text-center"><input readOnly className="w-full text-center border-0 bg-gray-100" value={corrected(r.p3)} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


