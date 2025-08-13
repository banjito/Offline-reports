import React, { useMemo } from 'react';

interface PfRow {
  meas?: string; // ICH/ICHL/ICL/ICHL etc text
  testMode?: string; // GST / GSTg-A / UST-A
  freq?: string; // 60.00
  vOutKv?: string; // kV
  iOutmA?: string; // mA
  wattLossesMw?: string; // mW
  pfMeas?: string; // %
  capPf?: string; // pF
  assessment?: string;
}

export interface PowerFactorTestsValue {
  referenceVoltageKv?: string;
  windingTemperatureC?: string;
  primary?: PfRow[]; // 3 standard rows + cross check footer
  secondary?: PfRow[];
  primaryCross?: { vOutKv?: string; iOutmA?: string; wattLossesMw?: string; pfMeas?: string };
  secondaryCross?: { vOutKv?: string; iOutmA?: string; wattLossesMw?: string; pfMeas?: string };
}

interface Props {
  value?: PowerFactorTestsValue;
  onChange: (next: PowerFactorTestsValue) => void;
}

const defaultPrimary: PfRow[] = [
  { meas: 'ICH+ICHL', testMode: 'GST', freq: '60.00', vOutKv: '10.00' },
  { meas: 'ICH', testMode: 'GSTg-A', freq: '60.00', vOutKv: '10.00' },
  { meas: 'ICHL', testMode: 'UST-A', freq: '60.00', vOutKv: '10.00' },
];
const defaultSecondary: PfRow[] = [
  { meas: 'ICL+ICLH', testMode: 'GST', freq: '60.00', vOutKv: '0.10' },
  { meas: 'ICL', testMode: 'GSTg-A', freq: '60.00', vOutKv: '0.10' },
  { meas: 'ICLH', testMode: 'UST-A', freq: '60.00', vOutKv: '0.10' },
];

