import React, { useMemo } from 'react';
import { convertFahrenheitToCelsius, getTCF, applyTCF } from '../lib/tcf';

type Triple = {
  testVoltage?: string;
  unit?: string;
  r05?: string; // 0.5 min
  r1?: string;  // 1 min
  r10?: string; // 10 min
  c05?: string;
  c1?: string;
  c10?: string;
};

export interface DryTypeIrValue {
  primaryToGround?: Triple;
  secondaryToGround?: Triple;
  primaryToSecondary?: Triple;
}

interface Props {
  value?: DryTypeIrValue;
  onChange: (next: DryTypeIrValue) => void;
  temperatureF?: number;
}

const TEST_VOLTAGES = ['250V','500V','1000V','2500V','5000V','10000V'];
const UNITS = ['kΩ','MΩ','GΩ'];

const ensure = (v?: DryTypeIrValue): Required<DryTypeIrValue> => ({
  primaryToGround: { testVoltage: '5000V', unit: 'MΩ', ...(v?.primaryToGround || {}) },
  secondaryToGround: { testVoltage: '1000V', unit: 'MΩ', ...(v?.secondaryToGround || {}) },
  primaryToSecondary: { testVoltage: '5000V', unit: 'MΩ', ...(v?.primaryToSecondary || {}) },
});

