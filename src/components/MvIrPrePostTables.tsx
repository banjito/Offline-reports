import React, { useMemo } from 'react';
import { convertFahrenheitToCelsius, getTCF, applyTCF } from '../lib/tcf';

export interface MvIrValue {
  testVoltage?: string; // in V
  unit?: string; // GΩ | MΩ | kΩ
  pre?: { ag?: string; bg?: string; cg?: string };
  post?: { ag?: string; bg?: string; cg?: string };
}

interface Props {
  value?: MvIrValue;
  onChange: (next: MvIrValue) => void;
  temperatureF?: number;
}

const VOLTS = ['500','1000','2500','5000','10000'];
const UNITS = ['GΩ','MΩ','kΩ'];

const ensure = (v?: MvIrValue): Required<MvIrValue> => ({
  testVoltage: v?.testVoltage || '1000',
  unit: v?.unit || 'GΩ',
  pre: v?.pre || {},
  post: v?.post || {}
});

export const MvIrPrePostTables: React.FC<Props> = ({ value, onChange, temperatureF }) => {
  const v = ensure(value);

  const tcf = useMemo(() => {
    const f = typeof temperatureF === 'number' ? temperatureF : (window as any).__REPORT_TEMP_F;
    if (typeof f !== 'number') return 1;
    const c = convertFahrenheitToCelsius(f);
    return getTCF(c);
  }, [temperatureF, (window as any)?.__REPORT_TEMP_F]);

  const set = (path: 'pre'|'post', key: 'ag'|'bg'|'cg', val: string) => {
    const next = ensure({ ...v });
    next[path] = { ...next[path], [key]: val };
    onChange(next);
  };

  const setMeta = (updates: Partial<MvIrValue>) => onChange({ ...v, ...updates });

  const corr = (x?: string) => applyTCF(x || '', tcf);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <label className="text-sm">Test Voltage:</label>
        <select className="border rounded p-1 text-sm w-28" value={v.testVoltage} onChange={(e)=>setMeta({ testVoltage: e.target.value })}>
          {VOLTS.map(z => (<option key={z} value={z}>{z} V</option>))}
        </select>
        <label className="text-sm ml-4">Units:</label>
        <select className="border rounded p-1 text-sm w-24" value={v.unit} onChange={(e)=>setMeta({ unit: e.target.value })}>
          {UNITS.map(z => (<option key={z} value={z}>{z}</option>))}
        </select>
        <span className="text-sm ml-4">TCF: {tcf.toFixed(3)}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-2" />
              <th className="border px-2 py-2">A-G</th>
              <th className="border px-2 py-2">B-G</th>
              <th className="border px-2 py-2">C-G</th>
              <th className="border px-2 py-2">A-G (TC)</th>
              <th className="border px-2 py-2">B-G (TC)</th>
              <th className="border px-2 py-2">C-G (TC)</th>
              <th className="border px-2 py-2">Units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-2 py-1">Pre-Test</td>
              <td className="border px-2 py-1"><input className="w-full text-center border-0 focus:ring-0" value={v.pre.ag || ''} onChange={(e)=>set('pre','ag', e.target.value)} /></td>
              <td className="border px-2 py-1"><input className="w-full text-center border-0 focus:ring-0" value={v.pre.bg || ''} onChange={(e)=>set('pre','bg', e.target.value)} /></td>
              <td className="border px-2 py-1"><input className="w-full text-center border-0 focus:ring-0" value={v.pre.cg || ''} onChange={(e)=>set('pre','cg', e.target.value)} /></td>
              <td className="border px-2 py-1 text-center">{corr(v.pre.ag)}</td>
              <td className="border px-2 py-1 text-center">{corr(v.pre.bg)}</td>
              <td className="border px-2 py-1 text-center">{corr(v.pre.cg)}</td>
              <td className="border px-2 py-1 text-center">{v.unit}</td>
            </tr>
            <tr>
              <td className="border px-2 py-1">Post-Test</td>
              <td className="border px-2 py-1"><input className="w-full text-center border-0 focus:ring-0" value={v.post.ag || ''} onChange={(e)=>set('post','ag', e.target.value)} /></td>
              <td className="border px-2 py-1"><input className="w-full text-center border-0 focus:ring-0" value={v.post.bg || ''} onChange={(e)=>set('post','bg', e.target.value)} /></td>
              <td className="border px-2 py-1"><input className="w-full text-center border-0 focus:ring-0" value={v.post.cg || ''} onChange={(e)=>set('post','cg', e.target.value)} /></td>
              <td className="border px-2 py-1 text-center">{corr(v.post.ag)}</td>
              <td className="border px-2 py-1 text-center">{corr(v.post.bg)}</td>
              <td className="border px-2 py-1 text-center">{corr(v.post.cg)}</td>
              <td className="border px-2 py-1 text-center">{v.unit}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};