export const PowerFactorTestsTable: React.FC<Props> = ({ value, onChange }) => {
  const v = useMemo<PowerFactorTestsValue>(() => ({
    referenceVoltageKv: value?.referenceVoltageKv ?? '',
    windingTemperatureC: value?.windingTemperatureC ?? '',
    primary: value?.primary && value.primary.length ? value.primary : defaultPrimary,
    secondary: value?.secondary && value.secondary.length ? value.secondary : defaultSecondary,
    primaryCross: value?.primaryCross ?? {},
    secondaryCross: value?.secondaryCross ?? {},
  }), [value]);

  const set = (u: Partial<PowerFactorTestsValue>) => onChange({ ...v, ...u });

  const parseNum = (s?: string) => {
    const n = parseFloat(String(s ?? '').replace(/,/g, ''));
    return Number.isFinite(n) ? n : NaN;
  };

  const recalcPf = (row: PfRow): PfRow => {
    const w = parseNum(row.wattLossesMw);
    const v = parseNum(row.vOutKv);
    const i = parseNum(row.iOutmA);
    // PF% with input units mW, kV, mA → PF% = mW / (10 × kV × mA)
    const pfPercent = Number.isFinite(w) && Number.isFinite(v) && Number.isFinite(i) && v>0 && i>0 ? (w / (10 * v * i)) : NaN;
    return {
      ...row,
      pfMeas: Number.isFinite(pfPercent) ? `${pfPercent.toFixed(4)}%` : (row.pfMeas || ''),
      // capPf left as-entered (no formula)
      capPf: row.capPf,
    };
  };

  const setRow = (section: 'primary'|'secondary', idx: number, field: keyof PfRow, val: string) => {
    const rows = [...(v[section] as PfRow[])];
    let row = { ...(rows[idx] || {}) } as PfRow;
    (row as any)[field] = val;
    row = recalcPf(row);
    rows[idx] = row;
    set({ [section]: rows } as any);
  };

  const setCross = (section: 'primaryCross'|'secondaryCross', field: keyof NonNullable<PowerFactorTestsValue['primaryCross']>, val: string) => {
    const obj = { ...(v[section] as any) };
    (obj as any)[field] = val;
    // Only PF% auto; leave Cap/Assessment manual
    const w = parseNum(obj.wattLossesMw);
    const vk = parseNum(obj.vOutKv);
    const i = parseNum(obj.iOutmA);
    const pfPercent = Number.isFinite(w) && Number.isFinite(vk) && Number.isFinite(i) && vk>0 && i>0 ? (w/(10*vk*i)) : NaN;
    obj.pfMeas = Number.isFinite(pfPercent) ? pfPercent.toFixed(4) + '%' : obj.pfMeas;
    set({ [section]: obj } as any);
  };

  const Section = (props: { title: string; section: 'primary'|'secondary'; crossKey: 'primaryCross'|'secondaryCross' }) => (
    <div className="space-y-2">
      <div className="font-medium text-gray-800">{props.title}</div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead>
            <tr>
              <th className="border px-2 py-1">No.</th>
              <th className="border px-2 py-1">Meas.</th>
              <th className="border px-2 py-1">Test Mode</th>
              <th className="border px-2 py-1">Freq.</th>
              <th className="border px-2 py-1">V out (kV)</th>
              <th className="border px-2 py-1">*I out (mA)</th>
              <th className="border px-2 py-1">*Watt Losses (mW)</th>
              <th className="border px-2 py-1">PF Meas.</th>
              <th className="border px-2 py-1">Cap meas. (pF)</th>
              <th className="border px-2 py-1">Assessment</th>
            </tr>
          </thead>
          <tbody>
            {(v[props.section] as PfRow[]).map((row, idx) => (
              <tr key={idx}>
                <td className="border px-2 py-1 text-center">{idx+1}</td>
                <td className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={row.meas || ''} onBlur={(e)=>setRow(props.section, idx, 'meas', e.target.value)} /></td>
                <td className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={row.testMode || ''} onBlur={(e)=>setRow(props.section, idx, 'testMode', e.target.value)} /></td>
                <td className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={row.freq || ''} onBlur={(e)=>setRow(props.section, idx, 'freq', e.target.value)} /></td>
                <td className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={row.vOutKv || ''} onBlur={(e)=>setRow(props.section, idx, 'vOutKv', e.target.value)} /></td>
                <td className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={row.iOutmA || ''} onBlur={(e)=>setRow(props.section, idx, 'iOutmA', e.target.value)} /></td>
                <td className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={row.wattLossesMw || ''} onBlur={(e)=>setRow(props.section, idx, 'wattLossesMw', e.target.value)} /></td>
                <td className="border px-1 py-1 text-center">{row.pfMeas || ''}</td>
                <td className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={row.capPf || ''} onBlur={(e)=>setRow(props.section, idx, 'capPf', e.target.value)} /></td>
                <td className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={row.assessment || ''} onBlur={(e)=>setRow(props.section, idx, 'assessment', e.target.value)} /></td>
              </tr>
            ))}
            <tr>
              <td className="border px-2 py-1" colSpan={2}>Calculated Cross Check for ICHL</td>
              <td className="border px-1 py-1 text-center" colSpan={2}></td>
              <td className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={(v as any)[props.crossKey]?.vOutKv || ''} onBlur={(e)=>setCross(props.crossKey, 'vOutKv', e.target.value)} /></td>
              <td className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={(v as any)[props.crossKey]?.iOutmA || ''} onBlur={(e)=>setCross(props.crossKey, 'iOutmA', e.target.value)} /></td>
              <td className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={(v as any)[props.crossKey]?.wattLossesMw || ''} onBlur={(e)=>setCross(props.crossKey, 'wattLossesMw', e.target.value)} /></td>
              <td className="border px-1 py-1"><input className="w-full h-7 border-none bg-transparent text-center focus:outline-none" defaultValue={(v as any)[props.crossKey]?.pfMeas || ''} onBlur={(e)=>setCross(props.crossKey, 'pfMeas', e.target.value)} /></td>
              <td className="border px-1 py-1 text-center">%</td>
              <td className="border px-1 py-1"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex gap-4 flex-wrap">
        <label className="text-sm text-gray-700 flex items-center gap-2">Reference Voltage (kV)
          <input className="h-8 w-28 rounded border border-gray-300 px-2" defaultValue={v.referenceVoltageKv} onBlur={(e)=>set({ referenceVoltageKv: e.target.value })} />
        </label>
        <label className="text-sm text-gray-700 flex items-center gap-2">Winding Temperature (°C)
          <input className="h-8 w-28 rounded border border-gray-300 px-2" defaultValue={v.windingTemperatureC} onBlur={(e)=>set({ windingTemperatureC: e.target.value })} />
        </label>
        <div className="text-xs text-gray-600">Calculations: PF meas. = Cosine Theta = Watt Losses / (V out × I out)</div>
      </div>

      {Section({ title: 'Injection at Primary', section: 'primary', crossKey: 'primaryCross' })}
      {Section({ title: 'Injection at Secondary', section: 'secondary', crossKey: 'secondaryCross' })}
    </div>
  );
};