export const DryTypeIRTables: React.FC<Props> = ({ value, onChange, temperatureF }) => {
  const v = ensure(value);
  const celsius = useMemo(() => (typeof temperatureF === 'number' ? convertFahrenheitToCelsius(temperatureF) : undefined), [temperatureF]);
  const tcf = useMemo(() => (typeof celsius === 'number' ? getTCF(celsius) : undefined), [celsius]);

  const set = (key: keyof DryTypeIrValue, updates: Partial<Triple>) => {
    onChange({ ...v, [key]: { ...(v[key] as Triple), ...updates } });
  };

  const handle = (key: keyof DryTypeIrValue, field: keyof Triple) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    set(key, { [field]: val } as any);
  };

  const DA = (t: Triple) => {
    const a = parseFloat(t.r1 || '');
    const b = parseFloat(t.r05 || '');
    if (!isFinite(a) || !isFinite(b) || b === 0) return '';
    return (a / b).toFixed(2);
  };
  const PI = (t: Triple) => {
    const a = parseFloat(t.r10 || '');
    const b = parseFloat(t.r1 || '');
    if (!isFinite(a) || !isFinite(b) || b === 0) return '';
    return (a / b).toFixed(2);
  };
  const acceptable = (x: string) => {
    const n = parseFloat(x);
    return isFinite(n) && n > 1 ? 'Yes' : 'No';
  };

  const rows: Array<{ key: keyof DryTypeIrValue; label: string }> = [
    { key: 'primaryToGround', label: 'Primary to Ground' },
    { key: 'secondaryToGround', label: 'Secondary to Ground' },
    { key: 'primaryToSecondary', label: 'Primary to Secondary' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-6">
        <div className="overflow-x-auto flex-1 min-w-[420px]">
          <table className="min-w-full border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th colSpan={6} className="px-2 py-2 border text-center">Insulation Resistance Values</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="px-2 py-2 border text-left">Winding Under Test</th>
                <th className="px-2 py-2 border text-center">Test Voltage</th>
                <th className="px-2 py-2 border text-center">0.5 Min.</th>
                <th className="px-2 py-2 border text-center">1 Min.</th>
                <th className="px-2 py-2 border text-center">10 Min.</th>
                <th className="px-2 py-2 border text-center">Units</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ key, label }) => {
                const t = v[key] as Triple;
                return (
                  <tr key={key as string}>
                    <td className="border px-2 py-1">{label}</td>
                    <td className="border px-2 py-1">
                      <select value={t.testVoltage || ''} onChange={(e)=>set(key,{ testVoltage: e.target.value })} className="h-7 text-xs border rounded bg-white w-full">
                        {TEST_VOLTAGES.map(x=> <option key={x} value={x}>{x}</option>)}
                      </select>
                    </td>
                    <td className="border px-2 py-1"><input value={t.r05 || ''} onChange={handle(key,'r05')} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
                    <td className="border px-2 py-1"><input value={t.r1 || ''} onChange={handle(key,'r1')} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
                    <td className="border px-2 py-1"><input value={t.r10 || ''} onChange={handle(key,'r10')} className="w-full h-7 border-none bg-transparent focus:outline-none text-center" /></td>
                    <td className="border px-2 py-1">
                      <select value={t.unit || 'MΩ'} onChange={(e)=>set(key,{ unit: e.target.value })} className="h-7 text-xs border rounded bg-white w-full">
                        {UNITS.map(u=> <option key={u} value={u}>{u}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="overflow-x-auto flex-1 min-w-[320px]">
          <table className="min-w-full border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th colSpan={4} className="px-2 py-2 border text-center">Temperature Corrected Values</th>
              </tr>
              <tr className="bg-gray-50">
                <th className="px-2 py-2 border text-center">0.5 Min.</th>
                <th className="px-2 py-2 border text-center">1 Min.</th>
                <th className="px-2 py-2 border text-center">10 Min.</th>
                <th className="px-2 py-2 border text-center">Units</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ key }) => {
                const t = v[key] as Triple;
                const unit = t.unit || 'MΩ';
                return (
                  <tr key={`c-${key as string}`}>
                    <td className="border px-2 py-1"><input value={(typeof tcf==='number')? applyTCF(t.r05 || '', tcf) : ''} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
                    <td className="border px-2 py-1"><input value={(typeof tcf==='number')? applyTCF(t.r1 || '', tcf) : ''} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
                    <td className="border px-2 py-1"><input value={(typeof tcf==='number')? applyTCF(t.r10 || '', tcf) : ''} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
                    <td className="border px-2 py-1"><input value={unit} readOnly className="w-full h-7 border-none bg-gray-100 text-center" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="overflow-x-auto mt-2">
        <table className="min-w-full border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-2 py-2 border"></th>
              <th className="px-2 py-2 border text-center">Primary</th>
              <th className="px-2 py-2 border text-center">Secondary</th>
              <th className="px-2 py-2 border text-center">Primary to Secondary</th>
              <th className="px-2 py-2 border text-center">Acceptable</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Dielectric Absorption : (Ratio of 1 Minute to 0.5 Minute Result)</td>
              <td className="border px-2 py-1 text-center"><input value={DA(v.primaryToGround)} readOnly className="w-full h-7 border-none bg-gray-100 text-center"/></td>
              <td className="border px-2 py-1 text-center"><input value={DA(v.secondaryToGround)} readOnly className="w-full h-7 border-none bg-gray-100 text-center"/></td>
              <td className="border px-2 py-1 text-center"><input value={DA(v.primaryToSecondary)} readOnly className="w-full h-7 border-none bg-gray-100 text-center"/></td>
              <td className="border px-2 py-1 text-center"><input value={acceptable(DA(v.primaryToGround))} readOnly className="w-full h-7 border-none bg-gray-100 text-center"/></td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Polarization index : (Ratio of 10 Minute to 1 Minute Result)</td>
              <td className="border px-2 py-1 text-center"><input value={PI(v.primaryToGround)} readOnly className="w-full h-7 border-none bg-gray-100 text-center"/></td>
              <td className="border px-2 py-1 text-center"><input value={PI(v.secondaryToGround)} readOnly className="w-full h-7 border-none bg-gray-100 text-center"/></td>
              <td className="border px-2 py-1 text-center"><input value={PI(v.primaryToSecondary)} readOnly className="w-full h-7 border-none bg-gray-100 text-center"/></td>
              <td className="border px-2 py-1 text-center"><input value={acceptable(PI(v.primaryToGround))} readOnly className="w-full h-7 border-none bg-gray-100 text-center"/></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


